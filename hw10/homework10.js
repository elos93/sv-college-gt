// ================================
// 1. פונקציה שממיינת מערך מהגדול לקטן
// ================================
function sortDesc(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] < arr[j]) {
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
      }
    }
  }
  return arr;
}

// ================================
// 2. פונקציה שמחזירה ערכים משותפים בלי כפילויות
// ================================
function commonValues(arr1, arr2) {
  let result = [];

  for (let i = 0; i < arr1.length; i++) {
    let current = arr1[i];
    let existsInArr2 = false;

    // בדיקה אם current נמצא במערך 2
    for (let j = 0; j < arr2.length; j++) {
      if (current === arr2[j]) {
        existsInArr2 = true;
        break;
      }
    }

    // בדיקה אם current כבר נמצא בתוצאה
    let alreadyInResult = false;
    for (let k = 0; k < result.length; k++) {
      if (result[k] === current) {
        alreadyInResult = true;
        break;
      }
    }

    if (existsInArr2 && !alreadyInResult) {
      result.push(current);
    }
  }

  return result;
}

// ================================
// 3. פונקציה שמחזירה ממוצע של מטריצה
// ================================
function matrixAverage(matrix) {
  let sum = 0;
  let count = 0;

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      sum += matrix[i][j];
      count++;
    }
  }

  return sum / count;
}

// ================================
// 4. פונקציה שסופרת כמה פעמים מופיע מספר ומוחקת אותו בעזרת pop()
// ================================
function countAndRemove(arr, num) {
  let count = 0;

  for (let i = arr.length - 1; i >= 0; i--) {
    if (arr[i] === num) {
      count++;
      // כדי למחוק רק עם pop – מזיזים את הערך לסוף ואז מוחקים
      for (let j = arr.length - 1; j > i; j--) {
        let temp = arr[j];
        arr[j] = arr[j - 1];
        arr[j - 1] = temp;
      }
      arr.pop();
    }
  }

  return count;
}

// ================================
// דוגמאות בדיקה
// ================================

// 1. מיון
console.log("מיון מהגדול לקטן:", sortDesc([5, 2, 9, 1, 7])); // [9,7,5,2,1]

// 2. ערכים משותפים
console.log("ערכים משותפים:", commonValues([1,2,1,2,1], [2,2,2,1,3,1,2])); // [1,2]

// 3. ממוצע מטריצה
console.log("ממוצע מטריצה:", matrixAverage([[1,2,3],[4,5,6],[7,8,9]])); // 5

// 4. ספירה והסרה עם pop
let arr = [1, 2, 3, 2, 4, 2, 5];
console.log("כמות מופעים:", countAndRemove(arr, 2)); // 3
console.log("מערך אחרי הסרה:", arr); // [1,3,4,5]
