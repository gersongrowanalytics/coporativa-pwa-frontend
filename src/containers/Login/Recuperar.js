import React,{useState, useEffect} from 'react'
import '../../styles/Login/LoginVideo.css'
import FormularioRecuperar from './FormularioRecuperar'
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom"
import CircularProgress from "../../components/CircularProgress/index";
import {message} from 'antd'

const Recuperar = () => {

    const [mostrarVideoPreload, setMostrarVideoPreload] = useState(true);
    const [mostrarVideoLogin, setMostrarVideoLogin] = useState(false);

    const MostrarVideoPreload = () => {
        setMostrarVideoLogin(true);
        setTimeout(() => {
            setMostrarVideoPreload(false);
        }, 3000)
    };

    const dispatch = useDispatch();

    const {
        loader, 
        alertMessage, 
        showMessage,
        authUser, 
        mostrarForm
    }= useSelector(({auth}) => auth);
    const history = useHistory();

    useEffect(() => {
        if (authUser !== null) {
            history.push('/sistema/categorias');
        }
    });


    return (
        <div id="Contenedor-Login">
           <FormularioRecuperar
                mostrarVideoLogin = {true}
            />


            {
                loader 
                ? <div className="gx-loader-view">
                    <CircularProgress/>
                </div> 
                : null
            }
            {
                showMessage 
                ? message.error(alertMessage.toString()) 
                : null
            }

        </div>
    )
}

export default Recuperar