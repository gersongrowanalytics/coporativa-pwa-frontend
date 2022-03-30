import {
  SWITCH_LANGUAGE, TOGGLE_COLLAPSED_NAV, WINDOW_WIDTH,
  OBTENER_DATOS_USUARIO_LOGIN,
  MOSTRAR_TERMINOS_CONDICIONES_DATA_LOGIN
} from "../../constants/ActionTypes";
import {LAYOUT_TYPE, NAV_STYLE, THEME_COLOR, THEME_TYPE} from "../../constants/ThemeSetting";
import config from '../../config'
import { estadoRequestReducer } from "./EstadoRequest"
import {
  userSignIn
} from "../../appRedux/actions/Auth";


export function toggleCollapsedSideNav(navCollapsed) {
  return {type: TOGGLE_COLLAPSED_NAV, navCollapsed};
}

export function updateWindowWidth(width) {
  return (dispatch) => {
    dispatch({type: WINDOW_WIDTH, width});
  }

}

export function setThemeType(themeType) {
  return (dispatch) => {
    dispatch({type: THEME_TYPE, themeType});
  }
}

export function setThemeColor(themeColor) {
  console.log("ms",themeColor)
  return (dispatch) => {
    dispatch({type: THEME_COLOR, themeColor});
  }
}

export function onNavStyleChange(navStyle) {
  return (dispatch) => {
    dispatch({type: NAV_STYLE, navStyle});
  }
}

export function onLayoutTypeChange(layoutType) {
  return (dispatch) => {
    dispatch({type: LAYOUT_TYPE, layoutType});
  }
}

export function switchLanguage(locale) {
  return (dispatch) => {
    dispatch({
      type: SWITCH_LANGUAGE,
      payload: locale
    });
  }
}

export const AceptarCookiesReducer = () => (dispatch, getState) => {

  let datosUsuarioLogeado = getState().auth.datosUsuarioLogeado

  datosUsuarioLogeado.usuaceptoterminos = true

  dispatch({
    type: OBTENER_DATOS_USUARIO_LOGIN,
    payload: datosUsuarioLogeado
  })

  dispatch({
    type: MOSTRAR_TERMINOS_CONDICIONES_DATA_LOGIN,
    payload: false
  })

  const cookiesaceptadas = getState().settings.cookiesaceptadas
  localStorage.setItem('cookiesaceptadas', "ACEPTADO")
  dispatch({
    type: "ACEPTAR_COOKIES_CONFIGURACION",
    payload: !cookiesaceptadas
  })

  dispatch(AceptarTerminosCondicionesReducer())

}

export const LeyendoCookiesReducer = (leyendo) => (dispatch, getState) => {

  dispatch({
    type: "LEYENDO_COOKIES_CONFIGURACION",
    payload: leyendo
  })

}


export const AceptarTerminosCondicionesReducer = () => async (dispatch, getState) => {

  await fetch(config.api+'aceptar-terminos-condiciones',
		{
			mode:'cors',
			method: 'POST',
			headers: {
				'Accept' : 'application/json',
				'Content-type' : 'application/json',
        'api-token'	   : localStorage.getItem('usutoken')
			}
    }
  )
  .then( async res => {
		await dispatch(estadoRequestReducer(res.status))
		return res.json()
  })
  .then(data => {
		const estadoRequest = getState().estadoRequest.init_request
		if(estadoRequest == true){
			if(data.respuesta == true){

				

			}else{
				
			}
		}
  }).catch((error)=> {
    console.log(error)
  });

}