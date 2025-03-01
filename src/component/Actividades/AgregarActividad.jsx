import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Para redirigir
import { useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom"; // Usamos Link en lugar de <a>
import './AgregarActividad.css';

const AgregarAreaNatural = ({ setIsAuthenticated }) => {
  const [areaNatural, setAreaNatural] = useState("");
  const [areas, setAreas] = useState([]); // Estado para almacenar las áreas naturales
  const [descripcion, setDescripcion] = useState("");
  const [fecha, setFecha] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate(); // Hook para redirigir
  const user = useSelector((state) => state.user.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!areaNatural || !descripcion || !fecha) {
      setError("Por favor, complete todos los campos.");
      return;
    }
    setError("");
    setMessage("");

    try {
      const response = await fetch(
        "https://mammal-excited-tarpon.ngrok-free.app/api/conservation-activity/insert?secret=TallerReact2025!",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
              userId: 15, 
              conservationActivity: {
                naturalAreaId: areaNatural,
                description: descripcion,
                date: fecha,
              }
          })
        }
      );
      const responseText = await response.text();
      console.log("Respuesta del servidor:", responseText);
      
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
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary w-100 fixed-top">
          <div className="container-fluid">
              <a className="navbar-brand" href="/">
                  <img
                      src="TituloPrincipal.png"
                      alt="Icono de la web"
                      className="img-fluid"
                      style={{ maxWidth: "200px" }}
                  />
              </a>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                      <li className="nav-item dropdown">
                          <a className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                              Áreas Naturales
                          </a>
                          <ul className="dropdown-menu">
                              <li>
                                <Link className="dropdown-item" to="/ListaAreasNaturales">Mis áreas naturales</Link>
                              </li>
                              <li>
                                <Link className="dropdown-item" to="/AgregarAreaNatural">Agregar área natural</Link>
                              </li>
                          </ul>
                      </li>
                      <li className="nav-item dropdown">
                          <a className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                              Especies Avistadas
                          </a>
                          <ul className="dropdown-menu">
                              <li>
                                <Link className="dropdown-item" to="/MisEspeciesAvistadas">Mis especies avistadas</Link>
                              </li>
                              <li>
                                <Link className="dropdown-item" to="/AgregarEspecieAvistada">Agregar especie avistada</Link>
                              </li>
                          </ul>
                      </li>
                      <li className="nav-item dropdown">
                          <a className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                              Actividades
                          </a>
                          <ul className="dropdown-menu">
                              <li>
                                <Link className="dropdown-item" to="/MisActividades">Mis actividades</Link>
                              </li>
                              <li>
                                <Link className="dropdown-item" to="/AgregarActividad">Agregar actividad</Link>
                              </li>
                          </ul>
                      </li>
                  </ul>
                  <form className="d-flex" role="search">
                    <div className="me-2 align-self-center">
                      <div className="dropdown">
                        <button
                          className="btn btn-outline-secondary dropdown-toggle"
                          type="button"
                          id="userDropdown"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          Hola, {user ? user.name : "Usuario"}
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="userDropdown">
                          <li>
                            <Link className="dropdown-item" to="/MisAreasNaturales">
                              Mis áreas naturales
                            </Link>
                          </li>
                          <li>
                            <Link className="dropdown-item" to="/MisEspeciesAvistadas">
                              Mis especies avistadas
                            </Link>
                          </li>
                          <li>
                            <Link className="dropdown-item" to="/MisActividades">
                              Mis actividades de conservación
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <button
                      className="btn btn-outline-danger"
                      type="button"
                      onClick={() => navigate("/ListaUsuarios")}
                    >
                      Usuarios
                    </button>
                    <button
                      className="btn btn-outline-danger"
                      type="button"
                      onClick={() => {
                        localStorage.removeItem("user"); // Elimina el usuario guardado
                        setIsAuthenticated(false); // Quita la autenticación
                        navigate("/"); // Redirige al login
                      }}
                    >
                      Cerrar Sesión
                    </button>
                  </form>
              </div>
          </div>
      </nav>


      {/* Contenedor del contenido con padding-top para que no quede tapado */}
      <div className="container d-flex justify-content-center mt-4">
          <div className="card p-4 shadow-lg" style={{ width: "500px" }}>
        <h2 className="text-center mb-3">Ingresar Actividad de Conservación</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        {message && <div className="alert alert-success">{message}</div>}

        <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label className="form-label">Área natural</label>
            <select
              className="form-control"
              value={areaNatural}
              onChange={(e) => setAreaNatural(e.target.value)}
              required
            >
              <option value="">Seleccione una opción</option>
              {areas.map((area) => (
                  <option key={area.id} value={area.id}>
                      {area.name}
                  </option>
              ))}
            </select>
        </div>
          <div className="mb-3">
            <label className="form-label">Descripción</label>
            <input
              type="text"
              className="form-control"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Fecha</label>
            <input
              type="date"
              className="form-control"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Agregar
          </button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default AgregarAreaNatural;