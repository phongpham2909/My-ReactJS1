import React, { Component } from 'react';
import {Row, Col, Grid, Breadcrumb } from 'react-bootstrap';
import ProductList from './ProductList';
import MenuCatalog from './MenuCatalog';
import './CustomStyle/ShowProducts.css';

class ShowProducts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            path: "",
            type: 0,
        };
        if(this.props.type === undefined)
        {
            this.state.type = this.props.type;
        }
        this.onMenuClick = this.onMenuClick.bind(this);
    }
    onMenuClick(id) {
        this.setState({ type: parseInt(id) });
        console.log(123, id)
    }
    render() {
        return (
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item href="#">Trang Chủ</Breadcrumb.Item>
                    <Breadcrumb.Item active>Tất Cả Sản Phẩm</Breadcrumb.Item>
                </Breadcrumb>
                <Grid bsClass="container">
                    <Row>
                    <Col md={3}>
                            <MenuCatalog onMenuClick={this.onMenuClick} />
                        </Col>
                        <Col md={9}>
                            <ProductList type={this.state.type} />
                        </Col>
                        
                    </Row>
                </Grid>
            </div>
        );
    }
}
export default ShowProducts;