# PharmERP Installation Guide

## Prerequisites

- Node.js 18+ or 20+
- npm or yarn package manager
- Git
- A code editor (VS Code recommended)

## Installation Steps

### 1. Install Dependencies

Run the following command to install all required packages:

```bash
npm install \
  @hookform/resolvers \
  react-hook-form \
  zod \
  zustand \
  swr \
  axios \
  framer-motion \
  recharts \
  @tanstack/react-table \
  @radix-ui/react-tabs \
  @radix-ui/react-dialog \
  @radix-ui/react-dropdown-menu \
  @radix-ui/react-select \
  @radix-ui/react-slider \
  @radix-ui/react-toast \
  lucide-react \
  clsx \
  tailwind-merge \
  date-fns \
  socket.io-client
```

Or copy-paste this into your terminal for easier installation:

```bash
npm install @hookform/resolvers react-hook-form zod zustand swr axios framer-motion recharts @tanstack/react-table @radix-ui/react-tabs @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-select @radix-ui/react-slider @radix-ui/react-toast lucide-react clsx tailwind-merge date-fns socket.io-client
```

### 2. Verify Installation

Check that the dev server runs without errors:

```bash
npm run dev
```

You should see:
```
> next dev
  ▲ Next.js 16.2.6
  - Local:        http://localhost:3000
```

### 3. Access the Application

Open your browser and navigate to:
- **Homepage**: http://localhost:3000
- **Login**: http://localhost:3000/login
- **Dashboard**: http://localhost:3000/dashboard

### 4. Login Credentials

Use these credentials to access the application:

**Email**: `admin@pharmacy.com`
**Password**: `password`

## Project Structure

```
pharmacy_fe/
├── app/
│   ├── (auth)/              # Authentication pages
│   ├── (app)/               # Main app pages
│   ├── components/          # Reusable components
│   ├── lib/
│   │   ├── utils.ts        # Utility functions
│   │   ├── types.ts        # TypeScript definitions
│   │   ├── store.ts        # Zustand stores
│   │   └── mock-data.ts    # Mock data
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── public/                  # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── next.config.js
```

## Available Pages

### Authentication Pages
- `/` - Landing page
- `/login` - Login page
- `/register` - Registration (coming soon)

### Dashboard Pages
- `/dashboard` - Main dashboard
- `/pos` - Point of Sale system
- `/inventory` - Inventory management
- `/medicines` - Medicine database
- `/customers` - Customer management
- `/suppliers` - Supplier management

### Additional Modules (Placeholder Pages)
- `/purchases` - Purchase management
- `/sales` - Sales tracking
- `/due-management` - Due management
- `/returns` - Returns & Refunds
- `/online-store` - Online ordering
- `/orders` - Order management
- `/delivery` - Delivery tracking
- `/nearby` - Nearby pharmacy finder
- `/staff` - Staff management
- `/analytics` - AI Analytics
- `/reports` - Business reports
- `/notifications` - Notifications
- `/settings` - Settings

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## File Structure Guide

### Components (`app/components/`)
- **sidebar.tsx** - Desktop navigation sidebar
- **bottom-nav.tsx** - Mobile bottom navigation
- **header.tsx** - Top header with user info
- **stat-card.tsx** - Statistics card component
- **empty-state.tsx** - Empty state placeholder

### Libraries (`app/lib/`)
- **utils.ts** - Utility functions (formatting, helpers)
- **types.ts** - TypeScript interfaces and types
- **store.ts** - Zustand global state management
- **mock-data.ts** - Development mock data

### Routes (`app/(app)/` and `app/(auth)/`)
Each directory contains a `page.tsx` file that represents a route.

## Customization

### Change App Colors

Edit `app/globals.css` CSS variables:

```css
:root {
  --primary: #2563eb;        /* Blue */
  --secondary: #64748b;      /* Slate */
  --success: #16a34a;        /* Green */
  --warning: #ea580c;        /* Orange */
  --danger: #dc2626;         /* Red */
  --info: #0891b2;           /* Cyan */
}
```

### Modify Mock Data

Edit `app/lib/mock-data.ts` to change:
- Sample medicines
- Sample customers
- Sample orders
- Dashboard metrics

### Add New Pages

1. Create a new folder: `app/(app)/module-name/`
2. Create `page.tsx` inside it
3. The route will be available at `/module-name`

## Integrating Real APIs

### Replace Mock Data in Store

In `app/lib/store.ts`, replace mock login:

```typescript
// Current mock implementation
login: async (email: string, password: string) => {
  // Replace this with actual API call
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  set({ user: data.user, isAuthenticated: true, token: data.token });
}
```

### Fetch Data with SWR

Example implementation:

```typescript
import useSWR from 'swr';
import axios from 'axios';

const fetcher = (url: string) => axios.get(url).then(res => res.data);

export default function MyPage() {
  const { data, error, isLoading } = useSWR('/api/medicines', fetcher);
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;
  
  return <div>{/* Render data */}</div>;
}
```

## Environment Variables

Create a `.env.local` file for environment-specific configuration:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_APP_NAME=PharmERP
```

## Troubleshooting

### Port Already in Use

If port 3000 is already in use:

```bash
npm run dev -- -p 3001
```

### Clear Next.js Cache

```bash
rm -rf .next
npm run dev
```

### Node Modules Issues

```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Tips

1. Use React Developer Tools to check for unnecessary re-renders
2. Keep components small and focused
3. Use SWR for data fetching with built-in caching
4. Utilize Next.js image optimization
5. Monitor bundle size with `npm run build`

## Security Notes

- Currently using mock authentication for development
- Implement proper JWT token handling for production
- Use HTTPS in production
- Validate all user inputs
- Sanitize API responses
- Implement CSRF protection

## Next Steps

1. **Connect Backend API**
   - Set up Node.js/Express API server
   - Implement authentication endpoints
   - Create REST/GraphQL API routes

2. **Database Setup**
   - Choose database (PostgreSQL, MongoDB, etc.)
   - Design database schema
   - Implement ORM (Prisma, TypeORM, etc.)

3. **Real-time Features**
   - Integrate Socket.IO
   - Setup real-time order tracking
   - Implement push notifications

4. **Deployment**
   - Deploy to Vercel (recommended for Next.js)
   - Or deploy to AWS, Heroku, DigitalOcean
   - Configure environment variables
   - Setup CI/CD pipeline

## Getting Help

### Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Zustand Documentation](https://zustand.wild.dev)
- [Recharts Documentation](https://recharts.org)

### Common Issues

**Q: Dark mode not working?**
A: Check that the dark class is applied to the html element in your browser dev tools.

**Q: Components not appearing?**
A: Make sure all dependencies are installed with `npm install`.

**Q: Build fails with TypeScript errors?**
A: Check `tsconfig.json` and ensure all types are properly imported.

---

**PharmERP is ready for development!** 🚀

Start building amazing features for your pharmacy management system.
