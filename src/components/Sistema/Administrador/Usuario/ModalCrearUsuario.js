import React, {useEffect, useState} from 'react'
import {Row, Col, Modal, Form, Button, Select } from 'antd'
import '../../../../styles/Sistema/Administrador/Usuarios/Usuario.css'
import iconoCerrarModal from '../../../../assets/images/iconos/Perfil/cerrarModal.png';
import {useDispatch, useSelector} from "react-redux";
import {CrearUsuarioReducer, ObtenerListaUsuariosReducer} from "../../../../appRedux/actions/ControlAcceso/Usuarios/Usuarios";

const ModalCrearUsuario = (props) => {

    const [form] = Form.useForm();
    const dispatch = useDispatch();

    const [tpuidSeleccionado, setTpuidSeleccionado] = useState("0");
    const [paiidSeleccionado, setPaiidSeleccionado] = useState("0");

    const { 
        visibleModalNuevoUsuario, 
        cargandoNuevoUsuario 
    } = useSelector(({controlesAccesosUsuarios}) => controlesAccesosUsuarios);

    const {
        listaTiposUsuarios
    } = useSelector(({controlesAccesosTiposUsuarios}) => controlesAccesosTiposUsuarios);

    const {listaPaises} = useSelector(({auth}) => auth);

    const enviarFormulario = async values => {
        
        values.tpuid = tpuidSeleccionado
        values.paiid = paiidSeleccionado
        
        await dispatch(CrearUsuarioReducer(values))
        await dispatch(ObtenerListaUsuariosReducer())
        await form.resetFields();
    }

    useEffect(() => {
        // dispatch(ObtenerListaTiposUsuariosReducer())
    }, [])
    
    return (
        <Modal 
            closeIcon={<img onClick={() => props.abrirModalCrearUsuario()} src={iconoCerrarModal} 
            id="" />}
            title={null} 
            visible={props.mostrarModalCrearUsuario} 
            // visible={true} 
            footer={null} 
            centered
            width={"800px"}
            style={{marginTop:'10px'}}
        >
            
            <div id="Contenedor-Modal-Crear-Usuario-Administrador">
                <Form 
                    form    = {form}
                    onFinish= {enviarFormulario}
                    name    = "formNuevoRebate"   
                    style = {{marginLeft:'0px'}}
                > 
                    <Row>
                        <Col xl={12} md={12} sm={24} xs={24} id="PrimeraFila-Modal-Crear-Usuario-Administrador">
                            <div>
                                <div id="Texto-Crear-Usuario-Administrador">Nombre</div>
                                <Form.Item label="" name="pernombre">
                                    <input autoComplete={"off"} id="Input-Crear-Usuario-Administrador" />
                                </Form.Item>

                                <div id="Texto-Crear-Usuario-Administrador">Apellido Paterno</div>
                                <Form.Item label="" name="perapellidopaterno">
                                    <input autoComplete={"off"} id="Input-Crear-Usuario-Administrador" />
                                </Form.Item>

                                <div id="Texto-Crear-Usuario-Administrador">Tipo de Usuario</div>
                                <Form.Item label="" name="tpuid">
                                    <Select 
                                        id="Input-Crear-Usuario-Administrador" 
                                        className="Select-Crear-Usuario-Administrador"
                                        onChange={(e) => setTpuidSeleccionado(e)}
                                    >
                                        {
                                            listaTiposUsuarios.map((tipousuario) => {
                                                return ( 
                                                    <Select.Option value={tipousuario.tpuid}>{tipousuario.tpunombre}</Select.Option>
                                                )
                                            })
                                        }
                                    </Select>
                                </Form.Item>

                                <div id="Texto-Crear-Usuario-Administrador">Contraseña</div>
                                <Form.Item label="" name="usucontrasena">
                                    <input type="password" id="Input-Crear-Usuario-Administrador" />
                                </Form.Item>
                                    
                                
                                <div id="Texto-Crear-Usuario-Administrador">País</div>
                                {/* <Form.Item label="" name="paiid"> */}
                                    <Select 
                                        mode="multiple"
                                        // id="Input-Crear-Usuario-Administrador" 
                                        className="Select-Crear-Usuario-Administrador"
                                        onChange={(e) => setPaiidSeleccionado(e)}
                                        autoComplete={"off"}
                                        allowClear
                                        maxTagCount={2}
                                    >
                                        {
                                            listaPaises.map((pais) => {
                                                return ( 
                                                    <Select.Option value={pais.paiid}>{pais.painombre}</Select.Option>
                                                )
                                            })
                                        }
                                    </Select>
                                {/* </Form.Item> */}
                            </div>
                        </Col>
                        <Col xl={12} md={12} sm={24} xs={24} id="SegundaFila-Modal-Crear-Usuario-Administrador">
                            <div>
                                <div id="Texto-Crear-Usuario-Administrador">Usuario</div>
                                <Form.Item label="" name="usuusuario">
                                    <input autoComplete={"off"} id="Input-Crear-Usuario-Administrador" />
                                </Form.Item>

                                <div id="Texto-Crear-Usuario-Administrador">Apellido Materno</div>
                                <Form.Item label="" name="perapellidomaterno">
                                    <input autoComplete={"off"} id="Input-Crear-Usuario-Administrador" />
                                </Form.Item>

                                <div id="Texto-Crear-Usuario-Administrador">Correo</div>
                                <Form.Item label="" name="usucorreo">
                                    <input autoComplete={"off"} id="Input-Crear-Usuario-Administrador" />
                                </Form.Item>

                                <div id="Texto-Crear-Usuario-Administrador">Correo Personal (gamil/hotmail)</div>
                                <Form.Item label="" name="usucorreopersonal">
                                    <input type="text" id="Input-Crear-Usuario-Administrador" />
                                </Form.Item>
                            </div>
                        </Col>
                        <Col xl={24} md={24} sm={24} xs={24}>
                            <div style={{textAlign: "-webkit-center"}}>
                                <Button className="gx-mb-0"
                                    type="primary"
                                    htmlType="submit"
                                    loading={cargandoNuevoUsuario}
                                    id="Contenedor-Btn-Crear-Permiso-Administrador"
                                >
                                    {
                                        cargandoNuevoUsuario == true
                                        ?"Enviando"
                                        :"Crear"
                                    }
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </div>

        </Modal>
    )
}

export default ModalCrearUsuario
