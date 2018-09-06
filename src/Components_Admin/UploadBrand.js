import React , {Component} from 'react';
import {FormGroup,ControlLabel} from 'react-bootstrap';

function FieldGroup({ id, label, help, ...props }) {
    return (
        <FormGroup controlId={id}>
            <ControlLabel>{label}</ControlLabel>
            <FormControl {...props} />
            {help && <HelpBlock>{help}</HelpBlock>}
        </FormGroup>
    );
}

class UploadBrand extends Component{

    onUploadChange(res)
    {
        if(res.Success)
        {
            this.setState({});
        }
    }
    render(){
        return(
        <div>
      
        </div>);
    }
}
export default UploadBrand;