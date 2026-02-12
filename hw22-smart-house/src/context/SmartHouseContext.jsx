import { createContext, useContext, useMemo, useState } from "react";

const SmartHouseContext = createContext(null);

export function SmartHouseProvider({ children }) {
  const [rooms, setRooms] = useState([]);

  function addRoom({ name, type, color }) {
    const trimmed = name.trim();
    if (!trimmed) return false;

    setRooms((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        name: trimmed,
        type,
        color,
        products: [],
      },
    ]);

    return true;
  }

  function addProduct(roomId, product) {
    let ok = true;

    setRooms((prev) =>
      prev.map((r) => {
        if (r.id !== roomId) return r;

        // 1) מקסימום 5 מוצרים בחדר
        if (r.products.length >= 5) {
          ok = false;
          return r;
        }

        // 2) דוד - רק אחד
        if (product === "דוד" && r.products.includes("דוד")) {
          ok = false;
          return r;
        }

        // 3) לכל מוצר אחר - עד 2 מאותו סוג
        const countSame = r.products.filter((p) => p === product).length;
        if (product !== "דוד" && countSame >= 2) {
          ok = false;
          return r;
        }

        return { ...r, products: [...r.products, product] };
      })
    );

    return ok;
  }

  const value = useMemo(() => ({ rooms, addRoom, addProduct }), [rooms]);

  return (
    <SmartHouseContext.Provider value={value}>
      {children}
    </SmartHouseContext.Provider>
  );
}

export function useSmartHouse() {
  const ctx = useContext(SmartHouseContext);
  if (!ctx)
    throw new Error("useSmartHouse must be used inside SmartHouseProvider");
  return ctx;
}
