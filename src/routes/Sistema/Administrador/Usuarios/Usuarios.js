import React from 'react'
import {Row, Col, Tooltip } from 'antd'
import '../../../../styles/Sistema/Administrador/Usuarios/Usuario.css'
import ListaAdministrador from '../../../../components/Sistema/Administrador/ListaAdministrador'
import ModalCrearUsuario from '../../../../components/Sistema/Administrador/Usuario/ModalCrearUsuario'
import TablaUsuarios from '../../../../components/Sistema/Administrador/Usuario/TablaUsuarios'
import actualizarAzul from '../../../../assets/images/iconos/Tabla/actualizarAzul.svg'
import SelecTipoUsuario from '../../../../components/Sistema/Administrador/Usuario/SelecTipoUsuario'
import BuscarUsuario from '../../../../components/Sistema/Administrador/Usuario/BuscarUsuario'


class TiposUsuarios extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            
            mostrarModalCrearUsuario : false,

            txtBuscar : null,
            tpuidseleccionado : null
        }

        this.abrirModalCrearUsuario = this.abrirModalCrearUsuario.bind(this)
        this.cambiarTpuidSeleccionado = this.cambiarTpuidSeleccionado.bind(this)
        this.cambiarTxtBuscar = this.cambiarTxtBuscar.bind(this)
    }

    abrirModalCrearUsuario(){
        this.setState({
            mostrarModalCrearUsuario : !this.state.mostrarModalCrearUsuario
        })
    }

    EditarUsuario(posicion, editar){
        this.state.arrayArchivos[posicion]['editando'] = editar
        this.setState({
            arrayArchivos : this.state.arrayArchivos
        })
    }

    cambiarTpuidSeleccionado(valor){
        this.setState({
            tpuidseleccionado : valor
        })
    }

    cambiarTxtBuscar(valor){
        this.setState({
            txtBuscar : valor
        })
    }
  
    render() {
        return (
            <div id="Contenedor-Principal-Margen">
                <Row>
                    {/* <Col xl={4} id="Titulo-Modulo-Administrador"> */}
                        {/* Administrador */}
                    {/* </Col> */}
                    {/* <Col xl={4} style={{textAlignLast: "right"}}>  */}
                        {/* 1- 4 de 6 */}
                    {/* </Col> */}

                    <Col xl={24} lg={24} md={24} sm={24} xs={24} id="Contenedor-Segunda-Parte-Administrador">
                        <Row>
                            <Col xl={4} lg={4} md={24} sm={24} xs={24} id="Contenedor-Posicion-Lista-Administrador">
                                <div id="Contenedor-Lista-Administrador">
                                    <div id="Titulo-Modulo-Administrador">Administrador</div><br/>
                                    <ListaAdministrador
                                        esTipoUsuario = {false}
                                        esUsuario = {true}
                                        esPermiso = {false}
                                    />
                                </div>
                            </Col>
                            <Col xl={20} lg={20} md={24} sm={24} xs={24}>
                                <Row>
                                    <Col xl={24} lg={24} md={24} sm={24} xs={24} id="Contenedor-Primera-Fila-Control-Archivos" style={{paddingLeft:'10px', paddingRight:'10px'}}>
                                        <BuscarUsuario 
                                            cambiarTxtBuscar = {(e) => this.cambiarTxtBuscar(e)}
                                            tpuidseleccionado = {this.state.tpuidseleccionado}
                                        />
                                        <div
                                            style={{
                                                textAlign: "-webkit-right", paddingRight:'20px', width:"100px"
                                            }}
                                            id="Icono-Actualizar-Control-Archivo"
                                        >
                                            <Tooltip placement="bottom" title={"Actualizar"}>
                                                <img src={actualizarAzul} width={"28px"} />
                                            </Tooltip>
                                        </div>
                                    </Col>
                                    <Col xl={24} lg={24} md={24} sm={24} xs={24} style={{display:'flex', padding:'10px'}}>
                                        <div id="Contenedor-Btn-Crear-Administrador" onClick={() => this.abrirModalCrearUsuario()}>
                                            <div id="Texto-Btn-Crear-Administrador">
                                                + Crear
                                            </div>
                                        </div>
                                        
                                        <SelecTipoUsuario 
                                            txtBuscar         = {this.state.txtBuscar}
                                            tpuidseleccionado = {this.state.tpuidseleccionado}
                                            cambiarTpuidSeleccionado = {this.cambiarTpuidSeleccionado}
                                        />
                                    </Col>
                                    <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                                    
                                        <TablaUsuarios 
                                            
                                        />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>

                <ModalCrearUsuario 
                    abrirModalCrearUsuario = {this.abrirModalCrearUsuario}
                    mostrarModalCrearUsuario = {this.state.mostrarModalCrearUsuario}
                />
            </div>
        );
    }
}
  
export default TiposUsuarios;
  