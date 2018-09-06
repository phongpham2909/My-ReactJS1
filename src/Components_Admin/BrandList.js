import React from 'react';
import { Table, Panel } from 'react-bootstrap';
import DataUtils from '../Util/DataUtils';
import { Grid,Row,Col,Button } from 'react-bootstrap';
import './CustomStyle/ProductManagement.css';


let $ = require('jquery');

class BrandList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            brandList: []
        };
        this.buildBrandList = this.buildBrandList.bind(this);
        this.onCreateNew = this.onCreateNew.bind(this);
        this.getBrandList();
    }
    onDetail(event) {
        let ele = $(event.target);
        if (ele[0].tagName === 'TD')
            ele = ele.parent();
        let id = ele.attr('id');
        window.location.href = "/brand?id="+id;
    }
    getBrandList() {
        DataUtils.getList("/api/brand/list")
            .then(this.buildBrandList);
    }
    buildBrandList(data) {
        let brandList = [];
        if (data.Success && data.Data)
            brandList = data.Data;

        let _brandList = [];

        for (let i in brandList) {
            _brandList.push(
                <tr key={i} onClick={this.onDetail} id={brandList[i].brand_id}>
                    <td>{i + 1}</td>
                    <td>{brandList[i].brand_name}</td>
                    <td>{brandList[i].brand_company}</td>
                    <td>{brandList[i].brand_description}</td>
                </tr>
            )
        }
        this.setState({ brandList: _brandList });
    }
    onCreateNew() {
        window.location.href = "/brand?id=0";
    }
    render() {
        return (
            <div>
                <Grid fluid={true}>
                    <Row>
                        <Col md={12}>
                            <Button className="btn-create-new-product btn-product-primary" onClick={this.onCreateNew}>Tạo Mới Thương Hiệu</Button>
                            <Panel bsStyle="primary">
                                <Panel.Heading>
                                    <Panel.Title componentClass="h3">Thương Hiệu</Panel.Title>
                                </Panel.Heading>
                                <Panel.Body>
                                    <Table className="brand-list" striped bordered condensed hover>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Tên Thương Hiệu</th>
                                                <th>Công Ty</th>
                                                <th>Mô Tả</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.brandList}
                                        </tbody>
                                    </Table>
                                </Panel.Body>
                            </Panel>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default BrandList;