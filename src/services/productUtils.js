// En utils.js o donde sea que esté la lógica para registrar el producto
export const registrarProducto = async (productoData) => {
    console.log("Iniciando el registro del producto...");
    console.log("Datos del producto antes del registro:");
    console.log(productoData);
  
    
  
    const payload = {
      action: "registrarProducto",
      id: Math.floor(Math.random() * 10000),
      ...productoData, // Incluye todos los datos del producto, incluidos descuento, imágenes, etc.
    };
  
    try {
      // Cambiar a "text/plain" para evitar problemas de CORS
      const response = await fetch(
        'https://script.google.com/macros/s/AKfycbwevgRxyafcH06Cmnm-T1HnUogXbZQikZeWWIkZ1GGMqKVcre_GvrmWA_b5jYzHJf7K/exec', 
        {
          method: 'POST',
          redirect: 'follow', // Sigue las redirecciones automáticamente
          headers: {
            "Content-Type": "text/plain;charset=utf-8", // Evita la solicitud preflight
          },
          body: JSON.stringify(payload),
        }
      );
  
      // Manejo de la respuesta como texto
      const data = await response.text();
  
      // Intentar parsear el texto como JSON (Apps Script devuelve un texto JSON)
      const parsedData = JSON.parse(data);
  
      // Validar el estado devuelto
      console.log(parsedData.status)
      if (parsedData.status === 'success') {
        console.log("Producto registrado con éxito.");
        return true; // Retorna éxito
      } else {
        throw new Error(parsedData.message || "Error desconocido al registrar el producto");
      }
    } catch (error) {
      console.error("Error en el registro del producto:", error);
      alert("Error al registrar el producto.");
      return false; // Si hay un error, retorna false
    }
  };
  
  export const registrarFoto = async (file) => {
    const formData = new FormData();
    formData.append("image", file); // Usar "image" como clave del FormData
  
    try {
      const response = await fetch("https://lucia.uninorte.edu.co/images/api/images", {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        const errorDetails = await response.json(); // Obtener detalles si el servidor retorna un error en JSON
        console.error("Error del servidor:", errorDetails);
        throw new Error(errorDetails.message || "Error al subir la imagen");
      }
  
      const responseData = await response.json(); // Se asume que la respuesta incluye una URL
      return `https://lucia.uninorte.edu.co/images/uploads/${responseData.filename}`;
    } catch (error) {
      console.error("Error en registrarFoto:", error);
      throw error;
    }
  };
// Función para manejar el cambio de valores en el formulario
export const manejarCambio = (e, setProductData) => {
  const { name, value } = e.target;
  setProductData((prevData) => ({
    ...prevData,
    [name]: value,
  }));
};

// Función para manejar la selección y subida de imágenes
export const manejarSeleccionDeImagenes = async (e, setProductData, setLoadingImages) => {
  const files = Array.from(e.target.files);
  setLoadingImages(true);

  for (const file of files) {
    try {
      const url = await registrarFoto(file); // Subir la imagen al servidor
      setProductData((prevData) => ({
        ...prevData,
        imagenes: [...prevData.imagenes, url],
      }));
    } catch (error) {
      alert("No se pudo subir una de las imágenes.");
    }
  }

  setLoadingImages(false);
};

// Función para eliminar una imagen
export const eliminarImagen = (url, setProductData) => {
  setProductData((prevData) => ({
    ...prevData,
    imagenes: prevData.imagenes.filter((imagen) => imagen !== url),
  }));
};

// Función para validar los datos del producto
export const validarDatosProducto = (data) => {
  const errores = [];

  if (!data.nombre || typeof data.nombre !== "string") {
    errores.push("El nombre del producto es obligatorio y debe ser un string.");
  }

  if (!data.descripcion || typeof data.descripcion !== "string") {
    errores.push("La descripción es obligatoria y debe ser un string.");
  }

  if (!data.precio || isNaN(parseFloat(data.precio))) {
    errores.push("El precio es obligatorio y debe ser un número válido.");
  }

  if (!Array.isArray(data.categorias) || data.categorias.length === 0) {
    errores.push("Las categorías deben ser un array no vacío.");
  }

  if (!Array.isArray(data.tallas) || data.tallas.length === 0) {
    errores.push("Las tallas deben ser un array no vacío.");
  }

  if (!Array.isArray(data.colores) || data.colores.length === 0) {
    errores.push("Los colores deben ser un array no vacío.");
  }

  if (!Array.isArray(data.imagenes) || data.imagenes.length === 0) {
    errores.push("Las imágenes deben ser un array no vacío.");
  }

  return errores;
};

// Función para manejar el registro del producto
export const manejarRegistro = async (e, productData, setProductData) => {
  e.preventDefault();

  const productoDataConFormato = {
    ...productData,
    id: Math.floor(Math.random() * 10000),
    categorias: productData.categorias,
    tallas: Array.isArray(productData.tallas) ? productData.tallas : [],
    colores: Array.isArray(productData.colores) ? productData.colores : [],
    imagenes: Array.isArray(productData.imagenes) ? productData.imagenes : [],
  };

  const errores = validarDatosProducto(productoDataConFormato);

  if (errores.length > 0) {
    alert(`Errores en la validación:\n${errores.join("\n")}`);
    return;
  }

  try {
    const success = await registrarProducto(productoDataConFormato);

    if (success) {
      alert("Producto registrado con éxito.");
      limpiarFormulario(setProductData);
    } else {
      alert("Hubo un error al registrar el producto.");
    }
  } catch (error) {
    alert("Hubo un error inesperado al registrar el producto.");
  }
};

// Función para limpiar el formulario
export const limpiarFormulario = (setProductData) => {
  setProductData({
    nombre: "",
    descripcion: "",
    precio: "",
    categorias: [],
    tallas: [],
    colores: [],
    descuento: "",
    disponible: "Sí",
    imagenes: [],
  });
};