import {
    CARGANDO_PERMISOS_TIPO_USUARIO_CONTROL_ACCESO,
    OBTENER_PERMISOS_TIPO_USUARIO_CONTROL_ACCESO,
    PODER_GUARDAR_PERMISOS_TIPO_USUARIO_CONTROL_ACCESO,
} from "../../../../constants/SistemaTypes";

const INIT_STATE = {
    cargandoPermisosTipoUsuario : false,
    permisosTipoUsuario : [],
    guardarPermisos : false,
    tpuidSeleccionado : 0
};


export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case CARGANDO_PERMISOS_TIPO_USUARIO_CONTROL_ACCESO: {
        return {
            ...state,
            cargandoPermisosTipoUsuario: action.payload
        }
    }
    case OBTENER_PERMISOS_TIPO_USUARIO_CONTROL_ACCESO: {
        return {
            ...state,
            permisosTipoUsuario: action.payload.permisos,
            tpuidSeleccionado: action.payload.tpuid
        }
    }
    case PODER_GUARDAR_PERMISOS_TIPO_USUARIO_CONTROL_ACCESO: {
        return {
            ...state,
            guardarPermisos: action.payload
        }
    }
    default:
      return state;
  }
}
