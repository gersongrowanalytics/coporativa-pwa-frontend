import React, {useState, useEffect} from 'react'
import VideoIniciarSesion from '../../assets/Videos/Login/videologin.mp4';
import {Modal, Form, Input, message, Button} from "antd";
import '../../styles/Login/FormularioLogin.css'
import '../../styles/Login/FormularioCambiarContrasenia.css'
import '../../styles/Login/FormularioRecuperar.css'
import {
    cambiarContraseniaReducer
} from '../../appRedux/actions/Auth';
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import iconoCerrarModal from '../../assets/images/iconos/Perfil/cerrarModal.png';
import config from '../../config'

const FormularioCambiarContrasenia = (props) => {
    
    const history = useHistory();

    const dispatch = useDispatch();

    const onFinish = async values =>  {

        values['token'] = window.location.pathname.replace("/cambiar-contrasenia/", '')+window.location.hash
        // console.log(values)
        if(values['nuevaContrasenia'] != values['confirmarContrasenia']){
            message.error("Lo sentimos, las contraseñas deben ser las mismas");
        }else{
            setcargandoGuardar(true)
            let resultado = await dispatch(cambiarContraseniaReducer(values))
            setcargandoGuardar(false)
            if(resultado){
                setIsModalVisible(true)
            }
        }

    };

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [cargandoGuardar, setcargandoGuardar] = useState(false);

    const handleOk = () => {
        setIsModalVisible(false);
        history.push('/login');
    };

    const [txtConfContrasenia, setTxtConfContrasenia] = useState("");
    const [txtContrasenia, setTxtContrasenia] = useState("");

    const capturarTxtContrasenia = (e) => {
        setTxtContrasenia(e.target.value);
    };

    const capturarTxtConfContrasenia = (e) => {
        setTxtConfContrasenia(e.target.value);
    };

    const {
        authUser
    }= useSelector(({auth}) => auth);

    useEffect(() => {
        if (authUser !== null) {
            history.push('/sistema/categorias');
        }
    });

    return (
        <div id="Login-Contenedor-Formulario">
            <div style={{position:'absolute', width:'100%'}}>
                {
                    props.mostrarVideoLogin == true
                    ?<video width="100%" height="100%" autoPlay loop >
                        <source src={VideoIniciarSesion} type="video/mp4"/>
                        Your browser does not support the video tag.
                    </video>
                    :null
                } 
            </div>

            <div id="Login-Formulario-Capa" />
            {/* <img src={ImagenPortada} id="Login-Formulario-Fondo" /> */}
            <div 
                id="Cambiar-Contrasenia-Contenedor-Formulario" 
                style={{
                    textAlign: "-webkit-center", 
                    width:'30%'
                }}>
            <Form
                onFinish={onFinish}
            >

                    <div id="Cambiar-Contrasenia-Card-Formulario">
                        <div id="Titulo-Cambiar-Contrasenia-Card-Formulario">{config.nombreSistema}</div>
                        <div 
                            id="Titulo-Input-Cambiar-Contrasenia-Formulario"
                        >* Nueva contraseña</div>
                        <Form.Item
                            initialValue=""
                            name="nuevaContrasenia"
                            rules= {[{
                                required: true, 
                                message:"Es necesario una nueva contraseña"
                            }]}
                        >
                            <Input.Password
                                autoComplete={"off"}
                                id="Cambiar-Contrasenia-Formulario-Input" 
                                placeholder=""
                                style={{
                                    width:'100%',
                                    background: '#F0F2F5'
                                }}
                                onChange={(e) => capturarTxtContrasenia(e)}
                            />

                        </Form.Item>

                        <div 
                            id="Titulo-Input-Cambiar-Contrasenia-Formulario"
                        >* Confirmar nueva contraseña</div>
                        <Form.Item
                            initialValue=""
                            name="confirmarContrasenia"
                            rules= {[{
                                required: true, 
                                message:"Es necesario confirmar la contraseña"
                            }]}
                        >
                            <Input.Password
                                autoComplete={"off"}
                                id="Cambiar-Contrasenia-Formulario-Input" 
                                placeholder=""
                                style={{
                                    width:'100%',
                                    background: '#F0F2F5'
                                }}
                                onChange={(e) => capturarTxtConfContrasenia(e)}
                            />

                        </Form.Item>

                        <Button
                            type="primary" htmlType="submit"
                            loading={cargandoGuardar}
                            id="Btn-Guardar-Cambiar-Contrasenia-Formulario">
                            Guardar
                        </Button>
                    </div>


                {/* <Form
                    onFinish={onFinish}
                >
                    <p id="Login-Formulario-Titulo">Restablecer contraseña</p>
                    <div style={{width: "80%"}}>
                        <p id="Subtitulo-Formulario-Titulo">Si no conoces tu contraseña actual, puedes solicitarla</p>
                        <Form.Item
                            initialValue=""
                            name="usuario"
                            rules= {[{
                                required: true, 
                                message:"Es necesario un correo"
                            }]}
                        >
                            <Input 
                                autoComplete={"off"}
                                id="Login-Formulario-Input" 
                                placeholder="Correo electrónico"
                                style={{
                                    width:'95%', 
                                    marginLeft:'10px', 
                                    marginRight:'60px', 
                                    marginLeft: "0px"
                                }}
                                onChange={(e) => capturarTxtCorreoRecuperar(e)}
                            />

                        </Form.Item>
                        <Link to="/login" >
                            <span id="Login-Formulario-Texto" style={{float:'left'}}>Iniciar sesión</span>
                        </Link>
                        <br/>
                        <button 
                            onClick={
                                txtCorreoRecuperar.length > 0
                                ?showModal
                                :null
                            }
                            id={
                                txtCorreoRecuperar.length > 0
                                ?"Recuperar-Formulario-Btn-Solicitar-Activado"
                                :"Recuperar-Formulario-Btn-Solicitar-Desactivado"
                            }
                            style={{
                                width:'95%', 
                                borderRadius: "8px", 
                                marginLeft: "-15px"
                            }
                        }>Solicitar</button>
                    </div>
                </Form>
             */}
             </Form>
            </div>
            

            <Modal 
                centered 
                title={null} 
                visible={isModalVisible} 
                footer={null} 
                width={"418px"}
                bodyStyle={{
                    height:"166px"
                }}
                closeIcon={<img onClick={handleOk} src={iconoCerrarModal} id="" />}
            >
                <div
                    style={{
                        marginTop: '-20px'
                    }} 
                    id="Contenedor-Modal-Recuperar">
                    <div style={{textAlign: "-webkit-center"}}>
                        <div
                            style={{
                                fontFamily: "Segoe UI",
                                fontStyle: "normal",
                                fontWeight: "bold",
                                fontSize: "25px",
                                lineHeight: "33px",
                                color: "#1876F2",
                                marginBottom:'10px'
                            }}
                        >{config.nombreSistema}</div>
                        <span id="Titulo-Modal-Recuperar">Su contraseña fue recuperada con éxito</span><br/>
                        <span style={{float: "left"}} id="SubTitulo-Modal-Recuperar"><span id="Link-SubTitulo-Modal-Recuperar" onClick={handleOk}>Iniciar sesión.</span></span><br/>
                        <div
                            id="Contenedor-Btn-Modal-Recuperar" onClick={handleOk}> 
                            <span id="Texto-Btn-Modal-Recuperar" >Listo</span>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default FormularioCambiarContrasenia
