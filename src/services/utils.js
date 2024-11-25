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
      'https://script.google.com/macros/s/AKfycbxkePK0O0Fd_wVM_5A_pacjKPLAMzZWSzZ9w-IeiXDmfSihpMCHpNiKRma-g20Cau1Ilw/exec'
    );

    if (response.data.status === 'success') {
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
    const response = await fetch(
      'https://script.google.com/macros/s/AKfycbxkePK0O0Fd_wVM_5A_pacjKPLAMzZWSzZ9w-IeiXDmfSihpMCHpNiKRma-g20Cau1Ilw/exec', 
      {
        method: 'POST',
        redirect: 'follow', // Sigue las redirecciones automáticamente
        headers: {
          "Content-Type": "text/plain;charset=utf-8", // Evita la solicitud preflight
        },
        body: JSON.stringify(pedidoData),
      }
    );

    // Manejo de la respuesta como texto
    const data = await response.text();

    // Intentar parsear el texto como JSON (Apps Script devuelve un texto JSON)
    const parsedData = JSON.parse(data);

    // Validar el estado devuelto
    if (parsedData.status === 'success') {
      playSound("/sounds/notificacion.mp3");
      return true; // Retorna éxito
    } else {
      throw new Error(parsedData.message || "Error desconocido al registrar el pedido");
    }
  } catch (error) {
    console.error("Error en el registro del pedido:", error);
    throw error; // Re-lanza el error para manejo adicional
  }
};

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
