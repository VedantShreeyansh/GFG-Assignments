type Product = {
    itemName: string;
    type: string;
    notes: string;
    imageUrl: string;
    id: number;
    price: number;
};

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <article className="max-w-sm w-full bg-white rounded-lg shadow-lg oveflow-hidden dark:bg-gray-700">
       <div>
         <img src={product.imageUrl} alt={product.itemName} className="object-cover h-64 w-full" />
      </div> 
        <div className="flex flex-col gap-1 mt-4 px-4">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-50">{product.itemName}</h2>
            <span className="font-normal text-gray-600 dark:text-gray-300">{product.type}</span>
            <span className="font-semibold text-gray-800 dark:text-gray-50">${product.price}</span>
            <span className="text-xs text-gray-500">{product.notes}</span>
        </div>
        <div className="mt-4 p-4 border-5 border-gray-200 dark:border-gray-500">
            <button className="w-full flex justify-between items-center font-bold cursor-pointer hover:underline text-gray-800 dark:text-gray-50">
                <span className="text-base">Add to Cart</span>
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
            </button>
        </div>
    </article>
  )
}

export default ProductCard