import React, { useState, useEffect, useCallback } from "react";
import { AppBar, Toolbar, Box, IconButton, Badge, Typography, Drawer, List, ListItem, ListItemText } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { styled } from "@mui/material/styles";

// Estilizar el Toolbar
const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(1, 2),
}));

// Contenedor para las categorías (solo visible en pantallas grandes)
const CategoriesBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  gap: theme.spacing(4),
  [theme.breakpoints.down("sm")]: {
    display: "none", // Ocultar en pantallas pequeñas
  },
}));

// Estilo para los enlaces de categorías
const CategoryLink = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  fontWeight: "bold",
  color: "white",
  textTransform: "uppercase",
  cursor: "pointer",
  "&:hover": {
    textDecoration: "underline",
  },
}));

// Logo
const Logo = styled("img")(({ theme }) => ({
  height: "50px",
  cursor: "pointer",
  [theme.breakpoints.down("sm")]: {
    height: "40px", // Reducir tamaño en móviles
  },
}));

const Header = ({ deadline, cartItems, onOpenCart, getTotalItems }) => {
  const [showHeader, setShowHeader] = useState(true);
  const [showBanner, setShowBanner] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lastScroll, setLastScroll] = useState(0);
  const [timeLeft, setTimeLeft] = useState({
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  // Función para calcular el tiempo restante
  const calculateTimeLeft = useCallback(() => {
    const now = new Date();
    const timeRemaining = new Date(deadline) - now;

    if (timeRemaining <= 0) {
      setTimeLeft({ hours: "00", minutes: "00", seconds: "00" });
    } else {
      const hours = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24)
        .toString()
        .padStart(2, "0");
      const minutes = Math.floor((timeRemaining / (1000 * 60)) % 60)
        .toString()
        .padStart(2, "0");
      const seconds = Math.floor((timeRemaining / 1000) % 60)
        .toString()
        .padStart(2, "0");

      setTimeLeft({ hours, minutes, seconds });
    }
  }, [deadline]);

  // Controlar el comportamiento del scroll
  const handleScroll = useCallback(() => {
    const currentScroll = window.scrollY;

    if (currentScroll > lastScroll && currentScroll > 70) {
      setShowHeader(false);
    } else {
      setShowHeader(true);
    }

    setShowBanner(currentScroll === 0);

    setLastScroll(currentScroll);
  }, [lastScroll]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  // Abrir y cerrar el menú hamburguesa
  const toggleMenu = (open) => {
    setMenuOpen(open);
  };

  return (
    <Box>
      {showBanner && (
        <Box
          sx={{
            backgroundColor: "black",
            color: "white",
            width: "100%",
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            height: "40px",
            position: "fixed",
            top: 0,
            zIndex: 1100,
            px: 2,
            transition: "transform 2s ease",
            transform: showBanner ? "translateY(0)" : "translateY(-100%)",
          }}
        >
          <Typography
            variant="body2"
            sx={{
              textTransform: "uppercase",
              fontWeight: "bold",
              fontSize: "10px",
            }}
          >
            🔥 Aprovecha nuestros Black Days 🔥
          </Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            {Object.entries(timeLeft).map(([label, value]) => (
              <Box key={label}>
                <Box
                  sx={{
                    backgroundColor: "white",
                    color: "black",
                    textAlign: "center",
                    px: 0.05,
                    py: 0.05,
                    borderRadius: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: "bold", fontSize: "12px" }}
                  >
                    {value}
                  </Typography>
                </Box>
                <Typography
                  variant="caption"
                  sx={{
                    fontSize: "8px",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                  }}
                >
                  {label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      )}

      <AppBar
        sx={{
          backgroundColor: showBanner ? "transparent" : "black",
          boxShadow: "none",
          height: "80px",
          marginTop: showBanner ? "35px" : 0,
          transition: "transform 0.1s ease, margin-top 0.1s ease",
          transform: showHeader ? "translateY(0)" : "translateY(-100%)",
          zIndex: 1000,
          position: "fixed",
        }}
      >
        <StyledToolbar>
          {/* Logo alineado a la izquierda */}
          <Logo src="/logo.png" alt="Logo" />

          {/* Categorías centradas (solo en pantallas grandes) */}
          <CategoriesBox>
            <CategoryLink>Hombre</CategoryLink>
            <CategoryLink>Mujer</CategoryLink>
            <CategoryLink>Accesorios</CategoryLink>
          </CategoriesBox>

          {/* Menú hamburguesa en pantallas pequeñas */}
          <Box sx={{ display: { xs: "block", sm: "none" } }}>
            <IconButton color="inherit" onClick={() => toggleMenu(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer anchor="right" open={menuOpen} onClose={() => toggleMenu(false)}>
              <List>
                <ListItem button>
                  <ListItemText primary="Hombre" />
                </ListItem>
                <ListItem button>
                  <ListItemText primary="Mujer" />
                </ListItem>
                <ListItem button>
                  <ListItemText primary="Accesorios" />
                </ListItem>
              </List>
            </Drawer>
          </Box>

          {/* Botón del carrito alineado a la derecha */}
          <IconButton color="inherit" onClick={onOpenCart}>
            <Badge badgeContent={getTotalItems(cartItems)} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </StyledToolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
