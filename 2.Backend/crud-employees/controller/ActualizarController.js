const ActualizarModel = require("../models/ActualizarModel");

//*********************************************ACTUALIZAR PREINGRESOS********************************************/
async function ControllerActualizar(req, res){
    let result = {}; // Cambiar de const a let y inicializar como un objeto vacío

    try {
        const { id, nombre, apellido, ciudad, pais } = req.body;
        result = await ActualizarModel.QueryActualizar(id, nombre, apellido, ciudad, pais);
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
