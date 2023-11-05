const express = require("express");
const VarRoute = express.Router();

VarRoute.use(express.json())
VarRoute.use(express.urlencoded({extended:false}))

//Registrar Empleado
const CtrlRegistrar = require("../controller/RegistrarController");

VarRoute.post('/categorie/Registrar',(req,res)=>{
    CtrlRegistrar.ControllerRegistrar(req,res);
}
)

//Obtener Todos Los Empleados

const CtrlGetAll = require("../controller/GetAllController");


VarRoute.get('/categorie/GetAll',(req,res)=>{
    CtrlGetAll.ControllerListarTodo(req,res);
}
)

//Eliminar Empleado

const CtrlEliminar = require("../controller/EliminarController");

VarRoute.post('/categorie/Eliminar',(req,res)=>{
    CtrlEliminar.ControllerEliminar(req,res);
}
)

//Actualizar Empleado

const CtrlActualizar = require("../controller/ActualizarController");


VarRoute.post('/categorie/Actualizar',(req,res)=>{
    CtrlActualizar.ControllerActualizar(req,res);
}
)

//Obtener Un Empleado

const CtrlListar = require("../controller/ListarController");


VarRoute.post('/categorie/Listar',(req,res)=>{
    CtrlListar.ControllerListar(req,res);
}
)


module.exports=VarRoute;