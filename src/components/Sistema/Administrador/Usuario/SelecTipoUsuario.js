import React from 'react'
import {useDispatch, useSelector} from "react-redux";
import {ObtenerListaUsuariosReducer} from "../../../../appRedux/actions/ControlAcceso/Usuarios/Usuarios";

const SelecTipoUsuario = (props) => {

    const dispatch = useDispatch();

    const {
        listaTiposUsuarios
    } = useSelector(({controlesAccesosTiposUsuarios}) => controlesAccesosTiposUsuarios);

    const seleccionatTipoUsuario = (e) => {
        props.cambiarTpuidSeleccionado(e)
        dispatch(ObtenerListaUsuariosReducer(props.txtBuscar, e))
    }

    return (
        <div >
            <select id="Contenedor-Btn-Desplegable-Usuario-Administrador" onChange={(e) => seleccionatTipoUsuario(e.target.value)}>
                <option value={"0"}>Tipo de Usuario</option>
                {
                    listaTiposUsuarios.map((tipousuario) => {
                        return (
                            <option 
                                value={tipousuario.tpuid}
                                id="Option-Btn-Desplegable-Usuario-Administrador">{tipousuario.tpunombre}</option>
                        )
                    })
                }
            </select>
        </div>
    )
}

export default SelecTipoUsuario
