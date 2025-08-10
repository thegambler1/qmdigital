# Overview

This is a full-stack web application featuring a cyberpunk-themed digital art portfolio and e-commerce platform. The application showcases a digital artist's work through an interactive portfolio gallery with filtering capabilities, a dedicated shop page for selling digital art products, contact form for client inquiries, and an admin panel for content management. The design emphasizes futuristic aesthetics with neon color schemes, glassmorphism effects, and cyberpunk visual elements.

## Recent Updates (August 2025)

- **Separate Shop Page**: Created dedicated `/shop` route with advanced filtering, sorting, and view modes
- **Admin Panel**: Added `/admin` route with full CRUD operations for portfolio items and products
- **API Extensions**: Implemented admin endpoints for content management
- **Enhanced Navigation**: Updated routing system to handle multiple pages with proper navigation states

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **Styling**: Tailwind CSS with custom cyberpunk theme variables and shadcn/ui component library
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **Form Handling**: React Hook Form with Zod validation through @hookform/resolvers
- **UI Components**: Radix UI primitives wrapped in shadcn/ui components for accessibility and consistency

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Development**: tsx for TypeScript execution in development
- **Production Build**: esbuild for fast bundling
- **Data Storage**: In-memory storage implementation with interfaces designed for easy database migration
- **Validation**: Zod schemas shared between client and server

## Database Design
- **ORM**: Drizzle ORM configured for PostgreSQL
- **Schema Management**: Centralized schema definitions in shared directory
- **Tables**: 
  - `portfolio_items`: Stores artwork entries with categories and metadata
  - `products`: Digital products for sale with pricing and Gumroad integration
  - `contacts`: Customer inquiries and project requests
- **Migration Strategy**: Drizzle Kit for database migrations

## Development Environment
- **Monorepo Structure**: Client and server code in separate directories with shared types
- **Path Aliases**: Configured for clean imports (@/, @shared/, @assets/)
- **Development Server**: Vite with HMR for frontend, Express with middleware for backend
- **TypeScript Configuration**: Unified tsconfig with strict mode and modern ES features

## API Design
- **Public Endpoints**: 
  - `/api/portfolio` - Portfolio item management with category filtering
  - `/api/products` - Product listings with featured item support
  - `/api/contact` - Contact form submission handling
- **Admin Endpoints**:
  - `/api/admin/portfolio` - CRUD operations for portfolio items (POST, PUT, DELETE)
  - `/api/admin/products` - CRUD operations for products (POST, PUT, DELETE)
- **Error Handling**: Centralized error middleware with consistent JSON responses
- **Request Logging**: Custom middleware for API request tracking

## Pages Architecture
- **Home (/)**: Landing page with hero, portfolio preview, shop preview, about, and contact sections
- **Shop (/shop)**: Dedicated product catalog with filtering, sorting, and view mode options
- **Admin (/admin)**: Content management interface with tabs for portfolio and product administration
- **404**: Custom not-found page for handling invalid routes

# External Dependencies

## Core Framework Dependencies
- **@neondatabase/serverless**: PostgreSQL database driver for Neon DB
- **drizzle-orm**: Type-safe ORM for database operations
- **connect-pg-simple**: PostgreSQL session store for Express sessions

## UI and Styling
- **@radix-ui/***: Comprehensive set of accessible UI primitive components
- **tailwindcss**: Utility-first CSS framework with custom theme configuration
- **class-variance-authority**: Utility for managing component variants
- **embla-carousel-react**: Carousel component for image galleries

## Development Tools
- **@replit/vite-plugin-runtime-error-modal**: Enhanced error reporting in Replit environment
- **@replit/vite-plugin-cartographer**: Development tooling for Replit integration
- **tsx**: TypeScript execution engine for development server

## Third-party Integrations
- **Gumroad**: E-commerce platform integration for digital product sales
- **Unsplash**: Image hosting service for portfolio and product imagery
- **Google Fonts**: Orbitron and Inter font families for cyberpunk aesthetic

## Validation and Forms
- **zod**: Runtime type validation and schema definition
- **drizzle-zod**: Integration between Drizzle schemas and Zod validation
- **react-hook-form**: Performant form handling with minimal re-renders

## Utilities
- **date-fns**: Modern date manipulation library
- **nanoid**: Secure URL-friendly unique ID generator
- **clsx**: Utility for conditional CSS class names
- **cmdk**: Command palette component for enhanced user interaction