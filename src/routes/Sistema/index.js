import React from "react";
import {Route, Switch} from "react-router-dom";
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
// import Prueba from './Prueba/Prueba'
// import asyncComponent from "util/asyncComponent";
import PerfilFuncional from './Perfil/PerfilFuncional'

const Sistema = ({match}) => (
    <div className="gx-main-content-wrapper">
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

            {/* <Route path={`${match.url}/prueba`} component={Prueba}/> */}
            


            {/* <Route path={`${match.url}/canalModerno`} component={CanalModerno}/>
            <Route path={`${match.url}/canalTradicional`} component={CanalTradicional}/>
            <Route path={`${match.url}/thanosData`} component={ThanosData}/> */}
        </Switch>
    </div>
);

export default Sistema;
