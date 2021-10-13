import React from 'react'
import IconoAdministradorUsuario from '../../../assets/images/iconos/Administrador/usuario.png'
import IconoAdministradorPermiso from '../../../assets/images/iconos/Administrador/permisos.png'
import IconoAdministradorTipoUsuario from '../../../assets/images/iconos/Administrador/tipoUsuario.png'
import {Link} from "react-router-dom"
import '../../../styles/Sistema/components/Administrador/ListaAdministrador.css'

const ListaAdministrador = (props) => {
    return (
        <div>
            <Link to="/sistema/administrador/tipos-usuarios">
                <div id={props.esTipoUsuario == true ?"Fila-Lista-Administrador-Seleccionado" :"Fila-Lista-Administrador"}>
                    <img 
                        src={IconoAdministradorTipoUsuario} 
                        id="Icono-Lista-Administrador" /> 
                    <span id="Texto-Lista-Administrador">Tipos de Usuarios</span>
                </div>
            </Link>
            <Link to="/sistema/administrador/usuarios">
                <div id={props.esUsuario == true ?"Fila-Lista-Administrador-Seleccionado" :"Fila-Lista-Administrador"}>
                    <img 
                        src={IconoAdministradorUsuario} 
                        id="Icono-Lista-Administrador" /> 
                    <span id="Texto-Lista-Administrador">Usuarios</span>
                </div>
            </Link>
            <Link to="/sistema/administrador/permisos">
                <div id={props.esPermiso == true ?"Fila-Lista-Administrador-Seleccionado" :"Fila-Lista-Administrador"}>
                    <img 
                        src={IconoAdministradorPermiso} 
                        id="Icono-Lista-Administrador" /> 
                    <span id="Texto-Lista-Administrador">Permisos</span>
                </div>
            </Link>

            <Link to="/sistema/administrador/control-data">
                <div id={props.esControlData == true ?"Fila-Lista-Administrador-Seleccionado" :"Fila-Lista-Administrador"}>
                    <img 
                        src={IconoAdministradorPermiso} 
                        id="Icono-Lista-Administrador" /> 
                    <span id="Texto-Lista-Administrador">Control Data</span>
                </div>
            </Link>

            <Link to="/sistema/administrador/modulos">
                <div id={props.esModulo == true ?"Fila-Lista-Administrador-Seleccionado" :"Fila-Lista-Administrador"}>
                    <img 
                        src={IconoAdministradorPermiso} 
                        id="Icono-Lista-Administrador" /> 
                    <span id="Texto-Lista-Administrador">Modulos</span>
                </div>
            </Link>
        </div>
    )
}

export default ListaAdministrador
