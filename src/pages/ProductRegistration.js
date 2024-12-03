import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { 
  manejarCambio, 
  manejarSeleccionDeImagenes, 
  eliminarImagen, 
  manejarRegistro
} from "../services/productUtils";
import ProductForm from "../components/ProductForm";
import CategorySelect from "../components/CategorySelect";
import SizeSelect from "../components/SizeSelect";
import ColorAutocomplete from "../components/ColorAutocomplete";
import ImageUploader from "../components/ImageUploader";

const ProductRegistration = () => {
  const [productData, setProductData] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    categorias: [],
    tallas: [],
    colores: [],
    descuento: "",
    disponible: "Sí",
    imagenes: [],
  });

  const [loadingImages, setLoadingImages] = useState(false);

  return (
    <Box sx={{ padding: 10, marginTop: '20px', marginBottom: '30px' }}>
      <Typography variant="h4" gutterBottom>
        Registro de Producto
      </Typography>

      {/* Formulario del producto */}
      <ProductForm productData={productData} onChange={(e) => manejarCambio(e, setProductData)} />

      {/* Selección de categorías */}
      <Box sx={{ my: 2 }}>
        <CategorySelect 
          categorias={productData.categorias} 
          onChange={(e) => manejarCambio({ target: { name: "categorias", value: e.target.value } }, setProductData)}
        />
      </Box>

      {/* Selección de tallas */}
      <Box sx={{ my: 2 }}>
        <SizeSelect 
          tallas={productData.tallas} 
          onChange={(e) => manejarCambio({ target: { name: "tallas", value: e.target.value } }, setProductData)}
        />
      </Box>

      {/* Selección de colores */}
      <Box sx={{ my: 2 }}>
        <ColorAutocomplete 
          colores={productData.colores} 
          onChange={(newValue) => setProductData((prevData) => ({ ...prevData, colores: newValue }))}
        />
      </Box>

      {/* Subida de imágenes */}
      <Box sx={{ my: 2 }}>
        <ImageUploader 
          imagenes={productData.imagenes} 
          onImageDelete={(url) => eliminarImagen(url, setProductData)} 
          onFileChange={(e) => manejarSeleccionDeImagenes(e, setProductData, setLoadingImages)} 
          loadingImages={loadingImages} 
        />
      </Box>

      

      {/* Botón para registrar el producto */}
      <Box sx={{ marginTop: 3 }}>
        <Button variant="contained" color="primary" onClick={(e) => manejarRegistro(e, productData, setProductData)}>
          Registrar Producto
        </Button>
      </Box>
    </Box>
  );
};

export default ProductRegistration;

