

const Pricing = () => {
  return (
    <section id="pricing" className="flex justify-center items-center py-12 mx-3">
        <div className="rounded-lg shadow-lg max-w-4xl w-full p-8 bg-white">
            <h2 className="text-3xl font-semibold mb-8 text-center">Pricing Plans</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Basic Plan */} 
             <div className="border rounded-lg p-6 text-center flex flex-col justify-between h-full">
                    <h3 className="text-xl font-semibold mb-2">Basic</h3>
                    <p className="text-3xl font-bold mb-4">$0</p>
                    <ul className="mb-4 space-y-2 text-gray-700 leading-6 flex-1">
                        <li>Browse all products</li>
                        <li>Free shipping on orders over $50</li>
                          <li>Priority email support</li>
                    </ul>
                    <button className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 mt-auto">Choose Standard</button>
             </div>
            <div className="border rounded-lg p-6 text-center flex flex-col justify-between h-full">
                <h3 className="text-xl font-semibold mb-2">Pro</h3>
                <p className="text-3xl font-bold mb-4">$19.99<span className="text-base font-normal">/mo</span></p>
                <ul className="mb-4 space-y-2 text-gray-700 leading-6 flex-1">
                <li>Everything in Standard</li>
                <li>Exclusive member discounts</li>
                <li>24/7 phone & chat support</li>
                </ul>
                <button className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-800">Choose Pro</button>
            </div>
            <div className="border rounded-lg p-6 text-center flex flex-col justify-between h-full">
                <h3 className="text-xl font-semibold mb-2">Premium</h3>
                <p className="text-3xl font-bold mb-4">$19.99<span className="text-base font-normal">/mo</span></p>
                <ul className="mb-4 space-y-2 text-gray-700 leading-6 flex-1">
                <li>Everything in Standard</li>
                <li>Exclusive member discounts</li>
                <li>24/7 phone & chat support</li>
                </ul>
                <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-800">Choose Pro</button>
            </div>
            </div>
        </div>
    </section>
  )
}

export default Pricing;