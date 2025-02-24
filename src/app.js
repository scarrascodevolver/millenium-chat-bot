const { obtenerUnidades, obtenerDetalleDeuda } = require('./services/kastorAPI');

// Ejecutar prueba de obtener unidades
obtenerUnidades().then(unidades => {
    if (unidades && unidades.length > 0) {
        const idUnidad = unidades[0].id_consulta_unidad; // Tomamos la primera unidad como ejemplo
        console.log(`Consultando detalle de la unidad: ${idUnidad}`);
        
        // Ejecutar consulta de detalle con el ID de la unidad
        obtenerDetalleDeuda(idUnidad); // ← Cambié de obtenerDetalleUnidad a obtenerDetalleDeuda
    }
});
