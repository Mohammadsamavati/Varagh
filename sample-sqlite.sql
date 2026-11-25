-- نمونه SQLite برای پروژه ورق
-- این فقط یک نمونه است؛ هنوز به سایت وصل نشده

-- ساخت دیتابیس در عمل با یک فایل انجام می‌شود؛ مثلاً:
-- varagh.db


-- ========== جداول ==========

CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  phone TEXT,
  address TEXT,
  role TEXT NOT NULL DEFAULT 'user'
);

CREATE TABLE categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL
);

CREATE TABLE books (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  category_id INTEGER,
  price INTEGER NOT NULL,
  rent_price INTEGER NOT NULL,
  stock INTEGER NOT NULL DEFAULT 0,
  for_sale INTEGER DEFAULT 1,
  for_rent INTEGER DEFAULT 1,
  for_borrow INTEGER DEFAULT 1,
  description TEXT,
  year INTEGER,
  publisher TEXT,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE requests (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  book_id INTEGER NOT NULL,
  type TEXT NOT NULL,          -- borrow یا rent
  status TEXT NOT NULL,        -- pending / approved / rejected / delivered / returned
  note TEXT,
  days INTEGER,
  amount INTEGER,
  request_date TEXT,
  due_date TEXT,
  deliver_date TEXT,
  return_date TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (book_id) REFERENCES books(id)
);

CREATE TABLE donations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  category_id INTEGER,
  note TEXT,
  status TEXT NOT NULL,        -- pending / approved / rejected / received
  date TEXT,
  received_date TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  book_id INTEGER NOT NULL,
  amount INTEGER NOT NULL,
  status TEXT NOT NULL,
  date TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (book_id) REFERENCES books(id)
);

CREATE TABLE wishlist (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  book_id INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (book_id) REFERENCES books(id)
);

CREATE TABLE fines (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  book_id INTEGER NOT NULL,
  request_id INTEGER,
  amount INTEGER NOT NULL,
  days_late INTEGER,
  note TEXT,
  paid INTEGER DEFAULT 0,
  date TEXT,
  paid_date TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (book_id) REFERENCES books(id)
);


-- ========== داده نمونه ==========

INSERT INTO users (name, email, password, phone, address, role) VALUES
('مدیر سیستم', 'admin@varagh.ir', 'admin123', '09120000000', 'تهران', 'admin'),
('علی محمدی', 'ali@gmail.com', '123456', '09121234567', 'تهران', 'user');

INSERT INTO categories (name) VALUES
('رمان'),
('علمی'),
('تاریخی'),
('کودک و نوجوان'),
('درسی و دانشگاهی'),
('روانشناسی');

INSERT INTO books (title, author, category_id, price, rent_price, stock, description, year, publisher)
VALUES
('شازده کوچولو', 'آنتوان دو سنت اگزوپری', 1, 85000, 15000, 5, 'داستان معروف شازده کوچولو', 1398, 'نشر امیرکبیر'),
('کیمیاگر', 'پائولو کوئیلو', 1, 95000, 18000, 3, 'رمان کیمیاگر', 1400, 'نشر کاروان');


-- ========== چند کوئری نمونه ==========

-- همه کتاب‌ها با نام دسته
SELECT books.id, books.title, books.author, categories.name AS category, books.price, books.stock
FROM books
LEFT JOIN categories ON books.category_id = categories.id;

-- ورود کاربر
SELECT * FROM users
WHERE email = 'ali@gmail.com' AND password = '123456';

-- کم کردن موجودی بعد از خرید
UPDATE books SET stock = stock - 1 WHERE id = 1;

-- ثبت سفارش فروش
INSERT INTO orders (user_id, book_id, amount, status, date)
VALUES (2, 1, 85000, 'paid', '2026-03-16');

-- درخواست‌های در انتظار تایید
SELECT requests.id, users.name, books.title, requests.type, requests.status
FROM requests
JOIN users ON requests.user_id = users.id
JOIN books ON requests.book_id = books.id
WHERE requests.status = 'pending';
