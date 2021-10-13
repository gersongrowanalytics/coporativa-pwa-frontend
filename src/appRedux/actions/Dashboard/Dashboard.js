import {
    SELECCIONAR_MODULO,
    SELECCIONAR_MODULO_ESPECIFICO,
    OBTENER_SELECCION_MODULO,
    SELECCIONAR_AGREGAR_FAVORITO,
    SELECCIONAR_FAVORITOS
} from "../../../constants/Dashboard/DashboardTypes";
import config from '../../../config'
import { message } from 'antd'
import { estadoRequestReducer } from "../../../appRedux/actions/EstadoRequest"
import { mostrarPaisesReducer } from "../../../appRedux/actions/Auth";

export const SeleccionarModuloReducer = (ruta) => async (dispatch, getState) => {

    // const modulos_usuario = getState().usuarios.modulos_usuario
    let paisSelec = getState().auth.paisSeleccionado
    let modulos_usuario = paisSelec.modulos

    let moduloSeleccionado = {}
    let powerbi = ""
    let nombreSubModulo = ""
    let idSubModulo = ""
    let idFavorito  = ""

    // console.log("modulos_usuario")
    // console.log(modulos_usuario)

    // setTimeout(() => {
    //     dispatch(EncontrarModuloReducer(ruta))
    // }, 2000);

    let posicionSeleccionada = null
    let posicionSubMenuSeleccionado = null

    await modulos_usuario.map((modulo, posicion) => {
        if(modulo.modtienesubmodulos == true){
            modulo.smos.map((submodulo, posicionSubMenu) => {
                if(submodulo.smoruta == ruta){
                    posicionSeleccionada = posicion
                    posicionSubMenuSeleccionado = posicionSubMenu
                    // modulos_usuario[posicion]['seleccionado'] = true
                    // modulos_usuario[posicion]['smos'][posicionSubMenu]['seleccionado'] = true

                    moduloSeleccionado = modulo
                    powerbi = submodulo.smopowerbi
                    nombreSubModulo = submodulo.smonombre
                    idSubModulo = submodulo.smoid
                    idFavorito  = submodulo.favid
                }else{
                    modulos_usuario[posicion]['seleccionado'] = false
                    modulos_usuario[posicion]['smos'][posicionSubMenu]['seleccionado'] = false
                }
            })
        }else{
            if(modulo.modruta == ruta){
                moduloSeleccionado = modulo
                // modulos_usuario[posicion]['seleccionado'] = true
                posicionSeleccionada = posicion
                // posicionSubMenuSeleccionado = posicion
            }else{
                modulos_usuario[posicion]['seleccionado'] = false
            }

            modulo.smos.map((submodulo) => {
                if(submodulo.smoruta == ruta){
                    powerbi = submodulo.smopowerbi
                    nombreSubModulo = submodulo.smonombre
                    idSubModulo = submodulo.smoid
                    idFavorito  = submodulo.favid
                }
            })

        }
    })

    if(posicionSeleccionada != null){
        modulos_usuario[posicionSeleccionada]['seleccionado'] = true
    }
    if(posicionSubMenuSeleccionado != null){
        modulos_usuario[posicionSeleccionada]['smos'][posicionSubMenuSeleccionado]['seleccionado'] = true
    }

    dispatch({
        type: SELECCIONAR_MODULO,
        payload: {
            modulo      : moduloSeleccionado,
            powerbi     : powerbi,
            nombre      : nombreSubModulo,
            idsubmodulo : idSubModulo,
            idfavorito  : idFavorito,
        }
    })

    dispatch(ObtenerSeleccionModuloReducer(true))

    return true
    // paisSelec['modulos'] = modulos_usuario
    // dispatch(CambiarPaisReducer(paisSelec))
}

export const ObtenerSeleccionModuloReducer = (seleccion) => (dispatch) => {
    dispatch({
        type: OBTENER_SELECCION_MODULO,
        payload : seleccion
    })

    return true
}

export const SeleccionarAgregarFavoritoReducer = (accion) => (dispatch) => {
    dispatch({
        type: SELECCIONAR_AGREGAR_FAVORITO,
        payload: accion
    })
}

export const AgregarFavoritoReducer = (favnombre, smoid) => async (dispatch, getState) => {

    let res = false

    await fetch(config.api+'dashboard/favoritos/crear-favorito',
		{
			mode:'cors',
			method: 'POST',
			body: JSON.stringify({
                'api-token'	: localStorage.getItem('usutoken'),
                'favnombre' : favnombre,
                'smoid'     : smoid

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
                // message.success(data.mensaje)
                res = true
                dispatch(mostrarPaisesReducer())
            }else{
                message.error(data.mensaje)
            }
		}
	}).catch((error)=> {
        console.log("AgregarFavoritoReducer: "+error)
	});

    return res
}

export const EliminarFavoritoReducer = (favid) => async (dispatch, getState) => {

    let res = false

    await fetch(config.api+'dashboard/favoritos/eliminar-favorito',
		{
			mode:'cors',
			method: 'POST',
			body: JSON.stringify({
                'favid' : favid
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
                // message.success(data.mensaje)
                res = true
                dispatch(mostrarPaisesReducer())
            }else{
                message.error(data.mensaje)
            }
		}
	}).catch((error)=> {
        console.log("EliminarFavoritoReducer: "+error)
	});

    return res
}

export const SeleccionarFavoritosReducer = (accion) => (dispatch) => {
    dispatch({
        type: SELECCIONAR_FAVORITOS,
        payload : accion
    })
}

export const SeleccionarModuloEspecificoReducer = (nombreModulo, iconoModulo) => (dispatch) => {
    console.log(nombreModulo)
    let modulo = {
        modiconoseleccionado : iconoModulo,
        modnombre : nombreModulo,
        modtienesubmodulos : true
    }

    dispatch({
        type: SELECCIONAR_MODULO_ESPECIFICO,
        payload : modulo
    })
}