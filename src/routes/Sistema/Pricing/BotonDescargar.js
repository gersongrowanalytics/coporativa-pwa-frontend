import React, {useState} from 'react'
import config from '../../../config'
import {Row, Col, Button, message} from "antd";


const BotonDescargar = (props) => {
    const [cargando, setCargando] = useState(false)

    const pagid = props.pagid
    const pagnombre = props.pagnombre
    const obtenerData = props.obtenerData

    return (
        <Button
            // onClick={() => ObtenerDataReducer(pagina.pagid)}
            onClick={ async () => {
                setCargando(true)
                await obtenerData()
                setCargando(false)
            }}
            loading={cargando}
        >
            Descargar Información
        </Button>
    )
}

export default BotonDescargar
