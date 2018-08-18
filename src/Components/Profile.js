import React, { Component } from 'react';
import {Panel} from "react-bootstrap";
import DataUtils from '../Util/DataUtils';

class Profile extends Component{
    buildUserInfo()
    {
        let userInfo = DataUtils.getUserInfo();
        let template = [];
        if(userInfo !== null)
        {
            template.push(
                <div key={1}>
                    <span> Emai: {userInfo.email}</span>
                    <br/>
                    <span> Full Name: {userInfo.name}</span>
                    
                    </div>
            )
        }
        return template;
    }
    render(){
        let _userTemplate = this.buildUserInfo();
        return(

            <div>
            <Panel bsStyle="primary">
                <Panel.Heading>
                    <Panel.Title componentClass="h3">User Managerment</Panel.Title>
                </Panel.Heading>
                <Panel.Body>
                    {_userTemplate}
                </Panel.Body>
            </Panel>

        </div>

        );
    }

}
export default Profile;
