import React, { Component } from 'react';
import {Row, Col, Thumbnail, Button } from 'react-bootstrap';
import './CustomStyle/ProductList.css';

import CurrencyFormat from 'react-currency-format';

class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                name: 'CLASSIC SOMERSET',
                type: 'Watch',
                img: '/images/Product/dw-somerset.jpg',
                price: 5200000,
                saleoff: 10,
                brand: 'Daniel Wellington',
                donviluukho: "DW00100121",
                dodaymat: "6mm",
                colorface: "Trắng sữa",
                cautaomay: "Japanese Quartz Movement",
                chieurongday: "20mm",
                dodaicothedieuchinh: "165-215mm",
                day: "Dây da",
                mauday: "Blue",
                daydonghothaythe: "Có",
                chongnuoc: "Tối thiểu 3ATM ( chống nước mưa)",
                description: "<p>Với mặt đồng hồ màu trắng hình trứng, vỏ tối giản và dây da màu nâu nhạt thanh lịch làm từ đồ da của Mỹ, Classic Durham là một phụ kiện tuyệt vời trong bộ sưu tập Classic hàng đầu. Chiếc đồng hồ siêu mỏng (6mm) này phù hợp trong mọi dịp và có cả hai màu vàng hồng và bạc.</p><p>Dây da Durham được làm bằng da chính hãng của Mỹ và được xử lý bằng dầu thực vật. Do bản chất của da dầu, dây đeo sẽ nhạt màu khi uốn cong hoặc kéo căng.</p><p>Màu của dây đeo có thể thay đổi và các thay đổi về tính chất, kết cấu và đặc điểm tự nhiên không bị coi là nhược điểm. Các hoạt động hàng ngày bao gồm tiếp xúc với ánh nắng mặt trời, sử dụng, tiếp xúc với nước và biến đổi sẽ hỗ trợ quá trình tự nhiên này. </p><hr/><p>Tất cả dây đeo của Daniel Wellington đều thay được và có thể dễ dàng thay đổi. Trong số những kiểu dây NATO tươi tắn và dây da thanh lịch được tuyển chọn cẩn thận, bạn sẽ tìm thấy một chiếc đồng hồ độc đáo dành cho tất cả các ngày trong tuần.</p> ",
            }
        };
        if (props.data) {
            this.state.data = props.data;
        }
    }
    render() {
        let saleOffPrice = this.state.data.price - (this.state.data.price * (this.state.data.saleoff * 0.01));
        let salePrice = this.state.data.price - saleOffPrice;
        let salePriceTemp = (<CurrencyFormat value={salePrice} displayType={'text'} thousandSeparator={true} suffix={' vnđ'} />)
        return (
                    <Row className="product content-product-list">
                        <Col xs={12} sm={12} md={12}>
                            <Thumbnail src={this.state.data.img} alt="242x200">
                                <h5>{this.state.data.name}</h5>
                                <p className="product-item-price">
                                    <span >
                                        <CurrencyFormat value={this.state.data.price} displayType={'text'} thousandSeparator={true} suffix={' vnđ'} />
                                    </span>
                                </p>
                            </Thumbnail>
                        </Col>
                    </Row>
        );
    }
}
export default Product;