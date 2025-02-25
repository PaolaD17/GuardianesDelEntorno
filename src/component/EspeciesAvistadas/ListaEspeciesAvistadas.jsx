import React from 'react'
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ListaEspeciesAvistadas = () => {
    const [especies, setEspecies] = useState([]);
    const [error, setError] = useState("");
    const [page, setPage] = useState(1);
    const pageSize = 10;

    const navigate = useNavigate();

    const fetchEspecies = async (pageNumber) => {
        try {
            const response = await fetch(
                `https://mammal-excited-tarpon.ngrok-free.app/api/species/list?page=1&pageSize=10`,
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
                if (data.items) setEspecies(data.items);
            } catch {
                setError("Error al obtener las áreas naturales.");
            }
    };

    const handleLoadMore = () => {
        fetchEspecies();
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
                            <h2 className="card-title m-0">Lista de Especies Avistadas</h2>
                            <button 
                                className="btn btn-primary" 
                                onClick={() => navigate("/AgregarEspecieAvistada")}
                            >
                            Agregar especie avistada
                            </button>
                        </div>
            
                        {error && <div className="alert alert-danger text-center">{error}</div>}
            
                        <ul className="list-group">
                            {especies.map((especie) => (
                                <li key={especie.id} className="list-group-item">
                                    <h5 className="mb-1">{especie.name}</h5>
                                    <p className="text-muted">{especie.email}</p>
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

export default ListaEspeciesAvistadas
