import { type PortfolioItem, type InsertPortfolioItem, type Product, type InsertProduct, type Contact, type InsertContact } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Portfolio methods
  getPortfolioItems(): Promise<PortfolioItem[]>;
  getPortfolioItemsByCategory(category: string): Promise<PortfolioItem[]>;
  getPortfolioItem(id: string): Promise<PortfolioItem | undefined>;
  createPortfolioItem(item: InsertPortfolioItem): Promise<PortfolioItem>;
  updatePortfolioItem(id: string, item: Partial<InsertPortfolioItem>): Promise<PortfolioItem | undefined>;
  deletePortfolioItem(id: string): Promise<boolean>;
  
  // Product methods  
  getProducts(): Promise<Product[]>;
  getFeaturedProducts(): Promise<Product[]>;
  getProduct(id: string): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: string, product: Partial<InsertProduct>): Promise<Product | undefined>;
  deleteProduct(id: string): Promise<boolean>;
  
  // Contact methods
  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;
}

export class MemStorage implements IStorage {
  private portfolioItems: Map<string, PortfolioItem>;
  private products: Map<string, Product>;
  private contacts: Map<string, Contact>;

  constructor() {
    this.portfolioItems = new Map();
    this.products = new Map();
    this.contacts = new Map();
    
    // Initialize with sample data
    this.initializeData();
  }

  private initializeData() {
    // Sample portfolio items
    const portfolioData: Omit<PortfolioItem, 'id'>[] = [
      {
        title: "Neon Dreams",
        description: "Abstract futuristic digital artwork with geometric patterns and neon colors",
        category: "Digital Art",
        imageUrl: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600",
        year: 2024
      },
      {
        title: "Cyber Interface",
        description: "Modern UI interface design with dark theme and cyan accents",
        category: "UI/UX",
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600",
        year: 2024
      },
      {
        title: "Cyber City",
        description: "3D rendered cyberpunk cityscape with neon lights",
        category: "3D Art",
        imageUrl: "https://images.unsplash.com/photo-1516557070061-c3d1653fa646?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600",
        year: 2024
      },
      {
        title: "Holo Brand",
        description: "Holographic brand identity design with geometric elements",
        category: "Branding",
        imageUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600",
        year: 2024
      },
      {
        title: "Neural Flow",
        description: "Digital art featuring neural network patterns and AI visualization",
        category: "Digital Art",
        imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600",
        year: 2024
      },
      {
        title: "Future App",
        description: "Futuristic mobile app interface with dark theme",
        category: "UI/UX",
        imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600",
        year: 2024
      }
    ];

    portfolioData.forEach(item => {
      const id = randomUUID();
      this.portfolioItems.set(id, { ...item, id });
    });

    // Sample products
    const productData: Omit<Product, 'id'>[] = [
      {
        title: "Cyberpunk Collection",
        description: "Premium digital art pack featuring 10 high-resolution cyberpunk illustrations perfect for commercial use.",
        price: "$49.99",
        imageUrl: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        gumroadUrl: "https://gumroad.com/l/cyberpunk-collection",
        format: "Digital Download",
        details: "4K Resolution",
        featured: true
      },
      {
        title: "Future UI Kit",
        description: "Complete UI kit with 50+ components designed for modern applications with cyberpunk aesthetics.",
        price: "$79.99",
        imageUrl: "https://images.unsplash.com/photo-1558655146-364adaf1fcc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        gumroadUrl: "https://gumroad.com/l/future-ui-kit",
        format: "Figma + Sketch",
        details: "50+ Components",
        featured: true
      },
      {
        title: "3D Holo Pack",
        description: "Premium 3D holographic elements and shapes for creating stunning visual effects in your designs.",
        price: "$39.99",
        imageUrl: "https://images.unsplash.com/photo-1617791160536-598cf32026fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        gumroadUrl: "https://gumroad.com/l/3d-holo-pack",
        format: "OBJ + C4D",
        details: "Ultra HD",
        featured: true
      }
    ];

    productData.forEach(item => {
      const id = randomUUID();
      this.products.set(id, { ...item, id });
    });
  }

  async getPortfolioItems(): Promise<PortfolioItem[]> {
    return Array.from(this.portfolioItems.values());
  }

  async getPortfolioItemsByCategory(category: string): Promise<PortfolioItem[]> {
    return Array.from(this.portfolioItems.values()).filter(
      item => item.category === category
    );
  }

  async getPortfolioItem(id: string): Promise<PortfolioItem | undefined> {
    return this.portfolioItems.get(id);
  }

  async createPortfolioItem(insertItem: InsertPortfolioItem): Promise<PortfolioItem> {
    const id = randomUUID();
    const item: PortfolioItem = {
      ...insertItem,
      id
    };
    this.portfolioItems.set(id, item);
    return item;
  }

  async updatePortfolioItem(id: string, updateData: Partial<InsertPortfolioItem>): Promise<PortfolioItem | undefined> {
    const existing = this.portfolioItems.get(id);
    if (!existing) return undefined;
    
    const updated: PortfolioItem = {
      ...existing,
      ...updateData
    };
    this.portfolioItems.set(id, updated);
    return updated;
  }

  async deletePortfolioItem(id: string): Promise<boolean> {
    return this.portfolioItems.delete(id);
  }

  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getFeaturedProducts(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(product => product.featured);
  }

  async getProduct(id: string): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = randomUUID();
    const product: Product = {
      ...insertProduct,
      id
    };
    this.products.set(id, product);
    return product;
  }

  async updateProduct(id: string, updateData: Partial<InsertProduct>): Promise<Product | undefined> {
    const existing = this.products.get(id);
    if (!existing) return undefined;
    
    const updated: Product = {
      ...existing,
      ...updateData
    };
    this.products.set(id, updated);
    return updated;
  }

  async deleteProduct(id: string): Promise<boolean> {
    return this.products.delete(id);
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = randomUUID();
    const contact: Contact = {
      ...insertContact,
      id,
      createdAt: new Date().toISOString()
    };
    this.contacts.set(id, contact);
    return contact;
  }

  async getContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values());
  }
}

export const storage = new MemStorage();
