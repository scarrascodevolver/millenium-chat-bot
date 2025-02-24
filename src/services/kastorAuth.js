const axios = require('axios');

const authUrl = "http://xyz.kastor.cl/api-k2/auth";

const credentials = {
    username: "apikastor@millenium.cl",
    password: "6!3!0mill23!c40"
};

// Función para obtener el token
async function obtenerToken() {
    try {
        const response = await axios.put(authUrl, credentials, {
            headers: { "Content-Type": "application/json" }
        });

        const token = response.data.token;
        console.log("Token obtenido:", token); // Verificar si es correcto

        return token;
    } catch (error) {
        console.error("Error obteniendo token:", error.response?.data || error.message);
        return null;
    }
}


// **Exportar la función correctamente**
module.exports = { obtenerToken };
