const Response = require("../../shared/ResponseClass")
const sql = require("mssql");
const varConfig = require("../../shared/config");


async function QueryTodoListar(){

    objResponse = new Response();

    try{
        await sql.connect(varConfig);

        const request = new sql.Request();

        const result = await request.execute('GetAllCustomers');

 
            objResponse.code = 200;
            objResponse.description = "Excelente";
            objResponse.data = result.recordset
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
    QueryTodoListar: QueryTodoListar
};