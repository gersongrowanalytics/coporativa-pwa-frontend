import React from 'react'
import {Link} from "react-router-dom";

const SinPermiso = () => {
    return (
        <div className="gx-page-error-container" style={{paddingBottom:"60px", paddingTop:'20px'}}>
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
        </div>
    )
}

export default SinPermiso
