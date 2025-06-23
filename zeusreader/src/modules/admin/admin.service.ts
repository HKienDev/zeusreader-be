import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { BookService } from '../book/book.service';

@Injectable()
export class AdminService {
  constructor(
    private readonly userService: UserService,
    private readonly bookService: BookService,
  ) {}

  async getDashboardStats() {
    const [totalUsers, totalBooks, publishedBooks] = await Promise.all([
      this.userService.findAll(),
      this.bookService.findAll(),
      this.bookService.findByPublishedStatus(true),
    ]);

    return {
      totalUsers: totalUsers.length,
      totalBooks: totalBooks.length,
      publishedBooks: publishedBooks.length,
      draftBooks: totalBooks.length - publishedBooks.length,
    };
  }

  async getUserStats() {
    const users = await this.userService.findAll();
    const userStats = users.reduce(
      (acc, user) => {
        acc[user.role] = (acc[user.role] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    return {
      total: users.length,
      byRole: userStats,
    };
  }

  async getBookStats() {
    const books = await this.bookService.findAll();
    const bookStats = books.reduce(
      (acc, book) => {
        acc[book.category] = (acc[book.category] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    return {
      total: books.length,
      byCategory: bookStats,
    };
  }
}
