import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import Employee from "./models/Employee.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ===== חישוב __dirname ב-ESM =====
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ===== הגשת קבצים סטטיים מהתיקייה public =====
app.use(express.static(path.join(__dirname, "public")));

// דף הבית – מחזיר את index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ===== חיבור ל-MongoDB Atlas דרך משתנה סביבה =====
const uri = process.env.MONGO_URI;

mongoose
  .connect(uri)
  .then(() => console.log("MongoDB Atlas Connected"))
  .catch((err) => console.log("Mongo error:", err));

// ================== REST API ==================

// קבלת כל העובדים (לטבלה)
app.get("/employees", async (req, res) => {
  try {
    const employees = await Employee.find().sort({ name: 1 });
    res.json(employees);
  } catch (err) {
    console.log("ERROR in GET /employees:", err);
    res.status(500).json({ error: err.message });
  }
});

// הוספת עובד חדש
app.post("/add", async (req, res) => {
  try {
    console.log("Body from client:", req.body);
    const newEmp = await Employee.create(req.body);
    res.json(newEmp);
  } catch (err) {
    console.log("ERROR in POST /add:", err);
    res.status(500).json({ error: err.message });
  }
});

// מחיקת עובד לפי id
app.delete("/employees/:id", async (req, res) => {
  try {
    const result = await Employee.findByIdAndDelete(req.params.id);
    res.json(result);
  } catch (err) {
    console.log("ERROR in DELETE /employees/:id:", err);
    res.status(500).json({ error: err.message });
  }
});

// עדכון עובד לפי id
app.put("/employees/:id", async (req, res) => {
  try {
    const result = await Employee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(result);
  } catch (err) {
    console.log("ERROR in PUT /employees/:id:", err);
    res.status(500).json({ error: err.message });
  }
});

// ===== הדרישות המקוריות של התרגיל =====

// מחיקת עובדים מעל גיל X
app.delete("/deleteByAge/:age", async (req, res) => {
  try {
    const result = await Employee.deleteMany({
      age: { $gt: Number(req.params.age) },
    });
    res.json(result);
  } catch (err) {
    console.log("ERROR in /deleteByAge:", err);
    res.status(500).json({ error: err.message });
  }
});

// שינוי שם מחלקה
app.put("/changeDepartment", async (req, res) => {
  const { oldName, newName } = req.body;

  try {
    const result = await Employee.updateMany(
      { department: oldName },
      { $set: { department: newName } }
    );
    res.json(result);
  } catch (err) {
    console.log("ERROR in /changeDepartment:", err);
    res.status(500).json({ error: err.message });
  }
});

// שרת לוקאלי (לבדיקה אצלך במחשב)
app.listen(3000, () => console.log("Server running on port 3000"));
