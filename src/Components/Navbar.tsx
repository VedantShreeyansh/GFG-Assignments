import { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const Navbar = ( { onLoginRegister, onWishlist, onCart, onProfile, cartCount = 0, }: { onLoginRegister: () => void; onWishlist?: () => void; onCart?: () => void; onProfile?: () => void; cartCount?: number;}) => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [animateCart, setAnimateCart] = useState(false);
  const prevCartCount = useRef(cartCount);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
       document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (cartCount > prevCartCount.current) {
      setAnimateCart(true);
      setTimeout(() => setAnimateCart(false), 400);
    }
    prevCartCount.current = cartCount;
  }, [cartCount]);

  return (
    <nav className="Navbar border-gray-200 bg-transparent dark:border-gray-700">
      <div className="max-w-screen-xl flex  items-center justify-between mx-auto p-4">
        <a href="" className="flex items-center space-x-3 rtl:space-x-reverse">
            {/* <img src="" className="h-8" alt="logo" /> */}
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">CosmoCart</span>
        </a>
        <button data-collapse-toggle="navbar-solid-bg" type="button" className="inline-flex items-center p-2 w-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-solid-bg" aria-expanded="false">
            <span className="sr-only">Opem main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
               <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
               </svg>
        </button>
            <ul className="flex justify-center items-center w-full font-medium mt-4 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
                <li>
                     <Link to="/" aria-current="page" className="text-lg block py-2 px-3 md:p-0 text-white bg-blue-700 rounded-sm:md:bg-transparent md:text-blue-700 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent">Home</Link>
                </li>
                 <li>
                     <Link to="/services" className="text-lg block py-2 px-3 md:p-0 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Services</Link>
                </li>
                <li>
                     <Link to="/pricing" className="text-lg block py-2 px-3 md:p-0 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Pricing</Link>
                </li>
                <li>
                     <Link to="/contact" className="text-lg block py-2 px-3 md:p-0 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Contact</Link>
                </li>
            </ul>
            <div className="flex-items-center gap-2">
              <button
                onClick={() => navigate('/cart')}
                className="flex items-center justify-center w-9 h-9 bg-nonw rounded-full hover:bg-gray-300 shadow-md transition-all duration-200 relative"
                aria-label="Cart" 
              >
                {/* Cart count badge behind the left corner of the icon */}
                {cartCount > 0 && (
                  <span
                    className={`absolute -left-3 -top-1 z-0 bg-blue-600 text-white text-xs font-bold rounded-full px-2 py-0.5 shadow transition-transform duration-300
                      ${animateCart ? "scale-125" : "scale-100"}`}
                    style={{ pointerEvents: "none" }}
                  >
                    {cartCount}
                  </span>
                )}
                <svg className="w-7 h-7 text-white relative z-10" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 28 28">
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
                      <div className="relative" ref={dropdownRef}>
              <button
                 onClick={() => setDropdownOpen((open) => !open)}
                 className="flex items-center justify-center w-9 h-9 bg-nonw rounded-full hover:bg-gray-300 shadow-md transition-all duration-200" aria-label="Profile">
                  
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <circle cx="12" cy="6" r="4" />
                  <path d="M4 20c0-4 8-4 8-4s8 0 8 4" />
                </svg>
                 </button>
                  {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded shadow-lg z-50">
              <ul className="py-1">
                <li>
                   <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={() => {
                      setDropdownOpen(false);
                      onProfile && onProfile();
                    }}
                  >
                    Profile Page
                  </button>
                </li>
                <li>
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={() => {
                      setDropdownOpen(false);
                      onLoginRegister();
                    }}
                  >
                    Login / Register
                  </button>
                </li>
                {/* Add more dropdown items as needed */}
                {/* Example:
                <li>
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={() => {
                      setDropdownOpen(false);
                      onWishlist && onWishlist();
                    }}
                  >
                    Wishlist
                  </button>
                </li>
                */}
              </ul>
            </div>
          )}
            </div>
        </div>
    </nav>
  );
};

export default Navbar;