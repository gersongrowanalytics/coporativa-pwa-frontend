import React, {useState, useEffect} from 'react'
import {Row, Col, Modal, Input } from 'antd'
import {useDispatch, useSelector} from "react-redux";
import '../../../styles/Sistema/Dashboard/Dashboard.css'
import iconoCerrarModal from '../../../assets/images/iconos/Perfil/cerrarModal.png';
import IconoEstrellaGris from '../../../assets/images/iconos/Dashboard/favoritogris.png'
import {SeleccionarModuloReducer} from '../../../appRedux/actions/Dashboard/Dashboard'
// import {Link} from "react-router-dom"
import SliderSubMenus from '../../../components/Sistema/Dashboard/SliderSubMenus';
import {funPermisosObtenidosIf} from '../../../funciones/funPermiso.js'
import SinPermiso from '../../../components/Sistema/Dashboard/SinPermiso'
// import {EncontrarModuloReducer} from '../../../../appRedux/actions/Usuarios/Usuarios'

const Dashboard = () => {
    
    const dispatch = useDispatch();
    const { 
        moduloSeleccionado, 
        powerbiSeleccionado,
        seleccionoFavoritos
    } = useSelector(({dashboard}) => dashboard);
    const { modulos_usuario } = useSelector(({usuarios}) => usuarios);
    const {listaPaises, paisSeleccionado} = useSelector(({auth}) => auth);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [encontro, setEncontro] = useState(false);
    const [mostrarMostrarFavoritos, setMostrarMostrarFavoritos] = useState(false);

    const showModal = () => {
        setIsModalVisible(!isModalVisible);
    };

    const MostrarMostrarFavoritos = () => {
        setMostrarMostrarFavoritos(!mostrarMostrarFavoritos);
    };

    const Actualizar = () => {
        window.location.replace('');
    }

    useEffect(() => {
        if(paisSeleccionado){
            dispatch(SeleccionarModuloReducer(window.location.pathname))
            setEncontro(true)
        }
        
    }, [paisSeleccionado])

    const {permisos} = useSelector(({auth}) => auth);

    return (
        <div id="" style={{position:'relative'}}>
            <div id="Contenedor-Favoritos-Dashboard">
                {/* <h1>POWER BI: {powerbiSeleccionado}</h1> */}
                {/* <h1 style={{opacity:"0"}}>s</h1> */}
                {
                    seleccionoFavoritos == true
                    ?<SliderSubMenus
                        moduloSeleccionado = {{"smos" : paisSeleccionado.favoritos}}
                        esFavoritos = {true}
                    />
                    // ?null
                    :moduloSeleccionado.modtienesubmodulos == true
                        ?moduloSeleccionado.smos
                            ?<SliderSubMenus
                                moduloSeleccionado = {moduloSeleccionado}
                            />
                            :null
                        :null
                }
                {/* <div id="Contenedor-SubMenus-Youtube-Dashboard">
                    
                    {
                        [{},{},{},{},{},{},{},{},{}].map(() => {
                            return (
                                <div id="Tarjeta-SubMenu-Youtube-Dashboard">
                                    {"KC: Sell In & Sell Out (Performance YTD - Soles NIV)"}
                                </div>
                            )
                        })
                    }
                </div> */}
                {/* <div style={{position: "absolute", width: "100%", marginTop:'0px'}}> */}
                <div style={{ width: "100%", marginTop:'0px'}}>
                    {
                        moduloSeleccionado.smos
                        ?moduloSeleccionado.smos.map((submodulo) => {
                            return (
                                submodulo.smoruta == window.location.pathname
                                ?funPermisosObtenidosIf(
                                    permisos,
                                    submodulo.pemslug,
                                    <>
                                        <iframe
                                            width="100%"
                                            height="1100px"
                                            src={powerbiSeleccionado}
                                            // src={"https://app.powerbi.com/view?r=eyJrIjoiZTU5NWMyZGYtMjkyYy00NWZkLTg3YzYtNTk1ODZhNmQ1YTZkIiwidCI6IjFkZjQ2ODhjLWI5MTUtNDEwMy05OGMwLTNhMzY4ZmIyOTNlOCJ9&pageName=ReportSectiona31b8d2f463a8877cdee%22"}
                                            frameborder="0"
                                        ></iframe>
                                        <div id="taparMediocomercial">
                        
                                        </div>
                                        <div id="taparIzqcomercial">
                                            
                                        </div>
                                        <div id="taparDerechaComercial">
                    
                                        </div>
                                    </>,
                                    <SinPermiso />
                                )
                                :null
                            )
                        })
                        :encontro == true
                            ?<SinPermiso />
                            :null
                    }
                </div>
            </div>

            {/* <Row style={{marginBottom:'20px'}}>
                {
                    moduloSeleccionado.modtienesubmodulos == true
                    ?<Col xl={4} style={{display:'flex'}}>
                        <label for="Btn-Checked-Dashboard">
                            <div id="Contenedor-Btn-Desplegable-SubCategorias-Dashboard">
                                <div>
                                    <img src={IconoFlechaAbajo} id="Icono-Flecha-Abajo-Dashboard" />
                                    Trade Marketing
                                </div>
                            </div>
                        </label>
                    </Col>
                    :null
                }
                <Col xl={6} style={{display: "flex"}}>
                    <BtnDesplegable
                        titulo = {"Favoritos"}
                        // subDatos = {["Sub Cateogoría", "Sub Cateogoría", "Sub Cateogoría"]}
                        subDatos = {moduloSeleccionado.modtienesubmodulos == true ?moduloSeleccionado.smos : []}
                        esFavorito = {true}
                        mostrarModal = {showModal}
                    />
                    <BtnDesplegable
                        titulo = {"Eliminar Favoritos"}
                        subDatos = {[]}
                        esFavorito = {false}
                    />
                </Col>
                <Col xl={14} style={{textAlign: "-webkit-right", paddingRight: "40px"}}>
                    <div id="Btn-EliminarFavoritos-Dashboard" style={{width: "130px", marginRight: "40px"}} onClick={MostrarMostrarFavoritos}>
                        Nombre Favorito
                    </div>
                    <img
                        onClick={Actualizar} 
                        id="Icono-Restart-Dashboard" src={IconoRestart} width={"28px"} />
                    <div id={mostrarMostrarFavoritos == true ? "Contenido-Favoritos-Dashboard" : "Ocultar-Contenido-Favoritos-Dashboard"} style={{right: "0px", marginRight: "80px"}}>
                        <Row id="Fila-Contenido-Favoritos-Dashboard">
                            <Col xl={6} style={{ textAlign: "-webkit-center"}}>
                                <div id="Circulo-Seleccionar-Favoritos-Dashboard"></div>
                            </Col>
                            <Col xl={18} style={{textAlign: "-webkit-left"}}>
                                Sub Categoría
                            </Col>
                        </Row>
                        <Row>
                            <Col xl={24} style={{textAlign: "-webkit-center", }}>
                                <div id="Btn-Guardar-Favoritos-Dashboard">
                                    Eliminar
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row> */}

            {/* <div style={{height:'140vh'}} /> */}
            {/* <input type="checkbox" id="Btn-Checked-Dashboard" />
            <Row id="Contenedor-SubCategorias-Dashboard">
                {
                    moduloSeleccionado.modtienesubmodulos == true
                    ?moduloSeleccionado.smos.map((submodulo) => {
                        return (
                            
                            <Col xl={5} md={12} sm={12}  xs={24} style={{display: 'flex'}} >
                                <Link to={submodulo.smoruta} >
                                    <div id={submodulo.smoruta == window.location.pathname ? "Btn-Seleccionado-SubCategoria-Dashboard" : "Btn-SubCategoria-Dashboard"}>
                                        <div id={submodulo.smoruta == window.location.pathname ? "Row-Btn-Seleccionado-SubCategoria-Dashboard" : "Row-Btn-SubCategoria-Dashboard"}>
                                            <img src={submodulo.smoruta == window.location.pathname ?IconoGraficoBlanco :IconoGraficoAzul} width={"40px"} /> 
                                            <span>{submodulo.smonombre}</span>
                                        </div>
                                    </div>
                                </Link>
                            </Col>
                            
                        )
                    })
                    :null
                }
                <Col xl={24}>
                    
                </Col>
            </Row> */}


            <Modal 
                title={null} 
                // visible={true} 
                visible={isModalVisible} 
                footer={null}
                centered
                closeIcon={<img onClick={showModal} src={iconoCerrarModal} 
                id="" />}
            >
                <div style={{textAlignLast: "center", textAlign: "-webkit-center"}}>
                    <div><img width={"15px"} src={IconoEstrellaGris} /></div>
                    <div id="Titulo-Modal-Favoritos-Dashboard">
                        Esta opción creará un nuevo favorito
                    </div>
                    <Input placeholder="Crea un nombre" style={{width: "200px"}} />
                    <div onClick={showModal} id="Btn-Guardar-Modal-Favoritos-Dashboard">Guardar</div>
                </div>
            </Modal>
        </div>
        
    )
}

export default Dashboard
