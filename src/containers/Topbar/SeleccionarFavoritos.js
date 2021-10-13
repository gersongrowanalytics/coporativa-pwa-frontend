import React from 'react'
import {useDispatch, useSelector} from "react-redux"
import {
    SeleccionarFavoritosReducer
} from '../../appRedux/actions/Dashboard/Dashboard'

const SeleccionarFavoritos = () => {

    const dispatch = useDispatch();
    const { 
        seleccionoFavoritos
    } = useSelector(({dashboard}) => dashboard);

    return (
        <div
            onClick={() => dispatch(SeleccionarFavoritosReducer(!seleccionoFavoritos))}
            id="Contenedor-Seleccionar-Favoritos-TopNav"></div>
    )
}

export default SeleccionarFavoritos
