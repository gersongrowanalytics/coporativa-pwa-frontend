import React from 'react';
// import '../Estilos/PromocionCarousel.scss'
import '../../../../../styles/Sistema/CanalTradicional/App/PromocionCarousel.scss'
import {Col, Row, Card, Button, Modal, message, Spin } from "antd";
import {Link} from "react-router-dom";

// =========================
// Slide
// =========================
const confirm = Modal.confirm;

class Slide extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editando : false,
      inputPlanchas : this.props.slide.cspplanchas,
      txtValorizado : this.props.slide.cspvalorizado,

      editandoPromocion       : false,
      fileProducto            : null,
      fileBonificado          : null,
      imagenPreviewProducto   : null,
      imagenPreviewBonificado : null,
      prbid                   : 0,
      prpid                   : 0
    }
    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.handleMouseLeave = this.handleMouseLeave.bind(this)
    this.handleSlideClick = this.handleSlideClick.bind(this)
    this.imageLoaded = this.imageLoaded.bind(this)
    this.obtenerValorizado = this.obtenerValorizado.bind(this)
    this.slide = React.createRef()
    this.habilitarDesabilitarEdicionPromocion = this.habilitarDesabilitarEdicionPromocion.bind(this)
    this.seleccionarImagenProducto = this.seleccionarImagenProducto.bind(this)
    this.seleccionarImagenBonificado = this.seleccionarImagenBonificado.bind(this)
    this.mandarEditarImagenPromocion = this.mandarEditarImagenPromocion.bind(this)
  }
  
  handleMouseMove(event) {
    const el = this.slide.current
    const r = el.getBoundingClientRect()

    el.style.setProperty('--x', event.clientX - (r.left + Math.floor(r.width / 2)))
    el.style.setProperty('--y', event.clientY - (r.top + Math.floor(r.height / 2)))
  }
  
  handleMouseLeave(event) {    
    this.slide.current.style.setProperty('--x', 0)
    this.slide.current.style.setProperty('--y', 0)
  }
  
  handleSlideClick(event) {
    this.props.handleSlideClick(this.props.slide.index)
  }
  
  imageLoaded(event) {
    event.target.style.opacity = 1
  }



  // MODAL

  showConfirm() {
    confirm({
      title: '¿Desea guardar los cambios?',
      content: 'Esta opción se activará al cierre del mes',
      onCancelar() {
        console.log('Cancelar');
      },
      onAceptar(){

      }
    });
  }

  obtenerValorizado(e){
    let nuevoValor = parseInt(e.target.value)
    this.setState({
      inputPlanchas : nuevoValor
    })

    if(nuevoValor <= this.props.slide.cspcantidadplancha){
      let nuevoValorizado = nuevoValor*this.props.slide.csptotalplancha
      this.setState({
        txtValorizado : nuevoValorizado
      })
    }else{
      let nuevoValorizado = this.props.slide.cspcantidadplancha*this.props.slide.csptotalplancha
      this.setState({
        txtValorizado : nuevoValorizado
      })
    }

  }

  // SELECCIOJNAR ARCHIVOS DE  
  seleccionarImagenProducto(prpid) {
    this.setState({
      prpid : prpid
    })  
    this.refs.seleccionarImagenProductoRef.click();
  }

  seleccionarImagenBonificado(prbid) {
    this.setState({
      prbid : prbid
    })  
    this.refs.seleccionarImagenBonificadoRef.click();
  }

  async cambioInputFileProducto(event){
    event.stopPropagation();
    event.preventDefault();
    if(event.target.files.length > 0){
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onloadend = () => {
        this.setState({
          fileProducto: reader.result
        });
      };
      this.setState({
        imagenPreviewProducto :  URL.createObjectURL(event.target.files[0])
      })
    }else{
      message.error('Lo sentimos, es necesario seleccionar una imagen') 
    }
  }

  async cambioInputFileBonificado(event){
    event.stopPropagation();
    event.preventDefault();
    if(event.target.files.length > 0){
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onloadend = () => {
        this.setState({
          fileBonificado: reader.result
        });
      };
      this.setState({
        imagenPreviewBonificado :  URL.createObjectURL(event.target.files[0])
      })
    }else{
      message.error('Lo sentimos, es necesario seleccionar una imagen') 
    }
  }

  habilitarDesabilitarEdicionPromocion(){
    this.setState({
      editandoPromocion : !this.state.editandoPromocion,
      fileProducto            : null,
      fileBonificado          : null,
      imagenPreviewProducto   : null,
      imagenPreviewBonificado : null,
      prbid                   : 0,
      prpid                   : 0
    })
  }

  async mandarEditarImagenPromocion(){
    await this.props.editarImagenesPromocion(
      this.state.prpid,
      this.state.prbid,
      this.state.fileProducto,
      this.state.fileBonificado,
      this.props.posicion
    )
    this.habilitarDesabilitarEdicionPromocion()
  }

  render() {
    const { 
      index,
      imagen,
      nombre,
      url
    } = this.props.slide

    const current = this.props.current
    let classNames = 'slidePromocion'
    
    if (current === index) classNames += ' slide--currentPromocion'
    else if (current - 1 === index) classNames += ' slide--previous'
    else if (current + 1 === index) classNames += ' slide--next'
        
    return (
      <li 
        ref={this.slide}
        className={classNames} 
        onMouseMove={this.handleMouseMove}
        onMouseLeave={this.handleMouseLeave}
      >
        <Link to={"/sistema/canalTradicional/"+url}>
          <div 
            className="slide__image-wrapperPromocion"
            style={
              
              this.props.cardSeleccionado == true ?{
                border       : "4px solid #1876F2",
                boxSizing    : "border-box",
                borderRadius : "20px"
              }
              :null
            }
          >
            <div id="capaOscuridad">

            </div>

            <div 
              id="contenedorCanal" 
              style={{
                backgroundImage: "url("+imagen+")", 
                backgroundSize: '100% 100%', 
                backgroundRepeat:'no-repeat',
              }}
            >
              <div id="tituloCanal">{nombre[0]}</div>
              <div id="subTituloCanal">{nombre[1]}</div>
              
            </div>
        </div>
        </Link>
      </li>
    )
  }
}



// =========================
// Slider
// =========================

class PromocionesCarousel extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = { 
        current: 0,
        cambiando : false,

        cardSeleccionado : false,

        activarCarouselAvanzar : false,
        activarCarouselRetroceder : false,
        actualizarPosicionCarouselPequeno : false
    }
    this.handlePreviousClick = this.handlePreviousClick.bind(this)
    this.handleNextClick = this.handleNextClick.bind(this)
    this.handleSlideClick = this.handleSlideClick.bind(this)
    this.seleccionarEspecifico = this.seleccionarEspecifico.bind(this)
  }
  
  handlePreviousClick() {
    const previous = this.state.current - 1
        
    this.setState({ 
      current: (previous < 0) 
        ? this.props.slides.length - 1
        : previous
    })
  }

  seleccionarEspecifico(nuevo) {
    
    this.setState({ 
      current : nuevo
    })
  }
  
  handleNextClick() {
    const next = this.state.current + 1;
    
    this.setState({ 
      current: (next === this.props.slides.length) 
        ? 0
        : next
    })
  }
  
  handleSlideClick(index) {
    if (this.state.current !== index) {
      this.setState({
        current: index
      })
    }
  }

  funActivarCarouselAvanzar(){
    if(this.state.activarCarouselAvanzar == false){
      this.setState({
        activarCarouselAvanzar : true
      })
    }
  }

  funActicarCarouselRetroceder(){
    if(this.state.activarCarouselRetroceder == false){
      this.setState({
        activarCarouselRetroceder : true
      })
    }
  }

  funDesactivarCarousel(){
    if(this.state.activarCarouselAvanzar == true){
      this.setState({
        activarCarouselAvanzar : false
      })
    }

    if(this.state.activarCarouselRetroceder == true){
      this.setState({
        activarCarouselRetroceder : false
      })
    }
  }

  render() {
    const { current, direction, seleccionoPromocion } = this.state
    const { 
      slides, 
      heading, 
      editarPromocion, 
      colorSeleciconadoPromo, 
      porcentaje, 
      aceptarEdicionPromocionReducer, 
      scaid,
      permisos,
      editarImagenesPromocion
     } = this.props 
    const headingId = `slider-heading__${heading.replace(/\s+/g, '-').toLowerCase()}`
    const wrapperTransform = {
      'transform': `translateX(-${current * (100 / slides.length)}%)`
    }
    

    if(this.state.activarCarouselAvanzar == true){
      if(slides.length > 3){
        setTimeout(() => {
          if(this.state.activarCarouselAvanzar == true){
            if(this.state.current <= slides.length - 3){
              this.setState({
                current: this.state.current+0.1
              })
            }
          }
        }, 105);
      }
    }

    if(this.state.activarCarouselRetroceder == true){
      if(this.state.current < 0){
        this.setState({
          current: 0,
          activarCarouselRetroceder : false
        })
      }
      setTimeout(() => {
        if(this.state.activarCarouselRetroceder == true){
          if(this.state.current >= 0){
            this.setState({
              current: this.state.current-0.1
            })
          }else{
            this.setState({
              current: 0
            })
          }
        }
      }, 105);
    }

    return (
      <div 
        onClick={() => {this.setState({
          cardSeleccionado : true
        })}}
        className='sliderPromocion' aria-labelledby={headingId}>
        <ul className="slider__wrapper_promocion" style={wrapperTransform}>
          <h3 id={headingId} class="visuallyhiddenPromocion">{heading}</h3>
          
          {slides.map((slide, posicion) => {
            return (
              slide.cspcantidadcombo == 0
              ?null
              :<div
              >
                <Slide
                    key    = {posicion}
                    slide  = {slide}
                />
              </div>
            )
          })}
        </ul>
        
        <div className='contenedorSliderPromocion'>
            <div 
              onMouseLeave={() =>{
                this.funDesactivarCarousel()
              }}
              onMouseEnter={() => {
                this.funActicarCarouselRetroceder()
              }} 
              id="primeraMitadSliderPromocion" ></div>
            <div
              onMouseLeave={() =>{
                this.funDesactivarCarousel()
              }}
              onMouseEnter={() => {
                this.funActivarCarouselAvanzar()
              }} 
              id="segundaMitadSliderPromocion" >

              </div>
          </div>
    
      </div>
    )
  }
}

export default PromocionesCarousel