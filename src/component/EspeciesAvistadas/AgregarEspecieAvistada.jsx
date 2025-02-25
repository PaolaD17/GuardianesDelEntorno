import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Para redirigir
import "bootstrap/dist/css/bootstrap.min.css";
// import { Link } from "react-router-dom"; // Usamos Link en lugar de <a>

const AgregarAreaNatural = () => {
    const [nombreCientifico, setNombreCientifico] = useState("");
    const [categoria, setCategoria] = useState("");
    const [areaNatural, setAreaNatural] = useState("");
    const [areas, setAreas] = useState([]); // Lista de áreas naturales obtenidas
    const [estado, setEstado] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

useEffect(() => {
    // Obtener la lista de áreas naturales desde la API
    const fetchAreasNaturales = async () => {
        try {
            const response = await fetch(
            "https://mammal-excited-tarpon.ngrok-free.app/api/natural-area/list?secret=TallerReact2025!&page=1&pageSize=10"
            );
            const data = await response.json();

            if (Array.isArray(data)) {
            setAreas(data); // Guardamos las áreas en el estado
            }
        } catch (error) {
            setError("Error obteniendo áreas naturales.");
            console.error("Error obteniendo áreas naturales:", error);
        }
    };

    fetchAreasNaturales();
}, []);

    const navigate = useNavigate(); // Hook para redirigir

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!nombreCientifico || !categoria || !areaNatural || !estado) {
        setError("Por favor, complete todos los campos.");
        return;
        }
        setError("");
        setMessage("");

        try {
        const response = await fetch(
            "https://mammal-excited-tarpon.ngrok-free.app/api/natural-area/insert?secret=TallerReact2025!",
            {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ nombreCientifico, categoria, areaNatural, estado }),
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
        <div className="d-flex flex-column justify-content-center align-items-center vh-100">
            {/* Imagen centrada arriba */}
            <div className="fixed-top bg-white text-center py-2 shadow">
                <img
                src="/TituloSecundario.png"  // Asegúrate de que la imagen esté en la carpeta 'public'
                alt="Titulo de la web"
                className="img-fluid"  // La imagen se ajusta al tamaño y se separa un poco del formulario
                style={{ maxWidth: "750px" }}  // Puedes ajustar el tamaño de la imagen aquí
                />
            </div>

            {/* Contenedor del formulario centrado abajo */}
            <div className="card p-4 shadow-lg" style={{ width: "350px" }}>
                <h2 className="text-center mb-3">Ingresar especie avistada</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                {message && <div className="alert alert-success">{message}</div>}

                <form onSubmit={handleSubmit}>
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
                    <label className="form-label">Área natural</label>
                    <select
                        className="form-control"
                        value={areaNatural}
                        onChange={(e) => setAreaNatural(e.target.value)}
                        required
                    >
                        <option value="">Seleccione una opción</option>
                        {areas.map((area) => (
                        <option key={area.id} value={area.nombre}>
                            {area.nombre}
                        </option>
                        ))}
                    </select>
                    {error && <div className="alert alert-danger">{error}</div>}
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
                <button type="submit" className="btn btn-primary w-100">
                    Agregar
                </button>
                </form>
            </div>
        </div>
    );
};

export default AgregarAreaNatural;