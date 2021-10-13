import React from 'react'
import {Spin, Tooltip} from 'antd'
import {useSelector} from "react-redux";
import iconoTacho from '../../../assets/images/iconos/Tabla/tacho.png';
import {LoadingOutlined } from '@ant-design/icons';
import Moment from 'moment';

const TablaControlArchivos = () => {


    const { 
        cargando_tabla_control_archivos,
        tabla_control_archivos
    } = useSelector(({controlArchivos}) => controlArchivos);

    

    Moment.locale('en');
    
    return (
        
        <div id="Contenedor-Tabla-Usuario-Administrador">
            <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} spinning={cargando_tabla_control_archivos}>
                <table 
                    style={{
                        width:'100%'
                    }}
                    id="Tabla-Usuario-Administrador"
                >
                    
                    <tbody style={{marginTop: '20px'}}>
                        {
                            tabla_control_archivos.map((archivo, posicion) => {
                                return(
                                    <tr id="Fila-Cuerpo-Tabla-Usuario-Administrador" style={{paddingBottom:'20px'}}>
                                        <td id="Texto-Cuerpo-Tabla-Usuario-Administrador">
                                            <img id="Icono-Tabla-Control-Archivos" src={archivo.taricono} />
                                            <Tooltip placement="bottom" title={"Descargar Archivo"}>
                                            {
                                                <a 
                                                    id="Texto-Archivo-Tabla-Control-Archivos"
                                                    href={archivo.cararchivo} 
                                                    download=""
                                                >{archivo.carnombre}</a>
                                            }
                                            </Tooltip>
                                        </td>
                                        <td id="Texto-Cuerpo-Tabla-Usuario-Administrador">
                                            {archivo.ticnombre}
                                        </td>
                                        <td id="Texto-Cuerpo-Tabla-Usuario-Administrador">
                                            {archivo.usuusuario}
                                        </td>
                                        <td id="Texto-Cuerpo-Tabla-Usuario-Administrador">
                                            <Tooltip placement="bottom" title={"Fecha"}>
                                                {Moment(archivo.created_at).format('D MMM YYYY')}
                                            </Tooltip>
                                        </td>
                                        <td id="Texto-Cuerpo-Tabla-Usuario-Administrador">
                                            <Tooltip placement="bottom" title={"Hora"}>
                                                {Moment(archivo.created_at).format("LT")}
                                            </Tooltip>
                                        </td>
                                        <td id="Texto-Cuerpo-Tabla-Usuario-Administrador" style={{width:'100px'}}>
                                        <Tooltip placement="bottom" title={"Eliminar"}>
                                            <img
                                                src={iconoTacho} 
                                                id="Icono-Fila-Editar-Administrador"/>
                                        </Tooltip>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                    
                    <tfoot>
                        <div style={{margin:'28px'}} />
                    </tfoot>
                </table>
            </Spin>
        </div>
    )
}

export default TablaControlArchivos
