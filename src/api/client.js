import { products, collections, testimonials, navLinks } from '../data';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  async getProducts() {
    await delay(300);
    return products;
  },

  async getProduct(id) {
    await delay(200);
    const product = products.find(p => p.id === parseInt(id));
    if (!product) throw new Error('Product not found');
    return product;
  },

  async getCollections() {
    await delay(300);
    return collections;
  },

  async getCollection(id) {
    await delay(200);
    const collection = collections.find(c => c.id === id);
    if (!collection) throw new Error('Collection not found');
    return collection;
  },

  async getProductsByCollection(collectionId) {
    await delay(300);
    const collection = collections.find(c => c.id === collectionId);
    if (!collection) throw new Error('Collection not found');
    return products.filter(p => p.category === collection.category);
  },

  async getTestimonials() {
    await delay(200);
    return testimonials;
  },

  async getNavLinks() {
    await delay(100);
    return navLinks;
  },

  async searchProducts(query) {
    await delay(300);
    const lowerQuery = query.toLowerCase();
    return products.filter(p => 
      p.name.toLowerCase().includes(lowerQuery) ||
      p.category.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery)
    );
  }
};