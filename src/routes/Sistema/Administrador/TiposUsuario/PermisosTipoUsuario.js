import React, {useEffect} from 'react'
import {Row, Col, Switch} from 'antd'
// import IconoEditar from 'assets/images/iconos/Administrador/modulos/editar.png'
import {useDispatch, useSelector} from "react-redux"
import {Link} from "react-router-dom"
import '../../../../styles/Sistema/Administrador/TiposUsuario/PermisosTipoUsuario.css'
import {SeleccionarPermisoReducer, PoderGuardarPermisosReducer, EditarPermisosTipoUsuario} from '../../../../appRedux/actions/ControlAcceso/TiposUsuarios/PermisosTipoUsuario'

const PermisosTipoUsuario = () => {

    const dispatch = useDispatch();

    const {
        permisosTipoUsuario,
        guardarPermisos
    } = useSelector(({controlesAccesosPermisosTiposUsuarios}) => controlesAccesosPermisosTiposUsuarios);

    useEffect(() => {
        dispatch(PoderGuardarPermisosReducer(false))
    }, [])

    return (
        <div id="Contenedor-Principal-Margen">
            
            <div style={{display:'flex'}}>
                <Link to={"/Sistema/administrador/tipos-usuarios"}>
                    <div id="Btn-Crear-Permisos-TiposUsuarios">
                        Regresar
                    </div>
                </Link>
                {/* <div id="Btn-Crear-Permisos-TiposUsuarios">
                    + Crear
                </div> */}

                <div 
                    id={
                        guardarPermisos == true 
                        ?"Btn-Crear-Permisos-TiposUsuarios" 
                        :"Btn-Desactivado-Permisos-TiposUsuarios"
                    }
                    onClick={() => guardarPermisos == true ? dispatch(EditarPermisosTipoUsuario()) : console.log()}
                >
                    Guardar
                </div>
            </div>

            {
                permisosTipoUsuario.map((permiso, posicion) => {
                    return (
                        <Row id="Contenedor-Fila-Permisos-TiposUsuarios">
                            <Col xl={2}>
                                <Switch 
                                    defaultChecked={permiso.seleccionado}
                                    onChange={() => dispatch(SeleccionarPermisoReducer(posicion, !permiso.seleccionado))} 
                                />
                            </Col>
                            <Col xl={18}>
                                <div>{permiso.pemnombre}</div>
                            </Col>
                            <Col xl={4}>
                                <div>
                                    <div style={{display:'flex'}}>
                                        {/* <img
                                            id="Icono-Editar-Permisos-TiposUsuarios" 
                                            src={IconoEditar} /> */}
                                        {/* <div id="Texto-Fecha-Permisos-TiposUsuarios"> abr</div> */}
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    )
                })
            }

        </div>
    )
}

export default PermisosTipoUsuario
