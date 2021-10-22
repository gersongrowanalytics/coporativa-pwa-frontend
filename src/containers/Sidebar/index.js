import React from "react";
import {
    PERMISO_VER_SMARTVIEW_PERU, PERMISO_VER_SMARTVIEW_CHILE, PERMISO_VER_SMARTVIEW_MEXICO, PERMISO_VER_SMARTVIEW_ARGENTINA, PERMISO_VER_SMARTVIEW_BOLIVIA,PERMISO_VER_SMARTVIEW_EEUU
} from '../../constants/PermisosTypes'
import {funPermisosObtenidos} from '../../funciones/funPermiso.js'
import {useDispatch, useSelector} from "react-redux";
import {Drawer, Layout} from "antd";
import IconoAdministrador from '../../assets/images/iconos/Sidebar/NoSeleccionado/administrador.png'
import IconoCargaArchivo from '../../assets/images/iconos/Sidebar/NoSeleccionado/cargaArchivo.png'
import IconoData from '../../assets/images/iconos/Sidebar/NoSeleccionado/data.png'
import IconoHomePrincipal from '../../assets/images/iconos/Sidebar/Seleccionado/home.png'
import IconoControlArchivos from '../../assets/images/iconos/Sidebar/NoSeleccionado/controlArchivos.png'
import IconoSelecAdministrador from '../../assets/images/iconos/Sidebar/Seleccionado/selecAdministrador.png'
import IconoSelecCargaArchivo from '../../assets/images/iconos/Sidebar/Seleccionado/selecCargaArchivo.png'
import IconoSelecData from '../../assets/images/iconos/Sidebar/Seleccionado/selecData.png'
import IconoSelecControlArchivos from '../../assets/images/iconos/Sidebar/Seleccionado/selecControlArchivos.png'
import {Link} from "react-router-dom"
import IconoFlechaDerecha from '../../assets/images/iconos/flechaDerecha.png'
import {toggleCollapsedSideNav} from "../../appRedux/actions/Setting";
import {
  NAV_STYLE_DRAWER,
  NAV_STYLE_FIXED,
  NAV_STYLE_MINI_SIDEBAR,
  NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR,
  NAV_STYLE_NO_HEADER_MINI_SIDEBAR,
  TAB_SIZE,
  THEME_TYPE_LITE
} from "../../constants/ThemeSetting";
import '../../styles/Sidebar/Sidebar.css'
import {
    ObtenerSeleccionModuloReducer,
    SeleccionarModuloEspecificoReducer
} from '../../appRedux/actions/Dashboard/Dashboard'
import IconoCerrarMenu from '../../assets/images/iconos/Sidebar/menucerrar.png'
import {SeleccionarMenuReducer} from '../../appRedux/actions/Usuarios/Usuarios'
import LogoSidebar from '../../assets/images/logos/isotipo.png'
const {Sider} = Layout;

// import { Menu } from 'antd';

// import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
// const { SubMenu } = Menu;
// const rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

const Sidebar = () => {

    const dispatch = useDispatch();

    const {themeType, width, navStyle} = useSelector(({settings}) => settings);
    const { navCollapsed} = useSelector(({common}) => common);
    const { modulos_usuario } = useSelector(({usuarios}) => usuarios);
    const { paisSeleccionado, permisos } = useSelector(({auth}) => auth);

    const onToggleCollapsedNav = () => {
        dispatch(toggleCollapsedSideNav(!navCollapsed));
    };

    let drawerStyle = "gx-collapsed-sidebar";

    if (navStyle === NAV_STYLE_FIXED) {
        drawerStyle = "";
    } else if (navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR) {
        drawerStyle = "gx-mini-sidebar gx-mini-custom-sidebar";
    } else if (navStyle === NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR) {
        drawerStyle = "gx-custom-sidebar"
    } else if (navStyle === NAV_STYLE_MINI_SIDEBAR) {
        drawerStyle = "gx-mini-sidebar";
    } else if (navStyle === NAV_STYLE_DRAWER) {
        drawerStyle = "gx-collapsed-sidebar"
    }
    if ((navStyle === NAV_STYLE_FIXED || navStyle === NAV_STYLE_MINI_SIDEBAR || navStyle === NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR) && width < TAB_SIZE) {
        drawerStyle = "gx-collapsed-sidebar"
    }

    const SeleccionarMenu = (posicion, posicionSubMenu) => {
        // console.log(posicion)
        // console.log(posicionSubMenu)
        dispatch(SeleccionarMenuReducer(posicion, posicionSubMenu))
        dispatch(ObtenerSeleccionModuloReducer(true))
    }

    const QuitarSeleccionarMenu = () => {
        dispatch(SeleccionarMenuReducer(99))
        dispatch(ObtenerSeleccionModuloReducer(false))
    }

    ////////////////////
    // const [openKeys, setOpenKeys] = React.useState(['sub1']);

    // const onOpenChange = keys => {
    //     const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
    //     if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
    //     setOpenKeys(keys);
    //     } else {
    //     setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    //     }
    // };
   

    return (
        <Sider
            className={`gx-app-sidebar gx-collapsed-sidebar ${themeType !== THEME_TYPE_LITE ? 'gx-layout-sider-dark' : null}`}
            trigger={null}
            collapsed={(width < TAB_SIZE ? false : navStyle === NAV_STYLE_MINI_SIDEBAR || navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR)}
            theme={themeType === THEME_TYPE_LITE ? "lite" : "dark"}
            collapsible>
            {
                <Drawer
                    className={`gx-drawer-sidebar ${themeType !== THEME_TYPE_LITE ? 'gx-drawer-sidebar-dark' : null}`}
                    placement="left"
                    closable={false}
                    onClose={onToggleCollapsedNav}
                    visible={navCollapsed}
                >
                <div id="contenedor">
                    <nav>
                        <div id="Cabecera-Sidebar-Principal" style={{position:'relative'}}>
                            <Link to="/sistema/categorias">
                                <img 
                                    style   = {{
                                        cursor:'pointer', 
                                        position:'absolute', 
                                        top: "-6px",
                                        left: "19px",
                                        width: "117px"
                                    }}
                                    alt     = '' src={LogoSidebar} 
                                />
                            </Link>
                            <img
                                style={{
                                    width: "40px",
                                    right: "20px",
                                    position: "absolute",
                                    top: "23px",
                                    cursor: 'pointer',
                                    padding: "5px"
                                }} 
                                onClick={onToggleCollapsedNav}
                                src={IconoCerrarMenu} 
                                id="Icono-Cerrar-Menu-Slider"
                            />
                        </div>
                        <ul>
                            <li>
                                <Link to="/sistema/categorias">
                                    <img 
                                        className="Imagen-Fila-Cuerpo-Sidebar-Principal" 
                                        src={IconoHomePrincipal}
                                        style={{width:'50px', marginRight:'20px'}}
                                    />
                                    Principal
                                </Link>
                            </li>

                            {
                                paisSeleccionado
                                ?paisSeleccionado.modulos
                                    ?paisSeleccionado.modulos.map((menu, posicion) => {
                                        return(
                                            menu.modtienesubmodulos == false
                                            ?<li
                                                className="dropdown-sinsubmenu"
                                                style={
                                                    menu.seleccionado
                                                    ?{
                                                        background: "#E7F3FF",
                                                        width: "89%"
                                                    }
                                                    :{}
                                                }
                                            >
                                                <Link 
                                                    to={menu.modruta} 
                                                    onClick={() => SeleccionarMenu(posicion)} 
                                                    style={
                                                        menu.seleccionado
                                                        ?{
                                                            color: "#1876F2",
                                                            fontWeight: "bold"
                                                        }
                                                        :{
                                                            color: "#323233"
                                                        }
                                                    }
                                                >
                                                    <img 
                                                        className="Imagen-Fila-Cuerpo-Sidebar-Principal" 
                                                        src={menu.modicono}
                                                        style={
                                                            menu.seleccionado 
                                                            ?{opacity:0, width:'0px'} 
                                                            :{opacity:1, width:'50px', marginRight:'10px'}
                                                        }
                                                    />
                                                    <img 
                                                        className="" 
                                                        src={menu.modiconoseleccionado}
                                                        style={
                                                            menu.seleccionado 
                                                            ?{
                                                                opacity:1,
                                                                border: "2px solid #1876F2",
                                                                width:'50px',
                                                                marginRight:'10px',
                                                                borderRadius:'100px',
                                                                background:'#E4E6EB'
                                                            } 
                                                            : {opacity:0, width:'0px'}
                                                        }
                                                    />
                                                    {menu.modnombre}
                                                </Link>
                                            </li>

                                            :<li
                                                style={
                                                    menu.seleccionado
                                                    ?{
                                                        background: "#E7F3FF",
                                                        width: "89%"
                                                    }
                                                    :{}
                                                }
                                                className="dropdown"
                                            >
                                                <Link 
                                                    className="dropdown_principal"
                                                    to={menu.modruta} 
                                                    onClick={() => SeleccionarMenu(posicion)} 
                                                    style={
                                                        menu.seleccionado
                                                        ?{
                                                            color: "#1876F2",
                                                            fontWeight: "bold"
                                                        }
                                                        :{
                                                            color: "#323233"
                                                        }
                                                    }
                                                >
                                                    <img 
                                                        className="Imagen-Fila-Cuerpo-Sidebar-Principal" 
                                                        src={menu.modicono}
                                                        style={
                                                            menu.seleccionado 
                                                            ?{opacity:0, width:'0px'} 
                                                            :{opacity:1, width:'50px', marginRight:'10px'}
                                                        }
                                                    />
                                                    <img 
                                                        className="" 
                                                        src={menu.modiconoseleccionado}
                                                        style={
                                                            menu.seleccionado 
                                                            ?{
                                                                opacity:1,
                                                                border: "2px solid #1876F2",
                                                                width:'50px',
                                                                marginRight:'10px',
                                                                borderRadius:'100px',
                                                                background:'#E4E6EB'
                                                            } 
                                                            : {opacity:0, width:'0px'}
                                                        }
                                                    />
                                                    {menu.modnombre}
                                                    <img 
                                                        width={"9px"} 
                                                        src={IconoFlechaDerecha} 
                                                        style={{
                                                            position:'absolute',
                                                            left: "257px",
                                                            top:'23px',
                                                            zIndex:'1'
                                                        }}
                                                    />
                                                </Link>
                                                
                                                <ul 
                                                    style={
                                                        paisSeleccionado.modulos.length == posicion+1
                                                        ?{
                                                            marginTop:'-157px',
                                                            paddingTop:'10px', paddingBottom:'10px', paddingRight:'10px'
                                                        }
                                                        :{
                                                            paddingTop:'10px', paddingBottom:'10px', paddingRight:'10px'
                                                        }
                                                    }
                                                >
                                                    {
                                                        paisSeleccionado.modulos.length == posicion+1
                                                        ?null
                                                        :<img 
                                                            width={"9px"} 
                                                            src={IconoFlechaDerecha} 
                                                            style={{
                                                                zIndex:'1',
                                                                left: "7px",
                                                                position: "absolute",
                                                                top: "22px",
                                                            }}
                                                        />
                                                    }
                                                    {
                                                        menu.smos.map((submenu, posicionSubMenu) => {
                                                            return(
                                                                submenu.smonombre == "default"
                                                                ?null
                                                                :
                                                                <Link
                                                                    to={submenu.smoruta} 
                                                                    onClick={() => SeleccionarMenu(posicion, posicionSubMenu )}
                                                                    style={{
                                                                        width:'100%'
                                                                    }}
                                                                    className="SubMenu-Contenedor-Sidebar"
                                                                >
                                                                    <li
                                                                        style={
                                                                            submenu.seleccionado == true
                                                                            ?{
                                                                                height:'40px',
                                                                                display: "flex",
                                                                                background: '#E7F3FF'
                                                                            }
                                                                            :{
                                                                                height:'40px',
                                                                                display: "flex"
                                                                            }
                                                                        }
                                                                    >
                                                                        <Link
                                                                            to={submenu.smoruta} 
                                                                            onClick={() => SeleccionarMenu(posicion, posicionSubMenu )}
                                                                            style={submenu.seleccionado?{
                                                                                color: "#1876F2",
                                                                                fontWeight:'bold'
                                                                            }:{}}
                                                                        >
                                                                            {
                                                                                submenu.smonombre
                                                                            }
                                                                        </Link>
                                                                    </li>
                                                                </Link>
                                                            )
                                                        })
                                                    }
                                                    {
                                                        menu.modnombre == "Trade Marketing"
                                                        ?
                                                        paisSeleccionado
                                                        ?paisSeleccionado.paiid == 1
                                                            ?funPermisosObtenidos(
                                                                permisos,
                                                                PERMISO_VER_SMARTVIEW_PERU,
                                                                <a 
                                                                    id="txtSidebarItem" 
                                                                    href="https://leadsmartview.com" 
                                                                    target="_blank"
                                                                    className="SubMenu-Contenedor-Sidebar"
                                                                >

                                                                    <li
                                                                        style={{
                                                                            height:'40px',
                                                                            display: "flex",
                                                                            alignItems: "center"
                                                                        }}
                                                                    >
                                                                        Creciendo Juntos
                                                                    </li>
                                                                </a>   
                                                            )
                                                            :paisSeleccionado.paiid == 2
                                                                ?funPermisosObtenidos(
                                                                    permisos,
                                                                    PERMISO_VER_SMARTVIEW_CHILE,
                                                                    <a 
                                                                        id="txtSidebarItem" 
                                                                        href="https://leadsmartview.com" 
                                                                        target="_blank"
                                                                        className="SubMenu-Contenedor-Sidebar"
                                                                    >
    
                                                                        <li
                                                                            style={{
                                                                                height:'40px',
                                                                                display: "flex",
                                                                                alignItems: "center"
                                                                            }}
                                                                        >
                                                                            Creciendo Juntos
                                                                        </li>
                                                                    </a>   
                                                                )
                                                                :paisSeleccionado.paiid == 3
                                                                    ?funPermisosObtenidos(
                                                                        permisos,
                                                                        PERMISO_VER_SMARTVIEW_MEXICO,
                                                                        <a 
                                                                            id="txtSidebarItem" 
                                                                            href="https://leadsmartview.com" 
                                                                            target="_blank"
                                                                            className="SubMenu-Contenedor-Sidebar"
                                                                        >
        
                                                                            <li
                                                                                style={{
                                                                                    height:'40px',
                                                                                    display: "flex",
                                                                                    alignItems: "center"
                                                                                }}
                                                                            >
                                                                                Creciendo Juntos
                                                                            </li>
                                                                        </a>   
                                                                    )
                                                                    :paisSeleccionado.paiid == 4
                                                                        ?funPermisosObtenidos(
                                                                            permisos,
                                                                            PERMISO_VER_SMARTVIEW_ARGENTINA,
                                                                            <a 
                                                                                id="txtSidebarItem" 
                                                                                href="https://leadsmartview.com" 
                                                                                target="_blank"
                                                                                className="SubMenu-Contenedor-Sidebar"
                                                                            >
            
                                                                                <li
                                                                                    style={{
                                                                                        height:'40px',
                                                                                        display: "flex",
                                                                                        alignItems: "center"
                                                                                    }}
                                                                                >
                                                                                    Creciendo Juntos
                                                                                </li>
                                                                            </a>   
                                                                        )
                                                                        :paisSeleccionado.paiid == 5
                                                                            ?funPermisosObtenidos(
                                                                                permisos,
                                                                                PERMISO_VER_SMARTVIEW_BOLIVIA,
                                                                                <a 
                                                                                    id="txtSidebarItem" 
                                                                                    href="https://leadsmartview.com" 
                                                                                    target="_blank"
                                                                                    className="SubMenu-Contenedor-Sidebar"
                                                                                >
                
                                                                                    <li
                                                                                        style={{
                                                                                            height:'40px',
                                                                                            display: "flex",
                                                                                            alignItems: "center"
                                                                                        }}
                                                                                    >
                                                                                        Creciendo Juntos
                                                                                    </li>
                                                                                </a>   
                                                                            )
                                                                            :paisSeleccionado.paiid == 6
                                                                                ?funPermisosObtenidos(
                                                                                    permisos,
                                                                                    PERMISO_VER_SMARTVIEW_EEUU,
                                                                                    <a 
                                                                                        id="txtSidebarItem" 
                                                                                        href="https://leadsmartview.com" 
                                                                                        target="_blank"
                                                                                        className="SubMenu-Contenedor-Sidebar"
                                                                                    >
                    
                                                                                        <li
                                                                                            style={{
                                                                                                height:'40px',
                                                                                                display: "flex",
                                                                                                alignItems: "center"
                                                                                            }}
                                                                                        >
                                                                                            Creciendo Juntos
                                                                                        </li>
                                                                                    </a>   
                                                                                )
                                                                                :null
                                                        :null
                                                        :null
                                                    }
                                                </ul>
                                            </li>
                                        )
                                    })
                                    :null
                                :null
                            }

                            {
                                funPermisosObtenidos(
                                    permisos,
                                    "modulo.descargar.data",
                                    <li
                                        className="dropdown-sinsubmenu"
                                        style={
                                            2 != 2
                                            ?{
                                                background: "#E7F3FF",
                                                width: "89%"
                                            }
                                            :{}
                                        }
                                    >
                                        <Link 
                                            to={"/Sistema/descargar-data"} 
                                            onClick={
                                                () => dispatch(
                                                    SeleccionarModuloEspecificoReducer(
                                                        "Data",
                                                        IconoSelecData
                                                    )
                                                )
                                            }
                                            style={
                                                2 != 2
                                                ?{
                                                    color: "#1876F2",
                                                    fontWeight: "bold"
                                                }
                                                :{
                                                    color: "#323233"
                                                }
                                            }
                                        >
                                            <img 
                                                className="Imagen-Fila-Cuerpo-Sidebar-Principal" 
                                                src={IconoData}
                                                style={
                                                    2 != 2
                                                    ?{opacity:0, width:'0px'} 
                                                    :{opacity:1, width:'50px', marginRight:'10px'}
                                                }
                                            />
                                            <img 
                                                className="" 
                                                src={IconoSelecData}
                                                style={
                                                    2 != 2
                                                    ?{
                                                        opacity:1,
                                                        border: "2px solid #1876F2",
                                                        width:'50px',
                                                        marginRight:'10px',
                                                        borderRadius:'100px',
                                                        background:'#E4E6EB'
                                                    } 
                                                    : {opacity:0, width:'0px'}
                                                }
                                            />
                                            {"Data"}
                                        </Link>
                                    </li>
                                )
                            }


                            {
                                funPermisosObtenidos(
                                    permisos,
                                    "modulo.carga.archivos",
                                    <li
                                        className="dropdown-sinsubmenu"
                                        style={
                                            2 != 2
                                            ?{
                                                background: "#E7F3FF",
                                                width: "89%"
                                            }
                                            :{}
                                        }
                                    >
                                        <Link 
                                            to={"/Sistema/cargar-archivo"} 
                                            onClick={
                                                () => dispatch(
                                                    SeleccionarModuloEspecificoReducer(
                                                        "Carga de archivos",
                                                        IconoSelecCargaArchivo
                                                    )
                                                )
                                            }
                                            style={
                                                2 != 2
                                                ?{
                                                    color: "#1876F2",
                                                    fontWeight: "bold"
                                                }
                                                :{
                                                    color: "#323233"
                                                }
                                            }
                                        >
                                            <img 
                                                className="Imagen-Fila-Cuerpo-Sidebar-Principal" 
                                                src={IconoCargaArchivo}
                                                style={
                                                    2 != 2
                                                    ?{opacity:0, width:'0px'} 
                                                    :{opacity:1, width:'50px', marginRight:'10px'}
                                                }
                                            />
                                            <img 
                                                className="" 
                                                src={IconoSelecCargaArchivo}
                                                style={
                                                    2 != 2
                                                    ?{
                                                        opacity:1,
                                                        border: "2px solid #1876F2",
                                                        width:'50px',
                                                        marginRight:'10px',
                                                        borderRadius:'100px',
                                                        background:'#E4E6EB'
                                                    } 
                                                    : {opacity:0, width:'0px'}
                                                }
                                            />
                                            {"Carga de archivos"}
                                        </Link>
                                    </li>
                                )
                            }


                            {
                                funPermisosObtenidos(
                                    permisos,
                                    "modulo.control.archivos",
                                    <li
                                        className="dropdown-sinsubmenu"
                                        style={
                                            2 != 2
                                            ?{
                                                background: "#E7F3FF",
                                                width: "89%"
                                            }
                                            :{}
                                        }
                                    >
                                        <Link 
                                            to={"/Sistema/control-archivos"} 
                                            onClick={
                                                () => dispatch(
                                                    SeleccionarModuloEspecificoReducer(
                                                        "Archivos",
                                                        IconoSelecControlArchivos
                                                    )
                                                )
                                            }
                                            style={
                                                2 != 2
                                                ?{
                                                    color: "#1876F2",
                                                    fontWeight: "bold"
                                                }
                                                :{
                                                    color: "#323233"
                                                }
                                            }
                                        >
                                            <img 
                                                className="Imagen-Fila-Cuerpo-Sidebar-Principal" 
                                                src={IconoControlArchivos}
                                                style={
                                                    2 != 2
                                                    ?{opacity:0, width:'0px'} 
                                                    :{opacity:1, width:'50px', marginRight:'10px'}
                                                }
                                            />
                                            <img 
                                                className="" 
                                                src={IconoSelecControlArchivos}
                                                style={
                                                    2 != 2
                                                    ?{
                                                        opacity:1,
                                                        border: "2px solid #1876F2",
                                                        width:'50px',
                                                        marginRight:'10px',
                                                        borderRadius:'100px',
                                                        background:'#E4E6EB'
                                                    } 
                                                    : {opacity:0, width:'0px'}
                                                }
                                            />
                                            {"Archivos"}
                                        </Link>
                                    </li>
                                )
                            }


                            {
                                funPermisosObtenidos(
                                    permisos,
                                    "modulo.administrador",
                                    <li
                                        className="dropdown-sinsubmenu"
                                        style={
                                            2 != 2
                                            ?{
                                                background: "#E7F3FF",
                                                width: "89%"
                                            }
                                            :{}
                                        }
                                    >
                                        <Link 
                                            to={"/Sistema/administrador/usuarios"} 
                                            onClick={
                                                () => dispatch(
                                                    SeleccionarModuloEspecificoReducer(
                                                        "Administrador",
                                                        IconoSelecAdministrador
                                                    )
                                                )
                                            }
                                            style={
                                                2 != 2
                                                ?{
                                                    color: "#1876F2",
                                                    fontWeight: "bold"
                                                }
                                                :{
                                                    color: "#323233"
                                                }
                                            }
                                        >
                                            <img 
                                                className="Imagen-Fila-Cuerpo-Sidebar-Principal" 
                                                src={IconoAdministrador}
                                                style={
                                                    2 != 2
                                                    ?{opacity:0, width:'0px'} 
                                                    :{opacity:1, width:'50px', marginRight:'10px'}
                                                }
                                            />
                                            <img 
                                                className="" 
                                                src={IconoSelecAdministrador}
                                                style={
                                                    2 != 2
                                                    ?{
                                                        opacity:1,
                                                        border: "2px solid #1876F2",
                                                        width:'50px',
                                                        marginRight:'10px',
                                                        borderRadius:'100px',
                                                        background:'#E4E6EB'
                                                    } 
                                                    : {opacity:0, width:'0px'}
                                                }
                                            />
                                            {"Administrador"}
                                        </Link>
                                    </li>
                                )
                            }
                
                        </ul>
                    </nav>
                </div>
                
                </Drawer> 
            }
        
        </Sider>

    //     <Menu mode="inline" openKeys={openKeys} onOpenChange={onOpenChange} style={{ width: 256 }}>
    //   <SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One">
    //     <Menu.Item key="1">Option 1</Menu.Item>
    //     <Menu.Item key="2">Option 2</Menu.Item>
    //     <Menu.Item key="3">Option 3</Menu.Item>
    //     <Menu.Item key="4">Option 4</Menu.Item>
    //   </SubMenu>
    //   <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Navigation Two">
    //     <Menu.Item key="5">Option 5</Menu.Item>
    //     <Menu.Item key="6">Option 6</Menu.Item>
    //     <SubMenu key="sub3" title="Submenu">
    //       <Menu.Item key="7">Option 7</Menu.Item>
    //       <Menu.Item key="8">Option 8</Menu.Item>
    //     </SubMenu>
    //   </SubMenu>
    //   <SubMenu key="sub4" icon={<SettingOutlined />} title="Navigation Three">
    //     <Menu.Item key="9">Option 9</Menu.Item>
    //     <Menu.Item key="10">Option 10</Menu.Item>
    //     <Menu.Item key="11">Option 11</Menu.Item>
    //     <Menu.Item key="12">Option 12</Menu.Item>
    //   </SubMenu>
    // </Menu>
    )
};
export default Sidebar;
