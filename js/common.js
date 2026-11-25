// منو، فوتر و توابع کمکی نمایش

var COVER_COLORS = [
  ["#1f6b57", "#0f3d3e"],
  ["#2f4f6b", "#173047"],
  ["#6b3f2f", "#3d2218"],
  ["#3d4a2f", "#222a18"],
  ["#4a356b", "#2a1c42"],
  ["#6b2f45", "#3d1826"],
  ["#2f5b6b", "#173640"],
  ["#5b4a2f", "#332816"]
];

function bookCoverHtml(book, tall) {
  var colors = COVER_COLORS[(book.id || 1) % COVER_COLORS.length];
  var minH = tall ? "min-height:420px;" : "";
  var html = "";
  html += '<div class="book-cover" style="background:linear-gradient(145deg,' + colors[0] + ',' + colors[1] + ');' + minH + '">';
  html += '<div class="cover-title">' + book.title + "</div>";
  html += '<div class="cover-author">' + book.author + "</div>";
  html += "</div>";
  return html;
}

function bookCardHtml(book, base) {
  base = base || "";
  var html = "";
  html += '<div class="col-lg-3 col-md-4 col-sm-6 mb-4">';
  html += '<div class="book-card">';
  html += '<div class="cover-wrap">' + bookCoverHtml(book) + "</div>";
  html += '<div class="book-card-body">';
  html += "<h5>" + book.title + "</h5>";
  html += '<div class="author">' + book.author + "</div>";
  html += '<div class="meta-row">';
  html += '<p class="price">' + formatPrice(book.price) + "</p>";
  if (book.stock > 0) {
    html += '<span class="badge-soft badge-available">موجود</span>';
  } else {
    html += '<span class="badge-soft badge-unavailable">ناموجود</span>';
  }
  html += "</div>";
  html += '<a href="' + base + "book-detail.html?id=" + book.id + '" class="btn btn-sm btn-main w-100">مشاهده جزئیات</a>';
  html += "</div></div></div>";
  return html;
}

function renderNavbar() {
  var base = getBasePath();
  var user = getCurrentUser();
  var authLinks = "";

  if (user) {
    var panel = user.role === "admin" ? "admin/dashboard.html" : "user/dashboard.html";
    authLinks += '<li class="nav-item"><a class="nav-link" href="' + base + panel + '">' + user.name + "</a></li>";
    authLinks += '<li class="nav-item"><a class="nav-link" href="#" onclick="logout(); return false;">خروج</a></li>';
  } else {
    authLinks += '<li class="nav-item"><a class="nav-link" href="' + base + 'login.html">ورود</a></li>';
    authLinks += '<li class="nav-item"><a class="nav-link nav-cta" href="' + base + 'register.html">عضویت</a></li>';
  }

  var html = "";
  html += '<div class="site-nav">';
  html += '<nav class="navbar navbar-expand-lg">';
  html += '<div class="container">';
  html += '<a class="navbar-brand d-flex align-items-center gap-2" href="' + base + 'index.html">';
  html += '<img src="' + base + 'images/logo.svg" alt="ورق" class="brand-mark">';
  html += '</a>';
  html += '<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav">';
  html += '<span class="navbar-toggler-icon"></span></button>';
  html += '<div class="collapse navbar-collapse" id="mainNav">';
  html += '<ul class="navbar-nav me-auto mb-2 mb-lg-0">';
  html += '<li class="nav-item"><a class="nav-link" href="' + base + 'index.html">خانه</a></li>';
  html += '<li class="nav-item"><a class="nav-link" href="' + base + 'books.html">کتاب‌ها</a></li>';
  html += '<li class="nav-item"><a class="nav-link" href="' + base + 'categories.html">دسته‌بندی</a></li>';
  html += '<li class="nav-item"><a class="nav-link" href="' + base + 'about.html">درباره ورق</a></li>';
  html += '<li class="nav-item"><a class="nav-link" href="' + base + 'contact.html">تماس</a></li>';
  html += "</ul>";
  html += '<ul class="navbar-nav align-items-lg-center">' + authLinks + "</ul>";
  html += "</div></div></nav></div>";

  var el = document.getElementById("navbar");
  if (el) el.innerHTML = html;
}

function renderFooter() {
  var base = getBasePath();
  var html = "";
  html += '<footer class="footer">';
  html += '<div class="container">';
  html += '<div class="row g-4">';
  html += '<div class="col-md-5">';
  html += '<div class="d-flex align-items-center gap-2 mb-3">';
  html += '<img src="' + base + 'images/logo.svg" alt="ورق" class="brand-mark-lg">';
  html += "</div>";
  html += "<p>فروشگاه و کتابخانه آنلاین برای خرید، اجاره، امانت و اهدای کتاب. اینجا می‌توانید کتاب بعدی‌تان را پیدا کنید.</p>";
  html += "</div>";
  html += '<div class="col-md-3">';
  html += "<h6 class='text-white mb-3'>دسترسی سریع</h6>";
  html += '<p><a href="' + base + 'books.html">مشاهده کتاب‌ها</a></p>';
  html += '<p><a href="' + base + 'categories.html">دسته‌بندی‌ها</a></p>';
  html += '<p><a href="' + base + 'about.html">درباره ما</a></p>';
  html += "</div>";
  html += '<div class="col-md-4">';
  html += "<h6 class='text-white mb-3'>ارتباط با ما</h6>";
  html += "<p>تهران، خیابان انقلاب</p>";
  html += "<p>۰۲۱-۱۲۳۴۵۶۷۸</p>";
  html += "<p>info@varagh.ir</p>";
  html += "</div>";
  html += "</div>";
  html += '<div class="copy">© ورق — همه حقوق محفوظ است</div>';
  html += "</div></footer>";

  var el = document.getElementById("footer");
  if (el) el.innerHTML = html;
}

function renderUserSidebar(active) {
  var base = getBasePath();
  var items = [
    { id: "dashboard", href: "dashboard.html", title: "داشبورد" },
    { id: "profile", href: "profile.html", title: "ویرایش اطلاعات" },
    { id: "my-books", href: "my-books.html", title: "کتاب‌های من" },
    { id: "borrow", href: "borrow.html", title: "درخواست امانت" },
    { id: "rent", href: "rent.html", title: "درخواست اجاره" },
    { id: "history", href: "history.html", title: "تاریخچه درخواست‌ها" },
    { id: "wishlist", href: "wishlist.html", title: "علاقه‌مندی‌ها" },
    { id: "donate", href: "donate.html", title: "اهدای کتاب" },
    { id: "donate-track", href: "donate-track.html", title: "پیگیری اهدا" }
  ];

  var html = '<div class="sidebar"><h6>حساب کاربری</h6>';
  for (var i = 0; i < items.length; i++) {
    var cls = items[i].id === active ? "active" : "";
    html += '<a class="' + cls + '" href="' + items[i].href + '">' + items[i].title + "</a>";
  }
  html += '<a href="' + base + 'index.html">بازگشت به فروشگاه</a></div>';

  var el = document.getElementById("sidebar");
  if (el) el.innerHTML = html;
}

function renderAdminSidebar(active) {
  var base = getBasePath();
  var items = [
    { id: "dashboard", href: "dashboard.html", title: "داشبورد" },
    { id: "books", href: "books.html", title: "مدیریت کتاب‌ها" },
    { id: "categories", href: "categories.html", title: "دسته‌بندی‌ها" },
    { id: "users", href: "users.html", title: "کاربران" },
    { id: "requests", href: "requests.html", title: "درخواست امانت و اجاره" },
    { id: "deliveries", href: "deliveries.html", title: "تحویل و بازگشت" },
    { id: "fines", href: "fines.html", title: "جریمه‌ها" },
    { id: "donations", href: "donations.html", title: "درخواست‌های اهدا" },
    { id: "orders", href: "orders.html", title: "سفارش‌های فروش" },
    { id: "reports", href: "reports.html", title: "گزارش‌ها" }
  ];

  var html = '<div class="sidebar"><h6>مدیریت ورق</h6>';
  for (var i = 0; i < items.length; i++) {
    var cls = items[i].id === active ? "active" : "";
    html += '<a class="' + cls + '" href="' + items[i].href + '">' + items[i].title + "</a>";
  }
  html += '<a href="' + base + 'index.html">بازگشت به فروشگاه</a></div>';

  var el = document.getElementById("sidebar");
  if (el) el.innerHTML = html;
}

function getQueryParam(name) {
  var params = new URLSearchParams(window.location.search);
  return params.get(name);
}

document.addEventListener("DOMContentLoaded", function () {
  renderNavbar();
  renderFooter();

  var updateHomeNavbar = function () {
    if (document.body.classList.contains("home-page")) {
      document.body.classList.toggle("is-scrolled", window.scrollY > 24);
    }
  };

  updateHomeNavbar();
  window.addEventListener("scroll", updateHomeNavbar, { passive: true });
});
