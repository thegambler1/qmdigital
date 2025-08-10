import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { PortfolioItem } from "@shared/schema";

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  const { data: portfolioItems, isLoading } = useQuery<PortfolioItem[]>({
    queryKey: ['/api/portfolio', selectedCategory],
    queryFn: async () => {
      const params = selectedCategory !== 'All' ? `?category=${selectedCategory}` : '';
      const response = await fetch(`/api/portfolio${params}`);
      if (!response.ok) throw new Error('Failed to fetch portfolio');
      return response.json();
    }
  });

  const categories = ['All', 'Digital Art', 'UI/UX', 'Branding', '3D Art'];

  if (isLoading) {
    return (
      <section id="portfolio" className="py-20 bg-cyber-navy">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="text-neon-cyan animate-pulse">Loading portfolio...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="portfolio" className="py-20 bg-cyber-navy">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-cyber font-bold mb-6">
            <span className="text-neon-cyan">PORTFOLIO</span> <span className="text-white">GALLERY</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Explore my collection of futuristic designs, digital art, and creative solutions.
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="flex justify-center mb-12">
          <div className="glassmorphism rounded-full p-2">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 font-semibold rounded-full transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-neon-cyan text-cyber-dark'
                      : 'text-gray-300 hover:text-neon-cyan'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Portfolio Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioItems?.map((item) => (
            <div key={item.id} className="group relative overflow-hidden rounded-lg neon-border hover:neon-glow transition-all duration-300">
              <img 
                src={item.imageUrl} 
                alt={item.title} 
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cyber-dark via-transparent to-transparent opacity-0 group-hover:opacity-90 transition-opacity duration-300">
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-xl font-semibold text-neon-cyan mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-300">{item.category} • {item.year}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {portfolioItems?.length === 0 && (
          <div className="text-center text-gray-400">
            No portfolio items found for the selected category.
          </div>
        )}
      </div>
    </section>
  );
}
