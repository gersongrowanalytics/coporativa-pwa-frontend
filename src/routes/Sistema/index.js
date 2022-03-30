import React from "react";
import {Route, Switch, Link} from "react-router-dom";
// import Categorias from './Categorias/Categorias'
import TheBrainData from './TheBrainData/TheBrainData'
import CanalTradicional from "./CanalTradicional/index"
import ControlAcceso from "./ControlAcceso/index"
// import Perfil from "./Perfil/Perfil"
import Cat from "./Cat/Cat"
import Dashboard from './Dashboard/Dashboard'
import CargarArchivo from './CargaArchivos/CargaArchivos'
import ControlArchivos from './ControlArchivos/ControlArchivos'
import Administrador from './Administrador/index'
import DescargarData from './DescargarData/DescargarData'
import Terminos from './Terminos/Terminos'
import Pricing from './Pricing/Pricing'
// import Prueba from './Prueba/Prueba'
// import asyncComponent from "util/asyncComponent";
import PerfilFuncional from './Perfil/PerfilFuncional'
import '../../styles/Sistema/index.css'
import {useDispatch, useSelector} from "react-redux";
import {AceptarCookiesReducer, LeyendoCookiesReducer} from '../../appRedux/actions/Setting'
import config from '../../config'
import TimeLogout from '../../containers/App/TimeLogout'
import {
    userSignOut,
} from "../../appRedux/actions/Auth";

const Sistema = ({match}) => {

    const dispatch = useDispatch();

    const { 
        cookiesaceptadas,
        leyendopoliticas
    } = useSelector(({settings}) => settings);

    const {
        datosUsuarioLogeado,
        mostrar_terminos_condiciones_login
    } = useSelector(({auth}) => auth);

    return(
        <div className="gx-main-content-wrapper">

            {/* <TimeLogout 
                CerrarSesionReducer = {async () => {
                    await dispatch(userSignOut())
                    window.location.reload(); 
                    // console.log("CERRAR")
                }}
                tiempoInactividad = {"900000"}
                // tiempoInactividad = {"5000"}
            /> */}

            <TimeLogout 
                CerrarSesionReducer = {async () => {
                    // console.log('verificar si esta activo')
                    
                    if(!localStorage.getItem('usutoken')){
                        await dispatch(userSignOut())
                        window.location.reload(); 
                    }
                    

                }}
                tiempoInactividad = {"500"}
            />

            {
                
                window.location.href.includes('/terminos-condiciones')
                ?null
                :datosUsuarioLogeado.usuaceptoterminos
                    ?mostrar_terminos_condiciones_login == true
                        ?<div className="Contenedor-Cookies" >
                            <div className="Mensaje-Cookies">
                                <div 
                                    style={{
                                        fontSize: "14px",
                                        fontWeight: "600",
                                        color: "black",
                                        marginBottom:'5px'
                                    }}
                                >
                                    TERMINOS Y CONDICIONES DE USO
                                </div>

                                El usuario del sitio Web y/o App se compromete a leer detenidamente los términos y condiciones, antes de utilizar los portales y servicios Web ofrecidos. Ello implica que usted acepta expresamente los términos y condiciones. En caso de no aceptarlos, se le solicita que no haga uso, ni acceda, ni manipule la información de los servicios ofrecidos por el sitio Web; ya que usted (usuario) está haciendo un uso inadecuado de éste.<br/>Para continuar con el uso de la platforma ir y aceptar al siguiente link:   
                                <Link 
                                    to="/sistema/terminos-condiciones"
                                >
                                    <span
                                        style={{color:'blue', cursor:'pointer', textDecoration:'underline'}}>{" Terminos y Condiciones"}</span>
                                </Link>
                            </div>    
                        </div>
                        :null
                    :<div className="Contenedor-Cookies" >
                        <div className="Mensaje-Cookies">
                            <div 
                                style={{
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    color: "black",
                                    marginBottom:'5px'
                                }}
                            >
                                TERMINOS Y CONDICIONES DE USO
                            </div>

                            El usuario del sitio Web y/o App se compromete a leer detenidamente los términos y condiciones, antes de utilizar los portales y servicios Web ofrecidos. Ello implica que usted acepta expresamente los términos y condiciones. En caso de no aceptarlos, se le solicita que no haga uso, ni acceda, ni manipule la información de los servicios ofrecidos por el sitio Web; ya que usted (usuario) está haciendo un uso inadecuado de éste.<br/>Para continuar con el uso de la platforma ir y aceptar al siguiente link:   
                            <Link 
                                to="/sistema/terminos-condiciones"
                            >
                                <span
                                    style={{color:'blue', cursor:'pointer', textDecoration:'underline'}}>{" Terminos y Condiciones"}</span>
                            </Link>
                        </div>    
                    </div>
            }


            <Switch>
                <Route path={`${match.url}/categorias`} component={Cat}/>
                <Route path={`${match.url}/cat`} component={Cat}/>
                <Route path={`${match.url}/dashboards`} component={Dashboard}/>
                <Route path={`${match.url}/cargar-archivo`} component={CargarArchivo}/>

                {/* <Route path={`${match.url}/categorias`} component={Categorias}/> */}
                <Route path={`${match.url}/thebrainData`} component={TheBrainData}/>
                <Route path={`${match.url}/descargar-data`} component={DescargarData}/>
                <Route path={`${match.url}/canalTradicional`} component={CanalTradicional}/>
                <Route path={`${match.url}/control-acceso`} component={ControlAcceso}/>
                <Route path={`${match.url}/perfil`} component={PerfilFuncional}/>

                <Route path={`${match.url}/control-archivos`} component={ControlArchivos}/>
                <Route path={`${match.url}/administrador`} component={Administrador}/>
                <Route path={`${match.url}/terminos-condiciones`} component={Terminos}/>

                <Route path={`${match.url}/pricing`} component={Pricing}/>

                {/* <Route path={`${match.url}/prueba`} component={Prueba}/> */}
                


                {/* <Route path={`${match.url}/canalModerno`} component={CanalModerno}/>
                <Route path={`${match.url}/canalTradicional`} component={CanalTradicional}/>
                <Route path={`${match.url}/thanosData`} component={ThanosData}/> */}
            </Switch>
        </div>
    )
};

export default Sistema;
