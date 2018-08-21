import React, { Component } from 'react';
import queryString from 'query-string';
import DataUtils from '../Util/DataUtils';
import { Grid, Row, Col, Image, ListGroup, ListGroupItem } from 'react-bootstrap';
import '../Custom_Style/ProductDetail.css';

import CurrencyFormat from 'react-currency-format';

class ProductDetail extends Component {
    constructor(props) {
        super(props);
        this.state = { Id: null, info: null }

        this.state.Id = this.getIdFromQueryString();
        this.state.info = this.getProduct();
    }

    getProduct() {
        let product = null;
        if (this.state.Id != null) {
            product = DataUtils.getProduct(this.state.Id);
        }
        return product;
    }
    buildProductImage() {
        let imageTemplate = [];
        if (this.state.info !== null) {
            console.log(this.state.info.img)
            imageTemplate.push(
                <div key={1}>
                    <Image src={this.state.info.img} responsive />
                </div>
            )
        }
        return imageTemplate;
    }
    buildDescription() {
        let descriptionTemplate = [];
        if (this.state.info !== null) {
            let saleOffPrice = this.state.info.price - (this.state.info.price * (this.state.info.saleoff * 0.01));
            let salePrice = this.state.info.price - saleOffPrice;
            let salePriceTemp = (<CurrencyFormat value={salePrice} displayType={'text'} thousandSeparator={true} suffix={' vnđ'} />)
            descriptionTemplate.push(
                <div key={1}>
                    <ListGroup>
                        <ListGroupItem header={this.state.info.name}><span>Thương Hiệu: {this.state.info.company}</span></ListGroupItem>
                        <ListGroupItem header='GIÁ SẢN PHẨM'>
                            <span>
                                <strong>
                                    <CurrencyFormat
                                        value={saleOffPrice}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        suffix={' vnđ'}
                                        renderText={value => <span> {value}</span>} /></strong>
                            </span>

                            <br />
                            <span><strong>Giảm giá:</strong> {this.state.info.saleoff}% </span>

                            <span>
                                ({salePriceTemp})
                           </span>
                            <br />
                            <span><strong>Giá ban đầu: </strong>
                                <CurrencyFormat value={this.state.info.price} displayType={'text'} thousandSeparator={true} suffix={' vnđ'} />
                            </span>
                        </ListGroupItem>
                        <ListGroupItem header=''>
                        <span dangerouslySetInnerHTML={{__html:this.state.info.description}}></span>
                        </ListGroupItem>
                    </ListGroup>
                </div>
            )
        }
        return descriptionTemplate;
    }

    buildProductDetail() {
        let productDetail = [];
        let product = this.getProduct();
        if (product != null) {
            productDetail.push(
                <div key={1}>
                    <span>Name: {product.name}</span>
                    <br />
                    <span>Price: {product.price}</span>
                    <br />
                    <span>Description: {product.description}</span>
                </div>
            )
        }
        return productDetail;
    }

    getIdFromQueryString() {
        let Obj = null;
        if (this.props.location && this.props.location.search) {
            Obj = queryString.parse(this.props.location.search);
        }
        if (Obj.id) {
            Obj.id = parseInt(Obj.id);

        }
        return Obj.id || null;
    }

    render() {
        let imageTemplate = this.buildProductImage();
        //  let productDetail = this.buildProductDetail();  
        let descriptionTemplate = this.buildDescription();
        return (
            <div>
                <Grid>
                    <Row className="product-detail" >
                        <Col className="product-detail-img" xs={12} sm={12} md={6} >
                            {imageTemplate}
                        </Col>
                        <Col className="product-detail-des" xs={12} sm={12} md={6}  >
                            {descriptionTemplate}
                        </Col>

                    </Row>
                    <Row >
                        <Col md={6} mdPush={6}>

                        </Col>
                        <Col md={6} mdPull={6}>

                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}
export default ProductDetail;