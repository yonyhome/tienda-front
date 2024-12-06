import React from "react";
import { Box, Typography, Grid, Link, IconButton } from "@mui/material";
import { Instagram, Facebook, Twitter, YouTube } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box component="footer" bgcolor="#2c2c2c" color="#fff" py={4} px={2}>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" gutterBottom sx={{ color: "#fff", fontWeight: "bold" }}>
            Days Boutique
          </Typography>
          <Typography variant="body2" sx={{ color: "#ddd" }}>
            Cra. 9N, 98b-93, Barranquilla, Atlántico
          </Typography>
          <Typography variant="body2" sx={{ color: "#ddd" }}>
            Tel: +57 3003188397
          </Typography>
          <Typography variant="body2" sx={{ color: "#ddd" }}>
            Email:{" "}
            <Link href="mailto:dayboutique@gmail.com" sx={{ color: "#ddd", textDecoration: "underline" }}>
              dayboutique@gmail.com
            </Link>
          </Typography>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Typography variant="h6" gutterBottom sx={{ color: "#fff", fontWeight: "bold" }}>
            Enlaces
          </Typography>
          <Link
            href="/order-tracking"
            variant="body2"
            display="block"
            sx={{ color: "#ddd", textDecoration: "none", "&:hover": { color: "#fff" } }}
          >
            Seguir pedido
          </Link>
          <Link
            href="/terms-and-conditions"
            variant="body2"
            display="block"
            sx={{ color: "#ddd", textDecoration: "none", "&:hover": { color: "#fff" } }}
          >
            Términos y condiciones
          </Link>
          <Link
            href="/privacy-policy"
            variant="body2"
            display="block"
            sx={{ color: "#ddd", textDecoration: "none", "&:hover": { color: "#fff" } }}
          >
            Política de privacidad
          </Link>
          <Link
            href="/faq"
            variant="body2"
            display="block"
            sx={{ color: "#ddd", textDecoration: "none", "&:hover": { color: "#fff" } }}
          >
            Preguntas frecuentes
          </Link>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Typography variant="h6" gutterBottom sx={{ color: "#fff", fontWeight: "bold" }}>
            Síguenos
          </Typography>
          <Box display="flex" gap={2}>
            <IconButton
              href="https://www.instagram.com/daysboutique_bq/"
              target="_blank"
              aria-label="Instagram"
              sx={{ color: "#ddd", "&:hover": { color: "#fff" } }}
            >
              <Instagram />
            </IconButton>
            <IconButton href="#" aria-label="Facebook" sx={{ color: "#ddd", "&:hover": { color: "#fff" } }}>
              <Facebook />
            </IconButton>
            <IconButton href="#" aria-label="Twitter" sx={{ color: "#ddd", "&:hover": { color: "#fff" } }}>
              <Twitter />
            </IconButton>
            <IconButton href="#" aria-label="YouTube" sx={{ color: "#ddd", "&:hover": { color: "#fff" } }}>
              <YouTube />
            </IconButton>
          </Box>
        </Grid>
      </Grid>

      <Box mt={4} textAlign="center" sx={{ borderTop: "1px solid #444", paddingTop: "15px" }}>
        <Typography variant="body2" sx={{ color: "#ddd" }}>
          © 2024 Days Boutique. Todos los derechos reservados.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
