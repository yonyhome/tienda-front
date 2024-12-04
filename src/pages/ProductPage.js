import React, { useState, useCallback, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, Button, Grid, Divider, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ImageCarousel from "../components/ImageCarousel";
import SizeSelector from "../components/SizeSelector";
import ColorSelector from "../components/ColorSelector";
import COLOR_CODES from "../services/colores.json";

const ProductPage = ({ products, onAddToCart }) => {
  const { id } = useParams();
  const product = products.find((p) => p.id.toString() === id);
  const [selectedSize, setSelectedSize] = useState(product?.tallas?.[0] || null);
  const [selectedColor, setSelectedColor] = useState(product?.colores?.[0] || null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);
  const navigate = useNavigate();

  const handlePrevious = useCallback(() => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? product.imagenes.length - 1 : prevIndex - 1
    );
  }, [product.imagenes.length]);

  const handleNext = useCallback(() => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === product.imagenes.length - 1 ? 0 : prevIndex + 1
    );
  }, [product.imagenes.length]);

  const handleAddToCart = () => {
    if (selectedSize) {
      const productWithOptions = { ...product, talla: selectedSize, color: selectedColor };
      onAddToCart(productWithOptions, selectedSize, selectedColor);
    } else {
      alert("Por favor, selecciona una talla antes de añadir al carrito");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 60); // Mueve el scroll a la parte superior de la página
  }, [id]);

  return (
    <Box
      sx={{
        padding: "1rem",
        backgroundColor: "#f9f9f9",
        marginTop: "70px",
        marginBottom: "30px",
        width: "100%",
        flexDirection: "column",
        gap: "1.5rem",
      }}
    >
      {/* Barra superior con botón de regresar */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <IconButton onClick={() => navigate(-1)} sx={{ marginRight: 1 }}>
          <ArrowBackIcon />
        </IconButton>
      </Box>

      <Grid container spacing={4}>
        {/* Carrusel de imágenes */}
        <Grid item xs={12} md={6} sx={{ display: "flex", justifyContent: "center" }}>
          <ImageCarousel
            images={product.imagenes || []} // Asegúrate de que siempre sea un array
            currentImageIndex={currentImageIndex}
            handlePrevious={handlePrevious}
            handleNext={handleNext}
            setCurrentImageIndex={setCurrentImageIndex}
          />
        </Grid>

        {/* Información del producto */}
        <Grid item xs={12} md={6} sx={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <Typography variant="h5" fontWeight="bold">
            {product.nombre}
          </Typography>
          {/* Precio */}
          <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", mb: 1 }}>
            {product.descuento && (
              <Typography
                sx={{
                  textDecoration: "line-through",
                  color: "gray",
                  fontSize: "16px",
                  marginRight: "10px",
                }}
              >
                ${(product.precio / (1 - product.descuento / 100)).toFixed(2)}
              </Typography>
            )}
            <Typography sx={{ fontWeight: "bold", fontSize: "18px", color: "black" }}>
              ${product.precio}
            </Typography>
          </Box>

          <Divider />

          {/* Selector de tallas */}
          <Box>
            <Typography variant="h6" fontWeight="bold">
              Size
            </Typography>
            <SizeSelector
              sizes={product.tallas}
              selectedSize={selectedSize}
              setSelectedSize={setSelectedSize}
            />
          </Box>

          {/* Selector de colores (solo si existen colores) */}
          {product.colores?.length > 0 && (
            <Box>
              <Typography variant="h6" fontWeight="bold">
                Color
              </Typography>
              <Box display="flex" alignItems="center" mt={1}>
                {product.colores?.map((color) => (
                  <Box
                    key={color}
                    sx={{
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                      backgroundColor: COLOR_CODES[color] || "gray",
                      marginRight: "5px",
                    }}
                  />
                ))}
              </Box>
              <ColorSelector
                colors={product.colores}
                selectedColor={selectedColor}
                setSelectedColor={setSelectedColor}
              />
            </Box>
          )}

          {/* Botón de añadir al carrito */}
          <Button
            onClick={handleAddToCart}
            variant="contained"
            sx={{
              backgroundColor: "#000",
              color: "#FFF",
              "&:hover": { backgroundColor: "#333" },
              padding: "0.75rem 2rem",
              fontSize: "1rem",
            }}
            disabled={!selectedSize}
          >
            Añadir al Carrito
          </Button>
          <Divider />
          {/* Descripción */}
          <Box>
            <Typography variant="body1" sx={{ mt: 1 }}>
              {descriptionExpanded
                ? product.descripcion
                : `${product.descripcion?.slice(0, 100)}...`}
            </Typography>
            {product.descripcion?.length > 100 && (
              <Button onClick={() => setDescriptionExpanded((prev) => !prev)} sx={{ mt: 1 }}>
                {descriptionExpanded ? "Leer menos" : "Leer más"}
              </Button>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductPage;
