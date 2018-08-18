import React, { Component } from 'react';
import queryString from 'query-string';
import DataUtils from '../Util/DataUtils';

class ProductDetail extends Component {
    constructor(props) {
        super(props);
        this.state = { Id: null }

        this.state.Id = this.getIdFromQueryString();
    }

    getProduct() {
        let product = null;
        if (this.state.Id != null) {
            product = DataUtils.getProduct(this.state.Id);
        }
        return product;
    }

    buildProductDetail() {
        let productDetail = [];
        let product = this.getProduct();
        if (product != null) {
            productDetail.push(
                <div>
                    <span>Name: {product.name}</span>
                    <span>price: {product.price}</span>
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
          let productDetail = this.buildProductDetail();                                          
        return (
            <div>
                {productDetail}
          </div>
        );
    }
}
export default ProductDetail;