import React, { useMemo, useState, useEffect } from "react";
import { Row, Col, Switch, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  ObtenerListaTiposUsuariosReducer,
  HabilitarEditarTipoUsuarioReducer,
  CambiarEstadoTipoUsuarioReducer,
} from "../../../../appRedux/actions/ControlAcceso/TiposUsuarios/TiposUsuarios";
import iconoAceptar from "../../../../assets/images/iconos/Tabla/aceptar.png";
import iconoCancelar from "../../../../assets/images/iconos/Tabla/cancelar.png";
import IconoEditar from "../../../../assets/images/iconos/Tabla/editar.svg";
// import IconoEliminar from 'assets/images/iconos/Tabla/tacho.png'
import IconoAdministradorTipoUsuario from "../../../../assets/images/iconos/Administrador/tipoUsuario.png";
import { Link } from "react-router-dom";
import { ObtenerPermisosTipoUsuarioReducer } from "../../../../appRedux/actions/ControlAcceso/TiposUsuarios/PermisosTipoUsuario";
import Moment from "moment";
import "../../../../styles/Sistema/Administrador/TiposUsuario/TiposUsuario.css";

import {
  useTable,
  usePagination,
  useFilters,
  useExpanded,
  useGroupBy,
  useSortBy,
} from "react-table";
import { Checkbox } from "../../../Tabla/Checkbox";
import { ColumnFilter } from "../../../Tabla/ColumnaFiltro";
// import { Columnas } from "../../../Tabla/Columnas";
import { format } from 'date-fns'
import { SelectColumnFilter} from '../../../Tabla/SeleccionarColumnaFiltro'


const TablaTiposUsuarios = () => {
  Moment.locale("en");
  const dispatch = useDispatch();

  const {
    cargandoTablaTiposUsuarios,
    columnasTablaTiposUsuarios,
    listaTiposUsuarios,
  } = useSelector(
    ({ controlesAccesosTiposUsuarios }) => controlesAccesosTiposUsuarios
  );
  // console.log(listaTiposUsuarios);
  // console.log(cargandoTablaTiposUsuarios);
  // console.log(columnasTablaTiposUsuarios)

  useEffect(() => {
    dispatch(ObtenerListaTiposUsuariosReducer());
    // setdata(listaTiposUsuarios.map(e=>{return {...e,editandow:false}}));
    setdata(listaTiposUsuarios)
  }, []);

 const Columnas = [
    {
      Header: 'Tipo de Usuario',
      accessor: 'tpunombre',
      aggregate: 'uniqueCount',
      Filter: SelectColumnFilter,
      Cell:({value,row})=>{
        return <>
          <img src={IconoAdministradorTipoUsuario} id="Icono-Lista-Administrador" />
          {
              row.original.editando == true
              ?<Input value={value} style={{width:'140px'}}/>
              :<span id="Texto-Lista-Administrador">{value}</span>
          }
        </>
      },
      Aggregated: ({ value }) => `${value} Tipos de usuario únicos`,
    },
    {
      Header: 'Permisos',
      accessor: 'tpuid',
      aggregate: 'uniqueCount',
      Filter: SelectColumnFilter,
      Cell:({value})=>{
        return <>
          <Link to={"/Sistema/administrador/tipos-usuario/permisos"} onClick={() => dispatch(ObtenerPermisosTipoUsuarioReducer(value))}>
                <div id="Texto-Tabla-Tipos-Usuarios-Administrador">Permisos</div>
          </Link>
        </>
      },
      Aggregated: ({ value }) => `${value} Permisos únicos`,
    },
    {
      Header: 'Fecha de creación',
      accessor: 'created_at',
      aggregate: 'uniqueCount',
      Cell: ({ value }) => {
        return Moment(value).format('D MMM')
      },
      Aggregated: ({ value }) => `${value} Fechas de creación únicas`,
    },
    {
      Header: 'Estado de activacion',
      accessor: 'estid',
      aggregate: 'uniqueCount',
      Cell:({value,row})=>{
        return <>
          <Switch
              size="small"
              disabled={
                row.original.editando == true
                ?false
                :true
              }
              defaultChecked={
               value == 1
                ?true
                :false
              }
              onChange={(e) => dispatch(CambiarEstadoTipoUsuarioReducer(row.index, e))}
          />
          <div id="Texto-Estado-Tipo-Usuarios-Administrador">
              {
                  value == 1
                    ?"Activado"
                    :"Desactivado"
              }
          </div>
        </>
      },
      Aggregated: ({ value }) => `${value} Estados únicos`,
    },
    {
      Header: 'Opciones',
      disableFilters: true,
      defaultCanSort: false,
      Cell:(props)=>{
       
       const {row}=props;
       console.log('-----------------')
       console.log(row)
      //  console.log('indice')
      //  console.log(row.index)
        return <>
        {
            row.original.editando == true
                ?<div>
                    <img
                        onClick={() => dispatch(HabilitarEditarTipoUsuarioReducer(row.index))}
                        src={iconoCancelar}  id="Icono-Fila-Editar-Administrador"/>
                    <img
                        onClick={() => dispatch(HabilitarEditarTipoUsuarioReducer(row.index))}
                        src={iconoAceptar}  id="Icono-Fila-Editar-Administrador"/>
                    </div>
                :<img
                    onClick={() => dispatch(HabilitarEditarTipoUsuarioReducer(row.index))}
                    src={IconoEditar}  id="Icono-Fila-Editar-Administrador"/>
        }
         </>
      }
      
    },
   
  ]

  const columns = useMemo(() => Columnas, []);
  const [data, setdata] = useState([]);
  const defaultColumn = React.useMemo(
    () => ({
      Filter: ColumnFilter,
    }),
    []
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    pageOptions,
    state,
    gotoPage,
    pageCount,
    setPageSize,
    prepareRow,
    allColumns,
    setAllFilters,
    getToggleHideAllColumnsProps,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
      defaultColumn,
    },
    useFilters,
    useGroupBy,
    useSortBy,
    useExpanded,
    usePagination
  );
  const { pageIndex, pageSize } = state;

  return (
    <Col xl={24} lg={24} md={24} sm={24} xs={24}>
      {/* <div className='buttons'>
          <button onClick={ cargarDatosTabla }>
             RECARGAR DATOS
          </button>
          <button onClick={cancelarPeticionFetch}>
             CANCELAR CARGA DE DATOS
          </button>
      </div> */}
      <Row>
          <Col xl={4} lg={4} md={12} sm={12} xs={24}>
            <div>
              <Checkbox {...getToggleHideAllColumnsProps()} /> Seleccionar Todos
            </div>
          </Col>

          {allColumns.map((column) => (
            <Col xl={4} lg={4} md={12} sm={12} xs={24}>
              <div key={column.id}>
                <label>
                  <input type="checkbox" {...column.getToggleHiddenProps()} />{" "}
                  {column.Header}
                </label>
              </div>
            </Col>
          ))}
      </Row>
      <Row>
        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
          <div className="tabla">
            <table {...getTableProps()}>
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th {...column.getHeaderProps()}>
                        {column.canGroupBy ? (
                          <span {...column.getGroupByToggleProps()}>
                            {column.isGrouped ? "🛑 " : "👊 "}
                          </span>
                        ) : null}
                        {column.render("Header")}
                        <span
                          {...column.getHeaderProps(
                            column.getSortByToggleProps()
                          )}
                        >
                          {column.isSorted
                            ? column.isSortedDesc
                              ? " 🔽"
                              : " 🔼"
                            : "  ➖"}
                        </span>
                        <div className="campos-Filtros">
                          {column.canFilter ? column.render("Filter") : null}
                        </div>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {page.map((row) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map((cell) => {
                        return (
                          <td align="center"
                            {...cell.getCellProps()}
                            style={{
                              background: cell.isGrouped
                                ? "#0aff0082"
                                : cell.isAggregated
                                ? "#ffa50078"
                                : cell.isPlaceholder
                                ? "#ff000042"
                                : "white",
                            }}
                          >

                            {cell.isGrouped ? (
                              <>
                                <span {...row.getToggleRowExpandedProps()}>
                                  {row.isExpanded ? "👇" : "👉"}
                                </span>{" "}
                                {cell.render("Cell")} ({row.subRows.length})
                              </>
                            ) : cell.isAggregated ? (
                              cell.render("Aggregated")
                            ) : cell.isPlaceholder ? null : ( 
                              cell.render("Cell")
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="paginacion">
              <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                {"<<"}
              </button>{" "}
              <button
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
                Previous
              </button>{" "}
              <button onClick={() => nextPage()} disabled={!canNextPage}>
                Next
              </button>{" "}
              <button
                onClick={() => gotoPage(pageCount - 1)}
                disabled={!canNextPage}
              >
                {">>"}
              </button>{" "}
              <span style={{margin:'3px 9px'}}>
                Page{" "}
                <strong>
                  {pageIndex + 1} of {pageOptions.length}
                </strong>{" "}
              </span>
              <span>
                | Go to page:{" "}
                <input
                  type="number"
                  defaultValue={pageIndex + 1}
                  onChange={(e) => {
                    const pageNumber = e.target.value
                      ? Number(e.target.value) - 1
                      : 0;
                    gotoPage(pageNumber);
                  }}
                  style={{ width: "50px" }}
                />
              </span>{" "}
              <select
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
              >
                {[10, 25, 50].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </Col>
      </Row>
    </Col>

    // <Col xl={24} lg={24} md={24} sm={24} xs={24} id="Contenedor-Responsive">
    //     {
    //         listaTiposUsuarios.map((dato, posicion) => {
    //             return (
    //                 <Row id="Fila-Tabla-Administrador">
    //                     <Col xl={6} lg={6} md={6} sm={11} xs={18}>
    //                         <div>
    //                             <img src={IconoAdministradorTipoUsuario} id="Icono-Lista-Administrador" />
    //                             {
    //                                 dato.editando == true
    //                                 ?<Input value={dato.tpunombre} style={{width:'140px'}}/>
    //                                 :<span id="Texto-Lista-Administrador">{dato.tpunombre}</span>
    //                             }
    //                         </div>
    //                     </Col>
    //                     <Col xl={6} lg={6} md={6} sm={6} xs={6} style={{ alignSelf: "center"}}>
    //                         <Link to={"/Sistema/administrador/tipos-usuario/permisos"} onClick={() => dispatch(ObtenerPermisosTipoUsuarioReducer(dato.tpuid))}>
    //                             <div id="Texto-Tabla-Tipos-Usuarios-Administrador">Permisos</div>
    //                         </Link>
    //                     </Col>

    //                     <Col xl={4} lg={4} md={4} sm={7} xs={7} style={{display:'flex', alignItems: "center"}}>
    //                         {Moment(dato.created_at).format('D MMM')}
    //                     </Col>

    //                     <Col xl={4} lg={4} md={4} sm={12} xs={7} style={{display:'flex', alignItems: "center"}}>
    //                         <Switch
    //                             size="small"
    //                             disabled={
    //                                 dato.editando == true
    //                                 ?false
    //                                 :true
    //                             }
    //                             defaultChecked={
    //                                 dato.estid == 1
    //                                 ?true
    //                                 :false
    //                             }

    //                             onChange={(e) => dispatch(CambiarEstadoTipoUsuarioReducer(posicion, e))}
    //                         />
    //                         <div id="Texto-Estado-Tipo-Usuarios-Administrador">
    //                             {
    //                                 dato.estid == 1
    //                                 ?"Activado"
    //                                 :"Desactivado"
    //                             }
    //                         </div>
    //                     </Col>

    //                     <Col xl={4} lg={4} md={4} sm={12} xs={10} style={{textAlignLast: "right"}}>
    //                         {
    //                             dato.editando == true
    //                             ?<div>
    //                                 <img
    //                                     onClick={() => dispatch(HabilitarEditarTipoUsuarioReducer(posicion))}
    //                                     src={iconoCancelar}  id="Icono-Fila-Editar-Administrador"/>
    //                                 <img
    //                                     onClick={() => dispatch(HabilitarEditarTipoUsuarioReducer(posicion))}
    //                                     src={iconoAceptar}  id="Icono-Fila-Editar-Administrador"/>
    //                             </div>
    //                             :<img
    //                                 onClick={() => dispatch(HabilitarEditarTipoUsuarioReducer(posicion))}
    //                                 src={IconoEditar}  id="Icono-Fila-Editar-Administrador"/>
    //                         }
    //                     </Col>
    //                 </Row>
    //             )
    //         })
    //     }

    // </Col>
  );
};

export default TablaTiposUsuarios;
