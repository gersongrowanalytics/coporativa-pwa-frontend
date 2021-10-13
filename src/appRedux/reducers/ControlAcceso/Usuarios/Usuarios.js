import {
    CONTROLES_ACCESOS_USUARIOS_CARGANDO_TABLA,
    CONTROLES_ACCESOS_USUARIOS_OBTENER_USUARIOS,
    CONTROLES_ACCESOS_USUARIOS_OBTENER_COLUMNAS_TABLA_USUARIOS,
    CONTROLES_ACCESOS_USUARIOS_VISIBILIDAD_MODAL_NUEVO_USUARIO,
    CONTROLES_ACCESOS_USUARIOS_CARGANDO_NUEVO_USUARIO,
} from "../../../../constants/SistemaTypes";

const INIT_STATE = {
    cargandoTablaUsuarios : false,
    cargandoNuevoUsuario   : false,

    columnasTablaUsuarios : [],
    listaUsuarios         : [],
    
    visibleModalNuevoUsuario : false
};


export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case CONTROLES_ACCESOS_USUARIOS_CARGANDO_TABLA: {
        return {
            ...state,
            cargandoTablaUsuarios: action.payload
        }
    }
    case CONTROLES_ACCESOS_USUARIOS_OBTENER_USUARIOS: {
        return {
            ...state,
            listaUsuarios: action.payload,
            cargandoTablaUsuarios: false
        }
    }
    case CONTROLES_ACCESOS_USUARIOS_OBTENER_COLUMNAS_TABLA_USUARIOS: {
        return {
            ...state,
            columnasTablaUsuarios : action.payload
        }
    }
    case CONTROLES_ACCESOS_USUARIOS_VISIBILIDAD_MODAL_NUEVO_USUARIO: {
        return {
            ...state,
            visibleModalNuevoUsuario : action.payload
        }
    }
    case CONTROLES_ACCESOS_USUARIOS_CARGANDO_NUEVO_USUARIO: {
        return {
            ...state,
            cargandoNuevoUsuario : action.payload
        }
    }
    default:
      return state;
  }
}
