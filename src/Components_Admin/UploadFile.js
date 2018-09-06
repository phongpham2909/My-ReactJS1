import React, { Component } from 'react';
import {FormControl, FormGroup,ControlLabel,HelpBlock} from 'react-bootstrap';
import DataUtils from '../Util/DataUtils';

function FieldGroup({ id, label, help, ...props }) {
    return (
        <FormGroup controlId={id}>
            <ControlLabel>{label}</ControlLabel>
            <FormControl {...props} />
            {help && <HelpBlock>{help}</HelpBlock>}
        </FormGroup>
    );
}
class UploadFile extends Component {
    handleChange()
    {
        DataUtils.uploadFile()
        .then((res)=>{this.props.onChange(res)});
    }
    buildUploadFile()
    {
       const uploadForm = (
            <FieldGroup
            id="uploadFile"
            type="file"
            label={this.props.label}
            placeholder="Chọn File"
            onChange={this.handleChange.bind(this)}
          />
        )
        return uploadForm;
    }
  render() {
      let uploadForm = this.buildUploadFile();
    return (
      <div>
          {uploadForm}
    </div>
    );
  }
}

export default UploadFile;
