import React, { useState, useEffect, useCallback } from "react";
import { AppBar, Toolbar, Box, IconButton, Badge, Button, useMediaQuery, Drawer} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Banner from "./Banner"; // Asegúrate de importar el Banner
import HamburgerMenu from "./HamburgerMenu"; // Importa el componente HamburgerMenu
import { Link } from "react-router-dom";
import Cart from "./Cart"; // Importa el componente Cart

const Header = ({ deadline, cartItems, getTotalItems, onRemoveFromCart, onUpdateQuantity, onEmptyCart, setSnackbar }) => {
  const [showHeader, setShowHeader] = useState(true);
  const [showBanner, setShowBanner] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false); // Para abrir el carrito en un Drawer

  // Media query para dispositivos pequeños
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const handleScroll = useCallback(() => {
    const currentScroll = window.scrollY;

    if (currentScroll > lastScroll && currentScroll > 70) {
      setShowHeader(false);
      setShowBanner(false);
    } else {
      setShowHeader(true);
      if (currentScroll === 0) {
        setShowBanner(true);
      }
    }

    setLastScroll(currentScroll);
  }, [lastScroll]);

  const handleCartDrawerToggle = () => {
    setCartDrawerOpen(!cartDrawerOpen);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <Box>
      {showBanner && <Banner deadline={deadline} />} {/* Mostrar el Banner solo si showBanner es true */}

      <AppBar
        sx={{
          backgroundColor: "black",
          boxShadow: "none",
          marginTop: showBanner ? "60px" : 0,
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          transform: showHeader ? "translateY(0)" : "translateY(-100%)",
          transition: "transform 0.3s ease",
        }}
      >
        <Toolbar>
          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
            {/* En pantallas grandes, el icono a la izquierda */}
            {!isMobile && (
              <Box sx={{ marginRight: 2 }}>
                <Link to="/" style={{ display: "flex" }}>
                  <img src="/logo.png" alt="Logo" style={{ height: 40 }} />
                </Link>
              </Box>
            )}

            {/* Menu hamburguesa en pantallas pequeñas */}
            {isMobile && <HamburgerMenu />}

            {/* Logo centrado en pantallas pequeñas */}
            {isMobile && (
              <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
                <Link to="/" style={{ display: "flex" }}>
                  <img src="/logo.png" alt="Logo" style={{ height: 40 }} />
                </Link>
              </Box>
            )}

            {/* Opciones de categorías (en pantallas grandes) */}
            {!isMobile && (
              <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
                <Button color="inherit" component={Link} to="/hombre">Hombre</Button>
                <Button color="inherit" component={Link} to="/mujer">Mujer</Button>
                <Button color="inherit" component={Link} to="/accesorios">Accesorios</Button>
              </Box>
            )}
          </Box>

          {/* Carrito a la derecha */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton color="inherit" onClick={handleCartDrawerToggle}>
              <Badge badgeContent={getTotalItems(cartItems)} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer para el carrito */}
      <Drawer anchor="right" open={cartDrawerOpen} onClose={handleCartDrawerToggle}>
        <Cart
          cartItems={cartItems}
          onRemoveFromCart={onRemoveFromCart}
          onUpdateQuantity={onUpdateQuantity}
          onEmptyCart={onEmptyCart}
          setSnackbar={setSnackbar}
        />
      </Drawer>
    </Box>
  );
};

export default Header;
