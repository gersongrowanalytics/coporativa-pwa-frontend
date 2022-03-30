import React, {useEffect} from 'react'
import {Input, Switch, Spin, Select, Checkbox} from 'antd'
import {useDispatch, useSelector} from "react-redux";
import {
    ObtenerListaUsuariosReducer, 
    EditandoUsuarioReducer, 
    EditandoContraseniaUsuarioReducer,
    EditandoEstadoUsuarioReducer,
    EditarUsuarioReducer, 
    CambiarInputUsuarioReducer,
    EditandoPaisesUsuarioReducer
} from "../../../../appRedux/actions/ControlAcceso/Usuarios/Usuarios";
import iconoAceptar from '../../../../assets/images/iconos/Tabla/aceptar.png';
import iconoCancelar from '../../../../assets/images/iconos/Tabla/cancelar.png';
import IconoMundo from '../../../../assets/images/iconos/Tabla/mundo.svg';
import IconoEditarLapiz from '../../../../assets/images/iconos/Tabla/editar.svg';
import { EyeInvisibleOutlined, EyeTwoTone, LoadingOutlined } from '@ant-design/icons';
import {ObtenerListaTiposUsuariosReducer} from "../../../../appRedux/actions/ControlAcceso/TiposUsuarios/TiposUsuarios";
import Moment from 'moment';

const TablaUsuarios = () => {

    const dispatch = useDispatch();
    
    const {
        cargandoTablaUsuarios,
        columnasTablaUsuarios,
        listaUsuarios
    } = useSelector(({controlesAccesosUsuarios}) => controlesAccesosUsuarios);
    const {
        listaTiposUsuarios
    } = useSelector(({controlesAccesosTiposUsuarios}) => controlesAccesosTiposUsuarios);
    
    const {listaPaises} = useSelector(({auth}) => auth);

    useEffect(() => {
        dispatch(ObtenerListaUsuariosReducer())
        dispatch(ObtenerListaTiposUsuariosReducer())
    }, [])

    Moment.locale('en');
    
    return (
        <div id="Contenedor-Tabla-Usuario-Administrador">
            <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} spinning={cargandoTablaUsuarios}>
                <table id="Tabla-Usuario-Administrador">
                    <thead>
                        <tr id="Fila-Cabecera-Tabla-Usuario-Administrador" >
                            {/* <th id="Texto-Cabecera-Tabla-Usuario-Administrador"></th> */}
                            <th id="Texto-Cabecera-Tabla-Usuario-Administrador">Tipo de Usuario</th>
                            <th id="Texto-Cabecera-Tabla-Usuario-Administrador"></th>
                            <th id="Texto-Cabecera-Tabla-Usuario-Administrador">Nombre Completo</th>
                            <th id="Texto-Cabecera-Tabla-Usuario-Administrador">Usuario</th>
                            <th id="Texto-Cabecera-Tabla-Usuario-Administrador">Correo </th>
                            <th id="Texto-Cabecera-Tabla-Usuario-Administrador">Contraseña</th>
                            <th id="Texto-Cabecera-Tabla-Usuario-Administrador">Fecha de Creación</th>
                            <th id="Texto-Cabecera-Tabla-Usuario-Administrador">Fecha de Caducidad</th>
                            <th id="Texto-Cabecera-Tabla-Usuario-Administrador">Estado</th>
                            <th id="Texto-Cabecera-Tabla-Usuario-Administrador">Editar</th>
                        </tr>
                    </thead>
                    
                    <tbody style={{marginTop: '20px'}}>
                        {
                            listaUsuarios.map((archivo, posicion) => {
                                return(
                                    <tr id="Fila-Cuerpo-Tabla-Usuario-Administrador" >
                                        {/* <td id="Texto-Cuerpo-Tabla-Usuario-Administrador"></td> */}
                                        <td 
                                            id="Texto-Cuerpo-Tabla-Usuario-Administrador" style={{}} 
                                            className={archivo.editando == true ? "Texto-Cuerpo-Tabla-Usuario-Administrador": ""}
                                        >

                                            <div style={{marginRight:'10px', display:'flex'}}>
                                                <div style={{marginRight:'8px'}}>
                                                    <Checkbox ></Checkbox >
                                                </div>
                                                {
                                                    archivo.editando == true
                                                    ?<Select 
                                                        defaultValue={archivo.tpuid}
                                                        id="Input-Crear-Usuario-Administrador" 
                                                        onChange={(e) => dispatch(CambiarInputUsuarioReducer(posicion, "tpuid", e))}
                                                        style={{ width: "100%", }} >
                                                        {
                                                            listaTiposUsuarios.map((tipousuario) => {
                                                                return ( 
                                                                    <Select.Option value={tipousuario.tpuid}>{tipousuario.tpunombre}</Select.Option>
                                                                )
                                                            })
                                                        }
                                                    </Select>
                                                    :archivo.tpunombre
                                                }
                                            </div>
                                        </td>
                                        
                                        
                                        <td
                                            id="Texto-Cuerpo-Tabla-Usuario-Administrador" 
                                            // className="Pais-Texto-Cuerpo-Tabla-Usuario-Administrador" 
                                            className={archivo.editando == true ? "Texto-Cuerpo-Tabla-Usuario-Administrador": "Pais-Texto-Cuerpo-Tabla-Usuario-Administrador"}
                                        >
                                            
                                            {
                                                archivo.editando == true
                                                ?<Select 
                                                    mode="multiple"
                                                    // id="Input-Crear-Usuario-Administrador" 
                                                    style={{ width: "328px", height: "41px"}} 
                                                    onChange={(e) => {
                                                        console.log(listaPaises)
                                                        console.log(e)
                                                        dispatch(EditandoPaisesUsuarioReducer(posicion, e))
                                                    }}
                                                    autoComplete={"off"}
                                                    allowClear
                                                    maxTagCount={2}
                                                    defaultValue={
                                                        archivo.paises.length > 0
                                                        ?archivo.paises.map( x => x.paiid)
                                                        :[]
                                                    }
                                                >
                                                    {
                                                        listaPaises.map((pais) => {
                                                            return ( 
                                                                <Select.Option value={pais.paiid}>{pais.painombre}</Select.Option>
                                                            )
                                                        })
                                                    }
                                                </Select>
                                                :
                                                <>
                                                    {
                                                        archivo.usupaistodos == 1
                                                            ?null
                                                            :archivo.paises.length > 0
                                                                ?archivo.paises.length > 1
                                                                    ?<div id="Contenedor-Lista-Pais-Fila-Tabla-Usuario-Administrador">
                                                                        {
                                                                            archivo.paises.map((pais) => {
                                                                                return (
                                                                                    <img 
                                                                                        src={
                                                                                            pais.paiicono
                                                                                        }

                                                                                        style={{width:'40px'}}
                                                                                    />
                                                                                )
                                                                            })
                                                                        }
                                                                    </div>
                                                                    :null
                                                                :null
                                                    }
                                                    <img 
                                                        src={
                                                            archivo.usupaistodos == 1
                                                            ?IconoMundo
                                                            :archivo.paises.length > 0
                                                                ?archivo.paises.length > 1
                                                                    ?archivo.paises[0]['paiiconomas']
                                                                    :archivo.paises[0]['paiicono']
                                                                :null
                                                        }

                                                        style={{width:'40px'}}
                                                    />
                                                </>
                                            }
                                        </td>


                                        <td 
                                            id="Texto-Cuerpo-Tabla-Usuario-Administrador" 
                                            className={archivo.editando == true ? "Texto-Cuerpo-Tabla-Usuario-Administrador": ""}
                                        >
                                            <div>
                                                {
                                                    archivo.editando == true
                                                    ?archivo.pernombrecompleto
                                                    :archivo.pernombrecompleto
                                                }
                                            </div>
                                        </td>
                                        <td 
                                            id="Texto-Cuerpo-Tabla-Usuario-Administrador"
                                            className={archivo.editando == true ? "Texto-Cuerpo-Tabla-Usuario-Administrador": ""}
                                        >
                                            {
                                                archivo.editando == true
                                                ?<Input 
                                                    onChange={(e) => dispatch(CambiarInputUsuarioReducer(posicion, "usuusuario", e.target.value))}
                                                    value={archivo.usuusuario} />
                                                :archivo.usuusuario
                                            }
                                        </td>
                                        <td 
                                            id="Texto-Cuerpo-Tabla-Usuario-Administrador"
                                            className={archivo.editando == true ? "Texto-Cuerpo-Tabla-Usuario-Administrador": ""}
                                        >
                                            {
                                                archivo.editando == true
                                                ?<Input 
                                                    onChange={(e) => dispatch(CambiarInputUsuarioReducer(posicion, "usucorreo", e.target.value))}
                                                    value={archivo.usucorreo} />
                                                :archivo.usucorreo
                                            }
                                        </td>
                                        <td 
                                            id="Texto-Cuerpo-Tabla-Usuario-Administrador"
                                            className={archivo.editando == true ? "Texto-Cuerpo-Tabla-Usuario-Administrador": ""}
                                        >
                                            {
                                                archivo.editando == true
                                                ?archivo.editarcontrasenia == true
                                                    ?<Input.Password 
                                                        onChange={(e) => dispatch(CambiarInputUsuarioReducer(posicion, "contrasenia", e.target.value))}
                                                        placeholder="Nueva Contraseña" 
                                                        type="password" 
                                                        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                                    />
                                                    :<Switch 
                                                        onChange={() => dispatch(EditandoContraseniaUsuarioReducer(posicion))}>
                                                            ¿Editar Contraseña?</Switch>
                                                :"**********"
                                            }
                                        </td>

                                        <td 
                                            id="Texto-Cuerpo-Tabla-Usuario-Administrador"
                                            className={archivo.editando == true ? "Texto-Cuerpo-Tabla-Usuario-Administrador": ""}
                                        >{Moment(archivo.created_at).format('D MMM')}</td>
                                        <td 
                                            id="Texto-Cuerpo-Tabla-Usuario-Administrador"
                                            className={archivo.editando == true ? "Texto-Cuerpo-Tabla-Usuario-Administrador": ""}
                                        > - </td>
                                        <td 
                                            id="Texto-Cuerpo-Tabla-Usuario-Administrador"
                                            className={archivo.editando == true ? "Texto-Cuerpo-Tabla-Usuario-Administrador": ""}
                                        >
                                            <Switch 
                                                onChange={() => dispatch(EditandoEstadoUsuarioReducer(posicion))}
                                                disabled = {
                                                    archivo.editando == true ? false : true}
                                                defaultChecked ={archivo.estid == 1 ? true : false
                                                    
                                            }>Activado</Switch>
                                        </td>

                                        <td 
                                            id="Texto-Cuerpo-Tabla-Usuario-Administrador" 
                                            className={archivo.editando == true ? "Texto-Cuerpo-Tabla-Usuario-Administrador": ""}
                                        >
                                            {
                                                archivo.editando == true
                                                ?<div>
                                                    <img
                                                        width={"16px"}
                                                        onClick={() => dispatch(EditandoUsuarioReducer(posicion))}
                                                        src={iconoCancelar}  id="Icono-Fila-Aceptar-Editar-Administrador"
                                                        style={{marginRight:'5px'}}
                                                    />   
                                                    <img
                                                        width={"16px"}
                                                        onClick={() => dispatch(EditarUsuarioReducer(archivo))}
                                                        src={iconoAceptar}  id="Icono-Fila-Aceptar-Editar-Administrador"/>
                                                </div>
                                                :<img
                                                    onClick={() => dispatch(EditandoUsuarioReducer(posicion))}
                                                    src={IconoEditarLapiz} 
                                                    id="Icono-Fila-Editar-Administrador"/>
                                            }
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                    
                    {/* <tfoot> */}
                        {/* <div style={{margin:'28px'}} /> */}
                    {/* </tfoot> */}
                </table>
            </Spin>
        </div>
        
    )
}

export default TablaUsuarios
