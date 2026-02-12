import { useEffect, useMemo, useRef, useState } from "react";

function Products() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ useRef כדי להתמקד אוטומטית ב-select
  const categorySelectRef = useRef(null);

  // שליפת מוצרים פעם אחת כשהקומפוננטה נטענת
  useEffect(() => {
    const controller = new AbortController();

    async function fetchProducts() {
      try {
        setLoading(true);
        setError("");

        const res = await fetch("https://dummyjson.com/products", {
          signal: controller.signal,
        });

        if (!res.ok) {
          throw new Error("שגיאה בשליפת נתונים מהשרת");
        }

        const data = await res.json();
        setProducts(data.products || []);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "משהו השתבש");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();

    return () => controller.abort();
  }, []);

  // ✅ פוקוס אוטומטי ל-select כשהקומפוננטה נטענת
  useEffect(() => {
    categorySelectRef.current?.focus();
  }, []);

  // יצירת רשימת קטגוריות דינמית מהמוצרים
  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category));
    return ["all", ...Array.from(set).sort()];
  }, [products]);

  // סינון מוצרים לפי קטגוריה
  const filteredProducts = useMemo(() => {
    if (selectedCategory === "all") return products;
    return products.filter((p) => p.category === selectedCategory);
  }, [products, selectedCategory]);

  if (loading) {
    return (
      <div className="status loading">
        <div className="spinner"></div>
        <div>טוען מוצרים...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="status error">
        שגיאה: {error}
        <div className="hint">נסה לרענן את הדף או לבדוק חיבור אינטרנט.</div>
      </div>
    );
  }

  return (
    <section className="products">
      <div className="controls">
        <label className="label">
          קטגוריה:
          <select
            ref={categorySelectRef}
            className="select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === "all" ? "All" : cat}
              </option>
            ))}
          </select>
        </label>

        <div className="count">
          מוצגים: <b>{filteredProducts.length}</b>
        </div>
      </div>

      <div className="grid">
        {filteredProducts.map((p, index) => (
          <article
            key={p.id}
            className="card"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <div className="thumbWrapper">
              <img
                className="thumb"
                src={p.thumbnail}
                alt={p.title}
                loading="lazy"
              />
            </div>
            <div className="cardBody">
              <h3 className="title">{p.title}</h3>
              <div className="meta">
                <span className="price">${p.price}</span>
                <span className="category">{p.category}</span>
              </div>

              {p.description && <p className="desc">{p.description}</p>}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Products;

// import { useEffect, useMemo, useState } from "react";

// function Products() {
//   const [products, setProducts] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("all");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // שליפת מוצרים פעם אחת כשהקומפוננטה נטענת
//   useEffect(() => {
//     const controller = new AbortController();

//     async function fetchProducts() {
//       try {
//         setLoading(true);
//         setError("");

//         const res = await fetch("https://dummyjson.com/products", {
//           signal: controller.signal,
//         });

//         if (!res.ok) {
//           throw new Error("שגיאה בשליפת נתונים מהשרת");
//         }

//         const data = await res.json();
//         setProducts(data.products || []);
//       } catch (err) {
//         if (err.name !== "AbortError") {
//           setError(err.message || "משהו השתבש");
//         }
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchProducts();

//     return () => controller.abort();
//   }, []);

//   // יצירת רשימת קטגוריות דינמית מהמוצרים
//   const categories = useMemo(() => {
//     const set = new Set(products.map((p) => p.category));
//     return ["all", ...Array.from(set).sort()];
//   }, [products]);

//   // סינון מוצרים לפי קטגוריה
//   const filteredProducts = useMemo(() => {
//     if (selectedCategory === "all") return products;
//     return products.filter((p) => p.category === selectedCategory);
//   }, [products, selectedCategory]);

//   if (loading) {
//     return (
//       <div className="status loading">
//         <div className="spinner"></div>
//         <div>טוען מוצרים...</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="status error">
//         שגיאה: {error}
//         <div className="hint">נסה לרענן את הדף או לבדוק חיבור אינטרנט.</div>
//       </div>
//     );
//   }

//   return (
//     <section className="products">
//       <div className="controls">
//         <label className="label">
//           קטגוריה:
//           <select
//             className="select"
//             value={selectedCategory}
//             onChange={(e) => setSelectedCategory(e.target.value)}
//           >
//             {categories.map((cat) => (
//               <option key={cat} value={cat}>
//                 {cat === "all" ? "All" : cat}
//               </option>
//             ))}
//           </select>
//         </label>

//         <div className="count">
//           מוצגים: <b>{filteredProducts.length}</b>
//         </div>
//       </div>

//       <div className="grid">
//         {filteredProducts.map((p, index) => (
//           <article
//             key={p.id}
//             className="card"
//             style={{ animationDelay: `${index * 0.05}s` }}
//           >
//             <div className="thumbWrapper">
//               <img
//                 className="thumb"
//                 src={p.thumbnail}
//                 alt={p.title}
//                 loading="lazy"
//               />
//             </div>
//             <div className="cardBody">
//               <h3 className="title">{p.title}</h3>
//               <div className="meta">
//                 <span className="price">${p.price}</span>
//                 <span className="category">{p.category}</span>
//               </div>

//               {p.description && <p className="desc">{p.description}</p>}
//             </div>
//           </article>
//         ))}
//       </div>
//     </section>
//   );
// }

// export default Products;
