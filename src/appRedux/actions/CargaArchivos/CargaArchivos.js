import {
    MOSTRAR_NOTIFICACIONES_PANTALLA_COMPLETA_CARGA_ARCHIVOS,
    OBTENER_NOTIFICACIONES_CARGA_ARCHIVOS
} from "../../../constants/CargaArchivos/CargaArchivos";
import axios from 'axios'
import config from '../../../config'
import {message} from "antd";

export const MostrarNotificacionesPantallaCompletaReducer = (accion) => async (dispatch, getState) => {
    dispatch({
        type: MOSTRAR_NOTIFICACIONES_PANTALLA_COMPLETA_CARGA_ARCHIVOS,
        payload: accion
    })
}

export const EliminarNotificacionReducer = (posicion) => async (dispatch, getState) => {

    let notificacionesCargaArchivos = getState().cargaArchivos.notificacionesCargaArchivos
    notificacionesCargaArchivos.splice( posicion, 1 );

    dispatch({
        type: OBTENER_NOTIFICACIONES_CARGA_ARCHIVOS,
        payload: notificacionesCargaArchivos
    })
}

export const DesplegarTextoNotificacionReducer = (posicion, desplegable) => (dispatch, getState) => {

    let notificacionesCargaArchivos = getState().cargaArchivos.notificacionesCargaArchivos
    notificacionesCargaArchivos[posicion]['textoDesplegado'] = desplegable

    dispatch({
        type: OBTENER_NOTIFICACIONES_CARGA_ARCHIVOS,
        payload: notificacionesCargaArchivos
    })

}

export const CargarArchivoReducer = (url, formData) => async (dispatch, getState) => {

    let api = config.api+url

    let resultado = {
        archivoExito : false,
        archivoError : false
    }

    await axios.post(api, formData,{
        mode:'cors',
        headers: {
            'Accept' : 'application/json',
            'content-type': 'multipart/form-data',
            'api-token': localStorage.getItem('usutoken'),
        },
    })
    .then(rpta => {
        if(rpta.status == 200){
            let datos = rpta.data
            if(datos.respuesta == true){

                resultado.archivoExito = true
                // this.setState({
                //     archivoExito : true
                // })
            }else{

                resultado.archivoExito = false
                resultado.archivoError = true
                // this.setState({
                //     archivoExito : false,
                //     archivoError : true
                // })
                message.error(datos.mensaje);
            }
        }else{
            resultado.archivoError = true
            // this.setState({
            //     archivoError : true
            // })
        }
    })
    .catch((error)=> {
        console.log("catch: "+error)
        resultado.archivoError = true
        // this.setState({
        //     archivoError : true
        // })
    });

    return resultado

}