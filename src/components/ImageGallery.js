import React from "react";
import { Grid, Box, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const ImageGallery = ({ imagenes, onDelete }) => {
  return (
    <Grid container spacing={2}>
      {imagenes.map((imagen, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Box
            component="img"
            src={imagen}
            alt={`Imagen ${index + 1}`}
            sx={{
              width: "100%",
              height: "auto",
              borderRadius: 1,
              boxShadow: 2,
            }}
          />
          <IconButton
            color="error"
            onClick={() => onDelete(imagen)}
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              zIndex: 1,
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Grid>
      ))}
    </Grid>
  );
};

export default ImageGallery;
