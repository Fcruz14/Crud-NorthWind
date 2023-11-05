const EliminarModel = require("../models/EliminarModel");

//*********************************************ELIMINAR REGISTRO********************************************/
async function ControllerEliminar(req, res){

    let result;
    try{
        var {id} = req.body;
        result = await EliminarModel.QueryEliminar(id);

    }
    catch(error){
        var ErrorMessage = "error inesperado : " + error;
        result = { code: 400, description: ErrorMessage };
    }
    res.json(result);
    res.end();
}

module.exports={
    ControllerEliminar:ControllerEliminar
}