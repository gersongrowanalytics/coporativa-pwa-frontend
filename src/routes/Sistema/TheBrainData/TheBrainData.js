import React from 'react'
import {Row, Col} from 'antd'
import '../../../styles/Sistema/TheBrainData/TheBrainData.css'

const TheBrainData = () => {
    return (
        <Row style={{marginTop:'40px'}}>
            <Col xl={4} md={4} sm={4} xs={4}></Col>
            {/* {
                [{},{},{},{}].map((data, posicion) => {
                    return (
                        <Col xl={4} md={4} sm={4}>
                            <div className={posicion == 0 ?"contenedorBloque" :"contenedorBloquePlomo"}>
                                <a href='https://growanalyticscom.sharepoint.com/sites/kimberly-clark/_layouts/15/download.aspx?UniqueId=1fc330a1-dae2-44e5-94c1-132aab377260' download>Descarga Spider Data {posicion+1}</a>
                            </div>
                        </Col>
                    )
                })
            } */}

            <Col xl={4} md={4} sm={4}>
                <div className={"contenedorBloque"}>
                    <a href='https://backend-spider-kimberly.grow-corporate.com/Thanos/Thanos%20Cube%20Online.xlsx' download>Descarga The Brain Data</a>
                </div>
            </Col>

            <Col xl={4} md={4} sm={4}>
                <div className={"contenedorBloquePlomo"}>
                    <a href='#' download>Descarga The Brain Data 2</a>
                </div>
            </Col>

            <Col xl={4} md={4} sm={4}>
                <div className={"contenedorBloquePlomo"}>
                    <a>Descarga The Brain Data 3</a>
                </div>
            </Col>

            <Col xl={4} md={4} sm={4}>
                <div className={"contenedorBloquePlomo"}>
                    <a>Descarga The Brain Data 4</a>
                </div>
            </Col>


            <Col xl={4} md={4} sm={4} xs={4}></Col>
        </Row>
    )
}

export default TheBrainData
