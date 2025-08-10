export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className="py-12 bg-cyber-navy border-t border-gray-800">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="text-2xl font-cyber font-bold text-neon-cyan mb-4">
              DIGITAL<span className="text-neon-pink">ART</span>
            </div>
            <p className="text-gray-300">
              Creating the future of digital design, one pixel at a time.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <div className="space-y-2">
              <button 
                onClick={() => scrollToSection('portfolio')}
                className="block text-gray-300 hover:text-neon-cyan transition-colors duration-300"
              >
                Portfolio
              </button>
              <button 
                onClick={() => scrollToSection('shop')}
                className="block text-gray-300 hover:text-neon-cyan transition-colors duration-300"
              >
                Shop
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="block text-gray-300 hover:text-neon-cyan transition-colors duration-300"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="block text-gray-300 hover:text-neon-cyan transition-colors duration-300"
              >
                Contact
              </button>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Services</h4>
            <div className="space-y-2">
              <p className="text-gray-300">Digital Art Creation</p>
              <p className="text-gray-300">UI/UX Design</p>
              <p className="text-gray-300">3D Modeling</p>
              <p className="text-gray-300">Brand Identity</p>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 Digital Art Studio. All rights reserved. | Designed with <span className="text-neon-pink">♥</span> in the future.
          </p>
        </div>
      </div>
    </footer>
  );
}
