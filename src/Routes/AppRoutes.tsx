import { Routes, Route } from "react-router-dom";
import Assignment1 from '../Components/Assignment1';
import Register from '../Components/Register';
import Services from '../Components/Services';
import Pricing from "../Components/Pricing";
import ContactUs from "../Components/ContactUs";
import Listing from "../Components/Listing";
import Cart from "../Components/Cart";
import type { CartItem } from "../types/CartItem";
import Checkout from "../Components/Checkout";

interface AppRoutesProps {
  addToCart: (product: CartItem) => void;
  cartItems: CartItem[];
  removeFromCart: (product: CartItem) => void;
  clearCart: () => void;
  total: number;
}

const AppRoutes = ({ addToCart, cartItems, removeFromCart, clearCart, total }: AppRoutesProps) => (
  <Routes>
     <Route path="/" element={<Assignment1 addToCart={addToCart}/>} />
     <Route path="/register" element={<Register />} />
     <Route path="/services" element={<Services />} />
     <Route path="/pricing" element={<Pricing />} />
     <Route path="/contact" element={<ContactUs />} />
     <Route path="/listing" element={<Listing addToCart={addToCart} />} />
     <Route path="/checkout" element={<Checkout total={total} />} />
     <Route path="/cart" element={
        <Cart 
        cartItems={cartItems}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        clearCart={clearCart} onClose={function (): void {
        throw new Error("Function not implemented.");
        } } />
     } />

  </Routes>
)

export default AppRoutes;