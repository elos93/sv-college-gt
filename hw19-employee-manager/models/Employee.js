import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema({
  name: String,
  department: String,
  age: Number,
  salary: Number,
});

const Employee = mongoose.model("Employee", EmployeeSchema);

export default Employee;
