import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const CategorySelect = ({ categorias, onChange }) => {
  const categoriasPrincipales = ["Hombre", "Mujer", "Accesorios", "Camisetas", "Pantalones","Algodón", "Camisas", "Niño", "Pijamas", "Jeans"];
  
  return (
    <FormControl fullWidth>
      <InputLabel>Categoría</InputLabel>
      <Select
        name="categorias"
        multiple
        value={categorias}
        onChange={onChange}
      >
        {categoriasPrincipales.map((cat) => (
          <MenuItem key={cat} value={cat}>
            {cat}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CategorySelect;
