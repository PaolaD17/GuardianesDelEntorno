import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const ListaUsuarios = ({ setIsAuthenticated }) => {
  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1); // Página inicial

  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);

  const fetchUsuarios = async (pageNumber) => {
    debugger;
    try {
      const response = await fetch(
        `https://mammal-excited-tarpon.ngrok-free.app/api/user/list?secret=TallerReact2025!&userId=1&page=1&pageSize=1000`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Error al obtener usuarios");
      }

      const data = await response.json();
      console.log(data.users);
      // Verifica si data.items es un array antes de iterar sobre él
      if (Array.isArray(data.users.items)) {
        setUsuarios(prevUsuarios => [...prevUsuarios, ...data.users.items]);
      } else {
        throw new Error("Formato de datos no esperado");
      }
    } catch (error) {
      setError("No se pudieron cargar los usuarios");
    }
  };

  const handleLoadMore = () => {
    const nextPage = page + 1; // Incrementa la página
    setPage(nextPage); // Actualiza el estado de la página
  };

  useEffect(() => {
    fetchUsuarios(page); // Llama a la API con la página actual
  }, [page]);

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
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Áreas Naturales
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/MisAreasNaturales">Mis áreas naturales</Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/AgregarAreaNatural">Agregar área natural</Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
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
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
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
      <div className="container mt-4">
        <div className="card shadow-lg">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="card-title m-0">Lista de Usuarios</h2>
            </div>

            {error && <div className="alert alert-danger text-center">{error}</div>}

            <ul className="list-group">
              {usuarios.map((usuario) => (
                <li key={usuario.id} className="list-group-item">
                  <h5 className="mb-1">{usuario.name}</h5>
                  <p className="text-muted">{usuario.email}</p>
                </li>
              ))}
            </ul>

            <button
              onClick={handleLoadMore}
              className="btn btn-secondary w-100 mt-3"
            >
              Cargar más
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListaUsuarios;

