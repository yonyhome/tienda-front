import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import CategoryPage from "./pages/CategoryPage";
import AccesoriosPage from "./pages/AccesoriosPage";
import Cart from "./components/Cart";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsappButton";
import HamburgerMenu from "./components/HamburgerMenu";
import OrderTracking from "./pages/OrderTracking";
import TermsAndConditions from "./pages/TermsAndConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ProductRegistration from "./pages/ProductRegistration";
import ProductPage from "./pages/ProductPage";
import FAQ from "./pages/FAQ";
import {
  Drawer,
  Box,
  Snackbar,
  Alert,
  Toolbar,
  CircularProgress,
} from "@mui/material";
import { addToCart, removeFromCart, updateCartQuantity, emptyCart, getTotalItems, fetchProducts } from "./services/utils";
import { trackPageView } from "./analytics";

function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname);
  }, [location]);

  return null;
}

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Variables para gestionar el gesto
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);

  useEffect(() => {
    const handleTouchStart = (e) => {
      const touch = e.touches[0];
      setStartX(touch.clientX);
      setStartY(touch.clientY);
    };

    const handleTouchEnd = (e) => {
      const touch = e.changedTouches[0];
      const deltaX = touch.clientX - startX;
      const deltaY = Math.abs(touch.clientY - startY);

      // Asegúrate de que el gesto sea horizontal
      if (deltaY < 50) {
        // Abrir menú hamburguesa (deslizar desde borde izquierdo)
        if (startX < 50 && deltaX > 100) {
          setMenuOpen(true);
        }
        // Abrir carrito (deslizar desde borde derecho)
        if (window.innerWidth - startX < 50 && deltaX < -100) {
          setCartOpen(true);
        }
      }
    };

    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [startX, startY]);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      const fetchedProducts = await fetchProducts();
      setProducts(fetchedProducts);
      setLoading(false);
    };
    loadProducts();
  }, []);

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleAddToCart = (product, talla, color) => {
    setCartItems((prevItems) => addToCart(prevItems, product, talla, color));
    setSnackbar({ open: true, message: "Producto agregado al carrito", severity: "success" });
  };

  const handleRemoveFromCart = (id, talla) => {
    setCartItems((prevItems) => removeFromCart(prevItems, id, talla));
    setSnackbar({ open: true, message: "Producto eliminado del carrito", severity: "info" });
  };

  const handleEmptyCart = () => {
    setCartItems(emptyCart());
    setCartOpen(false);
  };

  const getCategoryProducts = (category) => {
    return products.filter((product) => product.categorias.includes(category));
  };

  const deadline = "2024-12-31T23:59:59"

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Router>
      <AnalyticsTracker />
      <Header
        deadline={deadline}
        cartItems={cartItems}
        getTotalItems={getTotalItems}
        onRemoveFromCart={handleRemoveFromCart}
        onUpdateQuantity={updateCartQuantity}
        onEmptyCart={handleEmptyCart}
      />
      <Toolbar />
      <Box>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<ProductRegistration />} />
          <Route
            path="/hombre"
            element={
              <CategoryPage
                products={getCategoryProducts("Hombre")}
                onAddToCart={handleAddToCart}
              />
            }
          />
          <Route
            path="/mujer"
            element={
              <CategoryPage
                products={getCategoryProducts("Mujer")}
                onAddToCart={handleAddToCart}
              />
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
              <ProductPage products={products} onAddToCart={handleAddToCart} />
            }
          />
          <Route path="/order-tracking" element={<OrderTracking />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/faq" element={<FAQ />} />
        </Routes>
      </Box>

      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart
          cartItems={cartItems}
          onRemoveFromCart={handleRemoveFromCart}
          onEmptyCart={handleEmptyCart}
          onUpdateQuantity={updateCartQuantity}
        />
      </Drawer>

      <Drawer anchor="left" open={menuOpen} onClose={() => setMenuOpen(false)}>
        <HamburgerMenu isMenuInitiallyOpen={true} />

      </Drawer>

      <WhatsAppButton />
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
      <Footer />
    </Router>
  );
}

export default App;
