import React from 'react'
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ListaAreasNaturales = () => {
    const [areas, setAreas] = useState([]);
    const [error, setError] = useState("");
    const [page, setPage] = useState(1);
    const pageSize = 10;

    const navigate = useNavigate();

    const fetchAreas = async (pageNumber) => {

        try {
            const response = await fetch(
                `https://mammal-excited-tarpon.ngrok-free.app/api/natural-area/list?secret=TallerReact2025!&page=1&pageSize=10`,
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
                if (data.items) setAreas(data.items);
            } catch {
                setError("Error al obtener las áreas naturales.");
            }
    };
    const handleLoadMore = () => {
        fetchAreas();
    };

return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
        {/* Imagen centrada arriba */}
        <div className="fixed-top bg-white text-center py-2 shadow">
            <img
            src="/TituloSecundario.png"  // Asegúrate de que la imagen esté en la carpeta 'public'
            alt="TituloSecundario"
            className="img-fluid"  // La imagen se ajusta al tamaño y se separa un poco del formulario
            style={{ maxWidth: "750px" }}  // Puedes ajustar el tamaño de la imagen aquí
            />
        </div>
        <div className="container mt-4">
            <div className="card shadow-lg">
                <div className="card-body">
                    {/* Encabezado con botón alineado a la derecha */}
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h2 className="card-title m-0">Lista de Áreas Naturales</h2>
                        <button 
                            className="btn btn-primary" 
                            onClick={() => navigate("/AgregarAreaNatural")}
                        >
                        Agregar área natural
                        </button>
                    </div>

                    {error && <div className="alert alert-danger text-center">{error}</div>}

                    <ul className="list-group">
                        {areas.map((area) => (
                            <li key={area.id} className="list-group-item">
                                <h5 className="mb-1">{area.name}</h5>
                                <p className="text-muted">{area.email}</p>
                            </li>
                        ))}
                    </ul>

                    {/* Botón "Cargar más" corregido */}
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

  )
}

export default ListaAreasNaturales
