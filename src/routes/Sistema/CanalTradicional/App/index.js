import React from 'react'
import '../../../../styles/Sistema/CanalTradicional/App/App.css'
import Carousel from './Carousel/index'
import DatosGenerales from '../../../../assets/images/DatosGenerales/DatosGenerales.png'
import Comercial from '../../../../assets/images/DatosGenerales/Comercial.png'

const AppCanalTradicional = () => {


    /**
     * CAROUSEL
     * https://backend-spider-kimberly.grow-corporate.com/Spider/img/CanalTradicional/comercial.png
     * https://backend-spider-kimberly.grow-corporate.com/Spider/img/CanalTradicional/distribuidora.png
     * https://backend-spider-kimberly.grow-corporate.com/Spider/img/CanalTradicional/negocio.png
     * https://backend-spider-kimberly.grow-corporate.com/Spider/img/CanalTradicional/otros.png
     * https://backend-spider-kimberly.grow-corporate.com/Spider/img/CanalTradicional/tendero.png
     * 
     * 
     * CATEGORIAS
     * https://backend-spider-kimberly.grow-corporate.com/Spider/img/Categorias/CanalModerno.png
     * https://backend-spider-kimberly.grow-corporate.com/Spider/img/Categorias/CanalTradicional.png
     * https://backend-spider-kimberly.grow-corporate.com/Spider/img/Categorias/Conveni.png
     * https://backend-spider-kimberly.grow-corporate.com/Spider/img/Categorias/Ecommerce.png
     * https://backend-spider-kimberly.grow-corporate.com/Spider/img/Categorias/TradeMarketing.png
     * 
     * 
     * ICONOS DE CATEGORIAS
     * https://backend-spider-kimberly.grow-corporate.com/Spider/img/Categorias/Iconos/CanalModerno.png
     * https://backend-spider-kimberly.grow-corporate.com/Spider/img/Categorias/Iconos/CanalTradicional.png
     * https://backend-spider-kimberly.grow-corporate.com/Spider/img/Categorias/Iconos/Convenience.png
     * https://backend-spider-kimberly.grow-corporate.com/Spider/img/Categorias/Iconos/Ecommerce.png
     * https://backend-spider-kimberly.grow-corporate.com/Spider/img/Categorias/Iconos/TradeMarketing.png
     * 
     * 
     * 
     */

    const canales = [
        {
            // nombre  : "SELL OUT PERFORMANCE\n(YTD OVERVIEW)",
            nombre  : ["Comercial"],
            imagen  : Comercial,
            url     : "comercial"
        },
        {
            nombre  : ["Datos generales"],
            imagen  : DatosGenerales,
            url     : "datosGenerales"
        },
        
        {
            // nombre  : "SELL OUT PERFORMANCE\n(YTD OVERVIEW)",
            nombre  : ["Otros"],
            imagen  : Comercial,
            url     : "otros"
        },
        // {
        //     // nombre  : "SELL OUT PERFORMANCE\n(MTD OVERVIEW)",
        //     nombre  : ["SELL OUT PERFORMANCE", "(MTD OVERVIEW - SOLES DISTRIBUIDOR)"],
        //     imagen  : "https://backend-spider-kimberly.grow-corporate.com/Spider/img/CanalTradicional/distribuidora.png",
        //     url     : "distribuidora"
        // },
        // {
        //     // nombre  : "FIELD SALES\nEXECUTOR",
        //     nombre  : ["FIELD SALES EXECUTION", "(SOLES DISTRIBUIDOR)"],
        //     imagen  : "https://backend-spider-kimberly.grow-corporate.com/Spider/img/CanalTradicional/tendero.png",
        //     url     : "tendero"
        // },
        // {
        //     nombre  : ["OTROS", ""],
        //     imagen  : "https://backend-spider-kimberly.grow-corporate.com/Spider/img/CanalTradicional/otros.png",
        //     url     : "otros"
        // }
    ]

    return (
        <div>
            
            <Carousel 
                heading = "Example Slider"
                slides  = {canales} 
            />
            <div style={{marginBottom: '50px'}}></div>

        </div>
    )
}

export default AppCanalTradicional
