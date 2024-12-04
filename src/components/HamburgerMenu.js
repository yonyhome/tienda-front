import React, { useState } from "react";
import { Drawer, IconButton, List, ListItem, ListItemText, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

const HamburgerMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = (open) => setMenuOpen(open);

  return (
    <Box sx={{ display: { xs: "block", sm: "none" } }}>
      <IconButton color="inherit" onClick={() => toggleMenu(true)}>
        <MenuIcon />
      </IconButton>
      <Drawer anchor="left" open={menuOpen} onClose={() => toggleMenu(false)}>
        <List>
          {["Hombre", "Mujer", "Accesorios"].map((category) => (
            <ListItem button key={category} component={Link} to={`/${category.toLowerCase()}`}>
              <ListItemText primary={category} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};

export default HamburgerMenu;
