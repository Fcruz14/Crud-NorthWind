const Response = require("../../shared/ResponseClass");
const sql = require("mssql");
const varConfig = require("../../shared/config");

async function QueryActualizar(id,compañia,categoria,producto,precio,stock) {
    const objResponse = new Response();

    try {
        await sql.connect(varConfig);
        const request = new sql.Request();

        request.input('id',sql.Int, id)
        request.input('CompanyName', sql.NVarChar, compañia);
        request.input('CategoryName', sql.NVarChar, categoria);
        request.input('ProductName', sql.NVarChar, producto);
        request.input('UnitPrice', sql.Money, precio);
        request.input('UnitsInStock', sql.SmallInt, stock);

        
        const result = await request.execute('UpdateProducts');

        objResponse.code = 200;
        objResponse.description = "Registro Actualizado correctamente";
    } catch (error) {
        console.log(error)
        const ErrorMessage = "error inesperado: " + error;
        objResponse.code = 400;
        objResponse.description = ErrorMessage;
    }
    
    return objResponse;
}

module.exports = {
    QueryActualizar: QueryActualizar
};
