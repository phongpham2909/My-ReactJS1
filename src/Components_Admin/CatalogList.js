import React from 'react';
import {Table, Panel,Grid,Row,Col,Button} from 'react-bootstrap';
import './CustomStyle/ProductManagement.css'
import DataUtils from '../Util/DataUtils';

let $  = require('jquery');

class CatalogList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            CatalogList: []
        };
        this.buildCatalogList = this.buildCatalogList.bind(this);
        this.onCreateNew = this.onCreateNew.bind(this);
        this.getCatalogList();
    }
    onDetail(event) {
        let ele = $(event.target);
        if(ele[0].tagName === 'TD')
            ele = ele.parent();
        let id = ele.attr('id');
        window.location.href = "/catalog?id="+id;
    }
    getCatalogList() {
        DataUtils.getList("/api/catalog/list")
        .then(this.buildCatalogList);
    }
    buildCatalogList(data) {
        let catalogList = [];
        if(data.Success && data.Data)
            catalogList = data.Data;

        let _catalogList = [];

        for(let i in catalogList) {console.log(223, i, catalogList[i])
            _catalogList.push(
                <tr key={i} onClick={this.onDetail} id={catalogList[i].catalog_id}>
                    <td>{i + 1}</td>
                    <td>{catalogList[i].catalog_name}</td>
                    <td>{catalogList[i].catalog_description}</td>
                </tr>
            )
        }
        console.log(_catalogList)
        this.setState({CatalogList: _catalogList});
    }
    onCreateNew() {
        window.location.href = "/catalog?id=0";
    }
    render() {
        return (
            <div>
                <Grid fluid={true}>
            <Row><Col md={12}><Button className="btn-create-new-product btn-product-primary" onClick={this.onCreateNew}>Tạo Mới Danh Mục</Button>
                <Panel bsStyle="primary">
                    <Panel.Heading>
                    <Panel.Title componentClass="h3">DANH MỤC SẢN PHẨM</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body>
                        <Table className="vertical-product" responsive>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Tên Danh Mục</th>
                                    <th>Mô Tả</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.CatalogList}
                            </tbody>
                        </Table>
                    </Panel.Body>
                </Panel>
                </Col></Row></Grid>
            </div>
        );
    }
}

export default CatalogList;