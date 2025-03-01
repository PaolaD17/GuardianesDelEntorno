import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Para redirigir
import { useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
// import { Link } from "react-router-dom"; // Usamos Link en lugar de <a>

const AgregarAreaNatural = ({ setIsAuthenticated }) => {
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [tipo, setTipo] = useState("");
  const [pais, setPais] = useState("");
  const [estado, setEstado] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate(); // Hook para redirigir
  const user = useSelector((state) => state.user.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombre || !direccion || !tipo || !pais || !estado || !descripcion || !imagen) {
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
          body: JSON.stringify({
            userId: 15,  // El ID del usuario que agrega la área
            naturalArea: {
              name: nombre,
              location: direccion,
              areaType: tipo,
              region: pais,
              conservationStatus: estado,
              description: descripcion,
              imageUrl: imagen,
            }
          })
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
      debugger
      if (data.result) {
        setMessage("Ingreso exitoso. Redirigiendo al listado...");
        
        // Guardar la nueva área en el localStorage
        const storedAreas = JSON.parse(localStorage.getItem('areas')) || []; // Obtener áreas existentes del localStorage
        const nuevaArea = {
          id: data.id,  // Suponiendo que el servidor responde con un 'id' único
          name: nombre,
          location: direccion,
          areaType: tipo,
          region: pais,
          conservationStatus: estado,
          description: descripcion,
          imageUrl: imagen,
          userId: 15,  // Aseguramos que el área tiene el userId correcto
        };
        storedAreas.push(nuevaArea);  // Añadir la nueva área al array de áreas
        localStorage.setItem('areas', JSON.stringify(storedAreas));  // Guardar el array actualizado en localStorage
  
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
                      <span className="me-2 align-self-center">
                          Hola, {user ? user.name : "Usuario"}
                      </span>
                      <button
                          className="btn btn-outline-danger"
                          type="button"
                          onClick={() => {
                              localStorage.removeItem("user");
                              setIsAuthenticated(false);
                              navigate("/");
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
                <label className="form-label">Direccion</label>
                <input
                  type="text"
                  className="form-control"
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
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
                  <option value="opcion1">Reserva natural</option>
                  <option value="opcion2">Pradera</option>
                  <option value="opcion3">Selva</option>
                  <option value="opcion3">Selva</option>
                  <option value="opcion3">Selva</option>
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
                <label className="form-label">Imagen</label>
                <input
                  type="text"
                  className="form-control"
                  value={imagen}
                  onChange={(e) => setImagen(e.target.value)}
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