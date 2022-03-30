import React, {useState, useRef, useEffect} from 'react'
import {Row, Col, Button, message} from "antd";
import config from '../../../config'
import ReactExport from 'react-data-export';
import BotonDescargar from './BotonDescargar'

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

const Pricing = () => {

    const LimpiarArrayExportacionesReducer = async (arr) => {

        await arr[0]['data'].map((dato, posicion) => {
            arr[0]['data'][posicion].map((dat) => {
            dat.value = dat.value == null ?"" :dat.value
          })
        })
      
        return arr
    }

    const ObtenerDataReducer = async (pagid) => {
        
        if(pagid == 0){
            setCargandoDescargarTodo(true)
        }

        // await fetch('https://pricing-backend.softys-leadcorporate.com/exportar-productos-no-homologados/'+pagid,
        await fetch('http://10.10.1.241:8000/exportar-productos-no-homologados/'+pagid,
            {
                mode:'cors',
                method: 'GET',
                headers: {
                    'Accept' 	   : 'application/json',
                    'Content-type' : 'application/json',
                    'api-token'	   : localStorage.getItem('usutoken')
                }
            }
        )
        .then( async res => {
            return res.json()
        })
        .then(async data => {

            let datosLimpios = []
            datosLimpios = await LimpiarArrayExportacionesReducer(data.excel)

            await setDataExcel(datosLimpios)

            btnDescargar.current.click()

        }).catch((error)=> {
            console.log(error)
        })
        
        if(pagid == 0){
            setCargandoDescargarTodo(false)
        }

        return true
    }

    const ObtenerlinkDescargarTodoReducer = async () => {

        await fetch('https://pricing-backend.softys-leadcorporate.com/obtener-link-excel-descargar-todo',
            {
                mode:'cors',
                method: 'GET',
                headers: {
                    'Accept' 	   : 'application/json',
                    'Content-type' : 'application/json',
                    'api-token'	   : localStorage.getItem('usutoken')
                }
            }
        )
        .then( async res => {
            return res.json()
        })
        .then(async data => {

            setLinkDescargarTodo(data.link)
            
        }).catch((error)=> {
            console.log(error)
        })
        

        return true
    }
    
    const [paginas, setPaginas] = useState([
        {
            "pagid"     : 1,
            "pagnombre" : "Arcalauquen",
            "paglink" : "https://www.arcalauquen.cl/"
        },

        {
            "pagid"     : 2,
            "pagnombre" : "Tork",
            "paglink" : "https://torkalpormayor.cl/"
        },

        {
            "pagid"     : 3,
            "pagnombre" : "Dipisa",
            "paglink" : "https://dipisa.cl/"
        },

        {
            "pagid"     : 4,
            "pagnombre" : "Avalco",
            "paglink" : "https://www.avalco.cl/"
        },

        {
            "pagid"     : 5,
            "pagnombre" : "Dilen",
            "paglink" : "https://dilenchile.cl/"
        },

        {
            "pagid"     : 6,
            "pagnombre" : "Sodimac",
            "paglink" : "https://www.sodimac.cl/"
        },

        {
            "pagid"     : 7,
            "pagnombre" : "Distribuidora Pronto",
            "paglink" : "https://www.dpronto.cl/"
        },

        {
            "pagid"     : 8,
            "pagnombre" : "Comcer",
            "paglink" : "https://www.comcer.cl/"
        },

    ])

    const [paginasdos, setPaginasdos] = useState([
        {
            "pagid"     : 10,
            "pagnombre" : "Daos",
            "paglink" : "https://daos.cl/home/"
        },

        {
            "pagid"     : 11,
            "pagnombre" : "Provit",
            "paglink" : "https://provit.cl/"
        },

        {
            "pagid"     : 12,
            "pagnombre" : "LimpiaMas",
            "paglink" : "https://limpiamas.mercadoshops.cl/"
        },

        {
            "pagid"     : 13,
            "pagnombre" : "Hygiene",
            "paglink" : "https://www.hygiene.cl/"
        },
        {
            "pagid"     : 14,
            "pagnombre" : "Central Mayorista",
            "paglink" : "https://www.centralmayorista.cl/"
        },

        {
            "pagid"     : 15,
            "pagnombre" : "Cuponatic",
            "paglink" : "https://www.cuponatic.com/"
        },

        {
            "pagid"     : 16,
            "pagnombre" : "Mercado Libre",
            "paglink" : "https://www.mercadolibre.cl/"
        },
        
        {
            "pagid"     : 9,
            "pagnombre" : "Ofimaster",
            "paglink" : "https://www.ofimaster.cl/"
        },
    ])


    const [dataExcel, setDataExcel] = useState([])
    const [cargandoDescargarTodo, setCargandoDescargarTodo] = useState(false)

    const btnDescargar = useRef(null);

    const [cargandoLinkDescargarTodo, setCargandoLinkDescargarTodo] = useState(false)
    const [linkDescargarTodo, setLinkDescargarTodo] = useState("https://pricing-backend.softys-leadcorporate.com/Excels/MarketPlacesFE2022PXAQE.xlsx")

    useEffect(() => {

        ObtenerlinkDescargarTodoReducer()

    }, [])

    return (
        <div>
            <Row
                style={{
                    marginTop:'20px'
                }}
            >
                <Col 
                    xl={24}
                    style={{
                        textAlign: "-webkit-center",
                        marginTop: "20px",
                        marginBottom: "30px"
                    }}
                >
                    {/* <Button */}
                    <a
                        // onClick={() => ObtenerDataReducer(0)}
                        // loading={cargandoDescargarTodo}
                        style={{
                            borderRadius:'50px',
                            background: "#1876F2",
                            boxShadow: "0px 4px 4px rgb(0 0 0 / 25%)",
                            position:'relative',
                            width:'130px',
                            paddingTop:'7px',
                            paddingBottom:'7px',
                            paddingLeft:'10px',
                            paddingRight:'10px'
                        }}
                        id="Texto-Btn-Descargar-Descargar-Data"
                        href={linkDescargarTodo}
                        download
                    >
                        {/* <div
                            style={{
                                position:'absolute',
                                top:'6px'
                            }}
                        >
                            
                        </div> */}
                        Descargar Todo
                    </a>
                    {/* </Button> */}
                </Col>
                <Col xl={2}></Col>
                <Col 
                    xl={10}
                    style={{width:'100%'}}
                >
                    {
                        paginas.map((pagina, pos) => {
                            return (
                                <Row
                                    style={{
                                        height: "50px"
                                    }}
                                >
                                    <Col xl={2}></Col>
                                    <Col 
                                        xl={10}
                                        style={{
                                            paddingTop:'9px',

                                        }}
                                    >
                                        {pagina.pagnombre}
                                    </Col>
                                    <Col xl={12}>
                                        <BotonDescargar 
                                            pagid = {pagina.pagid}
                                            obtenerData = {async() => await ObtenerDataReducer(pagina.pagid)}
                                        />
                                    </Col>
                                </Row>
                            )
                        })
                    }
                </Col>   
                
                <Col 
                    xl={12}
                    style={{width:'100%'}}
                >
                    {
                        paginasdos.map((pagina) => {
                            return (
                                <Row
                                    style={{
                                        height: "50px"
                                    }}
                                >
                                    <Col xl={4}></Col>
                                    <Col 
                                        xl={9}
                                        style={{
                                            paddingTop:'9px',
                                        }}
                                    >
                                        {pagina.pagnombre}
                                    </Col>
                                    <Col 
                                        xl={11}
                                        // style={{
                                        //     textAlignLast: "right"
                                        // }}
                                    >
                                        <Button
                                            onClick={() => ObtenerDataReducer(pagina.pagid)}
                                        >
                                            Descargar Información
                                        </Button>
                                    </Col>
                                </Row>
                            )
                        })
                    }
                </Col>
                {/* <Col xl={2}></Col> */}
                
            </Row>


            <ExcelFile 
                filename="MarketPlaces"
                element={
                    <button
                        style={{display:'none'}}
                        ref={btnDescargar} 
                    >
                        asd
                    </button>
                }>
                <ExcelSheet 
                    dataSet={dataExcel} 
                    name="MarketPlaces"
                />
            </ExcelFile>
        </div>
    )
}

export default Pricing
