import {
    MOSTRAR_NOTIFICACIONES_PANTALLA_COMPLETA_CARGA_ARCHIVOS,
    OBTENER_NOTIFICACIONES_CARGA_ARCHIVOS
} from "../../../constants/CargaArchivos/CargaArchivos";

const INIT_STATE = {
    mostrarNotificacionesPantallaCompleta : false,
    notificacionesCargaArchivos : [
        {
            ncaid : 1,
            ncadescripcion: "El archivo Subsidios pesa más del límite permitido 25MB asdasdsad asdsasa asdsadasd sadsadasdsa sadassaas sadasdsasas asdsasa asd asdas asdasdassad asdasd sadasdas asdasdas sadsadasdsa asdas asdass El archivo Subsidios pesa más del límite permitido 25MB El archivo Subsidios pesa más del límite permitido 25MB El archivo Subsidios pesa más del límite permitido 25MB El archivo Subsidios pesa más del límite permitido 25MB El archivo Subsidios pesa más del límite permitido 25MB El archivo Subsidios pesa más del límite permitido 25MB El archivo Subsidios pesa más del límite permitido 25MB El archivo Subsidios pesa más del límite permitido 25MB El archivo Subsidios pesa más del límite permitido 25MB El archivo Subsidios pesa más del límite permitido 25MB El archivo Subsidios pesa más del límite permitido 25MB El archivo Subsidios pesa más del límite permitido 25MB El archivo Subsidios pesa más del límite permitido 25MB El archivo Subsidios pesa más del límite permitido 25MB El archivo Subsidios pesa más del límite permitido 25MB El archivo Subsidios pesa más del límite permitido 25MB El archivo Subsidios pesa más del límite permitido 25MB El archivo Subsidios pesa más del límite permitido 25MB El archivo Subsidios pesa más del límite permitido 25MB El archivo Subsidios pesa más del límite permitido 25MB El archivo Subsidios pesa más del límite permitido 25MB El archivo Subsidios pesa más del límite permitido 25MB El archivo Subsidios pesa más del límite permitido 25MB El archivo Subsidios pesa más del límite permitido 25MB El archivo Subsidios pesa más del límite permitido 25MB El archivo Subsidios pesa más del límite permitido 25MB El archivo Subsidios pesa más del límite permitido 25MB El archivo Subsidios pesa más del límite permitido 25MB El archivo Subsidios pesa más del límite permitido 25MB"
        },
        {
            ncaid : 2,
            ncadescripcion: "El archivo Subsidios pesa más del límite permitido 25MB"
        },
        {
            ncaid : 3,
            ncadescripcion: "El archivo Subsidios pesa más del límite permitido 25MB"
        },
        {
            ncaid : 4,
            ncadescripcion: "El archivo Subsidios pesa más del límite permitido 25MB"
        },
        {
            ncaid : 5,
            ncadescripcion: "El archivo Subsidios pesa más del límite permitido 25MB"
        },
        {
            ncaid : 6,
            ncadescripcion: "El archivo Subsidios pesa más del límite permitido 25MB"
        },
        {
            ncaid : 7,
            ncadescripcion: "El archivo Subsidios pesa más del límite permitido 25MB"
        },
        {
            ncaid : 8,
            ncadescripcion: "El archivo Subsidios pesa más del límite permitido 25MB"
        },
        {
            ncaid : 9,
            ncadescripcion: "El archivo Subsidios pesa más del límite permitido 25MB"
        },
        {
            ncaid : 10,
            ncadescripcion: "El archivo Subsidios pesa más del límite permitido 25MB"
        },
        {
            ncaid : 11,
            ncadescripcion: "El archivo Subsidios pesa más del límite permitido 25MB"
        },
        {
            ncaid : 12,
            ncadescripcion: "El archivo Subsidios pesa más del límite permitido 25MB"
        }
    ]
};


export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case MOSTRAR_NOTIFICACIONES_PANTALLA_COMPLETA_CARGA_ARCHIVOS: {
        return {
            ...state,
            mostrarNotificacionesPantallaCompleta: action.payload
        }
    }
    case OBTENER_NOTIFICACIONES_CARGA_ARCHIVOS: {
        return {
            ...state,
            notificacionesCargaArchivos: action.payload
        }
    }
    default:
      return state;
  }
}
