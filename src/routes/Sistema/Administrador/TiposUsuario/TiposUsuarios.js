import React from 'react'
import {Row, Col} from 'antd'
import '../../../../styles/Sistema/Administrador/TiposUsuario/TiposUsuario.css'
import ListaAdministrador from '../../../../components/Sistema/Administrador/ListaAdministrador'
import TablaTiposUsuarios from '../../../../components/Sistema/Administrador/TiposUsuarios/TablaTiposUsuarios'
import ModalCrearTipoUsuario from '../../../../components/Sistema/Administrador/TiposUsuarios/ModalCrearTipoUsuario'

class TiposUsuarios extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            mostrarModalCrearTipoUsuario : false
        }
        this.abrirModalCrearTipoUsuario = this.abrirModalCrearTipoUsuario.bind(this)
    }

    abrirModalCrearTipoUsuario(){
        this.setState({
            mostrarModalCrearTipoUsuario : !this.state.mostrarModalCrearTipoUsuario
        })
    }

    aperturarEditar(posicion, editar){
        this.state.datos[posicion]['editando'] = editar
        this.setState({
            datos : this.state.datos
        })
    }
  
    render() {
        return (
            <div id="Contenedor-Principal-Margen">
                <Row>
                    <Col xl={24} id="Contenedor-Segunda-Parte-Administrador">
                        <Row>
                            <Col xl={4} md={4}>
                                <div id="Contenedor-Lista-Administrador">
                                    <div id="Titulo-Modulo-Administrador">Administrador</div><br/>
                                    <ListaAdministrador
                                        esTipoUsuario = {true}
                                        esUsuario = {false}
                                        esPermiso = {false}
                                    />
                                </div>
                            </Col>
                            <Col xl={20}>
                                <Row>
                                    <Col xl={24}>
                                        <div id="Contenedor-Btn-Crear-Administrador" onClick={() => this.abrirModalCrearTipoUsuario()}>
                                            <div id="Texto-Btn-Crear-Administrador">
                                                + Crear
                                            </div>
                                        </div>
                                    </Col>
                                    <TablaTiposUsuarios 

                                    />
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>

                <ModalCrearTipoUsuario 
                    mostrarModalCrearTipoUsuario = {this.state.mostrarModalCrearTipoUsuario}
                    abrirModalCrearTipoUsuario = {this.abrirModalCrearTipoUsuario}
                />
            </div>
        );
    }
}
  
export default TiposUsuarios;
  