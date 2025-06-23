import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ReadingProgressDocument = ReadingProgress & Document;

@Schema({ timestamps: true })
export class ReadingProgress {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Book', required: true })
  bookId: Types.ObjectId;

  @Prop({ required: true, default: 0 })
  currentPage: number;

  @Prop({ required: true, default: 0 })
  currentPosition: number; // Character position in the text

  @Prop({ required: true, default: 0 })
  totalPages: number;

  @Prop({ required: true, default: 0 })
  totalCharacters: number;

  @Prop({ default: 0 })
  readingTime: number; // Total reading time in minutes

  @Prop({ default: 0 })
  readingSpeed: number; // Characters per minute

  @Prop({ default: false })
  isCompleted: boolean;

  @Prop()
  lastReadAt: Date;
}

export const ReadingProgressSchema =
  SchemaFactory.createForClass(ReadingProgress);

// Compound index to ensure unique user-book combinations
ReadingProgressSchema.index({ userId: 1, bookId: 1 }, { unique: true });
