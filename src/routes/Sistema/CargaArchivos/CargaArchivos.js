import React, {useEffect} from 'react'
import {Row, Col} from 'antd'
import TarjetaCargaArchivo from '../../../components/Sistema/CargaArchivos/TarjetaCargaArchivo'
import '../../../styles/Sistema/CargaArchivos/CargaArchivos.css'
import Notificaciones from '../../../components/Sistema/CargaArchivos/Notificaciones'
import {useSelector, useDispatch} from "react-redux";
import {
    SeleccionarModuloEspecificoReducer
} from '../../../appRedux/actions/Dashboard/Dashboard'
import IconoSelecCargaArchivo from '../../../assets/images/iconos/Sidebar/Seleccionado/selecCargaArchivo.png'
import SliderSubMenus from '../../../components/Sistema/Dashboard/SliderSubMenus';

const CargaArchivos = () => {

    const dispatch = useDispatch();
    const { 
        seleccionoFavoritos
    } = useSelector(({dashboard}) => dashboard);
    const {paisSeleccionado} = useSelector(({auth}) => auth);
    const {
        mostrarNotificacionesPantallaCompleta,
        notificacionesCargaArchivos
    } = useSelector(({cargaArchivos}) => cargaArchivos);

    useEffect(() => {

        dispatch(
            SeleccionarModuloEspecificoReducer(
                "Carga de archivos",
                IconoSelecCargaArchivo
            )
        )

    }, [])

    return (
        <div
            style={{
                // marginTop: "20px"
            }}
        >
            <Row
                style={{
                    display: 'flex',
                    placeContent: 'center',
                }}
            >
                <Col 
                    xl={24}
                    style={
                        seleccionoFavoritos == true
                        ?{
                            height:'10vh'
                        }
                        :{}
                    }
                >
                    {
                        seleccionoFavoritos == true
                        ?<SliderSubMenus
                            moduloSeleccionado = {{"smos" : paisSeleccionado.favoritos}}
                            esFavoritos = {true}
                        />
                        :null
                    }
                </Col>
                <Col xl={4}></Col>
                <Col xl={4} md={6} sm={12} xs={24}>
                    <TarjetaCargaArchivo
                        titulo = {'Maestra de Fechas'}
                        url    = {'cargar-archivo/subir-archivo-prueba'}
                    />
                </Col>
                <Col xl={4} md={6} sm={12} xs={24}>
                    <TarjetaCargaArchivo
                        titulo = {'Ventas'}
                        url    = {'modulo/cargaArchivos/productos'}
                    />
                </Col>
                <Col xl={4} md={6} sm={12} xs={24}>
                    <TarjetaCargaArchivo
                        titulo = {'Clientes'}
                        url    = {'modulo/cargaArchivos/clientes'}
                    />
                </Col>
                <Col xl={4} md={0} sm={0} xs={0}>
                    {/* <TarjetaCargaArchivo
                        titulo = {'Fechas'}
                        url    = {'modulo/cargaArchivos/fechas'}
                    /> */}
                </Col>
                <Col xl={4} md={6} sm={24} xs={24} >
                    <div 
                        id={
                            mostrarNotificacionesPantallaCompleta == true 
                            ?"Contenedor-Animacion-Notificaciones-Carga-Archivos"
                            :"Contenedor-Notificaciones-Carga-Archivos"
                        }

                        style={
                            seleccionoFavoritos == true
                            ?{
                                height:'73vh',
                            }
                            :{
                                height:'83vh',
                            }
                        }
                    >
                        <Notificaciones 
                            mostrarNotificacionesPantallaCompleta = {mostrarNotificacionesPantallaCompleta}
                            notificacionesCargaArchivos = {notificacionesCargaArchivos}
                        />
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default CargaArchivos
