const Response = require("../../shared/ResponseClass")
const sql = require("mssql");
const varConfig = require("../../shared/config");


async function QueryRegistrar(id,nombre,direccion,ciudad,pais,telefono){

    objResponse = new Response();

    try{
        await sql.connect(varConfig);

        const request = new sql.Request();

        request.input('id', sql.NChar, id);
        request.input('nombre', sql.NVarChar, nombre);
        request.input('direccion', sql.NVarChar, direccion);
        request.input('ciudad', sql.NVarChar, ciudad);
        request.input('pais', sql.NVarChar, pais);
        request.input('telefono', sql.NVarChar, telefono);
        const result = await request.execute('InsertCustomer');

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