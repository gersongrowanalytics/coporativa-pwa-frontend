import React from 'react'
import {Form, Input, Button, Modal} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {VisibilidadModalNuevoUsuarioReducer, CrearUsuarioReducer, ObtenerListaUsuariosReducer} from "../../../../appRedux/actions/ControlAcceso/Usuarios/Usuarios";
import '../../../../styles/Sistema/components/ControlAcceso/Usuarios/ModalNuevoUsuario.css'

const ModalNuevoUsuario = () => {
    
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    const { 
        visibleModalNuevoUsuario, 
        cargandoNuevoUsuario 
    } = useSelector(({controlesAccesosUsuarios}) => controlesAccesosUsuarios);

    const enviarFormulario = async values => {
        // console.log(values.tpuprivilegio)
        await dispatch(CrearUsuarioReducer(values))
        await dispatch(ObtenerListaUsuariosReducer())
        await form.resetFields();
    }

    return (
        <Modal
            title       = "Nuevo Usuario"
            visible     = {visibleModalNuevoUsuario}
            // visible     = {true}
            onOk        = { () => dispatch(VisibilidadModalNuevoUsuarioReducer(false))}
            onCancel    = { () => dispatch(VisibilidadModalNuevoUsuarioReducer(false))}
            footer      = {null}
        >
            <div style={{paddingLeft:'20px', paddingRight:'20px'}}>
                <Form 
                    form    = {form}
                    onFinish= {enviarFormulario}
                    name    = "formNuevoRebate"   
                > 
                    <div id="tituloItemFormulario" >Nombre</div>
                    <Form.Item label="" name="pernombre">  
                        <Input 
                            className="gx-mb-3 gx-w-100" 
                            rules={[{ required: true, message: 'Es necesario un Nombre' }]}
                            autoComplete={"off"}
                        />
                    </Form.Item>

                    <div id="tituloItemFormulario" >Apellido Paterno</div>
                    <Form.Item label="" name="perapellidopaterno">  
                        <Input 
                            className="gx-mb-3 gx-w-100" 
                            autoComplete={"off"}
                        />
                    </Form.Item>

                    <div id="tituloItemFormulario" >Apellido Materno</div>
                    <Form.Item label="" name="perapellidomaterno">  
                        <Input 
                            className="gx-mb-3 gx-w-100" 
                            autoComplete={"off"}
                        />
                    </Form.Item>
                    <div id="tituloItemFormulario" >Correo</div>
                    <Form.Item label="" name="usucorreo">  
                        <Input 
                            className="gx-mb-3 gx-w-100" 
                            autoComplete={"off"}
                        />
                    </Form.Item>

                    <div id="tituloItemFormulario" >Usuario</div>
                    <Form.Item label="" name="usuusuario">  
                        <Input 
                            className="gx-mb-3 gx-w-100" 
                            autoComplete={"off"}
                        />
                    </Form.Item>

                    <div id="tituloItemFormulario" >Contraseña</div>
                    <Form.Item label="" name="usucontrasena">  
                        <Input.Password 
                            className="gx-mb-3 gx-w-100" 
                            autoComplete={"off"}
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button className="gx-mb-0"
                            type="primary"
                            htmlType="submit"
                            loading={cargandoNuevoUsuario}
                        >
                            {
                                cargandoNuevoUsuario == true
                                ?"Enviando"
                                :"Enviar"
                            }
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </Modal>
    )
}

export default ModalNuevoUsuario