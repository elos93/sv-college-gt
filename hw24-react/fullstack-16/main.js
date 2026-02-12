// ========================
// Homework 16 - Full English Version
// ========================

// 1) Import libraries
const dayjs = require("dayjs");
const { mean, max, min } = require("lodash");
const { z } = require("zod");
const validator = require("validator");
const { v4: uuidv4 } = require("uuid");

// ========================
// 1. Dates with dayjs
// ========================
console.log("1) --- Dates with dayjs ---");

const birthDate = dayjs("2000-03-13");

// print in DD/MM/YYYY
const formattedBirth = birthDate.format("DD/MM/YYYY");
console.log("Birth date:", formattedBirth);

// add 30 days
const birthPlus30 = birthDate.add(30, "day");
console.log("Birth date + 30 days:", birthPlus30.format("DD/MM/YYYY"));

// check if today and today+30 are in the same month
const now = dayjs();
const nowPlus30 = now.add(30, "day");
const sameMonth =
  now.month() === nowPlus30.month() && now.year() === nowPlus30.year();

console.log("Is today and today+30 in the same month?", sameMonth);

// ========================
// 2. Simple calculations with lodash
// ========================
console.log("\n2) --- Calculations with lodash ---");

const grades = [92, 81, 100, 74, 88, 95];

// average
const avg = mean(grades);
console.log("Average:", avg);

// max & min
const maxGrade = max(grades);
const minGrade = min(grades);
console.log("Max grade:", maxGrade);
console.log("Min grade:", minGrade);

// new array rounded to tens (92 → 90)
const roundedToTens = grades.map((g) => Math.floor(g / 10) * 10);
console.log("Grades rounded to tens:", roundedToTens);

// ========================
// 3. Basic validation with zod
// ========================
console.log("\n3) --- Validation with zod ---");

const studentSchema = z.object({
  fullName: z.string().min(4, "Name must be more than 3 characters").max(25),
  grade: z.number().min(0).max(100),
});

const studentsToValidate = [
  { fullName: "Dana Levi", grade: 92 }, // valid
  { fullName: "It", grade: 120 }, // invalid
];

studentsToValidate.forEach((student, index) => {
  const result = studentSchema.safeParse(student);

  if (result.success) {
    console.log(`Student ${index}: VALID ✅`, result.data);
  } else {
    console.log(`Student ${index}: INVALID ❌`);

    // in newer zod versions the array is called "issues"
    const messages = result.error.issues.map((issue) => issue.message);
    console.log("Errors:", messages);
  }
});

// ========================
// 4. Email / URL validation with validator (FILTER VERSION)
// ========================
console.log("\n4) --- Email and URL validation with validator ---");

const emails = ["a@b.com", "bad@", "user.name@gmail.com"];
const urls = ["https://example.com", "http://nope", "not-a-url"];

// filter valid emails
const validEmails = emails.filter((email) => validator.isEmail(email));
const validUrls = urls.filter((url) =>
  validator.isURL(url, { require_protocol: true })
);

console.log("Valid emails only:");
console.log(validEmails);

console.log("\nValid URLs only:");
console.log(validUrls);

// ========================
// 5. Add unique IDs with uuid
// ========================
console.log("\n5) --- Add unique IDs with uuid ---");

const students = [
  { fullName: "Dana Levi", grade: 92 },
  { fullName: "Itay Cohen", grade: 81 },
];

const studentsWithId = students.map((s) => ({
  ...s,
  id: uuidv4(),
}));

console.log("Students with IDs:");
console.log(studentsWithId);
