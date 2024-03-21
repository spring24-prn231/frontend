import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import './Combo.css'
const PreviewOrder = () => {
    return(
        <div className="container-xxl py-6 margin-container-custom">
            <div className="container">
                <h1 className="display-6 mb-4 center-title">GÓI DỊCH VỤ</h1>
              

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
                        {/* <tr>
                            <td></td>
                            <td>{room[0].name} - {room[0].roomType == null ? <></> : room[0].roomType.name}</td>
                            <td>1</td>
                            <td className='text-right'>{parseToVND(room[0].price)} </td>
                            <td className='text-right'>{parseToVND(room[0].price)} </td>
                        </tr> */}

                        <tr>
                            <td className='font-bold'>Trang Trí</td>

                        </tr>
{/*                        
                        {decoration === null ? <></>
                            : decoration.map((element) => {
                                return (
                                    <tr>
                                        <td></td>
                                        <td>{element[0].name}</td>
                                        <td>1</td>
                                        <td className='text-right'>{parseToVND(element[0].price)}</td>
                                        <td className='text-right'>{parseToVND(element[0].price)}</td>

                                    </tr>

                                );

                            })

                        } */}
                        <tr>
                            <td className='font-bold'>Chương Trình</td>
                        </tr>
{/* 
                        {stage === null ? <></>
                            : stage.map((element) => {
                                return (
                                    <tr>
                                        <td></td>
                                        <td>{element[0].name}</td>
                                        <td>1</td>
                                        <td className='text-right'>{parseToVND(element[0].price)}</td>
                                        <td className='text-right'>{parseToVND(element[0].price)}</td>

                                    </tr>

                                );

                            })

                        } */}

                        <tr>
                            <td className='font-bold'>Dịch vụ khác</td>
                        </tr>
                        {/* {music === null ? <></>
                            : music.map((element) => {
                                return (
                                    <tr>
                                        <td></td>
                                        <td>{element[0].name}</td>
                                        <td>1</td>
                                        <td className='text-right'>{parseToVND(element[0].price)}</td>
                                        <td className='text-right'>{parseToVND(element[0].price)}</td>

                                    </tr>

                                );

                            })

                        } */}
                        <tr>
                            <td className='font-bold'>Thực Đơn</td>
                        </tr>
                        {/* {menu === null ? <></>
                            : menu.map((element) => {
                                return (
                                    <tr>
                                        <td></td>
                                        <td>{element[0].name} - {element[0].dishType == null ? <></> : element[0].dishType.name}</td>
                                        <td>{numOfCustomer}</td>
                                        <td className='text-right'>{parseToVND(element[0].price)}</td>
                                        <td className='text-right'>{parseToVND(element[0].price * numOfCustomer)}</td>

                                    </tr>

                                );

                            })

                        } */}
                        <tr>
                            <td className='font-bold'>Tổng (tạm tính)</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            {/* <td className='text-right font-bold'>{parseToVND(staticTotal + totalMenu)}</td> */}
                        </tr>

                    </tbody>
                </table>

                <button className="btn btn-primary rounded-pill button-custom ">

                    <Link to="../service">
                        <h5>Chỉnh sửa</h5>
                    </Link>

                </button>
                <button className="btn btn-primary rounded-pill button-custom right-side-button">

                    <h4>Xác nhận</h4>

                </button>

            </div>

        </div>
    );

};
export default PreviewOrder;