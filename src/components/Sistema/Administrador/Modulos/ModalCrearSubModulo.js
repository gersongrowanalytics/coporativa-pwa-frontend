import React from 'react'
import iconoCerrarModal from '../../../../assets/images/iconos/Perfil/cerrarModal.png';
import {Row, Col, Modal, Button} from 'antd'
import {useDispatch, useSelector} from "react-redux";
import {CrearSubModuloReducer} from '../../../../appRedux/actions/Administrador/Modulos/Modulos'

const ModalCrearSubModulo = (props) => {

    const dispatch = useDispatch();

    const { 
        cargandoNuevoSubModulo
    } = useSelector(({admModulos}) => admModulos);

    const crearSubModulo = async () => {
        
        let data = {
            "modid"      : props.crearSubModuloIdSele,
            "smonombre"  : props.crearSubModuloNombre,
            "smopowerbi" : props.crearSubModuloLinkPo,
            "smoruta"    : props.crearSubModuloRutaSu,
            "pemslug"    : props.crearSubModuloSlugPe,
            "pemdescripcion" : props.crearSubModuloDescri,
        }

        await dispatch(CrearSubModuloReducer(data))
        await props.abrirModalCrear()
    }

    return (
        <Modal 
            closeIcon={<img onClick={() => props.abrirModalCrear()} src={iconoCerrarModal} id="" />}
            title={null} 
            visible={props.mostrarModal} 
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
                            <input 
                                name="crearSubModuloNombre"
                                onChange={(e) => props.obtenerCambioInput(e)}
                                value={props.crearSubModuloNombre}
                                autoComplete={"off"}
                                id="Input-Crear-Permiso-Administrador" 
                            />

                            <div id="Texto-Crear-Permiso-Administrador">Ruta del Sub módulo</div>
                            <input 
                                name="crearSubModuloRutaSu"
                                onChange={(e) => props.obtenerCambioInput(e)}
                                value={props.crearSubModuloRutaSu}
                                autoComplete={"off"}
                                id="Input-Crear-Permiso-Administrador" 
                            />
                        </div>
                    </Col>

                    <Col xl={12} md={12} sm={12} xs={12} id="SegundaFila-Modal-Crear-Usuario-Administrador">

                        <div>

                            <div id="Texto-Crear-Permiso-Administrador">Link de Power BI</div>
                            <input 
                                name="crearSubModuloLinkPo"
                                onChange={(e) => props.obtenerCambioInput(e)}
                                value={props.crearSubModuloLinkPo}
                                autoComplete={"off"}
                                id="Input-Crear-Permiso-Administrador" 
                            />

                            <div id="Texto-Crear-Permiso-Administrador">Slug del permiso</div>
                            <input 
                                name="crearSubModuloSlugPe"
                                onChange={(e) => props.obtenerCambioInput(e)}
                                value={props.crearSubModuloSlugPe}
                                autoComplete={"off"}
                                id="Input-Crear-Permiso-Administrador" 
                            />
                        </div>
                    </Col>
                    <Col xl={24} md={24} sm={24} xs={24} style={{paddingRight:'30px'}}>
                        <div id="Texto-Crear-Permiso-Administrador">Descripción del permiso</div>
                        <input 
                            style={{ width: "100%"}}
                            name="crearSubModuloDescri"
                            onChange={(e) => props.obtenerCambioInput(e)}
                            value={props.crearSubModuloDescri}
                            autoComplete={"off"}
                            id="Input-Crear-Permiso-Administrador" 
                        />
                    </Col>
                    <Col xl={24} md={24} sm={24} xs={24}>
                        <div style={{textAlign: "-webkit-center"}}>
                            <Button
                                onClick={crearSubModulo}
                                loading={cargandoNuevoSubModulo}
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

export default ModalCrearSubModulo
