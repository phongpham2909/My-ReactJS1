import React, { Component } from 'react';
import {Grid,Row,Col,Thumbnail,Button,Panel,Table } from 'react-bootstrap';
import DataUtils from '../Util/DataUtils';
import $ from 'jquery';
import './CustomStyle/ProductManagement.css'


import CurrencyFormat from 'react-currency-format';

class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {DataList: []};
        this.onDetail = this.onDetail.bind(this)
        this.onCreateNew = this.onCreateNew.bind(this)
        this.buildProductList = this.buildProductList.bind(this)

    }
    componentDidMount()
    {
        this.loadProductList();
    }
    onCreateNew(event)
    {
        window.location.href = "/Product/detail?id=0";
        event.preventDefault();
    }
    onDetail(event) {
        let Id = $(event.target).attr("id");
        window.location.href = "/Product/detail?id=" + Id;
        event.preventDefault();
    }
    loadProductList()
    {
        DataUtils.getList("/api/inventory/list", "")
        .then(this.buildProductList); 
    }

    buildProductList(res) {
        if(res.Success === false)
        {
            return [];
        }
        let ProductList = res.Data;//DataUtils.getProductList();
        let _productlist = [];
        for (let i in ProductList) { console.log(1232,i,ProductList[i])
            _productlist.push(
                 <tr key={i}>
                    <td>{parseInt(i) + 1}</td>
                    <td><Thumbnail className="product-img" src={ProductList[i].inventory_img} alt="100x100"></Thumbnail></td>
                    <td>{ProductList[i].inventory_name}</td>
                    <td>{ProductList[i].inventory_brand}</td>
                    <td><CurrencyFormat value={ProductList[i].inventory_price} displayType={'text'} thousandSeparator={true} suffix={' vnđ'} /></td>
                    <td>{ProductList[i].inventory_saleoff}</td>
                    <td><Button className="btn-product-primary" id={ProductList[i].inventory_id} onClick={this.onDetail}>Xem Chi Tiết</Button></td>
                </tr>
            )
        }
      
        this.setState({DataList: _productlist});
    }
    render() {
        return (
            <div>        
            <Grid fluid={true}>
            <Row><Col md={12}><Button className="btn-create-new-product btn-product-primary" onClick={this.onCreateNew}>Tạo Mới Sản Phẩm </Button></Col></Row>
                <Panel bsStyle="primary">
                    <Panel.Heading>
                        <Panel.Title componentClass="h3">DANH SÁCH SẢN PHẨM</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body>
                        <Table className="vertical-product" responsive>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Ảnh Sản Phẩm</th>
                                <th>Tên Sản Phẩm</th>
                                <th>Thương Hiệu</th>
                                <th>Giá</th>
                                <th>Giảm Giá (%)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.DataList}
                        </tbody>
                    </Table></Panel.Body>
                </Panel>
                 </Grid>
                
            
            </div>
        );
    }
}

export default Products;