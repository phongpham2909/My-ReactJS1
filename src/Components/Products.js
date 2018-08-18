import React, { Component } from 'react';
import { Table, Panel } from 'react-bootstrap';
import DataUtils from '../Util/DataUtils';
import $ from 'jquery';

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

    buildProductList() {
        let ProductList = DataUtils.getProductList();
        let _productlist = [];

        for (let i in ProductList) {
            _productlist.push(
                <tr key={i} id={ProductList[i].id} onDoubleClick={this.onDetail}>
                    <td>{parseInt(i) + 1}</td>
                    <td>{ProductList[i].name}</td>
                    <td>{ProductList[i].type}</td>
                    <td>{ProductList[i].price}</td>

                </tr>
            )
        }
        return _productlist;

    }
    render() {
        let _productlist = this.buildProductList();
        return (
            <div>
                <Panel bsStyle="primary">
                    <Panel.Heading>
                        <Panel.Title componentClass="h3">Product Managerment</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body><Table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Product Name</th>
                                <th>Type</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {_productlist}
                        </tbody>
                    </Table></Panel.Body>
                </Panel>

            </div>
        );
    }
}

export default Products;