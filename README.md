# Hub Community Frontend

A modern Next.js application for discovering and connecting with tech communities and events. Built with TypeScript, GraphQL, and a component-based architecture.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun
- Access to the GraphQL BFF server (running on port 4000)

### Installation & Development

1. **Clone and install dependencies:**

   ```bash
   git clone <repository-url>
   cd hub-community-frontend
   npm install
   # or yarn install
   # or pnpm install
   ```

2. **Set up environment variables:**

   ```bash
   cp .env.example .env
   # Edit .env with your GraphQL BFF URL
   NEXT_PUBLIC_GRAPHQL_URL=http://localhost:4000/graphql
   ```

3. **Start the development server:**

   ```bash
   npm run dev
   # or yarn dev
   # or pnpm dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Architecture

### Tech Stack

- **Framework**: Next.js 15.2.4 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI primitives with shadcn/ui
- **Data Fetching**: Apollo Client for GraphQL
- **State Management**: React Context + Custom Hooks
- **Form Handling**: React Hook Form + Zod validation
- **Theming**: next-themes for dark/light mode
- **Animations**: Tailwind CSS animations + Framer Motion

### Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── communities/        # Community listing and details
│   ├── events/           # Event listing and details
│   ├── about/            # About page
│   └── layout.tsx        # Root layout with providers
├── components/            # Reusable UI components
│   ├── ui/               # Base UI components (shadcn/ui)
│   ├── apollo-provider.tsx
│   ├── navigation.tsx
│   ├── footer.tsx
│   └── [feature-components]/
├── contexts/             # React Context providers
│   └── filter-context.tsx
├── hooks/                # Custom React hooks
│   ├── use-debounce.ts
│   └── use-mobile.tsx
├── lib/                  # Core utilities and configurations
│   ├── apollo-client.ts  # GraphQL client setup
│   ├── queries.ts        # GraphQL queries
│   ├── types.ts          # TypeScript type definitions
│   └── utils.ts          # Utility functions
└── utils/                # Additional utilities
    └── event.ts
```

### Key Architectural Decisions

#### 1. **Component-Based Architecture**

- Modular UI components using Radix UI primitives
- Consistent design system with shadcn/ui
- Reusable components for communities, events, and common UI patterns

#### 2. **GraphQL Integration**

- Apollo Client for efficient data fetching
- Centralized query definitions in `src/lib/queries.ts`
- Optimistic updates and error handling
- Type-safe GraphQL operations

#### 3. **State Management**

- React Context for global state (filters, theme)
- Custom hooks for reusable logic
- Local component state for UI interactions

#### 4. **Performance Optimizations**

- Next.js App Router for automatic code splitting
- Debounced search with custom hooks
- Optimized images with Next.js Image component
- Tailwind CSS for minimal bundle size

#### 5. **Developer Experience**

- TypeScript for type safety
- ESLint + Prettier for code quality
- Husky for pre-commit hooks
- Comprehensive error boundaries

## 🎨 Design System

### Color Palette

- CSS custom properties for theme consistency
- Dark/light mode support
- Semantic color naming (primary, secondary, accent, etc.)

### Component Library

- Built on Radix UI primitives
- Consistent spacing and typography
- Responsive design patterns
- Accessibility-first approach

## 📊 Data Flow

### GraphQL Schema

The application consumes data from a GraphQL BFF that provides:

- **Communities**: Tech communities with events, organizers, and tags
- **Events**: Community events with talks, speakers, and locations
- **Tags**: Categorization system for filtering

### State Management Flow

1. **Filter Context**: Manages search terms and tag filters
2. **Apollo Client**: Handles GraphQL queries and caching
3. **Component State**: Local UI state for interactions
4. **URL State**: Next.js router for navigation state

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors
npm run format       # Format code with Prettier
npm run format:check # Check code formatting
```

## 🌐 Environment Variables

Create a `.env` file in the root directory:

```bash
# GraphQL BFF URL
NEXT_PUBLIC_GRAPHQL_URL=http://localhost:4000/graphql

# Optional: API endpoints
NEXT_PUBLIC_API_URL=https://hubcommunity-manager.8020digital.com.br/api
```

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms

- **Netlify**: Use `npm run build` and `npm run start`
- **Docker**: Build with `docker build -t hub-community-frontend .`

## 🔗 Dependencies

### Core Dependencies

- **Next.js 15.2.4**: React framework with App Router
- **React 19**: UI library
- **TypeScript 5**: Type safety
- **Tailwind CSS**: Utility-first CSS framework
- **Apollo Client**: GraphQL client

### UI Components

- **Radix UI**: Accessible component primitives
- **shadcn/ui**: Pre-built component library
- **Lucide React**: Icon library
- **Sonner**: Toast notifications

### Development Tools

- **ESLint**: Code linting
- **Prettier**: Code formatting
- **Husky**: Git hooks
- **TypeScript**: Type checking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Troubleshooting

### Common Issues

**GraphQL Connection Error**

- Ensure the BFF server is running on port 4000
- Check your `.env` configuration
- Verify network connectivity

**Build Errors**

- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`

**TypeScript Errors**

- Run `npm run lint:fix` to auto-fix issues
- Check type definitions in `src/lib/types.ts`

For more detailed setup instructions, see [SETUP.md](SETUP.md).
