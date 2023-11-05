const ListarTodoModel = require("../models/GetAllModel");

//*********************************************OBTENER LOS PREINGRESOS********************************************/
async function ControllerListarTodo(req, res){
    let result = null; // Cambiar de const a let
    try {
        result = await ListarTodoModel.QueryTodoListar();
    } catch (error) {
        var ErrorMessage = "error inesperado : " + error;
        result = { code: 400, description: ErrorMessage };
    }

    res.json(result);
    res.end();
}

module.exports = {
    ControllerListarTodo: ControllerListarTodo
}
