import { useEffect, useState } from "react";
import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import CreateNewProduct from "../components/product/CreateNewProduct";
import ProductCard from "../components/product/ProductCard";
import { setInitialData } from "../helpers/setInitialData";
import "../styles/scss/home/home.scss";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products"));
    if (!storedProducts || storedProducts.length === 0) {
      setInitialData(setProducts);
    } else {
      setProducts(storedProducts);
    }
  }, []);

  const handleDeleteProduct = (id) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home-container">
      <div className="search-container">
        <TextField
          type="text"
          className="search-input"
          placeholder="Buscar productos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </div>

      <CreateNewProduct />
      <br />

      <div className="product-grid">
        {filteredProducts.map((product, index) => (
          <ProductCard
            key={index}
            product={product}
            onDelete={handleDeleteProduct}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
