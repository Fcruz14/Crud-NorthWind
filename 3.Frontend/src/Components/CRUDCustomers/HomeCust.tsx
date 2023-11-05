import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { APICust } from "../../Logic/APIS/3.APICust";
import Sidebar from "../Sidebar";

function Navbar() {
  const [id, setId] = useState("");
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [pais, setPais] = useState("");
  const [telefono, setTelefono] = useState("");
  const [statusCode, setStatusCode] = useState<number | null>(null);
  const [data, setData] = useState<any[]>([]);

  //1. Funcion para Ingresar los Datos en la tabla al cargar el formulario
  const HandleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch(APICust + "/Registrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id,nombre, direccion, ciudad, pais, telefono }),
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

      setId("")
      setNombre("")
      setDireccion("")
      setCiudad("")
      setPais("")
      setTelefono("")
  };

  // 3. Funcion para llamar a la tabla:
  const cargarDatosTabla = async () => {
    try {
      const response = await fetch(APICust + "/GetAll");
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

  // 1.Con esta funcion estoy montando los datos de la tabla al DOM una vez la pagina se cargue haciendo uso del UseEffect un Hoock de React
  useEffect(() => {
    cargarDatosTabla();
  }, []);

  // 2.Eliminar Empleado:
  const eliminarEmpleado = async (id: string) => {
    try {
      const response = await fetch(APICust + "/Eliminar", {
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
                Tabla de Customers
              </h1>
            </div>
          </div>
          <div className="flex h-[340px] mb-4 rounded bg-gray-50 dark:bg-gray-800">
            <form className="form w-full p-[35px]" onSubmit={HandleSubmit}>
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    type="text"
                    name="floating_codigo"
                    id="floating_codigo"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  />
                  <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Codigo
                  </label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    type="text"
                    name="floating_nombre"
                    id="floating_nombre"
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
                    value={direccion}
                    onChange={(e) => setDireccion(e.target.value)}
                    type="text"
                    name="floating_direccion"
                    id="floating_direccion"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  />
                  <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Direccion
                  </label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    value={ciudad}
                    onChange={(e) => setCiudad(e.target.value)}
                    type="text"
                    name="floating_ciudad"
                    id="floating_ciudad"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  />
                  <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Ciudad
                  </label>
                </div>
              </div>
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    value={pais}
                    onChange={(e) => setPais(e.target.value)}
                    type="text"
                    name="floating_pais"
                    id="floating_pais"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  />
                  <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Pais
                  </label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    type="text"
                    name="floating_telefono"
                    id="floating_telefono"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  />
                  <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Telefono
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
                      Código
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Nombre
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Dirección
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Ciudad
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                      País
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                      Teléfono
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
                        {item.id}
                      </th>
                      <td className="px-6 py-4">{item.nombre}</td>
                      <td className="px-6 py-4">{item.direccion}</td>
                      <td className="px-6 py-4">{item.ciudad}</td>
                      <td className="px-6 py-4">{item.pais}</td>
                      <td className="px-6 py-4">{item.telefono}</td>
                      <td className="px-6 py-4 text-right flex">
                        <a className="font-medium w-[40%] text-blue-600 dark:text-blue-500 hover:underline">
                          <Link to={`/editarcustomer/${item.id}`}>Editar</Link>
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
