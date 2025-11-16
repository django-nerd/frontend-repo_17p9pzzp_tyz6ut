import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

const API_BASE = import.meta.env.VITE_BACKEND_URL || "";

export default function Shop() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cart, setCart] = useState([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (query) params.set("q", query);
      if (category) params.set("category", category);
      const res = await fetch(`${API_BASE}/api/products?${params.toString()}`);
      const data = await res.json();
      setItems(data.items || []);
    } catch (e) {
      setError("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    // try to auto-seed if empty
    (async () => {
      try {
        const r = await fetch(`${API_BASE}/api/seed`, { method: "POST" });
        if (r.ok) fetchProducts();
      } catch {}
    })();
  }, []);

  const addToCart = (product) => {
    setCart((c) => {
      const found = c.find((i) => i.id === product.id);
      if (found) return c.map((i) => (i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i));
      return [...c, { id: product.id, title: product.title, price: product.price, quantity: 1 }];
    });
  };

  const subtotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const tax = +(subtotal * 0.08).toFixed(2);
  const total = +(subtotal + tax).toFixed(2);

  const checkout = async () => {
    if (cart.length === 0) return;
    const payload = {
      customer_name: "Guest",
      customer_email: "guest@example.com",
      customer_address: "N/A",
      items: cart.map((i) => ({ product_id: i.id, title: i.title, price: i.price, quantity: i.quantity })),
      subtotal,
      tax,
      total,
      status: "pending",
    };
    const res = await fetch(`${API_BASE}/api/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      setCart([]);
      alert("Order placed! We'll email you a confirmation.");
    } else {
      alert("Checkout failed. Please try again.");
    }
  };

  return (
    <section id="shop" className="bg-gray-50 border-t">
      <div className="max-w-6xl mx-auto px-4 py-14">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h2 className="text-2xl font-bold">Shop Protein Products</h2>
          <div className="flex gap-2">
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search..." className="px-3 py-2 border rounded-md bg-white" />
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="px-3 py-2 border rounded-md bg-white">
              <option value="">All</option>
              <option value="food">Food</option>
              <option value="powder">Powders</option>
              <option value="snack">Snacks</option>
            </select>
            <button onClick={fetchProducts} className="px-4 py-2 bg-gray-900 text-white rounded-md">Filter</button>
          </div>
        </div>

        {loading && <p>Loading products...</p>}
        {error && <p className="text-red-600">{error}</p>}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} onAdd={addToCart} />
          ))}
        </div>

        <div className="mt-10 bg-white rounded-xl border p-5">
          <div className="flex items-center justify-between">
            <h3 className="font-bold">Cart</h3>
            <div className="text-sm text-gray-600">Items: {cart.reduce((s, i) => s + i.quantity, 0)}</div>
          </div>
          {cart.length === 0 ? (
            <p className="text-sm text-gray-600 mt-2">Your cart is empty.</p>
          ) : (
            <div className="mt-3 space-y-2">
              {cart.map((i) => (
                <div key={i.id} className="flex items-center justify-between text-sm">
                  <span>{i.title} × {i.quantity}</span>
                  <span>${(i.price * i.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="border-t pt-3 mt-3 text-sm">
                <div className="flex justify-between"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between"><span>Tax</span><span>${tax.toFixed(2)}</span></div>
                <div className="flex justify-between font-semibold"><span>Total</span><span>${total.toFixed(2)}</span></div>
              </div>
              <button onClick={checkout} className="mt-3 w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700">Checkout</button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
