const express = require("express");
const VarRoute = express.Router();

VarRoute.use(express.json())
VarRoute.use(express.urlencoded({extended:false}))

//Registrar Empleado
const Login = require("../controller/LoginController");

VarRoute.post('/login',(req,res)=>{
    Login.ControllerLogin(req,res);
}
)


module.exports=VarRoute;