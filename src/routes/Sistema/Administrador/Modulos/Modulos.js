import React from 'react'
import {Row, Col, Tooltip} from 'antd'
import '../../../../styles/Sistema/Administrador/Usuarios/Usuario.css'
import '../../../../styles/Sistema/Administrador/Modulos/Modulos.css'
import ListaAdministrador from '../../../../components/Sistema/Administrador/ListaAdministrador'
import TablaModulos from '../../../../components/Sistema/Administrador/Modulos/TablaModulos'
import ModalCrearModulo from '../../../../components/Sistema/Administrador/Modulos/ModalCrearModulo'
import ModalCrearSubModulo from '../../../../components/Sistema/Administrador/Modulos/ModalCrearSubModulo'
import BuscarModulo from '../../../../components/Sistema/Administrador/Modulos/BuscarModulo'
import actualizarAzul from '../../../../assets/images/iconos/Tabla/actualizarAzul.svg'

class Modulos extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            mostrarModalCrear : false,
            mostrarModalCrearSubModulo : false,
            editarOrdenModulos : false,

            crearNombreMenu  : "",
            crearLinkPowerBi : "",
            crearIcono       : null,
            crearIconoSeleccionado     : null,
            crearRutaModulo : "/Sistema/dashboards/",
            crearSlugPermisoModulo : "",
            crearDescripcionPermisoModulo : "",

            crearSubModuloIdSele : 0,
            crearSubModuloNombre : "",
            crearSubModuloLinkPo : "",
            crearSubModuloRutaSu : "/Sistema/dashboards/",
            crearSubModuloSlugPe : "",
            crearSubModuloDescri : "",

            txtBuscar : ""

        }
        this.abrirModalCrear = this.abrirModalCrear.bind(this)
        this.obtenerCambioInput = this.obtenerCambioInput.bind(this)
        this.seleccionarCrearIcono = this.seleccionarCrearIcono.bind(this)
        this.seleccionarCrearIconoSeleccionado = this.seleccionarCrearIconoSeleccionado.bind(this)
        this.limpiarCamposCrear = this.limpiarCamposCrear.bind(this)
        this.abrirModalCrearSubModulo = this.abrirModalCrearSubModulo.bind(this)
        this.cambiarTxtBuscar = this.cambiarTxtBuscar.bind(this)
    }

    abrirModalCrear(){
        this.setState({
            mostrarModalCrear : !this.state.mostrarModalCrear
        })
    }

    abrirModalCrearSubModulo(){
        this.setState({
            mostrarModalCrearSubModulo : !this.state.mostrarModalCrearSubModulo,
            crearSubModuloIdSele : 0,
            crearSubModuloNombre : "",
            crearSubModuloLinkPo : "",
            crearSubModuloRutaSu : "/Sistema/dashboards/",
            crearSubModuloSlugPe : "",
            crearSubModuloDescri : "",
        })
    }

    obtenerCambioInput(e){
        if(e.target.name == "crearIcono" || e.target.name == "crearIconoSeleccionado"){

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

        }else if(e.target.name == "crearRutaModulo"){
            this.setState({
                [e.target.name] : e.target.value
            })
        }else{
            this.setState({
                [e.target.name] : e.target.value
            })
        }
    }

    seleccionarCrearIcono(){
        this.refs.obtenerCrearIcono.click();
    }

    seleccionarCrearIconoSeleccionado(){
        this.refs.obtenerCrearIconoSeleccionado.click();
    }

    limpiarCamposCrear(){
        this.setState({
            crearNombreMenu  : "",
            crearLinkPowerBi : "",
            crearIcono       : null,
            crearIconoSeleccionado     : null,
            crearRutaModulo : "/Sistema/dashboards/",
            crearSlugPermisoModulo : "",
            crearDescripcionPermisoModulo : ""
        })
    }
    
    cambiarTxtBuscar(e){
        this.setState({
            txtBuscar : e.target.value
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
                                        esModulo = {true}
                                    />
                                </div>
                            </Col>
                            <Col xl={20}>
                                <Row>
                                    <Col xl={24} id="Contenedor-Primera-Fila-Control-Archivos" style={{paddingLeft:'10px', paddingRight:'10px'}}>
                                        <BuscarModulo
                                            cambiarTxtBuscar = {(e) => this.cambiarTxtBuscar(e)}
                                            txtBuscar = {this.state.txtBuscar}
                                            // tpuidseleccionado = {this.state.tpuidseleccionado}
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
                                    <Col xl={24} style={{paddingLeft:'10px', paddingRight:'10px', display:'flex'}}>
                                        <div id="Contenedor-Btn-Crear-Administrador" onClick={() => this.abrirModalCrear()}>
                                            <div id="Texto-Btn-Crear-Administrador">
                                                + Crear
                                            </div>
                                        </div>

                                        <div
                                            style={{marginLeft:'20px'}} 
                                            id={
                                                this.state.editarOrdenModulos == true
                                                ?"Contenedor-Btn-Activado-Editar-Orden-Modulos"
                                                :"Contenedor-Btn-Desactivado-Editar-Orden-Modulos"
                                            }
                                            onClick={() => this.setState({editarOrdenModulos : !this.state.editarOrdenModulos})}
                                        >
                                            <div id="Texto-Btn-Crear-Administrador">
                                                {
                                                    this.state.editarOrdenModulos == true
                                                    ?"Cancelar"
                                                    :"Editar Orden"
                                                }
                                            </div>
                                        </div>
                                    </Col>
                                    <TablaModulos 
                                        seleccionarModulo = {(idModulo, rutaModulo) => this.setState({
                                            crearSubModuloIdSele: idModulo,
                                            mostrarModalCrearSubModulo: true,
                                            crearSubModuloRutaSu : rutaModulo
                                        })}

                                        editarOrdenModulos = {this.state.editarOrdenModulos}
                                        txtBuscar = {this.state.txtBuscar}
                                    />
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <ModalCrearModulo 
                    abrirModalCrear = {this.abrirModalCrear}
                    obtenerCambioInput = {this.obtenerCambioInput}
                    mostrarModalCrear = {this.state.mostrarModalCrear}
                    crearNombreMenu = {this.state.crearNombreMenu}
                    crearLinkPowerBi = {this.state.crearLinkPowerBi}
                    crearIcono = {this.state.crearIcono}
                    crearIconoSeleccionado = {this.state.crearIconoSeleccionado}
                    seleccionarCrearIcono = {this.seleccionarCrearIcono}
                    seleccionarCrearIconoSeleccionado = {this.seleccionarCrearIconoSeleccionado}
                    crearRutaModulo               = {this.state.crearRutaModulo}
                    crearSlugPermisoModulo        = {this.state.crearSlugPermisoModulo}
                    crearDescripcionPermisoModulo = {this.state.crearDescripcionPermisoModulo}
                    limpiarCamposCrear = {this.limpiarCamposCrear}
                />

                <input 
                    type="file" 
                    name="crearIcono"
                    ref="obtenerCrearIcono" 
                    style={{display: "none"}} 
                    onChange={this.obtenerCambioInput} 
                />
                <input 
                    name="crearIconoSeleccionado"
                    type="file" 
                    ref="obtenerCrearIconoSeleccionado" 
                    style={{display: "none"}} 
                    onChange={this.obtenerCambioInput} 
                />

                <ModalCrearSubModulo 
                    mostrarModal         = {this.state.mostrarModalCrearSubModulo}
                    abrirModalCrear      = {this.abrirModalCrearSubModulo}
                    crearSubModuloIdSele = {this.state.crearSubModuloIdSele}
                    crearSubModuloNombre = {this.state.crearSubModuloNombre}
                    crearSubModuloLinkPo = {this.state.crearSubModuloLinkPo}
                    crearSubModuloRutaSu = {this.state.crearSubModuloRutaSu}
                    crearSubModuloSlugPe = {this.state.crearSubModuloSlugPe}
                    crearSubModuloDescri = {this.state.crearSubModuloDescri}
                    obtenerCambioInput   = {this.obtenerCambioInput}
                />
            </div>
        );
    }
}
  
export default Modulos;
  