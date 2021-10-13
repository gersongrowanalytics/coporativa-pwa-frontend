import React from 'react'
import IconoLupa from '../../../../assets/images/iconos/Tabla/lupa.svg'

const BuscarModulo = () => {
    return (
        <div id="Contenedor-Buscador-Administrador-Usuarios" >
            <img src={IconoLupa} id="Icono-Lupa-Control-Archivos" />
            <input 
                id="Input-Buscador-Control-Archivos" 
                placeholder="Buscar"
                autoComplete={"off"} 
                // value={txtBuscar}
                // onChange={(e) => buscarTxtBuscar(e.target.value)}
            />
        </div>
    )
}

export default BuscarModulo
