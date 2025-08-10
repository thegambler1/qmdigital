export default function Hero() {
  const scrollToPortfolio = () => {
    const element = document.getElementById('portfolio');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden grid-lines">
      <div className="absolute inset-0 bg-gradient-to-br from-cyber-navy via-cyber-dark to-cyber-blue opacity-90"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-5xl md:text-7xl font-cyber font-bold leading-tight">
              <span className="text-neon-cyan animate-pulse-neon">FUTURE</span><br />
              <span className="text-white">DESIGN</span><br />
              <span className="text-neon-pink">STUDIO</span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Crafting next-generation digital experiences through cutting-edge graphic design and visual artistry.
            </p>
            <div className="flex space-x-6">
              <button 
                onClick={scrollToPortfolio}
                className="px-8 py-4 bg-transparent border-2 border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-cyber-dark transition-all duration-300 font-semibold neon-glow"
              >
                VIEW PORTFOLIO
              </button>
              <button 
                onClick={scrollToContact}
                className="px-8 py-4 bg-neon-pink text-white hover:bg-opacity-80 transition-all duration-300 font-semibold"
              >
                HIRE ME
              </button>
            </div>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
              alt="Futuristic digital art with neon elements" 
              className="rounded-lg neon-border animate-float w-full h-auto"
            />
            <div className="absolute -top-4 -left-4 w-24 h-24 border border-neon-green rounded-full animate-pulse-neon"></div>
            <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-neon-pink opacity-50 rounded-full animate-float"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
