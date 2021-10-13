import React from 'react'
import IconoNotificacion from '../../../assets/images/iconos/CargaArchivos/notificacion.svg'
import IconoFlechaIzquierda from '../../../assets/images/iconos/CargaArchivos/flechaizquierda.svg'
import IconoMasAzul from '../../../assets/images/iconos/CargaArchivos/masazul.svg'
import IconoCerrarNegro from '../../../assets/images/iconos/CargaArchivos/cerrarnegro.svg'
import IconoFlechaDerecha from '../../../assets/images/iconos/CargaArchivos/flechaderecha.svg'
import {useDispatch, useSelector} from "react-redux";
import {
    MostrarNotificacionesPantallaCompletaReducer,
    EliminarNotificacionReducer,
    DesplegarTextoNotificacionReducer
} from '../../../appRedux/actions/CargaArchivos/CargaArchivos'
import '../../../styles/Sistema/CargaArchivos/Notificaciones.css'

const Notificaciones = (props) => {

    const dispatch = useDispatch();

    
    
    return (
        <div>

            <div id="Titulo-Carga-Archivos-Notificaciones" >
                <div
                    onClick={() => dispatch(MostrarNotificacionesPantallaCompletaReducer(!props.mostrarNotificacionesPantallaCompleta))} 
                    id="Contenedor-Icono-FlechaIzquierda-Notificacion-Carga-Archivos">
                        {
                            props.mostrarNotificacionesPantallaCompleta == true
                            ?<img id="Icono-FlechaIzquierda-Notificacion-Carga-Archivos" src={IconoFlechaDerecha} />
                            :<img id="Icono-FlechaIzquierda-Notificacion-Carga-Archivos" src={IconoFlechaIzquierda} />
                        }
                    
                </div>
                <img id="Icono-Campana-Notificacion-Carga-Archivos" src={IconoNotificacion} />
                Notificaciones
            </div>
            
            {
                // [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}].map((data, posicion) => {
                    props.notificacionesCargaArchivos.length > 0
                    ?props.notificacionesCargaArchivos.map((data, posicion) => {


                        return (
                            <div 
                                id={
                                    props.mostrarNotificacionesPantallaCompleta == true
                                    ?"Fila-PantallaCompleta-Carga-Archivos-Notificacion"
                                    :"Fila-Carga-Archivos-Notificacion"
                                }
                            >
                                <div id="PrimeraParte-Fila-Carga-Archivos-Notificacion">
                                    <div id="Titulo-PrimeraParte-Fila-Carga-Archivos-Notificacion">
                                        Notificación {data.ncaid}
                                    </div>

                                    {
                                        props.mostrarNotificacionesPantallaCompleta
                                        ?<br/>
                                        :null
                                    }

                                    <div 
                                        id={"Descripcion-PrimeraParte-Fila-Carga-Archivos-Notificacion-"+posicion}
                                        className={"Descripcion-PrimeraParte-Fila-Carga-Archivos-Notificacion"}
                                    >
                                        {
                                            data.ncadescripcion.length <= 65
                                            ?data.ncadescripcion
                                            :props.mostrarNotificacionesPantallaCompleta
                                                ?data.ncadescripcion
                                                :data.textoDesplegado == true
                                                    ?data.ncadescripcion.substr(0, 110)+"..."
                                                    :data.ncadescripcion.substr(0, 65)+"..."
                                        }
                                    </div>
                                    
                                    {
                                        props.mostrarNotificacionesPantallaCompleta
                                        ?<br/>
                                        :null
                                    }

                                </div>

                                <div id="SegundaParte-Fila-Carga-Archivos-Notificacion">
                                    <img
                                        onClick={() => dispatch(EliminarNotificacionReducer(posicion))} 
                                        id="Icono-CerrarNegro-Carga-Archivos-Notificacion" src={IconoCerrarNegro} /><br/>
                                    {
                                        data.ncadescripcion.length > 65
                                        ?data.textoDesplegado == true
                                            ?null
                                            :props.mostrarNotificacionesPantallaCompleta
                                                ?null
                                                :<img 
                                                    onClick={() => dispatch(DesplegarTextoNotificacionReducer(posicion, !data.textoDesplegado))}
                                                    id="Icono-MasAzul-Carga-Archivos-Notificacion" src={IconoMasAzul} />
                                        :null
                                    }
                                    
                                </div>
                            </div>
                            
                        )
                    })
                    :<div 
                        id="Contenedor-Sin-Notificaciones-Carga-Archivos"
                    >
                            No hay notificaciones recientes
                    </div>
            }
        </div>
    )
}

export default Notificaciones
