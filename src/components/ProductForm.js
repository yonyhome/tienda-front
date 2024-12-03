import React from "react";
import { TextField, Grid } from "@mui/material";

const ProductForm = ({ productData, onChange }) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <TextField
          name="nombre"
          label="Nombre del Producto"
          fullWidth
          value={productData.nombre}
          onChange={onChange}
          required
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          name="precio"
          label="Precio"
          fullWidth
          type="number"
          value={productData.precio}
          onChange={onChange}
          required
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          name="descuento"
          label="Descuento (%)"
          fullWidth
          type="number"
          value={productData.descuento}
          onChange={onChange}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          name="descripcion"
          label="Descripción del Producto"
          fullWidth
          multiline
          rows={4}
          value={productData.descripcion}
          onChange={onChange}
          required
        />
      </Grid>
    </Grid>
  );
};

export default ProductForm;
