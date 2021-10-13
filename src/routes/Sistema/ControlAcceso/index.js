import React from "react";
import {Route, Switch} from "react-router-dom";
import TiposUsuarios from "./TiposUsuarios/TiposUsuarios"
import PermisosTiposUsuarios from "./TiposUsuarios/PermisosTiposUsuarios"
import Usuarios from "./Usuarios/Usuarios"
import Permisos from "./Permisos/Permisos"

const Sistema = ({match}) => (
    <div className="gx-main-content-wrapper">
        <Switch>
            <Route path={`${match.url}/permisos`} component={Permisos}/>
            <Route path={`${match.url}/tiposUsuarios`} component={TiposUsuarios}/>
            <Route path={`${match.url}/tiposUsuariosPermisos`} component={PermisosTiposUsuarios}/>
            <Route path={`${match.url}/usuarios`} component={Usuarios}/>
        </Switch>
    </div>
);

export default Sistema;
