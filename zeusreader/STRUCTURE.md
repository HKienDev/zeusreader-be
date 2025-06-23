# Zeus Reader Backend - Feature-Based Modular Structure

## Cấu trúc thư mục

```text
src/
├── main.ts                    # Entry point
├── app.module.ts              # Root module
├── config/                    # Cấu hình
│   ├── mongoose.config.ts     # MongoDB connection
│   └── env.config.ts          # Environment variables
│
├── modules/                   # Chia theo tính năng/domain
│   ├── auth/                  # Authentication (JWT, register, login, guard)
│   │   ├── auth.module.ts
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── jwt.strategy.ts
│   │   └── dto/
│   │       ├── login.dto.ts
│   │       └── register.dto.ts
│   │
│   ├── user/                  # Quản lý người dùng
│   │   ├── user.module.ts
│   │   ├── user.controller.ts
│   │   ├── user.service.ts
│   │   ├── schemas/
│   │   │   └── user.schema.ts
│   │   └── dto/
│   │       └── update-user.dto.ts
│   │
│   ├── admin/                 # Module riêng cho admin
│   │   ├── admin.module.ts
│   │   ├── admin.controller.ts
│   │   └── admin.service.ts
│   │
│   ├── book/                  # Quản lý sách (CRUD, phân loại)
│   │   ├── book.module.ts
│   │   ├── book.controller.ts
│   │   ├── book.service.ts
│   │   ├── schemas/
│   │   │   └── book.schema.ts
│   │   └── dto/
│   │       ├── create-book.dto.ts
│   │       └── update-book.dto.ts
│   │
│   ├── library/               # Thư viện cá nhân
│   │   ├── library.module.ts
│   │   ├── library.controller.ts
│   │   ├── library.service.ts
│   │   └── schemas/
│   │       └── library.schema.ts
│   │
│   ├── bookmark/              # Đánh dấu trang
│   │   ├── bookmark.module.ts
│   │   ├── bookmark.controller.ts
│   │   ├── bookmark.service.ts
│   │   └── schemas/
│   │       └── bookmark.schema.ts
│   │
│   └── reading/               # Trạng thái đang đọc
│       ├── reading.module.ts
│       ├── reading.controller.ts
│       ├── reading.service.ts
│       └── schemas/
│           └── reading-progress.schema.ts
│
├── common/                    # Guard, Decorator, Pipe, Filter (dùng chung)
│   ├── guards/
│   │   ├── jwt-auth.guard.ts
│   │   └── roles.guard.ts
│   ├── decorators/
│   │   ├── roles.decorator.ts
│   │   └── current-user.decorator.ts
│   └── interceptors/
│
├── utils/                     # Helper functions
│   └── helpers.ts
│
├── constants/                 # Constants
│   ├── book-categories.ts
│   └── api-endpoints.ts
│
└── shared/                    # Interface, enum dùng chung
    ├── enums/
    │   └── user-role.enum.ts
    └── interfaces/
        ├── user.interface.ts
        └── book.interface.ts
```

## Phân quyền (Roles)

- **USER**: Người dùng thường

  - Xem sách công khai
  - Quản lý thư viện cá nhân
  - Tạo bookmark
  - Theo dõi tiến độ đọc
  - Cập nhật profile

- **ADMIN**: Quản trị viên

  - Tất cả quyền của USER
  - Quản lý sách (CRUD)
  - Quản lý người dùng
  - Xem thống kê hệ thống
  - Thay đổi role người dùng

## API Endpoints

### Authentication

- `POST /api/v1/auth/login` - Đăng nhập
- `POST /api/v1/auth/register` - Đăng ký

### Users

- `GET /api/v1/users/profile` - Lấy profile cá nhân
- `PUT /api/v1/users/profile` - Cập nhật profile
- `GET /api/v1/users` - Lấy danh sách users (ADMIN)
- `GET /api/v1/users/:id` - Lấy user theo ID (ADMIN)
- `PUT /api/v1/users/:id` - Cập nhật user (ADMIN)
- `DELETE /api/v1/users/:id` - Xóa user (ADMIN)

### Admin

- `GET /api/v1/admin/dashboard` - Dashboard thống kê
- `GET /api/v1/admin/stats/users` - Thống kê users
- `GET /api/v1/admin/stats/books` - Thống kê books

### Books

- `GET /api/v1/books` - Lấy danh sách sách
- `GET /api/v1/books/:id` - Lấy sách theo ID
- `GET /api/v1/books/search` - Tìm kiếm sách
- `GET /api/v1/books/category/:category` - Lấy sách theo category
- `POST /api/v1/books` - Tạo sách mới (ADMIN)
- `PUT /api/v1/books/:id` - Cập nhật sách
- `DELETE /api/v1/books/:id` - Xóa sách

### Library

- `POST /api/v1/library/:bookId` - Thêm sách vào thư viện
- `GET /api/v1/library` - Lấy thư viện cá nhân
- `GET /api/v1/library/favorites` - Lấy sách yêu thích
- `GET /api/v1/library/reading` - Lấy sách đang đọc
- `PUT /api/v1/library/:bookId/favorite` - Toggle yêu thích
- `PUT /api/v1/library/:bookId/reading` - Cập nhật trạng thái đọc
- `PUT /api/v1/library/:bookId/progress` - Cập nhật tiến độ
- `DELETE /api/v1/library/:bookId` - Xóa khỏi thư viện

### Bookmarks

- `POST /api/v1/bookmarks` - Tạo bookmark
- `GET /api/v1/bookmarks` - Lấy danh sách bookmark
- `GET /api/v1/bookmarks/:id` - Lấy bookmark theo ID
- `PUT /api/v1/bookmarks/:id` - Cập nhật bookmark
- `DELETE /api/v1/bookmarks/:id` - Xóa bookmark
- `DELETE /api/v1/bookmarks/book/:bookId` - Xóa tất cả bookmark của sách

### Reading Progress

- `POST /api/v1/reading/start/:bookId` - Bắt đầu đọc
- `PUT /api/v1/reading/progress/:bookId` - Cập nhật tiến độ
- `GET /api/v1/reading/progress/:bookId` - Lấy tiến độ
- `GET /api/v1/reading/history` - Lấy lịch sử đọc
- `PUT /api/v1/reading/complete/:bookId` - Đánh dấu hoàn thành
- `GET /api/v1/reading/stats` - Lấy thống kê đọc
- `DELETE /api/v1/reading/progress/:bookId` - Xóa tiến độ

## Cài đặt và chạy

1. Cài đặt dependencies:

    ```bash
    npm install
    ```

2. Tạo file .env từ .env.example:

    ```bash
    cp .env.example .env
    ```

3. Cấu hình MongoDB và các biến môi trường trong file .env

4. Chạy ứng dụng:

    ```bash
    # Development
    npm run start:dev

    # Production
    npm run start:prod
    ```

## Tính năng chính

- ✅ Authentication với JWT
- ✅ Phân quyền User/Admin
- ✅ Quản lý sách với CRUD
- ✅ Thư viện cá nhân
- ✅ Bookmark và đánh dấu trang
- ✅ Theo dõi tiến độ đọc
- ✅ Thống kê và báo cáo
- ✅ Tìm kiếm và phân loại sách
- ✅ MongoDB với Mongoose
- ✅ Validation với class-validator
- ✅ Error handling
- ✅ CORS enabled

## Mở rộng

Cấu trúc này được thiết kế để dễ dàng mở rộng thêm các module mới như:

- Notifications
- Comments/Reviews
- Social features
- Analytics
- File upload
- Email service
- Payment integration
