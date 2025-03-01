import React, { useState } from 'react';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import './ListaActividades.css'; // Importar el archivo CSS

const ListaActividades = ({ setIsAuthenticated }) => {
    const [actividades, setActividades] = useState([]);
    const [error, setError] = useState("");
    const [page, setPage] = useState(1);
    const pageSize = 10;

    const navigate = useNavigate();
    const user = useSelector((state) => state.user.user);

    const fetchActividades = async (pageNumber) => {
        try {
            const response = await fetch(
                `https://mammal-excited-tarpon.ngrok-free.app/api/conservation-activity/list?secret=TallerReact2025!`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "ngrok-skip-browser-warning": "true",
                    },
                }
            );
            if (!response.ok) {
                throw new Error(`Error en la API: ${response.status}`);
            }

            const data = await response.json();
            if (data.items) setActividades(data.items);
            } catch {
                setError("Error al obtener las actividades de conservación.");
            }
    };

    const handleLoadMore = () => {
        fetchActividades();
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
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Áreas Naturales
                                </a>
                                <ul className="dropdown-menu">
                                    <li>
                                        <Link className="dropdown-item" to="/MisActividadesNaturales">Mis actividades</Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="/AgregarActividadNatural">Agregar actividad</Link>
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
                                    Actividades de conservación
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
                            <h2 className="card-title m-0">Lista de actividades de conservación</h2>
                        </div>

                        {error && <div className="alert alert-danger text-center">{error}</div>}

                        <ul className="list-group">
                            {actividades.map((actividad) => (
                                <li key={actividad.id} className="list-group-item">
                                    <h5 className="mb-1">{actividad.name}</h5>
                                    <p className="text-muted">{actividad.email}</p>
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

export default ListaActividades;