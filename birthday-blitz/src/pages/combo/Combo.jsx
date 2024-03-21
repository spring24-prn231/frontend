import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import './Combo.css'
import { getServices, getRoom, getDish, getServiceElement } from '../apis/comboService'
const PreviewOrder = () => {
    const [currentService, setCurrentService] = useState(null);
    const [rawData, setRawData] = useState(null);
    const [room, setRoom] = useState(null);
    const [menu, setMenu] = useState(null);
    const [music, setMusic] = useState(null);
    const [stage, setStage] = useState(null);
    const [decoration, setDecoration] = useState(null);

    useEffect(() => {

        getData();

    }, []);
    const getData = async () => {

        var res = await getServices(false)
        setRawData(res);

    };

    const getRoomData = async (roomTypeId) => {
        var res = await getRoom(false, roomTypeId)
        setRoom(res[0]);
    }
    const getDishData = async (menuObj) => {
        var arrayObj = [];
        for (var i = 0; i < menuObj.length; i++) {
            var res = await getDish(false, menuObj[i].dishId)
            arrayObj.push(res[0]);
        }

        setMenu(arrayObj);

    }
    const musicTypeId = "1242a35d-8464-4105-9495-962a3293f16a";
    const stageTypeId = "97d17522-4423-469e-ba7e-4e2fe315fbf8";
    const decorationTypeId = "f6d7ed3b-e0cc-4e6b-bea5-794c6646a912";

    const getServiceElementData = async (servicesObj) => {
        var arrayMusic = [];
        var arrayStage = [];
        var arrayDecoration = [];
        for (var i = 0; i < servicesObj.length; i++) {
            var res = await getServiceElement(false, servicesObj[i].serviceElementId)
            if (res[0].elementTypeId === musicTypeId) {
                arrayMusic.push(res[0]);
            } else if (res[0].elementTypeId === stageTypeId) {
                arrayStage.push(res[0])
            } else if (res[0].elementTypeId === decorationTypeId) {
                arrayDecoration.push(res[0]);
            }

        }

        setMusic(arrayMusic);
        setDecoration(arrayDecoration);
        setStage(arrayStage);


    }
    const renderTable = (serviceId) => {
        var serviceObj = null;
        for (var i = 0; i < rawData.length; i++) {
            if (rawData[i].id == serviceId) {
                serviceObj = rawData[i];
                break;
            }
        }

        setCurrentService(serviceObj)
        getRoomData(serviceObj.roomTypeId)
        getDishData(serviceObj.menus);
        getServiceElementData(serviceObj.serviceElementDetails)


    }
    const parseToVND = (money) => {
        var config = { style: 'currency', currency: 'VND', maximumFractionDigits: 9 }
        var formated = new Intl.NumberFormat('vi-VN', config).format(money);
        return formated;
    }
    const handleChange = () => {
        var arrayIdRoom = [];
        var arrayIdMenu = [];
        var arrayIdDecoration = [];
        var arrayIdMusic = [];
        var arrayIdStage = [];


        arrayIdRoom.push(room.id);

        for (var i = 0; i < decoration.length; i++) {
            arrayIdDecoration.push(decoration[i].id);
        }

        for (var i = 0; i < menu.length; i++) {
            arrayIdMenu.push(menu[i].id);
        }

        for (var i = 0; i < music.length; i++) {
            arrayIdMusic.push(music[i].id);
        }

        for (var i = 0; i < stage.length; i++) {
            arrayIdStage.push(stage[i].id);
        }

        // "room-show": "Phòng",
        // "menu-customer": "Thực Đơn",
        // "decoration-show": "Trang Trí",
        // "stage-cus": "Chương Trình",
        // "music-show": "Dịch Vụ Khác"

        localStorage.setItem("room-show", JSON.stringify(arrayIdRoom));
        localStorage.setItem("menu-customer", JSON.stringify(arrayIdMenu));
        localStorage.setItem("decoration-show", JSON.stringify(arrayIdDecoration));
        localStorage.setItem("stage-cus", JSON.stringify(arrayIdStage));
        localStorage.setItem("music-show", JSON.stringify(arrayIdMusic));

        document.getElementById("hoantat").style.display = "block";
        document.getElementById("xacnhan").style.display = "none";
    }
    return (
        <div className="container-xxl py-6 margin-container-custom">
            <div className="container">
                <p>Chọn một trong các gói dịch vụ dưới đây</p>
                {rawData == null ? <></> :
                    rawData.map((element) => {
                        return (
                            <>
                                <p>{element.name}</p> <button type="button" onClick={() => renderTable(element.id)}>Chọn</button>
                                <br></br>
                            </>


                        );

                    })

                }
                {currentService == null ? <></> :
                    <>
                        <h1 className="display-6 mb-4 center-title">{currentService.name}</h1>


                        <table className='table'>
                            <thead>
                                <th style={{ backgroundColor: '#EAA636' }} className='col-lg-2'><h5>Loại</h5></th>
                                <th style={{ backgroundColor: '#EAA636' }} className='col-lg-5'><h5>Tên</h5></th>
                                <th style={{ backgroundColor: '#EAA636' }} className='col-lg-1'><h5>Số Lượng</h5></th>
                                <th style={{ backgroundColor: '#EAA636' }} className='text-center col-lg-2'><h5>Đơn Giá</h5></th>
                                <th style={{ backgroundColor: '#EAA636' }} className='text-center col-lg-2'><h5>Thành Tiền</h5></th>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className='font-bold'>Phòng</td>

                                </tr>
                                {room == null ? <></> :
                                    <tr>
                                        <td></td>
                                        <td>{room.name} - {room.roomType == null ? <></> : room.roomType.name}</td>
                                        <td>1</td>
                                        <td className='text-right'>{parseToVND(room.price)} </td>
                                        <td className='text-right'>{parseToVND(room.price)} </td>
                                    </tr>

                                }

                                <tr>
                                    <td className='font-bold'>Trang Trí</td>

                                </tr>

                                {decoration === null ? <></>
                                    : decoration.map((element) => {
                                        return (
                                            <tr>
                                                <td></td>
                                                <td>{element.name}</td>
                                                <td>1</td>
                                                <td className='text-right'>{parseToVND(element.price)}</td>
                                                <td className='text-right'>{parseToVND(element.price)}</td>

                                            </tr>

                                        );

                                    })

                                }
                                <tr>
                                    <td className='font-bold'>Chương Trình</td>
                                </tr>

                                {stage === null ? <></>
                                    : stage.map((element) => {
                                        return (
                                            <tr>
                                                <td></td>
                                                <td>{element.name}</td>
                                                <td>1</td>
                                                <td className='text-right'>{parseToVND(element.price)}</td>
                                                <td className='text-right'>{parseToVND(element.price)}</td>

                                            </tr>

                                        );

                                    })

                                }

                                <tr>
                                    <td className='font-bold'>Dịch vụ khác</td>
                                </tr>
                                {music === null ? <></>
                                    : music.map((element) => {
                                        return (
                                            <tr>
                                                <td></td>
                                                <td>{element.name}</td>
                                                <td>1</td>
                                                <td className='text-right'>{parseToVND(element.price)}</td>
                                                <td className='text-right'>{parseToVND(element.price)}</td>

                                            </tr>

                                        );

                                    })

                                }
                                <tr>
                                    <td className='font-bold'>Thực Đơn</td>
                                </tr>
                                {menu === null ? <></>
                                    : menu.map((element) => {
                                        return (
                                            <tr>
                                                <td></td>
                                                <td>{element.name} - {element.dishType == null ? <></> : element.dishType.name}</td>
                                                <td>1</td>
                                                <td className='text-right'>{parseToVND(element.price)}</td>
                                                <td className='text-right'>{parseToVND(element.price)}</td>

                                            </tr>

                                        );

                                    })

                                }

                            </tbody>
                        </table>

                        <button id="hoantat" className="btn btn-primary rounded-pill button-custom right-side-button " style={{display:"none"}}>

                            <Link to="../previeworder">
                                <h5>Hoàn tất</h5>
                            </Link>

                        </button>
                        <button id="xacnhan" className="btn btn-primary rounded-pill button-custom right-side-button" onClick={() => handleChange()}>
                            {/* <Link to="../previeworder">
                               

                            </Link> */}
                            <h4>Xác nhận</h4>
                        </button>

                    </>
                }
            </div>

        </div>
    );

};
export default PreviewOrder;