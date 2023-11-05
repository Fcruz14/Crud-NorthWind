const ListarModel = require("../models/ListarModel");

//************************OBTENER UN REGISTRO*****************************//
async function ControllerListar(req, res){

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
