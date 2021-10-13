import {
    CONTROLES_ACCESOS_PERMISOS_CARGANDO_TABLA,
    CONTROLES_ACCESOS_PERMISOS_OBTENER_PERMISOS,
    CONTROLES_ACCESOS_PERMISOS_OBTENER_COLUMNAS_TABLA_PERMISOS,
    CONTROLES_ACCESOS_PERMISOS_VISIBILIDAD_MODAL_NUEVO_PERMISO,
    CONTROLES_ACCESOS_PERMISOS_CARGANDO_NUEVO_PERMISO
} from "../../../../constants/SistemaTypes";
import config from '../../../../config'
import {message} from "antd"
import { estadoRequestReducer } from "../../EstadoRequest"

export const ObtenerListaPermisos = () => async (dispatch, getState) => {

    dispatch({
        type: CONTROLES_ACCESOS_PERMISOS_CARGANDO_TABLA,
        payload: true
    })

    const listaPermisos = getState().controlesAccesosPermisos.listaPermisos

	await fetch(config.api+'controlAcceso/permisos/mostrarPermisos',
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
                dispatch(ArmarColumnasTablaPermisosReducer())
                dispatch({
                    type: CONTROLES_ACCESOS_PERMISOS_OBTENER_PERMISOS,
                    payload: data.datos
                })
            }else{
                message.error(data.mensaje)

                if(listaPermisos.length < 0){
                    dispatch({
                        type: CONTROLES_ACCESOS_PERMISOS_OBTENER_PERMISOS,
                        payload: data.datos
                    })
                }
                
            }
		}
	}).catch((error)=> {
        console.log(error)
        message.error(error)
        if(listaPermisos.length < 0){
            dispatch({
                type: CONTROLES_ACCESOS_PERMISOS_OBTENER_PERMISOS,
                payload: []
            })
        }
	});
}

export const ArmarColumnasTablaPermisosReducer = () => async (dispatch, getState) => {
    const columnas = [
        {
            title: 'ID',
            dataIndex: 'pemid',
            key: 'pemid',
            width: 50,
        },
        {
            title: 'Permiso',
            dataIndex: 'pemnombre',
            key: 'pemnombre',
            width: 100,
        },
        {
            title: 'Slug',
            dataIndex: 'pemslug',
            key: 'pemslug',
            width: 100,
        },
        {
            title: 'Ruta',
            dataIndex: 'pemruta',
            key: 'pemruta',
            width: 100,
        },
        {
            title: 'Fecha Creada',
            dataIndex: 'created_at',
            key: 'created_at',
            width: 100,
        },
    ]

    dispatch({
        type: CONTROLES_ACCESOS_PERMISOS_OBTENER_COLUMNAS_TABLA_PERMISOS,
        payload : columnas
    })
}

export const VisibilidadModalNuevoPermisoReducer = (visibilidad)  => {
    
    return {
        type: CONTROLES_ACCESOS_PERMISOS_VISIBILIDAD_MODAL_NUEVO_PERMISO,
        payload: visibilidad
    }
}

export const CrearPermisoReducer = (values) => async (dispatch, getState) => {

    dispatch({
        type: CONTROLES_ACCESOS_PERMISOS_CARGANDO_NUEVO_PERMISO,
        payload: true
    })

	await fetch(config.api+'controlAcceso/permisos/crearPermiso',
		{
			mode:'cors',
			method: 'POST',
			body: JSON.stringify({
                'pemnombre' : values.pemnombre,
                'pemruta'   : values.pemruta,
                'pemslug'   : values.pemslug,
                'api-token'	: localStorage.getItem('usutoken')
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
                dispatch(ObtenerListaPermisos())
                message.success(data.mensaje)
            }else{
                message.error(data.mensaje)
            }
        }
	}).catch((error)=> {
        console.log(error)
        message.error(error)
    });
    
    dispatch({
        type: CONTROLES_ACCESOS_PERMISOS_CARGANDO_NUEVO_PERMISO,
        payload: false
    })
}