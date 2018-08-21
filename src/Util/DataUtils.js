
let obj = {
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


    getProductList() {
        return [
            {
                id: 1,
                name: 'CLASSIC SOMERSET',
                type: 'Watch',
                img: '/images/Product/dw-somerset.jpg',
                price: 5200000,
                saleoff:10,
                company:'Daniel Wellington',
                description: "<p>Với mặt đồng hồ màu trắng hình trứng, vỏ tối giản và dây da màu nâu nhạt thanh lịch làm từ đồ da của Mỹ, Classic Durham là một phụ kiện tuyệt vời trong bộ sưu tập Classic hàng đầu. Chiếc đồng hồ siêu mỏng (6mm) này phù hợp trong mọi dịp và có cả hai màu vàng hồng và bạc.</p><br/><p>Dây da Durham được làm bằng da chính hãng của Mỹ và được xử lý bằng dầu thực vật. Do bản chất của da dầu, dây đeo sẽ nhạt màu khi uốn cong hoặc kéo căng.</p><br/><p>Màu của dây đeo có thể thay đổi và các thay đổi về tính chất, kết cấu và đặc điểm tự nhiên không bị coi là nhược điểm. Các hoạt động hàng ngày bao gồm tiếp xúc với ánh nắng mặt trời, sử dụng, tiếp xúc với nước và biến đổi sẽ hỗ trợ quá trình tự nhiên này. </p> <hr/> <p>Tất cả dây đeo của Daniel Wellington đều thay được và có thể dễ dàng thay đổi. Trong số những kiểu dây NATO tươi tắn và dây da thanh lịch được tuyển chọn cẩn thận, bạn sẽ tìm thấy một chiếc đồng hồ độc đáo dành cho tất cả các ngày trong tuần.</p> ",
            },
            {
                id: 2,
                name: 'CLASSIC GLASGOW',
                type: 'Watch',
                img: '/images/Product/dw-glasgow.jpg',
                price: '4.500.000 vnđ',
                saleoff:0,
                company:'Daniel Wellington',
                description: '',

            },
            {
                id: 3,
                name: 'CLASSIC SUFFOLK',
                type: 'Watch',
                img: '/images/Product/cl40-limited-rg-cat.jpg',
                price: '5.200.000 vnđ',
                saleoff:0,
                company:'Daniel Wellington',
                description: '',
            }


        ];
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