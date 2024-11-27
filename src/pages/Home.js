// Home.js
import React, { useState } from "react";
import { Box, Drawer } from "@mui/material";
import Cart from "../components/Cart";
import FullScreenBanner from "../components/FullScreenBanner";
import ProductDetailsModal from "../components/ProductDetailsModal";
import CategoryCards from "../components/CategoryCards"; // Importa el componente de las categorías

const Home = ({ onAddToCart }) => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState(() => {
    const savedCartItems = localStorage.getItem("cartItems");
    return savedCartItems ? JSON.parse(savedCartItems) : [];
  });
  const [selectedProduct, setSelectedProduct] = useState(null);

  const toggleCart = () => {
    setCartOpen((prev) => !prev);
  };

  const handleRemoveFromCart = (id) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== id)
    );
  };

  const handleUpdateQuantity = (id, talla, increment) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.talla === talla
          ? { ...item, quantity: Math.max(item.quantity + increment, 1) }
          : item
      )
    );
  };

  const handleOpenProductDetails = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseProductDetails = () => {
    setSelectedProduct(null);
  };

  return (
    <Box>
      {/* Banner ocupando toda la pantalla */}
      <Box sx={{ height: "100vh", position: "relative" }}>
        <FullScreenBanner />
      </Box>

      {/* Contenedor de categorías */}
      <Box sx={{ marginTop: 2 }}>
        <CategoryCards /> {/* Componente con las tarjetas de categorías */}
      </Box>

      

      
    </Box>
  );
};

export default Home;
