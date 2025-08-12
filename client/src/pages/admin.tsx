import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Edit, Trash2, Save, X, Settings } from "lucide-react";
import type { PortfolioItem, Product, InsertPortfolioItem, InsertProduct, SiteSettings, InsertSiteSettings } from "@shared/schema";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

interface EditingPortfolioItem extends Partial<InsertPortfolioItem> {
  id?: string;
}

interface EditingProduct extends Partial<InsertProduct> {
  id?: string;
}

interface EditingSettings extends Partial<InsertSiteSettings> {
  socialLinks?: string;
}

export default function Admin() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'portfolio' | 'products' | 'settings'>('portfolio');
  const [editingPortfolioItem, setEditingPortfolioItem] = useState<EditingPortfolioItem | null>(null);
  const [editingProduct, setEditingProduct] = useState<EditingProduct | null>(null);
  const [editingSettings, setEditingSettings] = useState<EditingSettings | null>(null);

  const handleLogin = () => {
    // Simple password check - in production, this should be server-side
    if (password === 'admin123') {
      setIsAuthenticated(true);
      toast({ title: "Access Granted", description: "Welcome to the admin panel!" });
    } else {
      toast({ title: "Access Denied", description: "Incorrect password", variant: "destructive" });
    }
  };

  // Fetch portfolio items
  const { data: portfolioItems } = useQuery<PortfolioItem[]>({
    queryKey: ['/api/portfolio'],
  });

  // Fetch products
  const { data: products } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });

  // Fetch site settings
  const { data: siteSettings } = useQuery<SiteSettings>({
    queryKey: ['/api/settings'],
  });

  // Portfolio mutations
  const createPortfolioMutation = useMutation({
    mutationFn: async (data: InsertPortfolioItem) => {
      return apiRequest('/api/admin/portfolio', 'POST', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/portfolio'] });
      toast({ title: "Success", description: "Portfolio item created successfully" });
      setEditingPortfolioItem(null);
    },
    onError: (error: any) => {
      console.error('Portfolio creation error:', error);
      const errorMessage = error?.response?.data?.message || error?.message || "Failed to create portfolio item";
      toast({ title: "Error", description: errorMessage, variant: "destructive" });
    },
  });

  const updatePortfolioMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<InsertPortfolioItem> }) => {
      return apiRequest(`/api/admin/portfolio/${id}`, 'PUT', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/portfolio'] });
      toast({ title: "Success", description: "Portfolio item updated successfully" });
      setEditingPortfolioItem(null);
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update portfolio item", variant: "destructive" });
    },
  });

  const deletePortfolioMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest(`/api/admin/portfolio/${id}`, 'DELETE');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/portfolio'] });
      toast({ title: "Success", description: "Portfolio item deleted successfully" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to delete portfolio item", variant: "destructive" });
    },
  });

  // Product mutations
  const createProductMutation = useMutation({
    mutationFn: async (data: InsertProduct) => {
      return apiRequest('/api/admin/products', 'POST', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/products'] });
      toast({ title: "Success", description: "Product created successfully" });
      setEditingProduct(null);
    },
    onError: (error: any) => {
      console.error('Product creation error:', error);
      const errorMessage = error?.response?.data?.message || error?.message || "Failed to create product";
      toast({ title: "Error", description: errorMessage, variant: "destructive" });
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<InsertProduct> }) => {
      return apiRequest(`/api/admin/products/${id}`, 'PUT', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/products'] });
      toast({ title: "Success", description: "Product updated successfully" });
      setEditingProduct(null);
    },
    onError: (error: any) => {
      console.error('Product update error:', error);
      const errorMessage = error?.response?.data?.message || error?.message || "Failed to update product";
      toast({ title: "Error", description: errorMessage, variant: "destructive" });
    },
  });

  const deleteProductMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest(`/api/admin/products/${id}`, 'DELETE');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/products'] });
      toast({ title: "Success", description: "Product deleted successfully" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to delete product", variant: "destructive" });
    },
  });

  // Settings mutations
  const updateSettingsMutation = useMutation({
    mutationFn: async (data: Partial<InsertSiteSettings>) => {
      return apiRequest('/api/admin/settings', 'PUT', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/settings'] });
      toast({ title: "Success", description: "Site settings updated successfully" });
      setEditingSettings(null);
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update site settings", variant: "destructive" });
    },
  });

  const handleSavePortfolioItem = () => {
    if (!editingPortfolioItem) return;

    const { id, ...data } = editingPortfolioItem;
    
    if (!data.title || !data.description || !data.category || !data.imageUrl || !data.year) {
      toast({ title: "Error", description: "Please fill in all required fields", variant: "destructive" });
      return;
    }

    if (id) {
      updatePortfolioMutation.mutate({ id, data: data as InsertPortfolioItem });
    } else {
      createPortfolioMutation.mutate(data as InsertPortfolioItem);
    }
  };

  const handleSaveProduct = () => {
    if (!editingProduct) return;

    const { id, ...data } = editingProduct;
    
    if (!data.title || !data.description || !data.price || !data.imageUrl || !data.gumroadUrl || !data.format || !data.details) {
      toast({ title: "Error", description: "Please fill in all required fields", variant: "destructive" });
      return;
    }

    // Ensure featured is a boolean
    const productData = {
      ...data,
      featured: data.featured || false
    } as InsertProduct;

    console.log('Saving product:', productData);

    if (id) {
      updateProductMutation.mutate({ id, data: productData });
    } else {
      createProductMutation.mutate(productData);
    }
  };

  const handleSaveSettings = () => {
    if (!editingSettings) return;
    
    updateSettingsMutation.mutate(editingSettings);
  };

  const handleEditSettings = () => {
    if (siteSettings) {
      const socialLinks = siteSettings.socialLinks ? 
        JSON.stringify(JSON.parse(siteSettings.socialLinks), null, 2) : 
        JSON.stringify({}, null, 2);
      
      setEditingSettings({
        ...siteSettings,
        socialLinks
      });
    } else {
      setEditingSettings({
        siteName: '',
        tagline: '',
        aboutTitle: '',
        aboutDescription: '',
        heroTitle: '',
        heroSubtitle: '',
        contactEmail: '',
        socialLinks: JSON.stringify({}, null, 2),
        metaDescription: '',
        faviconUrl: '',
        logoUrl: ''
      });
    }
  };

  // Show login form if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="bg-cyber-dark text-white min-h-screen">
        <Navbar />
        <main className="pt-24">
          <div className="container mx-auto px-6 py-12">
            <div className="max-w-md mx-auto">
              <div className="text-center mb-8">
                <h1 className="text-4xl font-cyber font-bold mb-4">
                  <span className="text-neon-cyan">ADMIN</span> <span className="text-white">ACCESS</span>
                </h1>
                <p className="text-xl text-gray-300">
                  Enter password to continue
                </p>
              </div>

              <div className="glassmorphism rounded-xl p-8">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Password
                    </label>
                    <Input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                      className="bg-gray-800 border-gray-600 text-white"
                      placeholder="Enter admin password"
                      autoFocus
                    />
                  </div>
                  <Button
                    onClick={handleLogin}
                    className="w-full bg-neon-cyan hover:bg-cyan-400 text-cyber-dark font-semibold"
                  >
                    Access Admin Panel
                  </Button>
                  <p className="text-sm text-gray-400 text-center mt-4">
                    Default password: <span className="text-neon-cyan font-mono">admin123</span>
                  </p>
                </div>
              </div>
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
        <div className="container mx-auto px-6 py-12">
          <div className="text-center mb-12">
            <div className="flex justify-between items-center">
              <div></div>
              <div>
                <h1 className="text-4xl md:text-5xl font-cyber font-bold mb-4">
                  <span className="text-neon-cyan">ADMIN</span> <span className="text-white">PANEL</span>
                </h1>
                <p className="text-xl text-gray-300">
                  Manage your portfolio items and products
                </p>
              </div>
              <Button
                onClick={() => setIsAuthenticated(false)}
                variant="outline"
                className="border-red-500 text-red-400 hover:bg-red-500 hover:text-white"
              >
                Logout
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex justify-center mb-8">
            <div className="glassmorphism rounded-lg p-2">
              <div className="flex gap-2">
                <Button
                  variant={activeTab === 'portfolio' ? 'default' : 'ghost'}
                  onClick={() => setActiveTab('portfolio')}
                  className={activeTab === 'portfolio' ? 'bg-neon-cyan text-cyber-dark' : 'text-gray-300 hover:text-white'}
                >
                  Portfolio Items
                </Button>
                <Button
                  variant={activeTab === 'products' ? 'default' : 'ghost'}
                  onClick={() => setActiveTab('products')}
                  className={activeTab === 'products' ? 'bg-neon-cyan text-cyber-dark' : 'text-gray-300 hover:text-white'}
                >
                  Products
                </Button>
                <Button
                  variant={activeTab === 'settings' ? 'default' : 'ghost'}
                  onClick={() => setActiveTab('settings')}
                  className={activeTab === 'settings' ? 'bg-neon-cyan text-cyber-dark' : 'text-gray-300 hover:text-white'}
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
              </div>
            </div>
          </div>

          {/* Portfolio Tab */}
          {activeTab === 'portfolio' && (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-neon-cyan">Portfolio Items</h2>
                <Button
                  onClick={() => setEditingPortfolioItem({})}
                  className="bg-neon-pink text-white hover:bg-opacity-80"
                >
                  <Plus size={16} className="mr-2" />
                  Add New Item
                </Button>
              </div>

              {/* Portfolio Form */}
              {editingPortfolioItem && (
                <div className="glassmorphism rounded-lg p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-neon-cyan">
                      {editingPortfolioItem.id ? 'Edit' : 'Create'} Portfolio Item
                    </h3>
                    <Button
                      variant="ghost"
                      onClick={() => setEditingPortfolioItem(null)}
                      className="text-gray-400 hover:text-white"
                    >
                      <X size={16} />
                    </Button>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Title *</label>
                      <Input
                        value={editingPortfolioItem.title || ''}
                        onChange={(e) => setEditingPortfolioItem({...editingPortfolioItem, title: e.target.value})}
                        className="bg-cyber-navy border-gray-600 text-white focus:border-neon-cyan"
                        placeholder="Portfolio item title"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Category *</label>
                      <Select 
                        value={editingPortfolioItem.category || ''} 
                        onValueChange={(value) => setEditingPortfolioItem({...editingPortfolioItem, category: value})}
                      >
                        <SelectTrigger className="bg-cyber-navy border-gray-600 text-white focus:border-neon-cyan">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent className="bg-cyber-navy border-gray-600">
                          <SelectItem value="Digital Art">Digital Art</SelectItem>
                          <SelectItem value="UI/UX">UI/UX</SelectItem>
                          <SelectItem value="Branding">Branding</SelectItem>
                          <SelectItem value="3D Art">3D Art</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Year *</label>
                      <Input
                        type="number"
                        value={editingPortfolioItem.year || ''}
                        onChange={(e) => setEditingPortfolioItem({...editingPortfolioItem, year: parseInt(e.target.value)})}
                        className="bg-cyber-navy border-gray-600 text-white focus:border-neon-cyan"
                        placeholder="2024"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Image URL *</label>
                      <Input
                        value={editingPortfolioItem.imageUrl || ''}
                        onChange={(e) => setEditingPortfolioItem({...editingPortfolioItem, imageUrl: e.target.value})}
                        className="bg-cyber-navy border-gray-600 text-white focus:border-neon-cyan"
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Description *</label>
                    <Textarea
                      value={editingPortfolioItem.description || ''}
                      onChange={(e) => setEditingPortfolioItem({...editingPortfolioItem, description: e.target.value})}
                      className="bg-cyber-navy border-gray-600 text-white focus:border-neon-cyan"
                      placeholder="Describe your portfolio item"
                      rows={3}
                    />
                  </div>
                  
                  <Button
                    onClick={handleSavePortfolioItem}
                    disabled={createPortfolioMutation.isPending || updatePortfolioMutation.isPending}
                    className="bg-neon-cyan text-cyber-dark hover:bg-opacity-80"
                  >
                    <Save size={16} className="mr-2" />
                    {createPortfolioMutation.isPending || updatePortfolioMutation.isPending ? 'Saving...' : 'Save'}
                  </Button>
                </div>
              )}

              {/* Portfolio List */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {portfolioItems?.map((item) => (
                  <div key={item.id} className="glassmorphism rounded-lg p-4">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-32 object-cover rounded-lg mb-4"
                    />
                    <h3 className="text-lg font-semibold text-neon-cyan mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-300 mb-2">{item.category} • {item.year}</p>
                    <p className="text-sm text-gray-400 mb-4 line-clamp-2">{item.description}</p>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => setEditingPortfolioItem(item)}
                        className="bg-neon-cyan text-cyber-dark hover:bg-opacity-80"
                      >
                        <Edit size={14} className="mr-1" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => deletePortfolioMutation.mutate(item.id)}
                        disabled={deletePortfolioMutation.isPending}
                      >
                        <Trash2 size={14} className="mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Products Tab */}
          {activeTab === 'products' && (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-neon-cyan">Products</h2>
                <Button
                  onClick={() => setEditingProduct({})}
                  className="bg-neon-pink text-white hover:bg-opacity-80"
                >
                  <Plus size={16} className="mr-2" />
                  Add New Product
                </Button>
              </div>

              {/* Product Form */}
              {editingProduct && (
                <div className="glassmorphism rounded-lg p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-neon-cyan">
                      {editingProduct.id ? 'Edit' : 'Create'} Product
                    </h3>
                    <Button
                      variant="ghost"
                      onClick={() => setEditingProduct(null)}
                      className="text-gray-400 hover:text-white"
                    >
                      <X size={16} />
                    </Button>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Title *</label>
                      <Input
                        value={editingProduct.title || ''}
                        onChange={(e) => setEditingProduct({...editingProduct, title: e.target.value})}
                        className="bg-cyber-navy border-gray-600 text-white focus:border-neon-cyan"
                        placeholder="Product title"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Price *</label>
                      <Input
                        value={editingProduct.price || ''}
                        onChange={(e) => setEditingProduct({...editingProduct, price: e.target.value})}
                        className="bg-cyber-navy border-gray-600 text-white focus:border-neon-cyan"
                        placeholder="$49.99"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Format *</label>
                      <Input
                        value={editingProduct.format || ''}
                        onChange={(e) => setEditingProduct({...editingProduct, format: e.target.value})}
                        className="bg-cyber-navy border-gray-600 text-white focus:border-neon-cyan"
                        placeholder="Digital Download"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Details *</label>
                      <Input
                        value={editingProduct.details || ''}
                        onChange={(e) => setEditingProduct({...editingProduct, details: e.target.value})}
                        className="bg-cyber-navy border-gray-600 text-white focus:border-neon-cyan"
                        placeholder="4K Resolution"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Image URL *</label>
                      <Input
                        value={editingProduct.imageUrl || ''}
                        onChange={(e) => setEditingProduct({...editingProduct, imageUrl: e.target.value})}
                        className="bg-cyber-navy border-gray-600 text-white focus:border-neon-cyan"
                        placeholder="https://example.com/product.jpg"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Gumroad URL *</label>
                      <Input
                        value={editingProduct.gumroadUrl || ''}
                        onChange={(e) => setEditingProduct({...editingProduct, gumroadUrl: e.target.value})}
                        className="bg-cyber-navy border-gray-600 text-white focus:border-neon-cyan"
                        placeholder="https://gumroad.com/l/your-product"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Description *</label>
                    <Textarea
                      value={editingProduct.description || ''}
                      onChange={(e) => setEditingProduct({...editingProduct, description: e.target.value})}
                      className="bg-cyber-navy border-gray-600 text-white focus:border-neon-cyan"
                      placeholder="Describe your product"
                      rows={3}
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={editingProduct.featured || false}
                        onChange={(e) => setEditingProduct({...editingProduct, featured: e.target.checked})}
                        className="rounded border-gray-600 text-neon-cyan focus:ring-neon-cyan"
                      />
                      <span className="text-sm font-medium text-gray-300">Featured Product</span>
                    </label>
                  </div>
                  
                  <Button
                    onClick={handleSaveProduct}
                    disabled={createProductMutation.isPending || updateProductMutation.isPending}
                    className="bg-neon-cyan text-cyber-dark hover:bg-opacity-80"
                  >
                    <Save size={16} className="mr-2" />
                    {createProductMutation.isPending || updateProductMutation.isPending ? 'Saving...' : 'Save'}
                  </Button>
                </div>
              )}

              {/* Products List */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products?.map((product) => (
                  <div key={product.id} className="glassmorphism rounded-lg p-4">
                    <div className="relative mb-4">
                      <img
                        src={product.imageUrl}
                        alt={product.title}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      {product.featured && (
                        <div className="absolute top-2 left-2 bg-neon-pink text-white px-2 py-1 rounded text-xs font-semibold">
                          FEATURED
                        </div>
                      )}
                    </div>
                    <h3 className="text-lg font-semibold text-neon-cyan mb-2">{product.title}</h3>
                    <p className="text-sm text-neon-pink font-bold mb-2">{product.price}</p>
                    <p className="text-sm text-gray-300 mb-2">{product.format} • {product.details}</p>
                    <p className="text-sm text-gray-400 mb-4 line-clamp-2">{product.description}</p>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => setEditingProduct(product)}
                        className="bg-neon-cyan text-cyber-dark hover:bg-opacity-80"
                      >
                        <Edit size={14} className="mr-1" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => deleteProductMutation.mutate(product.id)}
                        disabled={deleteProductMutation.isPending}
                      >
                        <Trash2 size={14} className="mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Site Settings</h2>
                <Button 
                  onClick={handleEditSettings}
                  className="bg-neon-cyan hover:bg-cyan-400 text-cyber-dark font-semibold"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Settings
                </Button>
              </div>

              {editingSettings ? (
                <div className="glassmorphism rounded-xl p-6 space-y-4">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold text-white">Edit Site Settings</h3>
                    <div className="flex gap-2">
                      <Button
                        onClick={handleSaveSettings}
                        className="bg-green-500 hover:bg-green-600 text-white"
                        disabled={updateSettingsMutation.isPending}
                      >
                        <Save className="w-4 h-4 mr-2" />
                        Save
                      </Button>
                      <Button
                        onClick={() => setEditingSettings(null)}
                        variant="destructive"
                      >
                        <X className="w-4 h-4 mr-2" />
                        Cancel
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Site Name</label>
                      <Input
                        type="text"
                        value={editingSettings.siteName || ''}
                        onChange={(e) => setEditingSettings({...editingSettings, siteName: e.target.value})}
                        className="bg-gray-800 border-gray-600 text-white"
                        placeholder="Your Studio Name"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Tagline</label>
                      <Input
                        type="text"
                        value={editingSettings.tagline || ''}
                        onChange={(e) => setEditingSettings({...editingSettings, tagline: e.target.value})}
                        className="bg-gray-800 border-gray-600 text-white"
                        placeholder="Your creative tagline"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Hero Title</label>
                      <Input
                        type="text"
                        value={editingSettings.heroTitle || ''}
                        onChange={(e) => setEditingSettings({...editingSettings, heroTitle: e.target.value})}
                        className="bg-gray-800 border-gray-600 text-white"
                        placeholder="Digital Artist & Designer"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Hero Subtitle</label>
                      <Input
                        type="text"
                        value={editingSettings.heroSubtitle || ''}
                        onChange={(e) => setEditingSettings({...editingSettings, heroSubtitle: e.target.value})}
                        className="bg-gray-800 border-gray-600 text-white"
                        placeholder="Creating the future, one pixel at a time"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">About Title</label>
                      <Input
                        type="text"
                        value={editingSettings.aboutTitle || ''}
                        onChange={(e) => setEditingSettings({...editingSettings, aboutTitle: e.target.value})}
                        className="bg-gray-800 border-gray-600 text-white"
                        placeholder="About the Artist"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Contact Email</label>
                      <Input
                        type="email"
                        value={editingSettings.contactEmail || ''}
                        onChange={(e) => setEditingSettings({...editingSettings, contactEmail: e.target.value})}
                        className="bg-gray-800 border-gray-600 text-white"
                        placeholder="hello@yoursite.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Favicon URL</label>
                      <Input
                        type="url"
                        value={editingSettings.faviconUrl || ''}
                        onChange={(e) => setEditingSettings({...editingSettings, faviconUrl: e.target.value})}
                        className="bg-gray-800 border-gray-600 text-white"
                        placeholder="https://example.com/favicon.ico"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Logo URL</label>
                      <Input
                        type="url"
                        value={editingSettings.logoUrl || ''}
                        onChange={(e) => setEditingSettings({...editingSettings, logoUrl: e.target.value})}
                        className="bg-gray-800 border-gray-600 text-white"
                        placeholder="https://example.com/logo.png"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">About Description</label>
                    <Textarea
                      value={editingSettings.aboutDescription || ''}
                      onChange={(e) => setEditingSettings({...editingSettings, aboutDescription: e.target.value})}
                      className="bg-gray-800 border-gray-600 text-white min-h-[120px]"
                      placeholder="Tell visitors about yourself, your experience, and your artistic vision..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Meta Description</label>
                    <Textarea
                      value={editingSettings.metaDescription || ''}
                      onChange={(e) => setEditingSettings({...editingSettings, metaDescription: e.target.value})}
                      className="bg-gray-800 border-gray-600 text-white"
                      placeholder="SEO description for search engines..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Social Links (JSON)</label>
                    <Textarea
                      value={editingSettings.socialLinks || ''}
                      onChange={(e) => setEditingSettings({...editingSettings, socialLinks: e.target.value})}
                      className="bg-gray-800 border-gray-600 text-white font-mono text-sm min-h-[120px]"
                      placeholder={`{
  "twitter": "https://twitter.com/username",
  "instagram": "https://instagram.com/username",
  "dribbble": "https://dribbble.com/username",
  "behance": "https://behance.net/username"
}`}
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {siteSettings ? (
                    <div className="glassmorphism rounded-xl p-6 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium text-neon-cyan mb-2">Site Name</h4>
                          <p className="text-gray-300">{siteSettings.siteName}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-neon-cyan mb-2">Tagline</h4>
                          <p className="text-gray-300">{siteSettings.tagline}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-neon-cyan mb-2">Hero Title</h4>
                          <p className="text-gray-300">{siteSettings.heroTitle}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-neon-cyan mb-2">Contact Email</h4>
                          <p className="text-gray-300">{siteSettings.contactEmail}</p>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-neon-cyan mb-2">About Description</h4>
                        <p className="text-gray-300 text-sm">{siteSettings.aboutDescription}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="glassmorphism rounded-xl p-6 text-center">
                      <p className="text-gray-400 mb-4">No site settings configured yet</p>
                      <Button onClick={handleEditSettings} className="bg-neon-cyan hover:bg-cyan-400 text-cyber-dark">
                        Create Settings
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}