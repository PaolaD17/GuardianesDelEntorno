// import React, { useState, useEffect } from 'react';
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
// import './MisAreasNaturales.css'; // Importar el archivo CSS

// const MisAreasNaturales = ({ setIsAuthenticated }) => {
//     const [areas, setAreas] = useState([]);
//     const [error, setError] = useState("");
//     const [page, setPage] = useState(1); // Página inicial
//     const pageSize = 10;

//     const navigate = useNavigate();
//     const user = useSelector((state) => state.user.user);

//     // Cargar las áreas del almacenamiento local
//     const fetchUserAreas = () => {
//         try {
//             // Obtener áreas del almacenamiento local
//             const storedAreas = JSON.parse(localStorage.getItem('areas')) || [];
            
//             // Filtrar solo las áreas asociadas al usuario con ID 15
//             const userAreas = storedAreas.filter(naturalArea => naturalArea.userId === 15);
//             setAreas(userAreas);  // Establecer el estado de áreas
//         } catch (error) {
//             setError("Error al obtener las áreas del usuario.");
//         }
//     };

//     useEffect(() => {
//         fetchUserAreas();
//     }, []); // Solo se ejecuta una vez cuando la página se carga

//     const handleLoadMore = () => {
//         const nextPage = page + 1; // Incrementa la página
//         setPage(nextPage); // Actualiza el estado de la página
//     };

//     return (
//         <div>
//             <nav className="navbar navbar-expand-lg bg-body-tertiary w-100 fixed-top">
//                 <div className="container-fluid">
//                     <a className="navbar-brand" href="/">
//                         <img
//                             src="TituloPrincipal.png"
//                             alt="Icono de la web"
//                             className="img-fluid"
//                             style={{ maxWidth: "200px" }}
//                         />
//                     </a>
//                     <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//                         <span className="navbar-toggler-icon"></span>
//                     </button>
//                     <div className="collapse navbar-collapse" id="navbarSupportedContent">
//                         <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//                             <li className="nav-item dropdown">
//                                 <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
//                                     Áreas Naturales
//                                 </a>
//                                 <ul className="dropdown-menu">
//                                     <li>
//                                         <Link className="dropdown-item" to="/MisAreasNaturales">Mis áreas naturales</Link>
//                                     </li>
//                                     <li>
//                                         <Link className="dropdown-item" to="/AgregarAreaNatural">Agregar área natural</Link>
//                                     </li>
//                                 </ul>
//                             </li>
//                             <li className="nav-item dropdown">
//                                 <a className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
//                                     Especies Avistadas
//                                 </a>
//                                 <ul className="dropdown-menu">
//                                     <li>
//                                         <Link className="dropdown-item" to="/MisEspeciesAvistadas">Mis especies avistadas</Link>
//                                     </li>
//                                     <li>
//                                         <Link className="dropdown-item" to="/AgregarEspecieAvistada">Agregar especie avistada</Link>
//                                     </li>
//                                 </ul>
//                             </li>
//                             <li className="nav-item dropdown">
//                                 <a className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
//                                     Actividades
//                                 </a>
//                                 <ul className="dropdown-menu">
//                                     <li>
//                                         <Link className="dropdown-item" to="/MisActividades">Mis actividades</Link>
//                                     </li>
//                                     <li>
//                                         <Link className="dropdown-item" to="/AgregarActividad">Agregar actividades</Link>
//                                     </li>
//                                 </ul>
//                             </li>
//                         </ul>
//                         <form className="d-flex" role="search">
//                             <div className="me-2 align-self-center">
//                             <div className="dropdown">
//                                 <button
//                                 className="btn btn-outline-secondary dropdown-toggle"
//                                 type="button"
//                                 id="userDropdown"
//                                 data-bs-toggle="dropdown"
//                                 aria-expanded="false"
//                                 >
//                                 Hola, {user ? user.name : "Usuario"}
//                                 </button>
//                                 <ul className="dropdown-menu" aria-labelledby="userDropdown">
//                                 <li>
//                                     <Link className="dropdown-item" to="/MisAreasNaturales">
//                                     Mis áreas naturales
//                                     </Link>
//                                 </li>
//                                 <li>
//                                     <Link className="dropdown-item" to="/MisEspeciesAvistadas">
//                                     Mis especies avistadas
//                                     </Link>
//                                 </li>
//                                 <li>
//                                     <Link className="dropdown-item" to="/MisActividades">
//                                     Mis actividades de conservación
//                                     </Link>
//                                 </li>
//                                 </ul>
//                             </div>
//                             </div>
//                             <button
//                             className="btn btn-outline-danger"
//                             type="button"
//                             onClick={() => navigate("/ListaUsuarios")}
//                             >
//                             Usuarios
//                             </button>
//                             <button
//                             className="btn btn-outline-danger"
//                             type="button"
//                             onClick={() => {
//                                 localStorage.removeItem("user"); // Elimina el usuario guardado
//                                 setIsAuthenticated(false); // Quita la autenticación
//                                 navigate("/"); // Redirige al login
//                             }}
//                             >
//                             Cerrar Sesión
//                             </button>
//                         </form>
//                     </div>
//                 </div>
//             </nav>

//             {/* Contenedor del contenido con padding-top para que no quede tapado */}
//             <div className="container mt-4">
//                 <div className="card shadow-lg">
//                     <div className="card-body">
//                         <div className="d-flex justify-content-between align-items-center mb-4">
//                             <h2 className="card-title m-0">Mis Áreas Naturales</h2>
//                         </div>

//                         {error && <div className="alert alert-danger text-center">{error}</div>}

//                         <ul className="list-group">
//                             {areas.length > 0 ? (
//                                 areas.map((naturalArea) => (
//                                     <li key={naturalArea.id} className="list-group-item">
//                                         <h5 className="mb-1">{naturalArea.name}</h5>
//                                         <p className="text-muted">{naturalArea.location}</p>
//                                         <p className="text-muted">{naturalArea.description}</p>
//                                     </li>
//                                 ))
//                             ) : (
//                                 <li className="list-group-item">No tienes áreas naturales registradas.</li>
//                             )}
//                         </ul>

//                         {/* Este botón solo se muestra si hay más áreas para cargar */}
//                         {areas.length > page * pageSize && (
//                             <button
//                                 onClick={handleLoadMore}
//                                 className="btn btn-secondary w-100 mt-3"
//                             >
//                                 Cargar más
//                             </button>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default MisAreasNaturales;

import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import './MisAreasNaturales.css'; // Importar el archivo CSS

const MisAreasNaturales = ({ setIsAuthenticated }) => {
  const [areas, setAreas] = useState([]);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1); // Página inicial
  const pageSize = 10;

  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);

  // Cargar las áreas del almacenamiento local
  const fetchUserAreas = () => {
    try {
      // Obtener áreas del almacenamiento local
      const storedAreas = JSON.parse(localStorage.getItem('areas')) || [];
      // Filtrar solo las áreas asociadas al usuario con ID 15
      const userAreas = storedAreas.filter(naturalArea => naturalArea.userId === 15);
      
      setAreas(userAreas);  // Establecer el estado de áreas
    } catch (error) {
      setError("Error al obtener las áreas del usuario.");
    }
  };

  useEffect(() => {
    fetchUserAreas();
  }, []); // Solo se ejecuta una vez cuando la página se carga

  const handleLoadMore = () => {
    const nextPage = page + 1; // Incrementa la página
    setPage(nextPage);
  };

  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de eliminar esta área?")) {
      // Eliminar el área del array y actualizar el estado
      const updatedAreas = areas.filter(area => area.id !== id);
      setAreas(updatedAreas);
      localStorage.setItem("areas", JSON.stringify(updatedAreas));
    }
  };

  return (
    <div>
      {/* Barra de navegación */}
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

      {/* Contenedor del contenido (con padding-top para no quedar tapado por la navbar) */}
      <div className="container mt-4">
        <div className="card shadow-lg">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="card-title m-0">Mis Áreas Naturales</h2>
            </div>

            {error && <div className="alert alert-danger text-center">{error}</div>}

            <ul className="list-group">
              {areas.length > 0 ? (
                areas.map((naturalArea) => (
                  <li key={naturalArea.id} className="list-group-item">
                    <h5 className="mb-1">{naturalArea.name}</h5>
                    <p className="text-muted">{naturalArea.location}</p>
                    <p className="text-muted">{naturalArea.description}</p>
                    {/* Botones de acción para cada área natural */}
                    <div className="d-flex justify-content-end gap-2 mt-2">
                        <button
                            className="btn btn-warning btn-sm"
                            onClick={() => navigate(`/AgregarEspecieAvistada/${naturalArea.id}`)}
                        >
                            Agregar Especie
                        </button>
                        <button
                            className="btn btn-success btn-sm"
                            onClick={() => navigate(`/AgregarActividad/${naturalArea.id}`)}
                        >
                            Agregar Actividad
                        </button>
                        <button
                            className="btn btn-primary btn-sm"
                            onClick={() => navigate(`/ModificarAreaNatural/${naturalArea.id}`)}
                        >
                            Modificar
                        </button>
                        <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDelete(naturalArea.id)}
                        >
                        Eliminar
                        </button>
                    </div>
                  </li>
                ))
              ) : (
                <li className="list-group-item">No tienes áreas naturales registradas.</li>
              )}
            </ul>

            {/* Botón para cargar más áreas si aplica */}
            {areas.length > page * pageSize && (
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

export default MisAreasNaturales;