import React from 'react'
import {Row, Col, Modal, Button} from 'antd'
import iconoCerrarModal from '../../../assets/images/iconos/Perfil/cerrarModal.png';
import iconoCamaraFondo from '../../../assets/images/iconos/Perfil/camaraFondo.png';
import {EditarImagenUsuarioPerfilReducer} from '../../../appRedux/actions/Perfil/Perfil'
import {useDispatch} from "react-redux";

const ModalEditarImagen = (props) => {

    const dispatch = useDispatch();

    const EditarImagenUsuario = async () => {
        props.CargandoEditarImagen(true)
        await dispatch(EditarImagenUsuarioPerfilReducer(props.file))
        props.CargandoEditarImagen(false)
        // console.log(props.file)
    }


    return (
        <Modal 
            title={null} 
            visible={props.modalVisible} 
            centered 
            footer={null} 
            closeIcon={<img onClick={() => props.ocultarModal()} src={iconoCerrarModal} id="Icono-Cerrar-Modal-Perfil" />}>
            

            <div id="Contenedor-Modal-Perfil">
                <span id="Titulo-Modal-Perfil">Actualizar tu foto de perfil</span>
                <div style={{cursor:'pointer'}}>
                    <img
                        onClick={props.seleccionarFile} 
                        src={props.file == null ?iconoCamaraFondo : props.file} 
                        id="Icono-Camara-Modal-Perfil" />
                </div>
                {
                    props.file == null
                    ?<div id="Contenedor-Btn-Modal-Perfil" onClick={() => props.ocultarModal()}>
                        <div id="Texto-Btn-Modal-Perfil">
                            + Subir foto
                        </div>
                    </div>
                    :<Row>
                        <Col xl={12}>
                            <div id="Contenedor-Btn-Cancelar-Modal-Perfil" onClick={() => props.ocultarModal()}>
                                <div id="Texto-Btn-Cancelar-Modal-Perfil">
                                    Cancelar
                                </div>
                            </div>
                        </Col>
                        <Col xl={12}>
                            <Button 
                                id="Contenedor-Btn-Guardar-Modal-Perfil" 
                                // onClick={() => props.ocultarModal()}
                                onClick={() => EditarImagenUsuario()}
                                loading={props.cargandoGuardarImagen}
                            >
                                <div id="Texto-Btn-Guardar-Modal-Perfil">
                                    Guardar
                                </div>
                            </Button>
                        </Col>
                    </Row>
                }
                
            </div>
        </Modal>
    )
}

export default ModalEditarImagen
