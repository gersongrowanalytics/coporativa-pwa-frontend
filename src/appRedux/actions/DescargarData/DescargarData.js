import {
    OBTENER_DATA_SELECCIONADO_DESCARGAR_DATA,
    OBTENER_ARCHIVOS_DESCARGAR_DESCARGAR_DATA
} from "../../../constants/DescargarData/DescargarDataTypes";
import {SeleccionarArchivoDescargarDataReducer} from '../Administrador/ControlData/ControlData'

export const ObtenerDataSeleccionadaReducer = (data, posicion) => async (dispatch, getState) => {    

    dispatch({
        type: OBTENER_DATA_SELECCIONADO_DESCARGAR_DATA,
        payload : {}
    })

    await dispatch(SeleccionarArchivoDescargarDataReducer(posicion))

    let objeto
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