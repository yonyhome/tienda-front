import React, { useState, useEffect, useCallback } from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";

const Banner = ({ deadline }) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const calculateTimeLeft = useCallback(() => {
    const now = new Date();
    const timeRemaining = new Date(deadline) - now;

    if (timeRemaining <= 0) {
      setTimeLeft({ hours: "00", minutes: "00", seconds: "00" });
    } else {
      const hours = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24)
        .toString()
        .padStart(2, "0");
      const minutes = Math.floor((timeRemaining / (1000 * 60)) % 60)
        .toString()
        .padStart(2, "0");
      const seconds = Math.floor((timeRemaining / 1000) % 60)
        .toString()
        .padStart(2, "0");

      const newTimeLeft = { hours, minutes, seconds };

      // Guardar el tiempo restante en localStorage
      localStorage.setItem("timeLeft", JSON.stringify(newTimeLeft));
      setTimeLeft(newTimeLeft);
    }
  }, [deadline]);

  // Usar el tiempo guardado en localStorage si está disponible
  useEffect(() => {
    const savedTimeLeft = localStorage.getItem("timeLeft");
    if (savedTimeLeft) {
      setTimeLeft(JSON.parse(savedTimeLeft));
    }

    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  return (
    <Box
      sx={{
        backgroundColor: "black",
        color: "white",
        width: "100%",
        display: "flex",
        justifyContent: isMobile ? "center" : "space-evenly", // Espacio entre en pantallas grandes
        alignItems: "center",
        height: "60px",
        position: "fixed",
        top: 0,
        zIndex: 1100,
        textAlign: "center",
        px: 2,
        flexDirection: isMobile ? "column" : "row", // Cambia la dirección en móviles
      }}
    >
      <Typography
        variant="body2"
        sx={{ fontWeight: "bold", fontSize: "12px", marginBottom: isMobile ? "8px" : 0 }}
      >
        🔥 Aprovecha nuestros Black Days 🔥
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: 1,
          justifyContent: "center", // Centramos el contador en ambas pantallas
          width: "100%",
          maxWidth: "400px", // Limitar el ancho máximo del contador
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "black",
            color: "black",
            textAlign: "center",
            px: 0,
            py: 0,
          }}
        >
          {Object.entries(timeLeft).map(([label, value]) => (
            <Box key={label} sx={{ display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "white", borderRadius: 0.5 }}>
              <Box key={label} sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: "bold",
                    fontSize: isMobile ? "12px" : "14px", // Hacemos más pequeño el contador
                  }}
                >
                  {value}
                </Typography>
              </Box>
              
              <Typography
                variant="caption"
                sx={{ fontSize: "10px", fontWeight: "bold", color:"white", backgroundColor:"black" }}
              >
                {label}
              </Typography>
              
            </Box>

            
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Banner;

