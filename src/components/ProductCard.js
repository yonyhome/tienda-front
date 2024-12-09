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
    navigate(`/product/${product.id}`);
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
      onClick={handleRedirectToProductPage}
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
        {/* Franja negra con las tallas */}
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            color: "white",
            textAlign: "center",
            padding: "10px 0",
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          {product.tallas?.length > 0 ? (
            product.tallas.map((talla) => (
              <Box
                key={talla}
                sx={{
                  backgroundColor: "black",
                  color: "white",
                  padding: "3px 10px",
                  borderRadius: "4px",
                  border: "1px solid white",
                  fontSize: "12px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "#f0f0f0",
                  },
                }}
                onClick={handleRedirectToProductPage}
              >
                {talla}
              </Box>
            ))
          ) : (
            <Typography variant="body2">No hay tallas disponibles</Typography>
          )}
        </Box>
      </Box>

      {/* Contenido de la tarjeta */}
      <CardContent sx={{ textAlign: "left", padding: "10px" }}>
        {/* Nombre del producto */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            marginBottom: "5px",
            fontSize: "16px",
          }}
        >
          {product.nombre}
        </Typography>

        {/* Precios */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "10px",
            marginBottom: "5px",
          }}
        >
          {product.descuento && (
            <Typography
              sx={{
                textDecoration: "line-through",
                color: "gray",
                fontSize: "14px",
              }}
            >
              ${Intl.NumberFormat("es-CO").format(
                Math.round(product.precio / (1 - product.descuento / 100))
              )}
            </Typography>
          )}
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: "16px",
              color: "black",
            }}
          >
            ${Intl.NumberFormat("es-CO").format(Math.round(product.precio))}
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
