import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { APIEmpleado } from "../../Logic/APIS/1.APIEmpleado";
import Sidebar from "../Sidebar";

function Navbar() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [pais, setPais] = useState("");
  const [statusCode, setStatusCode] = useState<number | null>(null);
  const [data, setData] = useState<any[]>([]);

  //1. Funcion para realizar registros
  const HandleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch(APIEmpleado + "/Registrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nombre, apellido, ciudad, pais }),
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

      setNombre("")
      setApellido("")
      setCiudad("")
      setPais("")
  };

  // 3. Funcion para llamar datos de la tabla:
  const cargarDatosTabla = async () => {
    try {
      const response = await fetch(APIEmpleado + "/GetAll");
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
    cargarDatosTabla()
  }, []);

  // 2.Eliminar Empleado:
  const eliminarEmpleado = async (id: string) => {
    try {
      const response = await fetch(APIEmpleado + "/Eliminar", {
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
                Tabla de Empleados
              </h1>
            </div>
          </div>
          <div className="flex h-[300px] mb-4 rounded bg-gray-50 dark:bg-gray-800">
            <form className="form w-full p-[35px]" onSubmit={HandleSubmit}>
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    type="text"
                    name="floating_first_name"
                    id="floating_first_name"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  />
                  <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Nombre
                  </label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    value={apellido}
                    onChange={(e) => setApellido(e.target.value)}
                    type="text"
                    name="floating_last_name"
                    id="floating_last_name"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  />
                  <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Apellidos
                  </label>
                </div>
              </div>
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    value={ciudad}
                    onChange={(e) => setCiudad(e.target.value)}
                    type="text"
                    name="floating_phone"
                    id="floating_phone"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  />
                  <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Ciudad
                  </label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    value={pais}
                    onChange={(e) => setPais(e.target.value)}
                    type="text"
                    name="floating_company"
                    id="floating_company"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  />
                  <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    País
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
                      Nombre
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Apellidos
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Ciudad
                    </th>
                    <th scope="col" className="px-6 py-3">
                      País
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
                        {item.nombre}
                      </th>
                      <td className="px-6 py-4">{item.apellido}</td>
                      <td className="px-6 py-4">{item.ciudad}</td>
                      <td className="px-6 py-4">{item.pais}</td>
                      <td className="px-6 py-4 text-right flex">
                        <a className="font-medium w-[40%] text-blue-600 dark:text-blue-500 hover:underline">
                          <Link to={`/editarempleado/${item.id}`}>Editar</Link>
                        </a>
                        <a
                          onClick={() => eliminarEmpleado(item.id)}
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

export default Navbar;
