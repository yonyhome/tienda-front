import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import OrderCard from '../components/OrderCard';

const OrderTracking = () => {
  const [email, setEmail] = useState("");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  // Simula pedidos obtenidos de una API
  const fetchOrders = () => {
    setLoading(true);
    setTimeout(() => {
      setOrders([
        { id: 1, status: 2, date: "2024-11-20", address: "cra. 9n, 98b-93" },
        { id: 2, status: 4, date: "2024-11-22", address: "cra. 9n, 98b-93" },
      ]);
      setLoading(false);
    }, 1500);
  };

  return (
    <Box sx={{ padding: "2rem", marginTop: "64px", }}> {/* Ajusta el marginTop para evitar que se oculte detrás del AppBar */}
      <Typography variant="h4" gutterBottom sx={{ textAlign: "center" }}>
        Seguimiento de Pedido
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", marginBottom: "2rem" }}>
        <TextField
          label="Ingresa tu correo"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ width: "60%", marginRight: "1rem" }}
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

      {orders.length === 0 && !loading && (
        <Typography variant="body1" color="textSecondary" sx={{ textAlign: "center" }}>
          Ingresa tu correo para ver el seguimiento de tus pedidos.
        </Typography>
      )}

      <Box>
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </Box>
    </Box>
  );
};

export default OrderTracking;
