import React, { useMemo, useState, useEffect } from "react";
import { Row, Col, Switch, Input, Button, Spin } from "antd";
import { LeftOutlined, RightOutlined, LoadingOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from "react-redux";
import {
  ObtenerListaTiposUsuariosReducer,
  HabilitarEditarTipoUsuarioReducer,
  CambiarEstadoTipoUsuarioReducer,
  cancelarPeticionFetch,
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
import { SelectColumnFilter } from "../../../Tabla/SeleccionarColumnaFiltro";

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

  // useEffect(() => {
  //   dispatch(ObtenerListaTiposUsuariosReducer());
  // }, []);

  useEffect(() => {
    setdata(listaTiposUsuarios);
  }, listaTiposUsuarios);

  const cargarDatosTabla = () => {
    dispatch(ObtenerListaTiposUsuariosReducer());
    setdata(listaTiposUsuarios);
    setAllFilters([]);
  };

  useEffect(() => {
    cargarDatosTabla();
  }, []);

  const Columnas = [
    {
      Header: "Tipo de Usuario",
      accessor: "tpunombre",
      aggregate: "uniqueCount",
      Filter: SelectColumnFilter,
      Cell: ({ value, row }) => {
        return (
          <>
            <img
              src={IconoAdministradorTipoUsuario}
              id="Icono-Lista-Administrador"
            />
            {row.original.editando == true ? (
              <Input value={value} style={{ width: "140px" }} />
            ) : (
              <span id="Texto-Lista-Administrador">{value}</span>
            )}
          </>
        );
      },
      Aggregated: ({ value }) => `${value} Tipos de usuario únicos`,
    },
    {
      Header: "Permisos",
      accessor: "tpuid",
      aggregate: "uniqueCount",
      disableFilters: true,
      Filter: SelectColumnFilter,
      Cell: ({ value }) => {
        return (
          <>
            <Link
              to={"/Sistema/administrador/tipos-usuario/permisos"}
              onClick={() => dispatch(ObtenerPermisosTipoUsuarioReducer(value))}
            >
              <div id="Texto-Tabla-Tipos-Usuarios-Administrador">Permisos</div>
            </Link>
          </>
        );
      },
      Aggregated: ({ value }) => `${value} Permisos únicos`,
    },
    {
      Header: "Fecha de creación",
      accessor: "created_at",
      aggregate: "uniqueCount",
      disableFilters: true,
      Cell: ({ value }) => {
        return Moment(value).format("D MMM");
      },
      Aggregated: ({ value }) => `${value} Fechas de creación únicas`,
    },
    {
      Header: "Estado de activacion",
      accessor: "estid",
      aggregate: "uniqueCount",
      disableFilters: true,
      Cell: ({ value, row }) => {
        return (
          <>
            <Switch
              size="small"
              disabled={row.original.editando == true ? false : true}
              defaultChecked={value == 1 ? true : false}
              onChange={(e) =>
                dispatch(CambiarEstadoTipoUsuarioReducer(row.index, e))
              }
            />
            <div id="Texto-Estado-Tipo-Usuarios-Administrador">
              {value == 1 ? "Activado" : "Desactivado"}
            </div>
          </>
        );
      },
      Aggregated: ({ value }) => `${value} Estados únicos`,
    },
    {
      Header: "Opciones",
      disableFilters: true,
      defaultCanSort: false,
      Cell: ({ row }) => {
        return (
          <>
            {row.original.editando == true ? (
              <div>
                <img
                  onClick={() =>
                    dispatch(HabilitarEditarTipoUsuarioReducer(row.index))
                  }
                  src={iconoCancelar}
                  id="Icono-Fila-Editar-Administrador"
                />
                <img
                  onClick={() =>
                    dispatch(HabilitarEditarTipoUsuarioReducer(row.index))
                  }
                  src={iconoAceptar}
                  id="Icono-Fila-Editar-Administrador"
                />
              </div>
            ) : (
              <img
                onClick={() =>
                  dispatch(HabilitarEditarTipoUsuarioReducer(row.index))
                }
                src={IconoEditar}
                id="Icono-Fila-Editar-Administrador"
              />
            )}
          </>
        );
      },
    },
  ];

  const columns = useMemo(() => Columnas, listaTiposUsuarios);
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
      <div className="Botones-Carga-Cancelar-Datos">
        <div onClick={cargarDatosTabla}>Recargar datos</div>
        <div onClick={cancelarPeticionFetch}>Cancelar carga de datos</div>
      </div>
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
        <Col
          xl={24}
          lg={24}
          md={24}
          sm={24}
          xs={24}
          className="responsiveTabla"
        >
          <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} spinning={cargandoTablaTiposUsuarios}>
          <div className="tabla">
            <div className="paginacion" style={{display:'flex',justifyContent:'flex-end'}}>
              <span style={{ display:'flex',alignItems:'center', marginBottom:'13px',marginRight:'10px' }}>
                <strong>
                  {pageIndex + 1}-{pageOptions.length} de {pageCount}
                </strong>{" "}
              </span>
              <Button type="link" style={{marginRight:'0px'}} icon={<LeftOutlined />} onClick={() => previousPage()} disabled={!canPreviousPage}/>
              <Button type="link" icon={<RightOutlined />} onClick={() => nextPage()} disabled={!canNextPage}/>
            </div>
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
                          <td
                            align="center"
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
          </div>
          </Spin>
        </Col>
      </Row>
    </Col>
  );
};

export default TablaTiposUsuarios;
