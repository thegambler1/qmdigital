import { type PortfolioItem, type InsertPortfolioItem, type Product, type InsertProduct, type Contact, type InsertContact, type SiteSettings, type InsertSiteSettings, portfolioItems, products, contacts, siteSettings } from "@shared/schema";
import { randomUUID } from "crypto";
import { db } from "./db";
import { eq } from "drizzle-orm";

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
  
  // Site settings methods
  getSiteSettings(): Promise<SiteSettings | undefined>;
  updateSiteSettings(settings: Partial<InsertSiteSettings>): Promise<SiteSettings>;
}

export class MemStorage implements IStorage {
  private portfolioItems: Map<string, PortfolioItem>;
  private products: Map<string, Product>;
  private contacts: Map<string, Contact>;
  private siteSettings: SiteSettings | undefined;

  constructor() {
    this.portfolioItems = new Map();
    this.products = new Map();
    this.contacts = new Map();
    this.siteSettings = undefined;
    
    // Initialize with sample data
    this.initializeData();
  }

  private initializeData() {
    // Initialize site settings
    this.siteSettings = {
      id: randomUUID(),
      siteName: "CyberDesign Studio",
      tagline: "Future-Focused Digital Art",
      aboutTitle: "About the Artist",
      aboutDescription: "I'm a passionate digital artist specializing in cyberpunk and futuristic designs. With over 5 years of experience in graphic design, UI/UX, and 3D art, I create visually stunning pieces that push the boundaries of digital creativity. My work combines cutting-edge technology with artistic vision to deliver unique, high-quality designs for clients worldwide.",
      heroTitle: "Digital Artist & Designer",
      heroSubtitle: "Creating the future, one pixel at a time",
      contactEmail: "hello@cyberdesign.studio",
      socialLinks: JSON.stringify({
        twitter: "https://twitter.com/cyberdesignstudio",
        instagram: "https://instagram.com/cyberdesignstudio", 
        dribbble: "https://dribbble.com/cyberdesignstudio",
        behance: "https://behance.net/cyberdesignstudio"
      }),
      metaDescription: "Professional digital artist specializing in cyberpunk, futuristic designs, UI/UX, and 3D art. Explore premium digital art collections and custom design services.",
      faviconUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=32&h=32",
      logoUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=60",
      updatedAt: new Date().toISOString()
    };
  
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

  // Site settings methods
  async getSiteSettings(): Promise<SiteSettings | undefined> {
    return this.siteSettings;
  }

  async updateSiteSettings(settings: Partial<InsertSiteSettings>): Promise<SiteSettings> {
    if (!this.siteSettings) {
      this.siteSettings = {
        id: randomUUID(),
        siteName: settings.siteName || "Portfolio",
        tagline: settings.tagline || "Digital Art & Design",
        aboutTitle: settings.aboutTitle || "About",
        aboutDescription: settings.aboutDescription || "Artist description",
        heroTitle: settings.heroTitle || "Artist & Designer",
        heroSubtitle: settings.heroSubtitle || "Creating beautiful designs",
        contactEmail: settings.contactEmail || "hello@example.com",
        socialLinks: settings.socialLinks || "{}",
        metaDescription: settings.metaDescription || "Portfolio website",
        faviconUrl: settings.faviconUrl || null,
        logoUrl: settings.logoUrl || null,
        updatedAt: new Date().toISOString()
      };
    } else {
      this.siteSettings = {
        ...this.siteSettings,
        ...settings,
        updatedAt: new Date().toISOString()
      };
    }
    return this.siteSettings;
  }
}

// Database Storage Implementation
export class DatabaseStorage implements IStorage {
  async getPortfolioItems(): Promise<PortfolioItem[]> {
    return await db.select().from(portfolioItems);
  }

  async getPortfolioItemsByCategory(category: string): Promise<PortfolioItem[]> {
    return await db.select().from(portfolioItems).where(eq(portfolioItems.category, category));
  }

  async getPortfolioItem(id: string): Promise<PortfolioItem | undefined> {
    const result = await db.select().from(portfolioItems).where(eq(portfolioItems.id, id));
    return result[0];
  }

  async createPortfolioItem(insertItem: InsertPortfolioItem): Promise<PortfolioItem> {
    const result = await db.insert(portfolioItems).values(insertItem).returning();
    return result[0];
  }

  async updatePortfolioItem(id: string, updateData: Partial<InsertPortfolioItem>): Promise<PortfolioItem | undefined> {
    const result = await db.update(portfolioItems)
      .set(updateData)
      .where(eq(portfolioItems.id, id))
      .returning();
    return result[0];
  }

  async deletePortfolioItem(id: string): Promise<boolean> {
    const result = await db.delete(portfolioItems).where(eq(portfolioItems.id, id)).returning();
    return result.length > 0;
  }

  async getProducts(): Promise<Product[]> {
    return await db.select().from(products);
  }

  async getFeaturedProducts(): Promise<Product[]> {
    return await db.select().from(products).where(eq(products.featured, true));
  }

  async getProduct(id: string): Promise<Product | undefined> {
    const result = await db.select().from(products).where(eq(products.id, id));
    return result[0];
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const result = await db.insert(products).values(insertProduct).returning();
    return result[0];
  }

  async updateProduct(id: string, updateData: Partial<InsertProduct>): Promise<Product | undefined> {
    const result = await db.update(products)
      .set(updateData)
      .where(eq(products.id, id))
      .returning();
    return result[0];
  }

  async deleteProduct(id: string): Promise<boolean> {
    const result = await db.delete(products).where(eq(products.id, id)).returning();
    return result.length > 0;
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const result = await db.insert(contacts).values(insertContact).returning();
    return result[0];
  }

  async getContacts(): Promise<Contact[]> {
    return await db.select().from(contacts);
  }
}

// Create storage instance
let storage: IStorage;

// Try to create database storage, fall back to memory storage if it fails
async function createStorage(): Promise<IStorage> {
  if (process.env.DATABASE_URL) {
    try {
      // Test database connection by creating an instance
      const dbStorage = new DatabaseStorage();
      // Try a simple query to test the connection
      await db.select().from(portfolioItems).limit(1);
      console.log("Database connection successful, using DatabaseStorage");
      return dbStorage;
    } catch (error) {
      console.log("Database connection failed, falling back to MemStorage:", error);
    }
  }
  
  console.log("Using in-memory storage");
  return new MemStorage();
}

// Initialize storage with fallback
export let storageInstance: IStorage = new MemStorage();

// Function to initialize storage
export async function initializeStorage(): Promise<void> {
  storageInstance = await createStorage();
}

// Export storage getter
export const getStorage = (): IStorage => storageInstance;
