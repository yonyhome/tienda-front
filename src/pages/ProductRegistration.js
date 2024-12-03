import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Autocomplete,
  Grid,
  Chip,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import { registrarProducto } from "../services/productUtils"; // Importamos la función desde utils
import { registrarFoto } from "../services/utils"; // Función para registrar fotos en la API

const ProductRegistration = () => {
  const [productData, setProductData] = useState({
    nombre: "",
    descripcion: "",  // Se añadió el campo descripción
    precio: "",
    categorias: [], 
    tallas: [],
    colores: [],
    descuento: "",
    disponible: "Sí",
    imagenes: [],
  });
  const [loadingImages, setLoadingImages] = useState(false);

  const categoriasPrincipales = ["Hombre", "Mujer", "Accesorios"];
  const coloresDisponibles = [
    "Rojo",
    "Azul",
    "Verde",
    "Amarillo",
    "Rosado",
    "Lila",
    "Naranja",
    "Negro",
    "Blanco",
  ];
  const tallasDisponibles = ["S", "M", "L", "XL", "XXL"];

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const manejarSeleccionDeImagenes = async (e) => {
    const files = Array.from(e.target.files);
    setLoadingImages(true);

    for (const file of files) {
      try {
        console.log("Subiendo imagen:", file.name);
        const url = await registrarFoto(file); // Registramos la foto en el servidor
        console.log("Imagen subida correctamente. URL:", url);

        setProductData((prevData) => ({
          ...prevData,
          imagenes: [...prevData.imagenes, url],
        }));
      } catch (error) {
        console.error("Error al subir la imagen:", error);
        alert("No se pudo subir una de las imágenes.");
      }
    }

    setLoadingImages(false);
  };

  const validarDatosProducto = (data) => {
    const errores = [];
  
    if (!data.nombre || typeof data.nombre !== "string") {
      errores.push("El nombre del producto es obligatorio y debe ser un string.");
    }
  
    if (!data.descripcion || typeof data.descripcion !== "string") {
      errores.push("La descripción es obligatoria y debe ser un string.");
    }
  
    if (!data.precio || isNaN(parseFloat(data.precio))) {
      errores.push("El precio es obligatorio y debe ser un número válido.");
    }
  
    if (!Array.isArray(data.categorias) || data.categorias.length === 0) {
      errores.push("Las categorías deben ser un array no vacío.");
    }
  
    if (!Array.isArray(data.tallas) || data.tallas.length === 0) {
      errores.push("Las tallas deben ser un array no vacío.");
    }
  
    if (!Array.isArray(data.colores) || data.colores.length === 0) {
      errores.push("Los colores deben ser un array no vacío.");
    }
  
    if (!Array.isArray(data.imagenes) || data.imagenes.length === 0) {
      errores.push("Las imágenes deben ser un array no vacío.");
    }
  
    return errores;
  };
  
  const eliminarImagen = (url) => {
    console.log("Eliminando imagen:", url);
    setProductData((prevData) => ({
      ...prevData,
      imagenes: prevData.imagenes.filter((imagen) => imagen !== url),
    }));
  };

  const manejarRegistro = async (e) => {
    e.preventDefault();
  
    try {
      // Verificar que las categorías no estén vacías
      if (!Array.isArray(productData.categorias) || productData.categorias.length === 0) {
        alert("Las categorías no pueden estar vacías.");
        return;
      }
  
      const productoDataConFormato = {
        ...productData,
        id: Math.floor(Math.random() * 10000), // Generar un ID único
        categorias: productData.categorias, // No es necesario propagar si ya es un array
        tallas: Array.isArray(productData.tallas) ? productData.tallas : [],
        colores: Array.isArray(productData.colores) ? productData.colores : [],
        imagenes: Array.isArray(productData.imagenes) ? productData.imagenes : [],
      };
  
      const errores = validarDatosProducto(productoDataConFormato);
  
      if (errores.length > 0) {
        console.error("Error en la validación de los datos:", productoDataConFormato);
        alert(`Errores en la validación:\n${errores.join("\n")}`);
        return;
      }
  
      console.log("Iniciando el registro del producto...");
      console.log("Datos del producto antes del registro:", productoDataConFormato);
  
      const success = await registrarProducto(productoDataConFormato);
  
      if (success) {
        alert("Producto registrado con éxito.");
        limpiarFormulario();
      } else {
        alert("Hubo un error al registrar el producto.");
        console.log("El registro del producto falló.");
      }
    } catch (error) {
      console.error("Error durante el registro del producto:", error);
      alert("Hubo un error inesperado al registrar el producto.");
    }
  };
  
  const limpiarFormulario = () => {
    setProductData({
      nombre: "",
      descripcion: "", // Resetear el campo de descripción
      precio: "",
      categorias: [],
      tallas: [],
      colores: [],
      descuento: "",
      disponible: "Sí",
      imagenes: [],
    });
  };

  return (
    <Box sx={{ padding: 4, marginTop: '100px', marginBottom: '30px' }}>
      <Typography variant="h4" gutterBottom>
        Registro de Producto
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            name="nombre"
            label="Nombre del Producto"
            fullWidth
            value={productData.nombre}
            onChange={manejarCambio}
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
            onChange={manejarCambio}
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
            onChange={manejarCambio}
          />
        </Grid>
        
        <Grid item xs={12} md={6}>
          <TextField
            name="descripcion" // Campo de descripción agregado
            label="Descripción del Producto"
            fullWidth
            multiline
            rows={4}
            value={productData.descripcion}
            onChange={manejarCambio}
            required
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Categoría</InputLabel>
            <Select
              name="categorias" 
              multiple
              value={productData.categorias}
              onChange={(e) =>
                manejarCambio({
                  target: { name: "categorias", value: e.target.value },
                })
              }
            >
              {categoriasPrincipales.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Tallas</InputLabel>
            <Select
              name="tallas"
              multiple
              value={productData.tallas}
              onChange={(e) =>
                manejarCambio({
                  target: { name: "tallas", value: e.target.value },
                })
              }
            >
              {tallasDisponibles.map((talla) => (
                <MenuItem key={talla} value={talla}>
                  {talla}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <Autocomplete
            multiple
            freeSolo
            options={coloresDisponibles}
            value={productData.colores}
            onChange={(event, newValue) =>
              setProductData((prevData) => ({ ...prevData, colores: newValue }))
            }
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip label={option} {...getTagProps({ index })} />
              ))
            }
            renderInput={(params) => <TextField {...params} label="Colores" />}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Imágenes del Producto
          </Typography>
          <Grid container spacing={2}>
            {productData.imagenes.map((imagen, index) => (
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
                  onClick={() => eliminarImagen(imagen)}
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
          <Button
            variant="contained"
            component="label"
            sx={{ marginTop: 2 }}
            startIcon={<CloudUploadIcon />}
          >
            {loadingImages ? <CircularProgress size={24} /> : "Subir Imágenes"}
            <input
              hidden
              accept="image/*"
              multiple
              type="file"
              onChange={manejarSeleccionDeImagenes}
            />
          </Button>
        </Grid>
      </Grid>

      <Box sx={{ marginTop: 3 }}>
        <Button variant="contained" color="primary" onClick={manejarRegistro}>
          Registrar Producto
        </Button>
      </Box>
    </Box>
  );
};

export default ProductRegistration;
