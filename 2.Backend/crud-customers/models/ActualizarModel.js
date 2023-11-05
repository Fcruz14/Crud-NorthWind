const Response = require("../../shared/ResponseClass");
const sql = require("mssql");
const varConfig = require("../../shared/config");

async function QueryActualizar(IdActual,IdNuevo,nombre,direccion,ciudad,pais,telefono) {
    const objResponse = new Response();

    try {
        await sql.connect(varConfig);
        const request = new sql.Request();

        request.input('idActual', sql.NChar, IdActual);
        request.input('idNuevo', sql.NChar, IdNuevo);
        request.input('nombre', sql.NVarChar, nombre);
        request.input('direccion', sql.NVarChar, direccion);
        request.input('ciudad', sql.NVarChar, ciudad);
        request.input('pais', sql.NVarChar, pais);
        request.input('telefono', sql.NVarChar, telefono);

        
        const result = await request.execute('UpdateCustomer');

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
