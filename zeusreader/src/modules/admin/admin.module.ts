import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { UserModule } from '../user/user.module';
import { BookModule } from '../book/book.module';

@Module({
  imports: [UserModule, BookModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
