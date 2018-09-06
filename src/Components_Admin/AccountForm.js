import React, { Component } from 'react';
import {Table, Panel,Grid,Row,Col} from 'react-bootstrap';
import DataUtils from '../Util/DataUtils';

class AccountForm extends Component {

    buildAccountList()
    {
        let AccountList = DataUtils.getUserList();
        let _accountlist = [];
         
        for(let i in AccountList)
        {
            _accountlist.push(
                <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{AccountList[i].firstname}</td>
                    <td>{AccountList[i].lastname}</td>
                    <td>{AccountList[i].email}
                    </td> 
                </tr>
            )
        }
        return _accountlist;
    }
  render() {
      let _accountlist = this.buildAccountList();
    return (
        <div>
            <Grid fluid={true}>
                <Row>
                    <Col md={12}>
            <Panel bsStyle="primary">
                <Panel.Heading>
                    <Panel.Title componentClass="h3">Thông Tin Thành Viên</Panel.Title>
                </Panel.Heading>
                <Panel.Body><Table className="vertical-product" responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {_accountlist}
                    </tbody>
                </Table></Panel.Body>
            </Panel>
            </Col>
            </Row>
            </Grid>

        </div>
    );
  }
}

export default AccountForm;