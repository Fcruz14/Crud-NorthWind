const ActualizarModel = require("../models/ActualizarModel");

//******************************ACTUALIZAR REGISTRO*****************************/
async function ControllerActualizar(req, res){
    let result ;

    try {
        const {idActual,idNuevo,nombre,direccion,ciudad,pais,telefono} = req.body;
        result = await ActualizarModel.QueryActualizar(idActual,idNuevo,nombre,direccion,ciudad,pais,telefono);
    } catch (error) {
        var ErrorMessage = "error inesperado : " + error;
        result = { code: 400, description: ErrorMessage };
    }
    
    res.json(result);
    res.end();
}

module.exports = {
    ControllerActualizar: ControllerActualizar
}
