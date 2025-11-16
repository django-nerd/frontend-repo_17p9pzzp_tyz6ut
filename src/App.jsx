import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Shop from "./components/Shop";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 text-gray-900">
      <Navbar />
      <Hero />
      <Shop />
      <Features />
      <footer id="contact" className="border-t bg-white">
        <div className="max-w-6xl mx-auto px-4 py-10 text-sm text-gray-600 flex flex-col md:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} ProteinHub. All rights reserved.</p>
          <p>Questions? Email support@proteinhub.store</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
