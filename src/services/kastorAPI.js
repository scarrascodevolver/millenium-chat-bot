const axios = require('axios');
const { obtenerToken } = require('./kastorAuth'); // Importar la función para obtener token

// ID de cliente (de la API de Kastor)
const idCliente = "0d656c6b324287ee57c0a47933b0f93cb711fa92"; // ← Este ID es fijo para la administradora

// Función para obtener todas las unidades administradas
async function obtenerUnidades() {
    const token = await obtenerToken();
    if (!token) {
        console.error("Error: No se pudo obtener el token.");
        return;
    }

    console.log("Token obtenido para unidades:", token);

    try {
        const url = "http://xyz.kastor.cl/api-k2/apigc-unidades/0d656c6b324287ee57c0a47933b0f93cb711fa92";
        
        const headers = { "Auth": token }; // Asegúrate que sea igual al de Postman

        console.log("Token enviado:", token);
        console.log("Headers enviados:", headers);
        console.log("URL de consulta:", url);
        
        const response = await axios.get(url, { headers });

        console.log("Unidades obtenidas:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error obteniendo unidades:", error.response?.data || error.message);
    }
}


// Función para obtener el detalle de una unidad específica
async function obtenerDetalleDeuda(idUnidad) {
    const token = await obtenerToken(); // Obtener un nuevo token (solo si es necesario)
    if (!token) {
        console.error("Error: No se pudo obtener el token.");
        return;
    }

    console.log("Token obtenido:", token); // Verifica el token en consola

    try {
        const url = `http://xyz.kastor.cl/api-k2/apigc-detalledeudaunidad/${idUnidad}`;
        
        const headers = { "Auth": token };
        console.log("Headers enviados:", headers); // Verifica los headers antes de enviar la solicitud

        const response = await axios.get(url, { headers });

        console.log("Detalle de deuda obtenido:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error obteniendo detalle de deuda:", error.response?.data || error.message);
    }
}


// Exportar funciones para usarlas en otros archivos
module.exports = { obtenerUnidades, obtenerDetalleDeuda };
