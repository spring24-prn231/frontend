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
            "content": " thang Loc",
            "image": "https://genex.com.vn/wp-content/uploads/2023/03/Coc-tru-thuc-an-cho-be-FB0010N-3-200x200.jpg"
        },
        {
            "name": "BB",
            "price": "232323",
            "content": " may Loc oi  may Loc oi \
             may Loc oi  may Loc oi  may Loc oi  may Loc oi  may Loc oi  may Loc oi \
             may Loc oi ",
            "image": "https://product.hstatic.net/1000217401/product/beautypro_cat1_1_c1b6e3c712a645efbabc19c802fa8cfa.png"
        },
        {
            "name": "CC",
            "price": "98765432",
            "content": "98765432 98765432 98765432 98765432 98765432 ",
            "image": "https://genex.com.vn/wp-content/uploads/2023/03/Coc-tru-thuc-an-cho-be-FB0010N-3-200x200.jpg"
        }

    ];

    const [currentTable, setCurrentTable] = useState(null);
    const [previousNavbarId, setPreviousNavbarId] = useState("room-show");
    const [isCheckBox, setIsCheckBox] = useState(false);
    const baseNavbar = {
        "room-show": "Phòng",
        "menu-customer": "Thực Đơn",
        "decoration-show": "Trang Trí",
        "stage-cus": "Chương Trình",
        "music-show": "Dịch Vụ Khác"
    }
    useEffect(() => {
        getData();
    }, [previousNavbarId])

    useEffect(() => {
        getPreviousChooseItems(previousNavbarId);
    }, [currentTable])

    const getData = async () => {
        var res;
        if (previousNavbarId == "room-show") {
            res = await getRooms(false);
            changeToGeneralType(res, "name", "price", "description", "image")

        } else if (previousNavbarId == "menu-customer") {
            res = await getDishes(false);
            changeToGeneralType(res, "name", "price", "description", "image")

        } else if (previousNavbarId == "decoration-show") {
            res = await getDecorationShow(false);
            res = getServiceElements(res);
            changeToGeneralType(res, "name", "price", "description", "image")

        } else if (previousNavbarId == "stage-cus") {
            res = await getStageCus(false);
            res = getServiceElements(res);
            changeToGeneralType(res, "name", "price", "description", "image")

        } else if (previousNavbarId == "music-show") {
            res = await getMusicShow(false);
            res = getServiceElements(res);
            changeToGeneralType(res, "name", "price", "description", "image")
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
        titleObject.innerHTML = baseNavbar[currentNavbarId];

    }
    const getSelectedIds = (arrayObj) => {

        // Find select item
        var selectedIds = [];
        for (var i = 0; i < arrayObj.length; i++) {
            if (arrayObj[i].checked) {
                selectedIds.push(arrayObj[i].id);
            }
        }

        return selectedIds;
    }
    const setSelectedItems = () => {
        //Get selected Items
        var selectedIds = getSelectedIds(document.getElementsByName("elementChoose"));

        //Set selected items to localStorage
        localStorage.setItem(previousNavbarId, JSON.stringify(selectedIds));

    }

    const getPreviousChooseItems = (currentNavbarId) => {

        var previousSelectedItems = localStorage.getItem(currentNavbarId);
        var currentChoice = document.getElementsByName("elementChoose");

        //set default for all case
        currentChoice.forEach(function (checkbox) {
            checkbox.checked = false;

        });
        if (previousSelectedItems != null) {
            var listPreviousSelectedItems = JSON.parse(previousSelectedItems);

            currentChoice.forEach(function (checkbox) {
                for (var i = 0; i < listPreviousSelectedItems.length; i++) {
                    if (checkbox.id == listPreviousSelectedItems[i]) {
                        checkbox.checked = true;
                    }
                }

            });
        }

    }
    const changeTable = (currentNavbarId) => {
        if (currentNavbarId == "menu-customer" || currentNavbarId == "music-show" || currentNavbarId == "stage-cus") {
            setIsCheckBox(true);
        } else {
            setIsCheckBox(false);
        }

        setSelectedItems();
        setTableTile(currentNavbarId);
        changeNavbar(currentNavbarId);
    };

    const RedirectToNextStage = () => {

        setSelectedItems("music-show")
        var isNotSelected = false;
        var notSelectedItems = "Vui lòng chọn ";
        for (var key in baseNavbar) {
            var item = localStorage.getItem(key)
            if (item == null) {
                isNotSelected = true;
                notSelectedItems += baseNavbar[key] + ", ";
            } else if (item.length == 2) { //Not parse to JSON --> [] is 2 characters
                isNotSelected = true;
                notSelectedItems += baseNavbar[key] + ", ";
            }
        }

        if (isNotSelected) {
            //Change last comma(,) to dot(.) 
            notSelectedItems = notSelectedItems.substring(0, notSelectedItems.length - 2) + ".";
            alert(notSelectedItems);
        } else {
            window.location = "/customer/previeworder";
        }
    }
    const parseToVND = (money) => {
        var config = { style: 'currency', currency: 'VND', maximumFractionDigits: 9 }
        var formated = new Intl.NumberFormat('vi-VN', config).format(money);
        return formated;
    }

    return (
        <div className="menu-customer">


            <div className="container-xxl py-6 margin-container-custom">
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
                                <li><button className='btn btn-primary rounded-pill button-custom' onClick={() => changeTable("menu-customer")} id="menu-customer">
                                    Thực Đơn</button>
                                </li>
                                <li><button className='btn btn-primary rounded-pill button-custom' onClick={() => changeTable("music-show")} id="music-show">
                                    Dịch Vụ Khác</button>
                                </li>

                            </ul>

                        </nav>


                        <div id="content" className="col-lg-10 scrollable-table-wrapper margin-table-custom">

                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col" style={{ backgroundColor: '#EAA636', zIndex: '100' }}><h5 id="title-table">Phòng</h5></th>
                                    </tr>
                                </thead>
                                <tbody className='' >
                                    {
                                        currentTable == null ? <></>
                                            :

                                            currentTable.map((element) => {
                                                return (

                                                    <tr className='row-container'>

                                                        <img src={element.image} className='col-lg-3' style={{ width: '200px', height: '200px' }}>

                                                        </img>
                                                        <div className='col-lg-9 '>
                                                            <div className='row-content-header'>
                                                                <h5 className='col-lg-9'> {element.name}
                                                                    {previousNavbarId == "room-show" ? <h5>{element.roomType == null ? <></> : element.roomType.name}</h5> : <></>}
                                                                    {previousNavbarId == "menu-customer" ? <h5>{element.dishType  == null ? <></> : element.dishType.name }</h5> : <></>}
                                                                </h5>
                                                                <div className='col-lg-3'>
                                                                    <h5 className=''>Giá: {parseToVND(element.price)}</h5>
                                                                    {isCheckBox
                                                                        ? <h5 className=''>Chọn:<input id={element.id} className='margin-checkbox' name="elementChoose" type='checkbox'></input> </h5>

                                                                        : <h5 className=''>Chọn:<input id={element.id} className='margin-checkbox' name="elementChoose" type='radio' ></input> </h5>
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
                {previousNavbarId == "music-show"
                    ? <button className='btn btn-primary rounded-pill button-custom right-side-button'
                        style={{ fontSize: "x-large" }}
                        onClick={() => RedirectToNextStage()}> Đặt Tiệc</button>
                    : <></>}
            </div>

        </div>

    );

};
export default ServiceCustomer;
