const expressionDisplay = document.getElementById("expression");
const resultDisplay = document.getElementById("result");

let expression = "";

document.querySelectorAll(".buttons button").forEach(btn => {
  btn.addEventListener("click", () => {
    const value = btn.textContent;

    if (!isNaN(value) || value === ".") {
      expression += value;
      expressionDisplay.textContent = expression;
    } 
    else if (["+", "-", "*", "/", "%"].includes(value)) {
      expression += " " + value + " ";
      expressionDisplay.textContent = expression;
    }
    else if (value === "C") {
      expression = "";
      expressionDisplay.textContent = "";
      resultDisplay.textContent = "";
    }
    else if (value === "√") {
      if (expression !== "") {
        let num = eval(expression);
        resultDisplay.textContent = "√" + num + " = " + Math.sqrt(num);
        expression = "";
        expressionDisplay.textContent = "";
      }
    }
    else if (value === "x²") {
      if (expression !== "") {
        let num = eval(expression);
        resultDisplay.textContent = num + "² = " + (num * num);
        expression = "";
        expressionDisplay.textContent = "";
      }
    }
    else if (value === "1/x") {
      if (expression !== "") {
        let num = eval(expression);
        if (num === 0) {
          resultDisplay.textContent = "Error (1/0)";
        } else {
          resultDisplay.textContent = "1/" + num + " = " + (1 / num);
        }
        expression = "";
        expressionDisplay.textContent = "";
      }
    }
    else if (value === "=") {
      try {
        let result = eval(expression);
        resultDisplay.textContent = expression + " = " + result;
        expression = "";
        expressionDisplay.textContent = "";
      } catch {
        resultDisplay.textContent = "Error";
        expression = "";
        expressionDisplay.textContent = "";
      }
    }
  });
});



// ====== פונקציות שאלות 1–5 ======

// שאלה 1: ת.ז תקינה
function isValidID(id) {
  return /^\d{9}$/.test(id);
}

// שאלה 2: מספר ראשוני
function isPrime(num) {
  if (num < 2) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
}

// שאלה 3: רווח לפני אות גדולה
function addSpaceBeforeUpperCase(str) {
  return str.replace(/([A-Z])/g, " $1");
}

// שאלה 4: כמה פעמים מופיעה מחרוזת
function countOccurrences(big, small) {
  let count = 0;
  let pos = big.indexOf(small);
  while (pos !== -1) {
    count++;
    pos = big.indexOf(small, pos + 1);
  }
  return count;
}

// שאלה 5: bubble sort
function bubbleSortString(str) {
  let arr = str.split("");
  let n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr.join("");
}
