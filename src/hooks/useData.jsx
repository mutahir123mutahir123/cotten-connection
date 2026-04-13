import { useState, useEffect } from 'react';
import { api } from '../api/client';

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    api.getProducts()
      .then(data => {
        if (mounted) {
          setProducts(data);
          setLoading(false);
        }
      })
      .catch(err => {
        console.error('Error fetching products:', err);
        if (mounted) {
          setError(err.message);
          setLoading(false);
        }
      });
    return () => { mounted = false; };
  }, []);

  return { products, loading, error };
}

export function useProduct(id) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    let mounted = true;
    setLoading(true);
    api.getProduct(id)
      .then(data => {
        if (mounted) {
          setProduct(data);
          setLoading(false);
        }
      })
      .catch(err => {
        if (mounted) {
          setError(err.message);
          setLoading(false);
        }
      });
    return () => { mounted = false; };
  }, [id]);

  return { product, loading, error };
}

export function useCollections() {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    api.getCollections()
      .then(data => {
        if (mounted) {
          setCollections(data);
          setLoading(false);
        }
      })
      .catch(err => {
        if (mounted) {
          setError(err.message);
          setLoading(false);
        }
      });
    return () => { mounted = false; };
  }, []);

  return { collections, loading, error };
}

export function useCollection(id) {
  const [collection, setCollection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    let mounted = true;
    setLoading(true);
    api.getCollection(id)
      .then(data => {
        if (mounted) {
          setCollection(data);
          setLoading(false);
        }
      })
      .catch(err => {
        if (mounted) {
          setError(err.message);
          setLoading(false);
        }
      });
    return () => { mounted = false; };
  }, [id]);

  return { collection, loading, error };
}

export function useProductsByCollection(collectionId) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!collectionId) return;
    let mounted = true;
    setLoading(true);
    api.getProductsByCollection(collectionId)
      .then(data => {
        if (mounted) {
          setProducts(data);
          setLoading(false);
        }
      })
      .catch(err => {
        if (mounted) {
          setError(err.message);
          setLoading(false);
        }
      });
    return () => { mounted = false; };
  }, [collectionId]);

  return { products, loading, error };
}

export function useTestimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    api.getTestimonials()
      .then(data => {
        if (mounted) {
          setTestimonials(data);
          setLoading(false);
        }
      })
      .catch(err => {
        if (mounted) {
          setError(err.message);
          setLoading(false);
        }
      });
    return () => { mounted = false; };
  }, []);

  return { testimonials, loading, error };
}

export function useSearch(query) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query || query.length < 2) {
      setResults([]);
      return;
    }
    let mounted = true;
    setLoading(true);
    api.searchProducts(query)
      .then(data => {
        if (mounted) {
          setResults(data);
          setLoading(false);
        }
      });
    return () => { mounted = false; };
  }, [query]);

  return { results, loading };
}