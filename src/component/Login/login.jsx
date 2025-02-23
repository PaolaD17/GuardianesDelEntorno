import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../userSlice"; // Importar la acción de Redux
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom"; // Importa el hook useNavigate
import './login.css'; // Archivo de estilos

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch(); // Hook para usar Redux
  const navigate = useNavigate(); // Hook para redirigir

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Por favor, complete todos los campos.");
      return;
    }
    setError("");
    setMessage("");

    try {
      const response = await fetch(
        "https://mammal-excited-tarpon.ngrok-free.app/api/user/login?secret=TallerReact2025!",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (response.status === 403) {
        setError("Acceso denegado: Código secreto incorrecto");
        return;
      }
      if (response.status === 500) {
        setError("Error interno del servidor");
        return;
      }

      const data = await response.json();
      if (data.isValid && data.user) {
        setMessage("Login exitoso!!");

        // Guardar usuario en Redux
        dispatch(setUser(data.user));

        // Marcar como autenticado
        setIsAuthenticated(true);

        // Redirigir a la Pantalla Principal
        navigate("/pantallaPrincipal");
      } else {
        setError("Credenciales incorrectas");
      }
    } catch (error) {
      setError("Error al conectar con el servidor");
    }
  };

  return (
    <div className="login-page">
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="w-100 mb-4 text-center">
          <img
            src="/Guardianes (1)-Photoroom.png"  // Reemplaza con la URL o ruta de tu imagen
            alt="Guardianes del Entorno"
            className="img-fluid"  // Esto asegura que la imagen se ajuste bien en diferentes tamaños de pantalla
          />
        </div>

        <div className="card p-4 shadow-lg" style={{ width: "350px", zIndex: 10 }}>
          <h2 className="text-center mb-3">Iniciar Sesión</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          {message && <div className="alert alert-success">{message}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Correo Electrónico</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Contraseña</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Ingresar</button>
          </form>
          <div className="text-center mt-3">
            <span>¿No tienes usuario? </span>
            <Link to="/registro" className="text-primary fw-bold">¡Regístrate!</Link>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Login;
