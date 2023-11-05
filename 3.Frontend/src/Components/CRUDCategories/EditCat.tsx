import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { APICat } from "../../Logic/APIS/2.APICat";

function EditCat() {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [statusCode, setStatusCode] = useState<number | null>(null);
  const { id } = useParams();

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/categorias");
  };

  const HandleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(APICat + "/Actualizar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, nombre, descripcion }),
      });

      setStatusCode(response.status);

      const data = await response.json();

      console.log(data);

      if (data.code === 200) {
        navigate("/categorias");
      }
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataToSend = { id: id }; // Define un objeto con la propiedad 'id'

        const response = await fetch(APICat + "/Listar", {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Indica que estás enviando JSON
          },
          body: JSON.stringify(dataToSend), // Convierte el objeto a JSON
        });

        if (response.ok) {
          const result = await response.json();
          console.log(result.data[0].nombre);
          setNombre(result.data[0].nombre);
          setDescripcion(result.data[0].descripcion);
        } else {
          console.error("Error al actualizar la categoria en la API");
        }
      } catch (error) {
        console.error("Error de red:", error);
      }
    };

    fetchData();
  }, [id]);

  console.log(id);

  return (
    <>
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
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              type="text"
              name="floating_last_name"
              id="floating_last_name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Descripcion
            </label>
          </div>
        </div>
        <div className="boton flex justify-center">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-[15px] w-full sm:w-auto p-[12px_15px] text-center"
          >
            Actualizar Categoria
          </button>
        </div>
      </form>
    </>
  );
}

export default EditCat;
