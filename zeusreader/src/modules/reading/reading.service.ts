import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  ReadingProgress,
  ReadingProgressDocument,
} from './schemas/reading-progress.schema';

interface ReadingUpdateData {
  currentPage: number;
  currentPosition: number;
  lastReadAt: Date;
  readingTime?: number;
  readingSpeed?: number;
}

export interface ReadingStats {
  totalBooks: number;
  completedBooks: number;
  totalReadingTime: number;
  averageReadingSpeed: number;
}

@Injectable()
export class ReadingService {
  constructor(
    @InjectModel(ReadingProgress.name)
    private readingProgressModel: Model<ReadingProgressDocument>,
  ) {}

  async startReading(
    userId: string,
    bookId: string,
    totalPages: number,
    totalCharacters: number,
  ): Promise<ReadingProgress> {
    const existingProgress = await this.readingProgressModel.findOne({
      userId: new Types.ObjectId(userId),
      bookId: new Types.ObjectId(bookId),
    });

    if (existingProgress) {
      return existingProgress;
    }

    const readingProgress = new this.readingProgressModel({
      userId: new Types.ObjectId(userId),
      bookId: new Types.ObjectId(bookId),
      totalPages,
      totalCharacters,
      lastReadAt: new Date(),
    });

    return readingProgress.save();
  }

  async updateProgress(
    userId: string,
    bookId: string,
    currentPage: number,
    currentPosition: number,
    readingTime?: number,
  ): Promise<ReadingProgress> {
    const updateData: ReadingUpdateData = {
      currentPage,
      currentPosition,
      lastReadAt: new Date(),
    };

    if (readingTime !== undefined) {
      updateData.readingTime = readingTime;
      if (readingTime > 0) {
        updateData.readingSpeed = Math.round(currentPosition / readingTime);
      }
    }

    const readingProgress = await this.readingProgressModel
      .findOneAndUpdate(
        {
          userId: new Types.ObjectId(userId),
          bookId: new Types.ObjectId(bookId),
        },
        updateData,
        { new: true, upsert: true },
      )
      .populate('bookId', 'title author');

    return readingProgress;
  }

  async getProgress(userId: string, bookId: string): Promise<ReadingProgress> {
    const progress = await this.readingProgressModel
      .findOne({
        userId: new Types.ObjectId(userId),
        bookId: new Types.ObjectId(bookId),
      })
      .populate('bookId', 'title author')
      .exec();

    if (!progress) {
      throw new NotFoundException('Reading progress not found');
    }

    return progress;
  }

  async getUserReadingHistory(userId: string): Promise<ReadingProgress[]> {
    return this.readingProgressModel
      .find({ userId: new Types.ObjectId(userId) })
      .populate('bookId', 'title author')
      .sort({ lastReadAt: -1 })
      .exec();
  }

  async markAsCompleted(
    userId: string,
    bookId: string,
  ): Promise<ReadingProgress> {
    const progress = await this.readingProgressModel
      .findOneAndUpdate(
        {
          userId: new Types.ObjectId(userId),
          bookId: new Types.ObjectId(bookId),
        },
        {
          isCompleted: true,
          lastReadAt: new Date(),
        },
        { new: true },
      )
      .populate('bookId', 'title author');

    if (!progress) {
      throw new NotFoundException('Reading progress not found');
    }

    return progress;
  }

  async getReadingStats(userId: string): Promise<ReadingStats> {
    const stats = await this.readingProgressModel.aggregate([
      { $match: { userId: new Types.ObjectId(userId) } },
      {
        $group: {
          _id: null,
          totalBooks: { $sum: 1 },
          completedBooks: { $sum: { $cond: ['$isCompleted', 1, 0] } },
          totalReadingTime: { $sum: '$readingTime' },
          averageReadingSpeed: { $avg: '$readingSpeed' },
        },
      },
    ]);

    return (
      (stats[0] as ReadingStats) || {
        totalBooks: 0,
        completedBooks: 0,
        totalReadingTime: 0,
        averageReadingSpeed: 0,
      }
    );
  }

  async deleteProgress(userId: string, bookId: string): Promise<void> {
    const result = await this.readingProgressModel.findOneAndDelete({
      userId: new Types.ObjectId(userId),
      bookId: new Types.ObjectId(bookId),
    });

    if (!result) {
      throw new NotFoundException('Reading progress not found');
    }
  }
}
