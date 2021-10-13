import React from 'react'
import {Button} from 'antd'
import {EditarCumpleaniosUsuarioPerfilReducer} from '../../../appRedux/actions/Perfil/Perfil'
import {useDispatch} from "react-redux";
import {
    userSignIn
} from "../../../appRedux/actions/Auth";

const BtnGuardarCumpleanios = (props) => {

    const dispatch = useDispatch();

    const EditarCumpleaniosUsuario = async () => {
        props.CargandoEditarCumpleanios(true)
        let action = await dispatch(EditarCumpleaniosUsuarioPerfilReducer(
            props.txt_input_cumpleanios,
        ))
        props.CargandoEditarCumpleanios(false)
        if(action == true){
            props.ActivarCambioCumpleanios()
            dispatch(
                userSignIn(
                    {
                        usuario      : localStorage.getItem('Log-usuario'),
                        contrasena   : localStorage.getItem('Log-contrasenia'),
                        pais         : localStorage.getItem('Log-pais'),
                        posicionPais : localStorage.getItem('Log-posicionPais'),
                    }
                )
            );
        }
    }

    return (
        <Button 
            id="Btn-Guardar-Edicion-Perfil"
            onClick={() => EditarCumpleaniosUsuario()}
            loading={props.cargandoGuardarCumpleanios}
        >
            Guardar
        </Button>
    )
}

export default BtnGuardarCumpleanios
