import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import InUpForm from './InUpForm';
import HomeForm from './HomeForm';
import AccountForm from './AccountForm';
import HeaderForm from './HeaderForm';
import Profile from './Profile';
import Products from './Products';
import ProductDetail from './ProductDetail';
import Header from '../Components_Content/Header';
import ShowProducts from '../Components_Content/ShowProducts';
import Index from '../Components_Content/Index';
import Brand from './Brand';
import BrandList from './BrandList';
import Catalog from './Catalog';
import CatalogList from './CatalogList';

import '../App.css';

class AppRouter extends Component {
  render() {
    return (
      <div>
        <HeaderForm key={1} />
        <Header key={2}/>
        <Router>
          <Switch>
          <Route key={0} exact path="/" component={Index} />
            <Route key={0.1} path="/san-pham" component={ShowProducts} />
            <Route key={1} exact path="/admin" component={InUpForm} />
            <Route key={1.1} path="/dashboard" component={HomeForm} />
            <Route key={1.2} path="/thanh-vien" component={AccountForm} />
            <Route key={1.3} path="/thong-tin-ca-nhan" component={Profile} />
            <Route key={1.4} path="/quan-ly-san-pham" component={Products} />
            <Route key={1.5} path="/Product/detail" component={ProductDetail} />

            <Route key={1.6} path="/brandlist" component={BrandList}/>
            <Route key={1.7} path="/brand" component={Brand}/>

            <Route key={1.8} path="/cataloglist" component={CatalogList}/>
            <Route key={1.9} path="/catalog" component={Catalog}/>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default AppRouter;