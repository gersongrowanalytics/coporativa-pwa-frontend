import React from "react";
import loader from "../../assets/images/icono-cargando.svg"

const CircularProgress = ({className}) => <div className={`loader ${className}`}>
  <img src={loader} alt="loader"/>
</div>;
export default CircularProgress;
