/**
 * CHULETA DE VALIDACIONES REGEX PARA EXÁMENES
 * Uso del método .test(): devuelve true si cumple, false si no.
 */

const validarFormulario = {

    // 1. EMAIL ESTÁNDAR
    // Estructura: texto + @ + texto + . + extensión(2 o más)
    email: (valor) => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(valor);
    },

    // 2. CONTRASEÑA SEGURA (Lookaheads)
    // Requisitos: Mínimo 8 caracteres, 1 Mayúscula, 1 Minúscula y 1 Número
    password: (valor) => {
        // (?=.*[A-Z]) -> Busca al menos una mayúscula en cualquier posición
        // (?=.*\d)    -> Busca al menos un dígito
        // [a-zA-Z\d]{8,} -> Solo permite estos caracteres, mínimo 8 veces
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        return regex.test(valor);
    },

    // 3. DNI ESPAÑOL (8 números y 1 letra)
    // El flag 'i' al final hace que sea insensible a mayúsculas/minúsculas
    dni: (valor) => {
        const regex = /^\d{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/i;
        return regex.test(valor);
    },

    // 4. TELÉFONO ESPAÑA (9 dígitos, empieza por 6, 7, 8 o 9)
    telefono: (valor) => {
        const regex = /^[6789]\d{8}$/;
        return regex.test(valor);
    },

    // 5. CÓDIGO POSTAL (5 dígitos exactos)
    // Extra: Valida que los dos primeros sean del 01 al 52 (provincias España)
    codigoPostal: (valor) => {
        const regex = /^(0[1-9]|[1-4][0-9]|5[0-2])\d{3}$/;
        return regex.test(valor);
    },

    // 6. FECHA (Formato DD/MM/AAAA)
    // Nota: Valida el formato, no si el día es lógico (ej: 31 de febrero)
    fecha: (valor) => {
        // (0[1-9]|[12][0-9]|3[01]) -> Días 01-09 o 10-29 o 30-31
        // (0[1-9]|1[0-2])          -> Meses 01-09 o 10-12
        // \d{4}                    -> Año de 4 dígitos
        const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
        return regex.test(valor);
    },

    // 7. SOLO TEXTO / NOMBRE (Evitar números y símbolos)
    // Permite letras con tildes, eñes y espacios
    soloLetras: (valor) => {
        const regex = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/;
        return regex.test(valor);
    },

    // 8. URL (Protocolo obligatorio http o https)
    url: (valor) => {
        const regex = /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/;
        return regex.test(valor);
    }
};

// --- EJEMPLO DE USO EN UN EXAMEN ---
const miEmail = "estudiante@examen.com";

if (validarFormulario.email(miEmail)) {
    console.log("✅ El email es válido");
} else {
    console.error("❌ Formato de email incorrecto");
}

/**
 * TIP PARA EL EXAMEN:
 * Si te piden que el campo NO sea obligatorio, añade un asterisco (*) 
 * en lugar del más (+) o usa cuantificadores opcionales.
 * * Si te piden validar un número entero: /^\d+$/
 * Si te piden un decimal (con punto): /^\d+\.\d{1,2}$/
 */

/**
 * 1. CAMPO OBLIGATORIO (Usando +)
 * Solo es válido si hay al menos 1 letra. 
 * Si se envía vacío, test() devuelve FALSE.
 */
const nombreObligatorio = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+$/;

/**
 * 2. CAMPO NO OBLIGATORIO (Usando *)
 * Es válido si hay letras, pero TAMBIÉN si está vacío.
 * Si se envía vacío, test() devuelve TRUE.
 */
const apellidoOpcional = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ]*$/;

const inputVacio = "";

console.log(nombreObligatorio.test(inputVacio)); // Resultado: false (Error, falta el dato)
console.log(apellidoOpcional.test(inputVacio));  // Resultado: true  (Correcto, es opcional)


/**
 * RECUERDA PARA EL EXAMEN:
 * Un Regex se escribe entre barras inclinadas: /patrón/
 * El método principal es: /patrón/.test("cadena a evaluar") -> devuelve true/false
 */

// --- 1. ANCLAJES (POSICIÓN) ---
const inicio = /^/;    // Indica que la cadena DEBE empezar aquí.
const fin = /$/;       // Indica que la cadena DEBE terminar aquí.
// Ejemplo combinado: /^hola$/  -> Solo acepta la palabra exacta "hola".

// --- 2. CLASES DE CARACTERES (QUÉ ES) ---
const cualquierDigito = /\d/;      // [0-9] Cualquier número.
const noEsDigito = /\D/;           // [^0-9] Cualquier cosa que NO sea un número.
const alfanumerico = /\w/;         // [a-zA-Z0-9_] Letras, números y guion bajo.
const espacioBlanco = /\s/;        // Espacios, tabs, saltos de línea.
const comodinTodo = /./;           // Cualquier carácter (punto, letra, número...).
const puntoLiteral = /\./;         // El punto real (ej: para extensiones .com).

// --- 3. CUANTIFICADORES (CUÁNTOS HAY) ---
const unoOMas = /+/;               // Obligatorio: 1 o infinitos.
// const ceroOMas = /*/;           // Opcional: 0 o infinitos.
const ceroOuno = /?/;              // Opcional: 0 o solo 1.
const exactos = /{3}/;             // Exactamente 3 veces.
const rango = /{2,4}/;             // Mínimo 2 veces, máximo 4.
const minimo = /{5,}/;             // Mínimo 5 veces, sin máximo.

// --- 4. RANGOS PERSONALIZADOS (CON CORCHETES) ---
const soloVocales = /[aeiou]/;     // Cualquier vocal.
const letrasMinus = /[a-z]/;       // Rango de la 'a' a la 'z'.
const letrasMayus = /[A-Z]/;       // Rango de la 'A' a la 'Z'.
const hexColor = /[a-fA-F0-9]/;    // Letras de color hexadecimal y números.

// --- 5. LÓGICA DE GRUPOS ---
const oLogico = /a|b/;             // Coincide con 'a' o con 'b'.
const grupo = /(abc)/;             // Trata "abc" como una sola unidad.

// --- AUTOPSIA DE UN REGEX COMPLEJO (EJEMPLO DE EXAMEN) ---
// Validar un código de usuario: "ID" + 3 números + opcionalmente una letra.
// Ejemplo válido: ID123, ID456A

const regexExamen = /^ID\d{3}[A-Z]?$/;

/*
    DESGLOSE:
    ^       -> Empieza por...
    ID      -> El texto literal "ID"
    \d{3}   -> Seguido de exactamente 3 números
    [A-Z]?  -> Seguido de UNA letra mayúscula (el ? la hace OPCIONAL)
    $       -> Y ahí termina la cadena (no puede haber nada después)
*/

// --- PRUEBAS EN CONSOLA ---
console.log("--- TEST EXAMEN ---");
console.log(regexExamen.test("ID123"));    // true
console.log(regexExamen.test("ID123A"));   // true
console.log(regexExamen.test("ID12"));     // false (faltan números)
console.log(regexExamen.test("ID123AB"));  // false (sobran letras)