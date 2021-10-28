import React from 'react'
import {Modal, Form, Button} from 'antd'
import iconoCerrarModal from '../../../../assets/images/iconos/Perfil/cerrarModal.png';
import {useDispatch, useSelector} from "react-redux";
import {CrearTipoUsuarioReducer} from "../../../../appRedux/actions/ControlAcceso/TiposUsuarios/TiposUsuarios";
import '../../../../styles/Sistema/Administrador/TiposUsuario/TiposUsuario.css';

const ModalCrearTipoUsuario = (props) => {

    const [form] = Form.useForm();
    const dispatch = useDispatch();

    const { 
        cargandoNuevoTipoUsuario 
    } = useSelector(({controlesAccesosTiposUsuarios}) => controlesAccesosTiposUsuarios);

    const enviarFormulario = async values => {
        // console.log(values.tpuprivilegio)
        await dispatch(CrearTipoUsuarioReducer(values))
        await form.resetFields();
    }

    return (
        <Modal 
            closeIcon={<img onClick={() => props.abrirModalCrearTipoUsuario()} src={iconoCerrarModal} 
            id="" />}
            title={null} 
            visible={props.mostrarModalCrearTipoUsuario} 
            // visible={true} 
            footer={null} 
            centered
            width={"378px"}
        >
            <Form 
                form    = {form}
                onFinish= {enviarFormulario}
                name    = "formNuevoRebate"   
            > 
                <div id="Contenedor-Modal-Crear-Usuario-Administrador">
                    <div>
                        <div id="Texto-Crear-Permiso-Administrador">Nombre</div>
                        <Form.Item label="" name="tpunombre">
                            <input autoComplete={"off"} id="Input-Crear-Permiso-Administrador" />
                        </Form.Item>

                        <div id="Texto-Crear-Permiso-Administrador">Privilegio</div>
                        <Form.Item label="" name="tpuprivilegio">
                            <input autoComplete={"off"} id="Input-Crear-Permiso-Administrador" />
                        </Form.Item>
                        

                        <div style={{textAlign: "-webkit-center"}}>
                            <Button className="gx-mb-0"
                                type="primary"
                                htmlType="submit"
                                loading={cargandoNuevoTipoUsuario}
                                id="Contenedor-Btn-Crear-Permiso-Administrador"
                            >
                                {
                                    cargandoNuevoTipoUsuario == true
                                    ?"Enviando"
                                    :"Crear"
                                }
                            </Button>
                        </div>
                    </div>
                </div>
            </Form>

        </Modal>
    )
}

export default ModalCrearTipoUsuario
