const RegistrarModel = require("../models/RegistrarModel");

//**************************REGISTRAR*******************************/
async function ControllerRegistrar(req, res){
    let result = null; // Cambiar de const a let

    try{
        var {id,nombre,direccion,ciudad,pais,telefono} = req.body;
     result = await RegistrarModel.QueryRegistrar(id,nombre,direccion,ciudad,pais,telefono);
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