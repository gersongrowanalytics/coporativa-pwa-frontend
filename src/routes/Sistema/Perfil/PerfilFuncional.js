import React from 'react'
import Perfil from './Perfil'
import {useDispatch, useSelector} from 'react-redux'

const PerfilFuncional = () => {

    const { 
        datosUsuarioLogeado
    } = useSelector(({auth}) => auth);

    return (
        <Perfil 
            datosUsuarioLogeado = {datosUsuarioLogeado}
        />
    )
}

export default PerfilFuncional
