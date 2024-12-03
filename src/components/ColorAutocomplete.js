import React, { useState, useEffect } from "react";
import { Autocomplete, Chip, TextField } from "@mui/material";
import coloresJson from "../services/colores.json";

const ColorAutocomplete = ({ colores, onChange }) => {
  const [coloresDisponibles, setColoresDisponibles] = useState([]);

  useEffect(() => {
    // Convertir el JSON en una lista de nombres de colores
    setColoresDisponibles(Object.keys(coloresJson));
  }, []);

  return (
    <Autocomplete
      multiple
      freeSolo
      options={coloresDisponibles}
      value={colores}
      onChange={(event, newValue) => onChange(newValue)}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => {
          const colorCodigo = coloresJson[option.toLowerCase()] || "#CCCCCC"; // Asignar un color por defecto si no existe
          return (
            <Chip
              key={index}
              label={option}
              style={{
                backgroundColor: colorCodigo,
                color: colorCodigo === "#FFFFFF" ? "#000000" : "#FFFFFF", // Texto visible para colores claros
              }}
              {...getTagProps({ index })}
            />
          );
        })
      }
      renderInput={(params) => <TextField {...params} label="Colores" />}
    />
  );
};

export default ColorAutocomplete;
