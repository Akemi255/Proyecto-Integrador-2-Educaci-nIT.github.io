import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Home from "../pages/home";
import Contact from "../pages/contact";
import About from "../pages/about";
import Cart from "../pages/cart";
import CreateProduct from "../pages/create-product";
import EditProduct from "../pages/edit-product";
import { SelectedOptionProvider } from "../context/SelectedOptionContext";

const AppRouter = () => {
  return (
    <Router>
      <SelectedOptionProvider>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/create-product" element={<CreateProduct />} />
          <Route path="/edit-product/:id" element={<EditProduct />} />
        </Routes>
        <br />
        <Footer />
      </SelectedOptionProvider>
    </Router>
  );
};

export default AppRouter;
