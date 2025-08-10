import { useQuery } from "@tanstack/react-query";
import { ExternalLink, ShoppingCart, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import type { Product } from "@shared/schema";

export default function ShopPreview() {
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products', 'featured'],
    queryFn: async () => {
      const response = await fetch('/api/products?featured=true');
      if (!response.ok) throw new Error('Failed to fetch products');
      return response.json();
    }
  });

  const handleBuyNow = (gumroadUrl: string) => {
    window.open(gumroadUrl, '_blank', 'noopener,noreferrer');
  };

  if (isLoading) {
    return (
      <section id="shop" className="py-20 bg-cyber-dark">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="text-neon-cyan animate-pulse">Loading featured products...</div>
          </div>
        </div>
      </section>
    );
  }

  // Show only first 3 featured products
  const featuredProducts = products?.slice(0, 3) || [];

  return (
    <section id="shop" className="py-20 bg-cyber-dark">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-cyber font-bold mb-6">
            <span className="text-neon-pink">FEATURED</span> <span className="text-white">PRODUCTS</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Get premium digital art pieces and design assets ready for commercial use.
          </p>
          <Link href="/shop" className="inline-flex items-center gap-2 px-6 py-3 bg-transparent border-2 border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-cyber-dark transition-all duration-300 font-semibold neon-glow">
            VIEW ALL PRODUCTS
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Featured Products Preview */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <div key={product.id} className="glassmorphism rounded-lg p-6 hover:neon-glow transition-all duration-300">
              <div className="relative mb-4">
                <img 
                  src={product.imageUrl} 
                  alt={product.title} 
                  className="w-full h-48 object-cover rounded-lg neon-border"
                />
                <div className="absolute top-3 left-3 bg-neon-pink text-white px-3 py-1 rounded-full text-sm font-semibold">
                  FEATURED
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-neon-cyan">{product.title}</h3>
                <p className="text-gray-300 text-sm line-clamp-2">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-3xl font-bold text-neon-pink">{product.price}</span>
                  <div className="text-sm text-gray-400">
                    <span>{product.format}</span> • <span>{product.details}</span>
                  </div>
                </div>
                <button 
                  onClick={() => handleBuyNow(product.gumroadUrl)}
                  className="w-full py-3 bg-neon-cyan text-cyber-dark font-semibold rounded-lg hover:bg-opacity-80 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={16} />
                  BUY NOW
                  <ExternalLink size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {featuredProducts.length === 0 && (
          <div className="text-center text-gray-400">
            No featured products available at the moment.
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="glassmorphism rounded-lg p-8 neon-border max-w-4xl mx-auto">
            <h3 className="text-3xl font-cyber font-bold text-neon-green mb-4">EXPLORE MORE</h3>
            <p className="text-xl text-gray-300 mb-6">
              Discover our complete collection of digital art, UI kits, and design resources.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
              <Link href="/shop" className="px-8 py-4 bg-neon-green text-cyber-dark font-semibold rounded-lg hover:bg-opacity-80 transition-all duration-300 flex items-center gap-2">
                BROWSE ALL PRODUCTS
                <ArrowRight size={16} />
              </Link>
              <div className="text-sm text-gray-400">
                ✓ Instant download  ✓ Commercial license  ✓ High quality
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}