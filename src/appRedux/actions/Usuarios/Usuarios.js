import config from '../../../config'
import { estadoRequestReducer } from "../../../appRedux/actions/EstadoRequest"
import {
    OBTENER_PERMISOS_USUARIO,
    OBTENER_MODULOS_USUARIO
} from "../../../constants/Usuarios/UsuariosTypes";

import {
    CambiarPaisReducer
} from "../Auth"

export const ObtenerPermisosUsuarioReducer = () => async (dispatch, getState) => {
    await fetch(config.api+'usuario/mostrar/permisos',
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
        console.log(data)
		const estadoRequest = getState().estadoRequest.init_request

		if(estadoRequest == true){

            localStorage.setItem('tpuprivilegio', data.tpuprivilegio)

            if(data.respuesta == true){
                dispatch({
                    type: OBTENER_PERMISOS_USUARIO,
                    payload: data.datos
                })
            }else{
                dispatch({
                    type: OBTENER_PERMISOS_USUARIO,
                    payload: data.datos
                })
            }
		}
	}).catch((error)=> {
        console.log("ObtenerPermisosUsuarioReducer: "+error)
	});
}

export const ObtenerModulosUsuarioReducer = () => async (dispatch, getState) => {
    await fetch(config.api+'usuario/mostrar/modulos',
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
        console.log(data)
		const estadoRequest = getState().estadoRequest.init_request

		if(estadoRequest == true){

            if(data.respuesta == true){
                dispatch({
                    type: OBTENER_MODULOS_USUARIO,
                    payload: data.datos
                })
            }else{
                dispatch({
                    type: OBTENER_MODULOS_USUARIO,
                    payload: data.datos
                })
            }
		}
	}).catch((error)=> {
        console.log("ObtenerModulosUsuarioReducer: "+error)
        dispatch({
            type: OBTENER_MODULOS_USUARIO,
            payload: []
        })
	});
}

export const SeleccionarMenuReducer = (
    posicionSeleccionada, posicionSubMenuSeleccionado) => async (dispatch, getState) => {

    let paisSelec = getState().auth.paisSeleccionado
    let modulos_usuario = paisSelec.modulos

    modulos_usuario.map((modulo, posicion) => {
        modulos_usuario[posicion]['seleccionado'] = false
        if(modulo.modtienesubmodulos == true){
            modulo.smos.map((submenu, posicionSubMenu) => {
                modulos_usuario[posicion]['smos'][posicionSubMenu]['seleccionado'] = false
            })
        }
    })

    if(posicionSeleccionada != 99){
        modulos_usuario[posicionSeleccionada]['seleccionado'] = true
        if(posicionSubMenuSeleccionado >= 0){
            modulos_usuario[posicionSeleccionada]['smos'][posicionSubMenuSeleccionado]['seleccionado'] = true
        }
    }

    paisSelec['modulos'] = modulos_usuario
    dispatch(CambiarPaisReducer(paisSelec))
}

export const EncontrarModuloReducer = (url) => (dispatch, getState) => {
    let paisSelec = getState().auth.paisSeleccionado
    let modulos_usuario = paisSelec.modulos

    modulos_usuario.map((modulo, posicion) => {
        
        modulos_usuario[posicion]['seleccionado'] = false

        // if(modulo.modtienesubmodulos == true){
        //     modulo.smos.map((submenu, posicionSubMenu) => {
        //         modulos_usuario[posicion]['smos'][posicionSubMenu]['seleccionado'] = false
        //     })
        // }

        modulo.smos.map((submenu, posicionSubMenu) => {

            if(submenu.smoruta == url){
                modulos_usuario[posicion]['seleccionado'] = true
                modulos_usuario[posicion]['smos'][posicionSubMenu]['seleccionado'] = true
            }else{
                modulos_usuario[posicion]['smos'][posicionSubMenu]['seleccionado'] = false
            }
        })

    })


    paisSelec['modulos'] = modulos_usuario
    dispatch(CambiarPaisReducer(paisSelec))
}