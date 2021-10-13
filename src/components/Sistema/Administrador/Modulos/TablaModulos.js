import React, {useEffect, useState} from 'react'
import {Row, Col, Spin, Modal} from 'antd'
import { LoadingOutlined, RightOutlined, DownOutlined } from '@ant-design/icons'
import IconoEditar from '../../../../assets/images/iconos/Tabla/editar.svg'
import IconoEliminar from '../../../../assets/images/iconos/Tabla/tacho.png'
// import IconoMas from 'assets/images/iconos/Administrador/modulos/mas.png'
import IconoMas from '../../../../assets/images/iconos/Tabla/masnegro.svg'
import {
    ObtenerDataReducer, 
    AbrirModuloReducer, 
    CargandoSubModulo, 
    EliminarSubModuloReducer, 
    EliminarModuloReducer,
    CambiarPosicionModulosReducer
} from "../../../../appRedux/actions/Administrador/Modulos/Modulos"
import {useDispatch, useSelector} from "react-redux"
import { ExclamationCircleOutlined } from '@ant-design/icons';
import Moment from 'moment';
import ModalEditarModulo from './ModalEditarModulo'
import ModalEditarSubModulo from './ModalEditarSubModulo'
import {SortableContainer, SortableElement} from 'react-sortable-hoc';

const TablaModulos = (props) => {
    Moment.locale('en');
    const dispatch = useDispatch();

    const [modalEditarModulo, setModalEditarModulo] = useState(false)
    const [modalEditarSubModulo, setModalEditarSubModulo] = useState(false)
    const [moduloSeleccionadoEditar, setModuloSeleccionadoEditar] = useState({})
    const [submoduloSeleccionadoEditar, setSubModuloSeleccionadoEditar] = useState({})

    const { 
        dataModulos,
        cargandoDataModulos
    } = useSelector(({admModulos}) => admModulos);

    useEffect(() => {

        dispatch(ObtenerDataReducer())

    }, [])

    const { confirm } = Modal;

    function mostrarModalEliminarSubModulo(posicionModulo, posicionSubModulo, modid, smoid ) {
        dispatch(CargandoSubModulo(posicionModulo, posicionSubModulo))
        confirm({
            title: '¿Estas seguro de eliminar este Sub Módulo?',
            icon: <ExclamationCircleOutlined />,
            content: 'Recuerda que este cambio es instantaneo en los clientes',
            okText: 'Sí',
            okType: 'danger',
            cancelText: 'No',
            async onOk() {
                await dispatch(EliminarSubModuloReducer({
                    "smoid" : smoid,
                    "modid" : modid,
                }))
            },
            onCancel() {
                dispatch(CargandoSubModulo(posicionModulo, posicionSubModulo))
            },
        });
    }

    function mostrarModalEliminarModulo( modid ) {
        confirm({
            title: '¿Estas seguro de eliminar este módulo?',
            icon: <ExclamationCircleOutlined />,
            content: 'Recuerda que este cambio es instantaneo en los clientes',
            okText: 'Sí',
            okType: 'danger',
            cancelText: 'No',
            async onOk() {
                await dispatch(EliminarModuloReducer({
                    "modid" : modid,
                }))
            },
            onCancel() {
            },
        });
    }

    const SeleccionarModuloEditar = (modulo) => {
        setModuloSeleccionadoEditar(modulo)
        setModalEditarModulo(true)
    }

    const SeleccionarSubModuloEditar = (submodulo) => {
        setSubModuloSeleccionadoEditar(submodulo)
        setModalEditarSubModulo(true)
    }

    return (
        <Col xl={24} style={{paddingLeft:'10px', paddingRight:'10px'}}>
            <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} spinning={cargandoDataModulos}>

                {
                    props.editarOrdenModulos == true
                    ?<SortableComponent 
                        items = {dataModulos}
                    />
                    :dataModulos.map((dato, posicion) => {
                        return (
                            <div>
                                <Row 
                                    id="Fila-Tabla-Administrador"
                                    style={
                                        dato.abierto == true
                                        ?{
                                            boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.25)"
                                        }
                                        :{}
                                    }
                                >
                                    <Col xl={12} style={{placeSelf: "center", paddingLeft:'20px'}}>
                                        <div style={{display:'flex', alignItems: "center"}}>
                                            {
                                                dato.tieneSubmodulos == true
                                                ?dato.abierto == true
                                                    ?<DownOutlined 
                                                        style={{cursor:'pointer'}}
                                                        onClick={() => dispatch(AbrirModuloReducer(posicion, dato.abierto == null ? true : !dato.abierto))}
                                                    />
                                                    :<RightOutlined 
                                                        style={{cursor:'pointer'}}
                                                        onClick={() => dispatch(AbrirModuloReducer(posicion, dato.abierto == null ? true : !dato.abierto))}
                                                    />
                                                
                                                
                                                :<div style={{width:'14px'}} />
                                            }
                                            <img width={"32px"} src={dato.paiicono} style={{marginRight:'1px', marginLeft:'10px'}} />    
                                            <img width={"32px"} src={dato.icono} style={{marginRight:'10px', marginLeft:'10px'}} />    
                                            <img width={"32px"} src={dato.iconoSeleccionado} style={{marginRight:'10px',}} />
                                            <div id="Texto-Tabla-Administrador-Modulos">{dato.nombreModulo}</div>
                                        </div>
                                    </Col>
    
                                    <Col xl={12} style={{textAlign: "-webkit-right", paddingRight:'20px'}}>
                                        <div style={{display: "flex", float: "right", alignItems: "center"}}>
                                            <img
                                                src={IconoMas}
                                                id="Icono-Fila-Editar-Administrador"
                                                onClick={() => props.seleccionarModulo(dato.modid, dato.modruta+"/")}
                                            />
                                            <img
                                                src={IconoEditar}
                                                id="Icono-Fila-Editar-Administrador"
                                                onClick={() => SeleccionarModuloEditar(dato)}
                                            />
                                            <img
                                                src={IconoEliminar}
                                                id="Icono-Fila-Editar-Administrador"
                                                onClick={() => mostrarModalEliminarModulo(dato.modid)}
                                            />
                                            {/* <div id="Texto-fecha-Administrador-ControlData">{dato.fechaEdicion}</div> */}
                                            <div id="Texto-fecha-Administrador-ControlData">{Moment(dato.created_at).format('D MMM')}</div>
                                        </div>
                                    </Col>
                                </Row>
    
                                {/* Submodulos */}
                                {
                                    dato.abierto == true
                                    ?dato.submodulos.map((submodulo, posicionSubModulo) => {
                                        return (
                                            <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}  spinning={submodulo.cargando == true ? true : false}>
                                                <Row id="Fila-Tabla-Administrador" style={{paddingLeft:'35px'}}>
                                                    
                                                    <Col xl={12} style={{placeSelf: "center", paddingLeft:'20px'}}>
                                                        <div style={{display:'flex', alignItems: "center"}}>
                                                            <div id="Texto-Tabla-Administrador-Modulos">{submodulo.smonombre}</div>
                                                        </div>
                                                    </Col>
    
                                                    <Col xl={12} style={{textAlign: "-webkit-right", paddingRight:'20px'}}>
                                                        <div style={{display: "flex", float: "right", alignItems: "center"}}>
                                                            <img
                                                                src={IconoEditar}
                                                                id="Icono-Fila-Editar-Administrador"
                                                                onClick = {() => SeleccionarSubModuloEditar(submodulo)}
                                                            />
                                                            <img
                                                                src={IconoEliminar}
                                                                id="Icono-Fila-Editar-Administrador"
                                                                onClick={() => mostrarModalEliminarSubModulo(
                                                                    posicion, 
                                                                    posicionSubModulo,
                                                                    dato.modid,
                                                                    submodulo.smoid
                                                                )}
                                                            />
                                                            <div id="Texto-fecha-Administrador-ControlData">{Moment(submodulo.created_at).format('D MMM')}</div>
                                                        </div>
                                                    </Col>
                                                    
                                                </Row>
                                            </Spin>
                                        )
                                    })
                                    :null
                                }
                            </div>
                        )
                    })
                }
            </Spin>


            <ModalEditarModulo 
                modalEditarModulo    = {modalEditarModulo}
                setModalEditarModulo = {setModalEditarModulo}
                moduloSeleccionadoEditar = {moduloSeleccionadoEditar}
                SeleccionarModuloEditar  = {SeleccionarModuloEditar}

            />

            <ModalEditarSubModulo 
                modalEditarSubModulo = {modalEditarSubModulo}
                setModalEditarSubModulo = {setModalEditarSubModulo}
                submoduloSeleccionadoEditar = {submoduloSeleccionadoEditar}
            />
        </Col>
    )
}










const SortableItem = SortableElement(({value}) => value);

const SortableList = SortableContainer(({items}) => {
    
    Moment.locale('en');

    const dispatch = useDispatch();

    return (
        <ul style={{marginLeft:'-25px'}}>
            {/* {items.map((value, index) => (
                <SortableItem key={`item-${value.modid}`} index={index} value={value.modorden + " - "+value.nombreModulo} />
            ))} */}

            {items.map((dato, posicion) => (
                <SortableItem 
                    key={`item-${dato.modid}`} 
                    index={posicion} 
                    value={
                        <div>
                            <Row 
                                id="Fila-Tabla-Administrador"
                                style={
                                    dato.abierto == true
                                    ?{
                                        boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.25)"
                                    }
                                    :{}
                                }
                            >
                                <Col xl={12} style={{placeSelf: "center", paddingLeft:'20px'}}>
                                    <div style={{display:'flex', alignItems: "center"}}>
                                        <div style={{marginRight:'20px', marginTop:'10px'}}>
                                            <span className="gx-draggable-icon gx-pt-2">
                                                <i className="icon icon-expand" style={{fontSize:'25px'}}></i>
                                            </span>
                                        </div>
                                        {
                                            dato.tieneSubmodulos == true
                                            ?dato.abierto == true
                                                ?<DownOutlined 
                                                    style={{cursor:'pointer'}}
                                                />
                                                :<RightOutlined 
                                                    style={{cursor:'pointer'}}
                                                />
                                            
                                            
                                            :<div style={{width:'14px'}} />
                                        }
                                        <img width={"32px"} src={dato.paiicono} style={{marginRight:'1px', marginLeft:'10px'}} />    
                                        <img width={"32px"} src={dato.icono} style={{marginRight:'10px', marginLeft:'10px'}} />    
                                        <img width={"32px"} src={dato.iconoSeleccionado} style={{marginRight:'10px',}} />
                                        <div id="Texto-Tabla-Administrador-Modulos">{dato.nombreModulo}</div>
                                    </div>
                                </Col>

                                <Col xl={12} style={{textAlign: "-webkit-right", paddingRight:'20px'}}>
                                    <div style={{display: "flex", float: "right", alignItems: "center"}}>
                                        <img
                                            src={IconoMas}
                                            id="Icono-Fila-Editar-Administrador"
                                            // onClick={() => props.seleccionarModulo(dato.modid, dato.modruta+"/")}
                                        />
                                        <img
                                            src={IconoEditar}
                                            id="Icono-Fila-Editar-Administrador"
                                        />
                                        <img
                                            src={IconoEliminar}
                                            id="Icono-Fila-Editar-Administrador"
                                        />
                                        {/* <div id="Texto-fecha-Administrador-ControlData">{dato.fechaEdicion}</div> */}
                                        <div id="Texto-fecha-Administrador-ControlData">{Moment(dato.created_at).format('D MMM')}</div>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    } 
                />
            ))}
        </ul>
    );
});


const SortableComponent = (props) => {

    const dispatch = useDispatch();

    const onSortEnd = (uno, dos) => {
        console.log(uno)
        console.log(dos)

        dispatch(
            CambiarPosicionModulosReducer(uno.oldIndex, uno.newIndex)
        )
    }

    return (
        <SortableList 
            items={props.items}
            onSortEnd={onSortEnd}
        />
    )
}




export default TablaModulos
