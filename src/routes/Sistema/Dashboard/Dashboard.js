import React, {useState, useEffect} from 'react'
import {Row, Col, Modal, Input } from 'antd'
import {useDispatch, useSelector} from "react-redux";
import '../../../styles/Sistema/Dashboard/Dashboard.css'
import iconoCerrarModal from '../../../assets/images/iconos/Perfil/cerrarModal.png';
import IconoEstrellaGris from '../../../assets/images/iconos/Dashboard/favoritogris.png'
import {
    SeleccionarModuloReducer,
    RegistrarIngresoSubmoduloReducer,
    RegistrarDetalleIngresoSubmoduloReducer
} from '../../../appRedux/actions/Dashboard/Dashboard'
import SliderSubMenus from '../../../components/Sistema/Dashboard/SliderSubMenus';
import {funPermisosObtenidosIf} from '../../../funciones/funPermiso.js'
import SinPermiso from '../../../components/Sistema/Dashboard/SinPermiso'
import TimeLogout from '../../../containers/App/TimeLogout'
import {useLocation} from "react-router-dom";

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

    const [tiempoSeguido, setTiempoSeguido] = useState(0);
    const [habilitarRegistrarIngresoDashboard, setHabilitarRegistrarIngresoDashboard] = useState(false);

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

    useEffect(() => {
        
        setInterval(() => {
            setTiempoSeguido(Math.random())
        }, 60000)

    }, [])

    useEffect(() => {

        if(habilitarRegistrarIngresoDashboard == true){
            if(moduloSeleccionado.smos){
                moduloSeleccionado.smos.map((submodulo) => {
                    if(submodulo.smoruta == window.location.pathname){
                        
                        dispatch(RegistrarIngresoSubmoduloReducer(submodulo.smoid))

                    }
                })
            }
        }

    },[tiempoSeguido, habilitarRegistrarIngresoDashboard])

    // window.addEventListener('beforeunload', (event) => {
    //     // Cancel the event as stated by the standard.
    //     event.preventDefault();
    //     // Chrome requires returnValue to be set.
    //     event.returnValue = '';
      
    //     console.log('ESTA CERRANDO ')
    //     // alert('cerrar')
    // });
 
    // const location = useLocation();
    // useEffect(() => {
        
    //     // alert('cambio')

    // }, [location.key]);

    useEffect(() => {
        setTimeout(function(){ 
            setHabilitarRegistrarIngresoDashboard(true)
        }, 10000);
    },[])


    return (
        <div id="" style={{position:'relative'}}>

            <TimeLogout 
                CerrarSesionReducer = {async () => {
                    dispatch(RegistrarDetalleIngresoSubmoduloReducer("INACTIVO"))
                }}

                ActivarSessionReducer = {() => {
                    dispatch(RegistrarDetalleIngresoSubmoduloReducer("ACTIVO"))
                }}
                tiempoInactividad = {"300000"}
                // tiempoInactividad = {"60000"}
                // 10000 -> 10 SEG
                // 1000 -> 1 SEG
            />

            <div id="Contenedor-Favoritos-Dashboard">
                
                {
                    seleccionoFavoritos == true
                    ?<SliderSubMenus
                        moduloSeleccionado = {{"smos" : paisSeleccionado.favoritos}}
                        esFavoritos = {true}
                    />
                    :moduloSeleccionado.modtienesubmodulos == true
                        ?moduloSeleccionado.smos
                            ?<SliderSubMenus
                                moduloSeleccionado = {moduloSeleccionado}
                            />
                            :null
                        :null
                }
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
