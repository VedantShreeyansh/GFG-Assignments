import { useEffect, useState } from 'react'
import Navbar from './Components/Navbar';
import AppRoutes from './Routes/AppRoutes';
import AuthModal from './Components/AuthModal';
import ProfilePage from './Components/ProfilePage';
import "./App.css";
import "./index.css";
import './global.css';

const App = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("isAuthenticated") === "true";
  });

  const handleLoginRegister = () => {
    localStorage.setItem("isAuthenticated", "false");
    setIsAuthenticated(false);
    setShowAuthModal(true);
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
    {showAuthModal ? (
      <AuthModal
        isOpen={true}
        onClose={() => setShowAuthModal(false)}
        onAuthSuccess={handleAuthSuccess}
      />
    ) : (
      <div style={{ position: "relative", zIndex: 1 }}>
        <Navbar onLoginRegister={handleLoginRegister} 
        onProfile={() => setShowProfile(true)}/>
        <AppRoutes />
      </div>
    )}
  </>
  );
};

export default App;