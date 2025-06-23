import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { LibraryService } from './library.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { User } from '../user/schemas/user.schema';

@Controller('library')
@UseGuards(JwtAuthGuard)
export class LibraryController {
  constructor(private readonly libraryService: LibraryService) {}

  @Post(':bookId')
  async addToLibrary(
    @Param('bookId') bookId: string,
    @CurrentUser() user: User,
  ) {
    return this.libraryService.addToLibrary(user._id, bookId);
  }

  @Get()
  async getUserLibrary(@CurrentUser() user: User) {
    return this.libraryService.getUserLibrary(user._id);
  }

  @Get('favorites')
  async getFavorites(@CurrentUser() user: User) {
    return this.libraryService.getFavorites(user._id);
  }

  @Get('reading')
  async getCurrentlyReading(@CurrentUser() user: User) {
    return this.libraryService.getCurrentlyReading(user._id);
  }

  @Put(':bookId/favorite')
  async toggleFavorite(
    @Param('bookId') bookId: string,
    @CurrentUser() user: User,
  ) {
    return this.libraryService.toggleFavorite(user._id, bookId);
  }

  @Put(':bookId/reading')
  async updateReadingStatus(
    @Param('bookId') bookId: string,
    @Body('isReading') isReading: boolean,
    @CurrentUser() user: User,
  ) {
    return this.libraryService.updateReadingStatus(user._id, bookId, isReading);
  }

  @Put(':bookId/progress')
  async updateReadingProgress(
    @Param('bookId') bookId: string,
    @Body('progress') progress: number,
    @CurrentUser() user: User,
  ) {
    return this.libraryService.updateReadingProgress(
      user._id,
      bookId,
      progress,
    );
  }

  @Delete(':bookId')
  async removeFromLibrary(
    @Param('bookId') bookId: string,
    @CurrentUser() user: User,
  ) {
    return this.libraryService.removeFromLibrary(user._id, bookId);
  }
}
