import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import CategoryPage from "./pages/CategoryPage.js";
import AccesoriosPage from "./pages/AccesoriosPage.js";
import Cart from "./components/Cart.js";
import Footer from "./components/Footer.js";
import WhatsAppButton from "./components/WhatsappButton";
import OrderTracking from "./pages/OrderTracking";
import TermsAndConditions from "./pages/TermsAndConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ProductRegistration from "./pages/ProductRegistration.js";
import ProductPage from "./pages/ProductPage.js"; // Importación del ProductPage
import FAQ from "./pages/FAQ";
import { Drawer, Box, Snackbar, Alert, Toolbar, CircularProgress } from "@mui/material";
import {
  addToCart,
  removeFromCart,
  updateCartQuantity,
  emptyCart,
  getTotalItems,
  playSound,
  fetchProducts,
} from "./services/utils";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Cargar productos al iniciar la aplicación
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      const fetchedProducts = await fetchProducts(); // Llamada a la función de carga
      console.log(fetchedProducts);
      setProducts(fetchedProducts);
      setLoading(false);
    };
    loadProducts();
  }, []);

  const showSnackbar = (message, severity = "success") => {
    playSound();
    setSnackbar({ open: true, message, severity });
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleOpenCart = () => setCartOpen(true);
  const handleCloseCart = () => setCartOpen(false);

  const handleAddToCart = (product, talla, color) => {
    setCartItems((prevItems) => addToCart(prevItems, product, talla, color));
    showSnackbar("Producto agregado al carrito");
  };

  const handleRemoveFromCart = (id, talla) => {
    setCartItems((prevItems) => removeFromCart(prevItems, id, talla));
    showSnackbar("Producto eliminado del carrito", "info");
  };

  const handleUpdateQuantity = (id, talla, increment) => {
    setCartItems((prevItems) => updateCartQuantity(prevItems, id, talla, increment));
  };

  const handleEmptyCart = () => {
    setCartItems(emptyCart());
    handleCloseCart();
  };

  // Filtrar productos por categoría
  const getCategoryProducts = (category) => {
    return products.filter((product) => product.categorias.includes(category));
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Router>
      <Header
        deadline="2024-12-01T23:59:59"
        cartItems={cartItems}
        onOpenCart={handleOpenCart}
        getTotalItems={getTotalItems}
      />
      <Toolbar />
      <Box>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<ProductRegistration />} />
          <Route
            path="/hombres"
            element={
              <CategoryPage products={getCategoryProducts("Hombre")} onAddToCart={handleAddToCart} />
            }
          />
          <Route
            path="/mujeres"
            element={
              <CategoryPage products={getCategoryProducts("Mujer")} onAddToCart={handleAddToCart} />
            }
          />
          <Route
            path="/accesorios"
            element={
              <AccesoriosPage
                products={getCategoryProducts("accesorios")}
                onAddToCart={handleAddToCart}
              />
            }
          />
          <Route
            path="/product/:id"
            element={
              <ProductPage
                products={products}
                onAddToCart={handleAddToCart}
              />
            }
          />
          <Route path="/order-tracking" element={<OrderTracking />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/faq" element={<FAQ />} />
        </Routes>
      </Box>

      <Drawer anchor="right" open={cartOpen} onClose={handleCloseCart}>
        <Cart
          setSnackbar={showSnackbar}
          cartItems={cartItems}
          onRemoveFromCart={handleRemoveFromCart}
          onUpdateQuantity={handleUpdateQuantity}
          onEmptyCart={handleEmptyCart}
          onCloseCart={handleCloseCart}
        />
      </Drawer>

      <WhatsAppButton />
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
      <Footer />
    </Router>
  );
}

export default App;
