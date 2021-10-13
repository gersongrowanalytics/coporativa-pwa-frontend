import {
    SELECCIONAR_MODULO,
    OBTENER_SELECCION_MODULO,
    SELECCIONAR_AGREGAR_FAVORITO,
    SELECCIONAR_FAVORITOS,
    SELECCIONAR_MODULO_ESPECIFICO
} from "../../../constants/Dashboard/DashboardTypes";

const INIT_STATE = {
    moduloSeleccionado  : {},
    powerbiSeleccionado : "",
    nombremoduloSeleccionado : "",
    idsubmoduloSeleccionado : "",
    idFavoritosubmoduloSeleccionado : "",
    seleccionoModulo : false,
    seleccionoFavoritos : false,

    agregarFavorito : false
};


export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case SELECCIONAR_MODULO: {
        return {
            ...state,
            moduloSeleccionado : action.payload.modulo,
            powerbiSeleccionado : action.payload.powerbi,
            nombremoduloSeleccionado : action.payload.nombre,
            idsubmoduloSeleccionado : action.payload.idsubmodulo,
            idFavoritosubmoduloSeleccionado : action.payload.idfavorito,
        }
    }
    case SELECCIONAR_MODULO_ESPECIFICO: {
        return {
            ...state,
            moduloSeleccionado : action.payload,
            seleccionoModulo : true
        }
    }
    case OBTENER_SELECCION_MODULO: {
        return {
            ...state,
            seleccionoModulo : action.payload
        }
    }
    case SELECCIONAR_AGREGAR_FAVORITO: {
        return {
            ...state,
            agregarFavorito : action.payload
        }
    }
    case SELECCIONAR_FAVORITOS: {
        return {
            ...state,
            seleccionoFavoritos : action.payload
        }
    }
    default:
      return state;
  }
}
