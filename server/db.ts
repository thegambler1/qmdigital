import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { portfolioItems, products, contacts } from "@shared/schema";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL environment variable is required");
}

// Create connection
const client = postgres(connectionString);

// Create drizzle instance
export const db = drizzle(client);

// Initialize database tables with sample data
export async function initializeDatabase() {
  console.log("Initializing database...");
  
  try {
    // Check if tables have data
    const existingPortfolioItems = await db.select().from(portfolioItems).limit(1);
    const existingProducts = await db.select().from(products).limit(1);
    
    if (existingPortfolioItems.length === 0) {
      // Insert sample portfolio items
      await db.insert(portfolioItems).values([
        {
          title: "Neon Dreams",
          description: "Abstract futuristic digital artwork with geometric patterns and neon colors",
          category: "Digital Art",
          imageUrl: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600",
          year: 2024
        },
        {
          title: "Cyber Interface",
          description: "Modern UI/UX design for cyberpunk-themed applications with glowing elements",
          category: "UI/UX",
          imageUrl: "https://images.unsplash.com/photo-1558655146-364adaf1fcc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600",
          year: 2024
        },
        {
          title: "Holo Brand",
          description: "Holographic branding package with futuristic logo design and visual identity",
          category: "Branding",
          imageUrl: "https://images.unsplash.com/photo-1617791160536-598cf32026fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600",
          year: 2024
        },
        {
          title: "Cyber City",
          description: "3D rendered cityscape with neon lights and futuristic architecture",
          category: "3D Art",
          imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600",
          year: 2024
        }
      ]);
      console.log("Portfolio items initialized");
    }
    
    if (existingProducts.length === 0) {
      // Insert sample products
      await db.insert(products).values([
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
      ]);
      console.log("Products initialized");
    }
    
    console.log("Database initialization complete");
  } catch (error) {
    console.error("Database initialization error:", error);
    throw error;
  }
}