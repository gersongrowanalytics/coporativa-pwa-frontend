import React from 'react'
import {useDispatch} from "react-redux";
import {
    userSignIn
} from "../../../appRedux/actions/Auth";
import {EditarTelefonoUsuarioPerfilReducer} from '../../../appRedux/actions/Perfil/Perfil'
import {Button} from 'antd'

const BtnGuardarTelefono = (props) => {

    const dispatch = useDispatch();

    const EditarTelefonoUsuario = async () => {
        props.CargandoEditarTelefono(true)
        let action = await dispatch(EditarTelefonoUsuarioPerfilReducer(
            props.txt_input_paistelefono,
            props.txt_input_telefono
        ))
        
        if(action == true){
            props.ActivarCambioTelefono()
            await dispatch(
                userSignIn(
                    {
                        usuario      : localStorage.getItem('Log-usuario'),
                        contrasena   : localStorage.getItem('Log-contrasenia'),
                        pais         : localStorage.getItem('Log-pais'),
                        posicionPais : localStorage.getItem('Log-posicionPais'),
                    }
                )
            );
            props.CargandoEditarTelefono(false)
        }else{
            props.CargandoEditarTelefono(false)
        }
    }

    return (
        <Button 
            onClick={() => EditarTelefonoUsuario()}
            id="Btn-Guardar-Edicion-Perfil"
            loading={props.cargandoGuardarTelefono}
        >
            Guardar
        </Button> 
    )
}

export default BtnGuardarTelefono
