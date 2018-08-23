import React, { Component } from 'react';
import {Grid,Row,Col,Thumbnail,Button } from 'react-bootstrap';
import DataUtils from '../Util/DataUtils';
import $ from 'jquery';
import '../Custom_Style/ProductManagerment.css'


import CurrencyFormat from 'react-currency-format';

class Products extends Component {
    constructor(props) {
        super(props);
        this.onDetail = this.onDetail.bind(this)

    }
    onDetail(event) {
        let Id = $(event.target).parent().attr("id");
        window.location.href = "/Product/detail?id=" + Id;
        event.preventDefault();
    }

    /*<td>{parseInt(i) + 1}</td>
    <td>{ProductList[i].name}</td>
    <td>{ProductList[i].type}</td>
    <td>{ProductList[i].price}</td>*/
    buildProductList() {
        let ProductList = DataUtils.getProductList();
        let _productlist = [];
        for (let i in ProductList) {
            _productlist.push(
                <div key={i}>
                    <Grid>
                        <Row className="product-managerment">
                            <Col xs={6} md={4}>
                                <Thumbnail src={ProductList[i].img} alt="242x200">
                                    <h3>{ProductList[i].name}</h3>
                                    <p>{ProductList[i].company}</p>
                                    <p> <CurrencyFormat value={ProductList[i].price} displayType={'text'} thousandSeparator={true} suffix={' vnđ'} /></p>
                                    <p>
                                        <Button className="btn-add-to-card" id={ProductList[i].id} onClick={this.onDetail}>Xem Ngay </Button>
                                    </p>
                                </Thumbnail>
                            </Col>
                        </Row>
                    </Grid>
                </div>
            )
        }
        return _productlist;

    }
    render() {
        let _productlist = this.buildProductList();
        return (
            <div>        
  
            {_productlist}
   
            </div>
        );
    }
}

export default Products;