import React, { Component } from 'react';
//import {Grid,Row,Col,Thumbnail,Button } from 'react-bootstrap';
//import DataUtils from '../Util/DataUtils';

//import CurrencyFormat from 'react-currency-format';


class HomeForm extends Component {
   /* constructor(props) {
        super(props);
    }

    buildProductList() {
        let ProductList = DataUtils.getProductList();
        let _productlist = [];
        for (let i in ProductList) {
            _productlist.push(
                 <Row key={i}>
                 <Col md={12}>
                    <td>{parseInt(i) + 1}</td>
                    <td><Thumbnail className="product-img" src={ProductList[i].img} alt="100x100"></Thumbnail></td>
                    <td>{ProductList[i].name}</td>
                    <td>{ProductList[i].brand}</td>
                    <td><CurrencyFormat value={ProductList[i].price} displayType={'text'} thousandSeparator={true} suffix={' vnđ'} /></td>
                    <td>{ProductList[i].saleoff}</td>
                    <td><Button className="btn-product-primary" id={ProductList[i].id} onClick={this.onDetail}>Xem Chi Tiết</Button></td>
                    </Col>
                </Row>
            )
        }
        return _productlist;
    }*/
    render() {
       // let _productlist = this.buildProductList();
      return (
          
         /* <Grid>
                   {_productlist}              
              </Grid>*/
              <div>
                  Hello Phong Watch
                  </div>
              
      );
    }
}
export default HomeForm;