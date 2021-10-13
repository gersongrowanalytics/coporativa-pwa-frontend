import React from 'react'
import AppCanalTradicional from '../App/index'
import '../../../../styles/Sistema/CanalTradicional/DatosGenerales/DatosGenerales.css'

const Otros = () => {
    return (
        <div>
            <AppCanalTradicional/>
            <div style={{ position: 'relative'}}>
                <iframe
                    width="100%"
                    height="900"
                    src="https://app.powerbi.com/view?r=eyJrIjoiNGI1MzQyYjQtNjIyMy00ZDI2LTk1NTMtZWY0YjNiYTk0ODc3IiwidCI6IjFkZjQ2ODhjLWI5MTUtNDEwMy05OGMwLTNhMzY4ZmIyOTNlOCJ9&pageName=ReportSection"
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

export default Otros
