import React, { useState } from "react";
import { TextField, Button, Box, Typography, Alert } from "@mui/material";
import OrderCard from "../components/OrderCard";
import { fetchPedidosPorCorreo } from "../services/PedidosUtils";

const OrderTracking = () => {
  const [email, setEmail] = useState("");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const fetchOrders = async () => {
    setErrorMessage(""); // Limpia cualquier mensaje previo
    if (!isValidEmail(email)) {
      setErrorMessage("Por favor, ingresa un correo electrónico válido.");
      return;
    }

    setLoading(true);
    try {
      const pedidos = await fetchPedidosPorCorreo(email);
      if (pedidos.length === 0) {
        setErrorMessage("No hay pedidos asociados a este correo.");
      } else {
        setOrders(pedidos);
      }
    } catch (error) {
      console.error("Error al obtener los pedidos:", error.message);
      setErrorMessage("Hubo un error al obtener los pedidos. Por favor, intenta nuevamente.");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ padding: "2rem", marginTop: "64px" }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: "center" }}>
        Seguimiento de Pedido
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
        <TextField
          label="Ingresa tu correo"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ width: "60%", marginRight: "1rem" }}
          error={!!errorMessage}
          helperText={errorMessage && "Por favor ingresa un correo válido."}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={fetchOrders}
          disabled={!email || loading}
        >
          {loading ? "Buscando..." : "Buscar"}
        </Button>
      </Box>

      {errorMessage && (
        <Alert severity="error" sx={{ marginBottom: "1rem", textAlign: "center" }}>
          {errorMessage}
        </Alert>
      )}

      {!loading && orders.length === 0 && !errorMessage && (
        <Typography variant="body1" color="textSecondary" sx={{ textAlign: "center" }}>
          Ingresa tu correo para ver el seguimiento de tus pedidos.
        </Typography>
      )}

      <Box>
        {orders.map((order, index) => (
          <OrderCard
            key={index}
            order={{
              ...order,
              name: order.nombre,
              total: order.total,
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default OrderTracking;
