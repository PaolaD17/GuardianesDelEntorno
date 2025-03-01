import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import './ListaEspeciesAvistadas.css'; // Importar el archivo CSS;

const ListaEspeciesAvistadas = ({ setIsAuthenticated }) => {
    const [especies, setEspecies] = useState([]);
    const [error, setError] = useState("");
    const [page, setPage] = useState(1);
    const pageSize = 10;

    const navigate = useNavigate();
    const user = useSelector((state) => state.user.user);

    // Llamada a la API para obtener las especies
    const fetchEspecies = async (pageNumber) => {
        try {
            const response = await fetch(
                `https://mammal-excited-tarpon.ngrok-free.app/api/species/list?secret=TallerReact2025!&page=${pageNumber}&pageSize=${pageSize}`,
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
            if (data.items) {
                setEspecies((prevEspecies) => [...prevEspecies, ...data.items]);  // Agrega las nuevas especies
            }
        } catch {
            setError("Error al obtener las especies avistadas.");
        }
    };

    const handleLoadMore = () => {
        const nextPage = page + 1; // Incrementa la página
        setPage(nextPage); // Actualiza el estado de la página
    };

    React.useEffect(() => {
        fetchEspecies(page); // Llama a la API con la página actual
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
                                        <Link className="dropdown-item" to="/AgregarActividad">Agregar actividades</Link>
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

            <div className="container mt-4">
                <div className="card shadow-lg">
                    <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h2 className="card-title m-0">Lista de Especies Avistadas</h2>
                        </div>

                        {error && <div className="alert alert-danger text-center">{error}</div>}
                        
                        <ul className="list-group">
                            {especies.length === 0 && !error ? (
                                <div className="alert alert-info text-center">No hay especies disponibles.</div>
                            ) : (
                                especies.map((especie) => (
                                    <li key={especie.id} className="list-group-item">
                                        <h5 className="mb-1">
                                            <Link to={`/EspecieAvistada/${especie.id}`} className="text-decoration-none">
                                                {especie.commonName}
                                            </Link>
                                        </h5>
                                        <p className="text-muted">Área Natural: {especie.naturalAreaId}</p>
                                    </li>
                                ))
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListaEspeciesAvistadas;