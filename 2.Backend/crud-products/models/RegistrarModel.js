const Response = require("../../shared/ResponseClass")
const sql = require("mssql");
const varConfig = require("../../shared/config");


async function QueryRegistrar(compañia,categoria,producto,precio,stock){

    objResponse = new Response();

    try{
        await sql.connect(varConfig);

        const request = new sql.Request();

        request.input('CompanyName', sql.NVarChar, compañia);
        request.input('CategoryName', sql.NVarChar, categoria);
        request.input('ProductName', sql.NVarChar, producto);
        request.input('UnitPrice', sql.Money, precio);
        request.input('UnitsInStock', sql.SmallInt, stock);
        const result = await request.execute('InsertProducts');

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