import React, { Component } from 'react';
import {ListGroup, ListGroupItem, Panel} from 'react-bootstrap';
import './CustomStyle/ShowProducts.css'


class MenuCatalog extends Component {
    constructor(props) {
        super(props);
        this.props = {active: true }
        this.MenuCatalogHandle = this.MenuCatalogHandle.bind(this);
    }
    MenuCatalogHandle(event) {
        let id = event.target.id;
        this.props.onMenuClick(id);
    }
    render() {
        return (
            <div>
                    <Panel>
                        <Panel.Heading>Danh Mục Sản Phẩm</Panel.Heading>
                        <ListGroup >
                            <ListGroupItem id={1} onClick={this.MenuCatalogHandle}>Đồng Hồ</ListGroupItem>
                            <ListGroupItem id={2} onClick={this.MenuCatalogHandle}>Túi Xách</ListGroupItem>
                            <ListGroupItem id={3} onClick={this.MenuCatalogHandle}>classic Petite</ListGroupItem>
                        </ListGroup>
                    </Panel>
            </div>

        );
    }
}
export default MenuCatalog;