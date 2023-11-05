const Response = require("../../shared/ResponseClass")
const sql = require("mssql");
const varConfig = require("../../shared/config");


async function QueryListar(id){

    objResponse = new Response();

    try{
        await sql.connect(varConfig);

        const request = new sql.Request();

        request.input('id',sql.NChar, id)
        const result = await request.execute('GetOrdersByID');

 
            objResponse.code = 200;
            objResponse.description = "Excelente";
            objResponse.data = result.recordset
    }
    catch (error){

        console.log("error")
        objResponse.code = 400;
        objResponse.description = "error inesperado: "+error;
    }
    await sql.close(); 

    //console.log(objResponse);
    return objResponse;
}


module.exports = {
    QueryListar: QueryListar
};