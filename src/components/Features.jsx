import { Dumbbell, Pizza, FlaskConical } from "lucide-react";

export default function Features() {
  const features = [
    { icon: Pizza, title: "Protein Pizza", text: "A full pizza with 100g of protein. Crispy, tasty, and macro-friendly." },
    { icon: FlaskConical, title: "Premium Powders", text: "Whey, casein, and plant-based blends designed for performance." },
    { icon: Dumbbell, title: "Snacks & More", text: "Cookies, bars, and quick bites to hit your daily protein goals." },
  ];
  return (
    <section id="about" className="bg-white">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold mb-6">Why shop with us</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f) => (
            <div key={f.title} className="border rounded-xl p-6 bg-white">
              <f.icon className="text-indigo-600" />
              <h3 className="mt-3 font-semibold">{f.title}</h3>
              <p className="text-gray-600 text-sm mt-2">{f.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
