// ورود و ثبت نام و مدیریت سشن

function getCurrentUser() {
  var raw = localStorage.getItem("currentUser");
  if (raw) {
    return JSON.parse(raw);
  }
  return null;
}

function setCurrentUser(user) {
  if (user) {
    // پسورد رو تو سشن نگه نمیداریم
    var safe = {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      address: user.address
    };
    localStorage.setItem("currentUser", JSON.stringify(safe));
  } else {
    localStorage.removeItem("currentUser");
  }
}

function login(email, password) {
  var users = getData("users") || [];
  for (var i = 0; i < users.length; i++) {
    if (users[i].email === email && users[i].password === password) {
      setCurrentUser(users[i]);
      return { ok: true, user: users[i] };
    }
  }
  return { ok: false, message: "ایمیل یا رمز عبور اشتباه است" };
}

function register(name, email, password, phone, address) {
  var users = getData("users") || [];

  for (var i = 0; i < users.length; i++) {
    if (users[i].email === email) {
      return { ok: false, message: "این ایمیل قبلا ثبت شده است" };
    }
  }

  if (!name || !email || !password) {
    return { ok: false, message: "لطفا فیلدهای ضروری را پر کنید" };
  }

  if (password.length < 4) {
    return { ok: false, message: "رمز عبور باید حداقل ۴ کاراکتر باشد" };
  }

  var newUser = {
    id: getNextId("user"),
    name: name,
    email: email,
    password: password,
    phone: phone || "",
    address: address || "",
    role: "user"
  };

  users.push(newUser);
  setData("users", users);
  setCurrentUser(newUser);
  return { ok: true, user: newUser };
}

function logout() {
  setCurrentUser(null);
  window.location.href = getBasePath() + "index.html";
}

function requireLogin(redirectTo) {
  var user = getCurrentUser();
  if (!user) {
    alert("برای ادامه باید وارد شوید");
    window.location.href = getBasePath() + "login.html";
    return null;
  }
  return user;
}

function requireAdmin() {
  var user = getCurrentUser();
  if (!user) {
    alert("لطفا وارد شوید");
    window.location.href = getBasePath() + "login.html";
    return null;
  }
  if (user.role !== "admin") {
    alert("دسترسی فقط برای مدیر است");
    window.location.href = getBasePath() + "index.html";
    return null;
  }
  return user;
}

// تشخیص مسیر پایه (برای صفحات داخل پوشه user و admin)
function getBasePath() {
  var path = window.location.pathname.replace(/\\/g, "/");
  if (path.indexOf("/user/") !== -1 || path.indexOf("/admin/") !== -1) {
    return "../";
  }
  return "";
}

function getAssetPath() {
  return getBasePath();
}
