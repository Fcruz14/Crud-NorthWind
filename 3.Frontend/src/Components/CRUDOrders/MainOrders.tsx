import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { APIOrder } from "../../Logic/APIS/4.APIOrders";
import Sidebar from "../Sidebar";

function MainOrders() {
  const [compañia, setCompañia] = useState("");
  const [nombre, setNombre] = useState("");
  const [fechaReq, setFechaReq] = useState("");
  const [direccion, setDireccion] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [statusCode, setStatusCode] = useState<number | null>(null);
  const [data, setData] = useState<any[]>([]);

  //1. Funcion para realizar registros
  const HandleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch(APIOrder + "/Registrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ compañia, nombre, fechaReq, direccion, ciudad }),
    })
      .then((response) => {
        setStatusCode(response.status);
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (data.code === 200) {
          
          cargarDatosTabla();
        }
      })
      .catch((error) => {
        console.error("Error al enviar la solicitud:", error);
      });
      setCompañia("")
      setNombre("")
      setFechaReq("")
      setDireccion("")
      setCiudad("")
  };

  // 3. Funcion para llamar datos de la tabla:
  const cargarDatosTabla = async () => {
    try {
      const response = await fetch(APIOrder + "/GetAll");
      if (response.ok) {
        const result = await response.json();
        console.log(result);
        setData(result.data);
      } else {
        console.error("Error al obtener datos de la API");
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  // 1.Montando los datos en la tabla:
  useEffect(() => {
    cargarDatosTabla();
  }, []);

  // 2.Eliminar Empleado:
  const eliminarEmpleado = async (id: string) => {
    try {
      const response = await fetch(APIOrder + "/Eliminar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        console.log(`Empleado con ID ${id} eliminado correctamente.`);
        // Llama a la función para recargar los datos de la tabla
        cargarDatosTabla();
      } else {
        console.error(`Error al eliminar el empleado con ID ${id}`);
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  return (
    <>
      <Sidebar></Sidebar>
      <div className="p-4 sm:ml-64">
        <div className="flex flex-col p-4 border-2 border-gray-200 rounded-lg dark:border-gray-700">
          <div className="mb-4 flex w-full">
            <div className="flex w-full rounded bg-gray-50 text-center">
              <h1 className="w-full font-bold text-3xl p-3">
                Tabla de Ordenes
              </h1>
            </div>
          </div>
          <div className="flex h-[350px] mb-4 rounded bg-gray-50 dark:bg-gray-800">
            <form className="form w-full p-[35px]" onSubmit={HandleSubmit}>
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    value={compañia}
                    onChange={(e) => setCompañia(e.target.value)}
                    type="text"
                    name="compañia"
                    id="compañia"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  />
                  <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Compañia
                  </label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    type="text"
                    name="nombre"
                    id="nombre"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  />
                  <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Nombre
                  </label>
                </div>
              </div>
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    value={fechaReq}
                    onChange={(e) => setFechaReq(e.target.value)}
                    type="date"
                    name="recha_req"
                    id="recha_req"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  />
                  <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Fecha Requerida
                  </label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    value={direccion}
                    onChange={(e) => setDireccion(e.target.value)}
                    type="text"
                    name="direccion"
                    id="direccion"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  />
                  <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Direccion
                  </label>
                </div>
              </div>
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    value={ciudad}
                    onChange={(e) => setCiudad(e.target.value)}
                    type="text"
                    name="ciudad"
                    id="ciudad"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  />
                  <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Ciudad
                  </label>
                </div>
              </div>
              <div className="boton flex justify-center">
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-[15px] w-full sm:w-auto p-[12px_15px] text-center"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
          <div className="tabla w-full">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Codigo
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Compañia
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Nombre
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Inico del Pedido
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                      Fin del Pedido
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                      Dirección
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                      Ciudad
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr
                      key={index}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {item.Id}
                      </th>
                      <td className="px-6 py-4">{item.Compañia}</td>
                      <td className="px-6 py-4">{item.Nombre}</td>
                      <td className="px-6 py-4">{item.Inicio_Pedido}</td>
                      <td className="px-6 py-4">{item.Fin_Pedido}</td>
                      <td className="px-6 py-4">{item.Direccion}</td>
                      <td className="px-6 py-4">{item.Ciudad}</td>
                      <td className="px-6 py-4 text-right flex">
                        <a className="font-medium w-[40%] text-blue-600 dark:text-blue-500 hover:underline">
                          <Link to={`/editarordenes/${item.Id}`}>Editar</Link>
                        </a>
                        <a
                          onClick={() => eliminarEmpleado(item.Id)}
                          className="font-medium w-[40%] text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          Eliminar
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MainOrders;
