import React from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";

const FullScreenBanner = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm")); // Detectar pantallas pequeñas

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh", // Ocupa todo el alto de la pantalla
        backgroundImage: `url(${
          isSmallScreen
            ? "/banner2.gif" // Imagen para pantallas pequeñas
            : "/BLACK_FRIDAY_BANNER.png" // Imagen para pantallas grandes
        })`,
        backgroundSize: "cover", // Asegura que la imagen cubra todo el espacio
        backgroundPosition: "center", // Centra la imagen en el contenedor
        backgroundRepeat: "no-repeat", // Evita que la imagen se repita
      }}
    />
  );
};

export default FullScreenBanner;
