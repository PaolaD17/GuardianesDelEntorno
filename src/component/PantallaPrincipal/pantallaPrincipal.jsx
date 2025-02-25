import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import userSlice from "../../userSlice";

const PantallaPrincipal = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
      <div className="row w-100 justify-content-center">
        <div className="col-6 mb-3">
        <Link to="/ListaAreasNaturales" className="btn btn-primary btn-lg w-100">
            ÁREAS NATURALES
        </Link>
        </div>
        <div className="col-6 mb-3">
        <Link to="/ListaEspeciesAvistadas" className="btn btn-secondary btn-lg w-100">
            ESPECIES AVISTADAS
        </Link>
        </div>
      </div>
    </div>
  );
};

export default PantallaPrincipal;