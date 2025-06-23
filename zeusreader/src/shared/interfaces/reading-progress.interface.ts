import { BaseEntity } from './base.interface';
import { READING_STATUS } from '../utils/constants';

export interface ReadingProgress extends BaseEntity {
  userId: string;
  bookId: string;
  currentPage?: number;
  progressPercentage?: number;
  status?: keyof typeof READING_STATUS;
  notes?: string;
}

export interface ReadingProgressResponse {
  id: string;
  userId: string;
  bookId: string;
  currentPage?: number;
  progressPercentage?: number;
  status?: keyof typeof READING_STATUS;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}
