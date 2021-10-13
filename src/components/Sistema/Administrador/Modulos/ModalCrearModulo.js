import React, {useState} from 'react'
import {
    Row, 
    Col, 
    Modal, 
    Button,
    Select,
    Form
} from 'antd'
import iconoCerrarModal from '../../../../assets/images/iconos/Perfil/cerrarModal.png';
import IconoImagenAzul from '../../../../assets/images/iconos/Administrador/imagenazul.png';
import {CrearModuloReducer} from "../../../../appRedux/actions/Administrador/Modulos/Modulos"
import {useDispatch, useSelector} from "react-redux";

const ModalCrearModulo = (props) => {

    const dispatch = useDispatch();

    const [paiidSeleccionado, setPaiidSeleccionado] = useState("0");

    const { 
        cargandoNuevoModulo
    } = useSelector(({admModulos}) => admModulos);

    const {listaPaises} = useSelector(({auth}) => auth);

    const crearModulo = async () => {

        const formData = new FormData();
        formData.append('modnombre', props.crearNombreMenu)
        formData.append('powerbi', props.crearLinkPowerBi)
        formData.append('modruta', props.crearRutaModulo)
        formData.append('slugModulo', props.crearSlugPermisoModulo)
        formData.append('permisoModulo', props.crearDescripcionPermisoModulo)
        formData.append('modicono', props.crearIcono)
        formData.append('modiconoseleccionado', props.crearIconoSeleccionado)

        formData.append('paiid', paiidSeleccionado)

        await dispatch(CrearModuloReducer(formData))
        props.limpiarCamposCrear()
    }

    return (
        <Modal 
            closeIcon={<img onClick={() => props.abrirModalCrear()} src={iconoCerrarModal} 
            id="" />}
            title={null} 
            visible={props.mostrarModalCrear} 
            // visible={true} 
            footer={null} 
            centered
            width={"800px"}
        >
            
            <div id="Contenedor-Modal-Crear-Usuario-Administrador">
                <Row>
                    <Col xl={12} md={12} sm={12} xs={12} id="PrimeraFila-Modal-Crear-Usuario-Administrador">
                        <div>
                            <Row style={{}}>
                                <Col xl={8} style={{paddingRight:'5px',}}>
                                    <div id="Texto-Crear-Permiso-Administrador">Icono B/N</div>
                                    {
                                        props.crearIcono == null
                                        ?<div id="Contenedor-Imagenes-Crear-ControlData" onClick={props.seleccionarCrearIcono} >
                                            <img src={IconoImagenAzul} />
                                        </div>
                                        :<div id="Contenedor-Imagenes-Crear-ControlData" onClick={props.seleccionarCrearIcono} >
                                            <img src={props.crearIcono} />
                                        </div>
                                    } 
                                </Col>

                                <Col xl={8} style={{paddingLeft:'5px', paddingRight:'5px'}}>
                                    <div id="Texto-Crear-Permiso-Administrador">Icono Color</div>
                                    {
                                        props.crearIconoSeleccionado == null
                                        ?<div id="Contenedor-Imagenes-Crear-ControlData" onClick={props.seleccionarCrearIconoSeleccionado}>
                                            <img src={IconoImagenAzul} />
                                        </div>
                                        :<div id="Contenedor-Imagenes-Crear-ControlData" onClick={props.seleccionarCrearIconoSeleccionado} >
                                            <img src={props.crearIconoSeleccionado} />
                                        </div>
                                    } 
                                </Col>
                            </Row>

                            <div
                                id="Texto-Crear-Permiso-Administrador">Nombre de Menu</div>
                            <input 
                                name="crearNombreMenu"
                                onChange={(e) => props.obtenerCambioInput(e)}
                                value={props.crearNombreMenu}
                                autoComplete={"off"}
                                id="Input-Crear-Permiso-Administrador" 
                            />

                            <div id="Texto-Crear-Permiso-Administrador">Ruta del módulo</div>
                            <input 
                                name="crearRutaModulo"
                                onChange={(e) => props.obtenerCambioInput(e)}
                                value={props.crearRutaModulo}
                                autoComplete={"off"}
                                id="Input-Crear-Permiso-Administrador" 
                            />
                        </div>
                    </Col>

                    <Col xl={12} md={12} sm={12} xs={12} id="SegundaFila-Modal-Crear-Usuario-Administrador">

                        <div>
                            {/* <Row style={{}}>
                                <Col xl={8} style={{paddingLeft:'5px', paddingRight:'5px'}}>
                                    <div id="Texto-Crear-Permiso-Administrador">Icono Color</div>
                                    {
                                        props.crearIconoSeleccionado == null
                                        ?<div id="Contenedor-Imagenes-Crear-ControlData" onClick={props.seleccionarCrearIconoSeleccionado}>
                                            <img src={IconoImagenAzul} />
                                        </div>
                                        :<div id="Contenedor-Imagenes-Crear-ControlData" onClick={props.seleccionarCrearIconoSeleccionado} >
                                            <img src={props.crearIconoSeleccionado} />
                                        </div>
                                    } 
                                </Col>
                            </Row> */}
                            

                            <div id="Texto-Crear-Usuario-Administrador">País</div>
                            <Form.Item label="" name="paiid">
                                <Select 
                                    id="Input-Crear-Usuario-Administrador" 
                                    style={{ width: "328px", height: "41px"}} 
                                    onChange={(e) => setPaiidSeleccionado(e)}
                                >
                                    {
                                        listaPaises.map((pais) => {
                                            return ( 
                                                <Select.Option value={pais.paiid}>{pais.painombre}</Select.Option>
                                            )
                                        })
                                    }
                                </Select>
                            </Form.Item>

                            <div id="Texto-Crear-Permiso-Administrador">Link de Power BI</div>
                            <input 
                                name="crearLinkPowerBi"
                                onChange={(e) => props.obtenerCambioInput(e)}
                                value={props.crearLinkPowerBi}
                                autoComplete={"off"}
                                id="Input-Crear-Permiso-Administrador" 
                            />

                            <div id="Texto-Crear-Permiso-Administrador">Slug del permiso</div>
                            <input 
                                name="crearSlugPermisoModulo"
                                onChange={(e) => props.obtenerCambioInput(e)}
                                value={props.crearSlugPermisoModulo}
                                autoComplete={"off"}
                                id="Input-Crear-Permiso-Administrador" 
                            />
                        </div>
                    </Col>
                    <Col xl={24} md={24} sm={24} xs={24}>
                        <div id="Texto-Crear-Permiso-Administrador">Descripción del permiso</div>
                        <input 
                            style={{ width: "100%"}}
                            name="crearDescripcionPermisoModulo"
                            onChange={(e) => props.obtenerCambioInput(e)}
                            value={props.crearDescripcionPermisoModulo}
                            autoComplete={"off"}
                            id="Input-Crear-Permiso-Administrador" 
                        />
                    </Col>
                    <Col xl={24} md={24} sm={24} xs={24}>
                        <div style={{textAlign: "-webkit-center"}}>
                            <Button
                                onClick={crearModulo}
                                loading={cargandoNuevoModulo}
                                id="Contenedor-Btn-Crear-Permiso-Administrador">
                                    <div id="Texto-Btn-Crear-Permiso-Administrador">Crear</div>
                            </Button>
                        </div>
                    </Col>
                </Row>
                
            </div>

        </Modal>
    )
}

export default ModalCrearModulo
