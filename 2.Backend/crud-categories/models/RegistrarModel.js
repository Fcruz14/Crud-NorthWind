const Response = require("../../shared/ResponseClass")
const sql = require("mssql");
const varConfig = require("../../shared/config");


async function QueryRegistrar(nombre,descripcion){

    objResponse = new Response();

    try{
        await sql.connect(varConfig);

        const request = new sql.Request();

        request.input('nombre', sql.NVarChar, nombre);
        request.input('descripcion', sql.NVarChar, descripcion);
        const result = await request.execute('InsertCategory');

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