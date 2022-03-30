import React, {useEffect} from "react";
import {
  Layout, Popover, Avatar, Row, Col,
  Menu, Dropdown
} from "antd";
import {Link, useHistory} from "react-router-dom";
import {toggleCollapsedSideNav} from "../../appRedux/actions/Setting";
import {
  userSignOut,
  SeleccionarPaisReducer
} from "../../appRedux/actions/Auth";
import '../../styles/Topbar/Topbar.css'
import {useDispatch, useSelector} from "react-redux";
import FiltrosTopbar from "./FiltrosTopbar";
import { DownOutlined } from '@ant-design/icons';
import { mostrarPaisesReducer } from "../../appRedux/actions/Auth";
import { SeleccionarMenuReducer } from '../../appRedux/actions/Usuarios/Usuarios'
import {ObtenerSeleccionModuloReducer} from '../../appRedux/actions/Dashboard/Dashboard'
import LogoGrowImagen from '../../assets/images/logos/LogoSpiderApp.png'
import IconoPerfil from '../../assets/images/iconos/iconoUsuario.png'
import Icono from '../../assets/images/logo-w.png'
const {Header} = Layout;

const Topbar = () => {
  const history = useHistory();
  const {locale, width, navStyle} = useSelector(({settings}) => settings);
  const { navCollapsed} = useSelector(({common}) => common);
  const { 
    moduloSeleccionado,
    nombremoduloSeleccionado,
    idsubmoduloSeleccionado,
    idFavoritosubmoduloSeleccionado,
    seleccionoModulo,
    agregarFavorito,
    seleccionoFavoritos
  } = useSelector(({dashboard}) => dashboard);

  const { 
    cookiesaceptadas,
    leyendopoliticas
  } = useSelector(({settings}) => settings);

  const dispatch = useDispatch();
  const {
    listaPaises, paisSeleccionado,
    datosUsuarioLogeado,
    mostrar_terminos_condiciones_login
  } = useSelector(({auth}) => auth);
  
  const userMenuOptions = (
    <ul className="gx-user-popover">
      {/* <li>My Account</li>
      <li>Connections</li> */}
      {/* {
        cookiesaceptadas == true
        ?<Link 
          onClick = {() => SeleccionarMenu()}
          to="/sistema/perfil"
        >
          <li id="Opcion-Drop-Menu-Top" style={{fontFamily:'Segoe UI', fontWeight:'bold'}}>Mi Perfil</li></Link>
        :localStorage.getItem('cookiesaceptadas') == "ACEPTADO"
          ?<Link 
            onClick = {() => SeleccionarMenu()}
            to="/sistema/perfil"
          >
            <li id="Opcion-Drop-Menu-Top" style={{fontFamily:'Segoe UI', fontWeight:'bold'}}>Mi Perfil</li></Link>
          :null
      } */}
      {
        datosUsuarioLogeado.usuaceptoterminos
        ?mostrar_terminos_condiciones_login == true
          ?null
          :<Link 
            onClick = {() => SeleccionarMenu()}
            to="/sistema/perfil"
          >
            <li id="Opcion-Drop-Menu-Top" style={{fontFamily:'Segoe UI', fontWeight:'bold'}}>Mi Perfil</li></Link>
        :null
      }
        <li 
          id="Opcion-Drop-Menu-Top" 
          onClick={ async () => {
            await dispatch(userSignOut())
            window.location.reload(); 
          }} 
          style={{fontFamily:'Segoe UI', fontWeight:'bold'}}
        >Salir</li>
    </ul>
  );

  const seleccionarPais = (posicion) => {
    localStorage.setItem('posicionPaisSeleccionado', posicion)
    dispatch(SeleccionarPaisReducer(posicion))
  }

  useEffect(() => {
    dispatch(mostrarPaisesReducer())
  }, []);

  const SeleccionarMenu = () => {
    dispatch(SeleccionarMenuReducer(99))
    dispatch(ObtenerSeleccionModuloReducer(false))
  }

  const Disponibles = () => {
    
    // console.log(seleccionoFavoritos)
    console.log(moduloSeleccionado)
    // console.log(idsubmoduloSeleccionado)
    // console.log(idFavoritosubmoduloSeleccionado)
    // console.log(nombremoduloSeleccionado)
    // console.log(agregarFavorito)
  }



  return (
    // <Header style={{boxShadow:' 0 0 0px 0px'}}>
    <Header style={{boxShadow: "0px 4px 4px #E4E3E3" }}>
      <Row style={{width:"100%"}}>
        <Col xl={4} md={5} sm={5} xs={0}>
          <div className="gx-linebar gx-mr-3">
            <div 
              onClick={() => {
                // console.log(paisSeleccionado)
                // if(cookiesaceptadas == true){
                //   dispatch(toggleCollapsedSideNav(!navCollapsed));
                // }else{
                //   if(localStorage.getItem('cookiesaceptadas') == "ACEPTADO"){
                //     dispatch(toggleCollapsedSideNav(!navCollapsed));
                //   }
                // }
                if(datosUsuarioLogeado.usuaceptoterminos){
                  if(mostrar_terminos_condiciones_login == true){

                  }else{
                    dispatch(toggleCollapsedSideNav(!navCollapsed));
                  }
                }else{

                }

              }}
              id="Contenedor-Menu-TopBar"
              style={
                // cookiesaceptadas == true
                // ?{
                //   marginTop:"1px", 
                //   width:'40px', 
                //   height:'40px',
                //   cursor:'pointer',
                //   marginLeft: "-20px",
                //   marginTop: "1px",
                //   padding: "5px"
                // }

                // :localStorage.getItem('cookiesaceptadas') == "ACEPTADO"
                // ?{
                //   marginTop:"1px", 
                //   width:'40px', 
                //   height:'40px',
                //   cursor:'pointer',
                //   marginLeft: "-20px",
                //   marginTop: "1px",
                //   padding: "5px"
                // }
                // :{
                //   marginTop:"1px", 
                //   width:'40px', 
                //   height:'40px',
                //   marginLeft: "-20px",
                //   marginTop: "1px",
                //   padding: "5px",
                //   cursor: "not-allowed"
                // }
                datosUsuarioLogeado.usuaceptoterminos
                ?mostrar_terminos_condiciones_login == true
                  ?{
                      marginTop:"1px", 
                      width:'40px', 
                      height:'40px',
                      marginLeft: "-20px",
                      marginTop: "1px",
                      padding: "5px",
                      cursor: "not-allowed"
                    }
                  :{
                    marginTop:"1px", 
                    width:'40px', 
                    height:'40px',
                    cursor:'pointer',
                    marginLeft: "-20px",
                    marginTop: "1px",
                    padding: "5px"
                  }
                :{
                  marginTop:"1px", 
                  width:'40px', 
                  height:'40px',
                  marginLeft: "-20px",
                  marginTop: "1px",
                  padding: "5px",
                  cursor: "not-allowed"
                }
              }>
              
              <svg focusable="false" viewBox="0 0 24 24"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path></svg>
            </div>
            <Link to="/sistema/categorias">
                <img 
                  style   = {{cursor:'pointer', position:'absolute', top:'-10px', left:'40px'}}
                  alt     = '' src={LogoGrowImagen} 
                  height  = '60px' 
                  id      = "logoTopbar"
                  onClick = {() => SeleccionarMenu()}
                />
              </Link>
          </div> 
        </Col>

        <Col xl={0} md={0} sm={0} xs={12}>
          <div className="gx-linebar gx-mr-3">
            <div
            className="gx-icon-btn icon icon-menu"
            id="Contenedor-Menu-TopBar"
            style={{
              width:'20%'
            }}
             onClick={() => {
              dispatch(toggleCollapsedSideNav(!navCollapsed));
            }}>
            <svg focusable="false" viewBox="0 0 24 24"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path></svg>
            </div>
            {/* <i className="gx-icon-btn icon icon-menu"
                onClick={() => {
                  dispatch(toggleCollapsedSideNav(!navCollapsed));
                }}
            /> */}
            {/* <img src={IconoMenu} width={"50px"} /> */}
            
            <Link to="/sistema/categorias">
                <img 
                  style   = {{cursor:'pointer', position:'absolute', top:'7px', left:'70px'}}
                  alt     = '' src={Icono} 
                  // width   = '107px' 
                  height  = '35px' 
                  id      = "logoTopbar"
                />
              </Link>
          </div> 
        </Col>

        <Col xl={14} md={12} sm={0} xs={0}>
          {
            seleccionoModulo == true
              ?moduloSeleccionado.modtienesubmodulos == true
                ?<FiltrosTopbar 
                  seleccionoFavoritos = {seleccionoFavoritos}
                  moduloSeleccionado = {moduloSeleccionado}
                  idsubmoduloSeleccionado = {idsubmoduloSeleccionado}
                  idFavoritosubmoduloSeleccionado = {idFavoritosubmoduloSeleccionado}
                  nombremoduloSeleccionado = {nombremoduloSeleccionado}
                  agregarFavorito = {agregarFavorito}
                />
                :null
              :null
            
          }
        </Col>

        <Col xl={6} md={7} sm={19} xs={0}>
        {/* <button
          onClick={() => Disponibles()}
        >
          Click
        </button> */}
          <div 
            className="gx-linebar gx-mr-24"
            style={{
              float: "right"
            }}
          >
            <div
              style={{
                position: "absolute",
                marginLeft: "-70px",
                height: "100%",
                display: "flex",
                placeItems: "center",
              }}
            >
              {
                paisSeleccionado
                ?<Dropdown
                  trigger={['click']}
                  placement="bottomRight"
                  overlay={
                    // menu
                    <Menu
                      style={{
                        marginTop:'20px',
                        marginRight:'-20px'
                      }}
                    >
                      {/* {
                        cookiesaceptadas == true
                        ?listaPaises.map((pais, posicion) => {
                          return(
                            <Menu.Item 
                              onClick={() => {
                                seleccionarPais(posicion)
                                history.push('/sistema/categorias');
                              }}
                              style={
                                posicion == 0
                                ?{
                                  marginLeft: "10px",
                                  marginRight: "10px",
                                  marginTop: "10px",
                                  marginBottom: "10px",
                                  borderRadius: "8px"
                                }
                                :{
                                  marginLeft: "10px",
                                  marginRight: "10px",
                                  marginBottom: "10px",
                                  borderRadius: "8px"
                                }
                              }
                              key="0"
                            >
                              <div
                                style={{
                                  width: "100%",
                                  textAlign: "-webkit-right"
                                }}
                              >
                                <span
                                  style={{
                                    marginRight: "5px",
                                    fontFamily : 'Segoe UI'
                                  }}
                                >{pais.painombre}</span>
                                <img 
                                  style={{width:'35px'}}
                                  src={pais.paiicono} />
                              </div>
                            </Menu.Item>
                          )
                        })
                        :localStorage.getItem('cookiesaceptadas') == "ACEPTADO"
                        ?listaPaises.map((pais, posicion) => {
                          return(
                            <Menu.Item 
                              onClick={() => {
                                seleccionarPais(posicion)
                                history.push('/sistema/categorias');
                              }}
                              style={
                                posicion == 0
                                ?{
                                  marginLeft: "10px",
                                  marginRight: "10px",
                                  marginTop: "10px",
                                  marginBottom: "10px",
                                  borderRadius: "8px"
                                }
                                :{
                                  marginLeft: "10px",
                                  marginRight: "10px",
                                  marginBottom: "10px",
                                  borderRadius: "8px"
                                }
                              }
                              key="0"
                            >
                              <div
                                style={{
                                  width: "100%",
                                  textAlign: "-webkit-right"
                                }}
                              >
                                <span
                                  style={{
                                    marginRight: "5px",
                                    fontFamily : 'Segoe UI'
                                  }}
                                >{pais.painombre}</span>
                                <img 
                                  style={{width:'35px'}}
                                  src={pais.paiicono} />
                              </div>
                            </Menu.Item>
                          )
                        })
                        :null
                      } */}

                      {
                        datosUsuarioLogeado.usuaceptoterminos
                        ?mostrar_terminos_condiciones_login == true
                          ?null
                          :listaPaises.map((pais, posicion) => {
                            return(
                              <Menu.Item 
                                onClick={() => {
                                  seleccionarPais(posicion)
                                  history.push('/sistema/categorias');
                                }}
                                style={
                                  posicion == 0
                                  ?{
                                    marginLeft: "10px",
                                    marginRight: "10px",
                                    marginTop: "10px",
                                    marginBottom: "10px",
                                    borderRadius: "8px"
                                  }
                                  :{
                                    marginLeft: "10px",
                                    marginRight: "10px",
                                    marginBottom: "10px",
                                    borderRadius: "8px"
                                  }
                                }
                                key="0"
                              >
                                <div
                                  style={{
                                    width: "100%",
                                    textAlign: "-webkit-right"
                                  }}
                                >
                                  <span
                                    style={{
                                      marginRight: "5px",
                                      fontFamily : 'Segoe UI'
                                    }}
                                  >{pais.painombre}</span>
                                  <img 
                                    style={{width:'35px'}}
                                    src={pais.paiicono} />
                                </div>
                              </Menu.Item>
                            )
                          })
                        :null
                      }
                    </Menu>
                  }
                >
                  <div style={{cursor:'pointer', display: "flex", alignItems: "center"}}>
                    <img 
                      style={{width:'35px'}}
                      src={paisSeleccionado.paiicono} />
                      <DownOutlined 
                        id="Icono-Flecha-Pais-TopBar"
                      />
                  </div>
                </Dropdown>
                :null
              }
              
            </div>
            <div
              style={{
                background    : '#E7F3FF',
                borderRadius  : '25px',
                paddingTop    : '5px',
                paddingBottom : '5px',
                paddingRight  : '15px',
                paddingLeft  : '5px',
                // width: "300px",
              }}
            >
              <Popover placement="bottomRight" content={userMenuOptions} trigger="click">
                <Avatar 
                  src={
                    localStorage.getItem('usuimagen') == "none"
                    ? IconoPerfil
                    :localStorage.getItem('usuimagen')
                  } //150*150
                  className="gx-size-35 gx-pointer gx-mr-3" alt=""/>
                <span 
                  style={{
                    fontFamily: 'Segoe UI',
                    fontStyle: 'normal',
                    fontWeight: '700',
                    fontSize: '15px',
                    lineHeight: '18px',
                    color: '#1876F2'
                  }}
                  className="gx-avatar-name" 
                  id="nombreUsuarioLogeado">{localStorage.getItem('distribuidora')}</span>
                
              </Popover>
            </div>
          </div>
        </Col>

        <Col xl={0} md={0} sm={0} xs={12}>
          <div 
            className="gx-linebar gx-mr-24"
            style={{
              background    : '#E7F3FF',
              borderRadius  : '25px',
              paddingTop    : '5px',
              paddingBottom : '5px',
              paddingRight  : '15px',
              paddingLeft  : '5px',
              width: "150px",
              float: "right"
            }}
          >
            <Popover placement="bottomRight" content={userMenuOptions} trigger="click">
              <Avatar src={IconoPerfil} //150*150
                className="gx-size-35 gx-pointer gx-mr-3" alt=""/>
              <span 
                style={{
                  fontFamily: 'Segoe UI',
                  fontStyle: 'normal',
                  fontWeight: '900',
                  fontSize: '15px',
                  lineHeight: '18px',
                  color: '#1876F2',
                 
                }}
                className="gx-avatar-name" 
                id="nombreUsuarioLogeado">{localStorage.getItem('pernombre')}</span>
              
            </Popover>
          </div>
        </Col>
      </Row>

      {/* pernombre */}
    </Header>
  );
};

export default Topbar;
