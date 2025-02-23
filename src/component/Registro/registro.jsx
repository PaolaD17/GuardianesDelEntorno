import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Para redirigir
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom"; // Usamos Link en lugar de <a>

const Registro = () => {
  const [nombre, setNombre] = useState("");
  const [nombreDeUsuario, setNombreDeUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate(); // Hook para redirigir

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombre || !nombreDeUsuario || !email || !password) {
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
      if (data.success) {
        setMessage("Registro exitoso. Redirigiendo al login...");
        setTimeout(() => {
          navigate("/"); // Redirigir al login después de 2 segundos
        }, 2000);
      } else {
        setError("Error en el registro. Intente nuevamente.");
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
          src="/TituloSecundario.png"  // Asegúrate de que la imagen esté en la carpeta 'public'
          alt="TituloSecundario"
          className="img-fluid"  // La imagen se ajusta al tamaño y se separa un poco del formulario
          style={{ maxWidth: "750px" }}  // Puedes ajustar el tamaño de la imagen aquí
        />
      </div>

      {/* Contenedor del formulario centrado abajo */}
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



