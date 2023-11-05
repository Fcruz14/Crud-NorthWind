require('dotenv').config(); // Carga las variables de entorno desde el archivo .env

const config = {
    user: process.env.USER,
    password: process.env.PASSWORD,
    server: process.env.SERVER,
    database: 'Northwind', // nombre de la base de datos
    options: {
        trustedconnection: true, // para la conexión local
        enableArithAbort: true,
        encrypt: false,
        instancename: 'SQLEXPRESS19' // en caso se tenga alguna instancia
    }
}

module.exports = config; // Exportamos la configuración
