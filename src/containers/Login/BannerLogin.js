import React, {useEffect} from 'react'
import '../../styles/Login/BannerLogin.css'
import VideoPreload from '../../assets/Videos/Login/videopreload.m4v';
import LoginIconoFlecha from '../../assets/images/iconos/Login/flecha.png'
import IconoG from '../../assets/images/iconos/Login/g.png'

class BannerLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            idLoginPreload : 'Login-Imagen-Preload'
        };
    }
    
    animacionVideo(){
        this.setState({idLoginPreload: 'Login-Imagen-Preload-Animacion'})
        this.props.setMostrarVideoPreload()
    }

    componentDidMount(){
        setTimeout(() => {
            this.animacionVideo()
        }, 20000);
    }

    render(){
        return (
            <div 
                id={this.state.idLoginPreload}
                style={{
                    // background: `url(${ImagenPortada})`,
                    position: 'relative',
                    backgroundSize: '100% 100%',
                    backgroundRepeat : 'no-repeat',
                }}
            >
                {this.props.mostrarVideoPreload}
                <div style={{position:'absolute', width:'100%'}} className="Full-Video-Preload">
                    {
                        this.props.mostrarVideoPreload == true
                        ?<video autoPlay loop >
                            <source src={VideoPreload} type="video/mp4"/>
                            Your browser does not support the video tag.
                        </video>
                        :null
                    }
                </div>
                
                
                <div
                    id="Login-Capa-Preload"
                    onClick={() => {this.setState({idLoginPreload: 'Login-Imagen-Preload'})}}
                >
                    {
                        this.props.mostrarVideoPreload == true
                        ?<div>
                            <img width={"110px"} src={IconoG} />
                        </div>
                        :null
                    }
                </div>
                {
                    this.props.mostrarVideoPreload == true
                    ?<img 
                        onClick={() => this.animacionVideo()} 
                        src={LoginIconoFlecha} id="Login-Boton-Desaparecer-Preload" />
                    :null
                }

                {/* <button
                    id="Login-Boton-Desaparecer-Preload"
                    onClick={() => this.animacionVideo()}
                >click</button> */}
       
            </div>
        )
    }
}
  
export default BannerLogin