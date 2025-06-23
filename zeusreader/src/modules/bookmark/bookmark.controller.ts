import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { User } from '../user/schemas/user.schema';

@Controller('bookmarks')
@UseGuards(JwtAuthGuard)
export class BookmarkController {
  constructor(private readonly bookmarkService: BookmarkService) {}

  @Post()
  async createBookmark(
    @Body()
    createBookmarkDto: {
      bookId: string;
      page: number;
      position: number;
      note?: string;
      title?: string;
    },
    @CurrentUser() user: User,
  ) {
    const { bookId, page, position, note, title } = createBookmarkDto;
    return this.bookmarkService.create(
      user._id,
      bookId,
      page,
      position,
      note,
      title,
    );
  }

  @Get()
  async getUserBookmarks(
    @CurrentUser() user: User,
    @Query('bookId') bookId?: string,
  ) {
    return this.bookmarkService.getUserBookmarks(user._id, bookId);
  }

  @Get(':id')
  async getBookmarkById(@Param('id') id: string, @CurrentUser() user: User) {
    return this.bookmarkService.getBookmarkById(id, user._id);
  }

  @Put(':id')
  async updateBookmark(
    @Param('id') id: string,
    @Body() updates: { note?: string; title?: string },
    @CurrentUser() user: User,
  ) {
    return this.bookmarkService.updateBookmark(id, user._id, updates);
  }

  @Delete(':id')
  async deleteBookmark(@Param('id') id: string, @CurrentUser() user: User) {
    return this.bookmarkService.deleteBookmark(id, user._id);
  }

  @Delete('book/:bookId')
  async deleteBookmarksByBook(
    @Param('bookId') bookId: string,
    @CurrentUser() user: User,
  ) {
    return this.bookmarkService.deleteBookmarksByBook(user._id, bookId);
  }
}
