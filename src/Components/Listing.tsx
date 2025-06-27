import productsData from '../../public/products1.json';
import ProductCard from './ProductCard';

const Listing = () => {
  return (
    <div className="min-h-screen w-full flex flex-wrap gap-8 items-center justify-center bg-gray-200 dark:bg-gray-800 p-8">
      {productsData.products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Listing;
