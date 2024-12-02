import React from "react";
import { Container, Typography, Box } from "@mui/material";

const PrivacyPolicy = () => {
  return (
    <Container maxWidth="lg" sx={{marginTop: '100px', marginBottom: '30px', width: '100%' }}>
      <Box sx={{ backgroundColor: "#fff", padding: "20px", borderRadius: "8px", boxShadow: 3 }}>
        <Typography variant="h3" align="center" gutterBottom sx={{ color: "#000" }}>
          Política de Privacidad
        </Typography>

        <Typography variant="h5" sx={{ color: "#000", marginBottom: "20px" }}>
          En *Day Boutique*, respetamos la privacidad de nuestros usuarios y clientes. Esta Política de Privacidad describe cómo
          recolectamos, usamos, protegemos y compartimos su información personal.
        </Typography>

        <Typography variant="h6" sx={{ color: "#000", marginBottom: "15px" }}>
          1. Información que recolectamos
        </Typography>
        <Typography variant="body1" sx={{ color: "#333", marginBottom: "20px" }}>
          Recopilamos la información personal que usted nos proporciona al realizar compras en nuestro sitio web, como nombre,
          dirección, correo electrónico y número de teléfono. También podemos recopilar datos de pago y envío cuando realiza un pedido.
        </Typography>

        <Typography variant="h6" sx={{ color: "#000", marginBottom: "15px" }}>
          2. Cómo usamos su información
        </Typography>
        <Typography variant="body1" sx={{ color: "#333", marginBottom: "20px" }}>
          Su información se utiliza para procesar sus pedidos, mejorar nuestra atención al cliente, enviarle actualizaciones sobre
          su pedido y brindarle una experiencia personalizada en nuestra tienda en línea. También usamos su información para
          comunicaciones promocionales si ha consentido recibirlas.
        </Typography>

        <Typography variant="h6" sx={{ color: "#000", marginBottom: "15px" }}>
          3. Protección de la información
        </Typography>
        <Typography variant="body1" sx={{ color: "#333", marginBottom: "20px" }}>
          Implementamos medidas de seguridad técnicas y organizacionales para proteger su información personal contra el acceso
          no autorizado, alteración o divulgación. Sin embargo, no podemos garantizar una seguridad absoluta en la transmisión de
          datos a través de Internet.
        </Typography>

        <Typography variant="h6" sx={{ color: "#000", marginBottom: "15px" }}>
          4. Compartir su información
        </Typography>
        <Typography variant="body1" sx={{ color: "#333", marginBottom: "20px" }}>
          No compartimos su información personal con terceros, excepto cuando sea necesario para procesar su pedido (por ejemplo,
          con empresas de envío). También podemos compartir su información si lo exige la ley o para proteger nuestros derechos
          legales.
        </Typography>

        <Typography variant="h6" sx={{ color: "#000", marginBottom: "15px" }}>
          5. Sus derechos
        </Typography>
        <Typography variant="body1" sx={{ color: "#333", marginBottom: "20px" }}>
          Usted tiene derecho a acceder, rectificar o eliminar su información personal, así como a oponerse al tratamiento de sus
          datos. Si desea ejercer alguno de estos derechos, puede hacerlo enviándonos un correo electrónico a{" "}
          <a href="mailto:dayboutique@gmail.com" style={{ color: "#1976d2" }}>
            dayboutique@gmail.com
          </a>.
        </Typography>

        <Typography variant="h6" sx={{ color: "#000", marginBottom: "15px" }}>
          6. Cambios en nuestra Política de Privacidad
        </Typography>
        <Typography variant="body1" sx={{ color: "#333", marginBottom: "20px" }}>
          Nos reservamos el derecho de actualizar esta Política de Privacidad en cualquier momento. Cualquier cambio será
          publicado en esta página con la fecha de actualización correspondiente. Le recomendamos revisar esta página periódicamente.
        </Typography>

        <Typography variant="body2" sx={{ color: "#333", textAlign: "center", marginTop: "30px" }}>
          Fecha de última actualización: Diciembre 2024
        </Typography>
      </Box>
    </Container>
  );
};

export default PrivacyPolicy;
