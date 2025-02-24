const readline = require('readline');
const { obtenerUnidades, obtenerDetalleDeuda } = require('./kastorAPI');

// Crear la interfaz de entrada y salida
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Función para obtener y mostrar los condominios
async function seleccionarCondominio() {
    console.log("\nBienvenido al sistema de consulta de unidades.");

    // Obtener las unidades desde la API
    const respuestaUnidades = await obtenerUnidades();
    
    if (!respuestaUnidades || !respuestaUnidades.data || respuestaUnidades.data.length === 0) {
        console.log("No se encontraron unidades disponibles.");
        rl.close();
        return;
    }

    const unidades = respuestaUnidades.data;

    // Filtrar condominios únicos
    const condominiosUnicos = [...new Set(unidades.map(u => u.comunidad))];

    // Mostrar condominios disponibles
    console.log("\nCondominios disponibles:");
    condominiosUnicos.forEach((condo, index) => console.log(`${index + 1}. ${condo}`));

    // Preguntar al usuario qué condominio quiere consultar
    rl.question("\nIngrese el número del condominio que desea consultar: ", (respuesta) => {
        const indexSeleccionado = parseInt(respuesta, 10) - 1;

        if (indexSeleccionado < 0 || indexSeleccionado >= condominiosUnicos.length) {
            console.log("Selección inválida. Intente nuevamente.");
            rl.close();
            return;
        }

        const condominioSeleccionado = condominiosUnicos[indexSeleccionado];
        console.log(`\nHas seleccionado: ${condominioSeleccionado}`);

        // Pasamos a seleccionar una unidad dentro del condominio
        seleccionarUnidad(unidades, condominioSeleccionado);
    });
}

// Función para seleccionar una unidad dentro del condominio elegido
function seleccionarUnidad(unidades, condominioSeleccionado) {
    const unidadesFiltradas = unidades.filter(u => u.comunidad === condominioSeleccionado);

    if (unidadesFiltradas.length === 0) {
        console.log("\nNo hay unidades disponibles en este condominio.");
        rl.close();
        return;
    }

    // Mostrar unidades disponibles
    console.log("\nUnidades disponibles:");
    unidadesFiltradas.forEach((unidad, index) => {
        console.log(`${index + 1}. Unidad: ${unidad.unidad} (ID: ${unidad.id_consulta_unidad})`);
    });

    // Preguntar qué unidad desea consultar
    rl.question("\nIngrese el número de la unidad que desea consultar: ", async (respuesta) => {
        const indexUnidad = parseInt(respuesta, 10) - 1;

        if (indexUnidad < 0 || indexUnidad >= unidadesFiltradas.length) {
            console.log("Selección inválida. Intente nuevamente.");
            rl.close();
            return;
        }

        const unidadSeleccionada = unidadesFiltradas[indexUnidad];
        console.log(`\nHas seleccionado la unidad: ${unidadSeleccionada.unidad}`);

        // Consultar la deuda de la unidad
        await consultarDeudaUnidad(unidadSeleccionada.id_consulta_unidad);
    });
}

// Función para consultar la deuda de la unidad seleccionada
async function consultarDeudaUnidad(idUnidad) {
    const respuestaDeuda = await obtenerDetalleDeuda(idUnidad);

    if (!respuestaDeuda || !respuestaDeuda.data) {
        console.log("\nNo se pudo obtener la información de la deuda.");
        rl.close();
        return;
    }

    const deuda = respuestaDeuda.data;
    
    console.log("\nDetalles de la deuda:");
    console.log(`Administrador: ${deuda.datos_generales.administrador}`);
    console.log(`Periodo: ${deuda.datos_generales.periodo_boleta}`);
    console.log(`Fecha de vencimiento: ${deuda.datos_generales.fecha_vencimiento}`);
    console.log(`Total deuda: ${deuda.deuda_total}`);
    
    if (deuda.datos_generales.ultimo_pago.length > 0) {
        console.log("\nÚltimo pago realizado:");
        console.log(`Fecha: ${deuda.datos_generales.ultimo_pago[0].fecha_pago}`);
        console.log(`Monto: ${deuda.datos_generales.ultimo_pago[0].monto_pago}`);
    } else {
        console.log("\nNo se han registrado pagos recientes.");
    }

    rl.close();
}

// Ejecutar el programa
seleccionarCondominio();
