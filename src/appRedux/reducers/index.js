import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import Settings from "./Settings";
import Auth from "./Auth";
// import Notes from "./Notes";
import Contact from "./Contact";
import Common from "./Common";
import Login from "./Login";
import EstadoRequest from "./EstadoRequest"
import ControlesAccesosUsuarios from "./ControlAcceso/Usuarios/Usuarios"
import ControlesAccesosPermisos from "./ControlAcceso/Permisos/Permisos"
import ControlesAccesosTiposUsuarios from "./ControlAcceso/TiposUsuarios/TiposUsuarios"
import ControlesAccesosPermisosTiposUsuarios from "./ControlAcceso/TiposUsuarios/PermisosTipoUsuario"
import Usuarios from "./Usuarios/Usuarios"
import Dashboard from "./Dashboard/Dashboard"
import ControlData from "./Administrador/ControlData/ControlData"
import Modulos from "./Administrador/Modulos/Modulos"
import DescargarData from "./DescargarData/DescargarData"
import Perfil from "./Perfil/Perfil"
import CargaArchivos from "./CargaArchivos/CargaArchivos"
import ControlArchivos from "./ControlArchivos/ControlArchivos"

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  settings: Settings,
  auth: Auth,
  // notes: Notes,
  contact: Contact,
  common: Common,
  estadoRequest : EstadoRequest,
  controlesAccesosUsuarios : ControlesAccesosUsuarios,
  controlesAccesosPermisos : ControlesAccesosPermisos,
  controlesAccesosTiposUsuarios : ControlesAccesosTiposUsuarios,
  controlesAccesosPermisosTiposUsuarios : ControlesAccesosPermisosTiposUsuarios,
  usuarios : Usuarios,
  dashboard : Dashboard,
  controlData : ControlData,
  admModulos : Modulos,
  descargarData : DescargarData,
  login : Login,
  perfil : Perfil,
  cargaArchivos : CargaArchivos,
  controlArchivos : ControlArchivos,
});

export default createRootReducer
