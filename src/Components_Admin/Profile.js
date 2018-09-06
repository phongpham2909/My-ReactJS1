import React, { Component } from 'react';
import { Grid, Row, Col, Image,Button,Jumbotron } from "react-bootstrap";
import DataUtils from '../Util/DataUtils';
import './CustomStyle/Profile.css';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = { info: null }
        this.state.info = DataUtils.getUserList();
    }
    getUserList() {
        let userlist;
        if (this.state.info !== null) {
            userlist = DataUtils.getUserList();
        }
        return userlist;
    }

    buildUserInfo() {
        let userInfo = DataUtils.getUserInfo();
        let _userTemplate = [];
        if (userInfo !== null) {
            _userTemplate.push(
                <Row key={1}>
                    <Col md={12}>
                        <Image className="img-profile-user" className="pm-staff-profile-image img-thumbnail img-circle" alt="171x180" src="/images/12.jpg" />
                        <p>Full Name: {userInfo.name}</p>
                        <p>Emai: {userInfo.email}</p>
                      
                    </Col>

                </Row>
            )
        }
        return _userTemplate;
    }
    render() {
        let _userTemplate = this.buildUserInfo();
        let userInfo = DataUtils.getUserInfo();
        return (

            <div>
                <Grid>
                    <Row className="show-grid">
                        <Col xs={12} md={4}>
                            {_userTemplate}
                        </Col>
                        <Col xs={12} md={8}>
                            <Jumbotron>
                                <h1>Hello, {userInfo.name}</h1>
                                <p>
                                    Chào mừng bạn đến với trang cá nhân
                                </p>
                                <p>
                                    <Button bsStyle="primary" href="/">Xem Cửa Hàng</Button>
                                </p>
                            </Jumbotron>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }

}
export default Profile;
