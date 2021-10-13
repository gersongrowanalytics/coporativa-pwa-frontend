import React, {useState, useEffect} from 'react'
import {Row, Col, Tooltip} from 'antd'
import actualizarAzul from '../../../assets/images/iconos/Tabla/actualizarAzul.svg'
import '../../../styles/Sistema/ControlArchivo/ControlArchivo.css'
import ModalEliminar from '../../../components/Sistema/ControlArchivos/ModalEliminar'
import TablaControlArchivos from '../../../components/Sistema/ControlArchivos/TablaControlArchivos'
import Calendar from 'react-calendar';
import IconoLupa from '../../../assets/images/iconos/Tabla/lupa.svg'
import 'react-calendar/dist/Calendar.css';
import {
    ObtenerArchivosReducer
} from "../../../appRedux/actions/ControlArchivos/ControlArchivos";
import {useDispatch} from "react-redux";

const ControlArchivos = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(ObtenerArchivosReducer())
    }, [])

    const [txtBuscar, setTxtBuscar] = useState(null);

    const ObtenerListaArchivosFiltroTxtBuscar = (txtbus) => {
        setTxtBuscar(txtbus)

        if(txtFechaInicio == null && txtFechaFinal == null){
            dispatch(ObtenerArchivosReducer(txtbus, null, null))
        }else if(txtFechaInicio == null){
            dispatch(ObtenerArchivosReducer(txtbus, null, fechaFinal))
        }else if(txtFechaFinal == null){
            dispatch(ObtenerArchivosReducer(txtbus, fechaInicio, null))
        }else{
            dispatch(ObtenerArchivosReducer(txtbus, fechaInicio, fechaFinal))
        }
    }

    const ObtenerListaArchivosFiltroFechaInicio = (fechaIni) => {
        dispatch(ObtenerArchivosReducer(txtBuscar, fechaIni, fechaFinal))
    }

    const ObtenerListaArchivosFiltroFechaFinal = (fechaFin) => {
        dispatch(ObtenerArchivosReducer(txtBuscar, fechaInicio, fechaFin))
    }

    const [mostrarModalEliminarArchivo, setMostrarModalEliminarArchivo] = useState(false);

    const ocultarModal = () => {
        setMostrarModalEliminarArchivo(false);
    };
    
    const [fechaInicio, setFechaInicio] = useState(new Date());
    const [mostrarFechaInicio, setMostrarFechaInicio] = useState(false);
    const [txtFechaInicio, setTxtFechaInicio] = useState(null);

    const ObtenerFechaInicio = (e) => {
        
        let mes = (e.getMonth() > 8) ? (e.getMonth() + 1) : ('0' + (e.getMonth() + 1))
        let dia = ((e.getDate() > 9) ? e.getDate() : ('0' + e.getDate()))
        let anio = e.getFullYear()
        
        let fechaTexto = dia+" / "+mes+" / "+anio
        let fechaIni = anio+"-"+mes+"-"+dia

        setTxtFechaInicio(fechaTexto)
        setFechaInicio(e)
        setMostrarFechaInicio(false)

        ObtenerListaArchivosFiltroFechaInicio(e)
    }

    const [fechaFinal, setFechaFinal] = useState(new Date());
    const [mostrarFechaFinal, setMostrarFechaFinal] = useState(false);
    const [txtFechaFinal, setTxtFechaFinal] = useState(null);

    const ObtenerFechaFinal = (e) => {
        
        let mes = (e.getMonth() > 8) ? (e.getMonth() + 1) : ('0' + (e.getMonth() + 1))
        let dia = ((e.getDate() > 9) ? e.getDate() : ('0' + e.getDate()))
        let anio = e.getFullYear()
        
        let fechaTexto = dia+" / "+mes+" / "+anio
        let fechaFin = anio+"-"+mes+"-"+dia

        setTxtFechaFinal(fechaTexto)
        setFechaFinal(e)
        setMostrarFechaFinal(false)
        ObtenerListaArchivosFiltroFechaFinal(e)
        
    }

    return (
        <div id="Contenedor-Principal-Margen">
            <Row>
                <Col xl={24} id="Contenedor-Primera-Fila-Control-Archivos">
                    <div id="Titulo-Control-Archivo">Archivos Cargados</div>

                    <div id="Contenedor-Buscador-Control-Archivos">
                        <img src={IconoLupa} id="Icono-Lupa-Control-Archivos" />
                        <input 
                            id="Input-Buscador-Control-Archivos" 
                            placeholder="Buscar"
                            autoComplete={"off"} 
                            value={txtBuscar}
                            onChange={(e) => ObtenerListaArchivosFiltroTxtBuscar(e.target.value)}
                        />
                    </div>

                    
                        <div
                            style={{
                                textAlign: "-webkit-right", paddingRight:'20px', width:"100px"
                            }}
                            id="Icono-Actualizar-Control-Archivo"
                            onClick={() => dispatch(ObtenerArchivosReducer(txtBuscar, fechaInicio, fechaFinal))}
                        >
                            <Tooltip placement="bottom" title={"Actualizar"}>
                                <img 
                                    src={actualizarAzul} width={"28px"} 
                                />
                            </Tooltip>
                        </div>
                </Col>

                <Col xl={24} id="Contenedor-Filtro-Control-Archivo">
                    <Row style={{height:"100%"}}>
                        <Col xl={12}>
                            <Row 
                                style={{
                                    height:"100%",
                                    alignContent: "center"
                                }}
                            >
                                <Col xl={12} style={{paddingRight:'15px'}}>
                                    <div id="Contenedor-Filtro-Fecha-Control-Archivo">
                                        <Row>
                                            <Col xl={12} id="Derecha-Filtro-Fecha-Control-Archivo">
                                                <div id="Texto-Filtro-Fecha-Control-Archivo">
                                                    Fecha de inicio
                                                </div>
                                            </Col>
                                            <Col 
                                                xl={12} 
                                                id="Izquierda-Filtro-Fecha-Control-Archivo"
                                                onClick={() => setMostrarFechaInicio(!mostrarFechaInicio)}
                                            >
                                                <div id="Texto-Filtro-Fecha-Control-Archivo">
                                                    {txtFechaInicio}
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                    {
                                        mostrarFechaInicio == true
                                        ?<div id="Contenedor-Calendario-Control-Archivo">
                                            <div id="Card-Calendario-Control-Archivo">
                                                <Calendar
                                                    onChange={(e) => ObtenerFechaInicio(e)}
                                                    value={fechaInicio}
                                                />
                                            </div>
                                        </div>
                                        :null
                                    }
                                </Col>

                                <Col xl={12} style={{paddingLeft:'15px'}}>
                                    <div id="Contenedor-Filtro-Fecha-Control-Archivo">
                                        <Row>
                                            <Col xl={12} id="Derecha-Filtro-Fecha-Control-Archivo">
                                                <div id="Texto-Filtro-Fecha-Control-Archivo">
                                                    Fecha de Fin
                                                </div>
                                            </Col>
                                            <Col 
                                                xl={12} id="Izquierda-Filtro-Fecha-Control-Archivo"
                                                onClick={() => setMostrarFechaFinal(!mostrarFechaFinal)}
                                            >
                                                <div id="Texto-Filtro-Fecha-Control-Archivo">
                                                    {txtFechaFinal}
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>

                                    {
                                        mostrarFechaFinal == true
                                        ?<div id="Contenedor-Calendario-Control-Archivo">
                                            <div id="Card-Calendario-Control-Archivo">
                                                <Calendar
                                                    onChange={(e) => ObtenerFechaFinal(e)}
                                                    value={fechaFinal}
                                                />
                                            </div>
                                        </div>
                                        :null
                                    }
                                </Col>
                            </Row>
                        </Col>
                        <Col xl={12} style={{ textAlignLast: "right", alignSelf: "center", paddingRight:'30px'}}>
                            <div id="Texto-Paginate-Control-Archivos">
                                {/* 1- 4 de 6 */}
                            </div>
                        </Col>
                    </Row>
                </Col>

                <Col xl={24}>

                    <TablaControlArchivos 
                    />
                    
                </Col>
            </Row>
            
            <ModalEliminar 
                mostrarModalEliminarArchivo = {mostrarModalEliminarArchivo}
                ocultarModal = {ocultarModal}
            />
            
        </div>
    )
}

export default ControlArchivos