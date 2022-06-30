import config from '../../../config'
import { estadoRequestReducer } from "../EstadoRequest"
import {
    CAMBIAR_TITULO_AUDITORIA,
    CARGANDO_FIL_VISTAS_AUDITORIA,
    CARGANDO_FIL_TIEMPO_AUDITORIA,
    CARGANDO_FIL_USUGAN_AUDITORIA,
    CARGANDO_FIL_USUPER_AUDITORIA,

    DATA_FIL_VISTAS_AUDITORIA,
    DATA_FIL_TIEMPO_AUDITORIA,
    DATA_FIL_USUGAN_AUDITORIA,
    DATA_FIL_USUPER_AUDITORIA
} from '../../../constants/Auditoria/Auditoria'

export const ObtenerVisitasUsuarioPlataformaReducer = () => async (dispatch, getState) => {

    let paisSelec = getState().auth.paisSeleccionado

	await fetch(config.api+'auditoria/vistas-usuario',
		{
			mode:'cors',
			method: 'POST',
			body: JSON.stringify({
                'api-token'	   : localStorage.getItem('usutoken'),
                'req_paiid' : paisSelec.paiid
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
                    type: CAMBIAR_TITULO_AUDITORIA,
                    payload : data.cantidadVistas
                })

            }else{
                
            }
		}
	}).catch((error)=> {
        
        console.log(error)

	});
}

export const ObtenerFilVistasReducer = () => async (dispatch, getState) => {

    dispatch({
        type : CARGANDO_FIL_VISTAS_AUDITORIA,
        payload : true
    })
    
    let paisSelec = getState().auth.paisSeleccionado

	await fetch(config.api+'auditoria/vistas',
		{
			mode:'cors',
			method: 'POST',
			body: JSON.stringify({
                'api-token'	   : localStorage.getItem('usutoken'),
                'req_paiid' : paisSelec.paiid
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
                    type: DATA_FIL_VISTAS_AUDITORIA,
                    payload : {
                        "diferencia" : data.diferencia,
                        "vistasPenultimoMes" : data.vistasPenultimoMes,
                        "vistasUltimoMes" : data.vistasUltimoMes,
                    }
                })

            }else{
                
            }
		}
	}).catch((error)=> {
        
        console.log(error)

	});

    dispatch({
        type : CARGANDO_FIL_VISTAS_AUDITORIA,
        payload : false
    })
}


export const ObtenerFilTiempoPromedioReducer = () => async (dispatch, getState) => {

    dispatch({
        type : CARGANDO_FIL_TIEMPO_AUDITORIA,
        payload : true
    })
    
    let paisSelec = getState().auth.paisSeleccionado

	await fetch(config.api+'auditoria/vistas-promedio-minutos',
		{
			mode:'cors',
			method: 'POST',
			body: JSON.stringify({
                'api-token'	   : localStorage.getItem('usutoken'),
                'req_paiid' : paisSelec.paiid
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
                    type: DATA_FIL_TIEMPO_AUDITORIA,
                    payload : {
                        "diferencia" : data.diferencia,
                        "penultimoMes" : data.promedioPenultimoMes,
                        "ultimomes" : data.promedioUltimoMes,
                    }
                })

            }else{
                
            }
		}
	}).catch((error)=> {
        
        console.log(error)

	});

    dispatch({
        type : CARGANDO_FIL_TIEMPO_AUDITORIA,
        payload : false
    })
}

export const ObtenerFilUsuGanReducer = () => async (dispatch, getState) => {

    dispatch({
        type : CARGANDO_FIL_USUGAN_AUDITORIA,
        payload : true
    })
    
    let paisSelec = getState().auth.paisSeleccionado

	await fetch(config.api+'auditoria/usuarios-ganados',
		{
			mode:'cors',
			method: 'POST',
			body: JSON.stringify({
                'api-token'	   : localStorage.getItem('usutoken'),
                'req_paiid' : paisSelec.paiid
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
                    type: DATA_FIL_USUGAN_AUDITORIA,
                    payload : {
                        "diferencia" : data.promedio,
                        "penultimoMes" : data.usuariosGanadosPenultimoMes,
                        "ultimomes" : data.usuariosGanadosUltimoMes,
                    }
                })

            }else{
                
            }
		}
	}).catch((error)=> {
        
        console.log(error)

	});

    dispatch({
        type : CARGANDO_FIL_USUGAN_AUDITORIA,
        payload : false
    })
}

export const ObtenerFilUsuPerReducer = () => async (dispatch, getState) => {

    dispatch({
        type : CARGANDO_FIL_USUPER_AUDITORIA,
        payload : true
    })
    
    let paisSelec = getState().auth.paisSeleccionado

	await fetch(config.api+'auditoria/usuarios-perdidos',
		{
			mode:'cors',
			method: 'POST',
			body: JSON.stringify({
                'api-token'	   : localStorage.getItem('usutoken'),
                'req_paiid' : paisSelec.paiid
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
                    type: DATA_FIL_USUPER_AUDITORIA,
                    payload : {
                        "diferencia" : data.promedio,
                        "penultimoMes" : data.usuariosPerdidosPenultimoMes,
                        "ultimomes" : data.usuariosPerdidosUltimoMes,
                    }
                })

            }else{
                
            }
		}
	}).catch((error)=> {
        
        console.log(error)

	});

    dispatch({
        type : CARGANDO_FIL_USUPER_AUDITORIA,
        payload : false
    })
}