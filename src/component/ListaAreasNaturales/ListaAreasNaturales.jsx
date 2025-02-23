import React from 'react'
import { useState } from "react";

const ListaAreasNaturales = () => {
    const [areas, setAreas] = useState([]);
    const [error, setError] = useState("");
    const [page, setPage] = useState(1);
    const pageSize = 10;

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
    <div className="container mt-4">
        <div className="card shadow-lg">
            <div className="card-body">
                <h2 className="card-title text-center mb-4">Lista de Áreas Naturales</h2>
                
                {error && <div className="alert alert-danger text-center">{error}</div>}
                
                <ul className="list-group">
                    {areas.map((area) => (
                        <li key={area.id} className="list-group-item">
                            <h5 className="mb-1">{area.name}</h5>
                            <p className="text-muted">{area.email}</p>
                        </li>
                    ))}
                </ul>
            </div>
            <button 
                onClick={handleLoadMore} 
                className="btn btn-secondary w-100 mt-3"
            >
            </button>
        </div>
    </div>
  )
}

export default ListaAreasNaturales
