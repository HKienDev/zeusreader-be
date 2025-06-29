export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
  },
  USERS: {
    PROFILE: '/users/profile',
    ALL: '/users',
    BY_ID: '/users/:id',
  },
  ADMIN: {
    DASHBOARD: '/admin/dashboard',
    USER_STATS: '/admin/stats/users',
    BOOK_STATS: '/admin/stats/books',
  },
  BOOKS: {
    ALL: '/books',
    BY_ID: '/books/:id',
    SEARCH: '/books/search',
    BY_CATEGORY: '/books/category/:category',
  },
  LIBRARY: {
    ADD: '/library/:bookId',
    ALL: '/library',
    FAVORITES: '/library/favorites',
    READING: '/library/reading',
    TOGGLE_FAVORITE: '/library/:bookId/favorite',
    UPDATE_READING: '/library/:bookId/reading',
    UPDATE_PROGRESS: '/library/:bookId/progress',
    REMOVE: '/library/:bookId',
  },
  BOOKMARKS: {
    CREATE: '/bookmarks',
    ALL: '/bookmarks',
    BY_ID: '/bookmarks/:id',
    BY_BOOK: '/bookmarks?bookId=:bookId',
    UPDATE: '/bookmarks/:id',
    DELETE: '/bookmarks/:id',
    DELETE_BY_BOOK: '/bookmarks/book/:bookId',
  },
  READING: {
    START: '/reading/start/:bookId',
    PROGRESS: '/reading/progress/:bookId',
    HISTORY: '/reading/history',
    COMPLETE: '/reading/complete/:bookId',
    STATS: '/reading/stats',
    DELETE: '/reading/progress/:bookId',
  },
} as const;
