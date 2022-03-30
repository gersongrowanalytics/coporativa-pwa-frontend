import React, {useEffect, useState} from "react";
import {Layout, Row, Col} from "antd";
import Sidebar from "../Sidebar/index";
import Topbar from "../Topbar/index";
import App from "../../routes/index";
import {useDispatch, useSelector} from "react-redux";
import {
  NAV_STYLE_ABOVE_HEADER,
  NAV_STYLE_BELOW_HEADER,
  NAV_STYLE_DARK_HORIZONTAL,
  NAV_STYLE_DEFAULT_HORIZONTAL,
  NAV_STYLE_FIXED,
  NAV_STYLE_INSIDE_HEADER_HORIZONTAL,
  TAB_SIZE
} from "../../constants/ThemeSetting";
import {useRouteMatch, Link, Redirect} from "react-router-dom";
import {ObtenerPermisosUsuarioReducer, ObtenerModulosUsuarioReducer} from '../../appRedux/actions/Usuarios/Usuarios'
import {
    SeleccionarPaisReducer,
    userSignIn,
    userSignOut,
} from "../../appRedux/actions/Auth";
import IconoLogo from '../../assets/images/logo-w.png'
import '../../styles/Sistema/main.css'
import TimeLogout from "./TimeLogout";

const {Content, Footer} = Layout;

const MainApp = () => {
    const dispatch = useDispatch();

    const {width, navStyle} = useSelector(({settings}) => settings);
    const match = useRouteMatch();
    const {listaPaises} = useSelector(({auth}) => auth);
    const [mostrarLogo, setMostrarLogo] = useState(true)
    const [redireccionarTerminos, setRedireccionarTerminos] = useState(false)
    const { 
        datosUsuarioLogeado,
        mostrar_terminos_condiciones_login
    } = useSelector(({auth}) => auth);

    const getContainerClass = (navStyle) => {
        switch (navStyle) {
            case NAV_STYLE_DARK_HORIZONTAL:
                return "gx-container-wrap";
            case NAV_STYLE_DEFAULT_HORIZONTAL:
                return "gx-container-wrap";
            case NAV_STYLE_INSIDE_HEADER_HORIZONTAL:
                return "gx-container-wrap";
            case NAV_STYLE_BELOW_HEADER:
                return "gx-container-wrap";
            case NAV_STYLE_ABOVE_HEADER:
                return "gx-container-wrap";
            default:
                return '';
        }
    }

    const getNavStyles = (navStyle) => {
        switch (navStyle) {
            // case NAV_STYLE_DEFAULT_HORIZONTAL :
            //     return <HorizontalDefault/>;
            // case NAV_STYLE_DARK_HORIZONTAL :
            //     return <HorizontalDark/>;
            // case NAV_STYLE_INSIDE_HEADER_HORIZONTAL :
            //     return <InsideHeader/>;
            // case NAV_STYLE_ABOVE_HEADER :
            //     return <AboveHeader/>;
            // case NAV_STYLE_BELOW_HEADER :
            //     return <BelowHeader/>;
            case NAV_STYLE_FIXED :
                return <Topbar/>;
            // case NAV_STYLE_DRAWER :
            //     return <Topbar/>;
            // case NAV_STYLE_MINI_SIDEBAR :
            //     return <Topbar/>;
            // case NAV_STYLE_NO_HEADER_MINI_SIDEBAR :
            //     return <NoHeaderNotification/>;
            // case NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR :
            //     return <NoHeaderNotification/>;
            default :
                return null;
        }
    };

    const getSidebar = (navStyle, width) => {
        if (width < TAB_SIZE) {
            return <Sidebar/>;
        }
        switch (navStyle) {
            case NAV_STYLE_FIXED :
                return <Sidebar/>;
            // case NAV_STYLE_DRAWER :
            //     return <Sidebar/>;
            // case NAV_STYLE_MINI_SIDEBAR :
            //     return <Sidebar/>;
            // case NAV_STYLE_NO_HEADER_MINI_SIDEBAR :
            //     return <Sidebar/>;
            // case NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR:
            //     return <Sidebar/>;
            default :
                return null;
        }
    };

    var fecha = new Date();
    var ano = fecha. getFullYear();

    useEffect(async() => {
        dispatch(ObtenerPermisosUsuarioReducer())
        dispatch(ObtenerModulosUsuarioReducer())

        let rptaLogin = await dispatch(
            userSignIn(
                {
                    usuario      : localStorage.getItem('Log-usuario'),
                    contrasena   : localStorage.getItem('Log-contrasenia'),
                    pais         : localStorage.getItem('Log-pais'),
                    posicionPais : localStorage.getItem('Log-posicionPais'),
                }
            )
        );

        setRedireccionarTerminos(rptaLogin.redirigirterminos)


        // console.log('Login otra vez!')
    }, [])

    useEffect(() => {
        dispatch(SeleccionarPaisReducer(localStorage.getItem('posicionPaisSeleccionado')))
    }, [listaPaises])

    useEffect(() => {
        
        setTimeout(() => {
            setMostrarLogo(false)
        }, 2000);

    });

    return (
        <Layout className="gx-app-layout" style={{position:'relative'}}>
            
            {/* {
                redireccionarTerminos == true
                ?<Redirect
                    to={{
                        pathname: '/sistema/terminos-condiciones',
                    }}
                />
                :null
            } */}

            {
                datosUsuarioLogeado.usuaceptoterminos
                ?mostrar_terminos_condiciones_login == true
                    ?<Redirect
                        to={{
                            pathname: '/sistema/terminos-condiciones',
                        }}
                    />
                    :null
                :null
            }

            

            {getSidebar(navStyle, width)}
            {
                mostrarLogo == true
                ?<div
                    className="Contenedor-Main-Logo"
                    style={{
                        width: "100%",
                        // height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        // position: 'absolute',
                        // zIndex:'1000'
                    
                    }}
                >
                    <img
                        className="Logo-Preload-Main"
                        style={{
                            width: "160px"
                        }} 
                        src={IconoLogo} />
                </div>
                :<Layout>
                {getNavStyles(navStyle)}
                {/* <Content className={`gx-layout-content ${getContainerClass(navStyle)} `}> */}
                <Content className='gx-layout-content'>
                    <App match={match}/>
                    <Footer style={{borderTop: 'solid 0px', background: 'white', position: 'relative'}}>
                        <Row style={{ display: "flex", textAlign: "-webkit-center" }}>
                            <Col 
                                xl={8} md={8} sm={8} xs={8} 
                                style={{
                                textAlign     : "-webkit-center",
                                fontFamily    : "Segoe UI",
                                fontStyle     : "normal",
                                fontWeight    : "bold",
                                fontSize      : "14px",
                                lineHeight    : "19px",
                                // textTransform : "uppercase",
                                color         : "#4D4D4D",
                                paddingTop: "20px",
                                paddingBottom: "20px"
                                }}
                                
                            >
                                © {ano} Grow Analytics.Todos los Derechos Reservados
                            </Col>
                            {/* <Col 
                                xl={4} md={4} sm={4} xs={4} 
                                style={{
                                textAlign     : "-webkit-right",
                                fontFamily    : "Segoe UI",
                                fontStyle     : "normal",
                                fontWeight    : "bold",
                                fontSize      : "14px",
                                lineHeight    : "19px",
                                // textTransform : "uppercase",
                                color         : "#4D4D4D"
                                }}
                            >
                                
                            </Col> */}
                            
                                <Col 
                                    xl={4} md={4} sm={4} xs={4}  
                                    style={{
                                    fontFamily    : "Segoe UI",
                                    fontStyle     : "normal",
                                    fontWeight    : "bold",
                                    fontSize      : "14px",
                                    lineHeight    : "19px",
                                    // textTransform : "uppercase",
                                    color         : "#4D4D4D",
                                    cursor:'pointer'
                                    }}
                                    className=
                                    {
                                        window.location.href.includes('/terminos-condiciones')
                                        ?"Footer-Texto-Seleccionado"
                                        :"Footer-Texto"
                                    }
                                >
                                    <Link 
                                        to="/sistema/terminos-condiciones"
                                    >
                                        <div className="Txt-Footer-Normal">Términos & Condiciones</div>
                                    </Link>
                                    
                                </Col>
                            <Col 
                                xl={4} md={4} sm={4} xs={4}  
                                style={{
                                fontFamily    : "Segoe UI",
                                fontStyle     : "normal",
                                fontWeight    : "bold",
                                fontSize      : "14px",
                                lineHeight    : "19px",
                                // textTransform : "uppercase",
                                color         : "#4D4D4D"
                                }}
                                className="Footer-Texto"
                            >
                                Política de Privacidad
                            </Col>
                            <Col 
                                xl={4} md={4} sm={4} xs={4}  
                                style={{
                                fontFamily    : "Segoe UI",
                                fontStyle     : "normal",
                                fontWeight    : "bold",
                                fontSize      : "14px",
                                lineHeight    : "19px",
                                // textTransform : "uppercase",
                                color         : "#4D4D4D"
                                }}
                                className="Footer-Texto"
                            >
                                Cookies & Datos
                            </Col>
                            <Col 
                                xl={4} md={4} sm={4} xs={4}  
                                style={{
                                textAlign     : "-webkit-center",
                                fontFamily    : "Segoe UI",
                                fontStyle     : "normal",
                                fontWeight    : "bold",
                                fontSize      : "14px",
                                lineHeight    : "19px",
                                // textTransform : "uppercase",
                                color         : "#4D4D4D"
                                }}
                                className="Footer-Texto"
                            >
                                Entra en Contacto
                            </Col>
                            {/* <Col 
                                xl={4} md={4} sm={4} xs={4}  
                                style={{
                                textAlign     : "-webkit-left",
                                fontFamily    : "Segoe UI",
                                fontStyle     : "normal",
                                fontWeight    : "bold",
                                fontSize      : "14px",
                                lineHeight    : "19px",
                                // textTransform : "uppercase",
                                color         : "#4D4D4D"
                                }}
                            >
                                Todos los derechos reservados
                            </Col> */}
                        </Row>
                    </Footer>
                </Content>
            </Layout>
            }
        </Layout>
    )
};
export default MainApp;