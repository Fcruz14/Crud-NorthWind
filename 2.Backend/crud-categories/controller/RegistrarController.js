const RegistrarModel = require("../models/RegistrarModel");

//**************************REGISTRAR*******************************/
async function ControllerRegistrar(req, res){
    let result = null; // Cambiar de const a let

    try{
        var {nombre,descripcion} = req.body;
     result = await RegistrarModel.QueryRegistrar(nombre,descripcion);
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