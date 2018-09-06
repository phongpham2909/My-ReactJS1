import React, { Component } from 'react';
import queryString from 'query-string';
import DataUtils from '../Util/DataUtils';
import { Grid, Row, Col, Image, ListGroup, ListGroupItem, Button, FormGroup, ControlLabel, FormControl, HelpBlock, Panel, Tab, Tabs } from 'react-bootstrap';
import './CustomStyle/ProductDetail.css';
import 'jquery-toast-plugin';
import 'jquery-toast-plugin/demos/css/jquery.toast.css'

import CurrencyFormat from 'react-currency-format';
import UploadFile from ".//UploadFile";

function FieldGroup({ id, label, help, ...props }) {
    return (
        <FormGroup controlId={id}>
            <ControlLabel>{label}</ControlLabel>
            <FormControl {...props} />
            {help && <HelpBlock>{help}</HelpBlock>}
        </FormGroup>
    );
}

class ProductDetail extends Component {
    constructor(props) {
        super(props);
        this.state = { Id: null, info: null, isEdit: false, brandList: [], catalogList: []};

        this.state.Id = this.getIdFromQueryString();
        if (this.state.Id === 0) {
            this.state.isEdit = true;
        }
        this.state.info = this.getProduct();
        this.handleChange = this.handleChange.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onRemove = this.onRemove.bind(this);
        this.onEdit = this.onEdit.bind(this);
        this.onImageChange = this.onImageChange.bind(this);
        this.buildBrandList = this.buildBrandList.bind(this);
        this.buildCatalogList = this.buildCatalogList.bind(this);
    }

    componentDidMount()
    {
        this.buildBrandList();
        this.buildCatalogList();
    }
    getIdFromQueryString() {
        let Obj = null;
        if (this.props.location && this.props.location.search) {
            Obj = queryString.parse(this.props.location.search);
        }
        if (Obj.id !== undefined) {
            Obj.id = parseInt(Obj.id);
        }
        return Obj.id !== undefined?Obj.id:null;
    }
    buildBrandList() {
        DataUtils.getList("/api/brand/list")
            .then((res) => {
                let _brandList = [];
                if (res.Success) {
                    for (let i in res.Data) { console.log(2223, i, res.Data[i])
                        _brandList.push(
                            <option key={i} value={res.Data[i].brand_id}>{res.Data[i].brand_name}</option>
                        )
                    }
                }
                this.setState({ brandList: _brandList });
               
            })
       
    }
    
    buildCatalogList() {
        DataUtils.getList("/api/catalog/list")
            .then((res) => {
                let _catalogList = [];
                if (res.Success) {
                    for (let i in res.Data) {console.log(22231, i, res.Data[i])
                        _catalogList.push(
                            <option key={i} value={res.Data[i].catalog_id}>{res.Data[i].catalog_name}</option>
                        )
                    }
                }
                  this.setState({catalogList: _catalogList});
            })
    }
    getProduct() {
        let product = null;
        if (this.state.Id !== 0) {
            DataUtils.getItem("/api/inventory/item", this.state.Id)
                .then((res) => {
                    if (res.Success && res.Data) {
                        this.setState({ info: res.Data });
                    }
                });
        }
        else {
            product = {
                id: 0,
                inventory_name: '',
                inventory_catalog: '',
                inventory_img: '',
                inventory_price: 0,
                inventory_saleoff: 0,
                inventory_brand: '',
                inventory_description: "",
            }
        }
        return product;
    }
    handleChange(event) {
        let name = event.target.name;
        let _info = this.state.info;
        _info[name] = event.target.value;
        if(name === "brand_id") {
            _info['inventory_brand'] = window.jQuery(event.target)[0].selectedOptions[0].innerText;
        }

        if(name === "catalog_id") {
            _info['inventory_catalog'] = window.jQuery(event.target)[0].selectedOptions[0].innerText;
        }
        this.setState({info: _info});
    }
    onRemove(event) {
        if (!this.state.info.inventory_id)
            return;

        DataUtils.removeProduct("/api/inventory/delete", this.state.info.inventory_id)
            .then((res) => {
                if (res.Success) {
                    window.jQuery.toast({
                        heading: 'Thành Công',
                        text: 'Xóa sản phẩm thành công.',
                        showHideTransition: 'slide',
                        position: 'bottom-right',
                        icon: 'success',
                    });
                    setTimeout((e) => { window.location.href = "/quan-ly-san-pham" }, 1000);
                } else {
                    window.jQuery.toast({
                        heading: 'Lỗi',
                        text: 'Xóa sản phẩm thất bại.',
                        showHideTransition: 'slide',
                        position: 'bottom-right',
                        icon: 'error'
                    })
                }
            });
    }
    onEdit() {
        this.setState({ isEdit: true });
    }
    onSave() {
        let api = "/api/inventory/update";
        let saveData = this.state.info;
        if (this.state.Id === 0) {
            api = "/api/inventory/create";
            saveData['id'] = 0;
            delete saveData['inventory_id'];
        } else {
            saveData['id'] = saveData['inventory_id'];
            //delete saveData['inventory_id'];
        }

        DataUtils.saveProduct(api, saveData)
            .then((res) => {
                let msg = "Cập nhật ";
                if (this.state.info.id === 0) {
                    msg = "Tạo mới "
                }
                if (res.Success) {
                    window.jQuery.toast({
                        heading: 'Thành Công',
                        text: msg + 'sản phẩm thành công.',
                        showHideTransition: 'slide',
                        position: 'bottom-right',
                        icon: 'success',
                    });
                    setTimeout((e) => { window.location.href = "/quan-ly-san-pham" }, 1000);
                } else {
                    window.jQuery.toast({
                        heading: 'Lỗi',
                        text: msg + 'sản phẩm thất bại.',
                        showHideTransition: 'slide',
                        position: 'bottom-right',
                        icon: 'error'
                    })
                }
            });
    }
    onImageChange(res) {
        if (res.Success) {
            let imgPath = "http://gunivn.com/guni/" + res.Data.filepath;
            let _info = this.state.info;
            _info['inventory_img'] = imgPath;
            this.setState({ info: _info });
        }
    }
   /* // Build form Edit Thông số kỹ thuật
    buildEditProductDetail() {
        const formInstance = (
            <form>
                <FieldGroup
                    id="formControlsName"
                    type="text"
                    name="donviluukho"
                    label="Đơn Vị Lưu Kho"
                    placeholder="Nhập thông tin đơn vị lưu kho "
                    defaultValue={this.state.info.donviluukho}
                    onChange={this.HandelChange}
                />
                <FieldGroup
                    id="formControlsImage"
                    type="text"
                    name="dodaymat"
                    label="Độ Dày Mặt"
                    placeholder="Nhập độ dày mặt đồng hồ"
                    defaultValue={this.state.info.dodaymat}
                    onChange={this.HandelChange}
                />
                <FieldGroup
                    id="formControlsCatalog"
                    type="text"
                    name="colorface"
                    label="Màu Mặt"
                    placeholder="Nhập màu sắc mặt đồng hồ"
                    defaultValue={this.state.info.colorface}
                    onChange={this.HandelChange}
                />
                <FieldGroup
                    id="formControlsBrand"
                    type="text"
                    name="cautaomay"
                    label="Cấu Tạo Máy"
                    placeholder="Nhập thông số cấu tạo máy"
                    defaultValue={this.state.info.cautaomay}
                    onChange={this.HandelChange}
                />
                <FieldGroup
                    id="formControlsSaleOff"
                    type="text"
                    name="chieurongday"
                    label="Chiều Rộng Dây"
                    placeholder="Nhập chiều rộng dây đồng hồ"
                    defaultValue={this.state.info.chieurongday}
                    onChange={this.HandelChange}
                />
                <FieldGroup
                    id="formControlsTextarea"
                    type="text"
                    name="dodaicothedieuchinh"
                    label="Độ Dài Có Thể Điều Chỉnh"
                    placeholder="Nhập độ dài dây có thể điều chỉnh "
                    defaultValue={this.state.info.dodaicothedieuchinh}
                    onChange={this.HandelChange}
                />
                <FieldGroup
                    id="formControlsTextarea"
                    type="text"
                    label="Dây"
                    placeholder="Nhập loại dây"
                    defaultValue={this.state.info.day}
                    onChange={this.HandelChange}
                />
                <FieldGroup
                    id="formControlsTextarea"
                    type="text"
                    label="Màu Dây"
                    placeholder="Nhập màu dây"
                    defaultValue={this.state.info.mauday}
                    onChange={this.HandelChange} />
                <FieldGroup
                    id="formControlsTextarea"
                    type="text"
                    label="Dây Đồng Hồ Thay Thế Được"
                    placeholder="Nhập có hoặc không"
                    defaultValue={this.state.info.daydonghothaythe}
                    onChange={this.HandelChange} />
                <FieldGroup
                    id="formControlsTextarea"
                    type="text"
                    label="Chống Nước"
                    placeholder="Nhập mức độ chống nước của sản phẩm"
                    defaultValue={this.state.info.chongnuoc}
                    onChange={this.HandelChange} />
                <Row>
                    <Col xs={6} sm={6} md={6}>
                        <Button type="button" className="btn-edit-product" onClick={this.onSave} bsStyle="primary" >Cập nhật</Button>
                    </Col>
                    <Col xs={6} sm={6} md={6}>
                        <Button type="button" className="btn-edit-product" bsStyle="primary">Trở về</Button>
                    </Col>
                </Row>
            </form>
        );
        return formInstance;
    }*/
    // Build form Edit Nội dung sản phẩm
    buildEditProductTemplate() {
        const formInstance = (
            <form>
                <FieldGroup
                    id="formControlsName"
                    type="text"
                    name="inventory_name"
                    label="Tên Sản Phẩm"
                    placeholder="Nhập tên sản phẩm"
                    defaultValue={this.state.info.inventory_name}
                    onChange={this.handleChange}
                />
                <Image id="logo" className="img-product-create-new" src={this.state.info.inventory_img} />
                <UploadFile label="Hình ảnh sản phẩm" onChange={this.onImageChange} />

                <FormGroup controlId={"formControlsCatalog"}>
                    <ControlLabel>Danh Mục Sản Phẩm</ControlLabel>
                    <FormControl onChange={this.handleChange} defaultValue={this.state.info.catalog_id} name="catalog_id" componentClass="select" placeholder="Nhập danh mục sản phẩm">
                        {this.state.catalogList}
                    </FormControl>
                </FormGroup>

                <FormGroup controlId={"formControlsBrand"}>
                    <ControlLabel>Thương Hiệu</ControlLabel>
                    <FormControl onChange={this.handleChange} defaultValue={this.state.info.brand_id} name="brand_id" componentClass="select" placeholder="Nhập thương hiệu">
                        {this.state.brandList}  
                    </FormControl>
                </FormGroup>

                <FieldGroup
                id="formControlsPrice"
                type="number"
                name="inventory_price"
                label="Giá Sản Phẩm"
                placeholder="Nhập Giá Sản Phẩm"
                defaultValue={this.state.info.inventory_price}
                onChange= {this.handleChange}
              />

                <FieldGroup
                    id="formControlsSaleOff"
                    type="number"
                    name="inventory_saleoff"
                    label="Giảm Giá (%)"
                    placeholder="Nhập % giảm giá"
                    defaultValue={this.state.info.inventory_saleoff}
                    onChange={this.handleChange}
                />
                <FormGroup controlId="formControlsDescription">
                    <ControlLabel>Mô Tả Sản Phẩm</ControlLabel>
                    <FormControl defaultValue={this.state.info.inventory_description} onChange={this.handleChange} name="inventory_description" componentClass="textarea" placeholder="Nhập nội dung mô tả sản phẩm" />
                </FormGroup>
                <Button type="button" onClick={this.onSave} bsStyle="primary">Lưu Lại</Button>
            </form>
        );
        console.log(this.state.brandList,3213)
        console.log(this.state.catalogList,3213)
        return formInstance;
    }
    buildProductImage() {
        let imageTemplate = [];
        if (this.state.info !== null) {
            imageTemplate.push(
                <div key={1}>
                    <Image className="images-product" src={this.state.info.inventory_img} responsive />
                </div>
            )
        }
        return imageTemplate;
    }
    buildDescription() {
        let descriptionTemplate = [];
        if (this.state.info !== null) {
            let saleOffPrice = this.state.info.inventory_price - (this.state.info.inventory_price * (this.state.info.inventory_saleoff * 0.01));
            let salePrice = this.state.info.inventory_price - saleOffPrice;
            let salePriceTemp = (<CurrencyFormat value={salePrice} displayType={'text'} thousandSeparator={true} suffix={' vnđ'} />)

            descriptionTemplate.push(
                <div key={1}>
                    <ListGroup className="list-group-detail">
                        <ListGroupItem header={this.state.info.inventory_name}><span>Thương Hiệu: {this.state.info.inventory_brand}</span></ListGroupItem>
                        <ListGroupItem header='GIÁ SẢN PHẨM'>
                            <span>
                                <strong>
                                    <CurrencyFormat
                                        value={saleOffPrice}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        suffix={' vnđ'}
                                        renderText={value => <span> {value}</span>} /></strong>
                            </span>
                            <br />
                            <span><strong>Giảm giá:</strong> {this.state.info.inventory_saleoff}% </span>
                            <span>
                                ({salePriceTemp})
                           </span>
                            <br />
                            <span><strong>Giá ban đầu: </strong>
                                <CurrencyFormat value={this.state.info.inventory_price} displayType={'text'} thousandSeparator={true} suffix={' vnđ'} />
                            </span>
                        </ListGroupItem>
                    </ListGroup>
                    <span><button className="btn-edit" onClick={this.onEdit}>Chỉnh Sửa</button></span>
                    <span><button className="btn-edit" onClick={this.onRemove}>Xóa</button></span>
                </div>
            )
        }
        return descriptionTemplate;
    }

    buildProductDescriptionShipping() {
        let productDescriptionShipping = [];
        if (this.state.info != null) {
            productDescriptionShipping.push(
                <div key={1}>

                    <Row className="line-detail-des">
                        <Col md={12}>
                            <span dangerouslySetInnerHTML={{ __html: this.state.info.inventory_description }}></span>
                        </Col>
                    </Row>
                </div>
            )
        }
        return productDescriptionShipping;
    }
    /*buildProductDetail() {
        let productDetail = [];
        //let product = this.getProduct();
        if (this.state.info !== null && this.state.info.inventory_catalogid === 1) {
            productDetail.push(
                <div key={1}>
                    <Row className="line-detail">
                        <Col md={12}>
                            <span className="text-label">Đơn vị lưu kho</span>
                            <span className="data">{this.state.info.donviluukho}</span>
                        </Col>
                    </Row>
                    <Row className="line-detail">
                        <Col md={12}>
                            <span className="text-label">Độ dày mặt</span>
                            <span className="data">{this.state.info.dodaymat}</span>
                        </Col>
                    </Row>
                    <Row className="line-detail">
                        <Col md={12}>
                            <span className="text-label">Màu mặt</span>
                            <span className="data">{this.state.info.colorface}</span>
                        </Col>
                    </Row>
                    <Row className="line-detail">
                        <Col md={12}>
                            <span className="text-label">Cấu tạo máy</span>
                            <span className="data">{this.state.info.cautaomay}</span>
                        </Col>
                    </Row>
                    <Row className="line-detail">
                        <Col md={12}>
                            <span className="text-label">Chiều rộng dây</span>
                            <span className="data">{this.state.info.chieurongday}</span>
                        </Col>
                    </Row>
                    <Row className="line-detail">
                        <Col md={12}>
                            <span className="text-label">Độ dài có thể điều chỉnh</span>
                            <span className="data">{this.state.info.dodaicothedieuchinh}</span>
                        </Col>
                    </Row>
                    <Row className="line-detail">
                        <Col md={12}>
                            <span className="text-label">Dây</span>
                            <span className="data">{this.state.info.day}</span>
                        </Col>
                    </Row>
                    <Row className="line-detail">
                        <Col md={12}>
                            <span className="text-label">Màu dây</span>
                            <span className="data">{this.state.info.mauday}</span>
                        </Col>
                    </Row>
                    <Row className="line-detail">
                        <Col md={12}>
                            <span className="text-label">Dây đồng hồ thay thế được</span>
                            <span className="data">{this.state.info.daydonghothaythe}</span>
                        </Col>
                    </Row>
                    <Row className="line-detail">
                        <Col md={12}>
                            <span className="text-label">Chống nước</span>
                            <span className="data">{this.state.info.chongnuoc}</span>
                        </Col>
                    </Row>
                </div>
            )
        }
        else
            if (this.state.info !== null && this.state.info.catalogid === 2) {
                productDetail.push(
                    <div key={1}>
                        <Row className="line-detail">
                            <Col md={12}>
                                <span className="text-label">Mã sản phẩm</span>
                                <span className="data">{this.state.info.masanpham}</span>
                            </Col>
                        </Row>
                        <Row className="line-detail">
                            <Col md={12}>
                                <span className="text-label">Loại sản phẩm</span>
                                <span className="data">{this.state.info.type}</span>
                            </Col>
                        </Row>
                        <Row className="line-detail">
                            <Col md={12}>
                                <span className="text-label">Kích thước (dài x rộng x cao)</span>
                                <span className="data">{this.state.info.kichthuoc}</span>
                            </Col>
                        </Row>
                        <Row className="line-detail">
                            <Col md={12}>
                                <span className="text-label">Chất liệu</span>
                                <span className="data">{this.state.info.chatlieu}</span>
                            </Col>
                        </Row>
                        <Row className="line-detail">
                            <Col md={12}>
                                <span className="text-label">Kiểu khóa</span>
                                <span className="data">{this.state.info.kieukhoa}</span>
                            </Col>
                        </Row>
                        <Row className="line-detail">
                            <Col md={12}>
                                <span className="text-label">Hoa Văn, Chi Tiết</span>
                                <span className="data">{this.state.info.chitiet}</span>
                            </Col>
                        </Row>
                        <Row className="line-detail">
                            <Col md={12}>
                                <span className="text-label">Kích cỡ</span>
                                <span className="data">{this.state.info.kichco}</span>
                            </Col>
                        </Row>
                        <Row className="line-detail">
                            <Col md={12}>
                                <span className="text-label">Phù hợp để sử dụng</span>
                                <span className="data">{this.state.info.phuhop}</span>
                            </Col>
                        </Row>
                    </div>
                )
            }
        return productDetail;
    }*/
    render() {
        if (this.state.isEdit === true) {
            /*let editProductDetail = this.buildEditProductDetail();*/
            let editProductTemplate = this.buildEditProductTemplate();
            return (
                <div>
                    <Panel bsStyle="primary">
                        <Panel.Heading>
                            <Panel.Title componentClass="h3">Chỉnh Sửa Thông Tin Sản Phẩm</Panel.Title>
                        </Panel.Heading>
                        <Panel.Body><Grid fluid={false}>
                            <Row>
                                <Col className="product-edit" xs={12} sm={12} md={6}>
                                    {editProductTemplate}
                                </Col>
                               {/* <Col>
                                    <Col className="product-edit" xs={12} sm={12} md={6}>
                                        {editProductDetail}
                                    </Col>
                               </Col>*/}
                            </Row>
                        </Grid></Panel.Body>
                    </Panel>
                </div>
            );
        }


        let imageTemplate = this.buildProductImage();
       /* let productDetail = this.buildProductDetail();*/
        let descriptionTemplate = this.buildDescription();
        let productDescriptionShipping = this.buildProductDescriptionShipping();
        return (
            <div>
                <Grid fluid={true}>
                    <Row className="product-detail-main">
                        <Col xs={12} sm={12} md={12}>
                            <Row className="product-detail">
                                <Col className="product-detail-img" xs={12} sm={12} md={6}>
                                    {imageTemplate}
                                </Col>
                                <Col className="product-detail-des" xs={12} sm={12} md={6}>
                                    {descriptionTemplate}
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <br />
                    <Row className="product-description-main">
                        <Col xs={12} sm={12} md={12}>
                            <Tabs defaultActiveKey={1} animation={false} id="noanim-tab-example">
                                <Tab eventKey={1} title="MÔ TẢ SẢN PHẨM">
                                    {productDescriptionShipping}
                                </Tab>
                                {/*<Tab eventKey={2} title="THÔNG SỐ KỸ THUẬT">
                                    {productDetail}
                                </Tab>*/}
                            </Tabs>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}
export default ProductDetail;