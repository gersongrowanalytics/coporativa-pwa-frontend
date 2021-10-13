import {
    OBTENER_DATA_SELECCIONADO_DESCARGAR_DATA,
    OBTENER_ARCHIVOS_DESCARGAR_DESCARGAR_DATA
} from "../../../constants/DescargarData/DescargarDataTypes"

const INIT_STATE = {
    dataSeleccionada  : {},
    archivosDescargar : []
};


export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case OBTENER_DATA_SELECCIONADO_DESCARGAR_DATA: {
        return {
            ...state,
            dataSeleccionada : action.payload,
        }
    }
    case OBTENER_ARCHIVOS_DESCARGAR_DESCARGAR_DATA: {
        return {
            ...state,
            archivosDescargar : action.payload
        }
    }
    default:
      return state;
  }
}
