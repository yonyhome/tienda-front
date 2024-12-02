import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Grid,
  CircularProgress,
  IconButton,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";

const ProductRegistration = () => {
  const [productData, setProductData] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    categoria: "",
    tallas: "",
    colores: [],
    descuento: "",
    disponible: "Sí",
    imagenes: [],
  });

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]); // Imágenes subidas con URLs
  const [loading, setLoading] = useState(false);

  // Manejar cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Manejar selección de colores (checkbox)
  const handleColorChange = (e) => {
    const { value, checked } = e.target;
    setProductData((prevData) => {
      let newColors = [...prevData.colores];
      if (checked) {
        newColors.push(value);
      } else {
        newColors = newColors.filter((color) => color !== value);
      }
      return {
        ...prevData,
        colores: newColors,
      };
    });
  };

  // Manejar selección de archivo
  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
  };

  // Eliminar imagen seleccionada
  const handleRemoveImage = (index) => {
    const newFiles = [...selectedFiles];
    newFiles.splice(index, 1);
    setSelectedFiles(newFiles);
  };

  // Subir imágenes al servidor una a una
  const handleImageUpload = async () => {
    if (selectedFiles.length === 0) {
      alert("No hay imágenes seleccionadas para subir.");
      return;
    }

    setLoading(true);
    try {
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        const formData = new FormData();
        formData.append("images", file);

        const response = await fetch(
          "https://lucia.uninorte.edu.co/images/api/images",
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await response.json();
        if (data && data.length > 0) {
          const imageUrl = `https://lucia.uninorte.edu.co/images/uploads/${data[0].filename}`;
          setUploadedImages((prevImages) => [...prevImages, imageUrl]);
          alert(`Imagen "${file.name}" subida correctamente.`);
        } else {
          alert(`Error al subir la imagen "${file.name}".`);
        }
      }
    } catch (error) {
      console.error("Error al subir las imágenes:", error);
      alert("Hubo un error al subir las imágenes. Por favor, inténtalo de nuevo.");
    }
    setLoading(false);
  };

  // Registrar el producto con las imágenes subidas
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (uploadedImages.length === 0) {
      alert("Debes subir al menos una imagen antes de registrar el producto.");
      return;
    }

    const payload = {
      action: "registrarProducto",
      id: Math.floor(Math.random() * 10000), // Generar ID único
      ...productData,
      imagenes: uploadedImages,
    };

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbwwiQUiYE9xEcZs0fTEepN6UXJ2MMhEzDe2Xk-VAnpxX9ljAhFu7t9B6Ye5LW0XOH5LqQ/exec",
        {
          method: "POST",
          redirect: "follow", // Permitir redirecciones
          headers: {
            "Content-Type": "text/plain;charset=utf-8", // Configuración de cabecera para evitar preflight
          },
          body: JSON.stringify(payload),
        }
      );

      const responseText = await response.text();
      console.log("Respuesta en texto:", responseText);

      const parsedResponse = JSON.parse(responseText);

      if (parsedResponse.status === "success") {
        alert("Producto registrado con éxito.");
        setProductData({
          nombre: "",
          descripcion: "",
          precio: "",
          categoria: "",
          tallas: "",
          colores: [],
          descuento: "",
          disponible: "Sí",
          imagenes: [],
        });
        setUploadedImages([]);
        setSelectedFiles([]);
      } else {
        alert(
          `Error al registrar el producto: ${
            parsedResponse.message || "Error desconocido"
          }`
        );
      }
    } catch (error) {
      console.error("Error al registrar el producto:", error);
      alert("Hubo un error al registrar el producto. Por favor, inténtalo de nuevo.");
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Registro de Producto
      </Typography>
      <Grid container spacing={3}>
        {/* Nombre del Producto */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Nombre del Producto"
            variant="outlined"
            name="nombre"
            value={productData.nombre}
            onChange={handleInputChange}
          />
        </Grid>

        {/* Descripción del Producto */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Descripción"
            variant="outlined"
            name="descripcion"
            multiline
            rows={4}
            value={productData.descripcion}
            onChange={handleInputChange}
          />
        </Grid>

        {/* Precio */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Precio"
            variant="outlined"
            name="precio"
            value={productData.precio}
            onChange={handleInputChange}
          />
        </Grid>

        {/* Categoría */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Categoría</InputLabel>
            <Select
              name="categoria"
              value={productData.categoria}
              onChange={handleInputChange}
              label="Categoría"
            >
              <MenuItem value="ropa">Ropa</MenuItem>
              <MenuItem value="calzado">Calzado</MenuItem>
              <MenuItem value="accesorios">Accesorios</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Tallas */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Tallas"
            variant="outlined"
            name="tallas"
            value={productData.tallas}
            onChange={handleInputChange}
          />
        </Grid>

        {/* Colores */}
        <Grid item xs={12}>
          <Typography variant="body1" gutterBottom>
            Colores disponibles
          </Typography>
          <Grid container spacing={2}>
            {["Rojo", "Azul", "Verde", "Negro", "Blanco"].map((color) => (
              <Grid item key={color}>
                <FormControlLabel
                  control={
                    <Checkbox
                      value={color}
                      checked={productData.colores.includes(color)}
                      onChange={handleColorChange}
                    />
                  }
                  label={color}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Descuento */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Descuento (%)"
            variant="outlined"
            name="descuento"
            value={productData.descuento}
            onChange={handleInputChange}
          />
        </Grid>

        {/* Disponibilidad */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Disponibilidad</InputLabel>
            <Select
              name="disponible"
              value={productData.disponible}
              onChange={handleInputChange}
              label="Disponibilidad"
            >
              <MenuItem value="Sí">Sí</MenuItem>
              <MenuItem value="No">No</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Imágenes */}
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Imágenes del Producto
          </Typography>
          <Grid container spacing={2}>
            {selectedFiles.map((file, index) => (
              <Grid item key={index} xs={6} sm={4} md={3}>
                <Box
                  sx={{
                    position: "relative",
                    borderRadius: 2,
                    boxShadow: 2,
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={URL.createObjectURL(file)}
                    alt="Preview"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                  <IconButton
                    sx={{
                      position: "absolute",
                      top: 4,
                      right: 4,
                      background: "white",
                    }}
                    onClick={() => handleRemoveImage(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Grid>
            ))}
          </Grid>
          <Button
            variant="contained"
            component="label"
            sx={{ marginTop: 2 }}
            startIcon={<CloudUploadIcon />}
          >
            Seleccionar Imágenes
            <input
              type="file"
              hidden
              multiple
              accept="image/*"
              onChange={handleFileSelect}
            />
          </Button>
          <Button
            variant="contained"
            color="primary"
            sx={{ marginTop: 2, marginLeft: 2 }}
            onClick={handleImageUpload}
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : <CloudUploadIcon />}
          >
            {loading ? "Subiendo..." : "Subir Imágenes"}
          </Button>
        </Grid>

        {/* Botón de envío */}
        <Grid item xs={12}>
          <Button
            type="button"
            variant="contained"
            color="secondary"
            fullWidth
            onClick={handleSubmit}
          >
            Registrar Producto
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductRegistration;
