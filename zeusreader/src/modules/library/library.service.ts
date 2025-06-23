import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Library, LibraryDocument } from './schemas/library.schema';

@Injectable()
export class LibraryService {
  constructor(
    @InjectModel(Library.name) private libraryModel: Model<LibraryDocument>,
  ) {}

  async addToLibrary(userId: string, bookId: string): Promise<Library> {
    const existingEntry = await this.libraryModel.findOne({
      userId: new Types.ObjectId(userId),
      bookId: new Types.ObjectId(bookId),
    });

    if (existingEntry) {
      throw new Error('Book already in library');
    }

    const libraryEntry = new this.libraryModel({
      userId: new Types.ObjectId(userId),
      bookId: new Types.ObjectId(bookId),
    });

    return libraryEntry.save();
  }

  async getUserLibrary(userId: string) {
    return this.libraryModel
      .find({ userId: new Types.ObjectId(userId) })
      .populate('bookId')
      .exec();
  }

  async getFavorites(userId: string) {
    return this.libraryModel
      .find({
        userId: new Types.ObjectId(userId),
        isFavorite: true,
      })
      .populate('bookId')
      .exec();
  }

  async getCurrentlyReading(userId: string) {
    return this.libraryModel
      .find({
        userId: new Types.ObjectId(userId),
        isReading: true,
      })
      .populate('bookId')
      .exec();
  }

  async toggleFavorite(userId: string, bookId: string): Promise<Library> {
    const libraryEntry = await this.libraryModel
      .findOneAndUpdate(
        {
          userId: new Types.ObjectId(userId),
          bookId: new Types.ObjectId(bookId),
        },
        [{ $set: { isFavorite: { $not: '$isFavorite' } } }],
        { new: true },
      )
      .populate('bookId');

    if (!libraryEntry) {
      throw new NotFoundException('Book not found in library');
    }

    return libraryEntry;
  }

  async updateReadingStatus(
    userId: string,
    bookId: string,
    isReading: boolean,
  ): Promise<Library> {
    const libraryEntry = await this.libraryModel
      .findOneAndUpdate(
        {
          userId: new Types.ObjectId(userId),
          bookId: new Types.ObjectId(bookId),
        },
        { isReading },
        { new: true },
      )
      .populate('bookId');

    if (!libraryEntry) {
      throw new NotFoundException('Book not found in library');
    }

    return libraryEntry;
  }

  async updateReadingProgress(
    userId: string,
    bookId: string,
    progress: number,
  ): Promise<Library> {
    const libraryEntry = await this.libraryModel
      .findOneAndUpdate(
        {
          userId: new Types.ObjectId(userId),
          bookId: new Types.ObjectId(bookId),
        },
        { readingProgress: Math.min(100, Math.max(0, progress)) },
        { new: true },
      )
      .populate('bookId');

    if (!libraryEntry) {
      throw new NotFoundException('Book not found in library');
    }

    return libraryEntry;
  }

  async removeFromLibrary(userId: string, bookId: string): Promise<void> {
    const result = await this.libraryModel.findOneAndDelete({
      userId: new Types.ObjectId(userId),
      bookId: new Types.ObjectId(bookId),
    });

    if (!result) {
      throw new NotFoundException('Book not found in library');
    }
  }
}
