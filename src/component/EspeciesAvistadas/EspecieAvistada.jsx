import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import'./EspecieAvistada.css';


const EspecieAvistada = ({user, setIsAuthenticated}) => {
    const { id } = useParams();  // Obtiene el ID desde la URL
    const [especie, setEspecie] = useState([]);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchEspecies = async () => {
            try {
                const apiUrl = `https://mammal-excited-tarpon.ngrok-free.app/api/species/list?secret=TallerReact2025!&page=1&pageSize=10`;

                console.log("Consultando API:", apiUrl);

                const response = await fetch(apiUrl);

                if (!response.ok) {
                    throw new Error(`Error en la API: ${response.status}`);
                }

                const data = await response.json();

                // Convertir id a número
                const especieId = Number(id);
                let foundEspecie = null;

                // 🔹 Recorremos todas las áreas y buscamos la que coincida con el ID
                for (let i = 0; i < data.items.length; i++) {
                    if (data.items[i].id === especieId) {
                        foundEspecie = data.items[i];
                        break;
                    }
                }

                if (!foundEspecie) {
                    throw new Error("Área no encontrada");
                }

                setEspecie(foundEspecie);
            } catch (err) {
                console.error("Error al obtener los detalles del área:", err);
                setError("No se pudo cargar la especie avistada.");
            }
        };

        fetchEspecies();
    }, [id]);  // Se ejecuta cuando cambia el ID

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    if (!especie) {
        return <p>Cargando...</p>;
    }

    return (
        <div>
        <nav className="navbar navbar-expand-lg bg-body-tertiary w-100 fixed-top">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    <img
                        src="/TituloPrincipal.png"
                        alt="Icono de la web"
                        className="img-fluid"
                        style={{ maxWidth: "200px" }}
                    />
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Áreas Naturales
                            </a>
                            <ul className="dropdown-menu">
                                <li>
                                    <Link className="dropdown-item" to="/ListaAreasNaturales">Mis áreas naturales</Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" to="/AgregarAreaNatural">Agregar área natural</Link>
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
        <div>
            <div className="container mt-4">
                <h1>{especie.commonName}</h1>
                <p><strong>Nombre cientifico:</strong>{especie.scientificName}</p>
                <p><strong>Categoria:</strong> {especie.category}</p>
                <p><strong>Estado de conservacion:</strong> {especie.conservationStatus}</p>
                <p><strong>Area Natural:</strong> {especie.naturalAreaId}</p>
            </div>
        </div>
    </div>    
    );
};

export default EspecieAvistada;