const url = "http://localhost:3000";

let employeesCache = [];
let editId = null;

// טוען את כל העובדים בעת פתיחת הדף
async function loadEmployees() {
  try {
    const res = await fetch(url + "/employees");
    const data = await res.json();
    employeesCache = data;
    renderTable();
  } catch (err) {
    console.log("loadEmployees error:", err);
    alert("שגיאה בטעינת העובדים");
  }
}

// מציג את הטבלה על המסך
function renderTable() {
  const tbody = document.getElementById("employeesTableBody");
  const noMsg = document.getElementById("noEmployeesMsg");

  tbody.innerHTML = "";

  if (!employeesCache.length) {
    noMsg.classList.remove("d-none");
    return;
  }

  noMsg.classList.add("d-none");

  employeesCache.forEach((emp) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${emp.name}</td>
      <td>${emp.department}</td>
      <td>${emp.age}</td>
      <td>${emp.salary}</td>
      <td class="text-center">
        <button class="btn btn-sm btn-secondary me-2" onclick="startEditEmployee('${emp._id}')">עריכה</button>
        <button class="btn btn-sm btn-danger" onclick="deleteEmployee('${emp._id}')">מחק</button>
      </td>
    `;

    tbody.appendChild(tr);
  });
}

// שמירת עובד - אם יש editId => עדכון, אחרת => הוספה
async function saveEmployee() {
  const data = {
    name: document.getElementById("name").value,
    department: document.getElementById("department").value,
    age: Number(document.getElementById("age").value),
    salary: Number(document.getElementById("salary").value),
  };

  if (!data.name || !data.department || !data.age || !data.salary) {
    alert("חובה למלא את כל השדות");
    return;
  }

  try {
    if (editId) {
      // עדכון
      const res = await fetch(url + "/employees/" + editId, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      await res.json();
      alert("העובד עודכן בהצלחה");
    } else {
      // הוספה
      const res = await fetch(url + "/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      await res.json();
      alert("העובד נוסף בהצלחה");
    }

    clearForm();
    await loadEmployees();
  } catch (err) {
    console.log("saveEmployee error:", err);
    alert("שגיאה בשמירת העובד");
  }
}

// התחלת עריכה
function startEditEmployee(id) {
  const emp = employeesCache.find((e) => e._id === id);
  if (!emp) return;

  editId = id;
  document.getElementById("name").value = emp.name;
  document.getElementById("department").value = emp.department;
  document.getElementById("age").value = emp.age;
  document.getElementById("salary").value = emp.salary;

  document.getElementById("saveBtn").textContent = "עדכון עובד";
  document.getElementById("cancelEditBtn").classList.remove("d-none");
  document.getElementById("editStatus").textContent =
    "עורך כעת את העובד: " + emp.name;
}

// ביטול עריכה
function cancelEdit() {
  editId = null;
  clearForm();
  document.getElementById("saveBtn").textContent = "הוסף עובד";
  document.getElementById("cancelEditBtn").classList.add("d-none");
  document.getElementById("editStatus").textContent = "";
}

// ניקוי הטופס
function clearForm() {
  document.getElementById("name").value = "";
  document.getElementById("department").value = "";
  document.getElementById("age").value = "";
  document.getElementById("salary").value = "";
}

// מחיקת עובד בודד
async function deleteEmployee(id) {
  if (!confirm("אתה בטוח שברצונך למחוק את העובד?")) return;

  try {
    const res = await fetch(url + "/employees/" + id, {
      method: "DELETE",
    });
    await res.json();
    alert("העובד נמחק");
    await loadEmployees();
  } catch (err) {
    console.log("deleteEmployee error:", err);
    alert("שגיאה במחיקת העובד");
  }
}

// מחיקת עובדים מעל גיל X (לפי דרישת התרגיל)
async function deleteByAge() {
  const age = document.getElementById("ageDel").value;
  if (!age) {
    alert("נא למלא גיל");
    return;
  }

  try {
    const res = await fetch(url + "/deleteByAge/" + age, {
      method: "DELETE",
    });
    await res.json();
    alert("עובדים מעל גיל " + age + " נמחקו");
    await loadEmployees();
  } catch (err) {
    console.log("deleteByAge error:", err);
    alert("שגיאה במחיקת עובדים מעל גיל");
  }
}

// שינוי שם מחלקה (דרישת תרגיל)
async function changeDept() {
  const oldName = document.getElementById("oldDept").value;
  const newName = document.getElementById("newDept").value;

  if (!oldName || !newName) {
    alert("נא למלא שם ישן וחדש");
    return;
  }

  try {
    const res = await fetch(url + "/changeDepartment", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ oldName, newName }),
    });
    await res.json();
    alert("שם המחלקה עודכן");
    await loadEmployees();
  } catch (err) {
    console.log("changeDept error:", err);
    alert("שגיאה בעדכון שם המחלקה");
  }
}

// טעינה ראשונית
window.addEventListener("DOMContentLoaded", loadEmployees);
