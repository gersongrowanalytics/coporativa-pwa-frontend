import React from 'react'
import { Modal } from 'antd'
import iconoCerrarModal from '../../../assets/images/iconos/Perfil/cerrarModal.png';

const ModalEliminar = (props) => {
    return (
        <Modal 
            title={null}
            visible={props.mostrarModalEliminarArchivo}
            footer={null}
            centered
            closeIcon={<img onClick={props.ocultarModal} src={iconoCerrarModal} id="" />}
            width={"378px"}
        >
            <div id="Contenedor-Modal-Eliminar-Control-Archivo">
                <div>
                    <div id="Titulo-Modal-Eliminar-Control-Archivo">¿Está seguro que desea eliminar el archivo?</div>
                    <div id="Contenedor-Btn-Eliminar-Control-Archivo">
                        <div id="Texto-Btn-Eliminar-Control-Archivo">
                            Eliminar
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default ModalEliminar
