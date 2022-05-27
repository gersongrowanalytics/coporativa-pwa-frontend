import React from 'react'
import IconoLupa from '../../../../assets/images/iconos/Tabla/lupa.svg'

const BuscarModulo = (props) => {
    return (
        <div id="Contenedor-Buscador-Administrador-Usuarios" >
            <img src={IconoLupa} id="Icono-Lupa-Control-Archivos" />
            <input 
                id="Input-Buscador-Control-Archivos" 
                placeholder="Buscar"
                autoComplete={"off"} 
                value={props.txtBuscar}
                onChange={(e) => props.cambiarTxtBuscar(e)}
            />
        </div>
    )
}

export default BuscarModulo
