import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { UserRole } from '../../shared/enums/user-role.enum';
import { User } from '../user/schemas/user.schema';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  async findAll(@Query('published') published?: string) {
    const isPublished = published === 'true';
    return this.bookService.findAll(isPublished);
  }

  @Get('search')
  async search(@Query('q') query: string) {
    return this.bookService.search(query);
  }

  @Get('category/:category')
  async findByCategory(@Param('category') category: string) {
    return this.bookService.findByCategory(category);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.bookService.findById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async create(
    @Body() createBookDto: CreateBookDto,
    @CurrentUser() user: User,
  ) {
    return this.bookService.create(createBookDto, user);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async update(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
    @CurrentUser() user: User,
  ) {
    return this.bookService.update(id, updateBookDto, user);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async remove(@Param('id') id: string, @CurrentUser() user: User) {
    return this.bookService.remove(id, user);
  }
}
