const Response = require("../../shared/ResponseClass")
const sql = require("mssql");
const varConfig = require("../../shared/config");


async function QueryRegistrar(nombre,apellido,ciudad,pais){

    objResponse = new Response();

    try{
        await sql.connect(varConfig);

        const request = new sql.Request();

        request.input('FirstName', sql.NVarChar, nombre);
        request.input('LastName', sql.NVarChar, apellido);
        request.input('City', sql.NVarChar, ciudad);
        request.input('Country', sql.NVarChar, pais);
        const result = await request.execute('InsertEmployees');

 
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