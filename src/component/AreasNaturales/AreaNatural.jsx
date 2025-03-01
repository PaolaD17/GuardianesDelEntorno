// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import AreaNatural from "./components/AreaNatural";


// const AreaNatural = () => {
//     const { id } = useParams();  // Obtiene el ID desde la URL
//     const [area, setArea] = useState(null);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchArea = async () => {
//             try {
//                 const apiUrl = "https://mammal-excited-tarpon.ngrok-free.app/api/natural-area/${id}?secret=TallerReact2025!";

//                 const response = await fetch(apiUrl);

//                 if (!response.ok) {
//                     throw new Error(`Error en la API: ${response.status}`);
//                 }

//                 const data = await response.json();
//                 setArea(data);
//             } catch (err) {
//                 console.error("Error al obtener los detalles del área:", err);
//                 setError("No se pudo cargar el área natural.");
//             }
//         };

//         fetchArea();
//     }, [id]);  // Se ejecuta cuando cambia el ID

//     if (error) {
//         return <div className="alert alert-danger">{error}</div>;
//     }

//     if (!area) {
//         return <p>Cargando...</p>;
//     }

//     return (
//         <div>
//             <h1>{area.name}</h1>
//             <p>{area.description}</p>
//         </div>
//     );
// };

// export default AreaNatural;