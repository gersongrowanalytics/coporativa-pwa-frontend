import {
    CARGANDO_CREAR_ARCHIVO_DATA_CONTROL_DATA,
    CARGANDO_DATA_ARCHIVO_DATA_CONTROL_DATA,
    OBTENER_DATA_ARCHIVO_DATA_CONTROL_DATA,
    SELECCIONAR_DATA_ARCHIVO_DATA_CONTROL_DATA
} from "../../../../constants/SistemaTypes";
import config from '../../../../config'
import {message} from "antd"
import { estadoRequestReducer } from "../../../../appRedux/actions/EstadoRequest"
import axios from 'axios'

export const CrearDataReducer = (formData) => async (dispatch, getState) => {

    dispatch({
        type: CARGANDO_CREAR_ARCHIVO_DATA_CONTROL_DATA,
        payload: true
    })

    await axios.post(config.api+'administrador/controlData/crearArchivoData', formData,{
        mode:'cors',
        headers: {
            'Accept' : 'application/json',
            'content-type': 'multipart/form-data',
            'api-token': localStorage.getItem('usutoken'),
        }
    })
    .then(data => {
        let datos = data.data
        console.log(datos)
		if(datos.respuesta == true){
            message.success(datos.mensaje, 5)
        }else{
            message.error(datos.mensaje, 10)
        }
	}).catch((error)=> {
        console.log(error)
    })
    
    dispatch({
        type: CARGANDO_CREAR_ARCHIVO_DATA_CONTROL_DATA,
        payload: false
    })

    dispatch(ObtenerDataReducer())
}

export const ObtenerDataReducer = () => async (dispatch, getState) => {
    dispatch({
        type: CARGANDO_DATA_ARCHIVO_DATA_CONTROL_DATA,
        payload: true
    })

	await fetch(config.api+'administrador/controlData/mostrarArchivoData',
		{
			mode:'cors',
			method: 'POST',
			body: JSON.stringify({
                'api-token'	   : localStorage.getItem('usutoken')
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
                    type: OBTENER_DATA_ARCHIVO_DATA_CONTROL_DATA,
                    payload: data.datos
                })
            }else{
                message.error(data.mensaje)
                dispatch({
                    type: OBTENER_DATA_ARCHIVO_DATA_CONTROL_DATA,
                    payload: data.datos
                })
                
            }
		}
	}).catch((error)=> {
        console.log(error)
	})

    dispatch({
        type: CARGANDO_DATA_ARCHIVO_DATA_CONTROL_DATA,
        payload: false
    })
}

export const SeleccionarArchivosReducer = (idArchivo, seleccionar, limpiar) => (dispatch, getState) => {

    if(limpiar == true){
        dispatch({
            type: SELECCIONAR_DATA_ARCHIVO_DATA_CONTROL_DATA,
            payload: []
        })
    }else{
        let archivosSeleccionados = getState().controlData.archivosSeleccionados

        if(archivosSeleccionados.length > 0){
            let encontrado = false
            archivosSeleccionados.map((archivo, posicion) => {
                if(archivo == idArchivo){
                    encontrado = true
                    archivosSeleccionados.splice(posicion, 1)
                }
            })

            if(encontrado == false){
                archivosSeleccionados.push(idArchivo)
            }
        }else{
            archivosSeleccionados.push(idArchivo)
        }

        dispatch({
            type: SELECCIONAR_DATA_ARCHIVO_DATA_CONTROL_DATA,
            payload: archivosSeleccionados
        })
    }


}

export const EliminarDataReducer = () => async (dispatch, getState) => {

    const archivosSeleccionados = getState().controlData.archivosSeleccionados

    await fetch(config.api+'administrador/controlData/eliminarArchivoData',
		{
			mode:'cors',
			method: 'POST',
			body: JSON.stringify({
                'api-token'	   : localStorage.getItem('usutoken'),
                'idsArchivos'  : archivosSeleccionados
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
                message.success(data.mensaje, 5)
            }else{
                message.error(data.mensaje, 10)
            }
            dispatch({
                type: OBTENER_DATA_ARCHIVO_DATA_CONTROL_DATA,
                payload: []
            })
		}
	}).catch((error)=> {
        console.log(error)
	})

    await dispatch(SeleccionarArchivosReducer(0, false, true)) // reiniciar data de archivos seleccionados
    await dispatch(ObtenerDataReducer())
    return true
}

export const EliminarDataUnicoReducer = (idArchivo) => async (dispatch, getState) => {

    const archivosSeleccionados = getState().controlData.archivosSeleccionados

    await fetch(config.api+'administrador/controlData/eliminarArchivoData',
		{
			mode:'cors',
			method: 'POST',
			body: JSON.stringify({
                'api-token'	   : localStorage.getItem('usutoken'),
                'idsArchivos'  : [idArchivo]
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
                message.success(data.mensaje, 5)
            }else{
                message.error(data.mensaje, 10)
            }
            dispatch({
                type: OBTENER_DATA_ARCHIVO_DATA_CONTROL_DATA,
                payload: []
            })
		}
	}).catch((error)=> {
        console.log(error)
	})

    await dispatch(SeleccionarArchivosReducer(0, false, true)) // reiniciar data de archivos seleccionados
    await dispatch(ObtenerDataReducer())
    return true
}

export const SeleccionarArchivoDescargarDataReducer = (nuevaposicion) => async (dispatch, getState) => {

    let dataArchivos = getState().controlData.dataArchivos

    // await dataArchivos.map((archivo, posicion) => {
    //     if(nuevaposicion == posicion){
            dataArchivos[nuevaposicion]['descargarData'] = !dataArchivos[nuevaposicion]['descargarData']
        // }else{
            // dataArchivos[posicion]['descargarData'] = false
        // }
    // })

    dispatch({
        type: OBTENER_DATA_ARCHIVO_DATA_CONTROL_DATA,
        payload: dataArchivos
    })

    return true
}