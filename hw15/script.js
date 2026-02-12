// ========================
// תרגיל 1  setTimeout + clearTimeout
// ========================
const btnChange = document.getElementById('btn-change');
const btnCancel = document.getElementById('btn-cancel');
const colorBox = document.getElementById('color-box');

let pendingTimerId = null; // מזהה הטיימר שממתין ל-2 שניות

btnChange.addEventListener('click', () => {
  // מניעת לחיצות כפולות בזמן המתנה:
  btnChange.disabled = true;

  // הגדרת טיימר של 2 שניות לשינוי הצבע:
  pendingTimerId = setTimeout(() => {
    colorBox.style.background = 'blue';
    btnChange.disabled = false; // החזרה למצב פעיל אחרי שינוי
    pendingTimerId = null; // אין יותר טיימר ממתין
  }, 2000);
});

btnCancel.addEventListener('click', () => {
  // אם יש טיימר ממתין  לבטל
  if (pendingTimerId !== null) {
    clearTimeout(pendingTimerId);
    pendingTimerId = null;
    btnChange.disabled = false; // החזרת הכפתור למצב פעיל
  }
});


// ========================
// תרגיל 2  שעון עצר יורד בעזרת setTimeout
// ========================
const secondsInput = document.getElementById('seconds-input');
const btnTimerStart = document.getElementById('timer-start');
const btnTimerReset = document.getElementById('timer-reset');
const timerDisplay = document.getElementById('timer-display');

let countdownRemaining = 0;
let countdownActive = false;

function renderTimer() {
  if (countdownRemaining > 0) {
    timerDisplay.textContent = countdownRemaining + ' שניות';
  } else if (countdownRemaining === 0 && !countdownActive) {
    timerDisplay.textContent = 'לחץ "התחל"';
  } else {
    timerDisplay.textContent = 'הזמן נגמר';
  }
}

function tick() {
  if (!countdownActive) return;
  if (countdownRemaining > 0) {
    renderTimer();
    countdownRemaining--;
    setTimeout(tick, 1000);
  } else {
    // סיימנו
    countdownActive = false;
    renderTimer();
  }
}

btnTimerStart.addEventListener('click', () => {
  const value = parseInt(secondsInput.value, 10);
  if (Number.isNaN(value) || value < 1) {
    alert('אנא הזן מספר שניות חוקי (>= 1).');
    return;
  }
  countdownRemaining = value;
  countdownActive = true;
  tick();
});

btnTimerReset.addEventListener('click', () => {
  countdownActive = false;
  countdownRemaining = 0;
  renderTimer();
});

renderTimer();


// ========================
// תרגיל 3  customIndexOf עם בדיקות שגיאה
// ========================
function customIndexOf(str, char) {
  // בדיקות קלט:
  if (typeof str !== 'string') {
    throw new Error('קלט לא תקין: הפרמטר הראשון חייב להיות מחרוזת.');
  }
  if (typeof char !== 'string' || char.length !== 1) {
    throw new Error('קלט לא תקין: הפרמטר השני חייב להיות תו יחיד.');
  }

  for (let i = 0; i < str.length; i++) {
    if (str[i] === char) return i;
  }
  return -1;
}

const form = document.getElementById('indexof-form');
const strInput = document.getElementById('str-input');
const charInput = document.getElementById('char-input');
const output = document.getElementById('indexof-output');

document.getElementById('indexof-run').addEventListener('click', () => {
  try {
    const idx = customIndexOf(strInput.value, charInput.value);
    output.textContent = `תוצאה: ${idx}`;
  } catch (err) {
    output.textContent = `שגיאה: ${err.message}`;
  }
});


// ========================
// תרגיל 4  fetch משתמשים והצגת שם + עיר
// ========================
const loadUsersBtn = document.getElementById('load-users');
const usersList = document.getElementById('users-list');
const usersState = document.getElementById('users-state');

loadUsersBtn.addEventListener('click', async () => {
  usersList.innerHTML = '';
  usersState.textContent = 'טוען נתונים...';
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!res.ok) throw new Error('שגיאה בתקשורת (HTTP ' + res.status + ')');
    const users = await res.json();

    if (!Array.isArray(users)) throw new Error('מבנה נתון לא צפוי');
    usersState.textContent = '';
    for (const u of users) {
      const li = document.createElement('li');
      const name = document.createElement('span');
      name.textContent = u.name;
      const city = document.createElement('span');
      city.className = 'city';
      city.textContent = u.address?.city ?? '—';
      li.appendChild(name);
      li.appendChild(city);
      usersList.appendChild(li);
    }
    if (!users.length) {
      usersState.textContent = 'לא נמצאו משתמשים.';
    }
  } catch (e) {
    usersState.textContent = 'שגיאה: ' + e.message;
  }
});
