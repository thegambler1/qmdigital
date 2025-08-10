import { useQuery } from "@tanstack/react-query";
import { ExternalLink, ShoppingCart } from "lucide-react";
import type { Product } from "@shared/schema";

export default function Shop() {
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products'],
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
            <div className="text-neon-cyan animate-pulse">Loading products...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="shop" className="py-20 bg-cyber-dark">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-cyber font-bold mb-6">
            <span className="text-neon-pink">DIGITAL</span> <span className="text-white">SHOP</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Purchase exclusive digital art pieces and design assets.
          </p>
        </div>

        {/* Featured Products */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products?.map((product) => (
            <div key={product.id} className="glassmorphism rounded-lg p-6 hover:neon-glow transition-all duration-300">
              <img 
                src={product.imageUrl} 
                alt={product.title} 
                className="w-full h-48 object-cover rounded-lg mb-4 neon-border"
              />
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-neon-cyan">{product.title}</h3>
                <p className="text-gray-300">{product.description}</p>
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

        {products?.length === 0 && (
          <div className="text-center text-gray-400">
            No products available at the moment.
          </div>
        )}

        {/* Special Offer Banner */}
        <div className="mt-16 text-center">
          <div className="glassmorphism rounded-lg p-8 neon-border">
            <h3 className="text-3xl font-cyber font-bold text-neon-green mb-4">LIMITED TIME OFFER</h3>
            <p className="text-xl text-gray-300 mb-6">
              Get 30% off all digital products with code: <span className="text-neon-pink font-mono">CYBER30</span>
            </p>
            <button className="px-8 py-4 bg-neon-green text-cyber-dark font-semibold rounded-lg hover:bg-opacity-80 transition-all duration-300">
              SHOP ALL PRODUCTS
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
