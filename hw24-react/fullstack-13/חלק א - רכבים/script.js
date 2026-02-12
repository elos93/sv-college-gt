// ===========================================
// חלק א – מערכת השכרת רכבים (OOP ב-JS)
// ===========================================

// מחלקת נסיעה: שם המשכיר, תאריך (ISO/string/Date), ק"מ נסיעה
class Nesiah {
  constructor(renterName, date, km) {
    if (!renterName || !date || isNaN(Number(km)) || Number(km) < 0) {
      throw new Error("ערכי נסיעה לא תקינים");
    }
    this.renterName = renterName;
    this.date = typeof date === "string" ? new Date(date) : date;
    this.km = Number(km);
  }
}

// מחלקת רכב: חברה, מודל, סטטוס (פנוי/מושכר), ק"מ כולל, מערך נסיעות
class Rechev {
  constructor(companyName, modelName, totalKm = 0) {
    if (!companyName || !modelName) throw new Error("חסר שם חברה/מודל");
    this.companyName = companyName;
    this.modelName = modelName;
    this.isAvailable = true; // ברירת מחדל: פנוי
    this.totalKm = Number(totalKm) || 0;
    this.trips = []; // מערך של Nesiah
  }

  // מתודה שמחשבת מחדש את סך הק"מ מכל הנסיעות
  recalcTotalKm() {
    const tripsSum = this.trips.reduce((sum, t) => sum + t.km, 0);
    this.totalKm = tripsSum;
    return this.totalKm;
  }

  // הוספת נסיעה לרכב ועדכון ק"מ כולל
  addTrip(nesiah) {
    if (!(nesiah instanceof Nesiah)) {
      throw new Error("יש להעביר אובייקט מסוג Nesiah");
    }
    this.trips.push(nesiah);
    this.recalcTotalKm();
    // אופציונלי: במהלך ההשכרה ניתן לסמן כמושכר
    this.isAvailable = false;
  }

  // סימון הרכב כפנוי/מושכר (שליטה ידנית, אופציונלי)
  setAvailability(isAvailable) {
    this.isAvailable = Boolean(isAvailable);
  }

  toString() {
    return `${this.companyName} ${this.modelName} | ק\"מ כולל: ${this.totalKm} | ${this.isAvailable ? "פנוי" : "מושכר"}`;
  }
}

// מחלקת צי הרכבים של החברה
class CompanyFleet {
  constructor(companyName) {
    if (!companyName) throw new Error("חסר שם חברה");
    this.companyName = companyName;
    this.cars = []; // מערך של Rechev
  }

  // הוספת רכב חדש לצי
  addCar(car) {
    if (!(car instanceof Rechev)) {
      throw new Error("יש להעביר אובייקט מסוג Rechev");
    }
    this.cars.push(car);
  }

  // החזרת הרכב עם הקילומטראז' הגבוה ביותר (או null אם אין רכבים)
  getMaxKmCar() {
    if (this.cars.length === 0) return null;
    return this.cars.reduce((maxCar, car) => (car.totalKm > maxCar.totalKm ? car : maxCar));
  }

  // החזרת רשימת הרכבים הפנויים (וגם הדפסה לקונסול)
  printAvailableCars() {
    const available = this.cars.filter((c) => c.isAvailable);
    available.forEach((c) => console.log(c.toString()));
    return available;
  }

  // הוספת נסיעה לרכב ספציפי לפי שם המודל
  addTripToCarByModel(modelName, nesiah) {
    const car = this.cars.find((c) => c.modelName === modelName);
    if (!car) throw new Error(`לא נמצא רכב עם מודל: ${modelName}`);
    car.addTrip(nesiah);
    return car;
  }
}

// דוגמת שימוש מינימלית (מותר למחוק בהגשה):
/*
const fleet = new CompanyFleet("RentGo");
const car1 = new Rechev("Toyota", "Corolla");
const car2 = new Rechev("Hyundai", "Ioniq");
fleet.addCar(car1);
fleet.addCar(car2);
fleet.addTripToCarByModel("Corolla", new Nesiah("דוד", "2025-10-10", 120));
car1.setAvailability(true);
console.log("מקס ק\"מ:", fleet.getMaxKmCar()?.toString());
*/
