import Hero from '../components/Hero';
import FeaturedProducts from '../components/FeaturedProducts';
import Collections from '../components/Collections';
import About from '../components/About';
import ProductShowcase from '../components/ProductShowcase';
import Marquee from '../components/Marquee';
import Testimonials from '../components/Testimonials';
import Newsletter from '../components/Newsletter';

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <Collections />
      <About />
      <ProductShowcase />
      <Marquee />
      <Testimonials />
      <Newsletter />
    </>
  );
}
