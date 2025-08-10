import Navbar from "../components/navbar";
import Hero from "../components/hero";
import Portfolio from "../components/portfolio";
import ShopPreview from "../components/shop-preview";
import About from "../components/about";
import Contact from "../components/contact";
import Footer from "../components/footer";

export default function Home() {
  return (
    <div className="bg-cyber-dark text-white">
      <Navbar />
      <main>
        <Hero />
        <Portfolio />
        <ShopPreview />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
