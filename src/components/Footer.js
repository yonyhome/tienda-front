import React from 'react';
import { Box, Typography, Grid, Link, IconButton } from '@mui/material';
import { Instagram, Facebook, Twitter, YouTube } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box component="footer" bgcolor="#f8f8f8" py={4} px={2}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" gutterBottom>
            Days Boutique
          </Typography>
          <Typography variant="body2">Cra. 9N, 98b-93, Barranquilla, Atlántico</Typography>
          <Typography variant="body2">Tel: +57 3003188397</Typography>
          <Typography variant="body2">Email: dayboutique@gmail.com</Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" gutterBottom>
            Enlaces
          </Typography>
          <Link href="/order-tracking" variant="body2" display="block" underline="hover">
            Seguir pedido
            </Link>
            <Link href="/terms-and-conditions" variant="body2" display="block" underline="hover">
            Términos y condiciones
            </Link>
            <Link href="/privacy-policy" variant="body2" display="block" underline="hover">
            Política de privacidad
            </Link>
            <Link href="/faq" variant="body2" display="block" underline="hover">
            Preguntas frecuentes
            </Link>

        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" gutterBottom>
            Síguenos
          </Typography>
          <Box display="flex" gap={1}>
            <IconButton href="https://www.instagram.com/daysboutique_bq/" target="_blank" aria-label="Instagram">
              <Instagram />
            </IconButton>
            <IconButton href="#" aria-label="Facebook">
              <Facebook />
            </IconButton>
            <IconButton href="#" aria-label="Twitter">
              <Twitter />
            </IconButton>
            <IconButton href="#" aria-label="YouTube">
              <YouTube />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
      <Box mt={3} textAlign="center">
        <Typography variant="body2" color="textSecondary">
          © 2024 Days Boutique. Todos los derechos reservados.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
