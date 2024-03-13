const data = [
    {

        "Id": 1,
        "ServiceName": "Gói Tiệc Sinh Nhật",
        "UserName": "John Doe",
        "StaffName": "Sarah Smith",
        "CreateDate": "2024-03-10",
        "Total": 250,
        "Contract": "ABC123",
        "Status": "1",
        "EventEnd": "2024-04-01",
        "EventStart": "2024-03-31",
        "orderDetails": [
            {
                "Id": 1,
                "Amount": 1,
                "Price": 200,
                "Type": "Gói",
                "Cost": 200,
                "Status": "1",
                "Note": "Bao gồm trang trí, bánh và giải trí"
            }
        ]
    },
    {

        "Id": 2,
        "ServiceName": "Bánh Sinh Nhật Theo Yêu Cầu",
        "UserName": "Emily Brown",
        "StaffName": "David Johnson",
        "CreateDate": "2024-03-09",
        "Total": 50,
        "Contract": "DEF456",
        "Status": "2",
        "EventEnd": "2024-03-15",
        "EventStart": "2024-03-15",
        "orderDetails": [
            {
                "Id": 2,
                "Amount": 1,
                "Price": 50,
                "Type": "Bánh",
                "Cost": 50,
                "Status": "2",
                "Note": "Vị sô cô la với trang trí fondant"
            }
        ]
    },
    {

        "Id": 3,
        "ServiceName": "Gói Giải Trí",
        "UserName": "Alice Johnson",
        "StaffName": "Michael Brown",
        "CreateDate": "2024-03-07",
        "Total": 150,
        "Contract": "GHI789",
        "Status": "3",
        "EventEnd": "2024-03-20",
        "EventStart": "2024-03-20",
        "orderDetails": [
            {
                "Id": 3,
                "Amount": 1,
                "Price": 150,
                "Type": "Giải trí",
                "Cost": 150,
                "Status": "1",
                "Note": "Bao gồm ảo thuật và chú hề biểu diễn"
            }
        ]
    },
    {

        "Id": 4,
        "ServiceName": "Gói Trang Trí",
        "UserName": "Sophia Miller",
        "StaffName": "Jessica Davis",
        "CreateDate": "2024-03-05",
        "Total": 80,
        "Contract": "JKL012",
        "Status": "2",
        "EventEnd": "2024-03-25",
        "EventStart": "2024-03-25",
        "orderDetails": [
            {
                "Id": 4,
                "Amount": 1,
                "Price": 80,
                "Type": "Trang trí",
                "Cost": 80,
                "Status": "1",
                "Note": "Bao gồm bóng bay, banner và vải phủ bàn"
            }
        ]
    },
    {

        "Id": 5,
        "ServiceName": "Dịch Vụ Chụp Ảnh",
        "UserName": "Ethan Wilson",
        "StaffName": "Olivia Taylor",
        "CreateDate": "2024-03-02",
        "Total": 200,
        "Contract": "MNO345",
        "Status": "3",
        "EventEnd": "2024-03-10",
        "EventStart": "2024-03-10",
        "orderDetails": [
            {
                "Id": 5,
                "Amount": 1,
                "Price": 200,
                "Type": "Chụp ảnh",
                "Cost": 200,
                "Status": "1",
                "Note": "Bao gồm 2 giờ chụp"
            }
        ]
    },
    {

        "Id": 6,
        "ServiceName": "Dịch Vụ Vẽ Mặt",
        "UserName": "Ava Lee",
        "StaffName": "William Garcia",
        "CreateDate": "2024-02-28",
        "Total": 100,
        "Contract": "PQR678",
        "Status": "3",
        "EventEnd": "2024-03-12",
        "EventStart": "2024-03-12",
        "orderDetails": [
            {
                "Id": 6,
                "Amount": 1,
                "Price": 100,
                "Type": "Vẽ mặt",
                "Cost": 100,
                "Status": "1",
                "Note": "Bao gồm các mẫu thiết kế khác nhau cho trẻ em"
            }
        ]
    },
    {

        "Id": 7,
        "ServiceName": "Dịch Vụ Bóng Bay",
        "UserName": "Liam Martinez",
        "StaffName": "Sophia Rodriguez",
        "CreateDate": "2024-02-25",
        "Total": 120,
        "Contract": "STU901",
        "Status": "2",
        "EventEnd": "2024-03-08",
        "EventStart": "2024-03-08",
        "orderDetails": [
            {
                "Id": 7,
                "Amount": 1,
                "Price": 120,
                "Type": "Bóng bay",
                "Cost": 120,
                "Status": "1",
                "Note": "Bao gồm các hình dạng khác nhau cho trẻ em"
            }
        ]
    },
    {

        "Id": 8,
        "ServiceName": "Gói Trò Chơi",
        "UserName": "Mia Moore",
        "StaffName": "Ethan Perez",
        "CreateDate": "2024-02-22",
        "Total": 180,
        "Contract": "VWX234",
        "Status": "3",
        "EventEnd": "2024-03-05",
        "EventStart": "2024-03-05",
        "orderDetails": [
            {
                "Id": 8,
                "Amount": 1,
                "Price": 180,
                "Type": "Trò chơi",
                "Cost": 180,
                "Status": "1",
                "Note": "Bao gồm các trò chơi tương tác khác nhau cho trẻ em"
            }
        ]
    },
    {

        "Id": 9,
        "ServiceName": "Thuê Địa Điểm",
        "UserName": "Noah Gonzalez",
        "StaffName": "Amelia Walker",
        "CreateDate": "2024-02-20",
        "Total": 300,
        "Contract": "YZA567",
        "Status": "1",
        "EventEnd": "2024-03-03",
        "EventStart": "2024-03-03",
        "orderDetails": [
            {
                "Id": 9,
                "Amount": 1,
                "Price": 300,
                "Type": "Thuê địa điểm",
                "Cost": 300,
                "Status": "1",
                "Note": "Bao gồm phòng tiệc trong 4 giờ"
            }
        ]
    },
    {

        "Id": 10,
        "ServiceName": "Gói Quà Tặng",
        "UserName": "Charlotte Scott",
        "StaffName": "Lucas Martinez",
        "CreateDate": "2024-02-18",
        "Total": 70,
        "Contract": "BCD789",
        "Status": "3",
        "EventEnd": "2024-02-25",
        "EventStart": "2024-02-25",
        "orderDetails": [
            {
                "Id": 10,
                "Amount": 1,
                "Price": 70,
                "Type": "Quà tặng",
                "Cost": 70,
                "Status": "1",
                "Note": "Bao gồm túi đồ chứa đồ chơi đa dạng"
            }
        ]
    }
];

export default data;