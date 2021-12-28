import React, {useState, useEffect} from 'react'
import {Row, Col} from 'antd'
import {Link} from "react-router-dom"
import {funPermisosObtenidosEstado} from '../../../funciones/funPermiso'
import CatCanalModerno from '../../../assets/images/categorias/Moderno.png';
import catCanalTradicional from '../../../assets/images/categorias/CanalTradicional.png';
import CatConvenienceStore from '../../../assets/images/categorias/Convenience.png';
import CatEcommerce from '../../../assets/images/categorias/Ecommerce.png';
import CatTradeMarketing from '../../../assets/images/categorias/TradeMarketing.png';
import CatFarmacia from '../../../assets/images/categorias/Farmacia.png';
import CatMarketing from '../../../assets/images/categorias/Marketing.png';
import CatClienteDirecto from '../../../assets/images/categorias/ClienteDirecto.png';
import CatControlPdv from '../../../assets/images/categorias/Pdv.png';

import CatDashboardsComerciales from '../../../assets/images/categorias/Dashboardscomerciales.png';
import CatIcentivos from '../../../assets/images/categorias/Incentivos.png';
import {useDispatch, useSelector} from "react-redux";
import icoCatCanalModerno from '../../../assets/images/categorias/iconos/iconoCanalModerno.png';
import icoCatCanalTradicional from '../../../assets/images/categorias/iconos/iconoCanalTradicional.png';
import icoCatConvenience from '../../../assets/images/categorias/iconos/iconoConvenience.png';
import icoCatEcommerce from '../../../assets/images/categorias/iconos/iconoEcommerce.png';
import icoCatTradeMarketing from '../../../assets/images/categorias/iconos/iconoTradeMarketing.png';
import icoCatClientesDirectos from '../../../assets/images/categorias/iconos/iconoClientesDirectos.png';
import icoCatMarketing from '../../../assets/images/categorias/iconos/iconoMarketing.png';
import icoCatFarmacia from '../../../assets/images/categorias/iconos/iconoFarmacia.png';
import icoCatControlPdv from '../../../assets/images/categorias/iconos/iconoControlPdv.png';
import icoNoAcceso from '../../../assets/images/categorias/notieneacceso.png';
import icoDashboardsComerciales from '../../../assets/images/categorias/iconos/iconoDashboardsComerciales.png';
import icoIcentivos from '../../../assets/images/categorias/iconos/iconoIcentivos.png';

import '../../../styles/Sistema/Cat/Cat.css'

const Cat = () => {

    // let he = window.screen.height
    let tamanioHeight = window.innerHeight
    let tamanioCard = 650
    let tamanioIcono = 80

    if(tamanioHeight == 754){
        tamanioCard = 430
        tamanioIcono = 95
    }else if(tamanioHeight == 431){
        tamanioCard = 180
        tamanioIcono = 55
    }else if(tamanioHeight == 503){
        tamanioCard = 235
        tamanioIcono = 75
    }else if(tamanioHeight == 603){
        tamanioCard = 315
        tamanioIcono = 85
    }else if(tamanioHeight == 609){
        tamanioCard = 315
        tamanioIcono = 85
    }else if(tamanioHeight == 646){
        tamanioCard = 350
        tamanioIcono = 85
    }else if(tamanioHeight == 686){
        tamanioCard = 375
        tamanioIcono = 85
    }else if(tamanioHeight == 689){
        tamanioCard = 375
        tamanioIcono = 85
    }else if(tamanioHeight == 765){
        tamanioCard = 450
        tamanioIcono = 95
    }else if(tamanioHeight == 775){
        tamanioCard = 450
        tamanioIcono = 95
    }else if(tamanioHeight == 838){
        tamanioCard = 495
        tamanioIcono = 95
    }else if(tamanioHeight == 881){
        tamanioCard = 530
        tamanioIcono = 100
    }
    else if(tamanioHeight == 943){
        tamanioCard = 580
        tamanioIcono = 110
    }else if(tamanioHeight == 969){
        tamanioCard = 600
        tamanioIcono = 110
    }else if(tamanioHeight == 1005){
        tamanioCard = 620
        tamanioIcono = 120
    }else if(tamanioHeight == 1076){

        tamanioCard = 680
        tamanioIcono = 120

    }else if(tamanioHeight == 1131){
        tamanioCard = 780 - 50
        tamanioIcono = 130
    }else if(tamanioHeight == 1211){
        tamanioCard = 780
        tamanioIcono = 125
    }else if(tamanioHeight == 1292){
        tamanioCard = 850
        tamanioIcono = 140
    }else if(tamanioHeight == 1453){
        tamanioCard = 970
        tamanioIcono = 150
    }else if(tamanioHeight == 1508){
        tamanioCard = 1010
        tamanioIcono = 160
    }else if(tamanioHeight == 1938){
        tamanioCard = 1330
        tamanioIcono = 190
    }else if(tamanioHeight == 2263){
        tamanioCard = 1590
        tamanioIcono = 210
    }else if(tamanioHeight == 2907){
        tamanioCard = 2100
        tamanioIcono = 265
    }
    
    else{
        // tamanioCard = (tamanioHeight * 440) / 754
        tamanioCard = (tamanioHeight * 370) / 754
        tamanioIcono = (tamanioHeight * 70) / 754
    }

    const categoriasPromociones  = [

        // {
        //     catnombre       : "Dashboards Comerciales",
        //     catimagenfondo  : CatDashboardsComerciales,
        //     caticonohover   : icoDashboardsComerciales,
        //     catcolorhover   : "0, 0, 0, 0.4",
        //     catcolor        : "#D21044",
        //     nombreUrl       : "/Sistema/dashboards/trade-marketing/incentivos-driver-peru-gerenciales",
        //     slug : "dashboardscomerciales"
        // },

        {
            catnombre       : "Canal Distribuidores",
            // catimagenfondo  : "https://backend-spider-kimberly.grow-corporate.com/Spider/img/Categorias/CanalTradicional.png",
            catimagenfondo  : catCanalTradicional,
            // caticonohover   : "https://backend-spider-kimberly.grow-corporate.com/Spider/img/Categorias/Iconos/CanalTradicional.png",
            caticonohover   : icoCatCanalTradicional,
            catcolorhover   : "0, 0, 0, 0.4",
            catcolor        : "#213DA7",
            // nombreUrl       : "/Sistema/dashboards/canal-tradicional/ytd-radiography-store-so"
            nombreUrl       : "/Sistema/dashboards/canal-tradicional/smart-hub",
            slug : "canaldistribuidores"
        },

        {
            catnombre       : "Canal Retail",
            // catimagenfondo  : "https://backend-spider-kimberly.grow-corporate.com/Spider/img/Categorias/CanalModerno.png",
            catimagenfondo  : CatCanalModerno,
            // caticonohover   : "https://backend-spider-kimberly.grow-corporate.com/Spider/img/Categorias/Iconos/CanalModerno.png",
            caticonohover   : icoCatCanalModerno,
            catcolorhover   : "0, 0, 0, 0.4",
            catcolor        : "#FF3D00",
            // nombreUrl       : "/Sistema/dashboards/canal-moderno/ytd-si-so"
            nombreUrl       : "/Sistema/dashboards/canal-moderno/smart-hub",
            slug : "canalretail"
        },

        {
            catnombre       : "Convenience Store",
            // catimagenfondo  : "https://backend-spider-kimberly.grow-corporate.com/Spider/img/Categorias/Conveni.png",
            catimagenfondo  : CatConvenienceStore,
            // caticonohover   : "https://backend-spider-kimberly.grow-corporate.com/Spider/img/Categorias/Iconos/Convenience.png",
            caticonohover   : icoCatConvenience,
            catcolorhover   : "0, 0, 0, 0.4",
            catcolor        : "#00BE7A",
            nombreUrl       : "convenienceStore",
            tienePermiso    : false,
            slug : "convenience"
        },

        {
            catnombre       : "Ecommerce",
            // catimagenfondo  : "https://backend-spider-kimberly.grow-corporate.com/Spider/img/Categorias/Ecommerce.png",
            catimagenfondo  : CatEcommerce,
            // caticonohover   : "https://backend-spider-kimberly.grow-corporate.com/Spider/img/Categorias/Iconos/Ecommerce.png",
            caticonohover   : icoCatEcommerce,
            catcolorhover   : "0, 0, 0, 0.4",
            catcolor        : "#41394E",
            nombreUrl       : "ecommerce",
            tienePermiso    : false,
            slug : "ecommerce"
        },
        
        {
            catnombre       : "Trade Marketing",
            // catimagenfondo  : "https://backend-spider-kimberly.grow-corporate.com/Spider/img/Categorias/TradeMarketing.png",
            catimagenfondo  : CatTradeMarketing,
            // caticonohover   : "https://backend-spider-kimberly.grow-corporate.com/Spider/img/Categorias/Iconos/TradeMarketing.png",
            caticonohover   : icoCatTradeMarketing,
            catcolorhover   : "0, 0, 0, 0.4",
            catcolor        : "#D21044",
            nombreUrl       : "/Sistema/dashboards/trade-marketing/incentivos-driver-peru-gerenciales",
            slug : "trademarketing"
        },

        {
            catnombre       : "Marketing",
            catimagenfondo  : CatMarketing,
            caticonohover   : icoCatMarketing,
            catcolorhover   : "0, 0, 0, 0.4",
            catcolor        : "#D21044",
            nombreUrl       : "/Sistema/dashboards/marketing",
            tienePermiso    : false,
            slug : "marketing"
        },

        {
            catnombre       : "Clientes Directos",
            catimagenfondo  : CatClienteDirecto,
            caticonohover   : icoCatClientesDirectos,
            catcolorhover   : "0, 0, 0, 0.4",
            catcolor        : "#D21044",
            nombreUrl       : "/Sistema/dashboards/clientes-directos",
            tienePermiso    : false,
            slug : "clientedirecto"
        },

        {
            catnombre       : "Farmacias",
            catimagenfondo  : CatFarmacia,
            caticonohover   : icoCatFarmacia,
            catcolorhover   : "0, 0, 0, 0.4",
            catcolor        : "#D21044",
            nombreUrl       : "/Sistema/dashboards/peru-farmacias",
            slug: "farmacia"
        },

        

        // {
        //     catnombre       : "Icentivos Comerciales",
        //     catimagenfondo  : CatIcentivos,
        //     caticonohover   : icoIcentivos,
        //     catcolorhover   : "0, 0, 0, 0.4",
        //     catcolor        : "#FF3D00",
        //     nombreUrl       : "/Sistema/dashboards/canal-moderno/smart-hub",
        //     slug : "icentivos"
        // },
        
        
        {
            catnombre       : "Control del PDV",
            catimagenfondo  : CatControlPdv,
            caticonohover   : icoCatControlPdv,
            catcolorhover   : "0, 0, 0, 0.4",
            catcolor        : "#D21044",
            nombreUrl       : "/Sistema/dashboards/control-pdv",
            tienePermiso    : false,
            slug : "controlpdv"
        }
    ]

    // const [mostrarTxtSinPermiso, setMostrarTxtSinPermiso ] = useState(false)
    const { paisSeleccionado, permisos } = useSelector(({auth}) => auth);

    return (
        <div id="Contenedor-Principal-Margen">
            
            <Row>
            <Col 
                    xl={24} style={{paddingLeft:'20px'}} 
                    onClick={() => {
                        console.log(paisSeleccionado)
                        console.log(tamanioHeight)
                    }} 
                >
                    <div id="Titulo-Servicio-Categorias">GROW PLUS</div>
                    <div id="SubTitulo-Servicio-Categorias">Somos la Empresa del <span className="Txt-Resaltado-Categorias">Futuro del Consumo Masivo y Professional</span> usando Algoritmos de <span className="Txt-Resaltado-Categorias">Inteligencia Artificial, Robotica y Machine Learning</span></div>

                    {/* <span id="Titulo-Servicio-Categorias">SERVICIOS DESTACADOS {tamanioHeight}</span> */}
                </Col>
            </Row>
            
            <Row style={{marginTop:'30px'}}>
                {
                    categoriasPromociones.map((categoria) => {
                        return (
                            
                            <Col 
                                xl={8} md={8} sm={12}  xs={24} 
                            >
                                {/* <Link to={categoria.nombreUrl} > */}
                                    <ContenedorTarjeta 
                                        permisos = {permisos}
                                        tamanioCard = {tamanioCard}
                                        categoria = {categoria}
                                        tamanioIcono = {tamanioIcono}
                                        modulos = {
                                            paisSeleccionado
                                            ?paisSeleccionado.modulos
                                            ?paisSeleccionado.modulos.length > 0
                                                ?paisSeleccionado.modulos
                                                :[]
                                            :[]
                                            :[]
                                        }
                                    />
                                {/* </Link> */}
                            </Col>
                        )
                    })
                }
            </Row>
        </div>
    )
}






const ContenedorTarjeta = (props) => {

    const [mostrarTxtSinPermiso, setMostrarTxtSinPermiso ] = useState(false)
    const [tienePermiso, setTienePermiso ] = useState(false)

    const tamanioCard = props.tamanioCard
    const categoria = props.categoria
    const tamanioIcono = props.tamanioIcono

    useEffect(async () => {
        let encontro = false
        await props.modulos.map(async(modulo) => {
            if(modulo.modslug == categoria.slug){
                await modulo.smos.map((submodulo, posicionsmo) => {
                    if(encontro == false){
                        if(funPermisosObtenidosEstado(
                            props.permisos,
                            submodulo.pemslug
                        ) == true){
                            encontro = true
                            setLink(submodulo.smoruta)
                        }
                    }
                })
            }
        })
        setTienePermiso(encontro)
        console.log('cambio')
    },[props.modulos])

    const [urlselec, setLink] = useState("")

    return (
        <Link to={urlselec} >
            <div 
                className="contenedorImgHover-ServiciosDescatados" 
                onMouseEnter={() => setMostrarTxtSinPermiso(true)}
                onMouseLeave={() => {
                    setMostrarTxtSinPermiso(false)
                    console.log(mostrarTxtSinPermiso)
                }}
            >
                <figure 
                    style={{height:(tamanioCard + (tamanioCard*20)/100)+"px",  width:'100%'}}>
                    <span className="gx-link gx-grid-thumb-cover">
                        <div style={{ 
                            backgroundImage: "url("+categoria.catimagenfondo+")", 
                            backgroundSize: '100% 100%', 
                            backgroundRepeat:'no-repeat',
                            height:tamanioCard+'px'
                        }} >
                            <Row style={{ alignContent: 'flex-end', height:'100%', paddingBottom:'44px' }}>
                                <Col xl={24} md={24} sm={24} xs={24}>
                                    <div className="gx-text-center" >
                                        
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </span>
                    <div
                        style={{
                            width: '100%',
                            height:((tamanioCard*20)/100)+'px',
                            bottom: "0px",
                            position: "absolute",
                            background:'white',
                            display: "flex",
                            alignItems: "center",
                            placeContent: "center"
                        }}
                    >
                        <div style={{position:'relative', width:'100%', height:'100%', display: "flex", placeContent: "center", alignItems: "center"}}>
                            <div
                                style={{
                                    fontFamily: "Segoe UI",
                                    fontStyle: "normal",
                                    fontWeight: "bold",
                                    fontSize: "20px",
                                    lineHeight: "23px",
                                    display: "flex",
                                    alignItems: "center",
                                    color: "#323233",
                                    position: "absolute",
                                    marginTop: "30px"
                                }}
                            >
                                {categoria.catnombre}
                            </div>
                            <div
                                style={{
                                    width: '100%',
                                    position: "absolute",
                                    display: "flex",
                                    top:'-50px',
                                    alignItems: "center",
                                    placeContent: "center",
                                }}
                            >
                                <div>
                                    <img 
                                        alt="" 
                                        src={categoria.caticonohover} 
                                        width= {tamanioIcono+"px" }
                                        height={tamanioIcono+"px" }
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="Capa-Card-Servicio-Categorias">
                        <div 
                            id="Animacion-Capa-Card-Servicio-Categorias"
                            style={{
                                display: "flex",
                                alignItems: "center",
                                placeContent: "center"
                            }}
                        >
                            {
                                tienePermiso == false
                                    ?mostrarTxtSinPermiso == true
                                        ?<div>
                                            <div style={{textAlignLast: "center"}}>
                                                <img src={icoNoAcceso} width={"55px"} />
                                            </div>
                                            <div id="Txt-No-Tiene-Acceso-Servicios-Destacados" >
                                                Aún no tienes acceso<br/>a este servicio
                                            </div>
                                        </div>
                                        :null
                                    :null
                            }
                            
                        </div>
                    </div>
                </figure>
            </div>
        </Link>
    )
}




export default Cat
