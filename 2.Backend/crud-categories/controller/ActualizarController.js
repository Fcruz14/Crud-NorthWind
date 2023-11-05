const ActualizarModel = require("../models/ActualizarModel");

//******************************ACTUALIZAR REGISTRO*****************************/
async function ControllerActualizar(req, res){
    let result ;

    try {
        const { id, nombre, descripcion } = req.body;
        result = await ActualizarModel.QueryActualizar(id, nombre, descripcion);
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
