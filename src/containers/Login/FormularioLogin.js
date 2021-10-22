import React, {useState, useEffect} from 'react'
import ImagenPeru from '../../assets/images/Login/banderaPeru.png'
import ImagenChile from '../../assets/images/Login/banderaChile.png'
import ImagenBolivia from '../../assets/images/Login/banderaBolivia.png'
import ImagenAndes from '../../assets/images/Login/banderaAndes.png'
import VideoIniciarSesion from '../../assets/Videos/Login/videologin.mp4';
import {Form, Input, Select, Button } from "antd";
import {Link} from "react-router-dom";
import '../../styles/Login/FormularioLogin.css'
import {
    userSignIn,
    SeleccionarPaisReducer
} from '../../appRedux/actions/Auth';
import {useDispatch, useSelector} from "react-redux";
import { mostrarPaisesReducer } from "../../appRedux/actions/Auth";
import GrowLogoLogin from '../../assets/images/Login/growlogo.png'

const FormularioLogin = (props) => {

    const [txtPaisSeleccionado, setTxtPaisSeleccionado] = useState("0");
    const [txtPosicionPaisSeleccionado, setTxtPosicionPaisSeleccionado] = useState("");

    const dispatch = useDispatch();

    const onFinish = async values =>  {

        values['pais'] = txtPaisSeleccionado
        values['posicionPais'] = txtPosicionPaisSeleccionado
        // console.log(values)
        // dispatch(showAuthLoader());
        dispatch(userSignIn(values));
    };

    const seleccionarPaisEspecifico = (valorPais) => {
        var pais = valorPais.split('-');
        setTxtPaisSeleccionado(pais[0])
        setTxtPosicionPaisSeleccionado(pais[1])
        dispatch(SeleccionarPaisReducer(pais[1]))
    }

    const {listaPaises} = useSelector(({auth}) => auth);

    useEffect(() => {
        dispatch(mostrarPaisesReducer())
    }, []);

    return (
        <div id="Login-Contenedor-Formulario">
            <div style={{position:'absolute', width:'100%'}}>
                {
                    props.mostrarVideoLogin == true
                    ?<video autoPlay loop id="FullScreen-Video" >
                        <source src={VideoIniciarSesion}  type="video/mp4"/>
                        Your browser does not support the video tag.
                    </video>
                    :null
                }                
            </div>

            <div id="Login-Formulario-Capa" />
            {/* <img src={ImagenPortada} id="Login-Formulario-Fondo" /> */}
            <div id="Login-Formulario">
                <Form
                    onFinish={onFinish}
                >
                    <p onClick={() => console.log(listaPaises)} id="Login-Formulario-Titulo" style={{marginLeft: "-20px"}}>Iniciar sesión</p>
                    {/* <span id="Login-Formulario-Texto" style={{marginLeft: "-15px"}}>Usuario</span> */}

                    <Form.Item
                        name="pais"
                    >
                        <Select
                            // showSearch
                            placeholder="País"
                            style={{ 
                                width: "299px",
                                marginLeft: "-15px",
                                fontFamily: "Segoe UI",
                                fontStyle: "normal",
                                fontSize: "18px",
                                lineHeight: "21px",
                            }}
                            size={"large"}
                            onChange={(e) => seleccionarPaisEspecifico(e)}
                            // onChange={(e) => setTxtPaisSeleccionado(e)}
                        >
                            {
                                listaPaises.map((pais, posicion) => {
                                    return (
                                        <Select.Option 
                                            // value={pais.paiid}>{pais.painombre}</Select.Option>
                                            value={pais.paiid+"-"+posicion}>{pais.painombre}</Select.Option>
                                    )
                                })
                            }
                            
                            {/* <Select.Option value="Chile">Chile</Select.Option>
                            <Select.Option value="Mexico">México</Select.Option>
                            <Select.Option value="Argentina">Argentina</Select.Option> */}
                        </Select>

                    </Form.Item>

                    <Form.Item
                        initialValue=""
                        name="usuario"
                        rules= {[{required: true, message:"Es necesario un usuario"}]}
                    >
                        <Input 
                            autoComplete={"off"}
                            id="Login-Formulario-Input" 
                            style={{marginLeft: "-15px"}}
                            placeholder="Correo" />

                    </Form.Item>
                    {/* <br/> */}
                    {/* <span id="Login-Formulario-Texto" style={{marginLeft: "-15px"}}>Contraseña</span> */}
                    <Form.Item
                        initialValue=""
                        rules= {[{required: true, message:"Es necesario una contraseña"}]}
                        name="contrasena"
                    >
                        
                        <Input.Password 
                            placeholder="Contraseña"
                            type="password"
                            name="contrasena"
                            id="Login-Formulario-Input-Password"
                            style={{marginLeft: "-15px"}}
                        />
                        
                    </Form.Item>
                    <br/>
                    <Link 
                        to="/recuperar" >
                            <span style={{marginLeft: "-15px"}} id="Login-Formulario-Texto">¿Olvidaste tu contraseña?</span>
                    </Link>
                    <br/>
                    <Button 
                        htmlType="submit"
                        disabled={
                            txtPaisSeleccionado == "0"
                            ?true
                            :false
                        }
                        style={{marginLeft: "-15px", borderRadius: "8px"}} 
                        id={
                            txtPaisSeleccionado == "0"
                            ?"Login-Formulario-Btn-Desactivado-Iniciar"
                            :"Login-Formulario-Btn-Iniciar"
                        }
                    >Iniciar Sesión</Button>
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
                    src={ImagenBolivia} />
                <img
                    id="Bandera-Pais-Login" 
                    src={ImagenAndes} />
            </div>

            <div id="Contenedor-Logo-Grow-Login">
                <img 
                    src={GrowLogoLogin}
                    id="Logo-Grow-Blanco-Negro-Login"
                />
            </div>
        </div>
    )
}

export default FormularioLogin
