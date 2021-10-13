import React, {useState, useEffect} from 'react'
import iconoCerrarModal from '../../assets/images/iconos/Perfil/cerrarModal.png';
import {Input, Button} from 'antd'
import {useDispatch, useSelector} from "react-redux";
import {
    SeleccionarAgregarFavoritoReducer,
    AgregarFavoritoReducer,
    EliminarFavoritoReducer
} from '../../appRedux/actions/Dashboard/Dashboard'

const AgregarFavorito = (props) => {

    const dispatch = useDispatch();
    
    const { 
        agregarFavorito,
        idFavoritosubmoduloSeleccionado
    } = useSelector(({dashboard}) => dashboard);

    const [txtNombreFavorito, setTxtNombreFavorito] = useState("");
    const [cargandoGuardando, setCargandoGuardando] = useState(false);

    useEffect(() => {
        setTxtNombreFavorito(props.nombremoduloSeleccionado)
    }, []);

    const FunAgregarFavorito = async () => {
        setCargandoGuardando(true)
        await dispatch(AgregarFavoritoReducer(txtNombreFavorito, props.idsubmoduloSeleccionado))
        setCargandoGuardando(false)
        dispatch(SeleccionarAgregarFavoritoReducer(!agregarFavorito))
    }

    const FunEliminaravorito = async () => {
        setCargandoGuardando(true)
        await dispatch(EliminarFavoritoReducer(idFavoritosubmoduloSeleccionado))
        setCargandoGuardando(false)
        dispatch(SeleccionarAgregarFavoritoReducer(!agregarFavorito))
    }

    return (
        <div id="Contenedor-Anadir-Favoritos-Dashboard">
            <div id="Icon-Cerrar-Favoritos-TopNav">
                <img
                    onClick={() => dispatch(SeleccionarAgregarFavoritoReducer(!agregarFavorito))}
                    src={iconoCerrarModal}
                    id="" />
            </div>
            <div id="Titulo-Anadir-Favoritos-Dashboard">
                {
                    idFavoritosubmoduloSeleccionado > 0
                    ?"Elimiar Favorito"
                    :"Añadir a Favoritos"
                }
            </div>
            <Input 
                id="Input-Anadir-Favoritos-Dashboard"
                autoComplete={"off"}
                value={txtNombreFavorito}
                onChange={(e) => setTxtNombreFavorito(e.target.value)}
            />
            <div id="Botones-Anadir-Favoritos-Dashboard">
                <Button
                    onClick={() => dispatch(SeleccionarAgregarFavoritoReducer(!agregarFavorito))}
                    id="Btn-Cancelar-Anadir-Favoritos-Dashboard"
                >
                    Cancelar
                </Button>
                {
                    idFavoritosubmoduloSeleccionado > 0
                    ?<Button
                        id="Btn-Guardar-Anadir-Favoritos-Dashboard"
                        onClick={() => FunEliminaravorito()}
                        loading={cargandoGuardando}
                    >
                        Quitar
                    </Button>
                    :<Button
                        id="Btn-Guardar-Anadir-Favoritos-Dashboard"
                        onClick={() => FunAgregarFavorito()}
                        loading={cargandoGuardando}
                    >
                        Guardar
                    </Button>
                }
            </div>
        </div>
    )
}

export default AgregarFavorito
