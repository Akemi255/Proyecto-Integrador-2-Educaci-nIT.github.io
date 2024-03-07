import { useState } from 'react';
import { Button, Card, CardContent, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import "../../styles/scss/product-card/product-card.scss";
import { useSelectedOption } from "../../context/SelectedOptionContext";
import { useCart } from '../../context/CartContext';

const ProductCard = ({ product, onDelete }) => {
  const { id, imageUrl, name, description, price, stock } = product;
  const { setSelectedOption } = useSelectedOption();
  const { setCartNumber } = useCart();
  
  const formattedPrice = parseFloat(price).toFixed(2);

  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const initialQuantity = cart.find(item => item.id === id)?.quantity || 0;
  const [quantity, setQuantity] = useState(initialQuantity);

  const handleIncrement = () => {
    if (quantity < stock) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      handleAddToCart(newQuantity);
      setCartNumber(prevNumber => prevNumber + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      setCartNumber(prevNumber => prevNumber - 1);
      handleAddToCart(newQuantity);
    }
  };

  const handleDelete = () => {
    setCartNumber(prevNumber => prevNumber - quantity);
    onDelete(id);
  };

  const handleAddToCart = (quantityToAdd) => {
    if (quantityToAdd === 0) {
      const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
      const updatedCart = existingCart.filter(item => item.id !== id);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    } else {
      const totalPrice = quantityToAdd * price;
      const productData = {
        id,
        name,
        description,
        price,
        quantity: quantityToAdd,
        totalPrice,
      };
      const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
      const updatedCart = [...existingCart.filter(item => item.id !== id), productData];
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  };

  return (
    <Card className="product-card">
      <div className="product-card-image-container">
        <img src={imageUrl} alt={name} />
        <div className="button-container">
          <Button
            component={Link}
            to={`/edit-product/${id}`}
            onClick={() => setSelectedOption("Volver")}
            className="edit-button"
          >
            <EditIcon />
          </Button>
          <Button className="delete-button" onClick={handleDelete}>
            <DeleteIcon />
          </Button>
        </div>
      </div>
      <CardContent className="product-card-content">
        <Typography variant="h6" className="product-card-title">
          {name}
        </Typography>
        <Typography variant="body2" className="product-card-description">
          {description}
        </Typography>
        <Typography variant="h6" className="product-card-price">
          ${formattedPrice}
        </Typography>
        <div className="quantity-controls">
          {stock == 0 ? (
            <div>
              <br />
              <Typography className='no-stock'>SIN STOCK <SentimentDissatisfiedIcon className='DissatisfiedIcon'/></Typography>
            </div>
          ) : (
            <>
              <Button onClick={handleDecrement}>-</Button>
              <Typography>{quantity}</Typography>
              <Button onClick={handleIncrement}>+</Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    stock: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};


export default ProductCard;
