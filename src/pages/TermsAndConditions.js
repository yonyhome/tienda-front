import React from "react";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Link,
} from "@mui/material";
const TermsAndConditions = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4, color: "text.primary",  marginTop: '100px', marginBottom: '30px', width: '100%' }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ color: "text.primary", fontWeight: "bold" }}
      >
        Garantías y Devoluciones
      </Typography>

      <Divider sx={{ mb: 4 }} />

      <Typography variant="h5" gutterBottom sx={{ fontWeight: "medium" }}>
        Políticas Aplicadas a Consumidor Final
      </Typography>
      <Typography paragraph>
        En Days Boutique, queremos garantizar que tengas una experiencia de
        compra satisfactoria. A continuación, te detallamos nuestras políticas
        de cambios, garantías y devoluciones.
      </Typography>

      <Typography variant="h6" gutterBottom>
        Cambios
      </Typography>
      <List>
        <ListItem>
          <ListItemText primary="Aplica dentro de los 30 días calendario desde la entrega del producto." />
        </ListItem>
        <ListItem>
          <ListItemText primary="El proceso puede tardar entre 1 y 20 días calendario." />
        </ListItem>
        <ListItem>
          <ListItemText primary="No aplica para productos en descuento, promociones como Black Friday, Cyber Week o Black Days." />
        </ListItem>
        <ListItem>
          <ListItemText primary="Los costos de devolución corren por cuenta del cliente." />
        </ListItem>
      </List>

      <Typography variant="h6" gutterBottom>
        Garantías
      </Typography>
      <Typography paragraph>
        Todos los productos cuentan con una garantía de 30 días calendario
        desde su recepción. Para artículos como maletas de viaje y bolsos,
        ofrecemos una garantía extendida de 60 días.
      </Typography>
      <Typography paragraph>
        Para iniciar un proceso de garantía, comunícate con nosotros a través
        de:
      </Typography>
      <List>
        <ListItem>
          <ListItemText
            primary="Email: "
            secondary={
              <Link href="mailto:dayboutique@gmail.com">
                dayboutique@gmail.com
              </Link>
            }
          />
        </ListItem>
        <ListItem>
          <ListItemText primary="WhatsApp: +57 3003188397" />
        </ListItem>
      </List>

      <Typography variant="h6" gutterBottom>
        Derecho de Retracto
      </Typography>
      <Typography paragraph>
        Tienes derecho a retractarte de tu compra dentro de los 5 días hábiles
        siguientes a la entrega del producto, siempre que se haya realizado a
        través de nuestros canales virtuales. Las ventas presenciales no
        aplican.
      </Typography>
      <Typography paragraph>
        Para ejercer este derecho, comunícate con nosotros a través de nuestro
        correo o WhatsApp. Los costos de transporte correrán por tu cuenta.
      </Typography>

      <Typography variant="h6" gutterBottom>
        Faltantes
      </Typography>
      <Typography paragraph>
        Si al recibir el pedido notas faltantes o irregularidades, notifícalo
        dentro de los 3 días calendario siguientes. Adjunta pruebas
        fotográficas y envíalas a nuestro correo:{" "}
        <Link href="mailto:dayboutique@gmail.com">dayboutique@gmail.com</Link>.
      </Typography>

      <Divider sx={{ my: 4 }} />

    </Container>
  );
};

export default TermsAndConditions;
