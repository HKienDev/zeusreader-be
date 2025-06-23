import { Module } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { mongooseConfig } from './config/mongoose.config';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { AdminModule } from './modules/admin/admin.module';
import { BookModule } from './modules/book/book.module';
import { LibraryModule } from './modules/library/library.module';
import { BookmarkModule } from './modules/bookmark/bookmark.module';
import { ReadingModule } from './modules/reading/reading.module';

@Module({
  imports: [
    mongooseConfig,
    AuthModule,
    UserModule,
    AdminModule,
    BookModule,
    LibraryModule,
    BookmarkModule,
    ReadingModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
