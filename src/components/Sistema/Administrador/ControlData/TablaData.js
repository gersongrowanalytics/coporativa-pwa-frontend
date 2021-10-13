import React, {useEffect} from 'react'
import {Row, Col, Checkbox, Spin, Modal} from 'antd'
import IconoEliminar from '../../../../assets/images/iconos/Tabla/tacho.png'
// import IconoEditar from 'assets/images/iconos/Tabla/editar.svg'
import {useDispatch, useSelector} from "react-redux";
import {ObtenerDataReducer, SeleccionarArchivosReducer} from "../../../../appRedux/actions/Administrador/ControlData/ControlData"
import { ExclamationCircleOutlined, LoadingOutlined } from '@ant-design/icons';
import {EliminarDataUnicoReducer} from "../../../../appRedux/actions/Administrador/ControlData/ControlData"

const TablaData = () => {

    const dispatch = useDispatch();

    const { confirm } = Modal;

    const { 
        cargandoDataArchivos,
        dataArchivos
    } = useSelector(({controlData}) => controlData);

    useEffect(() => {

        dispatch(ObtenerDataReducer())
        dispatch(SeleccionarArchivosReducer(0, false, true))

    }, [])


    function mostrarModalEliminar(idArchivo) {
        confirm({
            title: '¿Estas seguro de eliminar este archivos?',
            icon: <ExclamationCircleOutlined />,
            content: 'Recuerda que este cambio es instantaneo en los clientes',
            okText: 'Sí',
            okType: 'danger',
            cancelText: 'No',
            async onOk() {

                await dispatch(EliminarDataUnicoReducer(idArchivo))
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    return (        
        <Col xl={24}>
            <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} spinning={cargandoDataArchivos}>
            {
                dataArchivos.map((dato, posicion) => {
                    return (
                        <Row id="Fila-Tabla-Administrador">
                            <Col xl={7} style={{placeSelf: "center", paddingLeft:'20px'}}>
                                <div>
                                    {
                                        dato.editar == true
                                        ?dato.usuario
                                        :<Checkbox 
                                            onChange={
                                                (e) => dispatch(SeleccionarArchivosReducer(dato.ardid, e.target.checked, false))
                                            }>{dato.usuario}</Checkbox>
                                    }
                                </div>
                            </Col>
                            <Col xl={4} style={{placeSelf: "center"}}>
                                <div id="Texto-Nombres-Administrador-ControlData">
                                    <a 
                                        href={dato.archivo} 
                                        download=""
                                    >
                                        {dato.nombreArchivo}
                                    </a>
                                </div>
                            </Col>
                            <Col xl={10} style={{placeSelf: "center"}}>
                                <Row>
                                    {
                                        dato.imagenes.map((imagen, posicion) => {
                                            return (
                                                posicion == 0
                                                    ?<Col xl={8} style={{textAlignLast: "right"}}>
                                                        <img src={imagen.iadimagen} width={"46px"}/>
                                                    </Col>
                                                    :posicion == 1
                                                        ?<Col xl={8} style={{textAlignLast: "center"}}>
                                                            <img src={imagen.iadimagen} width={"46px"}/>
                                                        </Col>
                                                        :posicion == 2
                                                            ?<Col xl={8}>
                                                                <img src={imagen.iadimagen} width={"46px"}/>
                                                            </Col>
                                                            :null
                                            )
                                        })
                                    }
                                    {/* <Col xl={8} style={{textAlignLast: "center"}}>
                                        <img src={ImagenExcel} width={"46px"}/>
                                    </Col>
                                    <Col xl={8}>
                                        <img src={ImagenExcel} width={"46px"}/>
                                    </Col> */}
                                </Row>
                            </Col>
                            <Col xl={3} style={{textAlignLast: "right", display:'flex', placeItems: "center"}}>
                                {/* <img
                                    src={IconoEditar}
                                    id="Icono-Fila-Editar-Administrador"
                                /> */}
                                <img
                                    src={IconoEliminar}
                                    id="Icono-Fila-Editar-Administrador"
                                    onClick={() => mostrarModalEliminar(dato.ardid)}
                                />
                                <div id="Texto-fecha-Administrador-ControlData">{dato.fechaEdicion}</div>
                            </Col>
                        </Row>
                    )
                })
            }
            </Spin>
        </Col>
    )
}

export default TablaData
