import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Cart from "./components/Cart";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsappButton";
import OrderTracking from "./pages/OrderTracking";
import TermsAndConditions from "./pages/TermsAndConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import FAQ from "./pages/FAQ";
import { Drawer, Box, Snackbar, Alert, Toolbar} from "@mui/material";
import {
  addToCart,
  removeFromCart,
  updateCartQuantity,
  emptyCart,
  getTotalItems,
  playSound,
} from "./services/utils";

function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const showSnackbar = (message, severity = "success") => {
    playSound();
    setSnackbar({ open: true, message, severity });
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };
  const handleOpenCart = () => setCartOpen(true);
  const handleCloseCart = () => setCartOpen(false);

  const handleAddToCart = (product, talla) => {
    setCartItems((prevItems) => addToCart(prevItems, product, talla));
  };

  const handleRemoveFromCart = (id, talla) => {
    setCartItems((prevItems) => removeFromCart(prevItems, id, talla));
  };

  const handleUpdateQuantity = (id, talla, increment) => {
    setCartItems((prevItems) => updateCartQuantity(prevItems, id, talla, increment));
  };

  const handleEmptyCart = () => {
    setCartItems(emptyCart());
    handleCloseCart();
  };

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
          <Route
            path="/"
            element={
              <Home
                onAddToCart={handleAddToCart}
                cartItems={cartItems}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveFromCart={handleRemoveFromCart}
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
