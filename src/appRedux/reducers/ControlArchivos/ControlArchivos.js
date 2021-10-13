import {
    CARGANDO_TABLA_CONTROL_ARCHIVOS,
    OBTENER_ARCHIVOS_CONTROL_ARCHIVOS,
} from "../../../constants/ControlArchivos/ControlArchivos";

const INIT_STATE = {
    cargando_tabla_control_archivos : false,
    tabla_control_archivos : []
};


export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case CARGANDO_TABLA_CONTROL_ARCHIVOS: {
        return {
            ...state,
            cargando_tabla_control_archivos : action.payload,
        }
    }
    case OBTENER_ARCHIVOS_CONTROL_ARCHIVOS: {
        return {
            ...state,
            tabla_control_archivos : action.payload,
        }
    }
    default:
      return state;
  }
}
