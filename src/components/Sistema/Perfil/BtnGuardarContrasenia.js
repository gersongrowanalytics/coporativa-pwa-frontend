import React from 'react'
import {Button} from 'antd'
import {EditarContraseniaUsuarioPerfilReducer} from '../../../appRedux/actions/Perfil/Perfil'
import {useDispatch} from "react-redux";

const BtnGuardarContrasenia = (props) => {
    
    const dispatch = useDispatch();

    const EditarContraseniaUsuario = async () => {
        props.CargandoEditarContrasenia(true)
        let action = await dispatch(EditarContraseniaUsuarioPerfilReducer(
            props.txt_input_anteriorContrasenia,
            props.txt_input_nuevaContrasenia
        ))
        props.CargandoEditarContrasenia(false)
        if(action == true){
            props.ActivarCambioContrasenia()
        }
    }

    return (
        <Button 
            id="Btn-Guardar-Edicion-Perfil"
            onClick={() => EditarContraseniaUsuario()}
            loading={props.cargandoGuardarContrasenia}
        >
            Guardar
        </Button>
    )
}

export default BtnGuardarContrasenia
