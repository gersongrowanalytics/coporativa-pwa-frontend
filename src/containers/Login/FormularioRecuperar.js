import React, {useState, useEffect} from 'react'
import VideoIniciarSesion from '../../assets/Videos/Login/videologin.mp4';
import {Modal, Form, Input, Button} from "antd";
import '../../styles/Login/FormularioLogin.css'
import '../../styles/Login/FormularioRecuperar.css'
import {
    EnviarEmailRecuperarContraseniaReducer
} from '../../appRedux/actions/Auth';
import {useDispatch, useSelector} from "react-redux";
import {Link, useHistory} from "react-router-dom";
import iconoCerrarModal from '../../assets/images/iconos/Perfil/cerrarModal.png';
import GrowLogoLogin from '../../assets/images/Login/growlogo.png'
import ImagenPeru from '../../assets/images/Login/banderaPeru.png'
import ImagenChile from '../../assets/images/Login/banderaChile.png'
import ImagenMexico from '../../assets/images/Login/banderaMexico.png'
import ImagenArgentina from '../../assets/images/Login/banderaArgentina.png'

const FormularioRecuperar = (props) => {
    
    const history = useHistory();

    const dispatch = useDispatch();

    const onFinish = async values =>  {

    };

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [cargandoRecuperar, setCargandoRecuperar] = useState(false);

    const showModal = async () => {
        setCargandoRecuperar(true)
        let res = await dispatch(EnviarEmailRecuperarContraseniaReducer(txtCorreoRecuperar))

        if(res == true){
            setIsModalVisible(true);
        }

        setCargandoRecuperar(false)
    };

    const handleOk = () => {
        setIsModalVisible(false);
        history.push('/login');
    };

    const [txtCorreoRecuperar, setTxtCorreoRecuperar] = useState("");

    const capturarTxtCorreoRecuperar = (e) => {
        setTxtCorreoRecuperar(e.target.value);
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
                id="Login-Formulario" 
                style={{
                    textAlign: "-webkit-center", 
                    width:'30%'
                }}>
                <Form
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
                        <Button 
                            loading={cargandoRecuperar}
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
                        }>Solicitar</Button>
                    </div>
                </Form>
            </div>
            
            <div
                id="Contenedor-Logos-Paises"
            >
                <img
                    id="Bandera-Pais-Login" 
                    src={ImagenPeru} />
                <img
                    id="Bandera-Pais-Login" 
                    src={ImagenChile} />
                <img
                    id="Bandera-Pais-Login" 
                    src={ImagenMexico} />
                <img
                    id="Bandera-Pais-Login" 
                    src={ImagenArgentina} />
            </div>

            <div id="Contenedor-Logo-Grow-Login">
                <img 
                    src={GrowLogoLogin}
                    id="Logo-Grow-Blanco-Negro-Login"
                />
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
                <div id="Contenedor-Modal-Recuperar">
                    <div style={{textAlign: "-webkit-center"}}>
                        <span id="Titulo-Modal-Recuperar">Su solicitud fue enviada a su correo con éxito</span><br/>
                        <span id="SubTitulo-Modal-Recuperar">Si no has recibido el email de confirmación, puedes <span id="Link-SubTitulo-Modal-Recuperar">reenviarlo.</span></span>
                        <div id="Contenedor-Btn-Modal-Recuperar" onClick={handleOk}> 
                            <span id="Texto-Btn-Modal-Recuperar" >Listo</span>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default FormularioRecuperar
