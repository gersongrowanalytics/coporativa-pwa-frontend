import {
    OBTENER_PERMISOS_USUARIO,
    OBTENER_MODULOS_USUARIO
} from "../../../constants/Usuarios/UsuariosTypes";

const INIT_STATE = {
    permisos_usuario  : [],
    modulos_usuario : []
};


export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case OBTENER_PERMISOS_USUARIO: {
        return {
            ...state,
            permisos_usuario : action.payload,
        }
    }
    case OBTENER_MODULOS_USUARIO: {
        return {
            ...state,
            modulos_usuario : action.payload,
        }
    }
    default:
      return state;
  }
}
