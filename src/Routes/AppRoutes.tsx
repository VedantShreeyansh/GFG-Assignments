import { Routes, Route } from "react-router-dom";
import Assignment1 from '../Components/Assignment1';
import Register from '../Components/Register';
import Services from '../Components/Services';
import Pricing from "../Components/Pricing";
import ContactUs from "../Components/ContactUs";


const AppRoutes = () => (
  <Routes>
     <Route path="/" element={<Assignment1 />} />
     <Route path="/register" element={<Register />} />
     <Route path="/services" element={<Services />} />
     <Route path="/pricing" element={<Pricing />} />
     <Route path="/contact" element={<ContactUs />} />
  </Routes>
)

export default AppRoutes;