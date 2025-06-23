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
import { ReadingService, ReadingStats } from './reading.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { User } from '../user/schemas/user.schema';

@Controller('reading')
@UseGuards(JwtAuthGuard)
export class ReadingController {
  constructor(private readonly readingService: ReadingService) {}

  @Post('start/:bookId')
  async startReading(
    @Param('bookId') bookId: string,
    @Body() startReadingDto: { totalPages: number; totalCharacters: number },
    @CurrentUser() user: User,
  ) {
    const { totalPages, totalCharacters } = startReadingDto;
    return this.readingService.startReading(
      user._id,
      bookId,
      totalPages,
      totalCharacters,
    );
  }

  @Put('progress/:bookId')
  async updateProgress(
    @Param('bookId') bookId: string,
    @Body()
    updateProgressDto: {
      currentPage: number;
      currentPosition: number;
      readingTime?: number;
    },
    @CurrentUser() user: User,
  ) {
    const { currentPage, currentPosition, readingTime } = updateProgressDto;
    return this.readingService.updateProgress(
      user._id,
      bookId,
      currentPage,
      currentPosition,
      readingTime,
    );
  }

  @Get('progress/:bookId')
  async getProgress(
    @Param('bookId') bookId: string,
    @CurrentUser() user: User,
  ) {
    return this.readingService.getProgress(user._id, bookId);
  }

  @Get('history')
  async getUserReadingHistory(@CurrentUser() user: User) {
    return this.readingService.getUserReadingHistory(user._id);
  }

  @Put('complete/:bookId')
  async markAsCompleted(
    @Param('bookId') bookId: string,
    @CurrentUser() user: User,
  ) {
    return this.readingService.markAsCompleted(user._id, bookId);
  }

  @Get('stats')
  async getReadingStats(@CurrentUser() user: User): Promise<ReadingStats> {
    return this.readingService.getReadingStats(user._id);
  }

  @Delete('progress/:bookId')
  async deleteProgress(
    @Param('bookId') bookId: string,
    @CurrentUser() user: User,
  ) {
    return this.readingService.deleteProgress(user._id, bookId);
  }
}
