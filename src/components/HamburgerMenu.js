import React, { useState, useEffect } from "react";
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Box,
  Divider,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";

const HamburgerMenu = ({ isMenuInitiallyOpen = false }) => {
  const [menuOpen, setMenuOpen] = useState(isMenuInitiallyOpen);

  // Actualiza el estado del menú si el prop cambia.
  useEffect(() => {
    setMenuOpen(isMenuInitiallyOpen);
  }, [isMenuInitiallyOpen]);

  const toggleMenu = (open) => setMenuOpen(open);

  return (
    <Box sx={{ display: { xs: "block", sm: "none" } }}>
      <IconButton color="inherit" onClick={() => toggleMenu(true)}>
        <MenuIcon />
      </IconButton>
      <Drawer
        anchor="left"
        open={menuOpen}
        onClose={() => toggleMenu(false)}
        PaperProps={{
          sx: {
            width: "80%", // Ajusta el ancho del menú
            backgroundColor: "rgba(0, 0, 0, 0.8)", // Fondo translúcido
            backdropFilter: "blur(8px)", // Efecto de desenfoque
            color: "white",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "16px",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Categorías
          </Typography>
          <IconButton
            onClick={() => toggleMenu(false)}
            sx={{ color: "white" }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.2)" }} />
        <List>
          {["Hombre", "Mujer", "Accesorios"].map((category) => (
            <ListItem
              button
              key={category}
              component={Link}
              to={`/${category.toLowerCase()}`}
              sx={{
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)", // Efecto hover
                },
              }}
            >
              <ListItemText
                primary={category}
                primaryTypographyProps={{
                  fontSize: "1.2rem",
                  fontWeight: "medium",
                  textTransform: "capitalize",
                  color: "white",
                }}
              />
            </ListItem>
          ))}
        </List>
        <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.2)" }} />
        <Box
          sx={{
            padding: "16px",
            textAlign: "center",
            color: "rgba(255, 255, 255, 0.7)",
          }}
        >
          <Typography variant="body2">
            © {new Date().getFullYear()} Days Boutique
          </Typography>
        </Box>
      </Drawer>
    </Box>
  );
};

export default HamburgerMenu;

