import {
  HIDE_MESSAGE,
  INIT_URL,
  ON_HIDE_LOADER,
  ON_SHOW_LOADER,
  SHOW_MESSAGE,
  SIGNIN_USER_SUCCESS,
  SIGNOUT_USER_SUCCESS,
  SIGNUP_USER_SUCCESS,
  MOSTRAR_FORMULARIO_LOGIN,
  OBTENER_PERMISOS_USUARIO,
  OBTENER_DATOS_USUARIO_LOGIN
} from "../../constants/ActionTypes";
import {
  OBTENER_PAISES_SISTEMA,
  SELECCIONAR_PAIS_ESPECIFICO
} from "../../constants/PermisosTypes"

const INIT_STATE = {
  loader       : false,
  alertMessage : '',
  showMessage  : false,
  initURL      : '',
  authUser     : localStorage.getItem('user_id'),
  mostrarForm  : false,
  permisos     : [],
  listaPaises  : [],
  paisSeleccionado : {},
  datosUsuarioLogeado : {},
  cargandoLogin : false
};


export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case SIGNUP_USER_SUCCESS: {
      return {
        ...state,
        loader: false,
        authUser: action.payload
      }
    }
    case SIGNIN_USER_SUCCESS: {
      return {
        ...state,
        loader: false,
        authUser: action.payload
      }
    }
    case INIT_URL: {
      return {
        ...state,
        initURL: action.payload
      }
    }
    case SIGNOUT_USER_SUCCESS: {
      return {
        ...state,
        authUser: null,
        initURL: '/',
        loader: false
      }
    }

    case SHOW_MESSAGE: {
      return {
        ...state,
        alertMessage: action.payload,
        showMessage: true,
        loader: false
      }
    }
    case HIDE_MESSAGE: {
      return {
        ...state,
        alertMessage: '',
        showMessage: false,
        loader: false
      }
    }
    case ON_SHOW_LOADER: {
      return {
        ...state,
        loader: true
      }
    }
    case ON_HIDE_LOADER: {
      return {
        ...state,
        loader: false
      }
    }
    case MOSTRAR_FORMULARIO_LOGIN:{
      return{
        ...state,
        mostrarForm: action.payload,
      }
    }
    case OBTENER_PERMISOS_USUARIO: {
      return {
        ...state,
        permisos : action.payload
      }
    }
    case OBTENER_PAISES_SISTEMA: {
      return {
        ...state,
        listaPaises : action.payload
      }
    }
    case SELECCIONAR_PAIS_ESPECIFICO: {
      return {
        ...state,
        paisSeleccionado : action.payload
      }
    }
    case OBTENER_DATOS_USUARIO_LOGIN: {
      return {
        ...state,
        datosUsuarioLogeado : action.payload
      }
    }
    case "CARGANDO_BTN_LOGIN": {
      return {
        ...state,
        cargandoLogin : action.payload
      }
    }
    default:
      return state;
  }
}
