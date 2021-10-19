import React from 'react'
import {Row, Col, Modal, Input} from 'antd'
import iconoCerrarModal from '../../assets/images/iconos/Perfil/cerrarModal.png'
import IconoEstrellaGris from '../../assets/images/iconos/Dashboard/favoritogris.png'
import EstrellaFavorito from './EstrellaFavorito'
import AgregarFavorito from './AgregarFavorito'
import SeleccionarFavoritos from './SeleccionarFavoritos'
import NombreModuloSelecTopBar from './NombreModuloSelecTopBar'

class FiltrosTopbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mostrarFiltros : false,
            mostrarFiltroSegunda: false,

            numeroSeleccion : 0,

            nombreMenuSeleccionado : "TRADE MARKETING",

            modalCrearFavorito : false
        }
        this.mostrarModalFavoritos = this.mostrarModalFavoritos.bind(this)
    }

    mostrarModalFavoritos(){
        this.setState({
            modalCrearFavorito : !this.state.modalCrearFavorito
        })
    }

    render() {
        return (
            <div>
                <div 
                    id="Contenedor-Filtros-TopBar"
                >
                    <Row style={{height: "100%"}}>
                        <Col xl={8} md={10} sm={8} style={{height: "100%"}} 
                            onMouseEnter={
                                () => this.setState({mostrarFiltros : true, numeroSeleccion : 1})
                            }
                            onMouseLeave={
                                () => this.setState({mostrarFiltros : false})
                            }
                        >
                            <NombreModuloSelecTopBar 
                                seleccionoFavoritos = {this.props.seleccionoFavoritos}
                                moduloSeleccionado = {this.props.moduloSeleccionado}
                            />
                        </Col>      

                        {/*  */}

                        <Col 
                            xl={8} md={10} sm={8}
                            onMouseEnter={
                                () => this.setState({mostrarFiltros : true, numeroSeleccion : 2})
                            }
                            onMouseLeave={
                                () => this.setState({mostrarFiltros : false})
                            }
                            id="Contenedor-Favoritos-TopBar-Dashboard"
                            style={{
                                display: "flex",
                                placeContent: "center"
                            }}
                        >
                            {
                                this.props.seleccionoFavoritos == true
                                ?<div id="Contenedor-Favoritos-TopBar-Dashboard-TopBar"></div>
                                :null
                            }
                            
                            <div 
                                id={
                                    this.props.seleccionoFavoritos == true
                                    ?"Contenedor-Filtro-Seleccionado-TopBar"
                                    :"Contenedor-Filtro-TopBar"
                                }
                                style={
                                    this.state.mostrarFiltros == true && this.state.numeroSeleccion == 2
                                    ?{
                                        // background: "#1876F2",
                                        // color: "#FFFFFF"
                                    }
                                    :{}
                                }
                                className={
                                    this.props.idFavoritosubmoduloSeleccionado > 0 || this.props.agregarFavorito == true
                                    ?"Favoritos-Contenedor-Filtro-TopBar"
                                    :"Favoritos-Hover-Contenedor-Filtro-TopBar"
                                }
                            >
                                <EstrellaFavorito 

                                />
                                
                                FAVORITOS
                                <SeleccionarFavoritos 
                                
                                />
                            </div>
                            {
                                this.props.agregarFavorito == true
                                ?<AgregarFavorito 
                                    idsubmoduloSeleccionado = {this.props.idsubmoduloSeleccionado}
                                    nombremoduloSeleccionado = {this.props.nombremoduloSeleccionado}
                                    moduloSeleccionado = {this.props.moduloSeleccionado}
                                />
                                :null
                            }
                        </Col>

                        {/*  */}

                        <Col xl={8} md={0} sm={0} style={{height: "100%"}} 
                        >
                            
                        </Col>
                    </Row>  
                </div>

                {/* {
                    this.state.mostrarFiltros == true
                    ?<>
                        <div id="Contenedor-Fondo-Filtro-TopBar" 
                            
                        >
                            <Row style={{paddingTop: '30px'}}>
                                {
                                    this.props.moduloSeleccionado.smos.map((submodulo) => {
                                        return(
                                            <Col xl={6}>
                                                <div style={{opacity:0}} id="Texto-SubCategoria-Filtro-TopBar">
                                                    {submodulo.smonombre}
                                                </div>
                                            </Col>
                                        )
                                    })
                                }
                            </Row>
                        </div>
                        <div 
                            id="Contenedor-Data-Filtro-TopBar"
                            onMouseEnter={() => this.setState({mostrarFiltros : true})}
                            onMouseLeave={() => this.setState({mostrarFiltros : false})}
                        >
                            <Row style={{paddingTop: '30px'}}>
                                {
                                    this.props.moduloSeleccionado.smos.map((submodulo) => {
                                        return(
                                            <Col xl={6}>
                                                {
                                                    this.state.numeroSeleccion == 1
                                                    ?<Link 
                                                        to={submodulo.smoruta} 
                                                        onClick={() => this.setState({nombreMenuSeleccionado: submodulo.smonombre})} 
                                                    >
                                                        <div id="Texto-SubCategoria-Filtro-TopBar">
                                                            <span id="Texto-SubCategoria-Filtro-Guion-TopBar">{submodulo.smonombre}</span>
                                                        </div>
                                                    </Link>
                                                    :this.state.numeroSeleccion == 2
                                                        ?<div>
                                                            <div id="Texto-SubCategoria-Filtro-TopBar">
                                                                <img 
                                                                    onClick={() => this.mostrarModalFavoritos()}
                                                                    src={IconoFavoritoHueco} 
                                                                    id="Icono-Favoritos-Hueco-TopBar" 
                                                                />
                                                                {submodulo.smonombre}
                                                            </div>
                                                        </div>
                                                        :null
                                                }
                                            </Col>
                                        )
                                    })
                                }
                            </Row>
                        </div>
                    </>
                    :null
                } */}
                
                <Modal 
                    title={null} 
                    // visible={true} 
                    visible={this.state.modalCrearFavorito} 
                    footer={null}
                    centered
                    closeIcon={
                        <img onClick={this.mostrarModalFavoritos}
                            src={iconoCerrarModal}
                            id="" />
                    }
                >
                    <div style={{textAlignLast: "center", textAlign: "-webkit-center"}}>
                        <div><img width={"15px"} src={IconoEstrellaGris} /></div>
                        <div id="Titulo-Modal-Favoritos-Dashboard">
                            Esta opción creará un nuevo favorito
                        </div>
                        <Input placeholder="Crea un nombre" style={{width: "200px"}} />
                        <div onClick={this.mostrarModalFavoritos} id="Btn-Guardar-Modal-Favoritos-Dashboard">Guardar</div>
                    </div>
                </Modal>

            </div>
        )
    }
}

export default FiltrosTopbar;