import React from "react";
import { Grid, Box } from "@mui/material";
import ProductCard from "../components/ProductCard";

const HombresPage = ({ products, onAddToCart }) => {
    return (
      <Box sx={{ padding: "2rem", marginTop: "64px", width: "100%" }}>
        <Grid 
          container 
          spacing={1} // Espaciado entre las tarjetas
          justifyContent="flex-start" // Alineación de los elementos
          sx={{ width: "100%", margin: 0 }} // Ajustes para ocupar todo el ancho
        >
          {products.map((product) => (
            <Grid item xs={6} sm={4} md={4} key={product.id}>
              <ProductCard product={product} onAddToCart={onAddToCart} />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  };
  

export default HombresPage;
