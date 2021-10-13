import config from '../../../config'
import { estadoRequestReducer } from "../../../appRedux/actions/EstadoRequest"
import {message} from "antd"

export const EditarImagenUsuarioPerfilReducer = (imagen) => async (dispatch, getState) => {

    let respuesta = true

    await fetch(config.api+'perfil/editar/editar-imagen',
		{
			mode:'cors',
			method: 'POST',
			body: JSON.stringify({
                'api-token'	   : localStorage.getItem('usutoken'),
                'imagen'       : imagen
            }),
			headers: {
				'Accept' 	   : 'application/json',
				'Content-type' : 'application/json',
				'api-token'	   : localStorage.getItem('usutoken')
			}
		}
	)
	.then( async res => {
        
        if(await dispatch(estadoRequestReducer(res.status))){
            return res.json()
        }
		
	})
	.then(data => {

        const estadoRequest = getState().estadoRequest.init_request

		if(estadoRequest == true){

            if(data.respuesta == true){
                
                localStorage.setItem('usuimagen', data.imagen)
                window.location.href = window.location.href;
                window.location.replace('');

            }else{
                
            }
		}
	}).catch((error)=> {
        console.log("EditarImagenUsuarioPerfilReducer: "+error)
	});

    return respuesta
    
}

export const EditarContraseniaUsuarioPerfilReducer = (anteriorContrasenia, nuevaContrasenia) => async (dispatch, getState) => {

	let respuesta = false

    await fetch(config.api+'perfil/editar/editar-contrasenia',
		{
			mode:'cors',
			method: 'POST',
			body: JSON.stringify({
                'api-token'	   : localStorage.getItem('usutoken'),
                'anteriorContrasenia' : anteriorContrasenia,
                'nuevaContrasenia'    : nuevaContrasenia
            }),
			headers: {
				'Accept' 	   : 'application/json',
				'Content-type' : 'application/json',
				'api-token'	   : localStorage.getItem('usutoken')
			}
		}
	)
	.then( async res => {
        
        if(await dispatch(estadoRequestReducer(res.status))){
            return res.json()
        }
		
	})
	.then(data => {

        const estadoRequest = getState().estadoRequest.init_request

		if(estadoRequest == true){

            if(data.respuesta == true){
                
                message.success(data.mensaje)
				respuesta = true

            }else{
                message.error(data.mensaje)
            }
		}
	}).catch((error)=> {
        console.log("EditarContraseniaUsuarioPerfilReducer: "+error)
	});

    return respuesta


}

export const EditarCumpleaniosUsuarioPerfilReducer = ( cumpleanios ) => async (dispatch, getState) => {

	let respuesta = false

    await fetch(config.api+'perfil/editar/editar-cumpleanios',
		{
			mode:'cors',
			method: 'POST',
			body: JSON.stringify({
                'api-token'	   : localStorage.getItem('usutoken'),
                'cumpleanios' : cumpleanios
            }),
			headers: {
				'Accept' 	   : 'application/json',
				'Content-type' : 'application/json',
				'api-token'	   : localStorage.getItem('usutoken')
			}
		}
	)
	.then( async res => {
        
        if(await dispatch(estadoRequestReducer(res.status))){
            return res.json()
        }
		
	})
	.then(data => {

        const estadoRequest = getState().estadoRequest.init_request

		if(estadoRequest == true){

            if(data.respuesta == true){
                
                message.success(data.mensaje)
				respuesta = true

            }else{
                message.error(data.mensaje)
            }
		}
	}).catch((error)=> {
        console.log("EditarCumpleaniosUsuarioPerfilReducer: "+error)
	});

    return respuesta


}

export const EditarTelefonoUsuarioPerfilReducer = ( usuextension, telefono) => async (dispatch, getState) => {

	let respuesta = false

    await fetch(config.api+'perfil/editar/editar-telefono',
		{
			mode:'cors',
			method: 'POST',
			body: JSON.stringify({
                'api-token'	   : localStorage.getItem('usutoken'),
                'usuextension' : usuextension,
                'telefono' 	   : telefono
            }),
			headers: {
				'Accept' 	   : 'application/json',
				'Content-type' : 'application/json',
				'api-token'	   : localStorage.getItem('usutoken')
			}
		}
	)
	.then( async res => {
        
        if(await dispatch(estadoRequestReducer(res.status))){
            return res.json()
        }
		
	})
	.then(data => {

        const estadoRequest = getState().estadoRequest.init_request

		if(estadoRequest == true){

            if(data.respuesta == true){
                
                message.success(data.mensaje)
				respuesta = true

            }else{
                message.error(data.mensaje)
            }
		}
	}).catch((error)=> {
        console.log("EditarTelefonoUsuarioPerfilReducer: "+error)
	});

    return respuesta


}