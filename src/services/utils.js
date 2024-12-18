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
      'https://script.google.com/macros/s/AKfycbyPOMnZEUBOXzhT5ibMTgnLdZDtSmMWQc0gBE2keEhlArMAH26UoS4lAjnDx7ce6OR0Rg/exec'
    );

    if (response.data.status === 'success') {
      const productsWithImages = response.data.data.map((product) => ({
        ...product,
        imagenUrl: product.imagenes[0] || 'ruta_a_imagen_placeholder.jpg', // Toma la primera imagen o un placeholder
        categorias: product.categorias || [], // Asegura que categorías sea un array
        colores: product.colores || [], // Asegura que colores sea un array
        descuento: product.descuento || 0, // Si no hay descuento, usa 0
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
      'https://script.google.com/macros/s/AKfycbwwiQUiYE9xEcZs0fTEepN6UXJ2MMhEzDe2Xk-VAnpxX9ljAhFu7t9B6Ye5LW0XOH5LqQ/exec', 
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

export const addToCart = (cartItems, product, talla, color) => {
  playSound("/sounds/notificacion.mp3");

  const productWithOptions = { ...product, talla, color };

  const existingItem = cartItems.find(
    (item) =>
      item.id === productWithOptions.id &&
      item.talla === talla &&
      item.color === color
  );

  let updatedCart;
  if (existingItem) {
    updatedCart = cartItems.map((item) =>
      item.id === productWithOptions.id &&
      item.talla === talla &&
      item.color === color
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  } else {
    updatedCart = [...cartItems, { ...productWithOptions, quantity: 1 }];
  }

  // Guardar el carrito actualizado en localStorage
  saveCartToLocalStorage(updatedCart);

  return updatedCart;
};

export const removeFromCart = (cartItems, id, talla, color) => {
  playSound("/sounds/borrar.mp3");
  const updatedCart = cartItems.filter(
    (item) => !(item.id === id && item.talla === talla && item.color === color)
  );

  // Guardar el carrito actualizado en localStorage
  saveCartToLocalStorage(updatedCart);

  return updatedCart;
};

export const updateCartQuantity = (cartItems, id, talla, color, increment) => {
  const updatedCart = cartItems.map((item) =>
    item.id === id && item.talla === talla && item.color === color
      ? { ...item, quantity: Math.max(item.quantity + increment, 1) }
      : item
  );

  // Guardar el carrito actualizado en localStorage
  saveCartToLocalStorage(updatedCart);

  return updatedCart;
};






// utils.js (o donde tengas definida la función)
export const getTotalItems = (cartItems) => {
  // Asegúrate de que cartItems no sea undefined o null
  if (!Array.isArray(cartItems)) {
    return 0;  // Devuelve 0 si no es un arreglo válido
  }
  return cartItems.reduce((total, item) => total + (item.quantity || 0), 0);
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

// Guardar el carrito en el localStorage
export const saveCartToLocalStorage = (cartItems) => {
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
};

// Recuperar el carrito desde el localStorage
export const loadCartFromLocalStorage = () => {
  const storedCart = localStorage.getItem('cartItems');
  return storedCart ? JSON.parse(storedCart) : []; // Si no existe, devuelve un arreglo vacío
};






