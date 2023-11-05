const RegistrarModel = require("../models/RegistrarModel");

//**************************REGISTRAR*******************************/
async function ControllerRegistrar(req, res){
    let result = null; // Cambiar de const a let

    try{
        var {compañia,categoria,producto,precio,stock} = req.body;
        console.log(compañia,categoria,producto,precio,stock)
     result = await RegistrarModel.QueryRegistrar(compañia,categoria,producto,precio,stock);
}

    catch (error) {
        var ErrorMessage = "error inesperado : " + error;
        result = { code: 400, description: ErrorMessage };
    }

    res.json(result);
    res.end();
}

module.exports={
    ControllerRegistrar:ControllerRegistrar
}