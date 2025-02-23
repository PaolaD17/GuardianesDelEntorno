import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Para redirigir
import "bootstrap/dist/css/bootstrap.min.css";
// import { Link } from "react-router-dom"; // Usamos Link en lugar de <a>

const AgregarAreaNatural = () => {
  const [nombre, setNombre] = useState("");
  const [tipo, setTipo] = useState("");
  const [pais, setPais] = useState("");
  const [estado, setEstado] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate(); // Hook para redirigir

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombre || !tipo || !pais || !estado) {
      setError("Por favor, complete todos los campos.");
      return;
    }
    setError("");
    setMessage("");

    try {
      const response = await fetch(
        "https://mammal-excited-tarpon.ngrok-free.app/api/natural-area/insert?secret=TallerReact2025!",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ nombre, tipo, pais, estado }),
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
        setMessage("Ingreso exitoso. Redirigiendo al listado...");
        setTimeout(() => {
          navigate("/"); // Redirigir al login después de 2 segundos
        }, 2000);
      } else {
        setError("Error al ingresar. Intente nuevamente.");
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
          alt="Titulo de la web"
          className="img-fluid"  // La imagen se ajusta al tamaño y se separa un poco del formulario
          style={{ maxWidth: "750px" }}  // Puedes ajustar el tamaño de la imagen aquí
        />
      </div>

      {/* Contenedor del formulario centrado abajo */}
      <div className="card p-4 shadow-lg" style={{ width: "350px" }}>
        <h2 className="text-center mb-3">Ingresar área natural</h2>
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
            <label className="form-label">Tipo</label>
            <select
              className="form-control"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              required
            >
              <option value="">Seleccione una opción</option>
              <option value="opcion1">Opción 1</option>
              <option value="opcion2">Opción 2</option>
              <option value="opcion3">Opción 3</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">País</label>
            <input
              type="text"
              className="form-control"
              value={pais}
              onChange={(e) => setPais(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Estado de conservación</label>
            <select
              className="form-control"
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
              required
            >
              <option value="">Seleccione una opción</option>
              <option value="opcion1">Estable</option>
              <option value="opcion2">En riesgo</option>
              <option value="opcion3">Crítico</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Agregar
          </button>
        </form>
      </div>
    </div>
  );
};

export default AgregarAreaNatural;