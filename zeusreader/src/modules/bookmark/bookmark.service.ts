import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Bookmark, BookmarkDocument } from './schemas/bookmark.schema';

interface BookmarkFilter {
  userId: Types.ObjectId;
  bookId?: Types.ObjectId;
}

interface BookmarkUpdate {
  page?: number;
  position?: number;
  note?: string;
  title?: string;
}

@Injectable()
export class BookmarkService {
  constructor(
    @InjectModel(Bookmark.name) private bookmarkModel: Model<BookmarkDocument>,
  ) {}

  async create(
    userId: string,
    bookId: string,
    page: number,
    position: number,
    note?: string,
    title?: string,
  ): Promise<Bookmark> {
    const bookmark = new this.bookmarkModel({
      userId: new Types.ObjectId(userId),
      bookId: new Types.ObjectId(bookId),
      page,
      position,
      note,
      title,
    });

    return bookmark.save();
  }

  async getUserBookmarks(userId: string, bookId?: string): Promise<Bookmark[]> {
    const filter: BookmarkFilter = { userId: new Types.ObjectId(userId) };
    if (bookId) {
      filter.bookId = new Types.ObjectId(bookId);
    }

    return this.bookmarkModel
      .find(filter)
      .populate('bookId', 'title author')
      .sort({ page: 1, position: 1 })
      .exec();
  }

  async getBookmarkById(id: string, userId: string): Promise<Bookmark> {
    const bookmark = await this.bookmarkModel
      .findOne({
        _id: new Types.ObjectId(id),
        userId: new Types.ObjectId(userId),
      })
      .populate('bookId', 'title author')
      .exec();

    if (!bookmark) {
      throw new NotFoundException('Bookmark not found');
    }

    return bookmark;
  }

  async updateBookmark(
    id: string,
    userId: string,
    updates: BookmarkUpdate,
  ): Promise<Bookmark> {
    const bookmark = await this.bookmarkModel
      .findOneAndUpdate(
        {
          _id: new Types.ObjectId(id),
          userId: new Types.ObjectId(userId),
        },
        updates,
        { new: true },
      )
      .populate('bookId', 'title author');

    if (!bookmark) {
      throw new NotFoundException('Bookmark not found');
    }

    return bookmark;
  }

  async deleteBookmark(id: string, userId: string): Promise<void> {
    const result = await this.bookmarkModel.findOneAndDelete({
      _id: new Types.ObjectId(id),
      userId: new Types.ObjectId(userId),
    });

    if (!result) {
      throw new NotFoundException('Bookmark not found');
    }
  }

  async deleteBookmarksByBook(userId: string, bookId: string): Promise<void> {
    await this.bookmarkModel.deleteMany({
      userId: new Types.ObjectId(userId),
      bookId: new Types.ObjectId(bookId),
    });
  }
}
