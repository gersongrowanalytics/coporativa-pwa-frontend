import {
    CAMBIAR_TITULO_AUDITORIA,
    CARGANDO_FIL_VISTAS_AUDITORIA,
    CARGANDO_FIL_TIEMPO_AUDITORIA,
    CARGANDO_FIL_USUGAN_AUDITORIA,
    CARGANDO_FIL_USUPER_AUDITORIA,

    OBTENER_FIL_VISTAS_AUDITORIA,
    OBTENER_FIL_TIEMPO_AUDITORIA,
    OBTENER_FIL_USUGAN_AUDITORIA,
    OBTENER_FIL_USUPER_AUDITORIA,

    DATA_FIL_VISTAS_AUDITORIA,
    DATA_FIL_TIEMPO_AUDITORIA,
    DATA_FIL_USUGAN_AUDITORIA,
    DATA_FIL_USUPER_AUDITORIA,
} from '../../../constants/Auditoria/Auditoria'

const INIT_STATE = {

    rex_titlo_auditoria : "",

    rex_cargando_fil_vistas : false,
    rex_cargando_fil_tiempo : false,
    rex_cargando_fil_usugan : false,
    rex_cargando_fil_usuper : false,

    rex_dato_fil_vistas : {},
    rex_dato_fil_tiempo : {},
    rex_dato_fil_usugan : {},
    rex_dato_fil_usuper : {},
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case CAMBIAR_TITULO_AUDITORIA: {
            return {
                ...state,
                rex_titlo_auditoria : action.payload
            }
        }
        case CARGANDO_FIL_VISTAS_AUDITORIA: {
            return {
                ...state,
                rex_cargando_fil_vistas: action.payload
            }
        }
        case CARGANDO_FIL_TIEMPO_AUDITORIA: {
            return {
                ...state,
                rex_cargando_fil_tiempo: action.payload
            }
        }
        case CARGANDO_FIL_USUGAN_AUDITORIA: {
            return {
                ...state,
                rex_cargando_fil_usugan: action.payload
            }
        }
        case CARGANDO_FIL_USUPER_AUDITORIA: {
            return {
                ...state,
                rex_cargando_fil_usuper: action.payload
            }
        }





        case DATA_FIL_VISTAS_AUDITORIA: {
            return {
                ...state,
                rex_dato_fil_vistas: action.payload
            }
        }
        case DATA_FIL_TIEMPO_AUDITORIA: {
            return {
                ...state,
                rex_dato_fil_tiempo: action.payload
            }
        }
        case DATA_FIL_USUGAN_AUDITORIA: {
            return {
                ...state,
                rex_dato_fil_usugan: action.payload
            }
        }
        case DATA_FIL_USUPER_AUDITORIA: {
            return {
                ...state,
                rex_dato_fil_usuper: action.payload
            }
        }




        default:
            return state;
    }
}