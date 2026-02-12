// מפתח ה-LocalStorage
const STORAGE_KEY = "todos";

// אלמנטים
const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const clearBtn = document.getElementById("clear-btn");
const list = document.getElementById("todo-list");

// קריאה בטוחה מ-LocalStorage
function safeRead() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

// כתיבה בטוחה ל-LocalStorage
function safeWrite(arr) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
}

// רנדר של הרשימה
function render(todos) {
  list.innerHTML = "";
  todos.forEach((text, idx) => {
    const li = document.createElement("li");
    li.className = "item";
    const span = document.createElement("span");
    span.textContent = text;

    const btnRemove = document.createElement("button");
    btnRemove.className = "btn remove";
    btnRemove.textContent = "מחק";
    btnRemove.addEventListener("click", () => {
      const current = safeRead();
      current.splice(idx, 1);
      safeWrite(current);
      render(current);
    });

    li.append(span, btnRemove);
    list.appendChild(li);
  });
}

// הוספת משימה
function addTodo() {
  const value = input.value.trim();
  if (!value) {
    input.focus();
    return;
  }
  const todos = safeRead();
  todos.push(value);
  safeWrite(todos);
  render(todos);
  input.value = "";
  input.focus();
}

// ניקוי הכל
function clearAll() {
  localStorage.removeItem(STORAGE_KEY);
  render([]);
}

// אירועים
addBtn.addEventListener("click", addTodo);
input.addEventListener("keydown", (e) => e.key === "Enter" && addTodo());
clearBtn.addEventListener("click", clearAll);

// אתחול
render(safeRead());
