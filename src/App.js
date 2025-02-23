import React, { useState } from "react";
import { Routes, Route } from "react-router-dom"; // Solo importar Routes y Route
import ListaEspeciesAvistadas from "./component/ListaEspeciesAvistadas/ListaEspeciesAvistadas";
import Login from "./component/login";
import Registro from "./component/registro";
import PantallaPrincipal from "./component/pantallaPrincipal"; // Importar el componente PantallaPrincipal
import ListaAreasNaturales from "./component/ListaAreasNaturales/ListaAreasNaturales";

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
    </Routes>
  );
}

export default App;


