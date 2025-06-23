import { BaseEntity } from './base.interface';

export interface Book extends BaseEntity {
  title: string;
  author: string;
  description?: string;
  isbn?: string;
  rating?: number;
  coverImage?: string;
  genre?: string;
}

export interface BookResponse {
  id: string;
  title: string;
  author: string;
  description?: string;
  isbn?: string;
  rating?: number;
  coverImage?: string;
  genre?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IBook {
  _id: string;
  title: string;
  author: string;
  description: string;
  coverImage?: string;
  content: string;
  category: string;
  tags: string[];
  isPublished: boolean;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IBookResponse {
  _id: string;
  title: string;
  author: string;
  description: string;
  coverImage?: string;
  category: string;
  tags: string[];
  isPublished: boolean;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}
