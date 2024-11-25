import React, { useState, useEffect, useCallback } from "react";
import { styled } from "@mui/material/styles";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";

// Estilizar el Toolbar
const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  alignItems: "center",
  "@media all": {
    minHeight: 80, // Altura ajustada para compactar el header
  },
}));

const Header = ({ deadline }) => {
  const [showHeader, setShowHeader] = useState(true);
  const [showBanner, setShowBanner] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);
  const [timeLeft, setTimeLeft] = useState({
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  // Función para calcular el tiempo restante
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

      setTimeLeft({ hours, minutes, seconds });
    }
  }, [deadline]);

  // Controlar el comportamiento del scroll
  const handleScroll = useCallback(() => {
    const currentScroll = window.scrollY;

    if (currentScroll > lastScroll && currentScroll > 70) {
      // Ocultar el header al bajar
      setShowHeader(false);
    } else {
      // Mostrar el header al subir
      setShowHeader(true);
    }

    // Mostrar el banner solo si estamos en el top de la página
    setShowBanner(currentScroll === 0);

    setLastScroll(currentScroll);
  }, [lastScroll]);

  useEffect(() => {
    // Listener del scroll
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    // Intervalo para actualizar el tiempo restante
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  return (
    <Box>
      {/* Banner de Black Days */}
      {showBanner && (
        <Box
          sx={{
            backgroundColor: "black",
            color: "white",
            width: "100%",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            height: "40px", // Altura del banner ajustada
            position: "fixed",
            top: 0,
            zIndex: 1100,
            px: 2,
            transition: "transform 0.3s ease",
            transform: showBanner ? "translateY(0)" : "translateY(-100%)",
          }}
        >
          <Typography
            variant="body2"
            sx={{
              textTransform: "uppercase",
              fontWeight: "bold",
              fontSize: "12px", // Tamaño más pequeño para el texto del banner
            }}
          >
            🔥 Aprovecha nuestro Black Days 🔥
          </Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            {Object.entries(timeLeft).map(([label, value]) => (
              <Box
                key={label}
                sx={{
                  backgroundColor: "white",
                  color: "black",
                  textAlign: "center",
                  px: 0.5, // Reducir el padding de las cajas
                  py: 0.5, // Reducir el padding vertical
                  borderRadius: 2,
                  display: "flex",
                  flexDirection: "column", // Colocar el número arriba y el texto debajo
                  alignItems: "center",
                }}
              >
                <Typography variant="body1" sx={{ fontWeight: "bold", fontSize: "14px" }}>
                  {value}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ fontSize: "8px", fontWeight: "bold", textTransform: "uppercase", marginTop: "2px" }}
                >
                  {label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      )}

      {/* Header principal */}
      <AppBar
        sx={{
          backgroundColor: "black",
          boxShadow: "none",
          height: "80px", // Altura del header
          marginTop: showBanner ? "40px" : 0, // Ajustar espacio debajo del banner
          transition: "transform 0.3s ease, margin-top 0.3s ease",
          transform: showHeader ? "translateY(0)" : "translateY(-100%)",
          zIndex: 1000,
          position: "fixed", // Fijo para mantener el header visible al desplazarse
        }}
      >
        <StyledToolbar>
          <Typography
            variant="h5"
            component="div"
            sx={{
              flexGrow: 1,
              textAlign: "center",
              color: "white",
              fontFamily: "Helvetica, Helvetica Neue, Arial, Lucida Grande, sans-serif",
              fontWeight: "bold",
              textTransform: "uppercase",
              fontSize: "24px", // Tamaño del texto del header
            }}
          >
            HOMEWARD
          </Typography>
        </StyledToolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
