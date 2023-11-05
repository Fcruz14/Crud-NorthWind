const RegistrarModel = require("../models/RegistrarModel");

//**************************REGISTRAR*******************************/
async function ControllerRegistrar(req, res){
    let result = null; // hay ta

    try{
        var {compañia,nombre,fecha_req,direccion,ciudad} = req.body;
        console.log(compañia,nombre,fecha_req,direccion,ciudad)
     result = await RegistrarModel.QueryRegistrar(compañia,nombre,fecha_req,direccion,ciudad);
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