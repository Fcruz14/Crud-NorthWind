const Response = require("../../shared/ResponseClass");
const sql = require("mssql");
const varConfig = require("../../shared/config");

async function QueryActualizar(id,nombre,descripcion) {
    const objResponse = new Response();

    try {
        await sql.connect(varConfig);
        const request = new sql.Request();

        request.input('id', sql.Int, id);
        request.input('nombre', sql.NVarChar, nombre);
        request.input('descripcion', sql.NVarChar, descripcion);

        
        const result = await request.execute('UpdateCategory');

        objResponse.code = 200;
        objResponse.description = "Registro Actualizado correctamente";
    } catch (error) {
        const ErrorMessage = "error inesperado: " + error;
        objResponse.code = 400;
        objResponse.description = ErrorMessage;
    }
    
    return objResponse;
}

module.exports = {
    QueryActualizar: QueryActualizar
};
