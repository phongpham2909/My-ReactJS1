import React, { Component } from 'react';
import {Nav,Navbar,NavItem} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faInfoCircle, faAddressCard, faSignInAlt, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import './CustomStyle/Header.css';

library.add(faHome,faShoppingCart,faInfoCircle,faAddressCard,faSignInAlt)

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {logged: true}
        let session = this.getSession();
        if(session === null)
        {
          this.state.logged = false;
        }
    }
    getSession()
      {
        let session = window.localStorage.getItem("session");
        if(session === null)
        {
          return JSON.parse(session);
        }
        return null;
      }
    buildMenu() {
        let menus = [];
        menus.push(
            <Navbar className="header-tabs" key={1} inverse collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="/">PHONG WATCH</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavItem eventKey={1} href="/"> <FontAwesomeIcon icon="home" /> 
                            Trang Chủ
                        </NavItem>
                        <NavItem eventKey={2} href="/san-pham"><FontAwesomeIcon icon="shopping-cart" /> 
                            Sản Phẩm
                        </NavItem>
                        <NavItem eventKey={3} href="/gioi-thieu"><FontAwesomeIcon icon="address-card" /> 
                            Giới Thiệu
                        </NavItem>
                        <NavItem eventKey={4} href="/lien-he"><FontAwesomeIcon icon="info-circle" /> 
                            Liên Hệ
                        </NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
        return menus;
    }
    render() {
        let headerTemplate = [];
        if(this.state.logged === false && window.location.pathname === "/")  
        {
            let menus = this.buildMenu();
            headerTemplate.push(
                <div key={1}>
                {menus}
                </div>
            );
        }
        return (
            <div>
                {headerTemplate}
            </div>
        );
    }
}

export default Header;
