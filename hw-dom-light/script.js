/* =====================================================
   גרסת Light עם ניווט פנימי – קוד מדויק לדרישות המטלות
   ===================================================== */

/* -----------------------
   תרגיל DOM 1 – 2 פסקאות
   ----------------------- */
const ex1Preview = document.getElementById('ex1Preview');
document.getElementById('createNameBtn').addEventListener('click', () => {
  const first = (document.getElementById('firstName').value || '').trim() || 'שם פרטי';
  const last  = (document.getElementById('lastName').value  || '').trim()  || 'שם משפחה';
  createNameDiv(first, last);
});

function createNameDiv(firstName, lastName){
  // יצירת ה־DIV והילדים שלו לפי הדרישות
  const div = document.createElement('div');
  div.className = 'product';

  const p1 = document.createElement('p');
  p1.textContent = firstName;
  p1.style.color = 'red';
  p1.style.textDecoration = 'underline';

  const p2 = document.createElement('p');
  p2.textContent = lastName;
  p2.style.fontSize = '50px';
  p2.style.border = '1px solid black';
  p2.style.display = 'inline-block';
  p2.style.padding = '6px 10px';
  p2.style.borderRadius = '8px';

  div.appendChild(p1);
  div.appendChild(p2);

  // הוספה ל־body (כנדרש)
  document.body.appendChild(div.cloneNode(true));

  // ותצוגה מקומית לסקשן
  ex1Preview.innerHTML = '';
  ex1Preview.appendChild(div);
}

/* --------------------------------------
   תרגיל DOM 2 – אתר מודעות (oninput)
   -------------------------------------- */
const productsData = [
  { name: 'אוזניות',      description: 'איכותיות עם ביטול רעשים', price: 199 },
  { name: 'עכבר גיימינג', description: 'חוטי, 6 כפתורים',         price: 129 },
  { name: 'מקלדת מכנית',  description: 'סוויצ׳ים כחולים',          price: 249 },
  { name: 'מטען USB-C',   description: 'מהיר 25W',                 price: 79  },
  { name: 'מסך 24"',      description: 'IPS FHD',                  price: 499 },
  { name: 'כבל HDMI',     description: '2 מטר',                    price: 29  }
];

const productsWrap  = document.getElementById('products');
const maxPriceInput = document.getElementById('maxPrice');
const productsEmpty = document.getElementById('productsEmpty');

function renderProducts(list){
  productsWrap.innerHTML = '';
  list.forEach(p => {
    const d = document.createElement('div');
    d.className = 'product';
    d.innerHTML = `<strong>${p.name}</strong><br>
                   <span class="muted">${p.description}</span><br>
                   מחיר: ${p.price} ₪`;
    productsWrap.appendChild(d);
  });
  productsEmpty.classList.toggle('hidden', list.length !== 0);
}

// סינון בכל הקלדה (oninput)
function filterProducts(){
  productsWrap.innerHTML = '';
  const val = parseFloat(maxPriceInput.value);
  if (isNaN(val)){
    productsEmpty.classList.add('hidden'); // אין מספר – לא תופיע הודעת "אין"
    return;
  }
  const filtered = productsData.filter(p => p.price <= val);
  renderProducts(filtered);
}
maxPriceInput.addEventListener('input', filterProducts);

// הצגה כללית התחלתית (לא חובה לפי המטלה, נוח לדוגמה)
renderProducts(productsData);

/* -------------------------------------
   מתקדם 1 – חיפוש ספרים לפי כותרת
   ------------------------------------- */
const books = [
  { title: 'אלגוריתמים – מבוא',   author: 'אביגיל כהן',   year: 2018 },
  { title: 'ג׳אווהסקריפט המעשית', author: 'ניר לוי',      year: 2021 },
  { title: 'מבני נתונים',          author: 'דנה ישראלי',   year: 2016 },
  { title: 'פייתון למתחילים',      author: 'יואב ברוך',    year: 2020 },
  { title: 'יסודות רשתות',         author: 'חן מזרחי',     year: 2017 },
];

const booksList   = document.getElementById('booksList');
const bookSearch  = document.getElementById('bookSearch');

function renderBooks(items){
  booksList.innerHTML = '';
  if (items.length === 0){
    const p = document.createElement('p');
    p.textContent = 'לא נמצאו ספרים מתאימים';
    p.className = 'muted';
    booksList.appendChild(p);
    return;
  }
  items.forEach(b => {
    const d = document.createElement('div');
    d.className = 'book-card';
    d.innerHTML = `
      <div><strong>${b.title}</strong></div>
      <div style="color:#1457d2">${b.author}</div>
      <div class="muted" style="font-size:.9em">${b.year}</div>`;
    booksList.appendChild(d);
  });
}

function filterBooks(q){
  const query = (q || '').toLowerCase();
  const res = books.filter(b => b.title.toLowerCase().includes(query));
  renderBooks(res);
}
bookSearch.addEventListener('input', e => filterBooks(e.target.value));
renderBooks(books);

/* ---------------------------------------------
   מתקדם 2 – טבלה דו-ממדית + ממוצעי עמודות
   --------------------------------------------- */
const grades = [
  [76, 88, 92],
  [85, 90, 78],
  [90, 94, 86],
  [70, 82, 80],
];
const gradesTable = document.getElementById('gradesTable');

function renderGradesTable(){
  const cols = grades[0]?.length || 0;
  const thead = gradesTable.querySelector('thead');
  const tbody = gradesTable.querySelector('tbody');
  const tfoot = gradesTable.querySelector('tfoot');
  thead.innerHTML = ''; tbody.innerHTML = ''; tfoot.innerHTML = '';

  // כותרות
  const thr = document.createElement('tr');
  const thFirst = document.createElement('th'); thFirst.textContent = 'תלמיד \\ מבחן';
  thr.appendChild(thFirst);
  for (let c=0; c<cols; c++){
    const th = document.createElement('th');
    th.textContent = `מבחן ${c+1}`;
    thr.appendChild(th);
  }
  thead.appendChild(thr);

  // גוף
  grades.forEach((row, i) => {
    const tr = document.createElement('tr');
    const tdName = document.createElement('td'); tdName.textContent = `תלמיד ${i+1}`;
    tr.appendChild(tdName);
    row.forEach(val => {
      const td = document.createElement('td'); td.textContent = val;
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
}
renderGradesTable();

function columnAverages(matrix){
  if (!matrix.length) return [];
  // reduce לחיבור עמודות
  const sums = matrix.reduce((acc, row) => {
    row.forEach((val, idx) => acc[idx] = (acc[idx] || 0) + val);
    return acc;
  }, new Array(matrix[0].length).fill(0));
  return sums.map(sum => sum / matrix.length);
}

document.getElementById('calcAvgBtn').addEventListener('click', () => {
  const avgs = columnAverages(grades);
  const tfoot = gradesTable.querySelector('tfoot');
  tfoot.innerHTML = '';
  const tr = document.createElement('tr');
  const tdLabel = document.createElement('td'); tdLabel.textContent = 'ממוצע';
  tr.appendChild(tdLabel);
  avgs.forEach(avg => {
    const td = document.createElement('td'); td.textContent = avg.toFixed(2);
    tr.appendChild(td);
  });
  tfoot.appendChild(tr);
});

/* -----------------------------------
   מתקדם 3 – רשימת משימות עם מחיקה
   ----------------------------------- */
let todos = [
  { id: 1, text: 'לקנות חלב' },
  { id: 2, text: 'לסדר מסמכים' },
  { id: 3, text: 'להגיש תרגיל DOM' },
];
const todoList = document.getElementById('todoList');
const todoEmpty = document.getElementById('todoEmpty');

function renderTodos(){
  todoList.innerHTML = '';
  if (todos.length === 0){
    todoEmpty.classList.remove('hidden');
    return;
  }
  todoEmpty.classList.add('hidden');
  todos.forEach(item => {
    const row = document.createElement('div');
    row.className = 'todo-item';
    const span = document.createElement('span'); span.textContent = item.text;
    const btn = document.createElement('button'); btn.className = 'btn'; btn.textContent = 'מחק';
    btn.addEventListener('click', () => {
      todos = todos.filter(t => t.id !== item.id); // מחיקה מהמערך
      renderTodos(); // עדכון המסך
    });
    row.appendChild(span); row.appendChild(btn);
    todoList.appendChild(row);
  });
}
renderTodos();

/* ----------------------------
   מתקדם 4 – מיון דו-כיווני
   ---------------------------- */
const numbers = [9, 1, 5, 3, 12, 7, 4];
let ascending = true;
const numbersOut = document.getElementById('numbersOut');
const sortBtn = document.getElementById('sortBtn');
const sortState = document.getElementById('sortState');

function showNumbers(nums){ numbersOut.textContent = nums.join(', '); }
showNumbers(numbers);

sortBtn.addEventListener('click', () => {
  const sorted = [...numbers].sort((a,b) => ascending ? a-b : b-a);
  showNumbers(sorted);
  sortState.textContent = ascending ? '(מסודר: קטן → גדול)' : '(מסודר: גדול → קטן)';
  sortBtn.textContent = ascending ? 'הפוך לסדר גדול לקטן' : 'הפוך לסדר קטן לגדול';
  ascending = !ascending;
});

/* ----------------------------
   מתקדם 5 – משחק צבעים
   ---------------------------- */
const colors = ['red','blue','green','yellow','purple','orange','pink','brown'];
const makeColorsBtn = document.getElementById('makeColors');
const colorSquares = document.getElementById('colorSquares');
const colorPicked = document.getElementById('colorPicked');

makeColorsBtn.addEventListener('click', () => {
  colorSquares.innerHTML = '';
  colors.forEach(c => {
    const box = document.createElement('div');
    box.className = 'square';
    box.style.background = c;
    box.title = c;
    box.addEventListener('click', () => {
      colorPicked.textContent = `בחרת בצבע: ${c}`;
    });
    colorSquares.appendChild(box);
  });
});
