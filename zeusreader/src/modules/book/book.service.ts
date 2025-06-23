import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book, BookDocument } from './schemas/book.schema';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { User } from '../user/schemas/user.schema';
import { UserRole } from '../../shared/enums/user-role.enum';

@Injectable()
export class BookService {
  constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) {}

  async create(createBookDto: CreateBookDto, user: User): Promise<Book> {
    const book = new this.bookModel({
      ...createBookDto,
      createdBy: user._id,
    });
    return book.save();
  }

  async findAll(isPublished?: boolean): Promise<Book[]> {
    const filter = isPublished !== undefined ? { isPublished } : {};
    return this.bookModel.find(filter).populate('createdBy', 'username').exec();
  }

  async findById(id: string): Promise<Book> {
    const book = await this.bookModel
      .findById(id)
      .populate('createdBy', 'username')
      .exec();
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    return book;
  }

  async findByPublishedStatus(isPublished: boolean): Promise<Book[]> {
    return this.bookModel
      .find({ isPublished })
      .populate('createdBy', 'username')
      .exec();
  }

  async findByCategory(category: string): Promise<Book[]> {
    return this.bookModel
      .find({ category, isPublished: true })
      .populate('createdBy', 'username')
      .exec();
  }

  async search(query: string): Promise<Book[]> {
    return this.bookModel
      .find({
        $and: [
          { isPublished: true },
          {
            $or: [
              { title: { $regex: query, $options: 'i' } },
              { author: { $regex: query, $options: 'i' } },
              { description: { $regex: query, $options: 'i' } },
              { tags: { $in: [new RegExp(query, 'i')] } },
            ],
          },
        ],
      })
      .populate('createdBy', 'username')
      .exec();
  }

  async update(
    id: string,
    updateBookDto: UpdateBookDto,
    user: User,
  ): Promise<Book> {
    const book = await this.bookModel.findById(id);
    if (!book) {
      throw new NotFoundException('Book not found');
    }

    // Check if user is admin or the book creator
    if (
      user.role !== UserRole.ADMIN &&
      book.createdBy.toString() !== user._id.toString()
    ) {
      throw new ForbiddenException('You can only update your own books');
    }

    const updatedBook = await this.bookModel
      .findByIdAndUpdate(id, updateBookDto, { new: true })
      .populate('createdBy', 'username')
      .exec();

    if (!updatedBook) {
      throw new NotFoundException('Book not found');
    }

    return updatedBook;
  }

  async remove(id: string, user: User): Promise<void> {
    const book = await this.bookModel.findById(id);
    if (!book) {
      throw new NotFoundException('Book not found');
    }

    // Check if user is admin or the book creator
    if (
      user.role !== UserRole.ADMIN &&
      book.createdBy.toString() !== user._id.toString()
    ) {
      throw new ForbiddenException('You can only delete your own books');
    }

    await this.bookModel.findByIdAndDelete(id).exec();
  }
}
