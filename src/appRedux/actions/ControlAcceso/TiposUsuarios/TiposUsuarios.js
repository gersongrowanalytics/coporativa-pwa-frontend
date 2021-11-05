import {
    CONTROLES_ACCESOS_TIPOS_USUARIOS_CARGANDO_TABLA,
    CONTROLES_ACCESOS_TIPOS_USUARIOS_OBTENER_TIPOS_USUARIOS,
    CONTROLES_ACCESOS_TIPOS_USUARIOS_OBTENER_COLUMNAS_TABLA_TIPOS_USUARIOS,
    CONTROLES_ACCESOS_TIPOS_USUARIOS_VISIBILIDAD_MODAL_NUEVO_TIPO_USUARIO,
    CONTROLES_ACCESOS_TIPOS_USUARIOS_CARGANDO_NUEVO_TIPO_USUARIO,
    ACTUALIZAR_DATA_PERMISOS_TIPO_USUARIO,
    ACTUALIZAR_CARGANDO_PERMISOS_TIPO_USUARIO
} from "../../../../constants/SistemaTypes";
import config from '../../../../config'
import {message} from "antd"
import { estadoRequestReducer } from "../../../../appRedux/actions/EstadoRequest"
import React from 'react'
import {Link} from "react-router-dom"

export const ObtenerListaTiposUsuariosReducer = () => async (dispatch, getState) => {

    dispatch({
        type: CONTROLES_ACCESOS_TIPOS_USUARIOS_CARGANDO_TABLA,
        payload: true
    })

    const listaTiposUsuarios = getState().controlesAccesosTiposUsuarios.listaTiposUsuarios

	await fetch(config.api+'controlAcceso/tiposUsuarios/mostrarTiposUsuarios',
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
                dispatch(ArmarColumnasTablaTiposUsuariosReducer())
                dispatch({
                    type: CONTROLES_ACCESOS_TIPOS_USUARIOS_OBTENER_TIPOS_USUARIOS,
                    payload: data.datos
                })
            }else{
                message.error(data.mensaje)

                if(listaTiposUsuarios.length < 0){
                    dispatch({
                        type: CONTROLES_ACCESOS_TIPOS_USUARIOS_OBTENER_TIPOS_USUARIOS,
                        payload: data.datos
                    })
                }
                
            }
		}
	}).catch((error)=> {
        console.log(error)
        if(listaTiposUsuarios.length < 0){
            dispatch({
                type: CONTROLES_ACCESOS_TIPOS_USUARIOS_OBTENER_TIPOS_USUARIOS,
                payload: []
            })
        }
	});
}

export const ObtenerPermisosTipoUsuarioReducer = (tpuid, tpunombre) => async (dispatch, getState) => {

    if(tpuid == null){
        tpuid = getState().controlesAccesosTiposUsuarios.tpuidSeleccionado
    }

    if(tpunombre == null){
        tpunombre = getState().controlesAccesosTiposUsuarios.nombreTipoUsuarioSeleccionado
    }

    await dispatch({
        type    : ACTUALIZAR_CARGANDO_PERMISOS_TIPO_USUARIO,
        payload : true
    })

    await fetch(config.api+'controlAcceso/tiposUsuarios/mostrarPermisos',
        {
            mode:'cors',
            method: 'POST',
            body: JSON.stringify({
                "tpuid" : tpuid,
                'api-token': localStorage.getItem('usutoken')
            }),
            headers: {
                'Accept' : 'application/json',
                'Content-type' : 'application/json',
                'api-token': localStorage.getItem('usutoken')
            }
        }
    )
    .then( async res => {
        await dispatch(estadoRequestReducer(res.status))
        return res.json()
    })
    .then(data => {
        const estadoRequest = getState().estadoRequest.init_request
        if(estadoRequest == true){
            if(data.respuesta == true){
                
                dispatch({
                    type: ACTUALIZAR_DATA_PERMISOS_TIPO_USUARIO,
                    payload : {
                        tpuid                       : tpuid,
                        obtuvoPermisosTipoUsuario   : true,
                        permisosTipoUsuario         : data.datos,
                        nombreTipoUsuario           : tpunombre
                    }
                })
                
            }else{
                dispatch({
                    type: ACTUALIZAR_DATA_PERMISOS_TIPO_USUARIO,
                    payload : {
                        tpuid                       : tpuid,
                        obtuvoPermisosTipoUsuario   : true,
                        permisosTipoUsuario         : data.datos,
                        nombreTipoUsuario           : tpunombre
                    }
                })
            }
        }
    }).catch((error)=> {
        dispatch({
            type: ACTUALIZAR_DATA_PERMISOS_TIPO_USUARIO,
            payload : {
                tpuid                       : tpuid,
                obtuvoPermisosTipoUsuario   : true,
                permisosTipoUsuario         : [],
                nombreTipoUsuario           : tpunombre
            }
        })
    });
}


export const ArmarColumnasTablaTiposUsuariosReducer = () => async (dispatch, getState) => {
    const columnas = [
        {
            title: 'ID',
            dataIndex: 'tpuid',
            key: 'tpuid',
            width: 50,
        },
        {
            title: 'Tipo de Usuario',
            dataIndex: 'tpunombre',
            key: 'tpunombre',
            width: 100,
        },
        {
            title: 'Acción',
            dataIndex: '',
            width: 100,
            key: 'accionTpu',
            render: (data) => 
                <Link to="/sistema/control-acceso/tiposUsuariosPermisos" >
                    <span 
                        style={{color:'orange'}}
                        className="gx-link" 
                        onClick={async () => { 
                            await dispatch({
                                type: ACTUALIZAR_DATA_PERMISOS_TIPO_USUARIO,
                                payload : {
                                    tpuid : data.tpuid,
                                    obtuvoPermisosTipoUsuario : false,
                                    permisosTipoUsuario : [],
                                    nombreTipoUsuario   : '',
                                    nombreTipoUsuario   : data.tpunombre
                                }
                            })
                            
                            if(data.obtuvoPermisos == true){
                                
                                dispatch({
                                    type: ACTUALIZAR_DATA_PERMISOS_TIPO_USUARIO,
                                    payload : {
                                        tpuid                       : data.tpuid,
                                        obtuvoPermisosTipoUsuario   : true,
                                        permisosTipoUsuario         : data.permisos,
                                        nombreTipoUsuario           : data.tpunombre
                                    }
                                })

                            }else{
                                await dispatch(ObtenerPermisosTipoUsuarioReducer(data.tpuid, data.tpunombre))
                                const {permisosTipoUsuarioSeleccionado} = getState().controlesAccesosTiposUsuarios
                                data.obtuvoPermisos = true
                                data.permisos       = permisosTipoUsuarioSeleccionado
                                dispatch({type: "",payload: data}) 
                                dispatch(ArmarColumnasTablaTiposUsuariosReducer())
                            }
                        }}
                    >
                        Permisos
                    </span>
                </Link>
        },
    ]

    dispatch({
        type: CONTROLES_ACCESOS_TIPOS_USUARIOS_OBTENER_COLUMNAS_TABLA_TIPOS_USUARIOS,
        payload : columnas
    })
}

export const VisibilidadModalNuevoTipoUsuarioReducer = (visibilidad)  => {
    
    return {
        type: CONTROLES_ACCESOS_TIPOS_USUARIOS_VISIBILIDAD_MODAL_NUEVO_TIPO_USUARIO,
        payload: visibilidad
    }
}

export const CrearTipoUsuarioReducer = (values) => async (dispatch, getState) => {

    dispatch({
        type: CONTROLES_ACCESOS_TIPOS_USUARIOS_CARGANDO_NUEVO_TIPO_USUARIO,
        payload: true
    })

	await fetch(config.api+'controlAcceso/tiposUsuarios/crearTipoUsuario',
		{
			mode:'cors',
			method: 'POST',
			body: JSON.stringify({
                'api-token'	    : localStorage.getItem('usutoken'),
                'tpunombre'     : values.tpunombre,
                'tpuprivilegio' : values.tpuprivilegio,
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
                dispatch(ObtenerListaTiposUsuariosReducer())
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
        type: CONTROLES_ACCESOS_TIPOS_USUARIOS_CARGANDO_NUEVO_TIPO_USUARIO,
        payload: false
    })
}

export const GuardarPermisosTipoUsuarioReducer = (tpuid, nuevadata) => async (dispatch, getState ) => {
    
    dispatch({
        type    : ACTUALIZAR_CARGANDO_PERMISOS_TIPO_USUARIO,
        payload : true
    })

    await fetch(config.api+'controles/accesos/tiposUsuarios/editarPermisos',
        {
            mode:'cors',
            method: 'POST',
            body: JSON.stringify({
                'tpuid'     : tpuid,
                'data'      : nuevadata,
                'api_token' : localStorage.getItem('usutoken')
            }),
            headers: {
                'Accept' : 'application/json',
                'Content-type' : 'application/json',
                'api_token': localStorage.getItem('usutoken')
            }
        }
    )
    .then( async res => {
        await dispatch(estadoRequestReducer(res.status))
        return res.json()
    })
    .then(async data => {
        const estadoRequest = getState().estadoRequest.init_request
        if(estadoRequest == true){
            if(data.respuesta == true){
                message.success(data.mensaje)
                await dispatch(ObtenerListaTiposUsuariosReducer())
                await dispatch(ObtenerPermisosTipoUsuarioReducer(null, null))
            }else{
                message.error(data.mensaje)
                dispatch({
                    type    : ACTUALIZAR_CARGANDO_PERMISOS_TIPO_USUARIO,
                    payload : false
                })
            }
        }else{
            dispatch({
                type    : ACTUALIZAR_CARGANDO_PERMISOS_TIPO_USUARIO,
                payload : false
            })
        }
    }).catch((error)=> {
        message.error('Lo sentimos, ocurrio un error al momento de editar este rebate, intentelo de nuevo mas tarde o actualice la pagina') 
        dispatch({
            type    : ACTUALIZAR_CARGANDO_PERMISOS_TIPO_USUARIO,
            payload : false
        })
    });
}

export const HabilitarEditarTipoUsuarioReducer = (posicion) => async (dispatch, getState) => {

    let listaTiposUsuarios = getState().controlesAccesosTiposUsuarios.listaTiposUsuarios

    listaTiposUsuarios[posicion]['editando'] = !listaTiposUsuarios[posicion]['editando']
    console.log('DISPATCH DE EDITAR')
    dispatch({
        type: CONTROLES_ACCESOS_TIPOS_USUARIOS_OBTENER_TIPOS_USUARIOS,
        // payload: JSON.parse(JSON.stringify(listaTiposUsuarios))
        payload: listaTiposUsuarios
    })
}

export const CambiarEstadoTipoUsuarioReducer = (posicion, estado) => async (dispatch, getState) => {

    let listaTiposUsuarios = getState().controlesAccesosTiposUsuarios.listaTiposUsuarios

    if(estado == true){
        listaTiposUsuarios[posicion]['estid'] = 1
    }else{
        listaTiposUsuarios[posicion]['estid'] = 2
    }

    dispatch({
        type: CONTROLES_ACCESOS_TIPOS_USUARIOS_OBTENER_TIPOS_USUARIOS,
        payload: listaTiposUsuarios
    })
}