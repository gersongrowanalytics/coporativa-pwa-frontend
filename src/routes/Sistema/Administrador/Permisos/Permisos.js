import React, {useState, useEffect } from 'react'
import ListaAdministrador from '../../../../components/Sistema/Administrador/ListaAdministrador'
import {Row, Col, Modal} from 'antd'
import iconoCerrarModal from '../../../../assets/images/iconos/Perfil/cerrarModal.png';
import '../../../../styles/Sistema/Administrador/Permisos/Permisos.css'
import {
    ObtenerListaPermisos
} from '../../../../appRedux/actions/ControlAcceso/Permisos/Permisos'
import {useDispatch, useSelector} from "react-redux"
import Moment from 'moment';

const Permisos = () => {
    Moment.locale('en');
    const dispatch = useDispatch();

    const {
        listaPermisos
    } = useSelector(({controlesAccesosPermisos}) => controlesAccesosPermisos);

    const [mostrarModalCrearPermiso, setMostrarModalCrearPermiso] = useState(false);

    const abrirModalCrearPermiso = () => {
        setMostrarModalCrearPermiso(true);
    };

    const ocultarModal = () => {
        setMostrarModalCrearPermiso(false);
    };

    let arrayArchivos = [
        {
            permiso         : "XXXXXXXXXXXXXXX",
            slug            : "XXXXXXXXXXXXXXX",
            ruta            : "/sistemas/otros",
            fechaCreacion   : "XXXXXX/XXXXXXX/",
        },
        {
            permiso         : "XXXXXXXXXXXXXXX",
            slug            : "XXXXXXXXXXXXXXX",
            ruta            : "/sistemas/otros",
            fechaCreacion   : "XXXXXX/XXXXXXX/",
        },
        {
            permiso         : "XXXXXXXXXXXXXXX",
            slug            : "XXXXXXXXXXXXXXX",
            ruta            : "/sistemas/otros",
            fechaCreacion   : "XXXXXX/XXXXXXX/",
        },
        {
            permiso         : "XXXXXXXXXXXXXXX",
            slug            : "XXXXXXXXXXXXXXX",
            ruta            : "/sistemas/otros",
            fechaCreacion   : "XXXXXX/XXXXXXX/",
        },
        {
            permiso         : "XXXXXXXXXXXXXXX",
            slug            : "XXXXXXXXXXXXXXX",
            ruta            : "/sistemas/otros",
            fechaCreacion   : "XXXXXX/XXXXXXX/",
        },
        {
            permiso         : "XXXXXXXXXXXXXXX",
            slug            : "XXXXXXXXXXXXXXX",
            ruta            : "/sistemas/otros",
            fechaCreacion   : "XXXXXX/XXXXXXX/",
        },
        {
            permiso         : "XXXXXXXXXXXXXXX",
            slug            : "XXXXXXXXXXXXXXX",
            ruta            : "/sistemas/otros",
            fechaCreacion   : "XXXXXX/XXXXXXX/",
        },
    ]

    useEffect(() => {
        dispatch(ObtenerListaPermisos())
    }, [])

    return (
        <div id="Contenedor-Principal-Margen">
            <Row>
                <Col xl={24} lg={4} md={24} sm={24} xs={24} id="Contenedor-Segunda-Parte-Administrador">
                    <Row>
                        <Col xl={4} lg={4} md={24} sm={24} xs={24} id="Contenedor-Lista-Tipos-Usuario">
                            <div id="Contenedor-Lista-Administrador">
                                <div id="Titulo-Modulo-Administrador">Administrador</div><br/>
                                <ListaAdministrador
                                    esTipoUsuario = {false}
                                    esUsuario = {false}
                                    esPermiso = {true}
                                />
                            </div>
                        </Col>
                        <Col xl={20} lg={20} md={24} sm={24} xs={24}>
                            <Row>
                                <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                                    <div id="Contenedor-Btn-Crear-Administrador" onClick={abrirModalCrearPermiso}>
                                        <div id="Texto-Btn-Crear-Administrador">
                                            + Crear
                                        </div>
                                    </div>
                                </Col>
                                <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                                   
                                    <div id="Contenedor-Tabla-Usuario-Administrador">
                                        <table 
                                            style={{
                                                width:'2000px'
                                            }}
                                            id="Tabla-Usuario-Administrador">
                                            <thead>
                                                <tr id="Fila-Cabecera-Tabla-Usuario-Administrador">
                                                    <th id="Texto-Cabecera-Tabla-Usuario-Administrador">Permisos</th>
                                                    <th id="Texto-Cabecera-Tabla-Usuario-Administrador">Slug</th>
                                                    <th id="Texto-Cabecera-Tabla-Usuario-Administrador">Ruta</th>
                                                    <th id="Texto-Cabecera-Tabla-Usuario-Administrador">Fecha de Creación </th>
                                                </tr>
                                            </thead>
                                            <tbody style={{marginTop: '20px'}}>
                                                {
                                                    listaPermisos.map((archivo, posicion) => {
                                                        return(
                                                            // <>
                                                                // {posicion == 0 ?<tr><td style={{paddingBottom:'15px'}}></td></tr> : null}
                                                                 <tr id="Fila-Cuerpo-Tabla-Usuario-Administrador" style={{paddingBottom:'20px'}}>
                                                                    <td id="Texto-Cuerpo-Tabla-Usuario-Administrador">
                                                                        {archivo.pemnombre}
                                                                    </td>
                                                                    <td id="Texto-Cuerpo-Tabla-Usuario-Administrador">
                                                                        {archivo.pemslug}
                                                                    </td>
                                                                    <td id="Texto-Cuerpo-Tabla-Usuario-Administrador">
                                                                        {archivo.pemruta}
                                                                    </td>
                                                                    <td id="Texto-Cuerpo-Tabla-Usuario-Administrador">
                                                                        {Moment(archivo.created_at).format('D MMM')}
                                                                    </td>
                                                                </tr>
                                                                // <tr><td style={{paddingBottom:'15px'}}></td></tr>
                                                            // </>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                            <tfoot>
                                                <div style={{margin:'28px'}} />
                                            </tfoot>
                                        </table>
                                    </div>
                                    
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>

            <Modal 
                closeIcon={<img onClick={ocultarModal} src={iconoCerrarModal} 
                id="" />}
                title={null} 
                visible={mostrarModalCrearPermiso} 
                footer={null} 
                centered
                width={"378px"}
            >
                
                <div id="Contenedor-Crear-Permiso-Administrador">
                    <div>
                        <div id="Texto-Crear-Permiso-Administrador">Permiso</div>
                        <input id="Input-Crear-Permiso-Administrador" />

                        <div id="Texto-Crear-Permiso-Administrador">Slug</div>
                        <input id="Input-Crear-Permiso-Administrador" />

                        <div id="Texto-Crear-Permiso-Administrador">Ruta</div>
                        <input id="Input-Crear-Permiso-Administrador" />

                        <div style={{textAlign: "-webkit-center"}}>
                            <div id="Contenedor-Btn-Crear-Permiso-Administrador">
                                <div id="Texto-Btn-Crear-Permiso-Administrador">Crear</div>
                            </div>
                        </div>
                    </div>
                </div>

            </Modal>
        </div>
    )
}

export default Permisos
