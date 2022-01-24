import React, {useState, useEffect, useRef} from 'react'
import {Row, Col, Select, Spin, Modal, Button} from 'antd'
import iconoCerrarModal from '../../../../assets/images/iconos/Perfil/cerrarModal.png';
import IconoImagenAzul from '../../../../assets/images/iconos/Administrador/imagenazul.png';
import {useDispatch, useSelector} from "react-redux";

const ModalEditarData = (props) => {

    // let inputImagen = useRef(null)
    let inputImagen;
    let inputArchivo;

    useEffect(() => {
        setPaiidSeleccionado(props.paiid)
        setDatosEditarData(props.datos)
        console.log('set data')
    }, [])

    const [paiidSeleccionado, setPaiidSeleccionado] = useState("0");
    const [datosEditarData, setDatosEditarData] = useState({});
    const [nombreEditarImagen, setNombreEditarImagen] = useState("");
    const [nuevoArchivo, setNuevoArchivo] = useState(null);
    const [nombreArchivoNuevo, setNombreArchivoNuevo] = useState(null);

    const {listaPaises} = useSelector(({auth}) => auth);

    function clickObtenerImagen(numeroImagen) {
        setNombreEditarImagen(numeroImagen)
        inputImagen.click()
    }

    function clickObtenerNuevoArchivo() {
        inputArchivo.click()
    }

    function SeleccionarImagenEditar(e) {
        console.log(nombreEditarImagen)
        var file = e.target.files[0];
        var fileData = new FileReader();
        var nombreInput = e.target.name
        if(file){
            fileData.readAsDataURL(file);
        }
        
        fileData.onload = (e) => {
            props.EditarImagenData(nombreEditarImagen, fileData.result)
            console.log(fileData.result)
        }
    }

    function seleccionarNuevoArchivo(e) {

        e.stopPropagation();
        e.preventDefault();
        setNuevoArchivo(e.target.files[0])
        setNombreArchivoNuevo(e.target.files[0]['name'])
    }

    const editarDataArchivo = async () => {

        console.log(datosEditarData)
        console.log(nuevoArchivo)

        const formData = new FormData();
        formData.append('ardide', datosEditarData.ardid)
        formData.append('pemide', datosEditarData.pemid)
        formData.append('paiide', datosEditarData.paiid)
        formData.append('archivoe', nuevoArchivo)
        formData.append('nombreArchivoe', datosEditarData.nombreArchivo)
        formData.append('pemsluge', datosEditarData.pemslug)
        formData.append('pemnombree', datosEditarData.pemnombre)
        
        // datosEditarData.imagenes.map((imagen, pos) => {
            
        // })

        let arrayImagenes = [datosEditarData.nuevaImagenUno, datosEditarData.nuevaImagenDos, datosEditarData.nuevaImagenTres]

        // var nuevoArrayImagenes = JSON.stringify(arrayImagenes);
        // formData.append('ardimagenese', nuevoArrayImagenes)

        var nuevoArrayImagenes = JSON.stringify(datosEditarData.imagenes);
        formData.append('imagenes',nuevoArrayImagenes )

        await props.EditarArchivoData(formData)
        // props.limpiarCamposCrear()
    }

    return (
        <>

            <input
                type="file"
                ref={refParam => inputImagen = refParam}
                style={{display:'none'}}
                onChange={(e) => SeleccionarImagenEditar(e)}
            />

            <input
                type="file"
                ref={refParam => inputArchivo = refParam}
                style={{display:'none'}}
                onChange={(e) => seleccionarNuevoArchivo(e)}
            />

            <Modal
                closeIcon={<img onClick={() => props.setModal()} src={iconoCerrarModal} id="" />}
                title={null} 
                visible={props.mostrarModal}
                // visible={true} 
                footer={null}
                centered
                width={"378px"}
            >

                <div id="Contenedor-Modal-Crear-Usuario-Administrador">
                    <div> 
                        <div
                            id="Texto-Crear-Permiso-Administrador">País</div>
                        <Select 
                            className="Select-Crear-Usuario-Administrador"
                            onChange={(e) =>{
                                let nuevosDatos = {...datosEditarData}
                                nuevosDatos.paiid = e
                                setDatosEditarData(nuevosDatos)
                            }}
                            autoComplete={"off"}
                            allowClear
                            maxTagCount={2}
                            // value={paiidSeleccionado}
                            value={datosEditarData.paiid}
                        >
                            {
                                listaPaises.map((pais) => {
                                    return ( 
                                        <Select.Option value={pais.paiid}>{pais.painombre}</Select.Option>
                                    )
                                })
                            }
                        </Select>

                        <div
                            style={{marginTop:'0px'}}
                            id="Texto-Crear-Permiso-Administrador">Archivo</div>
                        <div
                            onClick={() => clickObtenerNuevoArchivo()} 
                            id="Input-Seleccionar-Archivo-Administrador">
                                {/* {props.nombreArchivoSeleccionado} */}
                                {nombreArchivoNuevo}
                        </div>


                        <div id="Texto-Crear-Permiso-Administrador">Nombre de Archivo</div>
                        <input 
                            name="crearNombreArchivo"
                            onChange={(e) => {
                                let nuevosDatos = {...datosEditarData}
                                nuevosDatos.nombreArchivo = e.target.value
                                setDatosEditarData(nuevosDatos)
                            }}
                            value={datosEditarData.nombreArchivo}
                            autoComplete={"off"}
                            id="Input-Crear-Permiso-Administrador" 
                        />


                        <div id="Texto-Crear-Permiso-Administrador">Slug del Permiso</div>
                        <input 
                            name="slugPermiso"
                            onChange={(e) => {
                                let nuevosDatos = {...datosEditarData}
                                nuevosDatos.pemslug = e.target.value
                                setDatosEditarData(nuevosDatos)
                            }}
                            value={datosEditarData.pemslug}
                            autoComplete={"off"}
                            id="Input-Crear-Permiso-Administrador" 
                        />

                        <div id="Texto-Crear-Permiso-Administrador">Descripción del Permiso</div>
                        <input 
                            name="descripcionPermiso"
                            onChange={(e) => {
                                let nuevosDatos = {...datosEditarData}
                                nuevosDatos.pemnombre = e.target.value
                                setDatosEditarData(nuevosDatos)
                            }}
                            value={datosEditarData.pemnombre}
                            autoComplete={"off"}
                            id="Input-Crear-Permiso-Administrador" 
                        />


                        <div id="Texto-Crear-Permiso-Administrador" onClick={() => console.log(datosEditarData)}>Imágenes</div>
                        <Row>
                            {
                                datosEditarData.imagenes
                                ?datosEditarData.imagenes.map((imagen, posImagen) => {

                                    return(
                                        posImagen == 0
                                        ?datosEditarData.nuevaImagenUno == null
                                            ?<Col xl={8} style={{paddingRight:'5px'}}>
                                                <div id="Contenedor-Imagenes-Crear-ControlData" onClick={() => clickObtenerImagen("imagenuno")} >
                                                    <img src={imagen.iadimagen} />
                                                </div>
                                            </Col>  
                                            :<Col xl={8} style={{paddingRight:'5px'}}>
                                                <div id="Contenedor-Imagenes-Crear-ControlData" onClick={() => clickObtenerImagen("imagenuno")} >
                                                    <img src={datosEditarData.nuevaImagenUno} />
                                                </div>
                                            </Col>  
                                        :posImagen == 1
                                            ?datosEditarData.nuevaImagenDos == null
                                                ?<Col xl={8} style={{paddingRight:'5px'}}>
                                                    <div id="Contenedor-Imagenes-Crear-ControlData" onClick={() => clickObtenerImagen("imagendos")} >
                                                        <img src={imagen.iadimagen} />
                                                    </div>
                                                </Col>
                                                :<Col xl={8} style={{paddingRight:'5px'}}>
                                                    <div id="Contenedor-Imagenes-Crear-ControlData" onClick={() => clickObtenerImagen("imagendos")} >
                                                        <img src={datosEditarData.nuevaImagenDos} />
                                                    </div>
                                                </Col>  
                                            :posImagen == 2
                                                ?datosEditarData.nuevaImagenTres == null
                                                    ?<Col xl={8} style={{paddingRight:'5px'}}>
                                                        <div id="Contenedor-Imagenes-Crear-ControlData" onClick={() => clickObtenerImagen("imagentres")} >
                                                            <img src={imagen.iadimagen} />
                                                        </div>
                                                    </Col>
                                                    :<Col xl={8} style={{paddingRight:'5px'}}>
                                                        <div id="Contenedor-Imagenes-Crear-ControlData" onClick={() => clickObtenerImagen("imagentres")} >
                                                            <img src={datosEditarData.nuevaImagenTres} />
                                                        </div>
                                                    </Col>
                                                :null
                                    )      

                                })
                                :null
                            }
                            {/* <Col xl={8} style={{paddingRight:'5px'}}>
                                {
                                    props.crearImagenUno == null
                                    ?<div id="Contenedor-Imagenes-Crear-ControlData" onClick={() => clickObtenerImagen()} >
                                        <img src={IconoImagenAzul} />
                                    </div>
                                    :<div id="Contenedor-Imagenes-Crear-ControlData" onClick={() => clickObtenerImagen()} >
                                        <img src={props.crearImagenUno} />
                                    </div>
                                } 
                            </Col>
                            <Col xl={8} style={{paddingLeft:'5px', paddingRight:'5px'}}>
                                {
                                    props.crearImagenDos == null
                                    ?<div id="Contenedor-Imagenes-Crear-ControlData" onClick={props.seleccionarImagenDos}>
                                        <img src={IconoImagenAzul} />
                                    </div>
                                    :<div id="Contenedor-Imagenes-Crear-ControlData" onClick={props.seleccionarImagenDos} >
                                        <img src={props.crearImagenDos} />
                                    </div>
                                } 
                            </Col>
                            <Col xl={8} style={{paddingLeft:'5px'}}>
                                {
                                    props.crearImagenTres == null
                                    ?<div id="Contenedor-Imagenes-Crear-ControlData" onClick={props.seleccionarImagenTres}>
                                        <img src={IconoImagenAzul} />
                                    </div>
                                    :<div id="Contenedor-Imagenes-Crear-ControlData" onClick={props.seleccionarImagenTres} >
                                        <img src={props.crearImagenTres} />
                                    </div>
                                } 
                            </Col> */}
                        </Row>

                        <div style={{textAlign: "-webkit-center"}}>
                            <Button
                                onClick={() => editarDataArchivo()}
                                loading={props.cargando_editar_archivo_data}
                                id="Contenedor-Btn-Crear-Permiso-Administrador">
                                    <div id="Texto-Btn-Crear-Permiso-Administrador">Editar</div>
                            </Button>
                        </div>
                    </div>
                </div>


            </Modal>


        </>
    )
}

export default ModalEditarData
