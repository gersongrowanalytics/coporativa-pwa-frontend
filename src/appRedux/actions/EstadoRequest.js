import {
    showAuthMessage,
    userSignOut
} from "../../appRedux/actions/Auth";
import {
    ESTADO_REQUEST_EXITO,
    ESTADO_REQUEST_NO_AUTORIZADO,
    ESTADO_REQUEST_ERROR_SERVIDOR,
    ESTADO_REQUEST_NO_EXISTE,
    ESTADO_REQUEST_DESCONOCIDO
} from "../../constants/EstadosTypes";

// REDUCER -> ENVIAR LA DATA DE FETCH A UNA CONSTANTE O ESTADO
export const estadoRequestReducer = (estado) => (dispatch) => {
    if(estado == 200){
        dispatch({
            type: ESTADO_REQUEST_EXITO,
            payload: estado
        })
    }else if(estado == 401){
        dispatch ({
            type: ESTADO_REQUEST_NO_AUTORIZADO,
            payload: estado
        })

        dispatch(userSignOut())
    }else if(estado == 404){
        
        dispatch({
            type: ESTADO_REQUEST_NO_EXISTE,
            payload: estado
        })
        dispatch(showAuthMessage("error 404"))
    }else if(estado == 500){
        dispatch({
            type: ESTADO_REQUEST_ERROR_SERVIDOR,
            payload: estado
        })
    }else{
        dispatch({
            type: ESTADO_REQUEST_DESCONOCIDO,
            payload: estado
        })
    }

    return true
};