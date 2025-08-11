import type { Express } from "express";
import { createServer, type Server } from "http";
import { getStorage } from "./storage";
import { insertContactSchema, insertPortfolioItemSchema, insertProductSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Portfolio routes
  app.get("/api/portfolio", async (req, res) => {
    try {
      const { category } = req.query;
      let portfolioItems;
      
      const storage = getStorage();
      if (category && category !== 'All') {
        portfolioItems = await storage.getPortfolioItemsByCategory(category as string);
      } else {
        portfolioItems = await storage.getPortfolioItems();
      }
      
      res.json(portfolioItems);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch portfolio items" });
    }
  });

  app.get("/api/portfolio/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const storage = getStorage();
      const portfolioItem = await storage.getPortfolioItem(id);
      
      if (!portfolioItem) {
        return res.status(404).json({ message: "Portfolio item not found" });
      }
      
      res.json(portfolioItem);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch portfolio item" });
    }
  });

  // Product routes
  app.get("/api/products", async (req, res) => {
    try {
      const { featured } = req.query;
      let products;
      
      const storage = getStorage();
      if (featured === 'true') {
        products = await storage.getFeaturedProducts();
      } else {
        products = await storage.getProducts();
      }
      
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  app.get("/api/products/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const storage = getStorage();
      const product = await storage.getProduct(id);
      
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch product" });
    }
  });

  // Contact routes
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const storage = getStorage();
      const contact = await storage.createContact(validatedData);
      res.status(201).json({ message: "Contact form submitted successfully", contact });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Validation error", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to submit contact form" });
      }
    }
  });

  app.get("/api/contacts", async (req, res) => {
    try {
      const storage = getStorage();
      const contacts = await storage.getContacts();
      res.json(contacts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch contacts" });
    }
  });

  // Admin Portfolio Routes
  app.post("/api/admin/portfolio", async (req, res) => {
    try {
      const validatedData = insertPortfolioItemSchema.parse(req.body);
      const storage = getStorage();
      const item = await storage.createPortfolioItem(validatedData);
      res.status(201).json({ message: "Portfolio item created", item });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Validation error", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create portfolio item" });
      }
    }
  });

  app.put("/api/admin/portfolio/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const validatedData = insertPortfolioItemSchema.partial().parse(req.body);
      const storage = getStorage();
      const item = await storage.updatePortfolioItem(id, validatedData);
      
      if (!item) {
        return res.status(404).json({ message: "Portfolio item not found" });
      }
      
      res.json({ message: "Portfolio item updated", item });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Validation error", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to update portfolio item" });
      }
    }
  });

  app.delete("/api/admin/portfolio/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const storage = getStorage();
      const deleted = await storage.deletePortfolioItem(id);
      
      if (!deleted) {
        return res.status(404).json({ message: "Portfolio item not found" });
      }
      
      res.json({ message: "Portfolio item deleted" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete portfolio item" });
    }
  });

  // Admin Product Routes
  app.post("/api/admin/products", async (req, res) => {
    try {
      const validatedData = insertProductSchema.parse(req.body);
      const storage = getStorage();
      const product = await storage.createProduct(validatedData);
      res.status(201).json({ message: "Product created", product });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Validation error", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create product" });
      }
    }
  });

  app.put("/api/admin/products/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const validatedData = insertProductSchema.partial().parse(req.body);
      const storage = getStorage();
      const product = await storage.updateProduct(id, validatedData);
      
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      
      res.json({ message: "Product updated", product });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Validation error", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to update product" });
      }
    }
  });

  app.delete("/api/admin/products/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const storage = getStorage();
      const deleted = await storage.deleteProduct(id);
      
      if (!deleted) {
        return res.status(404).json({ message: "Product not found" });
      }
      
      res.json({ message: "Product deleted" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete product" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
