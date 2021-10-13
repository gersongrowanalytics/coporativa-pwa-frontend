import React from "react";
import {Route, Switch} from "react-router-dom";
import TiposUsuarios from "./TiposUsuario/TiposUsuarios"
import Usuarios from "./Usuarios/Usuarios"
import Permisos from "./Permisos/Permisos"
import Modulos from "./Modulos/Modulos"
import ControlData from "./ControlData/ControlData"
import PermisosTipoUsuario from "./TiposUsuario/PermisosTipoUsuario"

const Administrador = ({match}) => (
    <div className="gx-main-content-wrapper">
        <Switch>
            <Route path={`${match.url}/tipos-usuarios`} component={TiposUsuarios}/>
            <Route path={`${match.url}/tipos-usuario/permisos`} component={PermisosTipoUsuario}/>
            <Route path={`${match.url}/usuarios`} component={Usuarios}/>
            <Route path={`${match.url}/permisos`} component={Permisos}/>
            <Route path={`${match.url}/modulos`} component={Modulos}/>
            <Route path={`${match.url}/control-data`} component={ControlData}/>
        </Switch>
    </div>
);

export default Administrador;
