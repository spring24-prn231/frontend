const data = [
    {
        "Id": 1,
        "ServiceName": "Dịch vụ A",
        "RoomType": "Loại phòng A",
        "Description": "Mô tả dịch vụ A",
        "Status": 1,
        "Dishes": [
            {
                "Id": 1,
                "DishType": "Món chính",
                "Name": "Cơm tấm",
                "Image": "com_tam.jpg",
                "Description": "Cơm tấm Việt Nam với thịt heo nướng",
                "Status": "Có sẵn",
                "Price": "7.99"
            },
            {
                "Id": 2,
                "DishType": "Món phụ",
                "Name": "Gỏi cuốn",
                "Image": "goi_cuon.jpg",
                "Description": "Gỏi cuốn Việt Nam",
                "Status": "Có sẵn",
                "Price": "5.99"
            },
            {
                "Id": 3,
                "DishType": "Tráng miệng",
                "Name": "Chè",
                "Image": "che.jpg",
                "Description": "Chè ngọt truyền thống",
                "Status": "Có sẵn",
                "Price": "3.99"
            }
        ]
    },
    {
        "Id": 2,
        "ServiceName": "Dịch vụ B",
        "RoomType": "Loại phòng B",
        "Description": "Mô tả dịch vụ B",
        "Status": 1,
        "Dishes": [
            {
                "Id": 4,
                "DishType": "Món chính",
                "Name": "Phở",
                "Image": "pho.jpg",
                "Description": "Món phở truyền thống Việt Nam",
                "Status": "Có sẵn",
                "Price": "6.99"
            },
            {
                "Id": 5,
                "DishType": "Món phụ",
                "Name": "Bún chả",
                "Image": "bun_cha.jpg",
                "Description": "Bún chả Hà Nội",
                "Status": "Có sẵn",
                "Price": "8.99"
            },
            {
                "Id": 6,
                "DishType": "Tráng miệng",
                "Name": "Chè khoai",
                "Image": "che_khoai.jpg",
                "Description": "Chè khoai dẻo",
                "Status": "Có sẵn",
                "Price": "4.99"
            }
        ]
    },
    {
        "Id": 3,
        "ServiceName": "Dịch vụ C",
        "RoomType": "Loại phòng C",
        "Description": "Mô tả dịch vụ C",
        "Status": 1,
        "Dishes": [
            {
                "Id": 7,
                "DishType": "Món chính",
                "Name": "Bánh mì",
                "Image": "banh_mi.jpg",
                "Description": "Bánh mì Việt Nam thơm ngon",
                "Status": "Có sẵn",
                "Price": "4.99"
            },
            {
                "Id": 8,
                "DishType": "Món phụ",
                "Name": "Bánh xèo",
                "Image": "banh_xeo.jpg",
                "Description": "Bánh xèo miền Nam",
                "Status": "Có sẵn",
                "Price": "5.99"
            },
            {
                "Id": 9,
                "DishType": "Tráng miệng",
                "Name": "Bánh flan",
                "Image": "banh_flan.jpg",
                "Description": "Bánh flan ngọt ngào",
                "Status": "Có sẵn",
                "Price": "3.99"
            }
        ]
    },
    {
        "Id": 4,
        "ServiceName": "Dịch vụ D",
        "RoomType": "Loại phòng D",
        "Description": "Mô tả dịch vụ D",
        "Status": 1,
        "Dishes": [
            {
                "Id": 10,
                "DishType": "Món chính",
                "Name": "Bò bít tết",
                "Image": "bo_bit_tet.jpg",
                "Description": "Bò bít tết kiểu Pháp",
                "Status": "Có sẵn",
                "Price": "12.99"
            },
            {
                "Id": 11,
                "DishType": "Món phụ",
                "Name": "Nem cuốn",
                "Image": "nem_cuon.jpg",
                "Description": "Nem cuốn tươi ngon",
                "Status": "Có sẵn",
                "Price": "4.99"
            },
            {
                "Id": 12,
                "DishType": "Tráng miệng",
                "Name": "Kem",
                "Image": "kem.jpg",
                "Description": "Kem ngon mát",
                "Status": "Có sẵn",
                "Price": "3.49"
            }
        ]
    },
    {
        "Id": 5,
        "ServiceName": "Dịch vụ E",
        "RoomType": "Loại phòng E",
        "Description": "Mô tả dịch vụ E",
        "Status": 1,
        "Dishes": [
            {
                "Id": 13,
                "DishType": "Món chính",
                "Name": "Gà nướng",
                "Image": "ga_nuong.jpg",
                "Description": "Gà nướng thơm ngon",
                "Status": "Có sẵn",
                "Price": "9.99"
            },
            {
                "Id": 14,
                "DishType": "Món phụ",
                "Name": "Cá kho",
                "Image": "ca_kho.jpg",
                "Description": "Cá kho Việt Nam",
                "Status": "Có sẵn",
                "Price": "10.99"
            },
            {
                "Id": 15,
                "DishType": "Tráng miệng",
                "Name": "Sữa chua",
                "Image": "sua_chua.jpg",
                "Description": "Sữa chua ngon",
                "Status": "Có sẵn",
                "Price": "2.99"
            }
        ]
    },
    {
        "Id": 6,
        "ServiceName": "Dịch vụ F",
        "RoomType": "Loại phòng F",
        "Description": "Mô tả dịch vụ F",
        "Status": 1,
        "Dishes": [
            {
                "Id": 16,
                "DishType": "Món chính",
                "Name": "Bún bò Huế",
                "Image": "bun_bo_hue.jpg",
                "Description": "Bún bò Huế thơm ngon",
                "Status": "Có sẵn",
                "Price": "8.99"
            },
            {
                "Id": 17,
                "DishType": "Món phụ",
                "Name": "Bánh canh",
                "Image": "banh_canh.jpg",
                "Description": "Bánh canh miền Trung",
                "Status": "Có sẵn",
                "Price": "6.99"
            },
            {
                "Id": 18,
                "DishType": "Tráng miệng",
                "Name": "Xôi",
                "Image": "xoi.jpg",
                "Description": "Xôi ngọt thơm",
                "Status": "Có sẵn",
                "Price": "3.49"
            }
        ]
    },
    {
        "Id": 7,
        "ServiceName": "Dịch vụ G",
        "RoomType": "Loại phòng G",
        "Description": "Mô tả dịch vụ G",
        "Status": 1,
        "Dishes": [
            {
                "Id": 19,
                "DishType": "Món chính",
                "Name": "Lẩu",
                "Image": "lau.jpg",
                "Description": "Lẩu hải sản",
                "Status": "Có sẵn",
                "Price": "14.99"
            },
            {
                "Id": 20,
                "DishType": "Món phụ",
                "Name": "Bò kho",
                "Image": "bo_kho.jpg",
                "Description": "Bò kho Việt Nam",
                "Status": "Có sẵn",
                "Price": "11.99"
            },
            {
                "Id": 21,
                "DishType": "Tráng miệng",
                "Name": "Chè bưởi",
                "Image": "che_buoi.jpg",
                "Description": "Chè bưởi ngọt ngào",
                "Status": "Có sẵn",
                "Price": "4.49"
            }
        ]
    },
    {
        "Id": 8,
        "ServiceName": "Dịch vụ H",
        "RoomType": "Loại phòng H",
        "Description": "Mô tả dịch vụ H",
        "Status": 1,
        "Dishes": [
            {
                "Id": 22,
                "DishType": "Món chính",
                "Name": "Bánh tráng trộn",
                "Image": "banh_trang_tron.jpg",
                "Description": "Bánh tráng trộn",
                "Status": "Có sẵn",
                "Price": "3.99"
            },
            {
                "Id": 23,
                "DishType": "Món phụ",
                "Name": "Bánh đa cua",
                "Image": "banh_da_cua.jpg",
                "Description": "Bánh đa cua Sài Gòn",
                "Status": "Có sẵn",
                "Price": "5.99"
            },
            {
                "Id": 24,
                "DishType": "Tráng miệng",
                "Name": "Cơm rang",
                "Image": "com_rang.jpg",
                "Description": "Cơm rang hải sản",
                "Status": "Có sẵn",
                "Price": "7.49"
            }
        ]
    },
    {
        "Id": 9,
        "ServiceName": "Dịch vụ I",
        "RoomType": "Loại phòng I",
        "Description": "Mô tả dịch vụ I",
        "Status": 1,
        "Dishes": [
            {
                "Id": 25,
                "DishType": "Món chính",
                "Name": "Bánh canh",
                "Image": "banh_canh.jpg",
                "Description": "Bánh canh cua miền Trung",
                "Status": "Có sẵn",
                "Price": "6.99"
            },
            {
                "Id": 26,
                "DishType": "Món phụ",
                "Name": "Bánh xèo",
                "Image": "banh_xeo.jpg",
                "Description": "Bánh xèo Sài Gòn",
                "Status": "Có sẵn",
                "Price": "5.99"
            },
            {
                "Id": 27,
                "DishType": "Tráng miệng",
                "Name": "Bánh flan",
                "Image": "banh_flan.jpg",
                "Description": "Bánh flan kem caramel",
                "Status": "Có sẵn",
                "Price": "4.99"
            }
        ]
    },
    {
        "Id": 10,
        "ServiceName": "Dịch vụ J",
        "RoomType": "Loại phòng J",
        "Description": "Mô tả dịch vụ J",
        "Status": 1,
        "Dishes": [
            {
                "Id": 28,
                "DishType": "Món chính",
                "Name": "Bánh canh",
                "Image": "banh_canh.jpg",
                "Description": "Bánh canh cá lóc",
                "Status": "Có sẵn",
                "Price": "8.99"
            },
            {
                "Id": 29,
                "DishType": "Món phụ",
                "Name": "Bún riêu",
                "Image": "bun_rieu.jpg",
                "Description": "Bún riêu cua",
                "Status": "Có sẵn",
                "Price": "7.99"
            },
            {
                "Id": 30,
                "DishType": "Tráng miệng",
                "Name": "Chè chuối",
                "Image": "che_chuoi.jpg",
                "Description": "Chè chuối ngon",
                "Status": "Có sẵn",
                "Price": "3.99"
            }
        ]
    }
];

export default data;