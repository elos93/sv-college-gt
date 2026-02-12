/* ===== Arrow function ===== */

// 1. אורך מחרוזת > 5
const isLongerThan5 = str => str.length > 5;
function checkLength() {
  const str = document.getElementById("str1").value.trim();
  document.getElementById("result1").innerText =
    isLongerThan5(str) ? "כן, המחרוזת ארוכה מ־5" : "לא, המחרוזת קצרה או שווה ל־5";
}

// 2. תו ראשון ואחרון זהים
const sameFirstLastMsg = str => {
  if (str.length === 0) return "מחרוזת ריקה";
  return str[0] === str[str.length - 1] ? "התו הראשון והאחרון זהים" : "התו הראשון והאחרון שונים";
};
function checkFirstLast() {
  const str = document.getElementById("str2").value;
  document.getElementById("result2").innerText = sameFirstLastMsg(str);
}

// 3. האם התו האחרון אות גדולה באנגלית
const lastIsUpper = str => /[A-Z]/.test(str.slice(-1)) ? "אמת" : "שקר";
function checkLastUpper() {
  const str = document.getElementById("str3").value;
  document.getElementById("result3").innerText = lastIsUpper(str);
}

/* ===== Map / forEach ===== */

// 1. הדפסת מספרים שמתחלקים ב-3 + המיקום
function checkDivisible() {
  const input = document.getElementById("arr1").value;
  const arr = input.split(",").map(s => Number(s.trim())).filter(s => !Number.isNaN(s));

  let found = false;
  let output = [];

  arr.forEach((num, i) => {
    if (num % 3 === 0) {
      found = true;
      output.push(`המספר ${num} במיקום ${i} מתחלק ב־3`);
    }
  });

  document.getElementById("result4").innerHTML =
    found ? output.join("<br>") : "The array is not divisible by 3";
}

// 2. U/L לפי מצב האות הקודמת
function checkLetters() {
  const input = document.getElementById("arr2").value;
  const arr = input.split(",").map(s => s.trim()).filter(Boolean);

  const result = arr.map((char, i, a) => {
    if (i === 0) return char === char.toUpperCase() ? "U" : "L";
    return a[i - 1] === a[i - 1].toUpperCase() ? "U" : "L";
  });

  document.getElementById("result5").innerText = result.join(" ");
}

/* ===== Map 3 + Filter 4–5 + Spread 6–7 ===== */

// 3. Map — אינדקס זוגי -> האינדקס, אחרת הערך
const evenIndexToIndex = arr => arr.map((v, i) => (i % 2 === 0 ? i : v));
function mapEvenIndexToIndex() {
  const arr = document.getElementById("arr3").value.split(",").map(s => s.trim()).filter(Boolean);
  document.getElementById("result6").innerText = JSON.stringify(evenIndexToIndex(arr));
}

// 4. Filter — רק גילאים מעל 18
const adultsOnly = ages => ages.filter(age => age > 18);
function filterAdults() {
  const ages = document.getElementById("ages").value
    .split(",")
    .map(s => Number(s.trim()))
    .filter(n => !Number.isNaN(n));
  document.getElementById("result7").innerText = JSON.stringify(adultsOnly(ages));
}

// 5. Filter — הסרת איבר לפי אינדקס (ברירת מחדל: 3)
const removeAt = (arr, idx) => arr.filter((_, i) => i !== idx);
function removeAtIndex() {
  const arr = document.getElementById("arr4").value
    .split(",")
    .map(s => Number(s.trim()))
    .filter(n => !Number.isNaN(n));
  const idxInput = document.getElementById("removeIndex").value;
  const idx = idxInput === "" ? 3 : Number(idxInput);
  document.getElementById("result8").innerText = JSON.stringify(removeAt(arr, idx));
}

// 6. Spread — הוספת שם ללא שינוי המקור
const addName = (names, newName) => [...names, newName];
function addNameUI() {
  const names = document.getElementById("names1").value.split(",").map(s => s.trim()).filter(Boolean);
  const newName = (document.getElementById("newName").value || "").trim();
  const updated = newName ? addName(names, newName) : names.slice();
  document.getElementById("result9").innerHTML =
    `מקור: ${JSON.stringify(names)}<br>חדש: ${JSON.stringify(updated)}`;
}

// 7. Spread — איחוד שני מערכי שמות (עם אפשרות הסרת כפילויות)
const mergeNames = (a, b) => [...a, ...b];
const mergeUniqueNames = (a, b) => [...new Set([...a, ...b])];
function mergeNamesUI() {
  const A = document.getElementById("namesA").value.split(",").map(s => s.trim()).filter(Boolean);
  const B = document.getElementById("namesB").value.split(",").map(s => s.trim()).filter(Boolean);
  const unique = document.getElementById("uniqueOnly").checked;

  const merged = unique ? mergeUniqueNames(A, B) : mergeNames(A, B);
  document.getElementById("result10").innerText = JSON.stringify(merged);
}
