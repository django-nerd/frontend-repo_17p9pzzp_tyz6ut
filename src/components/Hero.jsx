import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-extrabold tracking-tight"
          >
            Fuel your goals with high-protein foods and supplements
          </motion.h1>
          <p className="mt-4 text-gray-600">
            Discover delicious meals like our 100g Protein Pizza alongside premium powders, snacks, and more.
          </p>
          <div className="mt-6 flex gap-3">
            <a href="#shop" className="bg-indigo-600 text-white px-5 py-3 rounded-md font-semibold hover:bg-indigo-700 transition">Shop now</a>
            <Link to="#about" className="px-5 py-3 rounded-md border font-semibold hover:bg-gray-50 transition">Learn more</Link>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative"
        >
          <img
            src="https://images.unsplash.com/photo-1542281286-9e0a16bb7366"
            alt="Protein pizza"
            className="w-full h-80 object-cover rounded-xl shadow-lg"
          />
          <div className="absolute -bottom-5 -left-5 bg-white rounded-xl shadow p-4">
            <p className="font-bold">Protein Pizza</p>
            <p className="text-sm text-gray-600">100g protein per pizza</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
