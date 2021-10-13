import React from 'react'
import {Row, Col, Modal, Button} from 'antd'
import iconoCerrarModal from '../../../../assets/images/iconos/Perfil/cerrarModal.png';
import IconoImagenAzul from '../../../../assets/images/iconos/Administrador/imagenazul.png';
import {CrearDataReducer} from "../../../../appRedux/actions/Administrador/ControlData/ControlData"
import {useDispatch, useSelector} from "react-redux";

const ModalCrearData = (props) => {

    const dispatch = useDispatch();

    const { 
        cargandoNuevaData
    } = useSelector(({controlData}) => controlData);

    const crearDataArchivo = async () => {
        const formData = new FormData();
        formData.append('ardnombre', props.crearNombreArchivo)
        formData.append('ardarchivo', props.crearArchivo)
        let arrayImagenes = [props.crearImagenUno, props.crearImagenDos, props.crearImagenTres]
        var nuevoArrayImagenes = JSON.stringify(arrayImagenes);
        formData.append('ardimagenes', nuevoArrayImagenes)

        await dispatch(CrearDataReducer(formData))
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
            width={"378px"}
        >
            
            <div id="Contenedor-Modal-Crear-Usuario-Administrador">
                <div>
                    <div
                        id="Texto-Crear-Permiso-Administrador">Archivo</div>
                    <div
                        onClick={props.seleccionarArchivo} 
                        id="Input-Seleccionar-Archivo-Administrador">
                            {props.nombreArchivoSeleccionado}
                    </div>


                    <div id="Texto-Crear-Permiso-Administrador">Nombre de Archivo</div>
                    <input 
                        name="crearNombreArchivo"
                        onChange={(e) => props.obtenerCambioInput(e)}
                        value={props.crearNombreArchivo}
                        autoComplete={"off"}
                        id="Input-Crear-Permiso-Administrador" 
                    />
                    
                    <div id="Texto-Crear-Permiso-Administrador">Imágenes</div>
                    <Row>
                        <Col xl={8} style={{paddingRight:'5px'}}>
                            {
                                props.crearImagenUno == null
                                ?<div id="Contenedor-Imagenes-Crear-ControlData" onClick={props.seleccionarImagenUno} >
                                    <img src={IconoImagenAzul} />
                                </div>
                                :<div id="Contenedor-Imagenes-Crear-ControlData" onClick={props.seleccionarImagenUno} >
                                    <img src={props.crearImagenUno} />
                                </div>
                            } 
                        </Col>
                        <Col xl={8} style={{paddingLeft:'5px', paddingRight:'5px'}}>
                            {
                                props.crearImagenDos == null
                                ?<div id="Contenedor-Imagenes-Crear-ControlData" onClick={props.seleccionarImagenDos}>
                                    <img src={IconoImagenAzul} />
                                </div>
                                :<div id="Contenedor-Imagenes-Crear-ControlData" onClick={props.seleccionarImagenDos} >
                                    <img src={props.crearImagenDos} />
                                </div>
                            } 
                        </Col>
                        <Col xl={8} style={{paddingLeft:'5px'}}>
                            {
                                props.crearImagenTres == null
                                ?<div id="Contenedor-Imagenes-Crear-ControlData" onClick={props.seleccionarImagenTres}>
                                    <img src={IconoImagenAzul} />
                                </div>
                                :<div id="Contenedor-Imagenes-Crear-ControlData" onClick={props.seleccionarImagenTres} >
                                    <img src={props.crearImagenTres} />
                                </div>
                            } 
                        </Col>
                    </Row>

                    <div style={{textAlign: "-webkit-center"}}>
                        <Button
                            onClick={crearDataArchivo}
                            loading={cargandoNuevaData}
                            id="Contenedor-Btn-Crear-Permiso-Administrador">
                                <div id="Texto-Btn-Crear-Permiso-Administrador">Crear</div>
                        </Button>
                        {/* <div id="Contenedor-Btn-Crear-Permiso-Administrador" onClick={crearDataArchivo}>
                            <div id="Texto-Btn-Crear-Permiso-Administrador">Crear</div>
                        </div> */}
                    </div>
                </div>
            </div>

        </Modal>
    )
}

export default ModalCrearData
