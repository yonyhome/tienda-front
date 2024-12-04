import React from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";

const CategoryLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: "white",
  fontWeight: "bold",
  fontSize: "18px",
  padding: "10px 20px",
  borderRadius: "8px",
  transition: "background-color 0.3s, color 0.3s",
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
}));

const CategoriesNav = () => (
  <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 4 }}>
    {["Hombre", "Mujer", "Accesorios"].map((category) => (
      <CategoryLink key={category} to={`/${category.toLowerCase()}`}>
        {category}
      </CategoryLink>
    ))}
  </Box>
);

export default CategoriesNav;
