import React from "react";
import { Button, CircularProgress, IconButton } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";

const ImageUploader = ({ imagenes, onImageDelete, onFileChange, loadingImages }) => {
  return (
    <div>
      <Button
        variant="contained"
        component="label"
        startIcon={<CloudUploadIcon />}
        sx={{ marginTop: 2 }}
      >
        {loadingImages ? <CircularProgress size={24} /> : "Subir Imágenes"}
        <input
          hidden
          accept="image/*"
          multiple
          type="file"
          onChange={onFileChange}
        />
      </Button>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginTop: 16 }}>
        {imagenes.map((imagen, index) => (
          <div
            key={index}
            style={{
              position: "relative",
              width: "240px",
              height: "300px",
              borderRadius: 8,
              overflow: "hidden",
            }}
          >
            <img
              src={imagen}
              alt={`Imagen ${index + 1}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
            <IconButton
              color="error"
              onClick={() => onImageDelete(imagen)}
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
                zIndex: 1,
                backgroundColor: "rgba(255, 255, 255, 0.8)",
              }}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUploader;
