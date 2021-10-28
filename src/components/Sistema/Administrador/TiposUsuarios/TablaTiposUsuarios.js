import React, {useEffect} from 'react'
import {Row, Col, Switch, Input} from 'antd'
import {useDispatch, useSelector} from "react-redux";
import {
    ObtenerListaTiposUsuariosReducer,
    HabilitarEditarTipoUsuarioReducer,
    CambiarEstadoTipoUsuarioReducer
} from "../../../../appRedux/actions/ControlAcceso/TiposUsuarios/TiposUsuarios";
import iconoAceptar from '../../../../assets/images/iconos/Tabla/aceptar.png';
import iconoCancelar from '../../../../assets/images/iconos/Tabla/cancelar.png';
import IconoEditar from '../../../../assets/images/iconos/Tabla/editar.svg'
// import IconoEliminar from 'assets/images/iconos/Tabla/tacho.png'
import IconoAdministradorTipoUsuario from '../../../../assets/images/iconos/Administrador/tipoUsuario.png'
import {Link} from "react-router-dom"
import {ObtenerPermisosTipoUsuarioReducer} from '../../../../appRedux/actions/ControlAcceso/TiposUsuarios/PermisosTipoUsuario'
import Moment from 'moment'
import '../../../../styles/Sistema/Administrador/TiposUsuario/TiposUsuario.css'

const TablaTiposUsuarios = () => {
    Moment.locale('en');
    const dispatch = useDispatch();
    
    const {
        cargandoTablaTiposUsuarios,
        columnasTablaTiposUsuarios,
        listaTiposUsuarios
    } = useSelector(({controlesAccesosTiposUsuarios}) => controlesAccesosTiposUsuarios);
    
    useEffect(() => {
        dispatch(ObtenerListaTiposUsuariosReducer())
    }, [])

    return (
        <Col xl={24} lg={24} md={24} sm={24} xs={24} id="Contenedor-Responsive">
            {
                listaTiposUsuarios.map((dato, posicion) => {
                    return (
                        <Row id="Fila-Tabla-Administrador">
                            <Col xl={6} lg={6} md={6} sm={11} xs={18}>
                                <div>
                                    <img src={IconoAdministradorTipoUsuario} id="Icono-Lista-Administrador" /> 
                                    {
                                        dato.editando == true
                                        ?<Input value={dato.tpunombre} style={{width:'140px'}}/>
                                        :<span id="Texto-Lista-Administrador">{dato.tpunombre}</span>
                                    }

                                    
                                </div>
                            </Col>
                            <Col xl={6} lg={6} md={6} sm={6} xs={6} style={{ alignSelf: "center"}}>
                                <Link to={"/Sistema/administrador/tipos-usuario/permisos"} onClick={() => dispatch(ObtenerPermisosTipoUsuarioReducer(dato.tpuid))}>
                                    <div id="Texto-Tabla-Tipos-Usuarios-Administrador">Permisos</div>
                                </Link>
                            </Col>
                            
                            <Col xl={4} lg={4} md={4} sm={7} xs={7} style={{display:'flex', alignItems: "center"}}>
                                {Moment(dato.created_at).format('D MMM')}
                            </Col>
                            
                            <Col xl={4} lg={4} md={4} sm={12} xs={7} style={{display:'flex', alignItems: "center"}}>
                                <Switch 
                                    size="small"
                                    disabled={
                                        dato.editando == true
                                        ?false
                                        :true
                                    }
                                    defaultChecked={
                                        dato.estid == 1
                                        ?true
                                        :false
                                    }

                                    onChange={(e) => dispatch(CambiarEstadoTipoUsuarioReducer(posicion, e))}
                                />
                                <div id="Texto-Estado-Tipo-Usuarios-Administrador">
                                    {
                                        dato.estid == 1
                                        ?"Activado"
                                        :"Desactivado"
                                    }
                                </div>
                            </Col>
                            

                            <Col xl={4} lg={4} md={4} sm={12} xs={10} style={{textAlignLast: "right"}}>
                                {
                                    dato.editando == true
                                    ?<div>
                                        <img
                                            onClick={() => dispatch(HabilitarEditarTipoUsuarioReducer(posicion))}
                                            src={iconoCancelar}  id="Icono-Fila-Editar-Administrador"/>   
                                        <img
                                            onClick={() => dispatch(HabilitarEditarTipoUsuarioReducer(posicion))}
                                            src={iconoAceptar}  id="Icono-Fila-Editar-Administrador"/>
                                    </div>
                                    :<img
                                        onClick={() => dispatch(HabilitarEditarTipoUsuarioReducer(posicion))}
                                        src={IconoEditar}  id="Icono-Fila-Editar-Administrador"/>
                                }
                            </Col>
                        </Row>
                    )
                })
            }
            
        </Col>
    )
}

export default TablaTiposUsuarios
