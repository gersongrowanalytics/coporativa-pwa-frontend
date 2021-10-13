import React from 'react'
import '../../../styles/Sistema/DescargarData/SliderExcelv2.css'
import { Carousel } from 'antd'
// import ImagenExcel from 'assets/images/DescargarData/excel.png'
// import ImagenExcelDos from 'assets/images/DescargarData/exceldos.PNG'
// import ImagenExcelTres from 'assets/images/DescargarData/exceltres.PNG'
// import ImagenExcelCuatro from 'assets/images/DescargarData/excelcuatro.PNG'
// import ImagenExcelCinco from 'assets/images/DescargarData/excelcinco.PNG'

const SliderExcelv2 = (props) => {

    const contentStyle = {
        border: "3px solid #1876F2",
        width:"100%",
        height:"490px",
        boxSizing: "border-box",
        borderRadius: "9px",
        padding:'20px',
        // background: 'red'
    };

    return (
        <div id="Contenedor-Slider-SliderExcelv2">
            <Carousel 
                autoplay
            >
                {
                    props.imagenes.map((imagen) => {
                        return (
                            <div >
                                <div style={contentStyle} onClick={() => console.log(props.imagenes)}>
                                    <img 
                                        src={imagen.iadimagen} 
                                        style={{
                                            width:"100%",
                                            height:"450px",
                                        }}
                                    />
                                </div>
                            </div>
                        )
                    })
                }
            </Carousel>
        </div>
    )
}

export default SliderExcelv2
