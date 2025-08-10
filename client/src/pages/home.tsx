import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import Portfolio from "@/components/portfolio";
import Shop from "@/components/shop";
import About from "@/components/about";
import Contact from "@/components/contact";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="bg-cyber-dark text-white">
      <Navbar />
      <main>
        <Hero />
        <Portfolio />
        <Shop />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
