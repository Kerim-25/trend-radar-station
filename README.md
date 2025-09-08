# TrendScouter 🚀

A stunning, production-quality frontend for tracking the hottest technology trends and emerging markets. Built with React, TypeScript, and modern web technologies for optimal performance and user experience.

## ✨ Features

### Core Functionality
- **🔥 Hot Trends Dashboard**: View the top 3 trending technologies with momentum scores and 30-day changes
- **📊 Subtrends Explorer**: Dive deep into subsectors with interactive sparklines and momentum metrics  
- **🏢 Startup Discovery**: Explore the most promising startups in each subtrend
- **⚙️ Settings Panel**: Configure API endpoints or use local mock data

### Design & UX
- **🎨 Glass-morphism UI**: Premium dark theme with subtle gradients and glass effects
- **📱 Mobile-first**: Fully responsive design optimized for all screen sizes
- **♿ Accessibility**: WCAG AA compliant with keyboard navigation and screen reader support
- **🎭 Smooth Animations**: Framer Motion powered micro-interactions and page transitions
- **💨 Fast Performance**: Optimized for Lighthouse scores with lazy loading and efficient caching

### Technical Excellence
- **🔧 API-Ready Architecture**: Seamlessly switch between mock data and live backend
- **🔄 Smart Caching**: In-memory caching with automatic expiration and retry logic
- **🛡️ Error Handling**: Graceful fallbacks with friendly error messages
- **🧪 Type Safety**: Full TypeScript coverage for robust development

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Modern web browser

### Development Setup

```bash
# Clone the repository
git clone <your-repo-url>
cd trendscouter

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:8080
```

### Environment Configuration

Create a `.env` file (see `.env.example`):

```env
# Optional: Connect to your GCP backend
VITE_API_BASE_URL=https://your-api.cloudfunctions.net

# If not set, the app runs with local mock data
```

## 🏗️ Architecture

### Project Structure
```
src/
├── components/           # Reusable UI components
│   ├── ui/              # shadcn/ui components
│   ├── hero-section.tsx # Landing hero with top trends
│   ├── subtrends-section.tsx # Subtrends grid
│   └── subtrend-detail-drawer.tsx # Startup details
├── lib/
│   ├── api.ts           # API layer with caching & retry
│   └── utils.ts         # Utility functions
├── mocks/               # Local JSON mock data
├── types/               # TypeScript definitions
└── pages/
    └── Index.tsx        # Main application page
```

### Data Flow
1. **API Layer**: Handles data fetching with retry logic and caching
2. **Mock Fallback**: Automatically uses local JSON when API unavailable
3. **State Management**: React hooks for lightweight state management
4. **Error Boundaries**: Graceful error handling throughout the app

## 🎯 Core Views

### 1. Hero Section (Top 3 Trends)
- Full-screen hero with animated gradient background
- Large, interactive trend cards with momentum meters
- Glass-morphism design with hover parallax effects
- Animated progress bars and sparkle effects for top trends

### 2. Subtrends Grid
- Responsive masonry layout of subtrend tiles
- Real-time sparklines showing 30-day momentum
- Sortable by momentum score or alphabetical
- Smooth scroll reveal animations

### 3. Subtrend Detail Drawer
- Slide-over drawer (desktop) / full-screen sheet (mobile)
- Detailed momentum analytics and trend visualization
- Top 3 startups with logos, descriptions, and external links
- Keyboard navigation (ESC to close)

## 🔌 API Integration

### Endpoints
The app expects these RESTful endpoints:

```typescript
GET /trends?limit=3
// Returns: Trend[]

GET /trends/{id}/subtrends  
// Returns: Subtrend[]

GET /subtrends/{id}/startups?limit=3
// Returns: Startup[]
```

### Data Types
```typescript
interface Trend {
  id: string;
  name: string;
  summary: string;
  momentum_score: number;    // 0-100
  change_30d_pct: number;   // percentage
  image_url?: string;
}

interface Subtrend {
  id: string;
  trend_id: string;
  name: string;
  description: string;
  momentum_score: number;
  sparkline: number[];      // 30-day values
}

interface Startup {
  id: string;
  name: string;
  one_liner: string;
  logo_url?: string;
  tags: string[];
  website_url: string;
}
```

## 📱 Deployment

### Firebase Hosting

```bash
# Build for production
npm run build

# Install Firebase CLI (if not already installed)
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase Hosting
firebase init hosting
# ✅ Select "Use an existing project" or create new
# ✅ Set public directory to: dist
# ✅ Configure as single-page app: Yes
# ✅ Set up automatic builds with GitHub: Optional

# Deploy to Firebase
firebase deploy

# Your app is now live at: https://your-project.firebaseapp.com
```

### Environment Variables for Production

Set your production API URL:
```bash
# In your CI/CD or build environment
export VITE_API_BASE_URL=https://your-production-api.com

# Then build
npm run build
```

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Run tests with coverage
npm run test:coverage

# Run linting
npm run lint

# Type checking
npm run type-check
```

## 🎨 Design System

### Color Palette
- **Primary**: Momentum green (#10B981) for positive trends
- **Destructive**: Alert red (#EF4444) for declining trends  
- **Neutral**: Amber (#F59E0B) for stable trends
- **Glass Effects**: Semi-transparent overlays with backdrop blur

### Components
- **MomentumBadge**: Displays scores with trend indicators
- **Sparkline**: Pure SVG mini-charts for trend visualization
- **TrendCard**: Interactive cards with animated progress meters
- **LoadingSkeleton**: Shimmer loading states for all content types

### Animations
- Entrance animations with staggered delays
- Hover parallax effects on cards
- Smooth scroll-to-section navigation
- Reduced motion support for accessibility

## 🔧 Configuration

### Settings Panel Features
- **API URL Configuration**: Set/change backend endpoint at runtime
- **Connection Testing**: Test API connectivity with latency display
- **Mock Data Toggle**: Switch between live API and local mocks
- **Cache Management**: Clear cached data for fresh requests

### Local Storage
Settings persist across sessions:
- `apiBaseUrl`: Backend API endpoint
- `useMocks`: Whether to use local mock data

## 🤝 Contributing

### Development Guidelines
1. **Design System First**: Use semantic tokens, never hardcode colors
2. **Mobile-first**: Design for mobile, enhance for desktop
3. **Accessibility**: Include proper ARIA labels and keyboard navigation
4. **Performance**: Optimize images, lazy load content, minimize bundle size
5. **Type Safety**: Maintain 100% TypeScript coverage

### Code Style
- ESLint + Prettier for formatting
- Conventional commit messages
- Component-driven architecture
- Responsive design utilities from Tailwind

## 🚀 Performance

### Optimization Features
- **Tree Shaking**: Only used components included in bundle
- **Code Splitting**: Dynamic imports for route-based splitting
- **Image Optimization**: WebP format with fallbacks
- **Caching Strategy**: Intelligent cache invalidation
- **Bundle Analysis**: Visualize bundle size and dependencies

### Lighthouse Scores Target
- **Performance**: >90
- **Accessibility**: >95  
- **Best Practices**: >90
- **SEO**: >90

## 📊 Analytics Ready

The app is prepared for analytics integration:
- Component tracking hooks
- User interaction events
- Performance monitoring
- Error tracking and reporting

## 🔐 Security

- **No Server Secrets**: Frontend-only, no API keys in client code
- **HTTPS Only**: Secure connections enforced
- **Content Security Policy**: XSS protection headers
- **Input Validation**: All user inputs sanitized

---

## 📞 Support

For questions or issues:
1. Check the [troubleshooting guide](#troubleshooting)
2. Search existing GitHub issues
3. Create a new issue with detailed reproduction steps

## 📄 License

MIT License - see LICENSE file for details.

---

**Built with ❤️ using React, TypeScript, Tailwind CSS, and Framer Motion**