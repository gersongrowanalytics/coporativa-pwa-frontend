import {
    OBTENER_PERMISOS_TIPO_USUARIO_CONTROL_ACCESO,
    CARGANDO_PERMISOS_TIPO_USUARIO_CONTROL_ACCESO,
    PODER_GUARDAR_PERMISOS_TIPO_USUARIO_CONTROL_ACCESO
} from "../../../../constants/SistemaTypes";
import config from '../../../../config'
import {message} from "antd"
import { estadoRequestReducer } from "../../../../appRedux/actions/EstadoRequest"

export const ObtenerPermisosTipoUsuarioReducer = (tpuid) => async (dispatch, getState) => {
   
    dispatch({
        type: CARGANDO_PERMISOS_TIPO_USUARIO_CONTROL_ACCESO,
        payload: true
    })

    dispatch({
        type: OBTENER_PERMISOS_TIPO_USUARIO_CONTROL_ACCESO,
        payload: {
            permisos : [],
            tpuid : tpuid
        }
    })

	await fetch(config.api+'controlAcceso/tiposUsuarios/mostrarPermisosTiposUsuarios',
		{
			mode:'cors',
			method: 'POST',
			body: JSON.stringify({
                'api-token'	   : localStorage.getItem('usutoken'),
                "tpuid" : tpuid
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
                    type: OBTENER_PERMISOS_TIPO_USUARIO_CONTROL_ACCESO,
                    payload: {
                        permisos : data.datos,
                        tpuid : tpuid
                    }
                })
            }else{
                message.error(data.mensaje)

                dispatch({
                    type: OBTENER_PERMISOS_TIPO_USUARIO_CONTROL_ACCESO,
                    payload: {
                        permisos : data.datos,
                        tpuid : tpuid
                    }
                })
                
            }
		}
	}).catch((error)=> {
        console.log(error)
	});

    dispatch({
        type: CARGANDO_PERMISOS_TIPO_USUARIO_CONTROL_ACCESO,
        payload: false
    })
}

export const SeleccionarTipoUsuarioReducer = (tpuid) => () => {

}

export const SeleccionarPermisoReducer = (posicion, seleccionado) => (dispatch, getState) => {

    dispatch(PoderGuardarPermisosReducer(true))

    let permisosTipoUsuario = getState().controlesAccesosPermisosTiposUsuarios.permisosTipoUsuario
    let tpuidSeleccionado = getState().controlesAccesosPermisosTiposUsuarios.tpuidSeleccionado

    permisosTipoUsuario[posicion]['seleccionado'] = seleccionado

    dispatch({
        type: OBTENER_PERMISOS_TIPO_USUARIO_CONTROL_ACCESO,
        payload: {
            permisos : permisosTipoUsuario,
            tpuid : tpuidSeleccionado
        }
    })

}

export const PoderGuardarPermisosReducer = (guardar) => (dispatch,) => {
    
    dispatch({
        type: PODER_GUARDAR_PERMISOS_TIPO_USUARIO_CONTROL_ACCESO,
        payload: guardar
    })
}

export const EditarPermisosTipoUsuario = ( ) => async (dispatch, getState) => {

    let permisosTipoUsuario = getState().controlesAccesosPermisosTiposUsuarios.permisosTipoUsuario
    let tpuidSeleccionado = getState().controlesAccesosPermisosTiposUsuarios.tpuidSeleccionado

    await fetch(config.api+'controlAcceso/tiposUsuarios/editarPermisos',
		{
			mode:'cors',
			method: 'POST',
			body: JSON.stringify({
                'api-token'	   : localStorage.getItem('usutoken'),
                "tpuid" : tpuidSeleccionado,
                "data" : permisosTipoUsuario
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
            }else{
                message.error(data.mensaje)
                
            }
		}
	}).catch((error)=> {
        console.log(error)
	})

    dispatch(ObtenerPermisosTipoUsuarioReducer(tpuidSeleccionado))
}