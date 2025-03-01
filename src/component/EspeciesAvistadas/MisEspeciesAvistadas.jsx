import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import './MisEspeciesAvistadas.css'; // Importar el archivo CSS

const MisEspeciesAvistadas = ({ setIsAuthenticated }) => {
    const [especies, setEspecies] = useState([]);
    const [error, setError] = useState("");
    const [page, setPage] = useState(1); // Página inicial
    const pageSize = 10;

    const navigate = useNavigate();
    const user = useSelector((state) => state.user.user);

    // Cargar las áreas del almacenamiento local
    const fetchUserEspecies = () => {
        try {
            // Obtener áreas del almacenamiento local
            const storedAreas = JSON.parse(localStorage.getItem('areas')) || [];
            
            // Filtrar solo las áreas asociadas al usuario con ID 15
            const userEspecies = storedEspecies.filter(naturalEspecies => naturalEspecie.userId === 15);
            setEspecies(userEspecies);  // Establecer el estado de especies
        } catch (error) {
            setError("Error al obtener las áreas del usuario.");
        }
    };

    useEffect(() => {
        fetchUserEspecies();
    }, []); // Solo se ejecuta una vez cuando la página se carga

    const handleLoadMore = () => {
        const nextPage = page + 1; // Incrementa la página
        setPage(nextPage); // Actualiza el estado de la página
    };

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
            <div className="container mt-4">
                <div className="card shadow-lg">
                    <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h2 className="card-title m-0">Mis especies avistadas</h2>
                        </div>

                        {error && <div className="alert alert-danger text-center">{error}</div>}

                        <ul className="list-group">
                            {especias.length > 0 ? (
                                especias.map((species) => (
                                    <li key={species.id} className="list-group-item">
                                        <h5 className="mb-1">{species.commonName}</h5>
                                        <p className="text-muted">{species.scientificName}</p>
                                        <p className="text-muted">{species.category}</p>
                                    </li>
                                ))
                            ) : (
                                <li className="list-group-item">No tienes especies avistadas registradas.</li>
                            )}
                        </ul>

                        {/* Este botón solo se muestra si hay más especies para cargar */}
                        {especies.length > page * pageSize && (
                            <button
                                onClick={handleLoadMore}
                                className="btn btn-secondary w-100 mt-3"
                            >
                                Cargar más
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MisEspeciesAvistadas;