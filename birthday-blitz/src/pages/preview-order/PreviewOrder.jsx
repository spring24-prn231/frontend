import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'
import { toast } from 'react-toastify';
import { getRoom, getMenu, getServiceElement, createOrders } from '../apis/previewOrder';
import './PreviewOrder.css'
const mockData = [
    {
        "name": "AA",
        "price": "0",
    },
    {
        "name": "AA",
        "price": "0",


    }

]
const PreviewOrder = () => {

    const [room, setRoom] = useState(mockData);
    const [menu, setMenu] = useState(null);
    const [decoration, setDecoration] = useState(mockData);
    const [stage, setStage] = useState(mockData);
    const [music, setMusic] = useState(mockData);
    const [staticTotal, setStaticTotal] = useState(0);
    const [numOfCustomer, setNumOfCustomer] = useState(1);
    const [totalMenu, setTotalMenu] = useState(0);

    useEffect(() => {
        var localRoom = getDataFromLocal("room-show");
        var localMenu = getDataFromLocal("menu-customer")
        var localDecoration = getDataFromLocal("decoration-show")
        var localStage = getDataFromLocal("stage-cus")
        var localMusic = getDataFromLocal("music-show")

        if (localRoom == null || localMenu == null || localDecoration == null || localStage == null|| localMusic == null) {
            window.location = "/customer/service";
            return;
        }
        if (localRoom.length == 0 || localMenu.length == 0 || localDecoration.length == 0 || localStage.length == 0 || localMusic.length == 0) {
            window.location = "/customer/service";
            return;
        }

        getRoomData(localRoom);

        getMenuData(localMenu);

        getServiceElementData(localDecoration, "decoration")

        getServiceElementData(localStage, "stage")

        getServiceElementData(localMusic, "music")

        setChooseDate();

    }, [])
    // ********** HANDLE GET DATA ************
    const getRoomData = async (initialArray) => {
        var obj;
        obj = await getRoom(false, initialArray[0])
        setStaticTotal(prevTotal => prevTotal + obj[0].price)
        setRoom(obj);
    };

    const getMenuData = async (initialArray) => {
        var arrayObject = [];
        var initTotal = 0;
        for (var i = 0; i < initialArray.length; i++) {
            var obj = await getMenu(false, initialArray[i]);
            arrayObject.push(obj);
            initTotal += obj[0].price;

        }
        setTotalMenu(initTotal);
        setMenu(arrayObject)
    };

    const getServiceElementData = async (initialArray, nameService) => {
        var obj;

        obj = await getServiceElement(false, initialArray[0])
        setStaticTotal(prevTotal => prevTotal + obj[0].price)



        if (nameService == "decoration") {
            setDecoration(obj)

        } else if (nameService == "stage") {
            setStage(obj)

        } else if (nameService == "music") {
            setMusic(obj);
        }
    };

    const getDataFromLocal = (objectName) => {
        return JSON.parse(localStorage.getItem(objectName))
    }
    const clearDataFromLocal = () => {
       
        localStorage.removeItem("room-show");
        localStorage.removeItem("menu-customer");
        localStorage.removeItem("decoration-show");
        localStorage.removeItem("stage-cus");
        localStorage.removeItem("music-show");



    }
    // ********** HANDLE GET DATA ************

    // ********** HANDLE DATE ************
    const getTomrrowDate = () => {
        var today = new Date();

        // Calculate the date for tomorrow
        var tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 2);
        return tomorrow;
    }
    const setChooseDate = () => {
        var startDate = document.getElementById("startTime");
        var endDate = document.getElementById("endTime");

        // Format the date for input (YYYY-MM-DDTHH:MM)
        var tomorrow = getTomrrowDate();
        var tomorrowStartFormatted = tomorrow.toISOString().split('T')[0] + 'T17:00';
        var tomorrowEndFormatted = tomorrow.toISOString().split('T')[0] + 'T20:00';

        startDate.setAttribute('min', tomorrowStartFormatted);
        startDate.setAttribute('value', tomorrowStartFormatted);

        endDate.setAttribute('min', tomorrowEndFormatted);
        endDate.setAttribute('value', tomorrowEndFormatted);
    }

    const compareTime = () => {
        // alert("Hello")
        var startDate = document.getElementById('startTime');
        var endDate = document.getElementById('endTime');

        if (startDate.value >= endDate.value) {
            alert("Thời gian bắt đầu trước thời gian kết thúc");

            var tomorrow = getTomrrowDate();
            var tomorrowStartFormatted = tomorrow.toISOString().split('T')[0] + 'T17:00';
            var tomorrowEndFormatted = tomorrow.toISOString().split('T')[0] + 'T20:00';

            startDate.setAttribute('min', tomorrowStartFormatted);
            startDate.setAttribute('value', tomorrowStartFormatted);

            endDate.setAttribute('min', tomorrowEndFormatted);
            endDate.setAttribute('value', tomorrowEndFormatted);
        }

    }

    const IsTommorow = () => {
        var startDate = new Date(document.getElementById("startTime").value);
        var endDate = new Date(document.getElementById("endTime").value);
        var today = new Date();


        if (startDate <= today || endDate <= today)
            return false;

        return true;
    }
    // ********** HANDLE DATE ************

    // ********** HANDLE SUBMIT BUTTON ************
    const numberOfCustomerMoreThan0 = () => {
        var customerNumber = document.getElementById("customerNumber").value;
        if (customerNumber < 1)
            return false;
        return true;
    }
    const nameIsNotEmpty = () => {

        var nameBirthday = document.getElementById("nameBirthday").value;
        if (nameBirthday == "")
            return false;
        return true;

    }

    const createRequest = () => {
        var roomTypeId = room[0].roomTypeId;
            var name = document.getElementById("nameBirthday").value;
            var description = document.getElementById("description").value;
            var serviceElementIds = getDataFromLocal("decoration-show").concat(getDataFromLocal("stage-cus")).concat(getDataFromLocal("music-show"));
            var dishIds = getDataFromLocal("menu-customer");
            var recommendServiceId = "";
            var eventStart = document.getElementById("startTime").value;
            var eventEnd = document.getElementById("endTime").value;
            var maxGuest = document.getElementById("customerNumber").value;
            var request = {
                "newService": {
                    "roomTypeId": roomTypeId,
                    "name": name,
                    "description": description,
                    "serviceElementIds": serviceElementIds,
                    "dishIds": dishIds

                },
               // "recommendServiceId": recommendServiceId,
                "eventStart": eventStart,
                "eventEnd": eventEnd,
                "maxGuest": maxGuest,
                "total": totalMenu + staticTotal,
                "name": name
            }
            createOrders(request).then(res => {
                alert("Thêm thành công");
                clearDataFromLocal();
                window.location = "./service"
                // toast.success("Thêm thành công !!!", {
                //     position: "bottom-right",
                //     containerId: 'status'
                // });

            }).catch(err => {
                alert("Thêm thất bại");
                // toast.error("Thêm thất bại, hãy thử lại !!!", {
                //     position: "bottom-right"
                // });
            })

    }
    const confirmSucessfully = () => {
        if (!nameIsNotEmpty()) {
            alert("Phải điền tên sinh nhật");
            return;
        }

        if (!IsTommorow()) {
            alert("Phải đặt lịch trước một ngày")
            return;
        }

        if (!numberOfCustomerMoreThan0()) {
            alert("Vui lòng điền số lượng khách")
            return;
        }
        var accessToken = localStorage.getItem("AccessToken");
        if (accessToken == null) {
            alert("Bạn phải đăng nhập trước khi đặt tiệc")
            window.location = "/login";
        } else {
            createRequest();

        }


    }
    // ********** HANDLE SUBMIT BUTTON ************

    const setNumOfMenu = () => {
        var customerNumber = document.getElementById("customerNumber").value;

        customerNumber = Math.round(customerNumber / 8);
        setNumOfCustomer(customerNumber)
        var changeTotal = 0;
        menu.map((element) => {
            changeTotal += element[0].price * customerNumber;
        })

        setTotalMenu(changeTotal);
    }
    const parseToVND = (money) => {
        var config = { style: 'currency', currency: 'VND', maximumFractionDigits: 9 }
        var formated = new Intl.NumberFormat('vi-VN', config).format(money);
        return formated;
    }
    return (

        <div className="container-xxl py-6 margin-container-custom">
            <div className="container">
                <h1 className="display-6 mb-4 center-title">HÓA ĐƠN</h1>
                <input id="nameBirthday" className="form-control w-60 py-3 ps-4 pe-5"
                    style={{ width: "60%", borderColor:"black"}}
                    placeholder="Tên tiệc sinh nhật" required type="text"></input>

                <br></br>
                <textarea id="description" className="form-control w-60 py-3 ps-4 pe-5"
                    placeholder="Điền thêm mô tả" style={{ width: "60%", borderColor:"black" }} >
                </textarea>
                <br></br>

                <label>Số lượng khách</label>
                <input id="customerNumber" className="form-control w-60 py-3 ps-4 pe-5"
                    style={{ width: "60%", borderColor:"black"}} type="number" min="1" defaultValue={1} onChange={() => setNumOfMenu()}></input>
                <br></br>

                <label>Thời gian bắt đầu</label>
                <input
                    className="form-control w-60 py-3 ps-4 pe-5"
                    style={{ width: "60%", borderColor:"black" }}
                    id="startTime"
                    onChange={() => compareTime()}
                    // min="" value="" 
                    required type="datetime-local"></input>
                <br></br>

                <label>Thời gian kết thúc</label>
                <input
                    className="form-control w-60 py-3 ps-4 pe-5"
                    style={{ width: "60%", borderColor:"black" }}

                    id="endTime"
                    onChange={() => compareTime()}
                    // min="" value="" 
                    required type="datetime-local"></input>
                <br></br>

                <table className='table'>
                    <thead>
                        <th style={{ backgroundColor: '#EAA636'}} className='col-lg-2'><h5>Loại</h5></th>
                        <th style={{ backgroundColor: '#EAA636'}} className='col-lg-5'><h5>Tên</h5></th>
                        <th style={{ backgroundColor: '#EAA636'}} className='col-lg-1'><h5>Số Lượng</h5></th>
                        <th style={{ backgroundColor: '#EAA636'}} className='text-center col-lg-2'><h5>Đơn Giá</h5></th>
                        <th style={{ backgroundColor: '#EAA636'}} className='text-center col-lg-2'><h5>Thành Tiền</h5></th>
                    </thead>
                    <tbody>
                        <tr>
                            <td className='font-bold'>Phòng</td>

                        </tr>
                        <tr>
                            <td></td>
                            <td>{room[0].name}</td>
                            <td>1</td>
                            <td className='text-right'>{parseToVND(room[0].price)} </td>
                            <td className='text-right'>{parseToVND(room[0].price)} </td>
                        </tr>

                        <tr>
                            <td className='font-bold'>Trang Trí</td>

                        </tr>
                        <tr>
                            <td></td>
                            <td>{decoration[0].name}</td>
                            <td>1</td>
                            <td className='text-right'>{parseToVND(decoration[0].price)}</td>
                            <td className='text-right'>{parseToVND(decoration[0].price)}</td>
                        </tr>

                        <tr>
                            <td className='font-bold'>Chương Trình</td>
                        </tr>

                        <tr>
                            <td></td>
                            <td>{stage[0].name}</td>
                            <td>1</td>
                            <td className='text-right'>{parseToVND(stage[0].price)}</td>
                            <td className='text-right'>{parseToVND(stage[0].price)}</td>
                        </tr>


                        <tr>
                            <td className='font-bold'>Dịch vụ khác</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>{music[0].name}</td>
                            <td>1</td>
                            <td className='text-right'>{parseToVND(music[0].price)}</td>
                            <td className='text-right'>{parseToVND(music[0].price)}</td>
                        </tr>

                        <tr>
                            <td className='font-bold'>Thực Đơn</td>
                        </tr>
                        {menu === null ? <></>
                            : menu.map((element) => {
                                return (
                                    <tr>
                                        <td></td>
                                        <td>{element[0].name}</td>
                                        <td>{numOfCustomer}</td>
                                        <td className='text-right'>{parseToVND(element[0].price)}</td>
                                        <td className='text-right'>{parseToVND(element[0].price * numOfCustomer)}</td>

                                    </tr>

                                );

                            })

                        }
                        <tr>
                            <td className='font-bold'>Tổng (tạm tính)</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td className='text-right font-bold'>{parseToVND(staticTotal + totalMenu)}</td>
                        </tr>

                    </tbody>
                </table>

                <button className="btn btn-primary rounded-pill button-custom ">
                    
                    <Link to="../service">
                    <h5>Chỉnh sửa</h5>
                    </Link>

                </button>
                <button className="btn btn-primary rounded-pill button-custom right-side-button" onClick={() => confirmSucessfully()}>

                    <h4>Xác nhận</h4>

                </button>

            </div>

        </div>



    );


};
export default PreviewOrder;