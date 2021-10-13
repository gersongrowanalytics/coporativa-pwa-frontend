import {
    CARGANDO_TABLA_CONTROL_ARCHIVOS,
    OBTENER_ARCHIVOS_CONTROL_ARCHIVOS,
} from "../../../constants/ControlArchivos/ControlArchivos";
import config from '../../../config'
import {message} from "antd"
import { estadoRequestReducer } from "../../../appRedux/actions/EstadoRequest"

export const ObtenerArchivosReducer = (texto, fechaInicio, fechaFinal) => async (dispatch, getState) => {

    dispatch({
        type: CARGANDO_TABLA_CONTROL_ARCHIVOS,
        payload: true
    })

	await fetch(config.api+'control-archivos/mostrar-archivos',
		{
			mode:'cors',
			method: 'POST',
			body: JSON.stringify({
                'api-token'	: localStorage.getItem('usutoken'),
                'txtBuscar' : texto,
                'fechaInicio' : fechaInicio,
                'fechaFinal'  : fechaFinal
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
                
                dispatch({
                    type: OBTENER_ARCHIVOS_CONTROL_ARCHIVOS,
                    payload: data.datos
                })
            }else{
                message.error(data.mensaje)

                dispatch({
                    type: OBTENER_ARCHIVOS_CONTROL_ARCHIVOS,
                    payload: data.datos
                })
                
            }
		}
	}).catch((error)=> {
        console.log(error)
	});

    dispatch({
        type: CARGANDO_TABLA_CONTROL_ARCHIVOS,
        payload: false
    })
}