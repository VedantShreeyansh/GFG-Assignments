import { useEffect, useState } from "react";
import ProductCard from './ProductCard';
import type { CartItem } from '../types/CartItem';

interface ListingProps {
  addToCart: (product: CartItem) => void;
}

const Listing: React.FC<ListingProps> = ({ addToCart }) => {
  const [products, setProducts] = useState<CartItem[]>([]);

  useEffect(() => {
    fetch('/products1.json')
      .then(res => res.json())
      .then(data => {
        // Remove notes property if present
        const cleaned = data.products.map((p: any) => {
          const { notes, ...rest } = p;
          return { ...rest, quantity: 1 };
        });
        setProducts(cleaned);
      });
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-wrap gap-8 items-center justify-center bg-gray-200 dark:bg-gray-800 p-8">
      {products.map(product => (
        <ProductCard key={product.id} product={product} addToCart={addToCart} />
      ))}
    </div>
  );
};

export default Listing;