import {
  HIDE_MESSAGE,
  INIT_URL,
  ON_HIDE_LOADER,
  ON_SHOW_LOADER,
  SHOW_MESSAGE,
  SIGNIN_USER,
  SIGNIN_USER_SUCCESS,
  SIGNOUT_USER,
  SIGNOUT_USER_SUCCESS,
  SIGNUP_USER,
  SIGNUP_USER_SUCCESS,
  MOSTRAR_FORMULARIO_LOGIN,
  OBTENER_DATOS_USUARIO_LOGIN,
  MOSTRAR_TERMINOS_CONDICIONES_DATA_LOGIN,
  ADMINISTRAR_TARJETAS_HOME_DATA_LOGIN
} from "../../constants/ActionTypes";

import {
  OBTENER_PAISES_SISTEMA,
  SELECCIONAR_PAIS_ESPECIFICO
} from "../../constants/PermisosTypes"

import config from '../../config'
import { estadoRequestReducer } from "./EstadoRequest"
import { message } from 'antd';

export const userSignUp = (user) => {
  return {
    type: SIGNUP_USER,
    payload: user
  };
};
export const userSignIn = (usuario) => async (dispatch, getState) => {

  let redireccionar = false

	await fetch(config.api+'login',
		{
			mode:'cors',
			method: 'POST',
			body: JSON.stringify(usuario),
			headers: {
				'Accept' : 'application/json',
				'Content-type' : 'application/json'
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

          localStorage.setItem('Log-usuario', usuario.usuario)
          localStorage.setItem('Log-contrasenia', usuario.contrasena)
          localStorage.setItem('Log-pais', usuario.pais)
          localStorage.setItem('Log-posicionPais', usuario.posicionPais)
          
          localStorage.setItem('user_id', data.datos.usuid)
          localStorage.setItem('usutoken', data.datos.usutoken)
          localStorage.setItem('usuimagen', data.datos.usuimagen)
          localStorage.setItem('usuusuario', data.datos.usuusuario)
          localStorage.setItem('usucorreo', data.datos.usucorreo)
          localStorage.setItem('pernombrecompleto', data.datos.pernombrecompleto)
          localStorage.setItem('pernombre', data.datos.pernombre)
          localStorage.setItem('ejecutivo', data.datos.ejecutivo)          
          localStorage.setItem('distribuidora', data.datos.pernombrecompleto)
          localStorage.setItem('tpunombre', data.datos.tpunombre)
          localStorage.setItem('tpuprivilegio', data.datos.tpuprivilegio)
          localStorage.setItem('posicionPaisSeleccionado', usuario.posicionPais)

          // dispatch(loginCorrecto(data.datos))
          dispatch({
            type: SIGNIN_USER,
            payload: data.datos.usuid
          });

          dispatch({
            type: OBTENER_DATOS_USUARIO_LOGIN,
            payload: data.datos
          })

          dispatch({
            type: MOSTRAR_TERMINOS_CONDICIONES_DATA_LOGIN,
            payload: data.mostrarterminos
          })

          dispatch({
            type: ADMINISTRAR_TARJETAS_HOME_DATA_LOGIN,
            payload: data.tarjetasHome
          })


          redireccionar = data.mostrarterminos

        }else{
          // dispatch(showAuthMessage(data.mensaje))
          if(localStorage.getItem('user_id') > 0){
            // message.error(data.mensaje);
            // console.log('ya existe una sesion y ahora esta equivocado')
            dispatch(userSignOut())
          }else{
            // console.log('No existe nada')
            message.error(data.mensaje);
          }
          
        }
      }
    }).catch((error)=> {
		  // dispatch(showAuthMessage(error))
      console.log(error)
    });

    return {
      "redirigirterminos" : redireccionar
    }
};

export const userSignOut = () => async (dispatch, getState) => {

  await fetch(config.api+'cerrar-session',
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

  localStorage.removeItem('Log-usuario')
  localStorage.removeItem('Log-contrasenia')
  localStorage.removeItem('Log-pais')
  localStorage.removeItem('Log-posicionPais')

  localStorage.removeItem('user_id')
  localStorage.removeItem('usutoken')
  localStorage.removeItem('usuimagen')
  localStorage.removeItem('usucorreo')
  localStorage.removeItem('usuusuario')
  localStorage.removeItem('pernombre')
  localStorage.removeItem('ejecutivo')
  localStorage.removeItem('distribuidora')
  localStorage.removeItem('tpuprivilegio')
  localStorage.removeItem('posicionPaisSeleccionado')
  localStorage.removeItem('tpunombre')
  localStorage.removeItem('pernombrecompleto')

  localStorage.removeItem('cookiesaceptadas')

  return {
    type: SIGNOUT_USER
  };
};

export const userSignUpSuccess = (authUser) => {
  return {
    type: SIGNUP_USER_SUCCESS,
    payload: authUser
  };
};

export const userSignInSuccess = (authUser) => {
  return {
    type: SIGNIN_USER_SUCCESS,
    payload: authUser
  }
};
export const userSignOutSuccess = () => {
  return {
    type: SIGNOUT_USER_SUCCESS,
  }
};

export const showAuthMessage = (message) => {
  return {
    type: SHOW_MESSAGE,
    payload: message
  };
};



export const setInitUrl = (url) => {
  return {
    type: INIT_URL,
    payload: url
  };
};


export const showAuthLoader = () => {
  return {
    type: ON_SHOW_LOADER,
  };
};

export const hideMessage = () => {
  return {
    type: HIDE_MESSAGE,
  };
};
export const hideAuthLoader = () => {
  return {
    type: ON_HIDE_LOADER,
  };
};

export const mostrarFormReducer = (accion) => {
    return {
        type: MOSTRAR_FORMULARIO_LOGIN,
        payload: accion
    }
}

export const mostrarPaisesReducer = () => async (dispatch, getState) => {

  await fetch(config.api+'otros/mostrar-paises',
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

				dispatch({
					type: OBTENER_PAISES_SISTEMA,
					payload: data.datos
				});

			}else{
				
			}
		}
  }).catch((error)=> {
    console.log(error)
  });

}

export const cambiarContraseniaReducer = (valores) => async (dispatch, getState) => {
  let resultado = false
  await fetch(config.api+'cambiar-contrasenia',
		{
			mode:'cors',
			method: 'POST',
      body: JSON.stringify(valores),
			headers: {
				'Accept' : 'application/json',
				'Content-type' : 'application/json'
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
        message.success(data.mensaje);
        resultado = true
			}else{
				message.error(data.mensaje, 5);
			}
		}
  }).catch((error)=> {
    console.log(error)
  });

  return resultado

}

export const EnviarEmailRecuperarContraseniaReducer = (correo) => async (dispatch, getState) => {
  let resultado = false
  await fetch(config.api+'recuperar-contrasenia/enviar-email-outlook',
		{
			mode:'cors',
			method: 'POST',
      body: JSON.stringify({
        'correo' : correo
      }),
			headers: {
				'Accept' : 'application/json',
				'Content-type' : 'application/json'
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
        // message.success(data.mensaje);
        resultado = true
			}else{
				message.error(data.mensaje, 5);
			}
		}
  }).catch((error)=> {
    console.log(error)
  });

  return resultado
}

export const SeleccionarPaisReducer = (posicion) => (dispatch, getState) => {

  console.log("posicion pais:")
  console.log(posicion)
  const listaPaises = getState().auth.listaPaises

  dispatch({
    type: SELECCIONAR_PAIS_ESPECIFICO,
    payload: listaPaises[posicion]
  })
}

export const CambiarPaisReducer = (pais) => (dispatch, getState) => {

  dispatch({
    type: SELECCIONAR_PAIS_ESPECIFICO,
    payload: pais
  })
}