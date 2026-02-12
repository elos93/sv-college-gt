const KEY = "loggedUser";

const loginForm = document.getElementById("login-form");
const usernameEl = document.getElementById("username");
const passwordEl = document.getElementById("password");

const welcome = document.getElementById("welcome");
const greet = document.getElementById("greet");
const logoutBtn = document.getElementById("logout-btn");

function getUser() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function setUser(user) {
  localStorage.setItem(KEY, JSON.stringify(user));
}

function clearUser() {
  localStorage.removeItem(KEY);
}

function showLogin() {
  loginForm.classList.remove("hidden");
  welcome.classList.add("hidden");
  usernameEl.focus();
}

function showWelcome(name) {
  greet.textContent = `שלום ${name}, אתה מחובר`;
  loginForm.classList.add("hidden");
  welcome.classList.remove("hidden");
}

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const u = usernameEl.value.trim();
  const p = passwordEl.value.trim();
  if (u === "ADMIN" && p === "123456") {
    setUser({ username: u });
    showWelcome(u);
    loginForm.reset();
  } else {
    alert("שם משתמש או סיסמה שגויים. נסה ADMIN / 123456");
    passwordEl.focus();
  }
});

logoutBtn.addEventListener("click", () => {
  clearUser();
  showLogin();
});

// אתחול מסך לפי מצב שמור
const stored = getUser();
if (stored?.username) {
  showWelcome(stored.username);
} else {
  showLogin();
}
