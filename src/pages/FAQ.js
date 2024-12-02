import React from "react";
import {
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const FAQ = () => {
  const faqs = [
    {
      question: "¿Tengo que abrir una cuenta para hacer un pedido?",
      answer:
        "Puedes realizar un pedido como cliente registrado o no registrado. Si deseas registrarte, solo debes introducir tu información personal y tu dirección se completará automáticamente al realizar el pedido.",
    },
    {
      question: "¿Se mantienen privados mis datos personales?",
      answer:
        "Sí, tu información personal es completamente privada y confidencial. No será compartida con terceros. Para más detalles, puedes consultar nuestra sección de Política de Privacidad.",
    },
    {
      question: "He olvidado mi contraseña, ¿qué debo hacer?",
      answer:
        "Si has olvidado tu contraseña, puedes restablecerla fácilmente desde la sección 'Mi Cuenta' en nuestro sitio web.",
    },
    {
      question: "¿Qué métodos de pago acepta Day Boutique?",
      answer:
        "Aceptamos los siguientes métodos de pago: Tarjeta de crédito, Mercado Pago y pagos contra entrega.",
    },
    {
      question: "¿Cuánto tarda el transporte y cuánto cuesta?",
      answer:
        "El transporte dentro de Colombia normalmente tarda hasta 5 días laborables. El coste de transporte varía según el destino y lo puedes consultar en la sección correspondiente de nuestra tienda.",
    },
    {
      question: "¿Cuántos impuestos tengo que pagar?",
      answer:
        "Los impuestos se calculan según el destino del envío. Se incluirán en el precio total al momento de realizar la compra.",
    },
    {
      question: "¿Puedo modificar o cancelar mi pedido una vez confirmado?",
      answer:
        "Puedes modificar o cancelar tu pedido solo antes de que se haya preparado para el envío. Si necesitas hacer algún cambio, por favor contáctanos a nuestro correo electrónico o número de WhatsApp.",
    },
    {
      question: "¿Cómo puedo rastrear mi pedido?",
      answer:
        "Una vez que tu pedido salga de nuestro almacén, recibirás un correo electrónico con el número de seguimiento para poder seguirlo hasta su destino.",
    },
    {
      question: "¿Cómo puedo devolver o cambiar un artículo?",
      answer:
        "Si no estás satisfecho con tu compra, puedes devolver o cambiar un artículo dentro de los 7 días posteriores a la entrega. Solo debes comunicarte con nosotros para obtener un número de autorización de devolución (RMA).",
    },
    {
      question: "¿Se me reembolsará la totalidad de mi pedido?",
      answer:
        "El reembolso se realizará según el método de pago utilizado al realizar el pedido. En el caso de pagos contra entrega, el reembolso será por transferencia bancaria. Los gastos de envío no son reembolsables, a menos que el producto esté defectuoso o incorrecto.",
    },
    {
      question: "¿Puedo obtener un bono en lugar del reembolso?",
      answer:
        "En caso de devolución, podrás elegir entre un reembolso, un cambio de producto o un bono de compra para usar en tu próxima compra.",
    },
    {
      question: "¿Qué significa añadir un producto a la lista de espera?",
      answer:
        "Si un producto está agotado, puedes añadirlo a la lista de espera. Así, te notificaremos por correo electrónico cuando el producto esté nuevamente disponible.",
    },
    {
      question: "¿Cómo puedo suscribirme/cancelar el boletín de Day Boutique?",
      answer:
        "Para suscribirte a nuestro boletín, simplemente ingresa tu correo electrónico en la sección correspondiente en el pie de página de nuestra tienda. Para cancelar la suscripción, haz clic en el enlace de cancelación que aparece al final de cualquier correo recibido.",
    },
    {
      question: "¿Qué talla debo elegir?",
      answer:
        "En cada página de producto, encontrarás una tabla de tallas que te ayudará a elegir la talla correcta. Si tienes dudas adicionales, puedes contactarnos a través de nuestro correo electrónico para asistencia personalizada.",
    },
    {
      question: "¿Puedo devolver un artículo personalizado?",
      answer:
        "No aceptamos devoluciones, cambios ni cancelaciones de productos personalizados. Por favor, asegúrate de que la personalización es correcta antes de realizar la compra.",
    },
  ];

  return (
    <Container sx={{ maxWidth: "md", padding: "20px", marginTop: "40px" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Preguntas Frecuentes
      </Typography>
      <Box>
        {faqs.map((faq, index) => (
          <Accordion key={index}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} id={`panel${index}`}>
              <Typography variant="h6">{faq.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{faq.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Container>
  );
};

export default FAQ;
