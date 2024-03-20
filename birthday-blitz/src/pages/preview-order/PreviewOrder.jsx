import React, { useEffect, useState } from 'react';
import { getRoom, getMenu, getServiceElement } from '../apis/previewOrder';
import './PreviewOrder.css'
const mockData = [
    {
        "name": "AA",
        "price": "40004",
    },
    {
        "name": "AA",
        "price": "40004",
    }

]
const PreviewOrder = () => {

    const [room, setRoom] = useState(mockData);
    const [menu, setMenu] = useState(null);
    const [decoration, setDecoration] = useState(mockData);
    const [stage, setStage] = useState(mockData);
    const [music, setMusic] = useState(mockData);


    useEffect(() => {
        var localRoom = getDataFromLocal("room-show");
        var localMenu = getDataFromLocal("menu-customer")
        var localDecoration = getDataFromLocal("decoration-show")
        var localStage = getDataFromLocal("stage-cus")
        var localMusic = getDataFromLocal("music-show")

        if (localRoom.length == 0 || localMenu.length == 0 || localDecoration.length == 0 || localStage.length == 0 || localMusic.length == 0) {
            window.location = "/customer/service";
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
        setRoom(obj);
    };

    const getMenuData = async (initialArray) => {
        var arrayObject = [];
        for (var i = 0; i < initialArray.length; i++) {
            arrayObject.push(await getMenu(false, initialArray[i]))
        }
        setMenu(arrayObject)
    };

    const getServiceElementData = async (initialArray, nameService) => {
        var obj;

        obj = await getServiceElement(false, initialArray[0])
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
    const confirmSucessfully = () => {

        if (!nameIsNotEmpty) {
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

    }
    // ********** HANDLE SUBMIT BUTTON ************
    return (

        <div className="container-xxl py-6 margin-container-custom">
            <div className="container">
                <h1 className="display-6 mb-4 center-title">HÓA ĐƠN</h1>
                <input id="nameBirthday" className="form-control w-60 py-3 ps-4 pe-5"
                    style={{ width: "60%" }}
                    placeholder="Tên tiệc sinh nhật" required type="text"></input>

                <br></br>
                <textarea id="description" className="form-control w-60 py-3 ps-4 pe-5"
                    placeholder="Bạn muốn cc gì?" style={{ width: "60%" }} >
                </textarea>
                <br></br>

                <label>Số lượng khách</label>
                <input id="customerNumber" className="form-control w-60 py-3 ps-4 pe-5"
                    style={{ width: "60%" }} type="number" min="1" defaultValue={1}></input>
                <br></br>

                <label>Thời gian bắt đầu</label>
                <input
                    className="form-control w-60 py-3 ps-4 pe-5"
                    style={{ width: "60%" }}
                    id="startTime"
                    onChange={() => compareTime()}
                    // min="" value="" 
                    required type="datetime-local"></input>
                <br></br>

                <label>Thời gian kết thúc</label>
                <input
                    className="form-control w-60 py-3 ps-4 pe-5"
                    style={{ width: "60%" }}

                    id="endTime"
                    onChange={() => compareTime()}
                    // min="" value="" 
                    required type="datetime-local"></input>
                <br></br>

                <table className='table'>
                    <thead>
                        <th>Loại</th>
                        <th>Tên</th>
                        <th>Số Lượng</th>
                        <th>Đơn Giá</th>
                        <th>Thành Tiền</th>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Phòng</td>

                        </tr>
                        <tr>
                            <td></td>
                            <td>{room[0].name}</td>
                            <td>1</td>
                            <td>{room[0].price} vnđ</td>
                            <td>{room[0].price} vnđ</td>
                        </tr>

                        <tr>
                            <td>Trang Trí</td>

                        </tr>
                        <tr>
                            <td></td>
                            <td>{decoration[0].name}</td>
                            <td>1</td>
                            <td>{decoration[0].price} vnđ</td>
                            <td>{decoration[0].price} vnđ</td>
                        </tr>

                        <tr>
                            <td>Chương Trình</td>
                        </tr>

                        <tr>
                            <td></td>
                            <td>{stage[0].name}</td>
                            <td>1</td>
                            <td>{stage[0].price} vnđ</td>
                            <td>{stage[0].price} vnđ</td>
                        </tr>


                        <tr>
                            <td>Dịch vụ khác</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>{music[0].name}</td>
                            <td>1</td>
                            <td>{music[0].price} vnđ</td>
                            <td>{music[0].price} vnđ</td>
                        </tr>


                        <tr>
                            <td>Thực Đơn</td>
                        </tr>
                        {menu === null ? <></>
                            : menu.map((element) => {
                                return (
                                    <tr>
                                        <td></td>
                                        <td>{element[0].name}</td>
                                        <td>1</td>
                                        <td>{element[0].price} vnđ</td>
                                        <td>{element[0].price} vnđ</td>

                                    </tr>

                                );

                            })

                        }

                    </tbody>
                </table>


                <button onClick={() => confirmSucessfully()}>

                    <h3>Xác nhận</h3>

                </button>

            </div>

        </div>



    );


};
export default PreviewOrder;