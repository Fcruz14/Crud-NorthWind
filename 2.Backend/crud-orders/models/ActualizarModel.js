const Response = require("../../shared/ResponseClass");
const sql = require("mssql");
const varConfig = require("../../shared/config");

async function QueryActualizar(id,compañia,nombre,fecha_req,direccion,ciudad) {
    const objResponse = new Response();

    try {
        await sql.connect(varConfig);
        const request = new sql.Request();
        request.input('id', sql.Int, id)
        request.input('CompanyName', sql.NChar, compañia);
        request.input('FirstName', sql.NVarChar, nombre);
        request.input('RequireDate', sql.NVarChar, fecha_req);
        request.input('ShipAddress', sql.NVarChar, direccion);
        request.input('ShipCity', sql.NVarChar, ciudad);

        
        const result = await request.execute('UpdateOrders');

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
