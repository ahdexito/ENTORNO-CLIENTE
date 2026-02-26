/**
 * Clase base que representa un contenido genérico de la plataforma.
 * @class
 */
class Contenido {
    /**
     * @param {Object} data - Objeto con los datos iniciales de la API.
     * @param {number} data.id - Identificador único.
     * @param {string} data.titulo - Nombre del contenido.
     * @param {number|string} data.precioBase - Coste antes de impuestos o descuentos.
     */
    constructor({ id, titulo, precioBase }) {
        this.id = id;
        this.titulo = titulo;
        this.precioBase = parseFloat(precioBase); // Aseguramos tipo numérico para cálculos
    }

    /**
     * Calcula el precio tras aplicar reglas de negocio.
     * Este método es polimórfico (se comporta distinto en cada subclase).
     * @returns {string} Precio formateado a dos decimales.
     */
    calcularPrecioFinal() {
        return this.precioBase.toFixed(2);
    }
}

/**
 * Subclase para contenidos educativos. Aplica descuentos por volumen.
 * @extends Contenido
 */
class Curso extends Contenido {
    constructor(data) {
        super(data); // Llama al constructor de Contenido
        this.horas = data.horas; // Propiedad específica de Cursos
    }

    /**
     * Sobrescribe el cálculo: Los cursos tienen un 10% de descuento.
     * @override
     */
    calcularPrecioFinal() {
        const descuento = 0.90;
        return (this.precioBase * descuento).toFixed(2);
    }
}

/**
 * Subclase para contenidos de cine. Maneja recargos por calidad de imagen.
 * @extends Contenido
 */
class Pelicula extends Contenido {
    constructor(data) {
        super(data);
        this.calidad = data.calidad; // Ejemplo: 'HD', '4K'
    }

    /**
     * Sobrescribe el cálculo: Suplemento de 2€ si la calidad es 4K.
     * @override
     */
    calcularPrecioFinal() {
        const suplemento = this.calidad === '4K' ? 2 : 0;
        return (this.precioBase + suplemento).toFixed(2);
    }
}




/**
 * Orquestador principal: Obtiene datos, los transforma en objetos de clase,
 * calcula totales y envía la orden final al servidor PHP.
 * @async
 * @param {number} usuarioId - El ID del cliente que realiza la compra.
 */
async function procesarCompra(usuarioId) {
    const listaUI = document.getElementById('lista-carrito');
    listaUI.innerHTML = "<li>Sincronizando catálogos de diferentes servidores...</li>";

    try {
        /**
         * FASE 1: CONCURRENCIA (Promise.all)
         * Ejecutamos ambas peticiones en paralelo para ahorrar tiempo de red.
         * Si una tarda 2s y otra 3s, el total será 3s (no 5s).
         */
        const [resCursos, resPelis] = await Promise.all([
            fetch('api/get_cursos.php'),
            fetch('api/get_peliculas.php')
        ]);

        // Verificación de integridad de las respuestas HTTP
        if (!resCursos.ok || !resPelis.ok) {
            throw new Error("No se pudo obtener el catálogo completo de contenidos.");
        }

        // Conversión de las respuestas de texto plano a objetos JSON
        const datosCursos = await resCursos.json();
        const datosPelis = await resPelis.json();

        /**
         * FASE 2: INSTANCIACIÓN (MAPPING)
         * Convertimos los arrays de objetos genéricos en arrays de objetos de Clase.
         * Esto nos permite usar métodos como .calcularPrecioFinal() más adelante.
         */
        const catalogo = [
            ...datosCursos.map(c => new Curso(c)),
            ...datosPelis.map(p => new Pelicula(p))
        ];

        /**
         * FASE 3: CONSTRUCCIÓN DEL OBJETO COMPLEJO (DATA TRANSFER OBJECT)
         * Preparamos la estructura exacta que el backend PHP espera recibir.
         */
        const ordenDeCompra = {
            clienteId: usuarioId,
            fecha: new Date().toISOString(),
            // Generamos un nuevo array de objetos simplificados para el envío
            items: catalogo.map(item => ({
                id: item.id,
                titulo: item.titulo,
                // Aplicamos polimorfismo: JS sabe qué método llamar según la clase
                totalUnitario: item.calcularPrecioFinal()
            }))
        };

        // Cálculo del total global usando .reduce() sobre los precios finales
        ordenDeCompra.totalPagar = ordenDeCompra.items
            .reduce((suma, item) => suma + parseFloat(item.totalUnitario), 0)
            .toFixed(2);

        /**
         * FASE 4: ENVÍO (POST)
         * Serializamos el objeto JS a una cadena JSON para el transporte HTTP.
         */
        const respuestaPago = await fetch('api/procesar_pago.php', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json' 
            },
            body: JSON.stringify(ordenDeCompra) // El objeto se vuelve String aquí
        });

        if (!respuestaPago.ok) throw new Error("El servidor de pagos rechazó la transacción.");

        const confirmacion = await respuestaPago.json();
        
        // Actualización de la Interfaz (UI) con los datos del servidor
        listaUI.innerHTML = `
            <li class="success">
                <strong>¡Éxito!</strong> Orden #${confirmacion.transaccion_id} <br>
                Total: ${ordenDeCompra.totalPagar}€ procesados correctamente.
            </li>`;

    } catch (error) {
        /**
         * MANEJO DE ERRORES CENTRALIZADO
         * Captura errores de red, de parseo JSON o errores lanzados manualmente (throw).
         */
        console.error("Error en el flujo de compra:", error.message);
        listaUI.innerHTML = `<li class="error">Error Crítico: ${error.message}</li>`;
    }
}