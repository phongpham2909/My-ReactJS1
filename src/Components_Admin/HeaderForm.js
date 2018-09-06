import React, { Component } from 'react';
import './CustomStyle/HeaderForm.css';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faSignOutAlt, faCrown, faUser, faCartPlus, faBars, faTachometerAlt } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

library.add(faUserCircle,faSignOutAlt,faCrown,faUser,faCartPlus,faBars,faTachometerAlt)

class HeaderForm extends Component {
    constructor(props) {
        super(props);
        this.state = {logged: false, userinfo: {email: "",name: ""}};
    
        let session = this.getSession();
        if(session !== null)
        {
          this.state.userinfo.email = session.email;
          this.state.userinfo.name = session.name;
          this.state.logged = true;
        }
    
      }
      handleChange(event)
      {
        let name = event.target.name;
        let _info = this.state.info;
        _info[name] = event.target.value;
        this.setState({info: _info});
      }
      getSession()
      {
        let session = window.localStorage.getItem("session");
        if(session !== null)
        {
          return JSON.parse(session);
        }
        return null;
      }
      onLogout(event) {
        window.localStorage.removeItem("session");
        window.location.href = "/admin";
        event.preventDefault();
      }
      buildMenus() {
        let menus = [];
          menus.push((
            <Nav key={1}>
              <NavItem eventKey={1} href="/dashboard"><FontAwesomeIcon icon="tachometer-alt"/>Dashboard</NavItem>
            </Nav>
          ));
          menus.push((
            <Nav key={2}>
            <NavDropdown eventKey={2} title="Quản Lý" id="basic-nav-dropdown">
                <MenuItem href="/thanh-vien" eventKey={2.1}><FontAwesomeIcon icon="user"/>Thành Viên</MenuItem>
                <NavItem eventKey={2.2} href="/brandlist">
                <FontAwesomeIcon icon="crown"/>Thương Hiệu
                </NavItem>   
                <NavItem eventKey={2.3} href="/cataloglist">
                <FontAwesomeIcon icon="bars"/>Danh Mục Sản Phẩm
                </NavItem>   
                <NavItem eventKey={2.4} href="/quan-ly-san-pham">
                <FontAwesomeIcon icon="cart-plus"/>Sản Phẩm
            </NavItem>
            </NavDropdown>
        </Nav>
          ));
          menus.push((
            <Nav pullRight key={3}>
              <NavDropdown eventKey={3} title={this.state.userinfo.name} id="nav-profile">
              <MenuItem eventKey={3.1} href="/thong-tin-ca-nhan"><FontAwesomeIcon icon="user-circle"/>Thông Tin Cá Nhân</MenuItem>
                <MenuItem eventKey={3.2} onClick={this.onLogout.bind(this)} ><FontAwesomeIcon icon="sign-out-alt"/>Đăng Xuất</MenuItem>
              </NavDropdown>  
            </Nav>
          ));
        return menus;
      }
    render() {
        let menus = [];
        let headerTemplate = [];
        if(this.state.logged === true)  
        {
          menus = this.buildMenus();
          headerTemplate.push((
            <Navbar key= {1 }inverse collapseOnSelect>
              <Navbar.Header>
                <Navbar.Brand>
                  <a className="navbar-brand" href="/">PHONG WATCH</a>
                </Navbar.Brand>
                <Navbar.Toggle />
              </Navbar.Header>
              <Navbar.Collapse>
                {menus}
              </Navbar.Collapse>
            </Navbar>
          ));
        }
      return (
        <div>
        {headerTemplate}
      </div>
      );
    }
}
export default HeaderForm;
