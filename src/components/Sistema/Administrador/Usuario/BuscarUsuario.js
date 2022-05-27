import React from 'react'
import IconoLupa from '../../../../assets/images/iconos/Tabla/lupa.svg'
import {useDispatch} from "react-redux";
import {ObtenerListaUsuariosReducer} from "../../../../appRedux/actions/ControlAcceso/Usuarios/Usuarios";

const BuscarUsuario = (props) => {

    const dispatch = useDispatch();

    const buscarTxtBuscar = (e) => {
        props.cambiarTxtBuscar(e)
        // dispatch(ObtenerListaUsuariosReducer(e, props.tpuidseleccionado))
    }


    return (
        <div id="Contenedor-Buscador-Administrador-Usuarios" >
            <img src={IconoLupa} id="Icono-Lupa-Control-Archivos" />
            <input 
                id="Input-Buscador-Control-Archivos" 
                placeholder="Buscar"
                autoComplete={"off"} 
                // value={txtBuscar}
                onChange={(e) => buscarTxtBuscar(e.target.value)}
            />
        </div>
    )
}

export default BuscarUsuario
