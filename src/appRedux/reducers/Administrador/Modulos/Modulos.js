import {
    OBTENER_MODULOS_ADMINISTRACION,
    CARGANDO_DATA_MODULOS_ADMINISTRACION,
    CARGANDO_NUEVO_MODULO_ADMINISTRACION,
    CARGANDO_NUEVO_SUBMODULO_ADMINITRACION
} from "../../../../constants/SistemaTypes"

const INIT_STATE = {
    dataModulos : [],
    cargandoDataModulos : false,
    cargandoNuevoModulo : false,
    cargandoNuevoSubModulo : false
};


export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case OBTENER_MODULOS_ADMINISTRACION: {
        return {
            ...state,
            dataModulos: action.payload
        }
    }
    case CARGANDO_DATA_MODULOS_ADMINISTRACION: {
        return {
            ...state,
            cargandoDataModulos: action.payload
        }
    }
    case CARGANDO_NUEVO_MODULO_ADMINISTRACION: {
        return {
            ...state,
            cargandoNuevoModulo: action.payload
        }
    }
    case CARGANDO_NUEVO_SUBMODULO_ADMINITRACION: {
        return {
            ...state,
            cargandoNuevoSubModulo : action.payload
        }
    }
    default:
      return state;
  }
}
