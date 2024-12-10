import React from "react";
import { Autocomplete, TextField, Chip } from "@mui/material";

const SizeSelect = ({ tallas, onChange }) => {
  const tallasDisponibles = [
    "XS", "S", "M", "L", "XL", "XXL", "UNICA", 
    "S-M", "M-L", "2-4", "6-8", "10-12", 
    "14-16", "28", "30", "32", "34", "36", "38"
  ];

  return (
    <Autocomplete
      multiple
      options={tallasDisponibles}
      value={tallas}
      onChange={(event, newValue) => onChange({ target: { name: "tallas", value: newValue } })}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip variant="outlined" label={option} {...getTagProps({ index })} key={option} />
        ))
      }
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          label="Tallas"
          placeholder="Selecciona tallas"
        />
      )}
      disableCloseOnSelect
    />
  );
};

export default SizeSelect;
