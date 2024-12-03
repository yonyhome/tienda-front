import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const SizeSelect = ({ tallas, onChange }) => {
  const tallasDisponibles = ["XS", "S", "M", "L", "XL", "XXL", "UNICA", "S-M", "M-L"];
  
  return (
    <FormControl fullWidth>
      <InputLabel>Tallas</InputLabel>
      <Select
        name="tallas"
        multiple
        value={tallas}
        onChange={onChange}
      >
        {tallasDisponibles.map((talla) => (
          <MenuItem key={talla} value={talla}>
            {talla}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SizeSelect;
