# Shopify Migration Strategy: Cotton Connection

## Project Analysis

**Current Stack:**
- React 18 + Vite
- React Router for navigation
- Framer Motion for animations
- Radix UI + Lucide icons
- Custom CSS (no Tailwind)

**Current Features:**
- Home, Shop, Collection, Product pages
- Wishlist, Cart, Contact pages
- Product filtering/sorting
- Newsletter, Testimonials, Marquee components
- Static product data (data.js)

---

## Shopify Migration Options

### Option 1: Headless Shopify (Recommended for preserving your React code)

| Pros | Cons |
|------|------|
| Keep most of your existing React code | Requires Shopify Plus ($2000/mo) or Storefront API costs |
| Full control over frontend | More complex setup |
| Best performance | Need to manage backend separately |
| Same development experience | API rate limits |

**Workflow:**
1. Create Shopify store
2. Set up Storefront API access
3. Convert data.js → Fetch from Shopify GraphQL API
4. Keep React components, map to Shopify objects
5. Use Shopify for: Products, Collections, Cart, Checkout, Customer accounts

---

### Option 2: Convert to Shopify 2.0 Theme (Liquid)

| Pros | Cons |
|------|------|
| Full Shopify ecosystem | Complete rewrite required |
| No monthly API costs | Lose React functionality |
| Easy checkout integration | Liquid learning curve |
| Native apps work out-of-box | Limited animation control |

**Workflow:**
1. Create new Shopify 2.0 theme (Dawn or customize)
2. Convert each React page → Liquid templates:
   - `index.json` → Homepage
   - `product.json` → Product page
   - `collection.json` → Collection page
   - `cart.json` → Cart page
3. Convert components → Sections
4. Convert CSS → Liquid styles or theme.scss
5. Map Shopify objects (products, collections)

---

### Option 3: Hybrid (Embed React in Shopify Theme)

| Pros | Cons |
|------|------|
| Keep React for complex parts | More complex architecture |
| Gradual migration | Performance overhead |
| Works on basic Shopify | Some features limited |

**Workflow:**
1. Create Shopify theme
2. Add React bundles as theme assets
3. Use Shopify "App Embeds" to inject React into sections
4. React handles: Product cards, gallery, animations
5. Liquid handles: Navigation, footer, checkout

---

## Recommended Approach: Option 1 (Headless)

### Phase 1: Shopify Setup
- [ ] Create Shopify Partner account → New development store
- [ ] Add products manually or import from data.js
- [ ] Create collections (Towels, Bathrobes, Bed Sheets, Pillow Covers)
- [ ] Set up Storefront API access tokens
- [ ] Configure payment gateways (use test mode)

### Phase 2: API Integration
- [ ] Install `@shopify/hydrogen-react` or use `graphql-request`
- [ ] Create Shopify API client (src/lib/shopify.js)
- [ ] Replace static products with Shopify GraphQL queries:
  ```javascript
  // Example query
  query getProducts {
    products(first: 20) {
      edges {
        node {
          id title description handle
          priceRange { minVariantPrice { amount currencyCode } }
          images(first: 1) { edges { node { url } } }
        }
      }
    }
  }
  ```
- [ ] Create cart mutation handlers
- [ ] Implement checkout redirect

### Phase 3: Component Mapping
| React Component | Shopify Mapping |
|-----------------|------------------|
| Navbar | Liquid header + Cart drawer |
| ProductCard | Reusable section |
| ProductPage | product.json template |
| CollectionPage | collection.json template |
| CartPage | Cart drawer + API |
| Wishlist | LocalStorage or Shopify "Save" app |

### Phase 4: Features to Implement
- [ ] Product variants (colors, sizes)
- [ ] Add to cart functionality
- [ ] Cart persistence (localStorage + Shopify cart API)
- [ ] Checkout redirect (Shopify handles this)
- [ ] Search functionality
- [ ] Customer authentication

### Phase 5: Deployment
- [ ] Deploy React to Vercel/Netlify
- [ ] Configure Shopify store domains
- [ ] Set up webhooks for inventory updates
- [ ] Production SSL & security

---

## Timeline Estimate

| Phase | Tasks | Est. Time |
|-------|-------|-----------|
| 1 | Shopify Setup | 2-4 hours |
| 2 | API Integration | 4-8 hours |
| 3 | Component Mapping | 8-16 hours |
| 4 | Features | 8-12 hours |
| 5 | Deployment | 2-4 hours |
| **Total** | | **24-44 hours** |

---

## Files to Modify/Replace

| Keep | Replace |
|------|---------|
| src/components/* (most) | src/lib/shopify.js (new) |
| src/pages/* | src/hooks/useProducts.js |
| src/App.jsx | src/context/CartContext.jsx |
| src/data.js | Removed (use Shopify API) |
| src/utils.js | Keep utilities |

---

## Questions Before Proceeding

1. Do you have an existing Shopify store, or should I create a new dev store?
2. Will you need customer accounts/login functionality?
3. Do you plan to use Shopify's checkout or custom checkout?
4. What's your timeline and budget?

---

## Next Steps

Once you confirm the approach, I'll provide step-by-step implementation starting with Shopify store setup.

---

## Implementation Completed

I've created the full Shopify 2.0 theme structure in `cotton-connection-shopify/` folder:

### Folder Structure Created:
```
cotton-connection-shopify/
├── assets/
│   └── base.css          # Complete CSS matching your React styles
├── config/
│   ├── settings_data.json
│   └── settings_schema.json
├── layout/
│   └── theme.liquid     # Main theme template
├── locales/
│   └── en.default.json  # Translation keys
├── sections/
│   ├── header.liquid
│   ├── footer.liquid
│   ├── hero.liquid
│   ├── marquee.liquid
│   ├── featured-collections.liquid
│   ├── featured-products.liquid
│   ├── testimonials.liquid
│   └── newsletter.liquid
└── templates/
    ├── index.json       # Homepage
    ├── collection.json  # Collection/Shop page
    ├── product.json     # Product page
    ├── cart.json        # Cart page
    ├── search.json      # Search page
    ├── page.shop.json   # Shop page
    └── page.contact.json # Contact page
```

### What's Converted:
- ✅ All CSS styles from React (base.css)
- ✅ Homepage sections (Hero, Marquee, Collections, Products, Testimonials, Newsletter)
- ✅ Header with navigation + mobile menu
- ✅ Footer with newsletter signup
- ✅ Product page with variants, quantity, add to cart
- ✅ Collection page with filters and sorting
- ✅ Cart page with quantity controls
- ✅ Contact page with form
- ✅ Search page

### To Deploy to Shopify:
1. Create a new Shopify store (or use existing)
2. Go to Online Store > Themes
3. Click "Add theme" > "Upload zip file"
4. Upload the folder as a zip file
5. Customize colors, fonts in theme settings
6. Add products in Shopify admin
