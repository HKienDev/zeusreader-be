export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
  },
  USERS: {
    BASE: '/users',
    BY_ID: '/users/:id',
  },
  BOOKS: {
    BASE: '/books',
    BY_ID: '/books/:id',
  },
  READING_PROGRESS: {
    BASE: '/reading-progress',
    BY_ID: '/reading-progress/:id',
  },
} as const;

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
} as const;

export const MESSAGES = {
  SUCCESS: 'Success',
  USER_NOT_FOUND: 'User not found',
  BOOK_NOT_FOUND: 'Book not found',
  READING_PROGRESS_NOT_FOUND: 'Reading progress not found',
  INVALID_CREDENTIALS: 'Invalid credentials',
  USER_ALREADY_EXISTS: 'User already exists',
} as const;

export const READING_STATUS = {
  NOT_STARTED: 'not-started',
  READING: 'reading',
  COMPLETED: 'completed',
  PAUSED: 'paused',
} as const;
