import {
    CONTROLES_ACCESOS_TIPOS_USUARIOS_CARGANDO_TABLA,
    CONTROLES_ACCESOS_TIPOS_USUARIOS_OBTENER_TIPOS_USUARIOS,
    CONTROLES_ACCESOS_TIPOS_USUARIOS_OBTENER_COLUMNAS_TABLA_TIPOS_USUARIOS,
    CONTROLES_ACCESOS_TIPOS_USUARIOS_VISIBILIDAD_MODAL_NUEVO_TIPO_USUARIO,
    CONTROLES_ACCESOS_TIPOS_USUARIOS_CARGANDO_NUEVO_TIPO_USUARIO,
    ACTUALIZAR_DATA_PERMISOS_TIPO_USUARIO
} from "../../../../constants/SistemaTypes";

const INIT_STATE = {
    cargandoTablaTiposUsuarios : false,
    cargandoNuevoTipoUsuario   : false,

    columnasTablaTiposUsuarios : [],
    listaTiposUsuarios         : [],
    
    visibleModalNuevoTipoUsuario : false,

    // 

    tpuidSeleccionado                       : 0,
    obtuvoPermisosTipoUsuarioSeleccionado   : false,
    permisosTipoUsuarioSeleccionado         : [],
    cargandoPermisosTipoUsuarioSeleccionado : false,
    nombreTipoUsuarioSeleccionado           : "",
};


export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case CONTROLES_ACCESOS_TIPOS_USUARIOS_CARGANDO_TABLA: {
        return {
            ...state,
            cargandoTablaTiposUsuarios: action.payload
        }
    }
    case CONTROLES_ACCESOS_TIPOS_USUARIOS_OBTENER_TIPOS_USUARIOS: {
        return {
            ...state,
            listaTiposUsuarios: action.payload,
            cargandoTablaTiposUsuarios: false
        }
    }
    case CONTROLES_ACCESOS_TIPOS_USUARIOS_OBTENER_COLUMNAS_TABLA_TIPOS_USUARIOS: {
        return {
            ...state,
            columnasTablaTiposUsuarios : action.payload
        }
    }
    case CONTROLES_ACCESOS_TIPOS_USUARIOS_VISIBILIDAD_MODAL_NUEVO_TIPO_USUARIO: {
        return {
            ...state,
            visibleModalNuevoTipoUsuario : action.payload
        }
    }
    case CONTROLES_ACCESOS_TIPOS_USUARIOS_CARGANDO_NUEVO_TIPO_USUARIO: {
        return {
            ...state,
            cargandoNuevoTipoUsuario : action.payload
        }
    }
    case ACTUALIZAR_DATA_PERMISOS_TIPO_USUARIO: {
        return {
            ...state,
            tpuidSeleccionado                       : action.payload.tpuid,
            obtuvoPermisosTipoUsuarioSeleccionado   : action.payload.obtuvoPermisosTipoUsuario,
            permisosTipoUsuarioSeleccionado         : action.payload.permisosTipoUsuario,
            cargandoPermisosTipoUsuarioSeleccionado : false,
            nombreTipoUsuarioSeleccionado           : action.payload.nombreTipoUsuario
        }
    }
    default:
      return state;
  }
}
