import {
    OBTENER_MODULOS_ADMINISTRACION,
    CARGANDO_DATA_MODULOS_ADMINISTRACION,
    CARGANDO_NUEVO_MODULO_ADMINISTRACION,
    CARGANDO_NUEVO_SUBMODULO_ADMINITRACION
} from "../../../../constants/SistemaTypes";
import config from '../../../../config'
import {message, notification } from "antd"
import { estadoRequestReducer } from "../../../../appRedux/actions/EstadoRequest"
import axios from 'axios'
import {ObtenerModulosUsuarioReducer} from '../../../../appRedux/actions/Usuarios/Usuarios'
import {
    mostrarPaisesReducer
} from '../../Auth'

export const ObtenerDataReducer = () => async (dispatch, getState) => {
    dispatch({
        type: CARGANDO_DATA_MODULOS_ADMINISTRACION,
        payload: true
    })

	await fetch(config.api+'administrador/modulos/mostrarModulos',
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
                    type: OBTENER_MODULOS_ADMINISTRACION,
                    payload: data.datos
                })
            }else{
                message.error(data.mensaje)
                dispatch({
                    type: OBTENER_MODULOS_ADMINISTRACION,
                    payload: data.datos
                })
                
            }
		}
	}).catch((error)=> {
        console.log(error)
	})

    dispatch(ObtenerModulosUsuarioReducer())

    dispatch({
        type: CARGANDO_DATA_MODULOS_ADMINISTRACION,
        payload: false
    })

    return true
}

export const AbrirModuloReducer = (posicion, abrir) => (dispatch, getState) => {
    let dataModulos = getState().admModulos.dataModulos
    dataModulos[posicion]['abierto'] = abrir 
    dispatch({
        type: OBTENER_MODULOS_ADMINISTRACION,
        payload: dataModulos
    })
}

export const CrearModuloReducer = (formData) => async (dispatch, getState) => {

    dispatch({
        type: CARGANDO_NUEVO_MODULO_ADMINISTRACION,
        payload: true
    })

    await axios.post(config.api+'administrador/modulos/crearModulos', formData,{
        mode:'cors',
        headers: {
            'Accept' : 'application/json',
            'content-type': 'multipart/form-data',
            'api-token': localStorage.getItem('usutoken'),
        }
    })
    .then(data => {
        let datos = data.data
        // console.log(datos)
		if(datos.respuesta == true){
            message.success(datos.mensaje, 5)
        }else{
            message.error(datos.mensaje, 10)
        }
	}).catch((error)=> {
        console.log(error)
    })
    
    dispatch({
        type: CARGANDO_NUEVO_MODULO_ADMINISTRACION,
        payload: false
    })

    dispatch(ObtenerDataReducer())
}

export const CrearSubModuloReducer = (data) => async (dispatch, getState) => {

    dispatch({
        type: CARGANDO_NUEVO_SUBMODULO_ADMINITRACION,
        payload: true
    })

    await fetch(config.api+'administrador/modulos/crearSubModulos',
		{
			mode:'cors',
			method: 'POST',
			body: JSON.stringify(data),
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
		}
	}).catch((error)=> {
        console.log(error)
	})

    dispatch({
        type: CARGANDO_NUEVO_SUBMODULO_ADMINITRACION,
        payload: false
    })

    await dispatch(ObtenerDataReducer())
    return true
}

export const CargandoSubModulo = (posicionModulo, posicionSubModulo) => (dispatch, getState) => {
    let dataModulos = getState().admModulos.dataModulos

    if(dataModulos[posicionModulo]['submodulos'][posicionSubModulo]['cargando'] == true){
        dataModulos[posicionModulo]['submodulos'][posicionSubModulo]['cargando'] = false
    }else{
        dataModulos[posicionModulo]['submodulos'][posicionSubModulo]['cargando'] = true
    }

    dispatch({
        type: OBTENER_MODULOS_ADMINISTRACION,
        payload: dataModulos
    })

}

export const EliminarSubModuloReducer = (data) => async (dispatch, getState) => {
    await fetch(config.api+'administrador/modulos/eliminarSubModulos',
		{
			mode:'cors',
			method: 'POST',
			body: JSON.stringify(data),
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
		}
	}).catch((error)=> {
        console.log(error)
	})

    await dispatch(ObtenerDataReducer())
    return true
}

export const EliminarModuloReducer = (data) => async (dispatch, getState) => {
    await fetch(config.api+'administrador/modulos/eliminarModulo',
		{
			mode:'cors',
			method: 'POST',
			body: JSON.stringify(data),
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
		}
	}).catch((error)=> {
        console.log(error)
	})

    await dispatch(ObtenerDataReducer())
    return true
}

export const EditarModuloReducer = (formData) => async (dispatch, getState) => {

    dispatch({
        type: CARGANDO_NUEVO_MODULO_ADMINISTRACION,
        payload: true
    })

    await axios.post(config.api+'administrador/modulos/editarModulo', formData,{
        mode:'cors',
        headers: {
            'Accept' : 'application/json',
            'content-type': 'multipart/form-data',
            'api-token': localStorage.getItem('usutoken'),
        }
    })
    .then(data => {
        let datos = data.data
		if(datos.respuesta == true){
            message.success(datos.mensaje, 5)
        }else{
            message.error(datos.mensaje, 10)
        }
	}).catch((error)=> {
        console.log(error)
    })
    
    dispatch({
        type: CARGANDO_NUEVO_MODULO_ADMINISTRACION,
        payload: false
    })

    dispatch(ObtenerDataReducer())
}

export const EditarSubModuloReducer = (data) => async (dispatch, getState) => {
    dispatch({
        type: CARGANDO_NUEVO_SUBMODULO_ADMINITRACION,
        payload: true
    })

    await fetch(config.api+'administrador/modulos/editarSubModulos',
		{
			mode:'cors',
			method: 'POST',
			body: JSON.stringify(data),
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
		}
	}).catch((error)=> {
        console.log(error)
	})

    dispatch({
        type: CARGANDO_NUEVO_SUBMODULO_ADMINITRACION,
        payload: false
    })

    await dispatch(ObtenerDataReducer())
    return true
}

export const CambiarPosicionModulosReducer = (posicionAnterior, posicionNuevo) => async (dispatch, getState) => {

    const dataModulos = getState().admModulos.dataModulos

    const moduloAnterior = dataModulos[posicionAnterior]
    const moduloNuevo = dataModulos[posicionNuevo]

    dataModulos[posicionAnterior] = moduloNuevo
    dataModulos[posicionNuevo] = moduloAnterior

    dataModulos.map((modulo, posicion) => modulo.modorden = posicion+1)

    dispatch({
        type: OBTENER_MODULOS_ADMINISTRACION,
        payload: dataModulos
    })

    let modulosEditados = [
        dataModulos[posicionAnterior],
        dataModulos[posicionNuevo] 
    ]

    dispatch(EditarOrdenModuloReducer(dataModulos[posicionAnterior], dataModulos[posicionNuevo] ))
}


export const EditarOrdenModuloReducer = (moduloAnterior, moduloNuevo) => async (dispatch, getState) => {

    dispatch({
        type: CARGANDO_DATA_MODULOS_ADMINISTRACION,
        payload: true
    })

    await fetch(config.api+'administrador/modulos/editarOrdenModulo',
		{
			mode:'cors',
			method: 'POST',
			body: JSON.stringify({
                'api-token'	     : localStorage.getItem('usutoken'),
                "moduloAnterior" : moduloAnterior,
                "moduloNuevo"    : moduloNuevo
            }),
			headers: {
				'Accept' 	   : 'application/json',
				'Content-type' : 'application/json',
				'api-token'	   : localStorage.getItem('usutoken')
			}
		}
	)
    .then(data => {
        let datos = data.data
		if(datos.respuesta == true){
            message.success(datos.mensaje, 5)
        }else{
            message.error(datos.mensaje, 10)
        }
	}).catch((error)=> {
        console.log(error)
    })
    
    dispatch({
        type: CARGANDO_DATA_MODULOS_ADMINISTRACION,
        payload: false
    })

    dispatch(ObtenerDataReducer())
}

export const CambiarVisualizacionModulosReducer = (modid, smoid, visualizacion) => async (dispatch, getState) => {

    dispatch({
        type: CARGANDO_DATA_MODULOS_ADMINISTRACION,
        payload: true
    })

    await fetch(config.api+'administrador/modulos/editar-visualizacion-modulos',
		{
			mode:'cors',
			method: 'POST',
			body: JSON.stringify({
                'api-token' : localStorage.getItem('usutoken'),
                "modid"     : modid,
                "smoid"     : smoid,
                "visualizacion" : visualizacion
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

		if(data.respuesta == true){
            
            notification.success({
                message: `Notificación`,
                description: data.mensaje,
                placement: 'topRight',
            })

            dispatch(mostrarPaisesReducer())

        }else{
            
            notification.info({
                message: `Notificación`,
                description: data.mensaje,
                placement: 'topRight',
            });

        }

	}).catch((error)=> {
        console.log(error)
        notification.info({
            message: `Notificación`,
            description: 'Lo sentimos, tuvimos un error con el servidor',
            placement: 'topRight',
        });
    })
    
    dispatch(ObtenerDataReducer())

}