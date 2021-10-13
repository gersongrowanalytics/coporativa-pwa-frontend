import React, {useEffect} from 'react'
import {Card, Table, Row, Col, Button} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {ObtenerListaTiposUsuariosReducer, VisibilidadModalNuevoTipoUsuarioReducer} from "../../../../appRedux/actions/ControlAcceso/TiposUsuarios/TiposUsuarios";
import ModalNuevoTipoUsuario from "../../../../components/Sistema/ControlAcceso/TiposUsuarios/ModalNuevoTipoUsuario"

const TiposUsuarios = () => {

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
        <div id="Contenedor-Principal-Margen">
            <Button onClick={ () => dispatch(VisibilidadModalNuevoTipoUsuarioReducer(true))}>Nuevo</Button>
            <ModalNuevoTipoUsuario />
            <Card title="Lista de Tipos de Usuarios">
                <Row>
                    <Col xl={24} md={24} sm={24} xs={24}>
                        <Table 
                            loading    = {cargandoTablaTiposUsuarios}
                            className  = "gx-table-responsive" 
                            columns    = {columnasTablaTiposUsuarios} 
                            dataSource = {listaTiposUsuarios} 
                        />
                    </Col>
                </Row>
            </Card>
        </div>
    )
}

export default TiposUsuarios
