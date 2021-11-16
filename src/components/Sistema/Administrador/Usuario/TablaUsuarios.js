import React, { useMemo, useState, useEffect } from "react";
import { Row, Col, Input, Switch, Spin, Select, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  ObtenerListaUsuariosReducer,
  EditandoUsuarioReducer,
  EditandoContraseniaUsuarioReducer,
  EditandoEstadoUsuarioReducer,
  EditarUsuarioReducer,
  CambiarInputUsuarioReducer,
  EditandoPaisesUsuarioReducer,
  CancelarPeticionFetch
} from "../../../../appRedux/actions/ControlAcceso/Usuarios/Usuarios";
import iconoAceptar from "../../../../assets/images/iconos/Tabla/aceptar.png";
import iconoCancelar from "../../../../assets/images/iconos/Tabla/cancelar.png";
import IconoMundo from "../../../../assets/images/iconos/Tabla/mundo.svg";
import IconoEditarLapiz from "../../../../assets/images/iconos/Tabla/editar.svg";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LoadingOutlined,
  RightOutlined,
  LeftOutlined,
} from "@ant-design/icons";
import { ObtenerListaTiposUsuariosReducer } from "../../../../appRedux/actions/ControlAcceso/TiposUsuarios/TiposUsuarios";
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

const TablaUsuarios = () => {
  const dispatch = useDispatch();

  const { cargandoTablaUsuarios, columnasTablaUsuarios, listaUsuarios } =
    useSelector(({ controlesAccesosUsuarios }) => controlesAccesosUsuarios);

  const { listaTiposUsuarios } = useSelector(
    ({ controlesAccesosTiposUsuarios }) => controlesAccesosTiposUsuarios
  );

  const { listaPaises } = useSelector(({ auth }) => auth);

  Moment.locale("en");

  const cargarDatosTabla = () => {
    dispatch(ObtenerListaUsuariosReducer());
    dispatch(ObtenerListaTiposUsuariosReducer());
    setdata(listaUsuarios);
    setAllFilters([]);
  };

  useEffect(() => {
    cargarDatosTabla();
  }, []);

  useEffect(()=>{
    setdata(listaUsuarios)
  },listaUsuarios)

  const Columnas = [
    {
      Header: "Tipo de Usuario",
      accessor: "tpunombre",
      aggregate: "uniqueCount",
      Filter: SelectColumnFilter,
      Cell: ({ value, row }) => {
        return (
          <div id="Texto-Cuerpo-Tabla-Usuario-Administrador" style={{}}
               className={row.original.editando == true ? "Texto-Cuerpo-Tabla-Usuario-Administrador": ""}>
            <div style={{ marginRight: "10px", display: "flex" }}>
              {row.original.editando == true ? (
                <Select
                  defaultValue={value}
                  id="Input-Crear-Usuario-Administrador"
                  onChange={(e) =>
                    dispatch(CambiarInputUsuarioReducer(row.index, "tpuid", e))
                  }
                  style={{ width: "100%" }}
                >
                  {listaTiposUsuarios.map((tipousuario) => {
                    return (
                      <Select.Option value={tipousuario.tpunombre}>
                        {tipousuario.tpunombre}
                      </Select.Option>
                    );
                  })}
                </Select>
              ) : (
                value
              )}
            </div>
          </div>
        );
      },
    },
    {
      Header: "Paises",
      accesor: "paises",
      disableFilters: true,
      Cell: ({ row }) => {
        return (
          <div  className={row.original.editando == true ? "Texto-Cuerpo-Tabla-Usuario-Administrador": "Pais-Texto-Cuerpo-Tabla-Usuario-Administrador"} >
            {row.original.editando == true ? (
              <Select
                mode="multiple"
                style={{ width: "328px", height: "41px" }}
                onChange={(e) =>
                  dispatch(EditandoPaisesUsuarioReducer(row.index, e))
                }
                autoComplete={"off"}
                allowClear
                maxTagCount={2}
                defaultValue={
                  row.original.paises.length > 0
                    ? row.original.paises.map((x) => x.paiid)
                    : []
                }
              >
                {listaPaises.map((pais) => {
                  return (
                    <Select.Option value={pais.paiid}>
                      {pais.painombre}
                    </Select.Option>
                  );
                })}
              </Select>
            ) : (
              <>
                {row.original.usupaistodos == 1 ? null : row.original.paises.length >
                  0 ? (
                  row.original.paises.length > 1 ? (
                    <div id="Contenedor-Lista-Pais-Fila-Tabla-Usuario-Administrador">
                      {row.original.paises.map((pais) => {
                        return (
                          <img src={pais.paiicono} style={{ width: "40px" }} />
                        );
                      })}
                    </div>
                  ) : null
                ) : null}
                <img
                  src={
                    row.original.usupaistodos == 1
                      ? IconoMundo
                      : row.original.paises.length > 0
                      ? row.original.paises.length > 1
                        ? row.original.paises[0]["paiiconomas"]
                        : row.original.paises[0]["paiicono"]
                      : null
                  }
                  style={{ width: "40px" }}
                />
              </>
            )}
          </div>
        );
      },
    },
    {
      Header: "Nombre Completo",
      accessor: "pernombrecompleto",
      aggregate: "uniqueCount",
      disableFilters: true,
      Filter: SelectColumnFilter,
      Cell: ({ row }) => {
        return (
          <div id="Texto-Cuerpo-Tabla-Usuario-Administrador"
                className={row.original.editando == true ? "Texto-Cuerpo-Tabla-Usuario-Administrador": ""}>
            <div>
              {row.original.editando == true
                ? row.original.pernombrecompleto
                : row.original.pernombrecompleto}
            </div>
          </div>
        );
      },
    },
    {
      Header: "Usuario",
      accessor: "usuusuario",
      aggregate: "uniqueCount",
      disableFilters: true,
      Cell: ({ row }) => {
        return (
          <div id="Texto-Cuerpo-Tabla-Usuario-Administrador"
                 className={row.original.editando == true ? "Texto-Cuerpo-Tabla-Usuario-Administrador": ""}>
            {row.original.editando == true ? (
              <Input
                onChange={(e) =>
                  dispatch(
                    CambiarInputUsuarioReducer(
                      row.index,
                      "usuusuario",
                      e.target.value
                    )
                  )
                }
                value={row.original.usuusuario}
              />
            ) : (
              row.original.usuusuario
            )}
          </div>
        );
      },
    },
    {
      Header: "Correo",
      accessor: "usucorreo",
      aggregate: "uniqueConunt",
      Cell: ({ row }) => {
        return (
          <div  id="Texto-Cuerpo-Tabla-Usuario-Administrador"
                className={row.original.editando == true ? "Texto-Cuerpo-Tabla-Usuario-Administrador": ""}>
            {row.original.editando == true ? (
              <Input
                onChange={(e) =>
                  dispatch(
                    CambiarInputUsuarioReducer(
                      row.index,
                      "usucorreo",
                      e.target.value
                    )
                  )
                }
                value={row.original.usucorreo}
              />
            ) : (
              row.original.usucorreo
            )}
          </div>
        );
      },
    },
    {
      Header: "Contraseña",
      accessor: "usucontrasena",
      aggregate: "uniqueCount",
      disableFilters: true,
      Cell: ({row }) => {
        return (
          <div id="Texto-Cuerpo-Tabla-Usuario-Administrador"
               className={row.original.editando == true ? "Texto-Cuerpo-Tabla-Usuario-Administrador": ""}>
            {row.original.editando == true ? (
              row.original.editarcontrasenia == true ? (
                <Input.Password
                  onChange={(e) =>
                    dispatch(
                      CambiarInputUsuarioReducer(
                        row.index,
                        "contrasenia",
                        e.target.value
                      )
                    )
                  }
                  placeholder="Nueva Contraseña"
                  type="password"
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
              ) : (
                <Switch
                  onChange={() =>
                    dispatch(EditandoContraseniaUsuarioReducer(row.index))
                  }
                >
                  ¿Editar Contraseña?
                </Switch>
              )
            ) : (
              "**********"
            )}
          </div>
        );
      },
    },
    {
      Header: "Fecha de Creación",
      accessor: "created_at",
      disableFilters: true,
      Cell: ({ row }) => {
        return <>{Moment(row.original.created_at).format("D MMM")}</>;
      },
    },
    {
      Header: "Fecha de Caducidad",
      disableFilters: true,
      Cell: ({row}) => {
        return <div id="Texto-Cuerpo-Tabla-Usuario-Administrador"
                className={row.original.editando == true ? "Texto-Cuerpo-Tabla-Usuario-Administrador": ""}> - </div>;
      },
    },
    {
      Header: "Estado",
      disableFilters: true,
      Cell: ({ row }) => {
        return (
          <div id="Texto-Cuerpo-Tabla-Usuario-Administrador"
              className={row.original.editando == true ? "Texto-Cuerpo-Tabla-Usuario-Administrador": ""}>
            <Switch
              onChange={() => dispatch(EditandoEstadoUsuarioReducer(row.index))}
              disabled={row.original.editando == true ? false : true}
              defaultChecked={row.original.estid == 1 ? true : false}
            >
              Activado
            </Switch>
          </div>
        );
      },
    },
    {
      Header: "Editar",
      disableFilters: true,
      Cell: ({row}) => {
        return (
          <div id="Texto-Cuerpo-Tabla-Usuario-Administrador"
                className={row.original.editando == true ? "Texto-Cuerpo-Tabla-Usuario-Administrador": ""}>
            {row.original.editando == true ? (
              <div>
                <img
                  width={"16px"}
                  onClick={() => dispatch(EditandoUsuarioReducer(row.index))}
                  src={iconoCancelar}
                  id="Icono-Fila-Aceptar-Editar-Administrador"
                  style={{ marginRight: "5px" }}
                />
                <img
                  width={"16px"}
                  onClick={() => dispatch(EditarUsuarioReducer(row.original))}
                  src={iconoAceptar}
                  id="Icono-Fila-Aceptar-Editar-Administrador"
                />
              </div>
            ) : (
              <img
                onClick={() => dispatch(EditandoUsuarioReducer(row.index))}
                src={IconoEditarLapiz}
                id="Icono-Fila-Editar-Administrador"
              />
            )}
          </div>
        );
      },
    },
  ];

  const columns = useMemo(() => Columnas, listaUsuarios);
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
        <div onClick={CancelarPeticionFetch}>Cancelar carga de datos</div>
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
        <Col xl={24} lg={24} md={24} sm={24} xs={24} id="Contenedor-Tabla-Usuario-Administrador">
          <Spin
            indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
            spinning={cargandoTablaUsuarios}
          >
            <div className="tabla" id="Tabla-Usuario-Administrador">
              <div
                style={{ display: "flex", justifyContent: "flex-end", position:"relative" }}
              >
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "13px",
                    marginRight: "10px",
                  }}
                >
                  <strong>
                    {pageIndex + 1}-{pageOptions.length} de {pageCount}
                  </strong>{" "}
                </span>
                <Button
                  type="link"
                  style={{ marginRight: "0px" }}
                  icon={<LeftOutlined />}
                  onClick={() => previousPage()}
                  disabled={!canPreviousPage}
                />
                <Button
                  type="link"
                  icon={<RightOutlined />}
                  onClick={() => nextPage()}
                  disabled={!canNextPage}
                />
              </div>
              <table {...getTableProps()} >
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

export default TablaUsuarios;
