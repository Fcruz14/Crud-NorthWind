const Response = require("../../shared/ResponseClass");
const sql = require("mssql");
const varConfig = require("../../shared/config");

async function QueryActualizar(id,nombre,apellido,ciudad,pais) {
    const objResponse = new Response();

    try {
        await sql.connect(varConfig);
        const request = new sql.Request();

        request.input('id', sql.Int, id);
        request.input('Nombre', sql.NVarChar, nombre);
        request.input('Apellido', sql.NVarChar, apellido);
        request.input('Ciudad', sql.NVarChar, ciudad);
        request.input('Pais', sql.NVarChar, pais);
        
        const result = await request.execute('UpdateEmployees');

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
