import React from 'react';
import { Link } from 'react-router-dom';

const PantallaPrincipal = () => {
  return (
    <div className="w-100 mb-4 text-center">
        <img
          src="/Guardianes (1)-Photoroom.png"  // Asegúrate de que la imagen esté en la carpeta 'public'
          alt="Guardianes del Entorno"
          className="img-fluid"  // La imagen se ajusta al tamaño y se separa un poco del formulario
          style={{ maxWidth: "540px" }}  // Puedes ajustar el tamaño de la imagen aquí
        />
        
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
        <div className="col-6 mb-3">
        <Link to="/AgregarDatosNuevos" className="btn btn-secondary btn-lg w-100">
            Ingresar datos nuevos
        </Link>
        </div>
    </div>
    </div>

    </div>
  );
};

export default PantallaPrincipal;
