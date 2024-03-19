import React, { useEffect, useState } from 'react';
import './ServiceCustomer.css'
import '../common/customer-css/bootstrap.min.css'
import { getRooms, getDishes, getMusicShow, getDecorationShow, getStageCus } from '../apis/serviceService'
import { changeToGeneralType, getServiceElements } from '../common/custom-js/specificTypeToGeneral'
const ServiceCustomer = () => {
    var mockData = [
        {
            "name": "AA",
            "price": "40004",
            "content": "Dit me thang Loc",
            "image": "https://genex.com.vn/wp-content/uploads/2023/03/Coc-tru-thuc-an-cho-be-FB0010N-3-200x200.jpg"
        },
        {
            "name": "BB",
            "price": "232323",
            "content": "Dit me may Loc oi Dit me may Loc oi \
            Dit me may Loc oi Dit me may Loc oi Dit me may Loc oi Dit me may Loc oi Dit me may Loc oi Dit me may Loc oi \
            Dit me may Loc oi ",
            "image": "https://product.hstatic.net/1000217401/product/beautypro_cat1_1_c1b6e3c712a645efbabc19c802fa8cfa.png"
        },
        {
            "name": "CC",
            "price": "98765432",
            "content": "98765432 98765432 98765432 98765432 98765432 ",
            "image": "https://genex.com.vn/wp-content/uploads/2023/03/Coc-tru-thuc-an-cho-be-FB0010N-3-200x200.jpg"
        }

    ];

    var mockData2 = [
        {
            "name": "CCCCCC",
            "price": "5000",
            "content": "Đoàn quân Việt Nam  <br></br> đi chung lòng cứu </br>quốc, bước chân dồn vang trên đường <br/>gập ghềnh xa, cờ in máu chiến thắng mang hồn nước, súng ngoài xa chen khúc quân hành ca, đường vinh quang xây xác quân thù, thắng gian lao cùng nhau lập chiến khu, vì nhân dân chiến đấu không ngừng, tiến mau ra sa trường. Tiến lên, cùng tiến lên, nước non Việt Nam ta vững bền.",
            "image": "https://cdn.tgdd.vn/2020/08/content/cach-chen-nhac-va-loi-bai-hat-lyric-vao-anh-tren-dien-thoaia-13-490x1020.jpg"
        },
        {
            "name": "AAAAAAAAAAAAAA",
            "price": "232323",
            "content": "Đi dọc Việt Nam theo bánh con tàu quay \
            Qua đèo Hải Vân mây bay đỉnh núi\
            Nhớ khi xưa qua đèo qua suối\
            Mà lòng ta mơ, tàu qua núi cao\
            Ngày hôm nay thênh thang con đường lớn\
            Tàu anh đi trong yêu thương chào đón\
            Xao xuyến bao niềm vui, tha thiết con tàu đi\
            Là thương nhau, em bắt cầu cho tàu anh tới\
            Là yêu nhau, mấy suối em cũng lội\
            Là yêu nhau, mấy núi em cũng trèo ",
            "image": "https://dichthuatproling.com/images/2017/10/dich-thuat-loi-bai-hat-sang-tieng-viet-va-ra-tieng-nuoc-ngoai-2.jpg"
        },
        {
            "name": "DDDDDDDDDDDDDDDD",
            "price": "98765432",
            "content": "Love in your eyes <br></br>\
            Sitting silent by my side </br>\
            Going on Holding hand\
            Walking through the nights\
            Hold me up Hold me tight\
            Lift me up to touch the sky\
            Teaching me to love with heart\
            Helping me open my mind",
            "image": "https://product.hstatic.net/1000217401/product/beautypro_cat1_1_c1b6e3c712a645efbabc19c802fa8cfa.png"
        }

    ];
    const [currentTable, setCurrentTable] = useState(mockData);
    const [previousNavbarId, setPreviousNavbarId] = useState("room-show");
    const [isMenu, setIsMenu] = useState(false);

    useEffect(() => {
        getData();

    }, [previousNavbarId])
    const getData = async () => {
        var res;
        if (previousNavbarId == "room-show") {
            res = await getRooms(false);
            changeToGeneralType(res, "id", "price", "roomNo", "roomTypeId")

        } else if (previousNavbarId == "menu-customer") {
            res = await getDishes(false);
            changeToGeneralType(res, "id", "price", "description", "image")

        } else if (previousNavbarId == "decoration-show") {
            res = await getDecorationShow(false);
            res = getServiceElements(res);
            changeToGeneralType(res,"name", "price", "description", "image")

        } else if (previousNavbarId == "stage-cus") {
            res = await getStageCus(false);
            res = getServiceElements(res);
            changeToGeneralType(res,"name", "price", "description", "image")

        } else if (previousNavbarId == "music-show") {
            res = await getMusicShow(false);
            res = getServiceElements(res);
            changeToGeneralType(res,"name", "price", "description", "image")
        }
        setCurrentTable(res);

    };


    const changeNavbar = (currentNavbarId) => {

        document.getElementById(currentNavbarId).style.color = "#000";

        document.getElementById(previousNavbarId).style.color = "#FFFFFF";

        setPreviousNavbarId(currentNavbarId);

    }

    const setTableTile = (currentNavbarId) => {
        var titleObject = document.getElementById("title-table");
        if (currentNavbarId == "room-show") {
            titleObject.innerHTML = "Phòng";


        } else if (currentNavbarId == "decoration-show") {
            titleObject.innerHTML = "Trang Trí";



        } else if (currentNavbarId == "stage-cus") {
            titleObject.innerHTML = "Chương Trình";



        } else if (currentNavbarId == "music-show") {
            titleObject.innerHTML = "Âm Thanh";



        } else if (currentNavbarId == "menu-customer") {
            titleObject.innerHTML = "Thực Đơn";
        }

    }

    const changeTable = (currentNavbarId) => {
        if (currentNavbarId == "menu-customer") {
            setIsMenu(true);
        } else {
            setIsMenu(false);
        }

        setTableTile(currentNavbarId);
        changeNavbar(currentNavbarId);
    };


    return (
        <div className="menu-customer">


            <div className="container-xxl py-6">
                <div className="container">
                    <h1 className="display-6 mb-4 center-title">DỊCH VỤ</h1>
                    <p className='mb-0 font-menu'>- Dịch vụ tổ chức tiệc sinh nhật của chúng tôi không chỉ là việc tổ chức một buổi tiệc, mà còn là việc tạo ra một trải nghiệm đầy ý nghĩa và đáng nhớ cho bạn. </p>
                    <br></br>

                    <p className='mb-0 font-menu'>
                        - Từ việc lên kế hoạch cho chủ đề đến việc chăm sóc mỗi chi tiết nhỏ, chúng tôi cam kết mang lại sự hài lòng tuyệt đối và không gian ấm áp, vui vẻ cho mọi người tham dự. Hãy để chúng tôi chia sẻ niềm vui và hạnh phúc cùng bạn trong ngày sinh nhật đặc biệt này!
                    </p>
                    <br></br>

                    <div className="wrapper d-flex align-items-stretch">


                        {/* <!--  Side Navigation  --> */}
                        <nav id="sidebar" className='col-lg-2'>
                            <div className="custom-menu">
                                <h5>Quy trình</h5>
                            </div>
                            <ul className="list-unstyled components">
                                <li><button className='btn btn-primary rounded-pill button-custom' style={{ color: "black" }} onClick={() => changeTable("room-show")} id="room-show">
                                    Phòng</button>
                                </li>
                                <li><button className='btn btn-primary rounded-pill button-custom' onClick={() => changeTable("decoration-show")} id="decoration-show">
                                    Trang Trí</button>
                                </li>
                                <li><button className='btn btn-primary rounded-pill button-custom' onClick={() => changeTable("stage-cus")} id="stage-cus">
                                    Chương Trình</button>
                                </li>
                                <li><button className='btn btn-primary rounded-pill button-custom' onClick={() => changeTable("music-show")} id="music-show">
                                    Âm Thanh</button>
                                </li>
                                <li><button className='btn btn-primary rounded-pill button-custom' onClick={() => changeTable("menu-customer")} id="menu-customer">
                                    Thực Đơn</button>
                                </li>
                            </ul>

                        </nav>


                        <div id="content" className="col-lg-10 scrollable-table-wrapper">

                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col" style={{ backgroundColor: '#EAA636', zIndex: '100' }}><h5 id="title-table">Phòng</h5></th>
                                    </tr>
                                </thead>
                                <tbody className='' >
                                    {currentTable.map((element) => {
                                        return (
                                            <tr className='row-container'>
                                                <img src={element.image} className='col-lg-3' style={{ width: '200px', height: '200px' }}>

                                                </img>
                                                <div className='col-lg-9 '>
                                                    <div className='row-content-header'>
                                                        <h5 className='col-lg-9'>{element.name}</h5>
                                                        <div className='col-lg-3'>
                                                            <h5 className=''>Giá: {element.price} vnđ</h5>
                                                            {isMenu
                                                                ? <h5 className=''>Chọn:<input className='margin-checkbox' name="elementChoose" type='checkbox'></input> </h5>

                                                                : <h5 className=''>Chọn:<input className='margin-checkbox' name="elementChoose" type='radio'></input> </h5>
                                                            }

                                                        </div>
                                                    </div>
                                                    <div className='row-content-body'>
                                                        <div>{element.content}</div>
                                                    </div>

                                                </div>

                                            </tr>
                                        )
                                    })
                                    }

                                </tbody>
                            </table>
                        </div>

                    </div>


                </div>
            </div>
        </div>
    );

};
export default ServiceCustomer;
