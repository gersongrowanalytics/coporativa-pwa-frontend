import React from 'react'
import {Form, Input, Button, Modal} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {VisibilidadModalNuevoPermisoReducer, CrearPermisoReducer} from "../../../../appRedux/actions/ControlAcceso/Permisos/Permisos";
// import 'styles/sistema/Controles/Accesos/Permisos/Permisos.css'

const ModalNuevoPermiso = () => {
    
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    const { 
        visibleModalNuevoPermiso, 
        cargandoNuevoPermiso 
    } = useSelector(({controlesAccesosPermisos}) => controlesAccesosPermisos);

    const enviarFormulario = async values => {
        console.log(values)
        await dispatch(CrearPermisoReducer(values))
        await form.resetFields();
    }

    return (
        <Modal
            title       = "Nuevo Permiso"
            visible     = {visibleModalNuevoPermiso}
            onOk        = { () => dispatch(VisibilidadModalNuevoPermisoReducer(false))}
            onCancel    = { () => dispatch(VisibilidadModalNuevoPermisoReducer(false))}
            footer      = {null}
        >
            <div style={{paddingLeft:'20px', paddingRight:'20px'}}>
                <Form 
                    form    = {form}
                    onFinish= {enviarFormulario}
                    name    = "formNuevoRebate"   
                > 
                    <div id="tituloItemFormulario" >Permiso</div>
                    <Form.Item label="" name="pemnombre">  
                        <Input 
                            className="gx-mb-3 gx-w-100" 
                            rules={[{ required: true, message: 'Es necesario un Permiso' }]}
                            autoComplete={"off"}
                        />
                    </Form.Item>

                    <div id="tituloItemFormulario" >Slug</div>
                    <Form.Item label="" name="pemslug">  
                        <Input 
                            className="gx-mb-3 gx-w-100" 
                            rules={[{ required: true, message: 'Es necesario un Slug' }]}
                            autoComplete={"off"}
                        />
                    </Form.Item>

                    <div id="tituloItemFormulario" >Ruta</div>
                    <Form.Item label="" name="pemruta">  
                        <Input 
                            className="gx-mb-3 gx-w-100" 
                            rules={[{ required: true, message: 'Es necesario una ruta' }]}
                            autoComplete={"off"}
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button className="gx-mb-0"
                            type="primary"
                            htmlType="submit"
                            loading={cargandoNuevoPermiso}
                        >
                            {
                                cargandoNuevoPermiso == true
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

export default ModalNuevoPermiso