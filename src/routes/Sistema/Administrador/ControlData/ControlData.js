import React from 'react'
import {Row, Col } from 'antd'
import ListaAdministrador from '../../../../components/Sistema/Administrador/ListaAdministrador'
import IconoAdministradorTipoUsuario from '../../../../assets/images/iconos/Administrador/tipoUsuario.png'
import '../../../../styles/Sistema/Administrador/ControlData/ControlData.css'
import ModalCrearData from '../../../../components/Sistema/Administrador/ControlData/ModalCrearData';
import TablaData from '../../../../components/Sistema/Administrador/ControlData/TablaData';
import BotonEliminar from '../../../../components/Sistema/Administrador/ControlData/BotonEliminar'

class ControlData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            datos : [
                {
                    icono : IconoAdministradorTipoUsuario,
                    texto : "Administrador",
                    editando : false
                },
                {
                    icono : IconoAdministradorTipoUsuario,
                    texto : "Cliente",
                    editando : false
                },
                {
                    icono : IconoAdministradorTipoUsuario,
                    texto : "Cliente",
                    editando : false
                },
                {
                    icono : IconoAdministradorTipoUsuario,
                    texto : "Administrador",
                    editando : false
                },
                {
                    icono : IconoAdministradorTipoUsuario,
                    texto : "Cliente",
                    editando : false
                },
                {
                    icono : IconoAdministradorTipoUsuario,
                    texto : "Cliente",
                    editando : false
                },
            ],

            mostrarModalCrear  : false,
            crearNombreArchivo : "",
            nombreArchivoSeleccionado : "",
            crearArchivo       : null,
            crearImagenUno     : null,
            crearImagenDos     : null,
            crearImagenTres    : null
        }
        this.abrirModalCrear       = this.abrirModalCrear.bind(this)
        this.obtenerCambioInput    = this.obtenerCambioInput.bind(this)
        this.seleccionarImagenUno  = this.seleccionarImagenUno.bind(this)
        this.seleccionarImagenDos  = this.seleccionarImagenDos.bind(this)
        this.seleccionarImagenTres = this.seleccionarImagenTres.bind(this)
        this.seleccionarArchivo    = this.seleccionarArchivo.bind(this)
        this.limpiarCamposCrear    = this.limpiarCamposCrear.bind(this)
    }

    abrirModalCrear(){
        this.setState({
            mostrarModalCrear : !this.state.mostrarModalCrear
        })
    }

    obtenerCambioInput(e){
        if(e.target.name == "crearImagenUno" || e.target.name == "crearImagenDos" || e.target.name == "crearImagenTres"){

            var file = e.target.files[0];
            var fileData = new FileReader();
            var nombreInput = e.target.name
            if(file){
                fileData.readAsDataURL(file);
            }
            
            fileData.onload = (e) => {
                this.setState({
                    [nombreInput] : fileData.result
                })
            }

            
        }else if(e.target.name == "crearArchivo"){
            e.stopPropagation();
            e.preventDefault();
            this.state.crearArchivo = e.target.files[0];

            this.setState({
                nombreArchivoSeleccionado : this.state.crearArchivo['name'],
                crearNombreArchivo : this.state.crearArchivo['name']
            })
        }else{
            this.setState({
                [e.target.name] : e.target.value
            })
        }
    }

    seleccionarImagenUno(){
        this.refs.obtenerImagenUno.click();
    }
    
    seleccionarImagenDos(){
        this.refs.obtenerImagenDos.click();
    }
    
    seleccionarImagenTres(){
        this.refs.obtenerImagenTres.click();
    }
    
    seleccionarArchivo(){
        this.refs.obtenerArchivo.click();
    }

    limpiarCamposCrear(){
        this.setState({
            crearNombreArchivo : "",
            nombreArchivoSeleccionado : "",
            crearArchivo       : null,
            crearImagenUno     : null,
            crearImagenDos     : null,
            crearImagenTres    : null
        })
    }

    

    render() {
        return (
            <div id="Contenedor-Principal-Margen">
                <Row>
                    <Col xl={24} md={4} md={24} sm={24} xs={24} id="Contenedor-Segunda-Parte-Administrador">
                        <Row>
                            <Col xl={4} md={4} md={24} sm={24} xs={24} id="Contenedor-Lista-Tipos-Usuario">
                                <div id="Contenedor-Lista-Administrador">
                                    <div id="Titulo-Modulo-Administrador">Administrador</div><br/>
                                    <ListaAdministrador
                                        esControlData = {true}
                                    />
                                </div>
                            </Col>
                            <Col xl={20}>
                                <Row>
                                    <Col xl={24} md={24} md={24} sm={24} xs={24} id="Crear-Eliminar" style={{ display: "flex"}}>
                                        <div id="Contenedor-Btn-Crear-Administrador" onClick={this.abrirModalCrear}>
                                            <div id="Texto-Btn-Crear-Administrador">
                                                + Crear
                                            </div>
                                        </div>
                                        <BotonEliminar 

                                        />
                                    </Col>
                                    
                                    <TablaData 
                                        datos = {this.state.datos}
                                    />
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>

                <ModalCrearData
                    abrirModalCrear    = {this.abrirModalCrear}
                    mostrarModalCrear  = {this.state.mostrarModalCrear}
                    crearNombreArchivo = {this.state.crearNombreArchivo}
                    nombreArchivoSeleccionado = {this.state.nombreArchivoSeleccionado}
                    crearArchivo       = {this.state.crearArchivo}
                    crearImagenUno     = {this.state.crearImagenUno}
                    crearImagenDos     = {this.state.crearImagenDos}
                    crearImagenTres    = {this.state.crearImagenTres}
                    obtenerCambioInput = {this.obtenerCambioInput}
                    seleccionarImagenUno = {this.seleccionarImagenUno}
                    seleccionarImagenDos = {this.seleccionarImagenDos}
                    seleccionarImagenTres = {this.seleccionarImagenTres}
                    seleccionarArchivo    = {this.seleccionarArchivo}
                    limpiarCamposCrear    = {this.limpiarCamposCrear}
                />

                <input 
                    type="file" 
                    name="crearImagenUno"
                    ref="obtenerImagenUno" 
                    style={{display: "none"}} 
                    onChange={this.obtenerCambioInput} 
                />
                <input 
                    name="crearImagenTres"
                    type="file" 
                    ref="obtenerImagenTres" 
                    style={{display: "none"}} 
                    onChange={this.obtenerCambioInput} 
                />
                <input 
                    type="file" 
                    ref="obtenerImagenDos" 
                    name="crearImagenDos"
                    style={{display: "none"}} 
                    onChange={this.obtenerCambioInput} 
                />

                <input 
                    type="file" 
                    ref="obtenerArchivo"
                    name="crearArchivo"
                    style={{display: "none"}} 
                    onChange={this.obtenerCambioInput}
                />

            </div>
        )
    }
}

export default ControlData