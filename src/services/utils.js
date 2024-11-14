// utils.js

// Función para calcular el total de un pedido a partir de los productos
export const calcularTotal = (productos) => {
    return productos.reduce((total, producto) => {
      return total + (producto.precio * producto.cantidad);
    }, 0);
  };
  
  // Función para crear el objeto del pedido
  export const crearPedidoData = (nombre, telefono, direccion, productos) => {
    const total = calcularTotal(productos);  // Calcular el total del pedido
    return {
      nombre,
      telefono,
      direccion,
      productos,
      total,
    };
  };
  
  // Función para enviar el pedido a Google Sheets mediante un POST request
  export const registrarPedido = async (pedidoData) => {
    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbwXIrpmadEGCiSQwVH8sO35OqQzFpotOohqZwdSDiScAIqITWVLjoxyl5cVZhg_ddjAuA/exec', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pedidoData),
      });
  
      const data = await response.json();
      if (data.result === 'success') {
        console.log('Pedido registrado correctamente:', data);
      } else {
        throw new Error('Error al registrar el pedido');
      }
    } catch (error) {
      console.error('Error en el registro del pedido:', error);
    }
  };
  