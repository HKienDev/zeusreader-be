import { Types } from 'mongoose';

export const isValidObjectId = (id: string): boolean => {
  return Types.ObjectId.isValid(id);
};

export const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

export const calculateReadingTime = (
  text: string,
  wordsPerMinute = 200,
): number => {
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
};

export const calculateReadingProgress = (
  currentPosition: number,
  totalCharacters: number,
): number => {
  if (totalCharacters === 0) return 0;
  return Math.round((currentPosition / totalCharacters) * 100);
};

export const formatReadingTime = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes} min`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
};

export const sanitizeText = (text: string): string => {
  return text.replace(/<[^>]*>/g, '').trim();
};
