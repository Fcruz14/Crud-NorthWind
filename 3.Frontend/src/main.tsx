// Importamos Componentes a Usar
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import App from "./App.tsx";
import "./index.css";
import Protected from "./Routers/Protected.tsx";
import { AuthProvider } from "./Auth/AuthProvider.tsx";
// Importando Componentes
// Rutas Principales
import Login from "./Routers/Login.tsx";
// Rutas Protegidas
import Empleados from "./Routers/Empleados.tsx";
import Categorias from "./Routers/Categorias.tsx";
import Ordenes from "./Routers/Ordenes.tsx";
import Clientes from "./Routers/Clientes.tsx";
import Productos from "./Routers/Productos.tsx";
// Rutas Editar
import EditEmp from "./Components/CRUDEmployess/EditarEmpleados.tsx";
import EditCat from "./Components/CRUDCategories/EditCat.tsx";
import EditCust from './Components/CRUDCustomers/EditCust.tsx'
import EditOrders from './Components/CRUDOrders/EditarOrders.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/",
    element: <Protected />,
    children: [
      {
        path: "/empleados",
        element: <Empleados />,
      },
      {
        path: "/categorias",
        element: <Categorias />,
      },
      {
        path: "/ordenes",
        element: <Ordenes />,
      },
      {
        path: "/clientes",
        element: <Clientes />,
      },
      {
        path: "/productos",
        element: <Productos />,
      },
      {
        path: "/editarempleado/:id",
        element: <EditEmp />,
      },
      {
        path: "/editarcategoria/:id",
        element: <EditCat />,
      },
      {
        path: "/editarcategoria/:id",
        element: <EditCat />,
      },
      {
        path: "/editarcustomer/:id",
        element: <EditCust/>,
      },
      {
        path: "/editarordenes/:id",
        element: <EditOrders/>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
