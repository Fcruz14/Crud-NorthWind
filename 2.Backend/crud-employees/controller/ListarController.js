const ListarModel = require("../models/ListarModel");

//************************OBTENER DATOS DEL EMPLEADO*****************************//
async function ControllerListar(req, res){
    let result = null; // Cambiar de const a let

    try {
        const id = req.body.id; // Suponiendo que 'id' se pasa como un parámetro en la solicitud

        result = await ListarModel.QueryListar(id);
    } catch (error) {
        var ErrorMessage = "error inesperado : " + error;
        result = { code: 400, description: ErrorMessage };
    }

    res.json(result);
    res.end();
}

module.exports = {
    ControllerListar: ControllerListar
}
