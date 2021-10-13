import React from 'react'
import {useDispatch, useSelector} from "react-redux"
import {
    SeleccionarFavoritosReducer
} from '../../appRedux/actions/Dashboard/Dashboard'

const NombreModuloSelecTopBar = (props) => {

    const dispatch = useDispatch();
    const { 
        seleccionoFavoritos
    } = useSelector(({dashboard}) => dashboard);

    return (
        <div 
            className="Contenedor-Filtro-TopBar"
            id="Contenedor-Filtro-TopBar"
            style={
                
                props.seleccionoFavoritos == true
                ?{
                    width:'80%',
                }
                :{
                    width:'80%',
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    borderBottom: "4px solid #1876F2",
                    paddingRight: "10px"
                }
            }

            onClick={() => dispatch(SeleccionarFavoritosReducer(!seleccionoFavoritos))}
        >
            <div
                id={
                    props.seleccionoFavoritos == true
                    ?"Contenedor-Filtro-Nombre-Modulo-TopBar"
                    :"Contenedor-Filtro-Nombre-Modulo-Seleccionado-TopBar"
                }

            >
                <img 
                    id="Icono-Contenedor-Filtro-TopBar"
                    src={props.moduloSeleccionado.modiconoseleccionado} 
                />
                {props.moduloSeleccionado.modnombre}
            </div>
        </div>
    )
}

export default NombreModuloSelecTopBar
