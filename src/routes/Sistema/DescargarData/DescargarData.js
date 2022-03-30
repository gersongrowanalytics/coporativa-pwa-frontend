import React, {useState, useEffect} from 'react'
import {Row, Col, Modal, Input, Tooltip} from 'antd'
import IconoEstrellaGris from '../../../assets/images/iconos/Dashboard/favoritogris.png'
// import IconoEstrellaBlanco from 'assets/images/iconos/DescargarData/estrellablanco.png'
// import IconoRestart from 'assets/images/iconos/Dashboard/restart.png'
import IconoRestartAzul from '../../../assets/images/iconos/DescargarData/actualizarazul.png'
import IconoRestartGris from '../../../assets/images/iconos/DescargarData/actualizaragris.png'
// import IconoCirculo from 'assets/images/iconos/Dashboard/circulo.png'
// import IconoCirculoSeleccionado from 'assets/images/iconos/Dashboard/circuloseleccionado.png'
import iconoCerrarModal from '../../../assets/images/iconos/Perfil/cerrarModal.png';
import '../../../styles/Sistema/DescargarData/DescargarData.css'
// import SliderExcels from 'components/Sistema/DescargarData/SliderExcels'
import { Checkbox } from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {ObtenerDataReducer} from "../../../appRedux/actions/Administrador/ControlData/ControlData"
import {ObtenerDataSeleccionadaReducer} from "../../../appRedux/actions/DescargarData/DescargarData"
import { SearchOutlined } from '@ant-design/icons';
import SliderExcelv2 from '../../../components/Sistema/DescargarData/SliderExcelv2'

const DescargarData = () => {
    const [primerMostrarFavoritos, setPrimerMostrarFavoritos] = useState(false);
    const [mostrarMostrarFavoritos, setMostrarMostrarFavoritos] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [mostrarCredenciales, setMostrarCredenciales] = useState(false);

    const MostrarMostrarFavoritos = () => {
        setMostrarMostrarFavoritos(!mostrarMostrarFavoritos);
    };

    const showModal = () => {
        setIsModalVisible(!isModalVisible);
    };

    const dispatch = useDispatch();

    const { 
        dataArchivos
    } = useSelector(({controlData}) => controlData);

    const { 
        dataSeleccionada,
        archivosDescargar
    } = useSelector(({descargarData}) => descargarData);

    useEffect(() => {
        setTimeout(() => {
            setPrimerMostrarFavoritos(true)
        }, 2000);

        dispatch(ObtenerDataReducer())
    }, []);

    function downloadAll() {
        console.log('click descargar')
        console.log(archivosDescargar)
        var link = document.createElement('a');
      
        link.setAttribute('download', null);
        link.style.display = 'none';
      
        document.body.appendChild(link);
      
        for (var i = 0; i < archivosDescargar.length; i++) {
          link.setAttribute('href', archivosDescargar[i]);
          link.click();
        }
      
        document.body.removeChild(link);
    }

    const { paisSeleccionado } = useSelector(({auth}) => auth);

    return (
        <div id="Contenedor-Principal-Margen">
            <Row>
                <Col xl={5} lg={3} md={3} sm={24} xs={24}>


                    <div 
                        id="Titulo-Menu-Descargar-Data"
                        onClick={() => console.log(paisSeleccionado)}
                    >Data</div><br/>
                    <Checkbox 
                        // checked={archivo.descargarData}
                    >{"Seleccionar Todo"}</Checkbox><br/>
                    <div id="Contenedor-Menu-Descargar-Data">

                        <div id="Contenedor-Buscar-Menu-Descargar-Data">
                            <Input 
                                style={{
                                    background: "#F0F2F5"
                                }}
                                placeholder="Buscar"
                                id="Input-Buscar-Menu-Descargar-Data"
                                prefix={<SearchOutlined className="site-form-item-icon" />}
                            />
                        </div>
                        {
                            dataArchivos.map((archivo, posicion) => {
                                return ( 
                                    paisSeleccionado
                                    ?paisSeleccionado.paiid == archivo.paiid || paisSeleccionado.paiid == null
                                    ?mostrarMostrarFavoritos == false

                                    ?<div id="Fila-Menu-Descargar-Data">
                                        <Checkbox 
                                            checked={archivo.descargarData}
                                            onChange={() => dispatch(
                                                ObtenerDataSeleccionadaReducer(archivo, posicion))}>{archivo.nombreArchivo}</Checkbox>
                                    </div>
                                    :<div id="Fila-Menu-Descargar-Data">{archivo.nombreArchivo}</div>
                                    :null
                                    :null
                                )
                            })
                        }
                        {/* {
                            [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}].map(() => {
                                return (
                                    <div>otros</div>
                                )
                            })
                        } */}
                    </div>
                </Col>
                <Col xl={16} lg={17} md={16} sm={24} xs={24}>
                    {
                        dataArchivos.length > 0
                        ?dataSeleccionada.imagenes
                        ?<div style={{display: "flex", justifyContent: "center", textAlign: "-webkit-center"}}>
                            <div style={{ width:'100%'}}>
                                <div id="Titulo-Descargar-Data">{dataSeleccionada.nombreArchivo}</div><br/>

                                
                                {/* <SliderExcels
                                    imagenes = {dataSeleccionada.imagenes}
                                /> */}
                                <SliderExcelv2 
                                    imagenes = {dataSeleccionada.imagenes}
                                />

                                {/* <button onClick={() => console.log(dataArchivos)}>d</button> */}

                            </div>
                        </div>
                        :null
                        :null
                    }
                </Col>
                <Col xl={3} lg={4} md={5} sm={24} xs={24} style={{paddingTop:'10px'}}>
                    {/* <button onClick={() => console.log(dataSeleccionada)}>cli</button> */}
                    {
                        dataSeleccionada.archivo
                        ?<div style={{display:'flex', float: "right"}}>
                            <div id="Contenedor-Btn-Descargar-Descargar-Data">
                                <a 
                                    id="Texto-Btn-Descargar-Descargar-Data"
                                    href={dataSeleccionada.archivo} 
                                    download=""
                                    onClick={() => {
                                        if(dataSeleccionada.ardcredenciales == true){
                                            setMostrarCredenciales(true)
                                        }
                                    }}
                                >Descargar</a>
                                    
                            </div>

                            {/* <button onClick={() => console.log(dataSeleccionada.archivo)} >Ver</button> */}

                            <Tooltip placement="bottom" title={"Actualizar"}>
                                <img src={IconoRestartAzul} id="Icono-Restart-Descargar-Data" />
                            </Tooltip>

                            {/* <div onClick={() => downloadAll()}>click</div> */}
                        </div>
                        :<div style={{display:'flex', float: "right"}}>
                            <div id="Contenedor-Btn-Desactivado-Descargar-Descargar-Data">
                                <a 
                                    id="Texto-Btn-Descargar-Descargar-Data"
                                    // href={dataSeleccionada.archivo} 
                                    // download=""
                                >Descargar</a>
                            </div>

                            <Tooltip placement="bottom" title={"Actualizar"}>
                                <img src={IconoRestartGris} id="Icono-Restart-Desactivado-Descargar-Data" />
                            </Tooltip>
                        </div>
                    }

                </Col>
            </Row>

            <Modal
                title={null}
                footer={null}
                centered
                visible={mostrarCredenciales}
                closeIcon={<img onClick={() => setMostrarCredenciales(false)} src={iconoCerrarModal} />}
                onCancel={() => setMostrarCredenciales(false)}
                width={"550px"}
            >

                <div
                    style={{
                        display: "flex",
                        textAlign: "-webkit-center"
                    }}
                >

                    <div id="Cuerpo-Modal-Info-Usuario-Descargar-Data" >

                        <div
                            className="Letra-Azul-Modal-Info-Usuario-Descargar-Data" 
                            style={{marginBottom:'10px'}}>Hola, {localStorage.getItem('pernombrecompleto')}</div>

                        {/* <div
                            className="Letra-Modal-Info-Usuario-Descargar-Data"  
                            style={{marginBottom:'15px'}}>Para una mejor visualización de la Pivot Online, debes ingresar con el siguiente usuario y contraseña:</div> */}
                        <div
                            className="Letra-Modal-Info-Usuario-Descargar-Data"  
                            style={{marginBottom:'15px'}}>Por politicas de seguridad para visualizar esta pivot online debes ingresar con el siguiente usuario y contraseña:</div>

                        {
                            dataSeleccionada
                            ?dataSeleccionada.adus
                            ?dataSeleccionada.adus.map((adu, posicionAdu) => {
                                return(
                                    posicionAdu == 0
                                    ?<>
                                        <div className="Letra-Modal-Info-Usuario-Descargar-Data">Usuario</div>

                                        <div className="Letra-Azul-Modal-Info-Usuario-Descargar-Data" style={{marginBottom:'10px'}}>{adu.aduusuario}</div>

                                        <div className="Letra-Modal-Info-Usuario-Descargar-Data">Contraseña</div>

                                        <div className="Letra-Azul-Modal-Info-Usuario-Descargar-Data" style={{marginBottom:'10px'}}>{adu.aducontrasenia}</div>
                                    </>
                                    :null
                                )
                            })
                            :null
                            :null
                        }

                        <div
                            className="Letra-Modal-Info-Usuario-Descargar-Data"  
                            // style={{marginBottom:'10px'}}>Les reiteramos nuestro apoyo en este proceso, y recordamos que ante cualquier consulta o requerimiento, durante esta etapa, podrá ser canalizado al correo <a href="mailto:m.soporte@grow-analytics.com.pe">soporte@grow-analytics.com.pe</a></div>
                            style={{marginBottom:'10px'}}>Ante cualquier apoyo y/o consulta, durante esta etapa, podra ser canalizado al correo <a href="mailto:m.soporte@grow-analytics.com.pe">soporte@grow-analytics.com.pe</a></div>

                        <div className="Letra-Modal-Info-Usuario-Descargar-Data" >¡Que tengan un excelente día!  </div>

                        <div className="Letra-Modal-Info-Usuario-Descargar-Data" >Saludos,</div>

                        {/* <div>Atte. Customer Services Prime</div> */}

                    </div>
                </div>

            </Modal>

            <Modal 
                title={null} 
                // visible={true} 
                visible={isModalVisible} 
                footer={null}
                centered
                closeIcon={<img onClick={showModal} src={iconoCerrarModal} 
                id="" />}
            >
                <div style={{textAlignLast: "center", textAlign: "-webkit-center"}}>
                    <div><img width={"15px"} src={IconoEstrellaGris} /></div>
                    <div id="Titulo-Modal-Favoritos-Dashboard">
                        Esta opción creará un nuevo favorito
                    </div>
                    <Input placeholder="Crea un nombre" style={{width: "200px"}} />
                    <div onClick={showModal} id="Btn-Guardar-Modal-Favoritos-Dashboard">Guardar</div>
                </div>
            </Modal>
        </div>
    )
}





export default DescargarData
