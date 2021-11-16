import React, { useMemo, useState, useEffect } from "react";
import ListaAdministrador from "../../../../components/Sistema/Administrador/ListaAdministrador";
import { Row, Col, Modal, Spin, Button } from "antd";
import {
  LeftOutlined,
  RightOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import iconoCerrarModal from "../../../../assets/images/iconos/Perfil/cerrarModal.png";
import "../../../../styles/Sistema/Administrador/Permisos/Permisos.css";
import {
  ObtenerListaPermisos,
  cancelarPeticionFetch,
} from "../../../../appRedux/actions/ControlAcceso/Permisos/Permisos";
import { useDispatch, useSelector } from "react-redux";
import Moment from "moment";
import {
  useTable,
  usePagination,
  useFilters,
  useExpanded,
  useGroupBy,
  useSortBy,
} from "react-table";
import { Checkbox } from "../../../../components/Tabla/Checkbox";
import { ColumnFilter } from "../../../../components/Tabla/ColumnaFiltro";
import { SelectColumnFilter } from "../../../../components/Tabla/SeleccionarColumnaFiltro";
// import "../../../../styles/Sistema/Administrador/TiposUsuario/TiposUsuario.css";

const Permisos = () => {
  Moment.locale("en");
  const dispatch = useDispatch();

  const { listaPermisos } = useSelector(
    ({ controlesAccesosPermisos }) => controlesAccesosPermisos
  );

  const [mostrarModalCrearPermiso, setMostrarModalCrearPermiso] =
    useState(false);

  const abrirModalCrearPermiso = () => {
    setMostrarModalCrearPermiso(true);
  };

  const ocultarModal = () => {
    setMostrarModalCrearPermiso(false);
  };

  let arrayArchivos = [
    {
      permiso: "XXXXXXXXXXXXXXX",
      slug: "XXXXXXXXXXXXXXX",
      ruta: "/sistemas/otros",
      fechaCreacion: "XXXXXX/XXXXXXX/",
    },
    {
      permiso: "XXXXXXXXXXXXXXX",
      slug: "XXXXXXXXXXXXXXX",
      ruta: "/sistemas/otros",
      fechaCreacion: "XXXXXX/XXXXXXX/",
    },
    {
      permiso: "XXXXXXXXXXXXXXX",
      slug: "XXXXXXXXXXXXXXX",
      ruta: "/sistemas/otros",
      fechaCreacion: "XXXXXX/XXXXXXX/",
    },
    {
      permiso: "XXXXXXXXXXXXXXX",
      slug: "XXXXXXXXXXXXXXX",
      ruta: "/sistemas/otros",
      fechaCreacion: "XXXXXX/XXXXXXX/",
    },
    {
      permiso: "XXXXXXXXXXXXXXX",
      slug: "XXXXXXXXXXXXXXX",
      ruta: "/sistemas/otros",
      fechaCreacion: "XXXXXX/XXXXXXX/",
    },
    {
      permiso: "XXXXXXXXXXXXXXX",
      slug: "XXXXXXXXXXXXXXX",
      ruta: "/sistemas/otros",
      fechaCreacion: "XXXXXX/XXXXXXX/",
    },
    {
      permiso: "XXXXXXXXXXXXXXX",
      slug: "XXXXXXXXXXXXXXX",
      ruta: "/sistemas/otros",
      fechaCreacion: "XXXXXX/XXXXXXX/",
    },
  ];

  // useEffect(() => {
  //     dispatch(ObtenerListaPermisos())
  // }, [])

  useEffect(() => {
    setdata(listaPermisos);
  }, listaPermisos);

  const cargarDatosTabla = () => {
    dispatch(ObtenerListaPermisos());
    setdata(listaPermisos);
    setAllFilters([]);
  };

  useEffect(() => {
    cargarDatosTabla();
  }, []);
  const Columnas = [
    {
      Header: "Permisos",
      accessor: "pemnombre",
      Cell: ({ row }) => {
        return (
          <div id="Texto-Cuerpo-Tabla-Usuario-Administrador">
            {row.original.pemnombre}
          </div>
        );
      },
    },
    {
      Header: "Slug",
      accessor: "pemslug",
      Cell: ({ row }) => {
        return (
          <div id="Texto-Cuerpo-Tabla-Usuario-Administrador">
            {row.original.pemslug}
          </div>
        );
      },
    },
    {
      Header: "Ruta",
      accessor: "pemruta",
      Cell: ({ row }) => {
        return (
          <div id="Texto-Cuerpo-Tabla-Usuario-Administrador">
            {row.original.pemruta}
          </div>
        );
      },
    },
    {
      Header: "Fecha de Creación",
      accessor: "created_at",
      Cell: ({ row }) => {
        return (
          <div id="Texto-Cuerpo-Tabla-Usuario-Administrador">
            {Moment(row.original.created_at).format("D MMM")}
          </div>
        );
      },
    },
  ];
  const columns = useMemo(() => Columnas, listaPermisos);
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
    <div id="Contenedor-Principal-Margen">
      <Row>
        <Col
          xl={24}
          lg={4}
          md={24}
          sm={24}
          xs={24}
          id="Contenedor-Segunda-Parte-Administrador"
        >
          <Row>
            <Col
              xl={4}
              lg={4}
              md={24}
              sm={24}
              xs={24}
              id="Contenedor-Lista-Tipos-Usuario"
            >
              <div id="Contenedor-Lista-Administrador">
                <div id="Titulo-Modulo-Administrador">Administrador</div>
                <br />
                <ListaAdministrador
                  esTipoUsuario={false}
                  esUsuario={false}
                  esPermiso={true}
                />
              </div>
            </Col>
            <Col xl={20} lg={20} md={24} sm={24} xs={24}>
              <Row>
                <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                  <div
                    id="Contenedor-Btn-Crear-Administrador"
                    onClick={abrirModalCrearPermiso}
                  >
                    <div id="Texto-Btn-Crear-Administrador">+ Crear</div>
                  </div>
                </Col>
                <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                  <div className="Botones-Carga-Cancelar-Datos">
                    <div onClick={cargarDatosTabla}>Recargar datos</div>
                    <div onClick={cancelarPeticionFetch}>
                      Cancelar carga de datos
                    </div>
                  </div>
                  <Row>
                    <Col xl={4} lg={4} md={12} sm={12} xs={24}>
                      <div>
                        <Checkbox {...getToggleHideAllColumnsProps()} />{" "}
                        Seleccionar Todos
                      </div>
                    </Col>

                    {allColumns.map((column) => (
                      <Col xl={4} lg={4} md={12} sm={12} xs={24}>
                        <div key={column.id}>
                          <label>
                            <input
                              type="checkbox"
                              {...column.getToggleHiddenProps()}
                            />{" "}
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
                      id="Contenedor-Tabla-Usuario-Administrador"
                    >
                      <div className="tabla" id="Tabla-Usuario-Administrador">
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            position: "relative",
                          }}
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
                              {pageIndex + 1}-{pageOptions.length} de{" "}
                              {pageCount}
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
                                      {column.canFilter
                                        ? column.render("Filter")
                                        : null}
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
                                            <span
                                              {...row.getToggleRowExpandedProps()}
                                            >
                                              {row.isExpanded ? "👇" : "👉"}
                                            </span>{" "}
                                            {cell.render("Cell")} (
                                            {row.subRows.length})
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
                    </Col>
                  </Row>
                  {/* <div id="Contenedor-Tabla-Usuario-Administrador">
                    <table
                      style={{
                        width: "2000px",
                      }}
                      id="Tabla-Usuario-Administrador"
                    >
                      <thead>
                        <tr id="Fila-Cabecera-Tabla-Usuario-Administrador">
                          <th id="Texto-Cabecera-Tabla-Usuario-Administrador">
                            Permisos
                          </th>
                          <th id="Texto-Cabecera-Tabla-Usuario-Administrador">
                            Slug
                          </th>
                          <th id="Texto-Cabecera-Tabla-Usuario-Administrador">
                            Ruta
                          </th>
                          <th id="Texto-Cabecera-Tabla-Usuario-Administrador">
                            Fecha de Creación{" "}
                          </th>
                        </tr>
                      </thead>
                      <tbody style={{ marginTop: "20px" }}>
                        {listaPermisos.map((archivo, posicion) => {
                          return (
                            // <>
                            // {posicion == 0 ?<tr><td style={{paddingBottom:'15px'}}></td></tr> : null}
                            <tr
                              id="Fila-Cuerpo-Tabla-Usuario-Administrador"
                              style={{ paddingBottom: "20px" }}
                            >
                              <td id="Texto-Cuerpo-Tabla-Usuario-Administrador">
                                {archivo.pemnombre}
                              </td>
                              <td id="Texto-Cuerpo-Tabla-Usuario-Administrador">
                                {archivo.pemslug}
                              </td>
                              <td id="Texto-Cuerpo-Tabla-Usuario-Administrador">
                                {archivo.pemruta}
                              </td>
                              <td id="Texto-Cuerpo-Tabla-Usuario-Administrador">
                                {Moment(archivo.created_at).format("D MMM")}
                              </td>
                            </tr>
                            // <tr><td style={{paddingBottom:'15px'}}></td></tr>
                            // </>
                          );
                        })}
                      </tbody>
                      <tfoot>
                        <div style={{ margin: "28px" }} />
                      </tfoot>
                    </table>
                  </div> */}
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>

      <Modal
        closeIcon={<img onClick={ocultarModal} src={iconoCerrarModal} id="" />}
        title={null}
        visible={mostrarModalCrearPermiso}
        footer={null}
        centered
        width={"378px"}
      >
        <div id="Contenedor-Crear-Permiso-Administrador">
          <div>
            <div id="Texto-Crear-Permiso-Administrador">Permiso</div>
            <input id="Input-Crear-Permiso-Administrador" />

            <div id="Texto-Crear-Permiso-Administrador">Slug</div>
            <input id="Input-Crear-Permiso-Administrador" />

            <div id="Texto-Crear-Permiso-Administrador">Ruta</div>
            <input id="Input-Crear-Permiso-Administrador" />

            <div style={{ textAlign: "-webkit-center" }}>
              <div id="Contenedor-Btn-Crear-Permiso-Administrador">
                <div id="Texto-Btn-Crear-Permiso-Administrador">Crear</div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Permisos;
