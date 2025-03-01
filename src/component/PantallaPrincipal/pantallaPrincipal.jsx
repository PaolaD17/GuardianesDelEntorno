import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import userSlice from "../../userSlice";

const PantallaPrincipal = ({ setIsAuthenticated }) => {

  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary w-100 fixed-top">
        <div className="container-fluid">
        <div className="text-center">
          <a className="navbar-brand" href="/">
            <img
              src="TituloSecundario.png"
              alt="Icono de la web"
              className="img-fluid"
              style={{ maxWidth: "500px" }}
            />
          </a>
        </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {/* Agregamos ms-auto para empujar el contenido a la derecha */}
            <form className="d-flex ms-auto" role="search">
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
                className="btn btn-outline-danger me-2"
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
      <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
        <div className="col-4 mb-3">
          <Link to="/ListaAreasNaturales" className="btn btn-primary btn-lg w-100">
            ÁREAS NATURALES
          </Link>
        </div>
        <div className="col-4 mb-3">
          <Link to="/ListaEspeciesAvistadas" className="btn btn-secondary btn-lg w-100">
            ESPECIES AVISTADAS
          </Link>
        </div>
        <div className="col-4 mb-3">
          <Link to="/ListaActividades" className="btn btn-secondary btn-lg w-100">
            ACTIVIDADES DE CONSERVACIÓN
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PantallaPrincipal;