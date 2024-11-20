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
  
// Función para registrar un pedido enviándolo al endpoint de Google Apps Script
export const registrarPedido = async (pedidoData) => {
  try {
    // Realizar la solicitud POST al endpoint
    const response = await fetch('https://script.google.com/macros/s/AKfycbw-MZrNaZp7AM9_LUwiO6bKv-9bnt5rIRHfZku8oeG4gOoZYWn1Jh3S_zpWQdRzFTdLBg/exec', {
      method: 'POST', // Método POST para enviar datos
      redirect: "follow", // Manejar posibles redirecciones automáticamente
      headers: {
        "Content-Type": "text/plain;charset=utf-8", // Configuración para evitar solicitud preflight
      },
      body: JSON.stringify(pedidoData), // Convertir el objeto del pedido a JSON
    });

    // Verificar si la respuesta fue exitosa
    if (!response.ok) {
      throw new Error(`Error en la respuesta: ${response.status} ${response.statusText}`);
    }

    // Leer la respuesta como texto
    const data = await response.text(); // Leer la respuesta como texto

    // Mostrar el mensaje de éxito o error basado en el texto
    if (data === "Pedido registrado con éxito") {
      console.log("Pedido registrado correctamente.");
      return true; // Indicar que el pedido fue registrado exitosamente
    } else {
      throw new Error(data || "Error al registrar el pedido");
    }
  } catch (error) {
    console.error("Error en el registro del pedido:", error);
    throw error; // Re-lanzar el error para manejo adicional
  }
};

  
  
  