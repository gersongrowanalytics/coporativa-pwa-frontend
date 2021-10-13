import React, {Component}from 'react'
import '../../../styles/Sistema/Dashboard/SliderSubMenus.css'
import {Link} from "react-router-dom"
import { Tooltip } from 'antd';

class SliderSubMenus extends Component {
    constructor(props){
        super(props);
        this.state = {
            subioArchivo : false,
            topeSliderIzquierda : true,
            numeroClickDerecha : 0
        }
        this.seleccSiguientePagina = React.createRef()
        this.seleccionarBoton = this.seleccionarBoton.bind(this)
    }

    seleccionarBoton(event){
        // console.log(event)
        let leftPosition = "a"

        const btn = event.currentTarget;
        const slickList = event.currentTarget.parentNode;
        const track = event.currentTarget.parentNode.querySelector('#track');
        const slick = track.querySelectorAll('.slick');

        const slickWidth = slick[0].offsetWidth;
        
        const trackWidth = track.offsetWidth;
        const listWidth = slickList.offsetWidth;

        track.style.left == ""  
        ? leftPosition = track.style.left = 0 
        : leftPosition = parseFloat(track.style.left.slice(0, -2) * -1);

        btn.dataset.button == "button-prev" 
        ? this.prevAction(leftPosition,slickWidth,track) 
        : this.nextAction(leftPosition,trackWidth,listWidth,slickWidth,track)
    }

    prevAction(leftPosition,slickWidth,track){
        this.setState({
            topeSliderDerecha : false,
            numeroClickDerecha : this.state.numeroClickDerecha - 1
        })

        if(leftPosition > 0) {
            track.style.left = `${-1 * (leftPosition - slickWidth)}px`;
            // console.log(track.style.left)
            if(track.style.left == "0px"){
                this.setState({
                    topeSliderIzquierda : true
                })
            }
        }else{
            track.style.left = `0px`;
            this.setState({
                topeSliderIzquierda : true
            })
        }
    }

    nextAction(leftPosition,trackWidth,listWidth,slickWidth,track){

        let numeroDerecha = this.state.numeroClickDerecha + 1
        this.setState({
            topeSliderIzquierda : false,
            numeroClickDerecha : this.state.numeroClickDerecha + 1
        })
        if(leftPosition < (trackWidth - listWidth)) {
            track.style.left = `${-1 * (leftPosition + slickWidth)}px`;
            
            if(numeroDerecha ==  this.props.moduloSeleccionado.smos.length - 4){
                this.setState({
                    topeSliderDerecha : true
                })
            }
        }else{
            // track.style.left = `${-1 * (leftPosition + 100)}px`;
            this.setState({
                topeSliderDerecha : true
            })
        }
    }

    componentDidMount(){
        
        if(this.props.moduloSeleccionado){
            if(this.props.moduloSeleccionado.smos){
                if(this.props.moduloSeleccionado.smos.length > 4){
                    this.setState({
                        topeSliderDerecha : false
                    })
                }else{
                    this.setState({
                        topeSliderDerecha : true
                    })
                }
            }
        }

        if(this.props.moduloSeleccionado){
            if(this.props.moduloSeleccionado.smos){
                this.props.moduloSeleccionado.smos.map((submodulo, posicion) => {
                    if(submodulo.smoruta == window.location.pathname){

                        let numeroClick = 4

                        if(this.props.moduloSeleccionado.smos.length <= 3){

                        }else if((posicion+1) > 3){
                            let numeroSiguientes = (posicion+1) - numeroClick 
                            this.seleccSiguientePagina.current.click();
                            this.seleccSiguientePagina.current.click();
                            console.log(numeroSiguientes)

                            for(let x = 0; x < Math.ceil(numeroSiguientes); x++){
                                this.seleccSiguientePagina.current.click();
                                console.log('siguiente: '+(Math.ceil(x)+1))
                            }
                        }
                        
                        // else if((posicion+1) == this.props.moduloSeleccionado.smos.length){
                        //     let numeroSiguientes = ((posicion+1) / 3)+.5
                            
                        //     for(let x = 0; x < Math.ceil(numeroSiguientes)+1; x++){
                        //         // this.refs.seleccionarSiguientePagina.click();
                        //         this.seleccSiguientePagina.current.click();
                        //         console.log('siguiente: '+(Math.ceil(x)+1))
                        //     }

                        //     console.log(numeroSiguientes)
                        //     console.log(Math.ceil(numeroSiguientes)+1)

                        // }
                        
                        
                        // else if((posicion+1) % 3 == 0 ){
                        //     let numeroSiguientes = posicion / 3
                            
                        //     for(let x = 0; x < numeroSiguientes; x++){
                        //         // this.refs.seleccionarSiguientePagina.click();
                        //         this.seleccSiguientePagina.current.click();
                        //     }
                        // }else if(posicion+1 > 3){
                        //     let numeroSiguientes = posicion / 3
                            
                        //     for(let x = 0; x < Math.ceil(numeroSiguientes); x++){
                        //         // this.refs.seleccionarSiguientePagina.click();
                        //         this.seleccSiguientePagina.current.click();
                        //     }
                        // }
                    }
                })
            }
        }
    }

    render() {
        return (
            // <div className="Carousel">
                <div 
                    className="slick-list" 
                    onClick={() => console.log(this.props.moduloSeleccionado)}
                >

                    {
                        this.state.topeSliderIzquierda == true
                        ?null
                        :
                        <Tooltip placement="bottom" title={"Anterior"}>
                        <div 
                            className="slick-arrow slick-prev" 
                            id="button-prev" 
                            data-button="button-prev" 
                            onClick={(e) => this.seleccionarBoton(e)}
                        >
                            <svg 
                                aria-hidden="true" 
                                focusable="false" 
                                data-prefix="fas" 
                                data-icon="chevron-left" 
                                className="svg-inline--fa fa-chevron-left fa-w-10" 
                                role="img" 
                                xmlns="http://www.w3.org/2000/svg" 
                                viewBox="0 0 320 512">
                                    <path 
                                        fill="currentColor" 
                                        d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z">
                                    </path>
                            </svg>
                        </div>
                        </Tooltip>
                    }
                    <div className="slick-track" id="track">
                        <div id="Contenedor-SubMenus-Youtube-Dashboard">
                        
                            {
                                this.props.moduloSeleccionado.smos
                                ?
                                this.props.moduloSeleccionado.smos.map((submodulo, posicion) => {
                                    return (
                                        submodulo.smonombre == "default"
                                        ?null
                                        :<Link to={submodulo.smoruta}>
                                            <div 
                                                className="slick"
                                            >
                                                <div 
                                                    id={
                                                        this.props.esFavoritos == true
                                                        ?submodulo.smoruta == window.location.pathname
                                                            ?"Tarjeta-Favorito-SubMenu-Youtube-Dashboard"
                                                            :"Tarjeta-Favorito-SubMenu-SinSeleccionar-Youtube-Dashboard"

                                                        :submodulo.smoruta == window.location.pathname
                                                            ?"Tarjeta-SubMenu-Youtube-Dashboard"
                                                            :"Tarjeta-SubMenu-SinSeleccionar-Youtube-Dashboard"
                                                    }
                                                >
                                                    <div>{submodulo.smonombre} </div>
                                                </div>
                                            </div>
                                        </Link>
                                    )
                                })
                                :null
                            }
                        </div>
                    </div>
                    {
                        this.props.moduloSeleccionado.smos
                        ?this.props.moduloSeleccionado.smos.length <= 3
                            ?null
                            :
                            this.state.numeroClickDerecha ==  this.props.moduloSeleccionado.smos.length - 3
                                ?null
                                :
                                <Tooltip placement="bottom" title={"Siguiente"}>
                                <div 
                                    className="slick-arrow slick-next" 
                                    id="button-next" 
                                    data-button="button-next" 
                                    // onclick="app.processingButton(event)"
                                    onClick={(e) => this.seleccionarBoton(e)}
                                    // ref="seleccionarSiguientePagina" 
                                    ref={this.seleccSiguientePagina}
                                >
                                    <svg 
                                        aria-hidden="true" 
                                        focusable="false" 
                                        data-prefix="fas" 
                                        data-icon="chevron-right" 
                                        className="svg-inline--fa fa-chevron-right fa-w-10" 
                                        role="img" 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        viewBox="0 0 320 512">
                                            <path 
                                                fill="currentColor" 
                                                d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z">
                                            </path>
                                    </svg>
                                </div>
                                </Tooltip>
                        :null
                    }
                    {
                        this.state.topeSliderIzquierda == true
                        ?null
                        :<div id="Animacion-Borrosa-Costado-Carousel-Izquierda-Dashboard">

                        </div>
                    }

                    {
                        this.props.moduloSeleccionado.smos
                        ?this.props.moduloSeleccionado.smos.length < 4
                            ?null
                            :this.state.numeroClickDerecha ==  this.props.moduloSeleccionado.smos.length - 4
                                ? null
                                :<div id="Animacion-Borrosa-Costado-Carousel-Derecha-Dashboard">
                                </div>
                        :null
                    }
                </div>
            // {/* </div> */}
        )
    }
}

export default SliderSubMenus