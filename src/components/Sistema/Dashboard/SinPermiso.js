import React from 'react'
import {Link} from "react-router-dom";
import config from '../../../config'

const SinPermiso = () => {
    return (
        <div
            style={{
                width:'100%',
                height:'90vh',
                background:'white'
            }}
        >
            <div
                style={{ textAlign: "-webkit-center" }}
            >
                <video 
                    playsInline="" 
                    autoPlay="autoplay" 
                    muted="muted" 
                    loop="loop" 
                    poster="https://assets3.lottiefiles.com/render/kc3j5x2o.png" 
                    style={{
                        width: "400px"
                    }}
                >
                    <source type="video/mp4" src="https://assets10.lottiefiles.com/render/kc3j5x2o.mp4" />
                </video>
                <div className="Titulo-Plataforma-Contruccion">
                    ¡Estamos en construcción! 
                </div>
                <div className="Descripcion-Plataforma-Contruccion">
                    {config.nombreSistema} se encuentra construyendo nuevos módulos para brindarte el mejor servicio.<br/>
                    Si deseas contactarte con alguien, envía un correo a:<br/>
                    <a href="mailto:soporte@grow-analytics.com.pe" id="Correo-Soporte-Contruccion">soporte@grow-analytics.com.pe</a>
                </div>
            </div>
        </div>
    )
}

export default SinPermiso


{/* <div className="gx-page-error-container" style={{paddingBottom:"60px", paddingTop:'20px'}}>
            <div className="gx-page-error-content">
            <div className="gx-error-code gx-mb-4">404</div>
            <h2 className="gx-text-center">
                Lo sentimos, usted no tiene permiso para ver esta pagina!
            </h2>
            <form className="gx-mb-4" role="search">
                <div className="gx-search-bar">
                <div className="gx-form-group">
                    <input type="search" className="ant-input ant-input-lg" placeholder="Search..."/>
                    <button className="gx-search-icon">
                    <i className="icon icon-search"/>
                    </button>
                </div>
                </div>
            </form>
            <p className="gx-text-center">
                <Link className="gx-btn gx-btn-primary" to="/sistema/categorias">Regresar</Link>
            </p>
            </div>
        </div> */}