export default function ProductCard({ product, onAdd }) {
  return (
    <div className="group border rounded-xl p-4 hover:shadow-md transition bg-white">
      <div className="aspect-square overflow-hidden rounded-lg bg-gray-50">
        <img src={product.image} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition" />
      </div>
      <div className="mt-3">
        <h3 className="font-semibold line-clamp-1">{product.title}</h3>
        <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="font-bold">${product.price.toFixed(2)}</span>
          <button onClick={() => onAdd(product)} className="px-3 py-1.5 rounded-md bg-indigo-600 text-white text-sm hover:bg-indigo-700">Add</button>
        </div>
      </div>
    </div>
  );
}
