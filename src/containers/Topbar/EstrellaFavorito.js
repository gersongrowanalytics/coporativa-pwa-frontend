import React from 'react'
import {SeleccionarAgregarFavoritoReducer} from '../../appRedux/actions/Dashboard/Dashboard'
import {useDispatch, useSelector} from "react-redux";
import IconoEstrellaFavoritos from '../../assets/images/iconos/Dashboard/estrella-favoritos.png'
import IconoEstrellaFavoritosSelec from '../../assets/images/iconos/Dashboard/estrella-favoritos-selec.png'

const EstrellaFavorito = () => {
    
    const dispatch = useDispatch();
    
    const { 
        agregarFavorito,
        idFavoritosubmoduloSeleccionado,
        seleccionoFavoritos
    } = useSelector(({dashboard}) => dashboard);

    return (
        <img 
            src={
                idFavoritosubmoduloSeleccionado > 0 || agregarFavorito == true || seleccionoFavoritos == true
                ?IconoEstrellaFavoritosSelec
                :IconoEstrellaFavoritos
            }
            id="Icono-Estrella-Favoritos-Dashboard"
            onClick={() => dispatch(SeleccionarAgregarFavoritoReducer(!agregarFavorito))}
        />
    )
}

export default EstrellaFavorito
