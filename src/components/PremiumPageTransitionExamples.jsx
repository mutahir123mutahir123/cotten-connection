/**
 * PremiumPageTransition - Usage Guide
 * 
 * A luxury-inspired page transition system using Framer Motion.
 * Designed for high-end e-commerce textile/fashion websites.
 * 
 * ============================================
 * QUICK START
 * ============================================
 * 
 * Import and use in your root/layout file:
 * 
 *   import PremiumPageTransition from './components/PremiumPageTransition';
 * 
 *   function Root() {
 *     return (
 *       <PremiumPageTransition>
 *         <YourRoutes />
 *       </PremiumPageTransition>
 *     );
 *   }
 * 
 * ============================================
 * PROPS
 * ============================================
 * 
 * children        - React node   - The page/Route content (required)
 * withBlur        - boolean     - Enable subtle blur effect during transitions (default: false)
 * 
 * ============================================
 * BASIC USAGE
 * ============================================
 * 
 * <PremiumPageTransition>
 *   <Routes>
 *     <Route path="/" element={<HomePage />} />
 *     <Route path="/shop" element={<ShopPage />} />
 *   </Routes>
 * </PremiumPageTransition>
 * 
 * ============================================
 * WITH BLUR EFFECT
 * ============================================
 * 
 * Perfect for adding that extra touch of luxury.
 * 
 * <PremiumPageTransition withBlur>
 *   <Routes>
 *     <Route path="/" element={<HomePage />} />
 *     <Route path="/shop" element={<ShopPage />} />
 *   </Routes>
 * </PremiumPageTransition>
 * 
 * ============================================
 * WITH REACT ROUTER v7
 * ============================================
 * 
 * Works seamlessly with React Router v7:
 * 
 *   import { useLocation } from 'react-router-dom';
 *   import PremiumPageTransition from './components/PremiumPageTransition';
 * 
 *   function Layout() {
 *     const location = useLocation();
 *     
 *     return (
 *       <>
 *         <Navbar />
 *         <PremiumPageTransition>
 *           <Outlet />
 *         </PremiumPageTransition>
 *         <Footer />
 *       </>
 *     );
 *   }
 * 
 * ============================================
 * WITH SHOPIFY HYDROGEN
 * ============================================
 * 
 * For Shopify Hydrogen storefronts:
 * 
 *   import { useNavigation } from '@shopify/hydrogen';
 *   import PremiumPageTransition from './components/PremiumPageTransition';
 * 
 *   export default function Layout({ children }) {
 *     const navigation = useNavigation();
 *     
 *     return (
 *       <div className="app">
 *         <Header />
 *         <PremiumPageTransition>
 *           {children}
 *         </PremiumPageTransition>
 *         <Footer />
 *       </div>
 *     );
 *   }
 * 
 * ============================================
 * FEATURES
 * ============================================
 * 
 * - AnimatePresence with mode="wait" ensures exit completes before enter
 * - Smooth fade + slide up animation (professional feel)
 * - Premium easing curve [0.22, 1, 0.36, 1] (cubic-bezier)
 * - Duration: 0.5s enter, 0.4s exit (soft & elegant)
 * - Optional subtle blur effect
 * - Automatic scroll reset on route change
 * - Route key-based transitions
 * - Optimized performance (will-change managed by Framer Motion)
 * 
 * ============================================
 * CUSTOMIZATION
 * ============================================
 * 
 * To adjust timing:
 * 
 *   const pageVariants = {
 *     initial: { opacity: 0, y: 20 },
 *     animate: {
 *       opacity: 1,
 *       y: 0,
 *       transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
 *     },
 *     exit: {
 *       opacity: 0,
 *       y: -20,
 *       transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
 *     }
 *   };
 * 
 * To adjust slide distance:
 * 
 *   const pageVariants = {
 *     initial: { opacity: 0, y: 32 },  // Change 20 to 32
 *     animate: { opacity: 1, y: 0 },
 *     exit: { opacity: 0, y: -32 }     // Change -20 to -32
 *   };
 * 
 * ============================================
 * REDUCED MOTION SUPPORT
 * ============================================
 * 
 * The component automatically respects prefers-reduced-motion.
 * For custom handling:
 * 
 *   import { useReducedMotion } from 'framer-motion';
 * 
 *   function MyTransition({ children }) {
 *     const shouldReduceMotion = useReducedMotion();
 *     
 *     return (
 *       <PremiumPageTransition>
 *         {children}
 *       </PremiumPageTransition>
 *     );
 *   }
 * 
 * ============================================
 */