import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header.jsx";
import { useSmartHouse } from "../context/SmartHouseContext.jsx";

const PRODUCTS = ["מזגן", "מנורה", "מערכת סטריאו", "דוד"];

export default function Room() {
  const nav = useNavigate();
  const { roomId } = useParams();
  const { rooms, addProduct } = useSmartHouse();

  const room = useMemo(
    () => rooms.find((r) => r.id === roomId),
    [rooms, roomId]
  );

  const [showAdd, setShowAdd] = useState(false);
  const [product, setProduct] = useState("מזגן");

  if (!room) {
    return (
      <div className="page">
        <Header subtitle="חדר לא נמצא" />
        <section className="panel">
          <p>לא נמצא חדר כזה. חזור למסך הבית.</p>
          <button className="btn" onClick={() => nav("/")}>
            חזרה
          </button>
        </section>
      </div>
    );
  }

  function handleAdd() {
    const ok = addProduct(room.id, product);
    if (!ok) {
      alert("ERROR");
      return;
    }
    setShowAdd(false);
  }

  return (
    <div className="page">
      <Header subtitle="פרטי החדר והוספת מוצרים" />

      <section className="panel room-panel">
        <div className="room-meta">
          <div>
            שם החדר: <b>{room.name}</b>
          </div>
          <div>
            סוג החדר: <b>{room.type}</b>
          </div>
          <div className="color-dot" style={{ background: room.color }} />
        </div>

        <button className="btn" onClick={() => setShowAdd(true)}>
          הוסף מוצר
        </button>

        {showAdd && (
          <div className="add-product">
            <select
              value={product}
              onChange={(e) => setProduct(e.target.value)}
            >
              {PRODUCTS.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>

            <button className="btn" onClick={handleAdd}>
              הוסף
            </button>
          </div>
        )}

        {room.products.length > 0 && (
          <>
            <h3 className="section-title">מוצרים בחדר</h3>
            <div className="products">
              {room.products.map((p, i) => (
                <span key={i} className="tag">
                  {p}
                </span>
              ))}
            </div>
          </>
        )}

        <button className="btn ghost" onClick={() => nav("/")}>
          חזרה למסך הבית
        </button>

        <p className="hint small">
          כללים: עד 5 מוצרים • דוד אחד • עד 2 מכל מוצר אחר
        </p>
      </section>
    </div>
  );
}
