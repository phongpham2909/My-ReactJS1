import React, { Component } from 'react';
import queryString from 'query-string';
import DataUtils from '../Util/DataUtils';
import { Grid, Row, Col, Image, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
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
        if (this.state.Id !== null) {
            product = DataUtils.getProduct(this.state.Id);
        }
        return product;
    }
    buildProductImage() {
        let imageTemplate = [];
        if (this.state.info !== null) {
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
                    <ListGroup className="list-group-detail">
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
                    </ListGroup>
                    <Button className="btn-add-to-card">Mua Ngay</Button>
                </div>
            )
        }
        return descriptionTemplate;
    }

    buildProductDescriptionShipping() {
        let productDescriptionShipping = [];
        if (this.state.info != null) {
            productDescriptionShipping.push(
                <div key={1}>

                    <Row className="line-detail-des">
                        <Col md={12}>
                            <h4>MÔ TẢ SẢN PHẨM</h4>
                            <span dangerouslySetInnerHTML={{ __html: this.state.info.description }}></span>
                        </Col>
                    </Row>
                </div>
            )
        }
        return productDescriptionShipping;
    }

    buildProductDetail() {
        let productDetail = [];
        //let product = this.getProduct();
        if (this.state.info != null) {
            productDetail.push(
                <div key={1}>
                    <Row className="line-detail">
                        <Col md={12}>
                            <h4>THÔNG SỐ KỸ THUẬT</h4>
                            <span className="text-label">Đơn vị lưu kho</span>
                            <span className="data">{this.state.info.donviluukho}</span>
                        </Col>
                    </Row>
                    <Row className="line-detail">
                        <Col md={12}>
                            <span className="text-label">Độ dày mặt</span>
                            <span className="data">{this.state.info.dodaymat}</span>
                        </Col>
                    </Row>
                    <Row className="line-detail">
                        <Col md={12}>
                            <span className="text-label">Màu mặt</span>
                            <span className="data">{this.state.info.colorface}</span>
                        </Col>
                    </Row>
                    <Row className="line-detail">
                        <Col md={12}>
                            <span className="text-label">Cấu tạo máy</span>
                            <span className="data">{this.state.info.cautaomay}</span>
                        </Col>
                    </Row>
                    <Row className="line-detail">
                        <Col md={12}>
                            <span className="text-label">Chiều rộng dây</span>
                            <span className="data">{this.state.info.chieurongday}</span>
                        </Col>
                    </Row>
                    <Row className="line-detail">
                        <Col md={12}>
                            <span className="text-label">Độ dài có thể điều chỉnh</span>
                            <span className="data">{this.state.info.dodaicothedieuchinh}</span>
                        </Col>
                    </Row>
                    <Row className="line-detail">
                        <Col md={12}>
                            <span className="text-label">Dây</span>
                            <span className="data">{this.state.info.day}</span>
                        </Col>
                    </Row>
                    <Row className="line-detail">
                        <Col md={12}>
                            <span className="text-label">Màu dây</span>
                            <span className="data">{this.state.info.mauday}</span>
                        </Col>
                    </Row>
                    <Row className="line-detail">
                        <Col md={12}>
                            <span className="text-label">Dây đồng hồ thay thế được</span>
                            <span className="data">{this.state.info.daydonghothaythe}</span>
                        </Col>
                    </Row>
                    <Row className="line-detail">
                        <Col md={12}>
                            <span className="text-label">Chống nước</span>
                            <span className="data">{this.state.info.chongnuoc}</span>
                        </Col>
                    </Row>
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
        let productDetail = this.buildProductDetail();
        let descriptionTemplate = this.buildDescription();
        let productDescriptionShipping = this.buildProductDescriptionShipping();
        return (
            <div>
                <Grid fluid={true}>
                    <Row className="product-detail-main">
                        <Col xs={12} sm={12} md={12} lg={12}>
                            <Row className="product-detail">
                                <Col className="product-detail-img" xs={12} sm={12} md={6}>
                                    {imageTemplate}
                                </Col>
                                <Col className="product-detail-des" xs={12} sm={12} md={6}>
                                    {descriptionTemplate}
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <br />
                    <Row className="product-description-main">
                        <Col xs={12} sm={12} md={12} lg={12}>
                            <Row className="product-description">
                                <Col xs={12} sm={12} md={6}>
                                    {productDescriptionShipping}
                                </Col>
                                <Col xs={12} sm={12} md={6}>
                                    {productDetail}
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}
export default ProductDetail;