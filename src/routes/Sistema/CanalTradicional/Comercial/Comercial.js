import React from 'react'
import AppCanalTradicional from '../App/index'
// import './Comercial.css'
const Comercial = () => {
    return (
        <div>
            <AppCanalTradicional/>
            <div style={{ position: 'relative'}}>
                <iframe
                    width="100%"
                    height="900"
                    src="https://app.powerbi.com/view?r=eyJrIjoiZmNlOTFmOTktZTY1NS00MzQ5LTgzNDktMWI3N2Y2N2M3YzAyIiwidCI6IjFkZjQ2ODhjLWI5MTUtNDEwMy05OGMwLTNhMzY4ZmIyOTNlOCJ9"
                    frameborder="0"
                ></iframe>
                {/* <div id="botonComercial">
                    BOTON
                </div> */}
                <div id="taparIzqcomercial">
                    
                </div>
                <div id="taparDerechaComercial">

                </div>
            </div>
        </div>
    )
}

export default Comercial
