const LoginModel = require("../models/loginModel");

//*********************************************ACTUALIZAR PREINGRESOS********************************************/
async function ControllerLogin(req, res){
    let result = {}; // Cambiar de const a let y inicializar como un objeto vacío

    try {
        const {Username,Password } = req.body;
        console.log(Username,Password)
        result = await LoginModel.QueryLogin(Username,Password);
    } catch (error) {
        var ErrorMessage = "error inesperado : " + error;
        result = { code: 400, description: ErrorMessage };
    }
    
    res.json(result);
    res.end();
}

module.exports = {
    ControllerLogin: ControllerLogin
}
