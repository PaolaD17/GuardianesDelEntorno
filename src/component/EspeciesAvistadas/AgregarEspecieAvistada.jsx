import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // Para redirigir
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const AgregarAreaNatural = ({ setIsAuthenticated }) => {
    const [nombre, setNombre] = useState("");
    const [nombreCientifico, setNombreCientifico] = useState("");
    const [categoria, setCategoria] = useState("");
    const [estado, setEstado] = useState("");
    const [areaNatural, setAreaNatural] = useState("");
    const [areas, setAreas] = useState([]); // Estado para almacenar las áreas naturales
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate(); // Hook para redirigir
    const user = useSelector((state) => state.user.user);

    // Función para obtener las áreas naturales
    useEffect(() => {
        const fetchAreas = async () => {
            try {
                const response = await fetch(
                    `https://mammal-excited-tarpon.ngrok-free.app/api/natural-area/list?secret=TallerReact2025!`
                );
                if (!response.ok) {
                    throw new Error("Error al obtener las áreas");
                }
                const data = await response.json();
                setAreas(data.items || []); // Guardar las áreas en el estado
            } catch (error) {
                setError("Error al obtener las áreas naturales.");
            }
        };

        fetchAreas();
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!nombre || !nombreCientifico || !categoria || !estado || !areaNatural ) {
            setError("Por favor, complete todos los campos.");
            return;
        }
        setError("");
        setMessage("");

        try {
        const response = await fetch(
            "https://mammal-excited-tarpon.ngrok-free.app/api/species/insert",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
            },
            body: JSON.stringify({ 
                userId: 15, 
                species: {
                    commonName: nombre,
                    scientificName: nombreCientifico,
                    category: categoria,
                    conservationStatus: estado,
                    naturalAreaId: areaNatural
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
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
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
                    <h2 className="text-center mb-3">Ingresar especie avistada</h2>
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
                        <label className="form-label">Nombre científico</label>
                        <input
                        type="text"
                        className="form-control"
                        value={nombreCientifico}
                        onChange={(e) => setNombreCientifico(e.target.value)}
                        required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Categoría</label>
                        <select
                        className="form-control"
                        value={categoria}
                        onChange={(e) => setCategoria(e.target.value)}
                        required
                        >
                        <option value="">Seleccione una opción</option>
                        <option value="opcion1">Animal</option>
                        <option value="opcion2">Vegetal</option>
                        <option value="opcion3">Fungi</option>
                        <option value="opcion3">Monera</option>
                        </select>
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