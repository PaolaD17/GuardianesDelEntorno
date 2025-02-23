import React, { useState } from "react";
import { Routes, Route } from "react-router-dom"; // Solo importar Routes y Route
import Login from "./component/Login/login";
import Registro from "./component/Registro/registro";
import PantallaPrincipal from "./component/PantallaPrincipal/pantallaPrincipal"; // Importar el componente PantallaPrincipal
import ListaAreasNaturales from "./component/AreasNaturales/ListaAreasNaturales";
import ListaEspeciesAvistadas from "./component/EspeciesAvistadas/ListaEspeciesAvistadas";
import AgregarAreaNatural from "./component/AreasNaturales/AgregarAreaNatural";
import AgregarEspecieAvistada from "./component/EspeciesAvistadas/AgregarEspecieAvistada";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Routes>
      {/* Ruta para Login */}
      <Route path="/" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
      
      {/* Ruta para Registro */}
      <Route path="/registro" element={<Registro />} />
      
      {/* Ruta para Pantalla Principal, solo accesible si está autenticado */}
      <Route
        path="/pantallaPrincipal"
        element={isAuthenticated ? <PantallaPrincipal /> : <Login setIsAuthenticated={setIsAuthenticated} />}
      />

      {/* Ruta para la lista de especies, solo accesible si está autenticado */}
      <Route
        path="/ListaEspeciesAvistadas"
        element={isAuthenticated ? <ListaEspeciesAvistadas /> : <Login setIsAuthenticated={setIsAuthenticated}/>}
      />

      {/* Ruta para la lista de áreas, solo accesible si está autenticado */}
      <Route
        path="/ListaAreasNaturales"
        element={isAuthenticated ? <ListaAreasNaturales /> : <Login setIsAuthenticated={setIsAuthenticated}/>}
      />

      {/* Ruta para agregar áreas naturales, solo accesible si está autenticado */}
      <Route
        path="/AgregarAreaNatural"
        element={isAuthenticated ? <AgregarAreaNatural /> : <Login setIsAuthenticated={setIsAuthenticated}/>}
      />
      
      {/* Ruta para agregar especies avistadas, solo accesible si está autenticado */}
      <Route
        path="/AgregarEspecieAvistada"
        element={isAuthenticated ? <AgregarEspecieAvistada /> : <Login setIsAuthenticated={setIsAuthenticated}/>}
      />
    </Routes>
  );
}

export default App;


