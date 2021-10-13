import React from 'react'
import {Form, Input, Button, Modal} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {VisibilidadModalNuevoTipoUsuarioReducer, CrearTipoUsuarioReducer} from "../../../../appRedux/actions/ControlAcceso/TiposUsuarios/TiposUsuarios";

const ModalNuevoTipoUsuario = () => {
    
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    const { 
        visibleModalNuevoTipoUsuario, 
        cargandoNuevoTipoUsuario 
    } = useSelector(({controlesAccesosTiposUsuarios}) => controlesAccesosTiposUsuarios);

    const enviarFormulario = async values => {
        // console.log(values.tpuprivilegio)
        await dispatch(CrearTipoUsuarioReducer(values))
        await form.resetFields();
    }

    return (
        <Modal
            title       = "Nuevo Tipo de Usuario"
            visible     = {visibleModalNuevoTipoUsuario}
            // visible     = {true}
            onOk        = { () => dispatch(VisibilidadModalNuevoTipoUsuarioReducer(false))}
            onCancel    = { () => dispatch(VisibilidadModalNuevoTipoUsuarioReducer(false))}
            footer      = {null}
        >
            <div style={{paddingLeft:'20px', paddingRight:'20px'}}>
                <Form 
                    form    = {form}
                    onFinish= {enviarFormulario}
                    name    = "formNuevoRebate"   
                > 
                    <div id="tituloItemFormulario" >Nombre</div>
                    <Form.Item label="" name="tpunombre">  
                        <Input 
                            className="gx-mb-3 gx-w-100" 
                            rules={[{ required: true, message: 'Es necesario un Nombre' }]}
                            autoComplete={"off"}
                        />
                    </Form.Item>

                    <div id="tituloItemFormulario" >Privilegio</div>
                    <Form.Item label="" name="tpuprivilegio">  
                        <Input 
                            className="gx-mb-3 gx-w-100" 
                            autoComplete={"off"}
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button className="gx-mb-0"
                            type="primary"
                            htmlType="submit"
                            loading={cargandoNuevoTipoUsuario}
                        >
                            {
                                cargandoNuevoTipoUsuario == true
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

export default ModalNuevoTipoUsuario