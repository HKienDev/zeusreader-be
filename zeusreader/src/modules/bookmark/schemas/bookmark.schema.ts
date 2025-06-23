import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type BookmarkDocument = Bookmark & Document;

@Schema({ timestamps: true })
export class Bookmark {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Book', required: true })
  bookId: Types.ObjectId;

  @Prop({ required: true })
  page: number;

  @Prop({ required: true })
  position: number; // Character position in the text

  @Prop()
  note?: string;

  @Prop()
  title?: string; // Custom title for the bookmark
}

export const BookmarkSchema = SchemaFactory.createForClass(Bookmark);

// Compound index to ensure unique user-book-page combinations
BookmarkSchema.index({ userId: 1, bookId: 1, page: 1 }, { unique: true });
