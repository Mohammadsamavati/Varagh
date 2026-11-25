// مدیریت داده‌ها با localStorage
// اگر داده‌ای نبود، داده‌های اولیه رو میذاریم

function getData(key) {
  var raw = localStorage.getItem(key);
  if (raw) {
    return JSON.parse(raw);
  }
  return null;
}

function setData(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function initData() {
  if (!getData("users")) {
    var users = [
      {
        id: 1,
        name: "مدیر سیستم",
        email: "admin@varagh.ir",
        password: "admin123",
        phone: "09120000000",
        role: "admin",
        address: "تهران"
      },
      {
        id: 2,
        name: "علی محمدی",
        email: "ali@gmail.com",
        password: "123456",
        phone: "09121234567",
        role: "user",
        address: "تهران، خیابان ولیعصر"
      },
      {
        id: 3,
        name: "سارا احمدی",
        email: "sara@gmail.com",
        password: "123456",
        phone: "09129876543",
        role: "user",
        address: "اصفهان"
      }
    ];
    setData("users", users);
  }

  if (!getData("categories")) {
    var categories = [
      { id: 1, name: "رمان" },
      { id: 2, name: "علمی" },
      { id: 3, name: "تاریخی" },
      { id: 4, name: "کودک و نوجوان" },
      { id: 5, name: "درسی و دانشگاهی" },
      { id: 6, name: "روانشناسی" }
    ];
    setData("categories", categories);
  }

  if (!getData("books")) {
    var books = [
      {
        id: 1,
        title: "شازده کوچولو",
        author: "آنتوان دو سنت اگزوپری",
        categoryId: 1,
        price: 85000,
        rentPrice: 15000,
        stock: 5,
        forSale: true,
        forRent: true,
        forBorrow: true,
        description: "داستان معروف شازده کوچولو، ترجمه فارسی. مناسب برای همه سنین.",
        year: 1398,
        publisher: "نشر امیرکبیر"
      },
      {
        id: 2,
        title: "کیمیاگر",
        author: "پائولو کوئیلو",
        categoryId: 1,
        price: 95000,
        rentPrice: 18000,
        stock: 3,
        forSale: true,
        forRent: true,
        forBorrow: true,
        description: "رمان کیمیاگر درباره سفری معنوی و پیدا کردن گنج واقعی زندگی.",
        year: 1400,
        publisher: "نشر کاروان"
      },
      {
        id: 3,
        title: "تاریخ ایران باستان",
        author: "حسن پیرنیا",
        categoryId: 3,
        price: 220000,
        rentPrice: 30000,
        stock: 2,
        forSale: true,
        forRent: true,
        forBorrow: true,
        description: "مروری بر تاریخ ایران از دوران مادها تا ساسانیان.",
        year: 1395,
        publisher: "نشر دنیای کتاب"
      },
      {
        id: 4,
        title: "مبانی برنامه‌نویسی",
        author: "دکتر رضایی",
        categoryId: 5,
        price: 180000,
        rentPrice: 25000,
        stock: 8,
        forSale: true,
        forRent: true,
        forBorrow: true,
        description: "کتاب درسی مبانی برنامه‌نویسی برای دانشجویان کامپیوتر.",
        year: 1401,
        publisher: "انتشارات دانشگاه"
      },
      {
        id: 5,
        title: "اثر مرکب",
        author: "دارن هاردی",
        categoryId: 6,
        price: 110000,
        rentPrice: 20000,
        stock: 4,
        forSale: true,
        forRent: true,
        forBorrow: false,
        description: "کتابی در مورد موفقیت و تاثیر کارهای کوچک روزمره.",
        year: 1399,
        publisher: "نشر آموخته"
      },
      {
        id: 6,
        title: "ماجراهای هایدی",
        author: "یوهانا اشپیری",
        categoryId: 4,
        price: 70000,
        rentPrice: 12000,
        stock: 6,
        forSale: true,
        forRent: true,
        forBorrow: true,
        description: "داستان کلاسیک هایدی برای کودکان و نوجوانان.",
        year: 1397,
        publisher: "نشر قدیانی"
      },
      {
        id: 7,
        title: "فیزیک دانشگاهی جلد ۱",
        author: "یانگ و فریدمن",
        categoryId: 5,
        price: 350000,
        rentPrice: 40000,
        stock: 1,
        forSale: true,
        forRent: true,
        forBorrow: true,
        description: "کتاب مرجع فیزیک مکانیک برای دانشجویان علوم پایه و مهندسی.",
        year: 1400,
        publisher: "نشر فاطمی"
      },
      {
        id: 8,
        title: " downstreamوایی بر مدار راس ساعت",
        author: "احمد شاملو",
        categoryId: 1,
        price: 65000,
        rentPrice: 10000,
        stock: 0,
        forSale: true,
        forRent: false,
        forBorrow: false,
        description: "مجموعه شعر شاملو. موجودی فعلا تمام شده.",
        year: 1396,
        publisher: "نشر نگاه"
      }
    ];
    setData("books", books);
  }

  if (!getData("requests")) {
    setData("requests", []);
  }

  if (!getData("donations")) {
    setData("donations", []);
  }

  if (!getData("wishlist")) {
    setData("wishlist", []);
  }

  if (!getData("fines")) {
    setData("fines", []);
  }

  if (!getData("orders")) {
    setData("orders", []);
  }

  if (!getData("nextId")) {
    setData("nextId", {
      book: 9,
      user: 4,
      category: 7,
      request: 1,
      donation: 1,
      order: 1,
      fine: 1
    });
  }
}

function getNextId(type) {
  var ids = getData("nextId");
  var id = ids[type];
  ids[type] = id + 1;
  setData("nextId", ids);
  return id;
}

function getCategoryName(categoryId) {
  var cats = getData("categories") || [];
  for (var i = 0; i < cats.length; i++) {
    if (cats[i].id == categoryId) {
      return cats[i].name;
    }
  }
  return "-";
}

function getBookById(id) {
  var books = getData("books") || [];
  for (var i = 0; i < books.length; i++) {
    if (books[i].id == id) {
      return books[i];
    }
  }
  return null;
}

function getUserById(id) {
  var users = getData("users") || [];
  for (var i = 0; i < users.length; i++) {
    if (users[i].id == id) {
      return users[i];
    }
  }
  return null;
}

function formatPrice(n) {
  if (n === null || n === undefined) return "-";
  return Number(n).toLocaleString("fa-IR") + " تومان";
}

function statusText(status) {
  var map = {
    pending: "در انتظار بررسی",
    approved: "تایید شده",
    rejected: "رد شده",
    delivered: "تحویل داده شده",
    returned: "بازگشت داده شده",
    overdue: "دیرکرد",
    paid: "پرداخت شده",
    cancelled: "لغو شده",
    received: "دریافت شده"
  };
  return map[status] || status;
}

function statusClass(status) {
  if (status === "pending") return "status-pending";
  if (status === "approved" || status === "delivered" || status === "paid" || status === "received") return "status-approved";
  if (status === "rejected" || status === "cancelled" || status === "overdue") return "status-rejected";
  if (status === "returned") return "status-returned";
  return "status-pending";
}

function todayStr() {
  var d = new Date();
  var m = d.getMonth() + 1;
  var day = d.getDate();
  return d.getFullYear() + "-" + (m < 10 ? "0" + m : m) + "-" + (day < 10 ? "0" + day : day);
}

function addDays(dateStr, days) {
  var d = new Date(dateStr);
  d.setDate(d.getDate() + Number(days));
  var m = d.getMonth() + 1;
  var day = d.getDate();
  return d.getFullYear() + "-" + (m < 10 ? "0" + m : m) + "-" + (day < 10 ? "0" + day : day);
}

function daysBetween(a, b) {
  var d1 = new Date(a);
  var d2 = new Date(b);
  var diff = Math.floor((d2 - d1) / (1000 * 60 * 60 * 24));
  return diff;
}

// جریمه روزانه دیرکرد (تومان)
var FINE_PER_DAY = 5000;

initData();
