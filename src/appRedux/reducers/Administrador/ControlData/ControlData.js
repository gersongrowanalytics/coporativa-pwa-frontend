import {
    CARGANDO_CREAR_ARCHIVO_DATA_CONTROL_DATA,
    CARGANDO_DATA_ARCHIVO_DATA_CONTROL_DATA,
    OBTENER_DATA_ARCHIVO_DATA_CONTROL_DATA,
    SELECCIONAR_DATA_ARCHIVO_DATA_CONTROL_DATA,
} from "../../../../constants/SistemaTypes";

const INIT_STATE = {
    cargandoNuevaData : false,
    cargandoDataArchivos : false,
    dataArchivos : [],
    archivosSeleccionados : []
};


export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case CARGANDO_CREAR_ARCHIVO_DATA_CONTROL_DATA: {
        return {
            ...state,
            cargandoNuevaData: action.payload
        }
    }
    case CARGANDO_DATA_ARCHIVO_DATA_CONTROL_DATA: {
        return {
            ...state,
            cargandoDataArchivos: action.payload
        }
    }
    case OBTENER_DATA_ARCHIVO_DATA_CONTROL_DATA: {
        return {
            ...state,
            dataArchivos: action.payload
        }
    }
    case SELECCIONAR_DATA_ARCHIVO_DATA_CONTROL_DATA: {
        return {
            ...state,
            archivosSeleccionados: action.payload
        }
    }
    default:
      return state;
  }
}
