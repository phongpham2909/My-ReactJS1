import React, { Component } from 'react';
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom';

import InUpForm from './InUpForm';
import HomeForm from './HomeForm';
import AccountForm from './AccountForm';
import HeaderForm from './HeaderForm';
import Profile from './Profile';
import Products from './Products';
import ProductDetail from './ProductDetail';

import '../App.css';




class AppRouter extends Component {
    render() {
      return (
        <div>
           <HeaderForm/>
        <Router>
          <Switch>
            <Route exact path="/" component={InUpForm}/>
            <Route path="/Home" component={HomeForm}/>
            <Route path="/Accounts" component={AccountForm}/>
            <Route path="/Profile" component={Profile}/>
            <Route path="/Product-managerment" component={Products}/>
            <Route path="/Product/detail" component={ProductDetail}/>
          </Switch>
        </Router>
        </div>
      );
    }
  }
  
  export default AppRouter;