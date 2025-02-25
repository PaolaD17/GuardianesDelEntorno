import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../userSlice"; // Importar la acción de Redux
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom"; // Importa el hook useNavigate
import './registro.css'; // Archivo de estilos

const Registro = ({ setIsAuthenticated }) => {
  const [nombre, setNombre] = useState("");
  const [nombreDeUsuario, setNombreDeUsuario] = useState("");
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
        "https://mammal-excited-tarpon.ngrok-free.app/api/user/register?secret=TallerReact2025!",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ nombre, nombreDeUsuario, email, password }),
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
        setMessage("Registro exitoso!!");

        // Guardar usuario en Redux
        dispatch(setUser(data.user));

        // Marcar como autenticado
        setIsAuthenticated(true);

        // Redirigir a login
        navigate("/login");
      } else {
        setError("Credenciales incorrectas");
      }
    } catch (error) {
      setError("Error al conectar con el servidor");
    }
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
      {/* Imagen centrada arriba */}
      <div className="w-100 mb-4 text-center">
        <img
          src="/TituloSecundario.png"  // Asegúrate de que la imagen esté en 'public'
          alt="TituloSecundario"
          className="img-fluid"
          style={{ maxWidth: "750px" }}
        />
      </div>

      {/* Contenedor del formulario */}
      <div className="card p-4 shadow-lg" style={{ width: "350px" }}>
        <h2 className="text-center mb-3">Registro</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        {message && <div className="alert alert-success">{message}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input
              type="text"
              className="form-control"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Nombre de usuario</label>
            <input
              type="text"
              className="form-control"
              value={nombreDeUsuario}
              onChange={(e) => setNombreDeUsuario(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">E-Mail</label>
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
          <button type="submit" className="btn btn-primary w-100">
            Registrarse
          </button>
        </form>
        
        <div className="text-center mt-3">
          <span>¿Ya tienes usuario? </span>
          <Link to="/" className="text-primary fw-bold">
            Inicia sesión
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Registro;