import { MESSAGES } from './constants';

export class ApiResponse<T> {
  data: T;
  message: string;
  statusCode: number;
  timestamp: string;

  constructor(
    data: T,
    message: string = MESSAGES.SUCCESS,
    statusCode: number = 200,
  ) {
    this.data = data;
    this.message = message;
    this.statusCode = statusCode;
    this.timestamp = new Date().toISOString();
  }

  static success<T>(
    data: T,
    message?: string,
    statusCode?: number,
  ): ApiResponse<T> {
    return new ApiResponse(data, message, statusCode);
  }

  static error<T>(message: string, statusCode: number = 400): ApiResponse<T> {
    return new ApiResponse(null as T, message, statusCode);
  }
}

export const generateId = (): string => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
};

export const sanitizeUser = (user: any) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _password, ...sanitizedUser } = user;
  return sanitizedUser as unknown as Omit<typeof user, 'password'>;
};

export const calculateProgressPercentage = (
  currentPage: number,
  totalPages: number,
): number => {
  if (totalPages <= 0) return 0;
  return Math.round((currentPage / totalPages) * 100);
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  return password.length >= 6;
};
