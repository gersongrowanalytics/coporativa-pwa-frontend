import React from 'react'
import AppCanalTradicional from '../App/index'
import '../../../../styles/Sistema/CanalTradicional/DatosGenerales/DatosGenerales.css'
const DatosGenerales = () => {
    return (
        <div>
            <AppCanalTradicional/>
            <div style={{ position: 'relative'}}>
                <iframe
                    width="100%"
                    height="900"
                    src="https://app.powerbi.com/view?r=eyJrIjoiZGJiYTg4NDEtZDMwYy00YjI3LWFjMGItYjAxYzA5ZjM0MzA2IiwidCI6IjFkZjQ2ODhjLWI5MTUtNDEwMy05OGMwLTNhMzY4ZmIyOTNlOCJ9"
                    frameborder="0"
                ></iframe>
                {/* <div id="botonComercial">
                    BOTON
                </div> */}
                <div id="taparMediocomercial">
                    
                </div>
                <div id="taparIzqcomercial">
                    
                </div>
                <div id="taparDerechaComercial">

                </div>
            </div>
        </div>
    )
}

export default DatosGenerales
