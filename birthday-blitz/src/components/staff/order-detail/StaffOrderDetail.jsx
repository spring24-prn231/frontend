import React, { useEffect, useState } from 'react';
import './StaffOrderDetail.css';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SearchIcon from '@mui/icons-material/Search';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { createOrderDetail, deleteOrderDetail, doneOrder, getAllOrder, getOrderById, staffAssign, updateOrderDetail } from '../../../apis/orderService';
import { Link, useParams } from 'react-router-dom';
import Loading from '../../common/loading/Loading';
import { getAllStaff } from '../../../apis/staffService';
import AddIcon from '@mui/icons-material/Add';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { createVoucher } from '../../../apis/voucherService';

const animatedComponents = makeAnimated();

const StaffOrderDetail = () => {
    const { orderId } = useParams();
    const [orders, setOrders] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [currentStaff, setCurrentStaff] = useState(null);
    const [isReload, setIsReload] = useState(false);
    const [isAddNew, setIsAddNew] = useState(false);
    const [updatedItem, setUpdatedItem] = useState(null);
    const [orderDetail, setOrderDetail] = useState({
        'orderId': orderId,
        'amount': 0,
        'price': 0,
        'type': '',
        'cost': 0,
        'note': '',
        'status': true
    });
    const [updatedItemVoucher, setUpdatedItemVoucher] = useState(null);
    const [isAddNewVoucher, setIsAddNewVoucher] = useState(false);
    const [voucher, setVoucher] = useState({
        "orderId": orderId,
        "code": "",
        "discount": 0,
        "maximumValue": 0,
        "expirationDate": "2034-03-20T14:22:53.209Z"
    });

    useEffect(() => {
        const getData = async () => {
            setIsLoading(true);
            const res = await getOrderById(orderId);
            return res;
        };

        getData().then(res => {
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
                        Được bàn giao
                    </div>
                );
            case 3:
                return (
                    <div className='staff-order-status' style={{ backgroundColor: '#68e5837a' }}>
                        Đang tiến hành
                    </div>
                );
            case 4:
                return (
                    <div className='staff-order-status' style={{ backgroundColor: '#68e5137a' }}>
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
                'note': '',
                'status': true
            });
            setIsAddNew(false);
            toast.success("Thêm thành công !!!", {
                position: "bottom-right",
                containerId: "status"
            });
        }).catch(err => {
            toast.error("Thêm thất bại, hãy thử lại !!!", {
                position: "bottom-right",
                containerId: "status"
            });
        });
    }

    const onUpdateOrderDetail = () => {
        updateOrderDetail(updatedItem).then(res => {
            toast.success("Lưu thành công !!!", {
                position: "bottom-right",
                containerId: "status"
            });
            setIsReload(!isReload);
            setUpdatedItem(null);
        }).catch(err => {
            toast.error("Lưu thất bại, hãy thử lại !!!", {
                position: "bottom-right",
                containerId: "status"
            });
        });
    }

    const onDeleteOrderDetail = () => {
        console.log(updatedItem)
        deleteOrderDetail(updatedItem.id).then(res => {
            toast.success("Xoá thành công !!!", {
                position: "bottom-right",
                containerId: "status"
            });
            setIsReload(!isReload);
            setUpdatedItem(null);
        }).catch(err => {
            toast.error("Xoá thất bại, hãy thử lại !!!", {
                position: "bottom-right",
                containerId: "status"
            });
        });
    }

    const totalMoney = () => {
        let sum = orders.total;
        orders.vouchers.forEach((item) => {
            sum -= Math.min(item.maximumValue, item.discount * orders.total / 100);
        });
        return sum;
    }

    const onCreateVoucher = () => {
        createVoucher(voucher).then(res => {
            toast.success("Thêm thành công !!!", {
                position: "bottom-right",
                containerId: "status"
            });
            setIsAddNewVoucher(false);
            setVoucher({
                "orderId": orderId,
                "code": "",
                "discount": 0,
                "maximumValue": 0,
                "expirationDate": "2034-03-20T14:22:53.209Z"
            });
            setIsReload(!isReload);
        }).catch(err => {
            toast.error("Thêm thất bại, hãy thử lại !!!", {
                position: "bottom-right",
                containerId: "status"
            });
        });
    }

    const onDone = () => {
        doneOrder(orderId).then(res => {
            toast.success("Kết thúc thành công !!!", {
                position: "bottom-right",
                containerId: "status"
            });
            setIsReload(!isReload);
            setUpdatedItem(null);
        }).catch(err => {
            toast.error("Kết thúc thất bại, hãy thử lại !!!", {
                position: "bottom-right",
                containerId: "status"
            });
        });
    }

    return (
        <div className='staff-order-detail-container'>
            {
                (isLoading || orders === null) ? <Loading /> :
                    <>
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
                            {
                                orders.executionStatus !== null && orders.executionStatus === 4 ?
                                    '' : <div style={{ marginRight: '20px' }}>
                                        <button onClick={onDone}>Kết thúc đơn hàng</button>
                                    </div>
                            }

                            {
                                orders.executionStatus !== null ? convertStatus(orders.executionStatus)
                                    :
                                    <div className="staff-order-detail-progress">
                                        Chưa có trạng thái
                                    </div>
                            }
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
                                    <table className='staff-order-detail-items-table'>
                                        <tr>
                                            <th style={{ width: '150px' }}>Loại</th>
                                            <th style={{ width: '100px' }}>Giá bán</th>
                                            <th style={{ width: '100px' }}>Giá vốn</th>
                                            <th style={{ width: '50px' }}>Số lượng</th>
                                            <th style={{ width: '150px' }}>Ghi chú</th>
                                            <th style={{ width: '200px' }}></th>
                                        </tr>
                                        {
                                            orders.orderDetails.filter(item => item.status === true).map((item, index) =>
                                                (updatedItem !== null && updatedItem.id === item.id) ?
                                                    <tr style={{ backgroundColor: 'white !important' }}>
                                                        <td>
                                                            <div className='staff-order-detail-add-input'>
                                                                <input type="text"
                                                                    style={{ width: '150px' }}
                                                                    value={updatedItem.type}
                                                                    onChange={(e) => setUpdatedItem({ ...updatedItem, type: e.target.value })}
                                                                />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className='staff-order-detail-add-input'>
                                                                <input type="number"
                                                                    style={{ width: '100px' }}
                                                                    value={updatedItem.price}
                                                                    onChange={(e) => setUpdatedItem({ ...updatedItem, price: e.target.value })}
                                                                />
                                                            </div>
                                                        </td>
                                                        <td >
                                                            <div className='staff-order-detail-add-input'>
                                                                <input type="number"
                                                                    style={{ width: '100px' }}
                                                                    value={updatedItem.cost}
                                                                    onChange={(e) => setUpdatedItem({ ...updatedItem, cost: e.target.value })}
                                                                />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className='staff-order-detail-add-input'>
                                                                <input type="number"
                                                                    style={{ width: '80px' }}
                                                                    value={updatedItem.amount}
                                                                    onChange={(e) => setUpdatedItem({ ...updatedItem, amount: e.target.value })}
                                                                />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className='staff-order-detail-add-input'>
                                                                <input type="text"
                                                                    value={updatedItem.note}
                                                                    style={{ width: '150px' }}
                                                                    onChange={(e) => setUpdatedItem({ ...updatedItem, note: e.target.value })}
                                                                />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div style={{ display: 'flex' }}>
                                                                <button style={{ width: '50px', height: '30px', marginRight: '5px' }}
                                                                    className='staff-order-detail-add-order-detail'
                                                                    onClick={onUpdateOrderDetail}
                                                                >Lưu</button>
                                                                <button style={{ width: '50px', height: '30px', marginRight: '5px' }}
                                                                    onClick={() => setUpdatedItem(null)}
                                                                    className='staff-order-detail-add-order-detail'>Huỷ</button>
                                                                <button style={{ width: '50px', height: '30px', marginRight: '5px' }}
                                                                    onClick={onDeleteOrderDetail}
                                                                    className='staff-order-detail-add-order-detail'>Xoá</button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    :
                                                    <tr className='staff-order-detail-table-row' onClick={() => { setUpdatedItem(item); setIsAddNew(false); }}>
                                                        <td style={{ width: '150px' }}>{item.type}</td>
                                                        <td style={{ width: '100px' }}>{item.price}</td>
                                                        <td style={{ width: '100px' }}>{item.cost}</td>
                                                        <td style={{ width: '80px' }}>{item.amount}</td>
                                                        <td style={{ width: '150px' }}>{item.note}</td>
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
                                                                style={{ width: '80px' }}
                                                                value={orderDetail.amount}
                                                                onChange={(e) => setOrderDetail({ ...orderDetail, amount: e.target.value })}
                                                            />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='staff-order-detail-add-input'>
                                                            <input type="text"
                                                                value={orderDetail.note}
                                                                style={{ width: '150px' }}
                                                                onChange={(e) => setOrderDetail({ ...orderDetail, note: e.target.value })}
                                                            />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div style={{ display: 'flex' }}>
                                                            <button style={{ width: '50px', height: '30px', marginRight: '10px' }}
                                                                className='staff-order-detail-add-order-detail'
                                                                onClick={onAddNewOrderDetail}
                                                            >Thêm</button>
                                                            <button style={{ width: '50px', height: '30px' }}
                                                                onClick={() => setIsAddNew(false)}
                                                                className='staff-order-detail-add-order-detail'>Huỷ</button>
                                                        </div>
                                                    </td>
                                                </tr>
                                        }
                                    </table>

                                    <button className={`staff-order-detail-add-order-detail
                                     ${isAddNew || updatedItem !== null ? 'staff-order-detail-add-order-detail-disable' : ''}`} onClick={() => setIsAddNew(true)}>
                                        <AddIcon /> Thêm chi tiết đơn hàng
                                    </button>

                                    <div className="staff-order-detail-end">
                                        <div className="staff-order-detail-end-header">
                                            Tổng đơn hàng
                                        </div>
                                        <div className="staff-order-detail-total">
                                            <span>Tổng tiền đơn hàng:</span>
                                            <span>{orders.total} VND</span>
                                        </div>
                                        <div className="staff-order-detail-voucher">
                                            <span>Mã giảm giá:</span>
                                            <table className='staff-order-detail-voucher-table'>
                                                <tr>
                                                    <th>Mã:</th>
                                                    <th>Giảm giá</th>
                                                    <th>Giảm tối đa</th>
                                                    <th>Số tiền giảm:</th>
                                                </tr>
                                                {
                                                    orders.vouchers.map(vitem =>
                                                        <tr>
                                                            <td>{vitem.code}</td>
                                                            <td>{vitem.discount}%</td>
                                                            <td>{vitem.maximumValue} VND</td>
                                                            <td>-{Math.min(vitem.maximumValue, vitem.discount * orders.total / 100)} VND</td>
                                                        </tr>
                                                    )
                                                }
                                                {
                                                    !isAddNewVoucher ? '' :
                                                        <tr >
                                                            <td>
                                                                <input type="text"
                                                                    value={voucher.code}
                                                                    onChange={(e) => setVoucher({ ...voucher, code: e.target.value })}
                                                                />
                                                            </td>
                                                            <td>
                                                                <input type="number"
                                                                    value={voucher.discount}
                                                                    min="0"
                                                                    max="100"
                                                                    style={{ width: '150px' }}
                                                                    onChange={(e) => setVoucher({ ...voucher, discount: e.target.value })}
                                                                />
                                                            </td>
                                                            <td>
                                                                <input type="number"
                                                                    value={voucher.maximumValue}
                                                                    style={{ width: '150px' }}
                                                                    onChange={(e) => setVoucher({ ...voucher, maximumValue: e.target.value })}
                                                                />
                                                            </td>
                                                            <td>

                                                            </td>
                                                        </tr>
                                                }
                                                <div style={{ display: 'flex', alignItems: 'top', marginTop: '20px' }}>
                                                    <button
                                                        style={{ marginRight: '20px' }}
                                                        className={`staff-order-detail-add-order-detail
                                     ${isAddNewVoucher || updatedItemVoucher !== null ? 'staff-order-detail-add-order-detail-disable' : ''}`} onClick={() => setIsAddNewVoucher(true)}>
                                                        <AddIcon /> Thêm mới voucher
                                                    </button>
                                                    {
                                                        !isAddNewVoucher ? '' :
                                                            <>
                                                                <button style={{ width: '50px', height: '30px', marginRight: '20px' }}
                                                                    className='staff-order-detail-add-order-detail'
                                                                    onClick={onCreateVoucher}
                                                                >Thêm</button>
                                                                <button style={{ width: '50px', height: '30px' }}
                                                                    onClick={() => setIsAddNewVoucher(false)}
                                                                    className='staff-order-detail-add-order-detail'>Huỷ</button>
                                                            </>
                                                    }
                                                </div>
                                            </table>
                                        </div>
                                        <div className="staff-order-detail-all">
                                            <span>Thành tiền:</span>
                                            <span>{totalMoney()} VND</span>
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

                                    <div className="staff-order-detail-row">
                                        <span className='staff-order-detail-info-label'>
                                            Kế hoạch
                                        </span>
                                        <span className='staff-order-detail-info-content'>
                                            {
                                                orders.partyPlans.length === 0 ?
                                                    <Link to={`/staff/plan/${orderId}`}>Chưa có (Click để tạo mới)</Link>
                                                    :
                                                    <Link to={`/staff/plan/${orderId}`}>Nhấn để xem</Link>
                                            }
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
                                            {totalMoney()} VND
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
