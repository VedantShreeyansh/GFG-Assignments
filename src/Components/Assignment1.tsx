import { useEffect, useState } from "react";

type Product = {
  itemName: string;
  type: string;
  notes: string;
  imageUrl: string;
  id: number;
  price: number;
};

const Assignment1 = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("/products1.json")
      .then((res) => res.json())
      .then((data) => setProducts(data.products));
  }, []);

  return (
    <div className="bg-transparent min-h-screen py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-white mb-8 flex justify-center">
          Introducing Our Latest Product
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-lg p-8 flex flex-col"
            >
              <div className="relative w-full h-48 overflow-hidden">
                <img
                  className="object-cover w-full h-full"
                  src={product.imageUrl}
                  alt={product.itemName}
                />
                <div className="absolute inset-0 bg-black opacity-40"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="bg-white text-gray-900 py-2 px-6 rounded-full font-bold hover:bg-gray-300">
                    View Product
                  </button>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mt-4">
                {product.itemName}
              </h3>
              <p className="text-gray-500 text-sm mt-2">{product.notes}</p>
              <div className="flex items-center justify-between mt-4">
                <span className="text-gray-900 font-bold text-lg">
                  ${product.price}
                </span>
                <button className="bg-gray-900 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 ml-2">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Assignment1;