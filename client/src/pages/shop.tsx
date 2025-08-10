import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ExternalLink, ShoppingCart, Filter, Grid, List } from "lucide-react";
import type { Product } from "@shared/schema";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Shop() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'featured' | 'price' | 'name'>('featured');
  
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products'],
    queryFn: async () => {
      const response = await fetch('/api/products');
      if (!response.ok) throw new Error('Failed to fetch products');
      return response.json();
    }
  });

  const handleBuyNow = (gumroadUrl: string) => {
    window.open(gumroadUrl, '_blank', 'noopener,noreferrer');
  };

  const sortedProducts = products?.sort((a, b) => {
    switch (sortBy) {
      case 'featured':
        return b.featured ? 1 : -1;
      case 'price':
        const priceA = parseFloat(a.price.replace('$', ''));
        const priceB = parseFloat(b.price.replace('$', ''));
        return priceA - priceB;
      case 'name':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  if (isLoading) {
    return (
      <div className="bg-cyber-dark text-white min-h-screen">
        <Navbar />
        <main className="pt-24">
          <div className="container mx-auto px-6 py-20">
            <div className="text-center">
              <div className="text-neon-cyan animate-pulse text-xl">Loading products...</div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-cyber-dark text-white min-h-screen">
      <Navbar />
      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-cyber-navy via-cyber-dark to-cyber-blue grid-lines">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-6xl font-cyber font-bold mb-6">
                <span className="text-neon-pink">DIGITAL</span> <span className="text-white">SHOP</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Discover and purchase exclusive digital art pieces, UI kits, and design assets. 
                All products are high-quality, commercial-use ready, and delivered instantly.
              </p>
            </div>
          </div>
        </section>

        {/* Filter and Sort Controls */}
        <section className="py-8 bg-cyber-navy">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-4">
                <span className="text-gray-300">
                  {sortedProducts?.length || 0} Products
                </span>
              </div>
              
              <div className="flex items-center gap-4">
                {/* Sort Dropdown */}
                <div className="flex items-center gap-2">
                  <Filter size={18} className="text-neon-cyan" />
                  <Select value={sortBy} onValueChange={(value: 'featured' | 'price' | 'name') => setSortBy(value)}>
                    <SelectTrigger className="w-40 bg-cyber-dark border-gray-600 text-white focus:border-neon-cyan">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-cyber-dark border-gray-600">
                      <SelectItem value="featured">Featured</SelectItem>
                      <SelectItem value="price">Price: Low to High</SelectItem>
                      <SelectItem value="name">Name: A to Z</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* View Mode Toggle */}
                <div className="flex bg-cyber-dark rounded-lg p-1">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className={`${viewMode === 'grid' ? 'bg-neon-cyan text-cyber-dark' : 'text-gray-400 hover:text-white'}`}
                  >
                    <Grid size={16} />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className={`${viewMode === 'list' ? 'bg-neon-cyan text-cyber-dark' : 'text-gray-400 hover:text-white'}`}
                  >
                    <List size={16} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-20 bg-cyber-dark">
          <div className="container mx-auto px-6">
            {/* Grid View */}
            {viewMode === 'grid' && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {sortedProducts?.map((product) => (
                  <div key={product.id} className="glassmorphism rounded-lg p-6 hover:neon-glow transition-all duration-300">
                    <div className="relative mb-4">
                      <img 
                        src={product.imageUrl} 
                        alt={product.title} 
                        className="w-full h-48 object-cover rounded-lg neon-border"
                      />
                      {product.featured && (
                        <div className="absolute top-3 left-3 bg-neon-pink text-white px-3 py-1 rounded-full text-sm font-semibold">
                          FEATURED
                        </div>
                      )}
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-2xl font-semibold text-neon-cyan">{product.title}</h3>
                      <p className="text-gray-300 text-sm">{product.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-3xl font-bold text-neon-pink">{product.price}</span>
                        <div className="text-sm text-gray-400 text-right">
                          <span>{product.format}</span><br />
                          <span>{product.details}</span>
                        </div>
                      </div>
                      <Button 
                        onClick={() => handleBuyNow(product.gumroadUrl)}
                        className="w-full py-3 bg-neon-cyan text-cyber-dark font-semibold rounded-lg hover:bg-opacity-80 transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        <ShoppingCart size={16} />
                        BUY NOW
                        <ExternalLink size={16} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* List View */}
            {viewMode === 'list' && (
              <div className="space-y-6">
                {sortedProducts?.map((product) => (
                  <div key={product.id} className="glassmorphism rounded-lg p-6 hover:neon-glow transition-all duration-300">
                    <div className="grid md:grid-cols-4 gap-6 items-center">
                      <div className="relative">
                        <img 
                          src={product.imageUrl} 
                          alt={product.title} 
                          className="w-full h-32 object-cover rounded-lg neon-border"
                        />
                        {product.featured && (
                          <div className="absolute top-2 left-2 bg-neon-pink text-white px-2 py-1 rounded text-xs font-semibold">
                            FEATURED
                          </div>
                        )}
                      </div>
                      <div className="md:col-span-2 space-y-2">
                        <h3 className="text-xl font-semibold text-neon-cyan">{product.title}</h3>
                        <p className="text-gray-300 text-sm">{product.description}</p>
                        <div className="text-sm text-gray-400">
                          <span>{product.format}</span> • <span>{product.details}</span>
                        </div>
                      </div>
                      <div className="text-center space-y-4">
                        <div className="text-2xl font-bold text-neon-pink">{product.price}</div>
                        <Button 
                          onClick={() => handleBuyNow(product.gumroadUrl)}
                          className="px-6 py-2 bg-neon-cyan text-cyber-dark font-semibold rounded-lg hover:bg-opacity-80 transition-all duration-300 flex items-center justify-center gap-2"
                        >
                          <ShoppingCart size={14} />
                          BUY NOW
                          <ExternalLink size={14} />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {sortedProducts?.length === 0 && (
              <div className="text-center text-gray-400">
                No products available at the moment.
              </div>
            )}
          </div>
        </section>

        {/* Special Offer Banner */}
        <section className="py-16 bg-cyber-navy">
          <div className="container mx-auto px-6">
            <div className="text-center">
              <div className="glassmorphism rounded-lg p-8 neon-border max-w-4xl mx-auto">
                <h3 className="text-3xl font-cyber font-bold text-neon-green mb-4">LIMITED TIME OFFER</h3>
                <p className="text-xl text-gray-300 mb-6">
                  Get 30% off all digital products with code: <span className="text-neon-pink font-mono text-2xl">CYBER30</span>
                </p>
                <p className="text-gray-400 mb-6">
                  Use this code at checkout on Gumroad. Valid until the end of this month!
                </p>
                <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                  <div className="text-sm text-gray-400">
                    ✓ All products included  ✓ Instant download  ✓ Commercial license
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}