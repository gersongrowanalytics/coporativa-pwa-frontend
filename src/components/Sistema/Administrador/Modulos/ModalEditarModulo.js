import React, {useEffect, useState} from 'react'
import {
    Row, 
    Col, 
    Modal, 
    Button,
    Select,
    Form,
    Input
} from 'antd'
import iconoCerrarModal from '../../../../assets/images/iconos/Perfil/cerrarModal.png';
// import IconoImagenAzul from 'assets/images/iconos/Administrador/imagenazul.png';
import {EditarModuloReducer} from "../../../../appRedux/actions/Administrador/Modulos/Modulos"
import {useDispatch, useSelector} from "react-redux";

const ModalEditarModulo = (props) => {

    const dispatch = useDispatch();

    const [paiidSeleccionado, setPaiidSeleccionado] = useState("0");

    const [modulo, setModulo] = useState({});

    const { 
        cargandoNuevoModulo
    } = useSelector(({admModulos}) => admModulos);

    const {listaPaises} = useSelector(({auth}) => auth);

    const editarModulo = async () => {

        // console.log(modulo)
        // console.log(props.editarIcono)
        // console.log(props.editarIconoSeleccionado)

        const formData = new FormData();
        formData.append('paiid', modulo.paiid)
        formData.append('modid', modulo.modid)
        formData.append('modnombre', modulo.nombreModulo)
        formData.append('powerbiModulo', modulo.powerbiModulo)
        formData.append('modruta', modulo.modruta)

        formData.append('modicono', props.editarIcono)
        formData.append('editandoIcono', props.editandoIcono)
        formData.append('modiconoseleccionado', props.editarIconoSeleccionado)
        formData.append('editandoIconoSeleccionado', props.editandoIconoSeleccionado)
 

        await dispatch(EditarModuloReducer(formData))
        props.setModalEditarModulo(false)
        // props.limpiarCamposCrear()
    }

    const CambiarDatosModuloSeleccionado = (valorInput, e) => {

        let modulonuevo = {...modulo}

        if(valorInput == "pais"){
            modulonuevo.paiid = e
        }else{
            modulonuevo[valorInput] = e.target.value
        }

        setModulo(modulonuevo)
    }

    useEffect(() => {
        setModulo(props.moduloSeleccionadoEditar)
    }, [props.moduloSeleccionadoEditar])

    return (
        <Modal 
            closeIcon={<img onClick={() => props.setModalEditarModulo(false)} src={iconoCerrarModal} 
            id="" />}
            title={null} 
            visible={props.modalEditarModulo} 
            // visible={true} 
            footer={null} 
            centered
            width={"800px"}
        >
            
            <div id="Contenedor-Modal-Crear-Usuario-Administrador">
                <Row>
                    <Col xl={12} md={12} sm={12} xs={12} id="PrimeraFila-Modal-Crear-Usuario-Administrador">
                        <div>
                            <Row style={{height:'100px',}}>
                                <Col xl={8} style={{paddingRight:'5px',}}>
                                    <div id="Texto-Crear-Permiso-Administrador">Icono B/N</div>
                                    {
                                        <div id="Contenedor-Imagenes-Crear-ControlData" onClick={props.seleccionarEditarIcono} >
                                            <img src={
                                                props.editarIcono == null
                                                ?modulo.icono
                                                :props.editarIcono
                                            } />
                                        </div>
                                    } 
                                </Col>

                                <Col xl={8} style={{paddingLeft:'5px', paddingRight:'5px'}}>
                                    <div id="Texto-Crear-Permiso-Administrador">Icono Color</div>

                                    <div id="Contenedor-Imagenes-Crear-ControlData" onClick={props.seleccionarEditarIconoSeleccionado} >
                                        <img src={
                                            props.editarIconoSeleccionado == null
                                            ?modulo.iconoSeleccionado
                                            :props.editarIconoSeleccionado
                                        } />
                                    </div>
                                </Col>
                            </Row>

                            <div
                                id="Texto-Crear-Permiso-Administrador">Nombre de Mensu</div>
                            <Input 
                                name="crearNombreMenu"
                                // onChange={(e) => props.obtenerCambioInput(e)}
                                onChange={(e) => CambiarDatosModuloSeleccionado("nombreModulo", e)}
                                value={modulo.nombreModulo}
                                autoComplete={"off"}
                                id="Input-Crear-Permiso-Administrador" 
                            />

                            <div id="Texto-Crear-Permiso-Administrador">Ruta del módulo</div>
                            <Input 
                                name="crearRutaModulo"
                                onChange={(e) => CambiarDatosModuloSeleccionado("modruta", e)}
                                value={modulo.modruta}
                                autoComplete={"off"}
                                id="Input-Crear-Permiso-Administrador" 
                            />
                        </div>
                    </Col>

                    <Col xl={12} md={12} sm={12} xs={12} id="SegundaFila-Modal-Crear-Usuario-Administrador">

                        <div>
                            <Row style={{height:'100px',}}>
                                <Col xl={24} style={{paddingLeft:'5px', paddingRight:'5px'}}>
                                    <div id="Texto-Crear-Usuario-Administrador">País</div>
                                    <Form.Item label="" name="paiid">
                                        <Select 
                                            id           = "Input-Crear-Usuario-Administrador" 
                                            style        = {{ width: "328px", height: "41px"}} 
                                            onChange     = {(e) => CambiarDatosModuloSeleccionado("pais", e)}
                                            defaultValue = {props.moduloSeleccionadoEditar.paiid}
                                        >
                                            {
                                                listaPaises.map((pais) => {
                                                    return ( 
                                                        <Select.Option value={pais.paiid}>{pais.painombre}</Select.Option>
                                                    )
                                                })
                                            }
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>

                            <div id="Texto-Crear-Permiso-Administrador">Link de Power BI</div>
                            <Input 
                                name         = "crearLinkPowerBi"
                                onChange     = {(e) => CambiarDatosModuloSeleccionado("powerbiModulo", e)}
                                value        = {modulo.powerbiModulo}
                                autoComplete = {"off"}
                                id           = "Input-Crear-Permiso-Administrador" 
                            />

                            <div id="Texto-Crear-Permiso-Administrador">Slug del permiso</div>
                            <Input 
                                name         = "crearSlugPermisoModulo"
                                onChange     = {(e) => CambiarDatosModuloSeleccionado("permisoslug", e)}
                                value        = {modulo.permisoslug}
                                autoComplete = {"off"}
                                id           = "Input-Crear-Permiso-Administrador" 
                                disabled     = {true}
                            />
                        </div>
                    </Col>
                    <Col xl={24} md={24} sm={24} xs={24}>
                        <div id="Texto-Crear-Permiso-Administrador">Descripción del permiso</div>
                        <Input 
                            style        = {{ width: "100%"}}
                            name         = "crearDescripcionPermisoModulo"
                            onChange     = {(e) => CambiarDatosModuloSeleccionado("permisodesc", e)}
                            value        = {modulo.permisodesc}
                            autoComplete = {"off"}
                            id           = "Input-Crear-Permiso-Administrador" 
                            disabled     = {true}
                        />
                    </Col>
                    <Col xl={24} md={24} sm={24} xs={24}>
                        <div style={{textAlign: "-webkit-center"}}>
                            <Button
                                onClick={editarModulo}
                                loading={cargandoNuevoModulo}
                                id="Contenedor-Btn-Crear-Permiso-Administrador">
                                    <div id="Texto-Btn-Crear-Permiso-Administrador">Crear</div>
                            </Button>
                        </div>
                    </Col>
                </Row>
                
            </div>

        </Modal>
    )
}

// export default ModalEditarModulo

class EditarModulos extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            editarIcono             : null,
            editarIconoSeleccionado : null,

            editandoIcono : false,
            editandoIconoSeleccionado : false
        }
        this.seleccionarEditarIcono = this.seleccionarEditarIcono.bind(this)
        this.seleccionarEditarIconoSeleccionado = this.seleccionarEditarIconoSeleccionado.bind(this)
        this.obtenerCambioInput = this.obtenerCambioInput.bind(this)
    }

    seleccionarEditarIcono(){
        this.refs.obtenerEditarIcono.click();
    }

    seleccionarEditarIconoSeleccionado(){
        this.refs.obtenerEditarIconoSeleccionado.click();
    }

    obtenerCambioInput(e){
        if(e.target.name == "editarIcono" || e.target.name == "editarIconoSeleccionado"){

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

        }

        if(e.target.name == "editarIcono"){
            this.setState({
                editandoIcono : true
            })
        }else if(e.target.name == "editarIconoSeleccionado"){
            this.setState({
                editandoIconoSeleccionado : true
            })
        }
    }


    render() {
        return (
            <div>
                
                <input 
                    type="file" 
                    name="editarIcono"
                    ref="obtenerEditarIcono" 
                    style={{display: "none"}} 
                    onChange={this.obtenerCambioInput} 
                />
                <input 
                    name="editarIconoSeleccionado"
                    type="file" 
                    ref="obtenerEditarIconoSeleccionado" 
                    style={{display: "none"}} 
                    onChange={this.obtenerCambioInput} 
                />

                <ModalEditarModulo
                    modalEditarModulo    = {this.props.modalEditarModulo}
                    setModalEditarModulo = {this.props.setModalEditarModulo}
                    moduloSeleccionadoEditar = {this.props.moduloSeleccionadoEditar}
                    SeleccionarModuloEditar  = {this.props.SeleccionarModuloEditar}

                    editarIcono = {this.state.editarIcono}
                    editarIconoSeleccionado = {this.state.editarIconoSeleccionado}

                    seleccionarEditarIcono = {this.seleccionarEditarIcono}
                    seleccionarEditarIconoSeleccionado = {this.seleccionarEditarIconoSeleccionado}

                    editandoIcono = {this.state.editandoIcono}
                    editandoIconoSeleccionado = {this.state.editandoIconoSeleccionado}
                />
            </div>
        );
    }
}

export default EditarModulos;
  