import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type LibraryDocument = Library & Document;

@Schema({ timestamps: true })
export class Library {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Book', required: true })
  bookId: Types.ObjectId;

  @Prop({ default: false })
  isFavorite: boolean;

  @Prop({ default: false })
  isReading: boolean;

  @Prop({ default: 0 })
  readingProgress: number; // Percentage 0-100
}

export const LibrarySchema = SchemaFactory.createForClass(Library);

// Compound index to ensure unique user-book combinations
LibrarySchema.index({ userId: 1, bookId: 1 }, { unique: true });
