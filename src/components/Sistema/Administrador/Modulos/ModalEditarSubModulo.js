import React, {useEffect, useState} from 'react'
import iconoCerrarModal from '../../../../assets/images/iconos/Perfil/cerrarModal.png';
import {Row, Col, Modal, Button, Input} from 'antd'
import {useDispatch, useSelector} from "react-redux";
import {EditarSubModuloReducer} from '../../../../appRedux/actions/Administrador/Modulos/Modulos'

const ModalEditarSubModulo = (props) => {

    const dispatch = useDispatch();

    const [submodulo, setSubModulo] = useState({});

    const { 
        cargandoNuevoSubModulo
    } = useSelector(({admModulos}) => admModulos);

    const crearSubModulo = async () => {

        await dispatch(EditarSubModuloReducer(submodulo))
        await props.setModalEditarSubModulo(false)
    }


    const CambiarDatosSubModuloSeleccionado = (valorInput, e) => {

        let submodulonuevo = {...submodulo}

        submodulonuevo[valorInput] = e.target.value

        setSubModulo(submodulonuevo)
    }

    useEffect(() => {

        setSubModulo(props.submoduloSeleccionadoEditar)

    }, [props.submoduloSeleccionadoEditar])

    return (
        <Modal 
            closeIcon={<img onClick={() => props.setModalEditarSubModulo(false)} src={iconoCerrarModal} id="" />}
            title={null} 
            visible={props.modalEditarSubModulo} 
            footer={null} 
            centered
            width={"800px"}
        >
            
            <div id="Contenedor-Modal-Crear-Usuario-Administrador">
                <Row>
                    <Col xl={12} md={12} sm={12} xs={12} id="PrimeraFila-Modal-Crear-Usuario-Administrador">
                        <div>
                            <div
                                id="Texto-Crear-Permiso-Administrador">Nombre de Sub módulo</div>
                            <Input 
                                name         = "crearSubModuloNombre"
                                onChange     = {(e) => CambiarDatosSubModuloSeleccionado("smonombre", e)}
                                value        = {submodulo.smonombre}
                                autoComplete = {"off"}
                                id           = "Input-Crear-Permiso-Administrador" 
                            />

                            <div id="Texto-Crear-Permiso-Administrador">Ruta del Sub módulo</div>
                            <Input 
                                name="crearSubModuloRutaSu"
                                onChange     = {(e) => CambiarDatosSubModuloSeleccionado("smoruta", e)}
                                value        = {submodulo.smoruta}
                                autoComplete={"off"}
                                id="Input-Crear-Permiso-Administrador" 
                            />
                        </div>
                    </Col>

                    <Col xl={12} md={12} sm={12} xs={12} id="SegundaFila-Modal-Crear-Usuario-Administrador">

                        <div>

                            <div id="Texto-Crear-Permiso-Administrador">Link de Power BI</div>
                            <Input 
                                name="crearSubModuloLinkPo"
                                onChange     = {(e) => CambiarDatosSubModuloSeleccionado("smopowerbi", e)}
                                value        = {submodulo.smopowerbi}
                                autoComplete={"off"}
                                id="Input-Crear-Permiso-Administrador" 
                            />

                            <div id="Texto-Crear-Permiso-Administrador">Slug del permiso</div>
                            <Input 
                                name="crearSubModuloSlugPe"
                                onChange={(e) => props.obtenerCambioInput(e)}
                                value        = {submodulo.pemslug}
                                autoComplete={"off"}
                                id="Input-Crear-Permiso-Administrador"
                                disabled={true} 
                            />
                        </div>
                    </Col>
                    <Col xl={24} md={24} sm={24} xs={24} style={{paddingRight:'30px'}}>
                        <div id="Texto-Crear-Permiso-Administrador">Descripción del permiso</div>
                        <Input 
                            style={{ width: "100%"}}
                            name="crearSubModuloDescri"
                            onChange={(e) => props.obtenerCambioInput(e)}
                            value        = {submodulo.pemnombre}
                            autoComplete={"off"}
                            id="Input-Crear-Permiso-Administrador" 
                            disabled={true}
                        />
                    </Col>
                    <Col xl={24} md={24} sm={24} xs={24}>
                        <div style={{textAlign: "-webkit-center"}}>
                            <Button
                                onClick={crearSubModulo}
                                loading={cargandoNuevoSubModulo}
                                id="Contenedor-Btn-Crear-Permiso-Administrador">
                                    <div id="Texto-Btn-Crear-Permiso-Administrador">Editar</div>
                            </Button>
                        </div>
                    </Col>
                </Row>
                
            </div>

        </Modal>
    )
}

export default ModalEditarSubModulo
