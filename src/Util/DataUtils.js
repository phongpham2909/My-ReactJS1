let $ = require("jquery");
const STORE_ID = 5;

let obj = {
    uploadFile()
    {
        const data = new FormData();
        let files = $("#uploadFile")[0].files;
        data.append('uploadFile', files[0]);
        return $.when(
            $.ajax({
                url:"http://gunivn.com/guni/index.php/api/upload",
                data:data,
                type:"post",
                contentType:false,
                processData:false,
                cache:false,
                dataType:"json",
            })
        );
    },
    getItem(api, id) {
        let _url = "http://gunivn.com/guni/index.php"+api + "?id="+id+"&store_id=" + STORE_ID;
        return $.when(
            $.ajax({
                method: "GET",
                url: _url,
                dataType: 'json'
            })
        );
    },
    getList(api,filter) {
        let _url = "http://gunivn.com/guni/index.php"+api + "?store_id=" + STORE_ID;
        if(filter) {
            _url += ("&"+ $.param(filter));
        }
        return $.when(
            $.ajax({
                method: "GET",
                url: _url,
                dataType: 'json'
            })
        );
    },
    removeProduct(api, id) {
        return $.when(
            $.ajax({
                method: "POST",
                url: "http://gunivn.com/guni/index.php" + api,
                dataType: 'json',
                data: JSON.stringify({id: id, store_id: STORE_ID})
            })
        );

    },
    saveProduct(api, dataSave) {
        dataSave['store_id'] = STORE_ID
        return $.when(
            $.ajax({
                method: "POST",
                url: "http://gunivn.com/guni/index.php" + api,
                dataType: 'json',
                data: JSON.stringify({data: dataSave})
            })
        );
    },
    createNewProduct(api, dataSave) {
        return $.when(
            $.ajax({
                method: "POST",
                url: "http://127.0.0.1:8000"+api + "?store_id=" + STORE_ID,
                dataType: 'json',
                data: {data: dataSave}
            })
        );
    },
    getUserList() {
        return [
            {
                email: "phongpham2140051@gmail.com",
                firstname: "Phong",
                lastname: "Phạm",
                password: "29091996",
              

            },
            {
                email: "phongpham2140051@gmail.com",
                firstname: "Phong 2",
                lastname: "Phạm",
                password: "123456",

            },
            {
                email: "phongpham2140051@gmail.com",
                firstname: "Phong 3",
                lastname: "Phạm",
                password: "123456789",

            }
        ];

    },
    getUserInfo() {
        let userInfo = window.localStorage.getItem("session");
        if (userInfo !== null) {
            userInfo = JSON.parse(userInfo);
        }
        return userInfo;

    },


    getProductList(type) {
        let data = [
            {
                id: 1,
                name: 'CLASSIC SOMERSET',
                type: 'Watch',
                catalogid: 1,
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
            },
            {
            id: 4,
                name: 'CLASSIC OXFORD',
                type: 'Watch',
                catalogid: 1,
                img: '/images/Product/box-classic-oxford-rg-40.jpg',
                price: 4500000,
                saleoff: 0,
                brand: 'Daniel Wellington',
                donviluukho: "DW00100015",
                dodaymat: "6mm",
                colorface: "Trắng sữa",
                cautaomay: "Japanese Quartz Movement",
                chieurongday: "20mm",
                dodaicothedieuchinh: "165-215mm",
                day: "Dây NATO",
                mauday: "Xanh/Đỏ/Xanh",
                daydonghothaythe: "Có",
                chongnuoc: "Tối thiểu 3ATM ( chống nước mưa)",
                description: "<p>Mẫu đồng hồ thanh tao cổ điển đầy tính thẩm mỹ này được thiết kế tỉ mĩ từng chi tiết. Màu sắc vui mắt của sợi dây NATO hòa quyện với mặt đồng hồ simple tinh tế tạo nên một món trang sức cực kỳ hoàn mỹ. Chiếc đồng hồ Daniel Wellington siêu mỏng (6mm) thích hợp cho mọi sự kiện. Dù là bạn tham gia một sự kiện trang trọng, hay chơi tennis ngoài trời hoặc chỉ đơn thuần tận hưởng một ngày nắng ấm, Daniel Wellington sẽ là một người bạn đồng hành tuyệt đẹp của bạn. Không chỉ vậy, với thiết kế dây đồng hồ có thể thay đổi được, bạn có thể tự làm mới mình mỗi ngày với một chiếc đồng hồ độc đáo khác nhau.</p> ",

            },
            {
                id: 5,
                name: 'CLASSIC BLACK BAYSWATER',
                type: 'Watch',
                catalogid: 1,
                img: '/images/Product/dw00100281_classic_bayswater_b36rg_box.jpg',
                price: 4500000,
                saleoff: 0,
                brand: 'Daniel Wellington',
                donviluukho: "DW00100278",
                dodaymat: "6mm",
                colorface: "Đen",
                cautaomay: "Japanese Quartz Movement",
                chieurongday: "20mm",
                dodaicothedieuchinh: "150-200mm",
                day: "Dây NATO",
                mauday: "Midnight Blue",
                daydonghothaythe: "Có",
                chongnuoc: "Tối thiểu 3ATM ( chống nước mưa)",
                description: "<p>Với những đặc điểm thiết kế cổ điển như vỏ thanh mảnh, chi tiết tinh tế bằng hai màu vàng hồng và bạc, dây đeo NATO màu xanh dương đậm, Classic Bayswater tự tin là chiếc đồng hồ dành cho cả ngày lẫn đêm.</p> ",
            },
            {
                id: 6,
                name: 'CLASSIC PETITE MELROSE',
                type: 'Watch',
                catalogid: 1,
                img: '/images/Product/petit-melrose-black.jpg',
                price: 4000000,
                saleoff: 0,
                brand: 'Daniel Wellington',
                donviluukho: "DW00100161",
                dodaymat: "6mm",
                colorface: "Đen",
                cautaomay: "Japanese Quartz Movement",
                chieurongday: "14mm",
                dodaicothedieuchinh: "150-205mm",
                day: "Mắt lưới",
                mauday: "Rose Gold",
                daydonghothaythe: "Có",
                chongnuoc: "Tối thiểu 3ATM ( chống nước mưa)",
                description: "<h3>CỰC PHONG CÁCH</h3><p>Chiếc đồng hồ Classic Petite Melrose nổi bật với mặt đồng hồ màu đen, thanh lịch cổ điển cộng thêm dáng dấp tươi mới. Chiếc đồng hồ này giúp bạn biến hóa linh hoạt hơn từ phong cách trong văn phòng đến bữa tiệc thượng lưu, sang trọng.</p> ",
            },
        ];

        if (type !== undefined) {
            let tmp = [];
            for (let index in data) {
                if (data[index].catalogid === type) {
                    tmp.push(data[index]);
                }
            }
            data = tmp;
        }
        return data;
    },
    getProduct(id) {
        let productlist = this.getProductList();
        let product = null;
        for (let i in productlist)
            if (productlist[i].id === id) {
                product = productlist[i];
                break;
            }
        return product;

    },

    checkUser(email, password) {
        let userList = this.getUserList();
        let userInfo = null;
        console.log(email, password, userList);
        for (let index in userList) {
            if (userList[index].email === email && userList[index].password === password) {
                console.log(123);
                userInfo = {
                    email: userList[index].email,
                    name: (userList[index].firstname + " " + userList[index].lastname)
                };
                break;
            }

        }
        return userInfo;
    },

};


module.exports = obj;