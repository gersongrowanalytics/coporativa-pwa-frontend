
import React from 'react'
import {message, Input} from "antd";
import {
    CONTROLES_ACCESOS_USUARIOS_CARGANDO_TABLA,
    CONTROLES_ACCESOS_USUARIOS_OBTENER_USUARIOS,
    CONTROLES_ACCESOS_USUARIOS_OBTENER_COLUMNAS_TABLA_USUARIOS,
    CONTROLES_ACCESOS_USUARIOS_VISIBILIDAD_MODAL_NUEVO_USUARIO,
    CONTROLES_ACCESOS_USUARIOS_CARGANDO_NUEVO_USUARIO

} from "../../../../constants/SistemaTypes";
import config from '../../../../config'
import { estadoRequestReducer } from "../../../../appRedux/actions/EstadoRequest"

let controller = new AbortController()
let signal = controller.signal

export const ObtenerListaUsuariosReducer = (txtBuscar, tpuid) => async (dispatch, getState) => {

    dispatch({
        type: CONTROLES_ACCESOS_USUARIOS_CARGANDO_TABLA,
        payload: true
    })

    const listaUsuarios = getState().controlesAccesosUsuarios.listaUsuarios

    if (controller.signal.aborted) {
        controller = new AbortController()
        signal = controller.signal
    }  

	await fetch(config.api+'controlAcceso/usuarios/mostrarUsuarios',
		{
			mode:'cors',
			method: 'POST',
			body: JSON.stringify({
                'api-token'	   : localStorage.getItem('usutoken'),
                'txtBuscar'    : txtBuscar,
                'tpuid'        : tpuid
            }),
            signal:signal,
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
        // console.log(data)
		const estadoRequest = getState().estadoRequest.init_request
		if(estadoRequest == true){
            if(data.respuesta == true){
                dispatch(ArmarColumnasTablaUsuariosReducer())
                dispatch({
                    type: CONTROLES_ACCESOS_USUARIOS_OBTENER_USUARIOS,
                    payload: data.datos
                })
            }else{
                message.error(data.mensaje)

                if(listaUsuarios.length < 0){
                    dispatch({
                        type: CONTROLES_ACCESOS_USUARIOS_OBTENER_USUARIOS,
                        payload: data.datos
                    })
                }
                
            }
		}
	}).catch((error)=> {
        console.log(error)
        if(listaUsuarios.length < 0){
            dispatch({
                type: CONTROLES_ACCESOS_USUARIOS_OBTENER_USUARIOS,
                payload: []
            })
        }
	});
}

export function CancelarPeticionFetch() {
    controller.abort();
  }

export const ArmarColumnasTablaUsuariosReducer = () => async (dispatch, getState) => {
    const columnas = [
        {
            title: 'ID',
            dataIndex: 'usuid',
            key: 'usuid',
            width: 50,
        },

        // {
        //     title: 'Correo',
        //     dataIndex: 'usucorreo',
        //     key: 'usucorreo',
        //     width: 100,
        // },

        {
            title: 'Tipo Usuario',
            dataIndex: 'tpunombre',
            key: 'tpunombre',
            width: 100,
        },

        {
            title: 'Usuario',
            dataIndex: 'usuusuario',
            key: 'usuusuario',
            width: 100,
        },

        {
            title: 'Contraseña',
            dataIndex: '',
            key: 'usucontrasena',
            width: 100,
            render: (data) => 
                data.editar == true 
                ?<Input 
                type="password" 
                placeholder="Nueva Contraseña" 
                value={data.nuevaContrasena} 
                onChange={(e) => {
                    data.editarContrasena = true
                    data.nuevaContrasena = e.target.value
                    dispatch({type: "",payload: data}) 
                    dispatch(ArmarColumnasTablaUsuariosReducer())
                }}
                />
                :<span>*********</span>
        },

        {
            title: 'Nombre',
            dataIndex: 'pernombre',
            key: 'pernombre',
            width: 100,
        },

        {
            title: 'Apell. Paterno',
            dataIndex: 'perapellidopaterno',
            key: 'perapellidopaterno',
            width: 100,
        },

        {
            title: 'Apell. Materno',
            dataIndex: 'perapellidomaterno',
            key: 'perapellidomaterno',
            width: 100,
        },
    ]

    dispatch({
        type: CONTROLES_ACCESOS_USUARIOS_OBTENER_COLUMNAS_TABLA_USUARIOS,
        payload : columnas
    })
}

export const VisibilidadModalNuevoUsuarioReducer = (visibilidad)  => {
    return {
        type: CONTROLES_ACCESOS_USUARIOS_VISIBILIDAD_MODAL_NUEVO_USUARIO,
        payload: visibilidad
    }
}

export const CrearUsuarioReducer = (values) => async (dispatch, getState) => {

    dispatch({
        type: CONTROLES_ACCESOS_USUARIOS_CARGANDO_NUEVO_USUARIO,
        payload: true
    })

	await fetch(config.api+'controlAcceso/usuarios/crearUsuario',
		{
			mode:'cors',
			method: 'POST',
			body: JSON.stringify({
                'api-token'	         : localStorage.getItem('usutoken'),
                'usucorreo'          : values.usucorreo,
                'usuusuario'         : values.usuusuario,
                'usucontrasena'      : values.usucontrasena,
                'pernombre'          : values.pernombre,
                'perapellidopaterno' : values.perapellidopaterno,
                'perapellidomaterno' : values.perapellidomaterno,
                'tpuid'              : values.tpuid,
                'paiid'              : values.paiid
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
                dispatch(ObtenerListaUsuariosReducer())
                message.success(data.mensaje)
            }else{
                message.error(data.mensaje)
            }
        }
	}).catch((error)=> {
        console.log(error)
        message.error(error)
    })
    
    dispatch({
        type: CONTROLES_ACCESOS_USUARIOS_CARGANDO_NUEVO_USUARIO,
        payload: false
    })
}

export const EditandoUsuarioReducer = (posicion) => (dispatch, getState) => {
    let listaUsuarios = getState().controlesAccesosUsuarios.listaUsuarios
    listaUsuarios[posicion]['editarcontrasenia'] = false
    if(listaUsuarios[posicion]['editando'] == true){
        listaUsuarios[posicion]['editando'] = false
    }else{
        listaUsuarios[posicion]['editando'] = true
    }

    dispatch({
        type: CONTROLES_ACCESOS_USUARIOS_OBTENER_USUARIOS,
        payload: listaUsuarios
    })
}

export const EditandoContraseniaUsuarioReducer = (posicion) => (dispatch, getState) => {
    let listaUsuarios = getState().controlesAccesosUsuarios.listaUsuarios

    if(listaUsuarios[posicion]['editarcontrasenia'] == true){
        listaUsuarios[posicion]['editarcontrasenia'] = false
    }else{
        listaUsuarios[posicion]['editarcontrasenia'] = true
    }

    dispatch({
        type: CONTROLES_ACCESOS_USUARIOS_OBTENER_USUARIOS,
        payload: listaUsuarios
    })
}

export const EditandoEstadoUsuarioReducer = (posicion) => (dispatch, getState) => {
    let listaUsuarios = getState().controlesAccesosUsuarios.listaUsuarios

    if(listaUsuarios[posicion]['estid'] == 1){
        listaUsuarios[posicion]['estid'] = 2
    }else{
        listaUsuarios[posicion]['estid'] = 1
    }

    dispatch({
        type: CONTROLES_ACCESOS_USUARIOS_OBTENER_USUARIOS,
        payload: listaUsuarios
    })
}

export const CambiarInputUsuarioReducer = (posicion, campo, texto) => (dispatch, getState) => {

    let listaUsuarios = getState().controlesAccesosUsuarios.listaUsuarios

    listaUsuarios[posicion][campo] = texto

    dispatch({
        type: CONTROLES_ACCESOS_USUARIOS_OBTENER_USUARIOS,
        payload: listaUsuarios
    })
}

export const EditandoPaisesUsuarioReducer = (posicion, nuevospaises) => (dispatch, getState) => {

    console.log(posicion)
    let listaUsuarios = getState().controlesAccesosUsuarios.listaUsuarios

    listaUsuarios[posicion]['nuevospaises'] = nuevospaises
    listaUsuarios[posicion]['editandopaises'] = true


    dispatch({
        type: CONTROLES_ACCESOS_USUARIOS_OBTENER_USUARIOS,
        payload: listaUsuarios
    })

}

export const EditarUsuarioReducer = (data) => async (dispatch, getState) => {

    console.log(data)
    dispatch({
        type: CONTROLES_ACCESOS_USUARIOS_CARGANDO_TABLA,
        payload: true
    })

    await fetch(config.api+'administrador/usuarios/editarUsuario',
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
                message.success(data.mensaje)
            }else{
                message.error(data.mensaje)
            }
        }
	}).catch((error)=> {
        console.log(error)
    })

    dispatch({
        type: CONTROLES_ACCESOS_USUARIOS_OBTENER_USUARIOS,
        payload: []
    })

    dispatch(ObtenerListaUsuariosReducer())

}

