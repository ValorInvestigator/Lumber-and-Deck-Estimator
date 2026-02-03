import React, { useState, useEffect } from 'react';
import { LumberProduct } from '../types';
import { generateProductImage } from '../services/geminiService';
import { Loader2, Image as ImageIcon } from 'lucide-react';

interface ProductImageProps {
  product: LumberProduct;
  className?: string;
}

export const ProductImage: React.FC<ProductImageProps> = ({ product, className }) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isMounted = true;
    let timeoutId: ReturnType<typeof setTimeout>;

    const loadImage = async () => {
      // 1. Try to get from localStorage
      // Updated version key (v2) to force re-generation with the new prompt
      const cacheKey = `ice_product_img_v2_${product.id}`;
      const cached = localStorage.getItem(cacheKey);

      if (cached) {
        if (isMounted) {
          setImageSrc(cached);
          setLoading(false);
        }
        return;
      }

      // 2. Generate new image
      try {
        const generated = await generateProductImage(product.name, product.description);
        if (isMounted) {
          if (generated) {
            try {
              localStorage.setItem(cacheKey, generated);
              setImageSrc(generated);
            } catch (storageError) {
              console.warn("Could not cache image:", storageError);
              setImageSrc(generated);
            }
          } else {
            // Fallback to existing URL (placeholder)
            setImageSrc(product.imageUrl);
          }
        }
      } catch (e) {
        console.error("Failed to load image for", product.name, e);
        if (isMounted) {
          setError(true);
          setImageSrc(product.imageUrl);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    // Stagger the requests to avoid hitting rate limits immediately on load
    // Random delay between 0 and 6000ms to spread out the API calls more
    const delay = Math.random() * 6000;
    timeoutId = setTimeout(loadImage, delay);

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [product.id, product.name, product.description, product.imageUrl]);

  if (loading) {
    return (
      <div className={`flex flex-col items-center justify-center bg-wood-50 text-wood-400 ${className}`}>
        <Loader2 className="w-8 h-8 animate-spin mb-2" />
        <span className="text-xs">Processing...</span>
      </div>
    );
  }

  return (
    <img 
      src={imageSrc || product.imageUrl} 
      alt={product.name} 
      className={`${className} object-cover transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}
    />
  );
};