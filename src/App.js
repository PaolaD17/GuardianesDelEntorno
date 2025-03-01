import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./userSlice";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Login from "./component/Login/login";
import Registro from "./component/Registro/registro";
import PantallaPrincipal from "./component/PantallaPrincipal/pantallaPrincipal";
import ListaAreasNaturales from "./component/AreasNaturales/ListaAreasNaturales";
import ListaEspeciesAvistadas from "./component/EspeciesAvistadas/ListaEspeciesAvistadas";
import AgregarAreaNatural from "./component/AreasNaturales/AgregarAreaNatural";
import AgregarEspecieAvistada from "./component/EspeciesAvistadas/AgregarEspecieAvistada";
import MisAreasNaturales from "./component/AreasNaturales/MisAreasNaturales";
import MisEspeciesAvistadas from "./component/EspeciesAvistadas/MisEspeciesAvistadas";
import ListaActividades from "./component/Actividades/ListaActividades";
import MisActividades from "./component/Actividades/MisActividades";
import AgregarActividad from "./component/Actividades/AgregarActividad";
import AreaNatural from "./component/AreasNaturales/AreaNatural";
import ListaUsuarios from "./component/Usuarios/ListaUsuarios";


function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      dispatch(setUser(JSON.parse(storedUser)));
      setIsAuthenticated(true);
    }
  }, [dispatch]);

  return (
    <Routes>
      {/* Login */}
      <Route
        path="/"
        element={isAuthenticated ? <Navigate to="/pantallaPrincipal" /> : <Login setIsAuthenticated={setIsAuthenticated} />}
      />

      {/* Registro */}
      <Route path="/registro" element={<Registro />} />

      {/* Pantalla Principal */}
      <Route
        path="/pantallaPrincipal"
        element={
          isAuthenticated ? (
            <PantallaPrincipal setIsAuthenticated={setIsAuthenticated} />
          ) : (
            <Navigate to="/" />
          )
        }
      />

      {/* Lista de Especies */}
      <Route
        path="/ListaEspeciesAvistadas"
        element={
          isAuthenticated ? (
            <ListaEspeciesAvistadas setIsAuthenticated={setIsAuthenticated} />
          ) : (
            <Navigate to="/" />
          )
        }
      />

      {/* Lista de MIS especies */}
      <Route
        path="/MisEspeciesAvistadas"
        element={
          isAuthenticated ? (
            <MisEspeciesAvistadas setIsAuthenticated={setIsAuthenticated} />
          ) : (
            <Navigate to="/" />
          )
        }
      />

      {/* Lista de Áreas */}
      <Route
        path="/ListaAreasNaturales"
        element={
          isAuthenticated ? (
            <ListaAreasNaturales setIsAuthenticated={setIsAuthenticated} />
          ) : (
            <Navigate to="/" />
          )
        }
      />
      {/* Lista de MIS Áreas */}
      <Route
        path="/MisAreasNaturales"
        element={
          isAuthenticated ? (
            <MisAreasNaturales setIsAuthenticated={setIsAuthenticated} />
          ) : (
            <Navigate to="/" />
          )
        }
      />

      {/* Agregar Área Natural */}
      <Route
        path="/AgregarAreaNatural"
        element={
          isAuthenticated ? (
            <AgregarAreaNatural setIsAuthenticated={setIsAuthenticated} />
          ) : (
            <Navigate to="/" />
          )
        }
      />

      {/* Agregar Especie Avistada */}
      <Route
        path="/AgregarEspecieAvistada"
        element={
          isAuthenticated ? (
            <AgregarEspecieAvistada setIsAuthenticated={setIsAuthenticated} />
          ) : (
            <Navigate to="/" />
          )
        }
      />
      {/* Lista Actividades */}
      <Route
        path="/ListaActividades"
        element={
          isAuthenticated ? (
            <ListaActividades setIsAuthenticated={setIsAuthenticated} />
          ) : (
            <Navigate to="/" />
          )
        }
      />
      {/* Lista MIS actividades */}
      <Route
        path="/MisActividades"
        element={
          isAuthenticated ? (
            <MisActividades setIsAuthenticated={setIsAuthenticated} />
          ) : (
            <Navigate to="/" />
          )
        }
      />
      {/* Agregar actividad */}
      <Route
        path="/AgregarActividad"
        element={
          isAuthenticated ? (
            <AgregarActividad setIsAuthenticated={setIsAuthenticated} />
          ) : (
            <Navigate to="/" />
          )
        }
      />
      <Route
        path="/ListaUsuarios"
        element={
          isAuthenticated ? (
            <ListaUsuarios setIsAuthenticated={setIsAuthenticated} />
          ) : (
            <Navigate to="/" />
          )
        }
      />

      <Route
        path="/AreaNatural/:id"
        element={isAuthenticated ? <AreaNatural /> : <Navigate to="/" />}
      />

    </Routes>
  );
}

export default App;