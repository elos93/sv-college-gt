const path = require("path");
const fs = require("fs");
const express = require("express");

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// להגיש את תיקיית ה-HTML
app.use(express.static(path.join(__dirname, "html")));

// ======== GET PAGES ========
app.get("/", (req, res) => res.redirect("/login"));
app.get("/login", (req, res) =>
  res.sendFile(path.join(__dirname, "html", "login.html"))
);
app.get("/signup", (req, res) =>
  res.sendFile(path.join(__dirname, "html", "signup.html"))
);
app.get("/forgot", (req, res) =>
  res.sendFile(path.join(__dirname, "html", "forgot.html"))
);
app.get("/home", (req, res) =>
  res.sendFile(path.join(__dirname, "html", "home.html"))
);

// ======== HELPERS ========
function isValidUsername(u) {
  return typeof u === "string" && u.length >= 4 && u.length <= 8;
}
function isValidEmail(e) {
  return typeof e === "string" && e.includes("@");
}
function isValidPassword(pw) {
  return (
    typeof pw === "string" &&
    pw.length >= 5 &&
    pw.length <= 10 &&
    pw.includes("$")
  );
}
function fail(res, msg = "Error", code = 400) {
  return res.status(code).send(msg); // בדיוק "Error" כשצריך
}
function appendUserToFile(userObj) {
  const line =
    JSON.stringify({ ...userObj, createdAt: new Date().toISOString() }) + "\n";
  fs.appendFileSync(path.join(__dirname, "users.txt"), line, "utf8");
}

// ======== POST: SIGNUP ========
app.post("/signup", (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  // דרישת המטלה: להדפיס לוג של האימייל והסיסמה בשרת
  console.log("SIGNUP attempt:", { email, password });

  // ולידציות לפי המטלה
  if (!isValidUsername(username)) return fail(res);
  if (!isValidEmail(email)) return fail(res);
  if (!isValidPassword(password)) return fail(res);
  if (password !== confirmPassword) return fail(res);

  // שמירת כל פרטי היוזר לקובץ טקסט בשרת (append)
  appendUserToFile({ username, email, password });

  // העברה ל-HomePage עם שם המשתמש
  return res.redirect("/home?user=" + encodeURIComponent(username));
});

// ======== POST: LOGIN ========
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  // לוג כפי שנתבקש
  console.log("LOGIN attempt:", { email, password });

  if (!isValidEmail(email) || !password) return fail(res);

  // בונוס: בדיקת משתמש "קשיח" בישראל
  if (email === "israel@svcollege.co.il" && password === "1234") {
    return res.send("התחברת בהצלחה");
  } else {
    return res.status(401).send("לא התחברת");
  }
});

// ======== POST: FORGOT PASSWORD (דמה) ========
app.post("/forgot", (req, res) => {
  const { email } = req.body;
  console.log("FORGOT attempt:", { email });
  if (!isValidEmail(email)) return fail(res);
  return res.send("If account exists, reset link was sent.");
});

// ======== BONUS גדול: API ל-FETCH ========
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  console.log("API LOGIN attempt:", { email, password });

  if (!isValidEmail(email) || !password) {
    return res.status(400).json({ ok: false, message: "Error" });
  }

  const ok = email === "israel@svcollege.co.il" && password === "1234";
  if (!ok) return res.status(401).json({ ok: false, message: "לא התחברת" });

  // הצלחה: נחזיר גם את ה-"username" לתצוגה (כאן נשתמש באימייל כשם)
  return res.json({ ok: true, message: "התחברת בהצלחה", username: email });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
