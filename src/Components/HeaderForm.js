import React, { Component } from 'react';
import '../Custom_Style/HeaderForm.css';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from "react-bootstrap";

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
      componentDidMount()
      {
        if (this.state.logged === false) {
          if (window.location.pathname !== "/") {
            window.location.href = "/";
          }
        }
      }
    
      getSession()
      {
        let session = window.localStorage.getItem("session");
        if(session != null)
        {
          return JSON.parse(session);
        }
        return null;
      }
    
      buildMenus() {
        let menus = [];
          menus.push((
            <Nav key={1}>
              <NavItem eventKey={1} href="/Home">Home</NavItem>
            </Nav>
          ));
        
          menus.push((
            <Nav key={2}>
              <NavDropdown eventKey={2} title="Managerment" id="basic-nav-dropdown">
                <MenuItem eventKey={2.1} href="/Accounts">User</MenuItem>
                <MenuItem eventKey={2.2} href="/Accounts-rules">Accounts Rules</MenuItem>
              </NavDropdown>
            </Nav>
          ));
          menus.push((
            <Nav key={3}>
              <NavItem eventKey={3} href="/Product-managerment">Product Managerment</NavItem>
            </Nav>
          ));
          menus.push((
            <Nav pullRight key={4}>
              <NavDropdown eventKey={4} title={this.state.userinfo.name} id="nav-profile">
              <MenuItem eventKey={4.1} href="/Profile">Profile</MenuItem>
                <MenuItem eventKey={4.2} onClick={this.onLogout.bind(this)} >Logout</MenuItem>
              </NavDropdown>
            </Nav>
          ));
        return menus;
      }
      onLogout(event) {
        window.localStorage.removeItem("session");
        window.location.href = "/";
        event.preventDefault();
    
      }
    render() {
        let menus = [];
        let headerTemplate = [];
        if(this.state.logged === true && window.location.pathname !== "/sign-in" )
        {
          menus = this.buildMenus();
          headerTemplate.push((
            <Navbar key= {1 }inverse collapseOnSelect>
              <Navbar.Header>
                <Navbar.Brand>
                  <a href="/">PHONG SWATCH</a>
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
