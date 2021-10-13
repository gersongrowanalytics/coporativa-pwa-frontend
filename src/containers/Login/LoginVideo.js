import React,{useState, useEffect} from 'react'
import '../../styles/Login/LoginVideo.css'
import BannerLogin from './BannerLogin'
import FormularioLogin from './FormularioLogin'
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom"
import CircularProgress from "../../components/CircularProgress/index";
import {message} from 'antd'
import {setMostrarVideoPreload, setMostrarVideoLogin} from '../../appRedux/actions/Login'

const LoginVideo = () => {

    // const [setMostrarVideoPreload, setMostrarVideoPreload] = useState(true);
    // const [mostrarVideoLogin, setMostrarVideoLogin] = useState(false);

    const dispatch = useDispatch();
    
    const MostrarVideoPreload = () => {
        dispatch(setMostrarVideoLogin(true));
        setTimeout(() => {
            dispatch(setMostrarVideoPreload(false))
        }, 1000)
    }; 

    const {
        loader, 
        alertMessage, 
        showMessage,
        authUser, 
    }= useSelector(({auth}) => auth);

    const {
        mostrarVideoPreload,
        mostrarVideoLogin
    }= useSelector(({login}) => login);

    const history = useHistory();

    useEffect(() => {
        if (authUser !== null) {
            history.push('/');
        }
    });


    return (
        <div id="Contenedor-Login">
            {/* <FormularioLogin
                mostrarVideoLogin = {mostrarVideoLogin}
            /> */}
            {
                mostrarVideoLogin == true
                ?<FormularioLogin
                    mostrarVideoLogin = {mostrarVideoLogin}
                />
                :null
            }
            
            <BannerLogin
                mostrarVideoPreload = {mostrarVideoPreload}
                setMostrarVideoPreload = {MostrarVideoPreload}
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

export default LoginVideo