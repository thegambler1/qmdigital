import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'glassmorphism backdrop-blur-md' : 'glassmorphism'
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-cyber font-bold text-neon-cyan">
            DIGITAL<span className="text-neon-pink">ART</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <button 
              onClick={() => scrollToSection('home')}
              className="text-gray-300 hover:text-neon-cyan transition-colors duration-300"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('portfolio')}
              className="text-gray-300 hover:text-neon-cyan transition-colors duration-300"
            >
              Portfolio
            </button>
            <button 
              onClick={() => scrollToSection('shop')}
              className="text-gray-300 hover:text-neon-cyan transition-colors duration-300"
            >
              Shop
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="text-gray-300 hover:text-neon-cyan transition-colors duration-300"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-gray-300 hover:text-neon-cyan transition-colors duration-300"
            >
              Contact
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-neon-cyan"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 space-y-4 bg-cyber-navy rounded-lg p-4">
            <button 
              onClick={() => scrollToSection('home')}
              className="block w-full text-left text-gray-300 hover:text-neon-cyan transition-colors duration-300"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('portfolio')}
              className="block w-full text-left text-gray-300 hover:text-neon-cyan transition-colors duration-300"
            >
              Portfolio
            </button>
            <button 
              onClick={() => scrollToSection('shop')}
              className="block w-full text-left text-gray-300 hover:text-neon-cyan transition-colors duration-300"
            >
              Shop
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="block w-full text-left text-gray-300 hover:text-neon-cyan transition-colors duration-300"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="block w-full text-left text-gray-300 hover:text-neon-cyan transition-colors duration-300"
            >
              Contact
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
