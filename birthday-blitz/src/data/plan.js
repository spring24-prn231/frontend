const data = [
    {
        "Id": "123",
        "EventName": "Sinh nhật bé A",
        "PlanName": "Lịch trình cho sinh nhật",
        "CreatedAt": "20/08/2023",
        "ModifiedAt": "08/02/2024",
        "Host": "Nguyễn Văn B",
        "Plan": [
            {
                "Time": "20/09/2024 18:00",
                "Content": "Giới thiệu buổi tiệc",
                "Id": 1,
                "Feedback": "Cần điều chỉnh thêm nội dung giới thiệu để tạo sự thú vị hơn.",
                "Note": "Cần thêm 2 người phục vụ thêm.",
                "StaffAssignments": ["John Doe", "Jane Smith"]
            },
            {
                "Time": "20/09/2024 18:30",
                "Content": "Biểu diễn ca nhạc",
                "Id": 2,
                "Feedback": "",
                "Note": "",
                "StaffAssignments": []
            },
            {
                "Time": "20/09/2024 19:00",
                "Content": "Ăn uống",
                "Id": 3,
                "Feedback": "",
                "Note": "",
                "StaffAssignments": []
            },
            {
                "Time": "20/09/2024 21:00",
                "Content": "Kết thúc bữa tiệc",
                "Id": 4,
                "Feedback": "",
                "Note": "",
                "StaffAssignments": []
            }
        ]
    },
    {
        "Id": "124",
        "EventName": "Hội thảo về marketing",
        "PlanName": "Kế hoạch tổ chức hội thảo",
        "CreatedAt": "10/10/2023",
        "ModifiedAt": "09/01/2024",
        "Host": "Trần Thị C",
        "Plan": [
            {
                "Time": "25/09/2024 08:30",
                "Content": "Đón khách",
                "Id": 5,
                "Feedback": "",
                "Note": "",
                "StaffAssignments": []
            },
            {
                "Time": "25/09/2024 09:00",
                "Content": "Giới thiệu chương trình",
                "Id": 6,
                "Feedback": "",
                "Note": "",
                "StaffAssignments": []
            },
            {
                "Time": "25/09/2024 09:30",
                "Content": "Thuyết trình",
                "Id": 7,
                "Feedback": "",
                "Note": "",
                "StaffAssignments": []
            },
            {
                "Time": "25/09/2024 11:00",
                "Content": "Giải lao",
                "Id": 8,
                "Feedback": "",
                "Note": "",
                "StaffAssignments": []
            },
            {
                "Time": "25/09/2024 11:30",
                "Content": "Hỏi đáp",
                "Id": 9,
                "Feedback": "",
                "Note": "",
                "StaffAssignments": []
            },
            {
                "Time": "25/09/2024 12:00",
                "Content": "Kết thúc",
                "Id": 10,
                "Feedback": "",
                "Note": "",
                "StaffAssignments": []
            }
        ]
    },
    {
        "Id": "125",
        "EventName": "Buổi hòa nhạc piano",
        "PlanName": "Chi tiết chương trình",
        "CreatedAt": "15/11/2023",
        "ModifiedAt": "05/03/2024",
        "Host": "Phạm Đức D",
        "Plan": [
            {
                "Time": "10/10/2024 19:00",
                "Content": "Mở cửa",
                "Id": 11,
                "Feedback": "",
                "Note": "",
                "StaffAssignments": []
            },
            {
                "Time": "10/10/2024 19:30",
                "Content": "Bắt đầu biểu diễn",
                "Id": 12,
                "Feedback": "",
                "Note": "",
                "StaffAssignments": []
            },
            {
                "Time": "10/10/2024 21:00",
                "Content": "Kết thúc buổi hòa nhạc",
                "Id": 13,
                "Feedback": "",
                "Note": "",
                "StaffAssignments": []
            }
        ]
    },
    {
        "Id": "126",
        "EventName": "Hội chợ du lịch",
        "PlanName": "Lịch trình triển lãm",
        "CreatedAt": "25/12/2023",
        "ModifiedAt": "10/04/2024",
        "Host": "Lê Thị E",
        "Plan": [
            {
                "Time": "05/11/2024 09:00",
                "Content": "Mở cửa",
                "Id": 14,
                "Feedback": "",
                "Note": "",
                "StaffAssignments": []
            },
            {
                "Time": "05/11/2024 09:30",
                "Content": "Khám phá gian hàng",
                "Id": 15,
                "Feedback": "Cần cung cấp thêm thông tin về gian hàng để khách hàng dễ dàng tìm hiểu.",
                "Note": "",
                "StaffAssignments": []
            },
            {
                "Time": "05/11/2024 12:00",
                "Content": "Nghỉ trưa",
                "Id": 16,
                "Feedback": "",
                "Note": "",
                "StaffAssignments": []
            },
            {
                "Time": "05/11/2024 14:00",
                "Content": "Tiếp tục tham quan",
                "Id": 17,
                "Feedback": "",
                "Note": "",
                "StaffAssignments": []
            },
            {
                "Time": "05/11/2024 18:00",
                "Content": "Đóng cửa",
                "Id": 18,
                "Feedback": "",
                "Note": "",
                "StaffAssignments": []
            }
        ]
    },
    {
        "Id": "127",
        "EventName": "Buổi hội thảo y tế",
        "PlanName": "Chương trình chi tiết",
        "CreatedAt": "10/02/2024",
        "ModifiedAt": "01/05/2024",
        "Host": "Nguyễn Thị F",
        "Plan": [
            {
                "Time": "15/03/2024 08:30",
                "Content": "Đăng ký và tiếp đón khách",
                "Id": 19,
                "Feedback": "",
                "Note": "",
                "StaffAssignments": []
            },
            {
                "Time": "15/03/2024 09:00",
                "Content": "Giới thiệu chủ đề",
                "Id": 20,
                "Feedback": "",
                "Note": "",
                "StaffAssignments": []
            },
            {
                "Time": "15/03/2024 10:00",
                "Content": "Thảo luận về các vấn đề y tế",
                "Id": 21,
                "Feedback": "",
                "Note": "",
                "StaffAssignments": []
            },
            {
                "Time": "15/03/2024 12:00",
                "Content": "Nghỉ trưa",
                "Id": 22,
                "Feedback": "",
                "Note": "",
                "StaffAssignments": []
            },
            {
                "Time": "15/03/2024 14:00",
                "Content": "Tiếp tục thảo luận",
                "Id": 23,
                "Feedback": "",
                "Note": "",
                "StaffAssignments": []
            },
            {
                "Time": "15/03/2024 16:00",
                "Content": "Kết thúc",
                "Id": 24,
                "Feedback": "",
                "Note": "",
                "StaffAssignments": []
            }
        ]
    },
    {
        "Id": "128",
        "EventName": "Hội thảo về phát triển cá nhân",
        "PlanName": "Kế hoạch tổ chức hội thảo",
        "CreatedAt": "15/03/2024",
        "ModifiedAt": "05/06/2024",
        "Host": "Trần Văn G",
        "Plan": [
            {
                "Time": "20/04/2024 09:00",
                "Content": "Đón khách và đăng ký",
                "Id": 25,
                "Feedback": "",
                "Note": "",
                "StaffAssignments": []
            },
            {
                "Time": "20/04/2024 09:30",
                "Content": "Khởi đầu hội thảo",
                "Id": 26,
                "Feedback": "",
                "Note": "",
                "StaffAssignments": []
            },
            {
                "Time": "20/04/2024 11:00",
                "Content": "Giải lao",
                "Id": 27,
                "Feedback": "",
                "Note": "",
                "StaffAssignments": []
            },
            {
                "Time": "20/04/2024 11:30",
                "Content": "Thảo luận nhóm",
                "Id": 28,
                "Feedback": "",
                "Note": "",
                "StaffAssignments": []
            },
            {
                "Time": "20/04/2024 12:30",
                "Content": "Nghỉ trưa",
                "Id": 29,
                "Feedback": "",
                "Note": "",
                "StaffAssignments": []
            },
            {
                "Time": "20/04/2024 14:00",
                "Content": "Tiếp tục hội thảo",
                "Id": 30,
                "Feedback": "",
                "Note": "",
                "StaffAssignments": []
            },
            {
                "Time": "20/04/2024 16:00",
                "Content": "Kết thúc",
                "Id": 31,
                "Feedback": "",
                "Note": "",
                "StaffAssignments": []
            }
        ]
    },
    {
        "Id": "129",
        "EventName": "Workshop về nghệ thuật sáng tạo",
        "PlanName": "Chi tiết chương trình",
        "CreatedAt": "01/06/2024",
        "ModifiedAt": "10/09/2024",
        "Host": "Hoàng Thị H",
        "Plan": [
            {
                "Time": "10/07/2024 09:30",
                "Content": "Đăng ký và tiếp đón",
                "Id": 32,
                "Feedback": "",
                "Note": "",
                "StaffAssignments": []
            },
            {
                "Time": "10/07/2024 10:00",
                "Content": "Bắt đầu workshop",
                "Id": 33,
                "Feedback": "",
                "Note": "",
                "StaffAssignments": []
            },
            {
                "Time": "10/07/2024 11:30",
                "Content": "Giải lao",
                "Id": 34,
                "Feedback": "",
                "Note": "",
                "StaffAssignments": []
            },
            {
                "Time": "10/07/2024 12:00",
                "Content": "Thực hành",
                "Id": 35,
                "Feedback": "",
                "Note": "",
                "StaffAssignments": []
            },
            {
                "Time": "10/07/2024 13:00",
                "Content": "Nghỉ trưa",
                "Id": 36,
                "Feedback": "",
                "Note": "",
                "StaffAssignments": []
            },
            {
                "Time": "10/07/2024 14:30",
                "Content": "Tiếp tục workshop",
                "Id": 37,
                "Feedback": "",
                "Note": "",
                "StaffAssignments": []
            },
            {
                "Time": "10/07/2024 16:00",
                "Content": "Kết thúc",
                "Id": 38,
                "Feedback": "",
                "Note": "",
                "StaffAssignments": []
            }
        ]
    },
    {
        "Id": "130",
        "EventName": "Buổi tọa đàm về công nghệ mới",
        "PlanName": "Chương trình chi tiết",
        "CreatedAt": "15/08/2024",
        "ModifiedAt": "05/11/2024",
        "Host": "Nguyễn Thành I",
        "Plan": [
            {
                "Time": "20/09/2024 09:00",
                "Content": "Đón khách và đăng ký",
                "Id": 39,
                "Feedback": "",
                "Note": "",
                "StaffAssignments": []
            },
            {
                "Time": "20/09/2024 09:30",
                "Content": "Giới thiệu về chương trình",
                "Id": 40,
                "Feedback": "",
                "Note": "",
                "StaffAssignments": []
            },
            {
                "Time": "20/09/2024 10:00",
                "Content": "Thảo luận về công nghệ mới",
                "Id": 41,
                "Feedback": "",
                "Note": "",
                "StaffAssignments": []
            },
            {
                "Time": "20/09/2024 12:00",
                "Content": "Nghỉ trưa",
                "Id": 42,
                "Feedback": "",
                "Note": "",
                "StaffAssignments": []
            },
            {
                "Time": "20/09/2024 13:30",
                "Content": "Tiếp tục thảo luận",
                "Id": 43,
                "Feedback": "",
                "Note": "",
                "StaffAssignments": []
            },
            {
                "Time": "20/09/2024 15:00",
                "Content": "Kết thúc",
                "Id": 44,
                "Feedback": "",
                "Note": "",
                "StaffAssignments": []
            }
        ]
    },
    {
        "Id": "131",
        "EventName": "Buổi triển lãm nghệ thuật",
        "PlanName": "Kế hoạch tổ chức triển lãm",
        "CreatedAt": "20/09/2024",
        "ModifiedAt": "10/12/2024",
        "Host": "Trần Thị K",
        "Plan": [
            {
                "Time": "25/10/2024 10:00",
                "Content": "Mở cửa",
                "Id": 45,
                "Feedback": "",
                "Note": "",
                "StaffAssignments": []
            },
            {
                "Time": "25/10/2024 10:30",
                "Content": "Tham quan triển lãm",
                "Id": 46,
                "Feedback": "",
                "Note": "",
                "StaffAssignments": []
            },
            {
                "Time": "25/10/2024 12:30",
                "Content": "Nghỉ trưa",
                "Id": 47,
                "Feedback": "",
                "Note": "",
                "StaffAssignments": []
            },
            {
                "Time": "25/10/2024 14:00",
                "Content": "Tiếp tục tham quan",
                "Id": 48,
                "Feedback": "",
                "Note": "",
                "StaffAssignments": []
            },
            {
                "Time": "25/10/2024 18:00",
                "Content": "Đóng cửa",
                "Id": 49,
                "Feedback": "",
                "Note": "",
                "StaffAssignments": []
            }
        ]
    }
]
;

export default data;