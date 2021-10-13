import React, {useEffect} from 'react'
import {Card, Table, Row, Col, Button} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {ObtenerListaUsuariosReducer, VisibilidadModalNuevoUsuarioReducer} from "../../../../appRedux/actions/ControlAcceso/Usuarios/Usuarios";
import ModalNuevoUsuario from "../../../../components/Sistema/ControlAcceso/Usuarios/ModalNuevoUsuario"
import '../../../../styles/Sistema/ControlAcceso/Usuarios/Usuarios.css'

const Usuarios = () => {
    const dispatch = useDispatch();
    
    const {
        cargandoTablaUsuarios,
        columnasTablaUsuarios,
        listaUsuarios
    } = useSelector(({controlesAccesosUsuarios}) => controlesAccesosUsuarios);
    
    useEffect(() => {
        dispatch(ObtenerListaUsuariosReducer())
    }, [])

    return (
        <div id="Contenedor-Principal-Margen">
            <Button onClick={ () => dispatch(VisibilidadModalNuevoUsuarioReducer(true))}>Nuevo</Button>
            <ModalNuevoUsuario />
            <Card title="Lista de Usuarios">
                <Row>
                    <Col xl={24} md={24} sm={24} xs={24}>
                        <Table 
                            loading    = {cargandoTablaUsuarios}
                            className  = "gx-table-responsive" 
                            columns    = {columnasTablaUsuarios} 
                            dataSource = {listaUsuarios} 
                        />
                    </Col>
                </Row>
            </Card>
        </div>
    )
}

export default Usuarios
