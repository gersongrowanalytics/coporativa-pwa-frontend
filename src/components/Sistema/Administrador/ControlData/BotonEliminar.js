import React from 'react'
import {Modal} from 'antd'
import IconoEliminar from '../../../../assets/images/iconos/Administrador/eliminar.png'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import {useDispatch, useSelector} from "react-redux";
import {EliminarDataReducer} from "../../../../appRedux/actions/Administrador/ControlData/ControlData"

const BotonEliminar = () => {

    const { confirm } = Modal;
    const dispatch = useDispatch();

    const { 
        archivosSeleccionados,
    } = useSelector(({controlData}) => controlData);

    function mostrarModalEliminar() {
        confirm({
            title: '¿Estas seguro de eliminar estos archivos?',
            icon: <ExclamationCircleOutlined />,
            content: 'Recuerda que este cambio es instantaneo en los clientes',
            okText: 'Sí',
            okType: 'danger',
            cancelText: 'No',
            async onOk() {

                await dispatch(EliminarDataReducer())
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    return (
        <div 
            style={archivosSeleccionados.length > 0?{marginLeft:'20px'} :{}}
            id={archivosSeleccionados.length > 0?"Contenedor-Btn-Crear-Administrador" :"Contenedor-Btn-Eliminar-Administrador"} 
            onClick={mostrarModalEliminar}>
            <div id={archivosSeleccionados.length > 0?"Texto-Btn-Crear-Administrador" :"Texto-Btn-Eliminar-Administrador"}>
                <img src={IconoEliminar} width={"20px"} /> Eliminar
            </div>
        </div>
    )
}

export default BotonEliminar
