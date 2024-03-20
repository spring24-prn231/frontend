import React, { useEffect, useState } from 'react';
import './StaffOrderDetail.css';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SearchIcon from '@mui/icons-material/Search';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { createOrderDetail, getAllOrder, getOrderById, staffAssign } from '../../../apis/orderService';
import { useParams } from 'react-router-dom';
import Loading from '../../common/loading/Loading';
import { getAllStaff } from '../../../apis/staffService';
import AddIcon from '@mui/icons-material/Add';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const animatedComponents = makeAnimated();

const StaffOrderDetail = () => {
    const { orderId } = useParams();
    const [orders, setOrders] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [currentStaff, setCurrentStaff] = useState(null);
    const [isReload, setIsReload] = useState(false);
    const [isAddNew, setIsAddNew] = useState(false);
    const [orderDetail, setOrderDetail] = useState({
        'orderId': orderId,
        'amount': 0,
        'price': 0,
        'type': '',
        'cost': 0,
        'note': ''
    });

    useEffect(() => {
        const getData = async () => {
            setIsLoading(true);
            const res = await getOrderById(orderId);
            return res;
        };

        getData().then(res  => {
            setIsLoading(false);
            setOrders(res.data[0]);
            setCurrentStaff(res.data[0].staffId);
        });
    }, [isReload]);

    const convertStatus = (status) => {
        switch (status) {
            case 1:
                return (
                    <div className='staff-order-status' style={{ backgroundColor: '#f6ff70b5' }}>
                        Mới tạo
                    </div>
                );
            case 2:
                return (
                    <div className='staff-order-status' style={{ backgroundColor: '#ef1d1b38' }}>
                        Đang tiến hành
                    </div>
                );
            case 3:
                return (
                    <div className='staff-order-status' style={{ backgroundColor: '#68e5837a' }}>
                        Kết thúc
                    </div>
                );
        }
    };

    const onAddNewOrderDetail = () => {
        createOrderDetail(orderDetail).then(res => {
            setOrders({ ...orders, orderDetails: [...orders.orderDetails, orderDetail], total: orders.total + orderDetail.price * orderDetail.amount });
            setOrderDetail({
                'orderId': orderId,
                'amount': 0,
                'price': 0,
                'type': '',
                'cost': 0,
                'note': ''
            });
            setIsAddNew(false);
            toast.success("Thêm thành công !!!", {
                position: "bottom-right"
            });
        }).catch(err => {
            toast.error("Thêm thất bại, hãy thử lại !!!", {
                position: "bottom-right"
            });
        });
    }

    return (
        <div className='staff-order-detail-container'>
            {
                (isLoading || orders === null) ? <Loading /> :
                    <>
                        <ToastContainer />
                        <div className="staff-order-detail-top">
                            <div className="staff-order-detail-search-bar-container">
                                <div className="staff-order-detail-search-bar">
                                    <SearchIcon htmlColor='grey' />
                                    <input className='staff-order-detail-search-bar-input'
                                        placeholder='Tìm kiếm theo loại'
                                        value={''}
                                    // onChange={(e) => setSearchValue(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="staff-order-detail-progress">
                                {
                                    orders.executionStatus !== null ? convertStatus(orders.executionStatus)
                                        : 'Chưa có trạng thái'
                                }
                            </div>
                        </div>
                        <div className="staff-order-detail-content">
                            <div className='staff-order-detail-items'>
                                <div className="staff-order-detail-order-name">
                                    #{orders.name}
                                </div>
                                <div className="staff-order-detail-items-container">
                                    <div className="staff-order-detail-assign">
                                        <div style={{ fontWeight: 'bold', marginBottom: '10px' }}>
                                            Nhân viên chịu trách nhiệm:
                                        </div>
                                        <div className="staff-order-detail-staff-assign">
                                            <div className='staff-order-detail-staff-assign-select'>
                                                <Select
                                                    isDisabled={true}
                                                    closeMenuOnSelect={false}
                                                    components={animatedComponents}
                                                    isMulti={false}
                                                    options={[]}
                                                    defaultValue={[
                                                        {
                                                            value: orders.staff.id,
                                                            label: orders.staff.fullname
                                                        }
                                                    ]}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <button className={`staff-order-detail-add-order-detail
                                     ${isAddNew ? 'staff-order-detail-add-order-detail-disable' : ''}`} onClick={() => setIsAddNew(true)}>
                                        <AddIcon /> Thêm chi tiết đơn hàng
                                    </button>
                                    <table className='staff-order-detail-items-table'>
                                        <tr>
                                            <th style={{ width: '14%' }}>Loại</th>
                                            <th style={{ width: '14%' }}>Giá vốn</th>
                                            <th style={{ width: '14%' }}>Giá bán</th>
                                            <th style={{ width: '14%' }}>Số lượng</th>
                                            <th style={{ width: '14%' }}>Ghi chú</th>
                                            <th style={{ width: '6%' }}></th>
                                            <th style={{ width: '6%' }}></th>
                                        </tr>
                                        {
                                            orders.orderDetails.map((item, index) =>
                                                <tr>
                                                    <td>{item.type}</td>
                                                    <td>{item.price}</td>
                                                    <td>{item.cost}</td>
                                                    <td>{item.amount}</td>
                                                    <td>{item.note}</td>
                                                    <td></td>
                                                    <td></td>
                                                </tr>
                                            )
                                        }
                                        {
                                            !isAddNew ? '' :
                                                <tr style={{ backgroundColor: 'white !important' }}>
                                                    <td>
                                                        <div className='staff-order-detail-add-input'>
                                                            <input type="text"
                                                                style={{ width: '150px' }}
                                                                value={orderDetail.type}
                                                                onChange={(e) => setOrderDetail({ ...orderDetail, type: e.target.value })}
                                                            />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='staff-order-detail-add-input'>
                                                            <input type="number"
                                                                style={{ width: '100px' }}
                                                                value={orderDetail.price}
                                                                onChange={(e) => setOrderDetail({ ...orderDetail, price: e.target.value })}
                                                            />
                                                        </div>
                                                    </td>
                                                    <td >
                                                        <div className='staff-order-detail-add-input'>
                                                            <input type="number"
                                                                style={{ width: '100px' }}
                                                                value={orderDetail.cost}
                                                                onChange={(e) => setOrderDetail({ ...orderDetail, cost: e.target.value })}
                                                            />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='staff-order-detail-add-input'>
                                                            <input type="number"
                                                                style={{ width: '100px' }}
                                                                value={orderDetail.amount}
                                                                onChange={(e) => setOrderDetail({ ...orderDetail, amount: e.target.value })}
                                                            />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='staff-order-detail-add-input'>
                                                            <textarea type="text"
                                                                value={orderDetail.note}
                                                                style={{ width: '150px' }}
                                                                onChange={(e) => setOrderDetail({ ...orderDetail, note: e.target.value })}
                                                            />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <button style={{ width: '50px', height: '30px' }}
                                                            className='staff-order-detail-add-order-detail'
                                                            onClick={onAddNewOrderDetail}
                                                        >Thêm</button>
                                                    </td>
                                                    <td>
                                                        <button style={{ width: '50px', height: '30px' }}
                                                            onClick={() => setIsAddNew(false)}
                                                            className='staff-order-detail-add-order-detail'>Huỷ</button>
                                                    </td>
                                                </tr>
                                        }
                                    </table>

                                    <div className="staff-order-detail-end">
                                        <div className="staff-order-detail-end-header">
                                            Tổng đơn hàng
                                        </div>
                                        <div className="staff-order-detail-total">
                                            <span>Tổng tiền đơn hàng:</span>
                                            <span>{orders.total}</span>
                                        </div>
                                        <div className="staff-order-detail-voucher">
                                            <span>Mã giảm giá:</span>
                                            <table className='staff-order-detail-voucher-table'>
                                                <tr>
                                                    <th>Mã:</th>
                                                    <th>Số tiền giảm:</th>
                                                </tr>
                                                {
                                                    orders.vouchers.map(vitem =>
                                                        <tr>
                                                            <td>{vitem.code}</td>
                                                            <td>-{vitem.discount}</td>
                                                        </tr>
                                                    )
                                                }
                                            </table>
                                        </div>
                                        <div className="staff-order-detail-all">
                                            <span>Thành tiền:</span>
                                            <span>{orders.total}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="staff-order-detail-summary">
                                <div className="staff-order-detail-info">
                                    <div className="staff-order-detail-row">
                                        <span style={{ fontWeight: 'bold', fontSize: '16px', borderBottom: '1px solid grey', width: '100%' }}>Thông tin đơn hàng</span>
                                    </div>
                                    <div className="staff-order-detail-row">
                                        <span className='staff-order-detail-info-label'>
                                            Dịch vụ:
                                        </span>
                                        <span className='staff-order-detail-info-content'>
                                            {orders.service.name}
                                        </span>
                                    </div>
                                    <div className="staff-order-detail-row">
                                        <span className='staff-order-detail-info-label'>
                                            Khách hàng:
                                        </span>
                                        <span className='staff-order-detail-info-content'>
                                            {orders.user === null ? 'Khách hàng ảo' : orders.user.fullname}
                                        </span>
                                    </div>

                                    <div className="staff-order-detail-row">
                                        <span className='staff-order-detail-info-label'>
                                            Ngày tạo:
                                        </span>
                                        <span className='staff-order-detail-info-content'>
                                            {orders.createDate}
                                        </span>
                                    </div>

                                    <div className="staff-order-detail-row">
                                        <span className='staff-order-detail-info-label'>
                                            Thời gian tổ chức:
                                        </span>
                                        <span className='staff-order-detail-info-content'>
                                            {
                                                orders.eventEnd && orders.eventStart ? `${orders.eventEnd}-${orders.eventStart}`
                                                    : 'Chưa có thời gian tổ chức'
                                            }
                                        </span>
                                    </div>

                                    <div className="staff-order-detail-row">
                                        <span className='staff-order-detail-info-label'>
                                            Số khách tối đa:
                                        </span>
                                        <span className='staff-order-detail-info-content'>
                                            {orders.maxGuest} người
                                        </span>
                                    </div>
                                </div>

                                <div className="staff-order-detail-deposit">
                                    <div className="staff-order-detail-row">
                                        <span style={{ fontWeight: 'bold', fontSize: '16px', borderBottom: '1px solid grey', width: '100%' }}>Thông tin thanh toán</span>
                                    </div>

                                    <div className="staff-order-detail-row">
                                        <span className='staff-order-detail-info-label'>
                                            Tổng tiền:
                                        </span>
                                        <span className='staff-order-detail-info-content'>
                                            {orders.total}
                                        </span>
                                    </div>

                                    <div className="staff-order-detail-row">
                                        <span className='staff-order-detail-info-label'>
                                            Phương thức:
                                        </span>
                                        <span className='staff-order-detail-info-content'>
                                            <img width="40px" src='https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png' />
                                        </span>
                                    </div>

                                    <div className="staff-order-detail-row">
                                        <span className='staff-order-detail-info-label'>
                                            Trạng thái:
                                        </span>
                                        <span className='staff-order-detail-info-content'>
                                            Đã thanh toán cọc
                                            &nbsp;
                                            <CheckCircleIcon htmlColor='green' />
                                        </span>
                                    </div>

                                    <div className="staff-order-detail-row">
                                        <span className='staff-order-detail-info-label'>
                                            Hoá đơn:
                                        </span>
                                        <span className='staff-order-detail-info-content'>
                                            {
                                                orders.contract !== null ?
                                                    <a href='#'>Nhấn để tải về</a>
                                                    :
                                                    'Chưa có hoá đơn'
                                            }
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
            }
        </div>
    )
}

export default StaffOrderDetail
