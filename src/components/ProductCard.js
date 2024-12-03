import React, { useState } from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import COLOR_CODES from "../services/colores.json"; // Importamos el JSON con los colores

const ProductCard = ({ product }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  const handleMouseEnter = () => {
    if (product.imagenes?.length > 1) setCurrentImageIndex(1);
  };

  const handleMouseLeave = () => setCurrentImageIndex(0);

  const handleRedirectToProductPage = () => {
    navigate(`/product/${product.id}`); // Asegúrate de que la ruta de tu aplicación esté configurada correctamente.
  };

  return (
    <Card
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        margin: "auto",
        cursor: "pointer",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleRedirectToProductPage} // Redirige a la página del producto al hacer clic en la tarjeta.
    >
      {/* Imagen del producto */}
      <Box position="relative">
        <img
          src={product.imagenes?.[currentImageIndex] || "/no-photo.jpg"}
          alt={`Imagen de ${product.nombre}`}
          style={{
            width: "100%",
            height: "300px",
            objectFit: "cover",
          }}
        />
      </Box>

      {/* Contenido de la tarjeta */}
      <CardContent sx={{ textAlign: "left", padding: "10px" }}>
        {/* Nombre del producto */}
        <Typography
          variant="h5"
          sx={{
            fontSize: { xs: "12px", md: "18px" },
            fontWeight: "bold",
            marginBottom: "5px",
          }}
        >
          {product.nombre}
        </Typography>

        {/* Precios */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { md: "center" },
            marginBottom: "5px",
          }}
        >
          {product.descuento && (
            <Typography
              sx={{
                fontSize: { xs: "12px", md: "14px" },
                textDecoration: "line-through",
                color: "gray",
                marginRight: { md: "10px" },
              }}
            >
              ${(product.precio / (1 - product.descuento / 100)).toFixed(2)}
            </Typography>
          )}
          <Typography
            sx={{
              fontSize: { xs: "14px", md: "16px" },
              fontWeight: "bold",
              color: "black",
            }}
          >
            ${product.precio}
          </Typography>
        </Box>

        {/* Colores disponibles */}
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
      </CardContent>
    </Card>
  );
};

export default ProductCard;
