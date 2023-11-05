const Response = require("../../shared/ResponseClass");
const sql = require("mssql");
const varConfig = require("../../shared/config");

async function QueryLogin(usuario, contraseña) {
  const objResponse = new Response();
  let validacion = false;

  try {
    await sql.connect(varConfig);
    const request = new sql.Request();

    request.input('usuario', sql.NVarChar, usuario);
    request.input('contrasena', sql.NVarChar, contraseña);

    const result = await request.execute('IniciarSesion');
    validacion = result.recordset.validacion;


        objResponse.code = 200;
        objResponse.description = 'exitoso'
    

  } catch (error) {
    validacion = false;
    const ErrorMessage = "error al iniciar sesion: " + error;
    objResponse.code = 400;
    objResponse.description = ErrorMessage;


  }

  return objResponse;
}

module.exports = {
  QueryLogin: QueryLogin
};
