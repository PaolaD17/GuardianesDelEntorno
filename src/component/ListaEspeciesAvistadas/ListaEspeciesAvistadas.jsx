import React from 'react'
import { useState } from "react";

const ListaEspeciesAvistadas = () => {
    const [especies, setEspecies] = useState([]);
    const [error, setError] = useState("");
    const [page, setPage] = useState(1);
    const pageSize = 10;

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
    <div className="container mt-4">
        <div className="card shadow-lg">
            <div className="card-body">
                <h2 className="card-title text-center mb-4">Lista de Especies Avistadas</h2>
                
                {error && <div className="alert alert-danger text-center">{error}</div>}
                
                <ul className="list-group">
                    {especies.map((especie) => (
                        <li key={especie.id} className="list-group-item">
                            <h5 className="mb-1">{especie.name}</h5>
                            <p className="text-muted">{especie.email}</p>
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

export default ListaEspeciesAvistadas
