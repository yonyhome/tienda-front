/**
 * Obtiene el listado de pedidos asociados a un correo y los ordena por fecha y hora descendente.
 * 
 * @param {string} email - Correo electrónico del cliente.
 * @returns {Promise<Object[]>} - Promesa que resuelve a una lista de pedidos ordenada.
 * @throws {Error} - Si ocurre un error en la solicitud.
 */
export const fetchPedidosPorCorreo = async (email) => {
    if (!email) {
      throw new Error('El correo electrónico es requerido.');
    }
  
    const payload = {
      action: 'obtenerPedidos',
      email, // Incluye el correo en el cuerpo
    };
  
    try {
      const response = await fetch(
        'https://script.google.com/macros/s/AKfycbyPOMnZEUBOXzhT5ibMTgnLdZDtSmMWQc0gBE2keEhlArMAH26UoS4lAjnDx7ce6OR0Rg/exec',
        {
          method: 'POST',
          redirect: 'follow',
          headers: {
            "Content-Type": "text/plain;charset=utf-8", // Evita la solicitud preflight
          },
          body: JSON.stringify(payload),
        }
      );
  
      const responseText = await response.text(); // Lee la respuesta como texto
      const parsedData = JSON.parse(responseText); // Parsea el texto como JSON
  
      if (parsedData.status === 'error') {
        throw new Error(parsedData.message || 'Error desconocido al obtener los pedidos.');
      }
  
      // Ordena los pedidos por fecha y hora descendente
      const sortedData = parsedData.data.sort((a, b) => {
        const dateA = new Date(a.fecha);
        const dateB = new Date(b.fecha);
        return dateB - dateA; // Más reciente primero
      });
  
      console.log(sortedData);
      return sortedData;
    } catch (error) {
      console.error("Error al obtener los pedidos:", error);
      throw new Error(
        error.message || 'Error al conectarse al servidor.'
      );
    }
  };
  