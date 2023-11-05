const ActualizarModel = require("../models/ActualizarModel");

//******************************ACTUALIZAR REGISTRO*****************************/
async function ControllerActualizar(req, res){
    let result ;

    try {
        const {id,compañia,nombre,fechaReq,direccion,ciudad} = req.body;
        result = await ActualizarModel.QueryActualizar(id,compañia,nombre,fechaReq,direccion,ciudad);
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
