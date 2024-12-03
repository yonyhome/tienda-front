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
  
  