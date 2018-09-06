import React, { Component } from 'react';
import { Carousel, Grid, Row, Col, Image } from 'react-bootstrap';
import ProductList from './ProductList';
import DataUtils from '../Util/DataUtils';
import './CustomStyle/Home.css';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            path: "",
            type: 0,
        };
    }
    getProductList() {
        let type = this.props.type;
        return DataUtils.getProductList(type);
    }

    buildSlider() {
        let _slider = [];
        _slider.push(
            <Carousel key={1}>
                <Carousel.Item>
                    <Image className="img-slider-style" alt="1368x500" src="/images/slider/dw-ming-banner-desk_h.jpg" />
                    <Carousel.Caption>
                        <Row>
                            <Col xs={12} sm={12} md={12}>
                                <h1>DANIEL WELLINGTON</h1>
                                <button className="btn-add-detail">Xem Chi Tiết</button>
                                <a href="#product-collection" className="mouse-hover">
                                    <div className="mouse"></div>
                                </a>
                            </Col>
                        </Row>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <Image className="img-slider-style" alt="1368x500" src="/images/slider/dw-lp-ming-banner-desk.jpg" />
                    <Carousel.Caption>
                        <Row>
                            <Col xs={12} sm={12} md={12}>
                                <h1>DANIEL WELLINGTON</h1>
                                <button className="btn-add-detail">Xem Chi Tiết</button>
                                <a href="#img-collection" className="mouse-hover">
                                    <div className="mouse"></div>
                                </a>
                            </Col>
                        </Row>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        )
        return _slider;
    }
    buildProductCollection() {
        let productCollection = [];
        let _productCollection = this.getProductList();
        if (_productCollection.catalogid === undefined) {
            productCollection.push(
                <ProductList type={_productCollection.type} key={1} />

            )
        }
        return productCollection;

    }
    buildImageCollection() {
        let imageCollection = [];
        imageCollection.push(
            <Row key={1}>
                <Col className="padleft-right" md={4} sm={6} >
                    <figure className="imghvr-fold-up">
                        <Image src="/images/course01.jpg" alt="1080x720" className="img-responsive" />
                        <figcaption>
                            <h3>Collection 1</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam atque, nostrum veniam consequatur libero fugiat, similique quis.</p>
                            <link href="#" />
                        </figcaption>
                    </figure>
                </Col>
                <Col className="padleft-right" md={4} sm={6} >
                    <figure className="imghvr-fold-up">
                        <Image src="/images/course02.jpg" alt="1080x720" className="img-responsive" />
                        <figcaption>
                            <h3>Collection 2</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam atque, nostrum veniam consequatur libero fugiat, similique quis.</p>
                            <link href="#" />
                        </figcaption>
                    </figure>
                </Col>
                <Col className="padleft-right" md={4} sm={6} >
                    <figure className="imghvr-fold-up">
                        <Image src="/images/course03.jpg" alt="1080x720" className="img-responsive" />
                        <figcaption>
                            <h3>Collection 3</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam atque, nostrum veniam consequatur libero fugiat, similique quis.</p>
                            <link href="#" />
                        </figcaption>
                    </figure>
                </Col>
                <Col className="padleft-right" md={4} sm={6} >
                    <figure className="imghvr-fold-up">
                        <Image src="/images/course06.jpg" alt="1080x720" className="img-responsive" />
                        <figcaption>
                            <h3>Collection 4</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam atque, nostrum veniam consequatur libero fugiat, similique quis.</p>
                            <link href="#" />
                        </figcaption>
                    </figure>
                </Col>
                <Col className="padleft-right" md={4} sm={6} >
                    <figure className="imghvr-fold-up">
                        <Image src="/images/course04.jpg" alt="1080x720" className="img-responsive" />
                        <figcaption>
                            <h3>Collection 5</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam atque, nostrum veniam consequatur libero fugiat, similique quis.</p>
                            <link href="#" />
                        </figcaption>
                    </figure>
                </Col>
                <Col className="padleft-right" md={4} sm={6} >
                    <figure className="imghvr-fold-up">
                        <Image src="/images/course08.jpg" alt="1080x720" className="img-responsive" />
                        <figcaption>
                            <h3>Collection 6</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam atque, nostrum veniam consequatur libero fugiat, similique quis.</p>
                            <link href="#" />
                        </figcaption>
                    </figure>
                </Col>
            </Row>
        )
        return imageCollection;
    }
    render() {
        let imageCollection = this.buildImageCollection();
        let slider = this.buildSlider();
        let productCollection = this.buildProductCollection();
        return (
            <div>
                <Grid className="img-slider" fluid={true}>
                    <Row className="splash">
                        <Col>
                            {slider}
                        </Col>
                    </Row>
                </Grid>
                <Grid fluid={false}>
                    <Row className="title-text-center" id="product-collection">
                        <Col>
                            <h1>Bộ Sưu Tập Mùa Hè</h1>
                        </Col>
                    </Row>
                    <Row className="p-y-1">
                        <Col md={12}>
                            {productCollection}
                        </Col>
                    </Row>
                </Grid>

                <Grid fluid={false}>
                    <Row className="title-text-center" id="img-collection">
                        <Col>
                            <h1>Collection</h1>
                        </Col>
                    </Row>
                    {imageCollection}
                </Grid>

            </div>);
    }
}
export default Home;