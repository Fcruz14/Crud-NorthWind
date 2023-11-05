import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { APIOrder } from "../../Logic/APIS/4.APIOrders";

function EditarEmpleados() {
  const [compañia, setCompañia] = useState("");
  const [nombre, setNombre] = useState("");
  const [fechaReq, setFechaReq] = useState("");
  const [direccion, setDireccion] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [statusCode, setStatusCode] = useState<number | null>(null);
  const { id } = useParams();

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/empleados");
  };

  const HandleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log( id, compañia, nombre, fechaReq, direccion,ciudad)
      const response = await fetch(APIOrder + "/Actualizar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, compañia, nombre, fechaReq, direccion,ciudad }),
      });

      setStatusCode(response.status);

      const data = await response.json();

      console.log(data);

      if (data.code === 200) {
        navigate("/ordenes");
      }
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataToSend = { id: id }; // Define un objeto con la propiedad 'id'

        const response = await fetch(APIOrder + "/Listar", {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Indica que estás enviando JSON
          },
          body: JSON.stringify(dataToSend), // Convierte el objeto a JSON
        });

        if (response.ok) {
          const result = await response.json();
          setCompañia(result.data[0].Compañia);
          setNombre(result.data[0].Nombre);
          setFechaReq(result.data[0].Fin_Pedido);
          setDireccion(result.data[0].Direccion);
          setCiudad(result.data[0].Ciudad);
        } else {
          console.error("Error al actualizar el empleado en la API");
        }
      } catch (error) {
        console.error("Error de red:", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <>
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
                    Fin Pedido
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
    </>
  );
}

export default EditarEmpleados;
