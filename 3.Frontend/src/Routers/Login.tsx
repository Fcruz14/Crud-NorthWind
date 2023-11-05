import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../Auth/AuthProvider";
import Home from "../Layout/Home";
import { APILogin } from "../Logic/APIS/5.APILogin";

function Login() {
  const navigate = useNavigate();


  const [Username, setUserName] = useState("");
  const [Password, setPassword] = useState("");
  const [statusCode, setStatusCode] = useState<number | null>(null);
  const auth = useAuth();

  // Function to authenticate the user
  const authenticateUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    fetch(APILogin + "/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Username, Password }),
    })
      .then((response) => {
        setStatusCode(response.status);
        return response.json();
      })
      .then((data) => {
        console.log(Username, Password);
        console.log(data);

        if (data.code === 200) {
          console.log("logueado")
          // Set the isAuthenticated state in the auth context
          auth.setIsAuthenticated(true);
          navigate("/empleados");
        } else {
          // Set the isAuthenticated state in the auth context
          auth.setIsAuthenticated(false);
        }
      })
      .catch((error) => {
        console.error("Error al enviar la solicitud:", error);
        // Set the isAuthenticated state in the auth context
        auth.setIsAuthenticated(false);
      });
  };

  return (
    <>
      <Home>
        <form onSubmit={authenticateUser} className="form">
          <h1>Iniciar Sesión</h1>
          <label>UserName:</label>
          <input
            type="text"
            value={Username}
            onChange={(e) => setUserName(e.target.value)}
          />
          <label>Password:</label>
          <input
            type="password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button>Iniciar Sesión</button>
        </form>
      </Home>
    </>
  );
}

export default Login;
