import  { useEffect, useState} from 'react'
import Navbar from './Components/Navbar';
import AppRoutes from './Routes/AppRoutes';
import AuthModal from './Components/AuthModal';
import "./App.css";
import "./index.css";
import './global.css';

const App = () => {

  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    // Remove any existing canvas to avoid duplicates
    const oldCanvas = document.getElementById('finisher-canvas');
    if (oldCanvas) oldCanvas.remove();

    // @ts-ignore
    if (window.FinisherHeader) {
      // @ts-ignore
      new window.FinisherHeader({
        "count": 100,
        "size": {
          "min": 2,
          "max": 8,
          "pulse": 0
        },
        "speed": {
          "x": {
            "min": 0,
            "max": 0.4
          },
          "y": {
            "min": 0,
            "max": 0.6
          }
        },
        "colors": {
          "background": "#111827",
          "particles": [
            "#fbfcca",
            "#d7f3fe",
            "#ffd0a7"
          ]
        },
        "blending": "overlay",
        "opacity": {
          "center": 1,
          "edge": 0
        },
        "skew": 0,
        "shapes": [
          "c"
        ]
      });
    }
  }, []);

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
         <div style={{ position: "relative", zIndex: 1 }}>
      <Navbar onProfileClick={() => setShowAuthModal(true)}/>
      <AppRoutes />
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
      </div>
    </>
  );
};

  // return (
  //   <div>
  //     <h1>Welcome to React Portal</h1>
  //     <button onClick={() => setIsModalOpen(true)}>Open Modal</button>
  //     <Modal isOpen={isModalOpen}>
  //       <h2>This is a Modal</h2>
  //     </Modal>
  //     <button onClick={() => setIsModalOpen(false)}>Close Modal</button>
  //   </div>
  // )


export default App;