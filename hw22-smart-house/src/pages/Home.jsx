import { useNavigate } from "react-router-dom";
import Header from "../components/Header.jsx";
import RoomCard from "../components/RoomCard.jsx";
import { useSmartHouse } from "../context/SmartHouseContext.jsx";

export default function Home() {
  const nav = useNavigate();
  const { rooms } = useSmartHouse();

  return (
    <div className="page">
      <Header subtitle="מסך הבית – ניהול חדרים חכם" />

      <section className="panel">
        <div className="rooms-row">
          {rooms.map((r) => (
            <RoomCard
              key={r.id}
              name={r.name}
              color={r.color}
              onClick={() => nav(`/room/${r.id}`)}
            />
          ))}
        </div>

        <button
          className="fab"
          onClick={() => nav("/addroom")}
          aria-label="Add Room"
        >
          +
        </button>

        <p className="hint">
          לחץ על ➕ כדי להוסיף חדר חדש. לחץ על חדר כדי להיכנס אליו.
        </p>
      </section>
    </div>
  );
}
