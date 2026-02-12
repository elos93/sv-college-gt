import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header.jsx";
import { useSmartHouse } from "../context/SmartHouseContext.jsx";

export default function AddRoom() {
  const nav = useNavigate();
  const { addRoom } = useSmartHouse();

  const [type, setType] = useState("חדר שינה");
  const [name, setName] = useState("");
  const [color, setColor] = useState("#60a5fa");

  function handleCreate() {
    const ok = addRoom({ name, type, color });
    if (!ok) {
      alert("ERROR");
      return;
    }
    nav("/");
  }

  return (
    <div className="page">
      <Header subtitle="הוספת חדר חדש" />

      <section className="panel form">
        <label>
          בחר חדר חדש
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option>חדר שינה</option>
            <option>אמבטיה/שירותים</option>
            <option>מטבח</option>
          </select>
        </label>

        <label>
          שם החדר
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="לדוגמה: A"
          />
        </label>

        <label>
          צבע החדר
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </label>

        <div className="row">
          <button className="btn ghost" onClick={() => nav("/")}>
            ביטול
          </button>
          <button className="btn" onClick={handleCreate}>
            צור
          </button>
        </div>
      </section>
    </div>
  );
}
