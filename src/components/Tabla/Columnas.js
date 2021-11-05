// import { format } from 'date-fns'
// import { SelectColumnFilter} from './SeleccionarColumnaFiltro'
// import  IconoAdministradorTipoUsuario  from '../../assets/images/iconos/Administrador/tipoUsuario.png'
// import '../../styles/Sistema/Administrador/TiposUsuario/TiposUsuario.css'
// import Moment from "moment";
// import {Switch, Input } from "antd";
// import { Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";

// Moment.locale("en");
// const dispatch = useDispatch();

// const {
//   cargandoTablaTiposUsuarios,
//   columnasTablaTiposUsuarios,
//   listaTiposUsuarios,
// } = useSelector(
//   ({ controlesAccesosTiposUsuarios }) => controlesAccesosTiposUsuarios
// );
// export const Columnas = [
//   {
//     Header: 'Tipo de Usuario',
//     accessor: 'tpunombre',
//     aggregate: 'uniqueCount',
//     Filter: SelectColumnFilter,
//     Cell:({value,row})=>{
//       return <><img src={IconoAdministradorTipoUsuario} id="Icono-Lista-Administrador" />
//         {
//             row.original.editando == true
//             ?<Input value={value} style={{width:'140px'}}/>
//             :<span id="Texto-Lista-Administrador">{value}</span>
//         }
//       </>
//       // console.log();
//       // return  <div></div>
//     },
//     Aggregated: ({ value }) => `${value} Tipos de usuario únicos`,
//   },
//   {
//     Header: 'Permisos',
//     accessor: 'tpuid',
//     aggregate: 'uniqueCount',
//     Filter: SelectColumnFilter,
//     Cell:({value})=>{
//       return <>
//         <Link to={"/Sistema/administrador/tipos-usuario/permisos"} onClick={() => dispatch(ObtenerPermisosTipoUsuarioReducer(dato.tpuid))}>
//               <div id="Texto-Tabla-Tipos-Usuarios-Administrador">Permisos</div>
//         </Link>
//       </>
//     },
//     Aggregated: ({ value }) => `${value} Permisos únicos`,
//   },
//   {
//     Header: 'Fecha de creación',
//     accessor: 'created_at',
//     aggregate: 'uniqueCount',
//     Cell: ({ value }) => {
//       return Moment(value).format('D MMM')
//     },
//     Aggregated: ({ value }) => `${value} Fechas de creación únicas`,
//   },
//   {
//     Header: 'Estado de activacion',
//     accessor: 'estid',
//     aggregate: 'uniqueCount',
//     Cell:({value})=>{
//       return <>
//         <Switch
//             size="small"
//             // disabled={
//             //   dato.editando == true
//             //   ?false
//             //   :true
//             // }
//             defaultChecked={
//              value == 1
//               ?true
//               :false
//             }
//             // onChange={(e) => dispatch(CambiarEstadoTipoUsuarioReducer(posicion, e))}
//         />
//         <div id="Texto-Estado-Tipo-Usuarios-Administrador">
//             {
//                 value == 1
//                   ?"Activado"
//                   :"Desactivado"
//             }
//         </div>
//       </>
//     },
//     Aggregated: ({ value }) => `${value} Estados únicos`,
//   },
//   {
//     Header: 'Opciones',
//     disableFilters: true,
//     defaultCanSort: false,
//     Cell:({value})=>{
//       return <>
      
//                                     {/* dato.editando == true
//                                     ?<div>
//                                         <img
//                                             onClick={() => dispatch(HabilitarEditarTipoUsuarioReducer(posicion))}
//                                              src={iconoCancelar}  id="Icono-Fila-Editar-Administrador"/>
//                                          <img
//                                             onClick={() => dispatch(HabilitarEditarTipoUsuarioReducer(posicion))}
//                                           src={iconoAceptar}  id="Icono-Fila-Editar-Administrador"/>
//                                      </div>
//                                      :<img
//                                          onClick={() => dispatch(HabilitarEditarTipoUsuarioReducer(posicion))}
//                                         src={IconoEditar}  id="Icono-Fila-Editar-Administrador"/>
//                                         </> */}
                                 
//     }
    
//   },
//   // {
//   //   Header: 'carexito',
//   //   accessor: 'carexito',
//   //   aggregate: 'uniqueCount',
//   //   Aggregated: ({ value }) => `${value} Unique carexito`,
//   // },
//   // {
//   //   Header: 'carurl',
//   //   accessor: 'carurl',
//   //   aggregate: 'average',
//   //   Aggregated: ({ value }) => `${Math.round(value * 100) / 100} (carurl)`,
//   // },
//   // {
//   //   Header: 'created_at',
//   //   accessor: 'created_at',
//   //   aggregate: 'uniqueCount',
//   //   Cell: ({ value }) => {
//   //     return format(new Date(value), 'dd/MM/yyyy')
//   //   },
//   //   Aggregated: ({ value }) => `${value} Unique created_at`,
//   // }
// ]

