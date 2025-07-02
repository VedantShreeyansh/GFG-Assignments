import { useEffect, useState } from 'react'
import Navbar from './Components/Navbar';
import AppRoutes from './Routes/AppRoutes';
import AuthModal from './Components/AuthModal';
import ProfilePage from './Components/ProfilePage';
import "./App.css";
import "./index.css";
import './global.css';
import Cart from './Components/Cart';;

type Product = {
  itemName: string;
  type: string;
  imageUrl: string;
  id: number;
  price: number;
  quantity?: number;
};

type CartItem = {
  itemName: string;
  type: string;
  imageUrl: string;
  id: number;
  price: number;
  quantity: number;
}


const App = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const cartCount = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("isAuthenticated") === "true";
  });

  const handleLoginRegister = () => {
    localStorage.setItem("isAuthenticated", "false");
    setIsAuthenticated(false);
    setShowAuthModal(true);
  }

  const addToCart = (product: CartItem) => {
  setCartItems(prev => {
    const found = prev.find(item => item.id === product.id);
    if (found) {
      return prev.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      // Always ensure quantity is set
      return [...prev, { ...product, quantity: product.quantity ?? 1 }];
    }
  });
};

  const removeFromCart = (product: CartItem) => {
    setCartItems(prev => {
      const found = prev.find(item => item.id === product.id);
      if (found && found.quantity > 1){
        return prev.map(item =>
           item.id === product.id
           ? { ...item, quantity: item.quantity - 1}
           : item
        );
      } else {
        return prev.filter(item => item.id !== product.id);
      }
    })
  }

  useEffect(() => {
    // Remove any existing canvas to avoid duplicates
    const oldCanvas = document.getElementById('finisher-canvas');
    if (oldCanvas) oldCanvas.remove();

    // @ts-ignore
    if (window.FinisherHeader) {
      // @ts-ignore
      new window.FinisherHeader({
        "count": 100,
        "size": { "min": 2, "max": 8, "pulse": 0 },
        "speed": { "x": { "min": 0, "max": 0.4 }, "y": { "min": 0, "max": 0.6 } },
        "colors": { "background": "#111827", "particles": ["#fbfcca", "#d7f3fe", "#ffd0a7"] },
        "blending": "overlay",
        "opacity": { "center": 1, "edge": 0 },
        "skew": 0,
        "shapes": ["c"]
      });
    }
  }, []);

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", "true");
    setShowAuthModal(false);
  }

  const handleLogout = () => {
    localStorage.setItem("isAuthenticated", "false");
    setIsAuthenticated(false);
    setShowAuthModal(false);
  }

  // Show only AuthModal on first load
  if (!isAuthenticated) {
  return (
    <>
      <div
        className="finisher-header"
        style={{
          width: "100vw",
          height: "100vh",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 0,
          pointerEvents: "none",
        }}
      ></div>
      <AuthModal
        isOpen={true}
        onClose={() => {}}
        onAuthSuccess={handleAuthSuccess}
      />
    </>
  );
}
  function handleWishlist(): void {
    throw new Error('Function not implemented.');
  }

  // function setShowCart(arg0: boolean): void {
  //   throw new Error('Function not implemented.');
  // }

  // When authenticated, show Navbar and routes
return (
  <>
    <div
      className="finisher-header"
      style={{
        width: "100vw",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    ></div>
    {showProfile ? (
      <ProfilePage onClose={() => setShowProfile(false)} />
    ) : showAuthModal ? (
      <AuthModal
        isOpen={true}
        onClose={() => setShowAuthModal(false)}
        onAuthSuccess={handleAuthSuccess}
      />
    ) : (
      <div style={{ position: "relative", zIndex: 1 }}>
         {/* Show Cart modal/page if open */}
          {showCart && (
            <Cart
              cartItems={cartItems}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
              clearCart={() => setCartItems([])}
              onClose={() => setShowCart(false)}
            />
          )}
        <Navbar onLoginRegister={handleLoginRegister}
        onWishlist={handleWishlist}
        onCart={() => setShowCart(true)}
        onProfile={() => setShowProfile(true)}
        cartCount={cartCount} />
        <AppRoutes
          addToCart={addToCart}
          cartItems={cartItems}
          removeFromCart={removeFromCart}
          clearCart={() => setCartItems([])}
        />
      </div>
    )}
  </>
  );
};

export default App;