import { Palette, Box, Smartphone } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-20 bg-cyber-navy">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-cyber font-bold">
              <span className="text-neon-cyan">ABOUT</span> <span className="text-white">THE ARTIST</span>
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed">
              I'm a digital artist and graphic designer specializing in futuristic, cyberpunk-inspired visuals. 
              With over 8 years of experience in the industry, I create cutting-edge designs that push the 
              boundaries of digital art.
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-neon-cyan rounded-full flex items-center justify-center">
                  <Palette className="text-cyber-dark" size={20} />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-neon-cyan">Digital Artistry</h4>
                  <p className="text-gray-300">Creating immersive digital experiences</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-neon-pink rounded-full flex items-center justify-center">
                  <Box className="text-white" size={20} />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-neon-pink">3D Design</h4>
                  <p className="text-gray-300">Bringing concepts to life in three dimensions</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-neon-green rounded-full flex items-center justify-center">
                  <Smartphone className="text-cyber-dark" size={20} />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-neon-green">UI/UX Design</h4>
                  <p className="text-gray-300">Crafting intuitive user experiences</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800" 
              alt="Professional graphic designer portrait" 
              className="rounded-lg neon-border w-full h-auto"
            />
            <div className="absolute -top-8 -left-8 w-32 h-32 border-2 border-neon-cyan rounded-full animate-pulse-neon"></div>
            <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-gradient-to-br from-neon-pink to-neon-green rounded-full opacity-70 animate-float"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
