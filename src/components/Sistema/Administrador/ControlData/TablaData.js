import React, { useEffect, useMemo, useState } from "react";
import { Row, Col, Spin, Modal, Button, Checkbox } from "antd";
import IconoEliminar from "../../../../assets/images/iconos/Tabla/tacho.png";
// import IconoEditar from 'assets/images/iconos/Tabla/editar.svg'
import { useDispatch, useSelector } from "react-redux";
import {
  ObtenerDataReducer,
  SeleccionarArchivosReducer,
  CancelarPeticionFetch,
} from "../../../../appRedux/actions/Administrador/ControlData/ControlData";
import {
  ExclamationCircleOutlined,
  LoadingOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { EliminarDataUnicoReducer } from "../../../../appRedux/actions/Administrador/ControlData/ControlData";

import {
  useTable,
  usePagination,
  useFilters,
  useExpanded,
  useGroupBy,
  useSortBy,
} from "react-table";
import { ColumnFilter } from "../../../Tabla/ColumnaFiltro";

const TablaData = () => {
  const dispatch = useDispatch();

  const { confirm } = Modal;

  const { cargandoDataArchivos, dataArchivos } = useSelector(
    ({ controlData }) => controlData
  );

  function mostrarModalEliminar(idArchivo) {
    confirm({
      title: "¿Estas seguro de eliminar este archivos?",
      icon: <ExclamationCircleOutlined />,
      content: "Recuerda que este cambio es instantaneo en los clientes",
      okText: "Sí",
      okType: "danger",
      cancelText: "No",
      async onOk() {
        await dispatch(EliminarDataUnicoReducer(idArchivo));
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  }

  const cargarDatosTabla = () => {
    dispatch(ObtenerDataReducer());
    dispatch(SeleccionarArchivosReducer(0, false, true));
    setdata(dataArchivos);
    setAllFilters([]);
  };

  useEffect(() => {
    cargarDatosTabla();
  }, []);

  useEffect(() => {
    setdata(dataArchivos);
  }, dataArchivos);

  const Columnas = [
    {
      Header: "Seleccionar",
      accessor: "usuario",
      Cell: ({ row }) => {
        return (
          <div style={{ placeSelf: "center", paddingLeft: "20px" }}>
            {row.original.editar == true ? (
              row.original.usuario
            ) : (
              <Checkbox
                onChange={(e) =>
                  dispatch(
                    SeleccionarArchivosReducer(
                      row.original.ardid,
                      e.target.checked,
                      false
                    )
                  )
                }
              >
                {row.original.usuario}
              </Checkbox>
            )}
          </div>
        );
      },
    },
    {
      Header: "Nombre Archivo",
      accessor: "nombreArchivo",
      Cell: ({ row }) => {
        return (
          <div
            id="Texto-Nombres-Administrador-ControlData"
            style={{ placeSelf: "center" }}
          >
            <a href={row.original.archivo} download="">
              {row.original.nombreArchivo}
            </a>
          </div>
        );
      },
    },
    {
      Header: "Imagenes",
      Cell: ({ row }) => {
        return (
          <div style={{ placeSelf: "center" }}>
            <Row>
              {row.original.imagenes.map((imagen, posicion) => {
                return posicion == 0 ? (
                  <Col xl={8} style={{ textAlignLast: "right" }}>
                    <img src={imagen.iadimagen} width={"46px"} />
                  </Col>
                ) : posicion == 1 ? (
                  <Col xl={8} style={{ textAlignLast: "center" }}>
                    <img src={imagen.iadimagen} width={"46px"} />
                  </Col>
                ) : posicion == 2 ? (
                  <Col xl={8}>
                    <img src={imagen.iadimagen} width={"46px"} />
                  </Col>
                ) : null;
              })}
            </Row>
          </div>
        );
      },
    },
    {
      Header: "Opción",
      Cell: ({ row }) => {
        return (
          <div
            style={{
              textAlignLast: "right",
              display: "flex",
              placeItems: "center",
            }}
          >
            <img
              src={IconoEliminar}
              id="Icono-Fila-Editar-Administrador"
              onClick={() => mostrarModalEliminar(row.original.ardid)}
            />
            <div id="Texto-fecha-Administrador-ControlData">
              {row.original.fechaEdicion}
            </div>
          </div>
        );
      },
    },
  ];
  const columns = useMemo(() => Columnas, dataArchivos);
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
        <Col
          xl={24}
          lg={24}
          md={24}
          sm={24}
          xs={24}
          className="responsiveTabla"
        >
          <Spin
            indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
            spinning={cargandoDataArchivos}
          >
            <div className="tabla">
              <div
                className="paginacion"
                style={{ display: "flex", justifyContent: "flex-end" }}
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
    // <Col xl={24}>
    //     <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} spinning={cargandoDataArchivos}>
    //     {
    //         dataArchivos.map((dato, posicion) => {
    //             return (
    //                 <Row id="Fila-Tabla-Administrador">
    //                     <Col xl={7} style={{placeSelf: "center", paddingLeft:'20px'}}>
    //                         <div>
    //                             {
    //                                 dato.editar == true
    //                                 ?dato.usuario
    //                                 :<Checkbox
    //                                     onChange={
    //                                         (e) => dispatch(SeleccionarArchivosReducer(dato.ardid, e.target.checked, false))
    //                                     }>{dato.usuario}</Checkbox>
    //                             }
    //                         </div>
    //                     </Col>
    //                     <Col xl={4} style={{placeSelf: "center"}}>
    //                         <div id="Texto-Nombres-Administrador-ControlData">
    //                             <a
    //                                 href={dato.archivo}
    //                                 download=""
    //                             >
    //                                 {dato.nombreArchivo}
    //                             </a>
    //                         </div>
    //                     </Col>
    //                     <Col xl={10} style={{placeSelf: "center"}}>
    //                         <Row>
    //                             {
    //                                 dato.imagenes.map((imagen, posicion) => {
    //                                     return (
    //                                         posicion == 0
    //                                             ?<Col xl={8} style={{textAlignLast: "right"}}>
    //                                                 <img src={imagen.iadimagen} width={"46px"}/>
    //                                             </Col>
    //                                             :posicion == 1
    //                                                 ?<Col xl={8} style={{textAlignLast: "center"}}>
    //                                                     <img src={imagen.iadimagen} width={"46px"}/>
    //                                                 </Col>
    //                                                 :posicion == 2
    //                                                     ?<Col xl={8}>
    //                                                         <img src={imagen.iadimagen} width={"46px"}/>
    //                                                     </Col>
    //                                                     :null
    //                                     )
    //                                 })
    //                             }
    //                             {/* <Col xl={8} style={{textAlignLast: "center"}}>
    //                                 <img src={ImagenExcel} width={"46px"}/>
    //                             </Col>
    //                             <Col xl={8}>
    //                                 <img src={ImagenExcel} width={"46px"}/>
    //                             </Col> */}
    //                         </Row>
    //                     </Col>
    //                     <Col xl={3} style={{textAlignLast: "right", display:'flex', placeItems: "center"}}>
    //                         {/* <img
    //                             src={IconoEditar}
    //                             id="Icono-Fila-Editar-Administrador"
    //                         /> */}
    //                         <img
    //                             src={IconoEliminar}
    //                             id="Icono-Fila-Editar-Administrador"
    //                             onClick={() => mostrarModalEliminar(dato.ardid)}
    //                         />
    //                         <div id="Texto-fecha-Administrador-ControlData">{dato.fechaEdicion}</div>
    //                     </Col>
    //                 </Row>
    //             )
    //         })
    //     }
    //     </Spin>
    // </Col>
  );
};

export default TablaData;
