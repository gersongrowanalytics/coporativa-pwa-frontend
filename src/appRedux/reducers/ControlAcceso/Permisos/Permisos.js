import {
    CONTROLES_ACCESOS_PERMISOS_CARGANDO_TABLA,
    CONTROLES_ACCESOS_PERMISOS_OBTENER_PERMISOS,
    CONTROLES_ACCESOS_PERMISOS_OBTENER_COLUMNAS_TABLA_PERMISOS,
    CONTROLES_ACCESOS_PERMISOS_VISIBILIDAD_MODAL_NUEVO_PERMISO,
    CONTROLES_ACCESOS_PERMISOS_CARGANDO_NUEVO_PERMISO
} from "../../../../constants/SistemaTypes";

const INIT_STATE = {
    cargandoTablaPermisos    : false,
    cargandoNuevoPermiso     : false,

    columnasTablaPermisos    : [],
    listaPermisos            : [],
    
    visibleModalNuevoPermiso : false
};


export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case CONTROLES_ACCESOS_PERMISOS_CARGANDO_TABLA: {
        return {
            ...state,
            cargandoTablaPermisos: action.payload
        }
    }
    case CONTROLES_ACCESOS_PERMISOS_OBTENER_PERMISOS: {
        return {
            ...state,
            listaPermisos: action.payload,
            cargandoTablaPermisos: false
        }
    }
    case CONTROLES_ACCESOS_PERMISOS_OBTENER_COLUMNAS_TABLA_PERMISOS: {
        return {
            ...state,
            columnasTablaPermisos : action.payload
        }
    }
    case CONTROLES_ACCESOS_PERMISOS_VISIBILIDAD_MODAL_NUEVO_PERMISO: {
        return {
            ...state,
            visibleModalNuevoPermiso : action.payload
        }
    }
    case CONTROLES_ACCESOS_PERMISOS_CARGANDO_NUEVO_PERMISO: {
        return {
            ...state,
            cargandoNuevoPermiso : action.payload
        }
    }
    default:
      return state;
  }
}
