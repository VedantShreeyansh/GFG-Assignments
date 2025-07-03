import React from "react";
import type { CartItem } from "../types/CartItem";
import { useNavigate } from "react-router-dom";

interface CartProps {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (item: CartItem) => void;
  clearCart: () => void;
  onClose: () => void;
}

const Cart: React.FC<CartProps> = ({
  cartItems,
  addToCart,
  removeFromCart,
  clearCart,
}) => {
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const taxes = +(subtotal * 0.1).toFixed(2); // 10% tax
  const shipping = subtotal > 0 ? 0 : 0;
  const total = subtotal + taxes + shipping;
  const navigate = useNavigate();

  return (
      <div className="cart bg-gray-100 rounded-lg shadow-lg w-full max-w-4xl p-8 relative mx-2 ">
        <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="md:w-3/4">
            <div className="bg-white rounded-lg shadow-md p-6 mb-4 max-h-[60vh] overflow-y-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left font-semibold">Product</th>
                    <th className="text-left font-semibold">Price</th>
                    <th className="text-left font-semibold">Quantity</th>
                    <th className="text-left font-semibold">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="text-center py-8 text-gray-500">
                        Your cart is empty.
                      </td>
                    </tr>
                  ) : (
                    cartItems.map((item) => (
                      <tr key={item.id}>
                        <td className="py-4">
                          <div className="flex items-center">
                            <img
                              className="h-20 w-20 mr-4"
                              src={item.imageUrl}
                              alt={item.itemName}
                            />
                            <span className="font-semibold">{item.itemName}</span>
                          </div>
                        </td>
                        <td className="py-4">${item.price}</td>
                        <td className="py-4">
                          <div className="flex items-center">
                            <button
                              className="border rounded-md py-2 px-4 mr-2"
                              onClick={() => removeFromCart(item)}
                            >
                              -
                            </button>
                            <span className="text-center w-8">{item.quantity}</span>
                            <button
                              className="border rounded-md py-2 px-4 ml-2"
                              onClick={() => addToCart(item)}
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="py-4">
                          ${(item.price * item.quantity).toFixed(2)}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="md:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4">Summary</h2>
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Taxes</span>
                <span>${taxes.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Total</span>
                <span className="font-semibold">${total.toFixed(2)}</span>
              </div>
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full"
                onClick={clearCart}
                disabled={cartItems.length === 0}
              >
                Clear Cart
              </button>
              <button
                className="bg-green-500 text-white py-2 px-4 rounded-lg mt-4 w-full"
                disabled={cartItems.length === 0} onClick={() => navigate("/checkout")}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Cart;