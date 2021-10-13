import React, {Component} from 'react'
import {Row, Col} from "antd";
import '../../../styles/Sistema/components/CargaArchivos/TarjetaCargaArchivo.css'
import IconoEquisAzul from '../../../assets/images/iconos/CargaArchivos/equisazul.svg'
import CoheteGif from '../../../assets/Gifs/CargaArchivos/cohete.gif'
import SaltandoGif from '../../../assets/Gifs/CargaArchivos/saltando.gif'
import CargandoGif from '../../../assets/Gifs/CargaArchivos/cargando.gif'
import ErrorGif from '../../../assets/Gifs/CargaArchivos/error.gif'

class TarjetaCargaArchivo extends Component {
    constructor(){
        super();
        this.state = {
            subioArchivo     : false,
            nombreArchivo    : '',
            fileSeleccionado : null,
            cargando         : false,
            archivoError     : false,
            archivoExito     : false,
            guardarCambios   : false,
            enviarCambios    : false,
        }   
        this.seleccionarFile = this.seleccionarFile.bind(this)
        this.eliminarArchivo = this.eliminarArchivo.bind(this)
        this.enviarCambios   = this.enviarCambios.bind(this)
    }

    seleccionarFile(e) {
        this.refs.subirArchivoInput.click();
    }

    async cambioInputFile(event){
        event.stopPropagation();
        event.preventDefault();
        this.state.fileSeleccionado = event.target.files[0];

        this.setState({
            subioArchivo  : true,
            nombreArchivo : this.state.fileSeleccionado['name']
        })
    }

    eliminarArchivo(){
        this.setState({
            subioArchivo     : false,
            nombreArchivo    : '',
            fileSeleccionado : null
        })
    }

    async enviarCambios(){
        this.setState({
            cargando : true
        })

        const formData = new FormData();
        formData.append('file',this.state.fileSeleccionado)
        formData.append('ticid',1)
        
        let url = this.props.url
        
        let resultado = await this.props.EnviarArchivo(url, formData)

        this.setState({
            archivoExito : resultado.archivoExito,
            archivoError : resultado.archivoError,
        })

        this.setState({
            enviarCambios   : true,
            guardarCambios  : false,
            cargando        : false,
            fileSeleccionado: null
        })

        this.eliminarArchivo()
    }

    subirOtroArchivo(){
        this.setState({
            subioArchivo     : false,
            nombreArchivo    : '',
            fileSeleccionado : null,
            cargando         : false,
            archivoError     : false,
            archivoExito     : false,
            guardarCambios   : false,
            enviarCambios    : false,
        })
    }



    render() {
        return (
            <div id="Contenedor-TarjetaCargaArchivo" >

                <input 
                    type="file" 
                    id="file" 
                    ref="subirArchivoInput" 
                    style={{display: "none"}} 
                    onChange={(e) => this.cambioInputFile(e)} />

                <div id="Contenedor-Tarjeta-TarjetaCargaArchivo">
                        <div id="PrimeraParte-Contenedor-Tarjeta-TarjetaCargaArchivo">

                            
                            <img 
                                id="Gif-PrimeraParte-TarjetaCargaArchivo"
                                src={
                                    this.state.archivoError == true
                                    ?ErrorGif
                                    :this.state.cargando == true 
                                        ?CargandoGif  
                                        : this.state.enviarCambios == true 
                                            ?SaltandoGif
                                            :CoheteGif
                                }
                            />

                        </div>
                    
                        <div 
                            id="SegundaParte-Contenedor-Tarjeta-TarjetaCargaArchivo" 
                            style={
                                this.state.archivoError == true 
                                ?{
                                    paddingLeft: "45px",
                                    paddingRight: "45px"
                                } 
                                :{}
                            }
                        >
                            <Row style={{alignItems: "center"}}>

                                {
                                    this.state.archivoError == true
                                    ?<div id="Contenedor-Error-Tarjeta-CargaArchivos">
                                        <div id="Titulo-Error-Tarjeta-CargaArchivos">¡Opp!</div>
                                        <div id="Descripcion-Error-Tarjeta-CargaArchivos">Encontramos un error en el archivo</div>
                                    </div>
                                    :this.state.cargando == true
                                    ?<div id="Contenedor-Cargando-Tarjeta-CargaArchivos">
                                        <div id="Titulo-Cargando-Tarjeta-CargaArchivos">cargando</div>
                                        <div id="Descripcion-Cargando-Tarjeta-CargaArchivos">Cargando 1 archivo</div>
                                    </div>
                                    :
                                    <>
                                        <Col xl={7} md={24} sm={8} xs={8} style={{textAlign: "-webkit-center",}}>
                                            <svg 
                                                onClick={this.seleccionarFile} 
                                                id="Imagen-Titulo-Tarjeta-CargaArchivos" 
                                                viewBox="0 0 72 72"><path d="M36.493 72C16.118 72 0 55.883 0 36.493 0 16.118 16.118 0 36.493 0 55.882 0 72 16.118 72 36.493 72 55.882 55.883 72 36.493 72zM34 34h-9c-.553 0-1 .452-1 1.01v1.98A1 1 0 0 0 25 38h9v9c0 .553.452 1 1.01 1h1.98A1 1 0 0 0 38 47v-9h9c.553 0 1-.452 1-1.01v-1.98A1 1 0 0 0 47 34h-9v-9c0-.553-.452-1-1.01-1h-1.98A1 1 0 0 0 34 25v9z" fill="#409fff" fill-rule="nonzero"></path></svg>
                                        </Col>
                                        <Col xl={16} md={24} sm={16} xs={16} style={{}}>
                                            <span id="Texto-Titulo-Tarjeta-CargaArchivos">
                                                {
                                                    this.props.titulo
                                                }
                                            </span>
                                        </Col>
                                    </>
                                }

                                <Col xl={24} md={24} sm={24} xs={24}>
                                    {
                                        this.state.cargando == true
                                        ?null
                                        :
                                        this.state.subioArchivo == true
                                        ?<div 
                                            style={{
                                                display: "flex",
                                                width: "100%",
                                                placeContent: "center"
                                            }}>
                                            <div id="Texto-Nombre-Archivo-TarjetaCargaArchivo">
                                                {this.state.nombreArchivo}
                                            </div>
                                            <img src={IconoEquisAzul} onClick={this.eliminarArchivo} id="Imagen-Equis-Azul-CargarArchivo" />
                                        </div>
                                        :null
                                    }
                                </Col>
                            </Row>

                            {
                                this.state.cargando == true
                                ?null
                                :<div 
                                    id="Contenedor-Btn-Tarjeta-CargaArchivos"
                                    onClick = {
                                        this.state.archivoError == true
                                        ?() => {
                                            this.subirOtroArchivo()
                                        }
                                        :() => {
                                            this.enviarCambios()
                                        }
                                    }
                                >
                                    {
                                        this.state.archivoError == true
                                        ?<div 
                                            id="Btn-Tarjeta-CargaArchivos"
                                        >
                                            Subir otro
                                        </div>
                                        :<div 
                                            id={
                                                this.state.subioArchivo == true
                                                ?"Btn-Seleccionado-Tarjeta-CargaArchivos"
                                                :"Btn-Tarjeta-CargaArchivos"
                                            }
                                        >
                                            Enviar
                                        </div>
                                    }
                                    
                                </div>
                            }
                            
                        </div>
                </div>
            </div>
        );
    }
}

export default TarjetaCargaArchivo;
