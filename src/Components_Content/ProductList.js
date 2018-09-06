import React, { Component } from 'react';
import Product from './Product';
import {Row, Col } from 'react-bootstrap';
import DataUtils from '../Util/DataUtils';
import './CustomStyle/ProductList.css';

const NUMBER_OF_ROW = 4;

class ProductList extends Component {
    getProductList() {
        let type = this.props.type;
        return DataUtils.getProductList(type);
    }
    buildProductList() {
        let productListTemplate = [];
        let productData = this.getProductList();
        let productList = [];    
            for(let index in productData) {
                productList.push(
                    <Col className="cl-product" key={index} xs={12} sm={3} md={3}>
                        <Product data = {productData[index]} />
                    </Col>
                )
            if(productList.length === NUMBER_OF_ROW) {
                productListTemplate.push(
                    <Row key={"row-"+index}>
                        {productList}
                    </Row>
                )
                productList = [];
            }
        }
        if(productList.length && productList.length < NUMBER_OF_ROW) {
            productListTemplate.push(
                <Row key={"row-last"}>
                    {productList}
                </Row>
            )   
        }
        return productListTemplate;
    }
    render() {
        let productList = this.buildProductList();
        return (
            <div>
            {productList}
            </div>
        );
    }
}
export default ProductList;