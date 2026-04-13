import { products, collections, testimonials, navLinks } from '../data';

export const api = {
  async getProducts() {
    return products;
  },

  async getProduct(id) {
    return products.find(p => p.id === parseInt(id)) || null;
  },

  async getCollections() {
    return collections;
  },

  async getCollection(id) {
    return collections.find(c => c.id === id) || null;
  },

  async getProductsByCollection(collectionId) {
    const collection = collections.find(c => c.id === collectionId);
    if (!collection) return [];
    return products.filter(p => p.category === collection.category);
  },

  async getTestimonials() {
    return testimonials;
  },

  async getNavLinks() {
    return navLinks;
  },

  async searchProducts(query) {
    const lowerQuery = query.toLowerCase();
    return products.filter(p => 
      p.name.toLowerCase().includes(lowerQuery) ||
      p.category.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery)
    );
  }
};