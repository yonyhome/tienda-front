import axios from 'axios';

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

export const fetchProducts = async () => {
  try {
    const response = await axios.get(
      'https://script.google.com/macros/s/AKfycbw-MZrNaZp7AM9_LUwiO6bKv-9bnt5rIRHfZku8oeG4gOoZYWn1Jh3S_zpWQdRzFTdLBg/exec'
    );

    if (response.data.status === 'success') {
      console.log(response.data.data);
      const productsWithImages = response.data.data.map((product) => ({
        ...product,
        imagenUrl: product.imagenes[0] || 'ruta_a_imagen_placeholder.jpg',
      }));
      return productsWithImages;
    } else {
      console.error('Error al obtener productos:', response.data);
      return [];
    }
  } catch (error) {
    console.error('Error de red o de API:', error);
    return [];
  }
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
// src/utils.js

export const addToCart = (cartItems, product, talla) => {
  playSound("/sounds/notificacion.mp3");
  const productWithSize = { ...product, talla };
  const existingItem = cartItems.find(
    (item) => item.id === productWithSize.id && item.talla === talla
  );

  if (existingItem) {
    return cartItems.map((item) =>
      item.id === productWithSize.id && item.talla === talla
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  } else {
    return [...cartItems, { ...productWithSize, quantity: 1 }];
  }
};

export const removeFromCart = (cartItems, id, talla) => {
  playSound("/sounds/borrar.mp3")
  return cartItems.filter((item) => !(item.id === id && item.talla === talla));
};

export const updateCartQuantity = (cartItems, id, talla, increment) => {
  return cartItems.map((item) =>
    item.id === id && item.talla === talla
      ? { ...item, quantity: Math.max(item.quantity + increment, 1) }
      : item
  );
};

export const getTotalItems = (cartItems) => {
  return cartItems.reduce((total, item) => total + item.quantity, 0);
};

export const emptyCart = () => {
  return [];
};
// utils.js
export const calculateTotal = (cartItems, discount) => {
  const subtotal = cartItems.reduce((acc, item) => acc + item.precio * item.quantity, 0);
  return subtotal * (1 - discount);
};

// utils.js
export const applyDiscount = (discountCode) => {
  if (discountCode === 'DESCUENTO10') {
    playSound("/sounds/notificacion.mp3");
    return { discount: 0.1, message: '¡Descuento aplicado correctamente!', severity: 'success' };
  }
  return { discount: 0, message: 'Código inválido. Intenta nuevamente.', severity: 'error' };
};

export const playSound = (soundUrl) => {
  try {
    const audio = new Audio(soundUrl);
    audio.play();
  } catch (error) {
    console.error('Error al reproducir el sonido:', error);
  }
};
