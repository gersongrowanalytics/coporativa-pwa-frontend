import React from "react";
import {Route, Switch} from "react-router-dom";
import DatosGenerales from "./DatosGenerales/DatosGenerales"
import Comercial from "./Comercial/Comercial"
import Otros from "./Otros/Otros"
// import Comercial from "./Comercial/index"
// import Negocio from "./Negocio/index"
// import Otros from "./Otros/index"



const CanalTradicional = ({match}) => (
    <>
        <Switch>
            {/* <Route path={`${match.url}/negocio`} component={Negocio}/> */}
            <Route path={`${match.url}/datosGenerales`} component={DatosGenerales}/>
            <Route path={`${match.url}/comercial`} component={Comercial}/>
            <Route path={`${match.url}/otros`} component={Otros}/>
            {/* <Route path={`${match.url}/comercial`} component={Comercial}/> */}
            {/* <Route path={`${match.url}/otros`} component={Otros}/> */}
        </Switch>
    </>
);

export default CanalTradicional;
