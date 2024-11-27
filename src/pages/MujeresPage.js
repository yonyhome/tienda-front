import React from "react";
import { Grid, Container, Box } from "@mui/material";
import ProductCard from "../components/ProductCard";

const MujeresPage = ({ products, onAddToCart }) => {
  return (
    <Container>
      <Box mt={4}>
        <Grid container spacing={2}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <ProductCard product={product} onAddToCart={onAddToCart} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default MujeresPage;
