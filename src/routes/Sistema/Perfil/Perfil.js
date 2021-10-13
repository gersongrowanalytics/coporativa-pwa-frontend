import React, {useState} from 'react'
import {Row, Col, Input, Button} from 'antd'
import iconoEditar from '../../../assets/images/iconos/Perfil/lapizeditar.png';
import iconoCargo from '../../../assets/images/iconos/Perfil/cargo.png';
import iconoContrasenia from '../../../assets/images/iconos/Perfil/contrasenia.png';
import iconoCorreo from '../../../assets/images/iconos/Perfil/correo.png';
import iconoCumpleanios from '../../../assets/images/iconos/Perfil/cumpleanios.png';
import iconoTelfono from '../../../assets/images/iconos/Perfil/telefono.png';
import iconoUsuario from '../../../assets/images/iconos/Perfil/usuario.png';
import iconoCamara from '../../../assets/images/iconos/Perfil/camara.png';
import iconoPerfil from '../../../assets/images/iconos/Perfil/perfil.png';

import iconoCerrar from '../../../assets/images/iconos/Perfil/cerrar.png';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import '../../../styles/Sistema/Perfil/Perfil.css'
import ModalEditarImagen from '../../../components/Sistema/Perfil/ModalEditarImagen';
import BtnGuardarContrasenia from '../../../components/Sistema/Perfil/BtnGuardarContrasenia';
import BtnGuardarCumpleanios from '../../../components/Sistema/Perfil/BtnGuardarCumpleanios';
// import BtnObtenerDatosUsuario from './btnObtenerDatosUsuario';
import BtnGuardarTelefono from '../../../components/Sistema/Perfil/BtnGuardarTelefono';


class Perfil extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            cambiandoContrasenia : false,
            cambiandoCumpleanios : false,
            cambiandoTelefono : false,
            modalVisible : false,

            file: null,
            filePrincipal : null,

            cargandoGuardarImagen : false,
            cargandoGuardarContrasenia : false,

            txt_input_anteriorContrasenia : "",
            txt_input_nuevaContrasenia : "",
            txt_input_confirmarNuevaContrasenia : "",
            Input_Incorrecto_Contrasenia: false,

            cargandoGuardarCumpleanios : false,
            cargandoGuardarTelefono    : false,
            txt_input_cumpleanios      : "",
            txt_input_paistelefono     : "",
            txt_input_telefono         : ""
        }
        this.seleccionarFile = this.seleccionarFile.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    ActivarCambioContrasenia(){
        this.setState({
            cambiandoContrasenia : !this.state.cambiandoContrasenia
        })
    }

    ActivarCambioCumpleanios(){
        this.setState({
            cambiandoCumpleanios : !this.state.cambiandoCumpleanios
        })
    }

    ActivarCambioTelefono(){
        this.setState({
            cambiandoTelefono : !this.state.cambiandoTelefono
        })
    }

    mostrarModal(){
        this.setState({
            modalVisible : true
        })
    };

    ocultarModal(){
        this.setState({
            modalVisible : false,
            filePrincipal : this.state.file
        })
    }

    seleccionarFile() {
        this.refs.subirArchivoInput.click();
    }

    handleChange(e) {
        // this.setState({
        //     file: URL.createObjectURL(event.target.files[0])
        // })

        var file = e.target.files[0];
        var fileData = new FileReader();

        if(file){
            fileData.readAsDataURL(file);
        }
        
        fileData.onload = (e) => {
            this.setState({
                file : fileData.result
            })
        }
    }

    CargandoEditarImagen(accion){
        this.setState({
            cargandoGuardarImagen : accion
        })
    }

    CargandoEditarContrasenia(accion){
        this.setState({
            cargandoGuardarContrasenia : accion
        })
    }

    CargandoEditarCumpleanios(accion){
        this.setState({
            cargandoGuardarCumpleanios : accion
        })
    }

    CargandoEditarTelefono(accion){
        this.setState({
            cargandoGuardarTelefono : accion
        })
    }

    obtenerInputAnteriorContrasenia(e){
        this.setState({
            txt_input_anteriorContrasenia: e.target.value
        })
    }
    obtenerInputNuevaContrasenia(e){
        this.setState({
            txt_input_nuevaContrasenia : e.target.value
        })
    }

    obtenerInputConfirmarNuevaContrasenia(e){
        
        if(e.target.value != this.state.txt_input_nuevaContrasenia ){
            this.setState({
                Input_Incorrecto_Contrasenia : true
            })
        }else{
            this.setState({
                Input_Incorrecto_Contrasenia : false
            })
        }
        this.setState({
            txt_input_confirmarNuevaContrasenia : e.target.value
        })
    }

    render() {
        return (
            <div 
                style={{
                    position:'relative',
                }}
            >
                <div id="Fondo-Uno-Perfil">
                    <div id="Primera-Fondo-Uno-Perfil">
                        {/* <BtnObtenerDatosUsuario />  */}
                    </div>
                </div>
                <div id="Fondo-Dos-Perfil">
                    <div id="Primera-Fondo-Dos-Perfil">
                        <div id="Contenedor-Icono-Primera-Fondo-Dos-Perfil">
                            <div id="Icono-Primera-Fondo-Dos-Perfil">
                                <img 
                                    src={
                                        localStorage.getItem('usuimagen') == "none"
                                        ?iconoPerfil 
                                        :localStorage.getItem('usuimagen')
                                    }
                                    // src={
                                    //     this.state.filePrincipal == null
                                    //     ?iconoPerfil 
                                    //     : this.state.filePrincipal
                                    // } 
                                    id={
                                        this.state.filePrincipal == null
                                        ?"Icono-Perfil-Default-Primera-Fondo-Dos-Perfil"
                                        :"Icono-Perfil-Primera-Fondo-Dos-Perfil"
                                        
                                    }
                                />
                            </div>
                            <img onClick={() => this.mostrarModal()} src={iconoCamara} id="Icono-Camara-Primera-Fondo-Dos-Perfil" />
                        </div>
                    </div>
                    <div id="Titulo-Primera-Fondo-Dos-Perfil" >
                        {localStorage.getItem('pernombrecompleto')}
                    </div>
                    <div id="SubTitulo-Primera-Fondo-Dos-Perfil">
                        {localStorage.getItem('tpunombre')}
                    </div>

                    <div id="Contenedor-Cuerpo-Fondo-Dos-Perfil">
                        <div id="Cuerpo-Fondo-Dos-Perfil">

                            <div id="Titulo-Cuerpo-Fondo-Dos-Perfil">Información básica</div>
                            <div id="Card-Cuerpo-Fondo-Dos-Perfil">
                                <Row id="Fila-Card-Cuerpo-Fondo-Dos-Perfil">
                                    <Col xl={10} sm={10} md={10} xs={10} id="Texto-Izq-Fila-Card-Cuerpo-Fondo-Dos-Perfil">
                                        <img width={"29px"} height={"29px"} src={iconoUsuario} style={{marginRight:'10px'}} />Nombre
                                    </Col>
                                    <Col xl={12} sm={12} md={12} xs={12} id="Texto-Dercha-Fila-Card-Cuerpo-Fondo-Dos-Perfil">
                                        {localStorage.getItem('pernombrecompleto')}
                                    </Col>
                                    <Col xl={2} sm={2} md={2} xs={2}>
                                        {/* <img width={"29px"} height={"29px"} src={iconoEditar} style={{marginRight:'10px'}} id="Icono-Editar-Perfil" /> */}
                                    </Col>
                                </Row>
                                <Row id="Fila-Card-Cuerpo-Fondo-Dos-Perfil">
                                    <Col xl={10} sm={10} md={10} xs={10} id="Texto-Izq-Fila-Card-Cuerpo-Fondo-Dos-Perfil">
                                        <img width={"29px"} height={"29px"} src={iconoCorreo} style={{marginRight:'10px'}} />Correo electrónico
                                    </Col>
                                    <Col xl={12} sm={12} md={12} xs={12} id="Texto-Dercha-Fila-Card-Cuerpo-Fondo-Dos-Perfil">
                                        {localStorage.getItem('usucorreo')}
                                    </Col>
                                    <Col xl={2} sm={2} md={2} xs={2}>
                                        {/* <img width={"29px"} height={"29px"} src={iconoEditar} style={{marginRight:'10px'}} id="Icono-Editar-Perfil" /> */}
                                    </Col>
                                </Row>
                                <Row id="Fila-Card-Cuerpo-Fondo-Dos-Perfil">
                                    <Col xl={10} sm={10} md={10} xs={10} id="Texto-Izq-Fila-Card-Cuerpo-Fondo-Dos-Perfil">
                                        
                                        <img width={"29px"} height={"29px"} src={iconoCargo} style={{marginRight:'10px'}} />Cargo
                                    </Col>
                                    <Col xl={12} sm={12} md={12} xs={12} id="Texto-Dercha-Fila-Card-Cuerpo-Fondo-Dos-Perfil">
                                        {localStorage.getItem('tpunombre')}
                                    </Col>
                                    <Col xl={2} sm={2} md={2} xs={2}>
                                        {/* <img width={"29px"} height={"29px"} src={iconoEditar} style={{marginRight:'10px'}} id="Icono-Editar-Perfil" /> */}
                                    </Col>
                                </Row>

                                {
                                    this.state.cambiandoContrasenia == true
                                    ?<Row id="Fila-Card-Cuerpo-Fondo-Dos-Perfil">
                                        <Col xl={10} sm={10} md={10} xs={10} style={{ height: "100%", marginBottom: "auto", display:'flex'}}>
                                            <div style={{width:'15%'}} >
                                                <img width={"29px"} height={"29px"} src={iconoContrasenia} />
                                            </div>
                                            <div style={{width:'85%'}} >
                                                <span id="Titulo-Cambio-Contrasenia-Perfil">Contraseña</span><br/>
                                                <span>Su contraseña tiene que tener mayúsculas o minúsculas pero no espaccios en blanco</span>
                                            </div>
                                        </Col>
                                        <Col xl={12} sm={12} md={12} xs={12}>
                                            <span id="Texto-CambiarContraseña-Fila-Card-Cuerpo-Fondo-Dos-Perfil">* Contraseña Actual</span><br/>
                                            <Input.Password 
                                                onChange={(e) => this.obtenerInputAnteriorContrasenia(e)}
                                                style={{
                                                    width:'100%',
                                                    background: '#F0F2F5',
                                                }}
                                                type="password" autoComplete="off" id="Input-Fila-Card-Cuerpo-Fondo-Dos-Perfil" />
                                                <br/><br/>

                                            <span id="Texto-CambiarContraseña-Fila-Card-Cuerpo-Fondo-Dos-Perfil">* Nueva contraseña</span><br/>
                                            <Input.Password 
                                                style={
                                                    this.state.Input_Incorrecto_Contrasenia == true
                                                    ?{
                                                        width:'100%',
                                                        background: '#F0F2F5',
                                                        border: "1px solid red"
                                                    }
                                                    :{
                                                        width:'100%',
                                                        background: '#F0F2F5',
                                                    }
                                                }
                                                type="password"  
                                                autoComplete="off" 
                                                id="Input-Fila-Card-Cuerpo-Fondo-Dos-Perfil"
                                                onChange={(e) => this.obtenerInputNuevaContrasenia(e)}
                                            /><br/><br/>
                                            <span id="Texto-CambiarContraseña-Fila-Card-Cuerpo-Fondo-Dos-Perfil">* Confirmar nueva contraseña</span><br/>
                                            <Input.Password
                                                style={
                                                    this.state.Input_Incorrecto_Contrasenia == true
                                                    ?{
                                                        width:'100%',
                                                        background: '#F0F2F5',
                                                        border: "1px solid red"
                                                    }
                                                    :{
                                                        width:'100%',
                                                        background: '#F0F2F5',
                                                    }
                                                }
                                                type="password"
                                                autoComplete="off"
                                                id="Input-Fila-Card-Cuerpo-Fondo-Dos-Perfil"
                                                onChange={(e) => this.obtenerInputConfirmarNuevaContrasenia(e)}
                                            />
                                            {
                                                this.state.Input_Incorrecto_Contrasenia == true
                                                ?<span style={{color:'red'}}>Lo sentimos las contraseñas deben ser las mismas</span>
                                                :null
                                            }

                                            <Row style={{
                                                float: "right",
                                                marginTop :"20px"
                                            }}>
                                                <Col>
                                                    <Button 
                                                        onClick={() => this.ActivarCambioContrasenia()} 
                                                        id="Btn-Cancelar-Edicion-Perfil">
                                                        Cancelar
                                                    </Button>
                                                </Col>
                                                <Col>
                                                    <BtnGuardarContrasenia 
                                                        CargandoEditarContrasenia = {(e) => this.CargandoEditarContrasenia(e)}
                                                        cargandoGuardarContrasenia = {this.state.cargandoGuardarContrasenia}
                                                        txt_input_anteriorContrasenia = {this.state.txt_input_anteriorContrasenia}
                                                        txt_input_nuevaContrasenia = {this.state.txt_input_nuevaContrasenia}
                                                        ActivarCambioContrasenia = {() => this.ActivarCambioContrasenia()}
                                                    />
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col xl={2} sm={2} md={2} xs={2}>
                                            <img 
                                                width={"29px"} 
                                                height={"29px"} 
                                                src={iconoCerrar}  
                                                onClick={() => this.ActivarCambioContrasenia()} 
                                                style={{marginRight:'10px'}} 
                                                id="Icono-Cerrar-Editar-Perfil" />
                                        </Col>
                                    </Row>
                                    :<Row id="Fila-Card-Cuerpo-Fondo-Dos-Perfil">
                                        <Col xl={10} sm={10} md={10} xs={10} id="Texto-Izq-Fila-Card-Cuerpo-Fondo-Dos-Perfil">
                                            <img width={"29px"} height={"29px"} src={iconoContrasenia} style={{marginRight:'10px'}} />Contraseña
                                        </Col>
                                        <Col xl={12} sm={12} md={12} xs={12}>
                                            <span id="Texto-CambiarContraseña-Fila-Card-Cuerpo-Fondo-Dos-Perfil" onClick={() => this.ActivarCambioContrasenia()}>Cambiar contraseña</span>
                                        </Col>
                                        <Col xl={2} sm={2} md={2} xs={2}>
                                            <img width={"29px"} height={"29px"} src={iconoEditar}  onClick={() => this.ActivarCambioContrasenia()} style={{marginRight:'10px'}} id="Icono-Editar-Perfil" />
                                        </Col>
                                    </Row>
                                }
                                
                                <Row id="Fila-Card-Cuerpo-Fondo-Dos-Perfil">
                                    <Col xl={10} sm={10} md={10} xs={10} id="Texto-Izq-Fila-Card-Cuerpo-Fondo-Dos-Perfil">
                                        <img width={"29px"} height={"29px"} src={iconoCumpleanios} style={{marginRight:'10px'}} />Cumpleaños
                                    </Col>
                                    <Col xl={12} sm={12} md={12} xs={12} id="Texto-Dercha-Fila-Card-Cuerpo-Fondo-Dos-Perfil">
                                        {
                                            this.state.cambiandoCumpleanios == true
                                            ?<Input 
                                                style={{
                                                    width:'100%',
                                                    background: '#F0F2F5'
                                                }}
                                                placeholder="Día/Mes/Año"
                                                autoComplete="off" id="Input-Texto-Fila-Card-Cuerpo-Fondo-Dos-Perfil" 
                                                onChange={(e) => this.setState({
                                                    txt_input_cumpleanios : e.target.value
                                                })}
                                                
                                            />
                                            :this.props.datosUsuarioLogeado.usucumpleanios == 'none'
                                                ?"Día/Mes/Año"
                                                :this.props.datosUsuarioLogeado.usucumpleanios
                                        }

                                        {
                                            this.state.cambiandoCumpleanios == true
                                            ?<Row style={{
                                                float: "right",
                                                marginTop :"20px"
                                            }}>
                                                <Col>
                                                    <Button 
                                                        onClick={() => this.ActivarCambioCumpleanios()}
                                                        id="Btn-Cancelar-Edicion-Perfil">
                                                        Cancelar
                                                    </Button>
                                                </Col>
                                                <Col>
                                                    <BtnGuardarCumpleanios 
                                                        CargandoEditarCumpleanios = {(e) => this.CargandoEditarCumpleanios(e)}
                                                        cargandoGuardarCumpleanios = {this.state.cargandoGuardarCumpleanios}
                                                        txt_input_cumpleanios = {this.state.txt_input_cumpleanios}
                                                        ActivarCambioCumpleanios = {() => this.ActivarCambioCumpleanios()}
                                                    />
                                                </Col>
                                            </Row>
                                            :null
                                        }
                                        
                                    </Col>
                                    <Col xl={2} sm={2} md={2} xs={2} onClick={() => this.ActivarCambioCumpleanios()}> 
                                        {
                                            this.state.cambiandoCumpleanios == true
                                            // ?<img width={"29px"} height={"29px"} src={iconoCerrar} style={{marginRight:'10px'}} id="Icono-Editar-Perfil" />
                                            ?null
                                            :<img width={"29px"} height={"29px"} src={iconoEditar} style={{marginRight:'10px'}} id="Icono-Editar-Perfil" />
                                        }
                                    </Col>
                                </Row>
                                <Row id="Fila-Card-Cuerpo-Fondo-Dos-Perfil-Ultimo">
                                    <Col xl={10} sm={10} md={10} xs={10} id="Texto-Izq-Fila-Card-Cuerpo-Fondo-Dos-Perfil">
                                        <img width={"29px"} height={"29px"} src={iconoTelfono} style={{marginRight:'10px'}} />Teléfono
                                    </Col>
                                    <Col xl={12} sm={12} md={12} xs={12} id="Texto-Dercha-Fila-Card-Cuerpo-Fondo-Dos-Perfil">
                                        {
                                            this.state.cambiandoTelefono == true
                                            ?<div 
                                                style={{
                                                    display:'flex'
                                                }}
                                            >
                                                <PhoneInput
                                                    international
                                                    placeholder="Enter phone number"
                                                    // value={value}
                                                    defaultCountry="CL"
                                                    onChange={(e) => this.setState({
                                                        txt_input_paistelefono : e
                                                    })}
                                                    id="Input-PhoneInputInput-Perfil"
                                                />
                                                <Input 
                                                    style={{
                                                        width:'100%',
                                                        background: '#F0F2F5'
                                                    }}
                                                    type="number" 
                                                    autoComplete={"off"} 
                                                    onChange={(e) => this.setState({
                                                        txt_input_telefono : e.target.value
                                                    })}
                                                    id="Input-Texto-Fila-Card-Cuerpo-Fondo-Dos-Perfil" />
                                            </div>
                                            :this.props.datosUsuarioLogeado.usutelefono == 'none'
                                                ?"999-999-999"
                                                :this.props.datosUsuarioLogeado.usuextensiontelefono+" "+this.props.datosUsuarioLogeado.usutelefono
                                        }

                                        {
                                            this.state.cambiandoTelefono == true
                                            ?<Row style={{
                                                float: "right",
                                                marginTop :"20px"
                                            }}>
                                                <Col>
                                                    <Button 
                                                        onClick={() => this.ActivarCambioTelefono()}
                                                        id="Btn-Cancelar-Edicion-Perfil">
                                                        Cancelar
                                                    </Button>
                                                </Col>
                                                <Col>

                                                    <BtnGuardarTelefono 
                                                        CargandoEditarTelefono  = {(e) => this.CargandoEditarTelefono(e)}
                                                        cargandoGuardarTelefono = {this.state.cargandoGuardarTelefono}
                                                        txt_input_telefono      = {this.state.txt_input_telefono}
                                                        txt_input_paistelefono  = {this.state.txt_input_paistelefono}
                                                        ActivarCambioTelefono   = {() => this.state.ActivarCambioTelefono}
                                                    />
                                                </Col>
                                            </Row>
                                            :null
                                        }
                                    </Col>
                                    <Col xl={2} sm={2} md={2} xs={2} onClick={() => this.ActivarCambioTelefono()}>
                                        {
                                            this.state.cambiandoTelefono == true
                                            // ?<img width={"29px"} height={"29px"} src={iconoCerrar} style={{marginRight:'10px'}} id="Icono-Editar-Perfil" />
                                            ?null
                                            :<img width={"29px"} height={"29px"} src={iconoEditar} style={{marginRight:'10px'}} id="Icono-Editar-Perfil" />
                                        }
                                    </Col>
                                </Row>
                            </div>

                            {/* <div style={{display: "flex", placeContent: "center", marginTop:'20px', cursor:'pointer'}}>
                                <div id="Btn-Cuerpo-Fondo-Dos-Perfil">
                                    Listo
                                </div>
                            </div> */}

                        </div>
                    </div>
                </div>
                
                <input 
                type="file" 
                ref="subirArchivoInput" 
                style={{display: "none"}} onChange={(e) => this.handleChange(e)} />

                <ModalEditarImagen 
                    ocultarModal = {() => this.ocultarModal()}
                    handleChange = {this.handleChange}
                    file = {this.state.file}
                    modalVisible = {this.state.modalVisible}
                    seleccionarFile = {() => this.seleccionarFile()}
                    CargandoEditarImagen = {(e) => this.CargandoEditarImagen(e)}
                    cargandoGuardarImagen = {this.state.cargandoGuardarImagen}
                />

            </div>
        );
    }
}
  
export default Perfil;
  