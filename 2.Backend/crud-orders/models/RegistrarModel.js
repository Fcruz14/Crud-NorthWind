const Response = require("../../shared/ResponseClass")
const sql = require("mssql");
const varConfig = require("../../shared/config");


async function QueryRegistrar(compañia,nombre,fecha_req,direccion,ciudad){

    objResponse = new Response();

    try{
        await sql.connect(varConfig);

        const request = new sql.Request();

        request.input('CompanyName', sql.NVarChar, compañia);
        request.input('FirstName', sql.NVarChar, nombre);
        request.input('RequireDate', sql.NVarChar, fecha_req);
        request.input('ShipAddress', sql.NVarChar, direccion);
        request.input('ShipCity', sql.NVarChar, ciudad);
        const result = await request.execute('InsertOrders');

            objResponse.code = 200;
            objResponse.description = "Excelente";

    }
    catch (error){

 
        objResponse.code = 400;
        objResponse.description = "error inesperado: "+error;
    }
    await sql.close(); 

    //console.log(objResponse);
    return objResponse;
}


module.exports = {
    QueryRegistrar: QueryRegistrar
};