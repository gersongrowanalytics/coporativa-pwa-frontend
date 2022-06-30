import {
    OBTENER_DATA_SELECCIONADO_DESCARGAR_DATA,
    OBTENER_ARCHIVOS_DESCARGAR_DESCARGAR_DATA
} from "../../../constants/DescargarData/DescargarDataTypes";
import {SeleccionarArchivoDescargarDataReducer} from '../Administrador/ControlData/ControlData'
import config from '../../../config'
import { estadoRequestReducer } from "../../../appRedux/actions/EstadoRequest"

export const ObtenerDataSeleccionadaReducer = (data, posicion) => async (dispatch, getState) => {    

    dispatch({
        type: OBTENER_DATA_SELECCIONADO_DESCARGAR_DATA,
        payload : {}
    })

    await dispatch(SeleccionarArchivoDescargarDataReducer(posicion))

    let objeto = {imagenes:[]}
    const dataArchivos = getState().controlData.dataArchivos
    console.log(dataArchivos)
    
    // data.imagenes = []

    let datos = []
    let archivosDescargar = []

    dataArchivos.map((dat, posicion) => {
        if(dat.descargarData == true){
            objeto = { ...dat }
            archivosDescargar.push(dat.archivo)
            dat.imagenes.map((imagen) => {
                datos.push(imagen)
                // data.imagenes.push(imagen)
            })
        }
    })

    objeto.imagenes = datos

    dispatch({
        type: OBTENER_ARCHIVOS_DESCARGAR_DESCARGAR_DATA,
        payload: archivosDescargar
    })

    dispatch({
        type: OBTENER_DATA_SELECCIONADO_DESCARGAR_DATA,
        payload : objeto
    })


}

export const RegistrarDescargaExcelReducer = (ardid) => async (dispatch, getState) => {

    await fetch(config.api+'registrar-descarga-excel',
		{
			mode:'cors',
			method: 'POST',
			body: JSON.stringify({
                'api-token'	: localStorage.getItem('usutoken'),
                'ardid'     : ardid,
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
            
            
            
		}
	}).catch((error)=> {
        
	});

}