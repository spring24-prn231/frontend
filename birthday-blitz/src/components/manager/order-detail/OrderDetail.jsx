import React, { useEffect, useState } from 'react';
import './OrderDetail.css';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SearchIcon from '@mui/icons-material/Search';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { getAllOrder, getOrderById, staffAssign } from '../../../apis/orderService';
import { useParams } from 'react-router-dom';
import Loading from '../../common/loading/Loading';
import { getAllStaff } from '../../../apis/staffService';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const animatedComponents = makeAnimated();

const OrderDetail = () => {
    const { orderId } = useParams();
    const [orders, setOrders] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [staffList, setStaffList] = useState([]);
    const [currentStaff, setCurrentStaff] = useState(null);
    const [isReload, setIsReload] = useState(false);

    useEffect(() => {
        const getData = async () => {
            setIsLoading(true);
            const res = await getOrderById(orderId);
            const staffs = (await getAllStaff(false, true, false)).data;
            return { res, staffs };
        };

        getData().then(({ res, staffs }) => {
            setIsLoading(false);
            setOrders(res.data[0]);
            setStaffList(staffs);
            setCurrentStaff(res.data[0].staffId);
        });
    }, [isReload]);

    const convertStatus = (status) => {
        switch (status) {
            case 1:
                return (
                    <div className='order-status' style={{ backgroundColor: '#f6ff70b5' }}>
                        Mới tạo
                    </div>
                );
            case 2:
                return (
                    <div className='order-status' style={{ backgroundColor: '#ef1d1b38' }}>
                        Đang tiến hành
                    </div>
                );
            case 3:
                return (
                    <div className='order-status' style={{ backgroundColor: '#68e5837a' }}>
                        Kết thúc
                    </div>
                );
        }
    };

    const onAssign = () => {
        const res = staffAssign(currentStaff, orderId).then(res => {
            toast.success("Giao quyền thành công !!!", {
                position: "bottom-right"
            });
            setTimeout(( ) => {
                setIsReload(!isReload);
            }, 1000);
        }).catch(err => {
            toast.error("Giao quyền thất bại, hãy thử lại !!!", {
                position: "bottom-right"
            });
        });
    };

    return (
        <div className='order-detail-container'>
            {
                (isLoading || orders === null) ? <Loading /> :
                    <>
                        <ToastContainer />
                        <div className="order-detail-top">
                            <div className="order-detail-search-bar-container">
                                <div className="order-detail-search-bar">
                                    <SearchIcon htmlColor='grey' />
                                    <input className='order-detail-search-bar-input'
                                        placeholder='Tìm kiếm theo loại'
                                        value={''}
                                    // onChange={(e) => setSearchValue(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="order-detail-progress">
                                {
                                    orders.executionStatus !== null ? convertStatus(orders.executionStatus)
                                        : 'Chưa có trạng thái'
                                }
                            </div>
                        </div>
                        <div className="order-detail-content">
                            <div className='order-detail-items'>
                                <div className="order-detail-order-name">
                                    #{orders.name}
                                </div>
                                <div className="order-detail-items-container">
                                    <div className="order-detail-assign">
                                        <div style={{ fontWeight: 'bold', marginBottom: '10px' }}>
                                            Nhân viên chịu trách nhiệm:
                                        </div>
                                        <div className="order-detail-staff-assign">
                                            <div className='order-detail-staff-assign-select'>
                                                <Select
                                                    closeMenuOnSelect={false}
                                                    components={animatedComponents}
                                                    isMulti={false}
                                                    options={staffList.map(staff => {
                                                        return {
                                                            value: staff.id,
                                                            label: staff.fullname
                                                        }
                                                    }
                                                    )}
                                                    onChange={(e) => {setCurrentStaff(e.value)}}
                                                    defaultValue={[
                                                        {
                                                            value: orders.staff.id,
                                                            label: orders.staff.fullname
                                                        }
                                                    ]}
                                                />
                                            </div>
                                            {
                                                currentStaff === orders.staffId ? '' :
                                                    <div className='order-detail-staff-assign-btn' onClick={onAssign}
                                                    >
                                                        Giao quyền
                                                    </div>
                                            }
                                        </div>
                                    </div>

                                    <table className='order-detail-items-table'>
                                        <tr>
                                            <th>Số thứ tự</th>
                                            <th>Loại</th>
                                            <th>Giá vốn</th>
                                            <th>Giá bán</th>
                                            <th>Số lượng</th>
                                            <th>Ghi chú</th>
                                        </tr>
                                        {
                                            orders.orderDetails.map((item, index) =>
                                                <tr>
                                                    <td>{index + 1}</td>
                                                    <td>{item.type}</td>
                                                    <td>{item.price}</td>
                                                    <td>{item.cost}</td>
                                                    <td>{item.amount}</td>
                                                    <td>{item.note}</td>
                                                </tr>
                                            )
                                        }
                                    </table>
                                    <div className="order-detail-end">
                                        <div className="order-detail-end-header">
                                            Tổng đơn hàng
                                        </div>
                                        <div className="order-detail-total">
                                            <span>Tổng tiền đơn hàng:</span>
                                            <span>{orders.total}</span>
                                        </div>
                                        <div className="order-detail-voucher">
                                            <span>Mã giảm giá:</span>
                                            <table className='order-detail-voucher-table'>
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
                                        <div className="order-detail-all">
                                            <span>Thành tiền:</span>
                                            <span>{orders.total}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="order-detail-summary">
                                <div className="order-detail-info">
                                    <div className="order-detail-row">
                                        <span style={{ fontWeight: 'bold', fontSize: '16px', borderBottom: '1px solid grey', width: '100%' }}>Thông tin đơn hàng</span>
                                    </div>
                                    <div className="order-detail-row">
                                        <span className='order-detail-info-label'>
                                            Dịch vụ:
                                        </span>
                                        <span className='order-detail-info-content'>
                                            {orders.service.name}
                                        </span>
                                    </div>
                                    <div className="order-detail-row">
                                        <span className='order-detail-info-label'>
                                            Khách hàng:
                                        </span>
                                        <span className='order-detail-info-content'>
                                            {orders.user === null ? 'Khách hàng ảo' : orders.user.fullname}
                                        </span>
                                    </div>

                                    <div className="order-detail-row">
                                        <span className='order-detail-info-label'>
                                            Ngày tạo:
                                        </span>
                                        <span className='order-detail-info-content'>
                                            {orders.createDate}
                                        </span>
                                    </div>

                                    <div className="order-detail-row">
                                        <span className='order-detail-info-label'>
                                            Thời gian tổ chức:
                                        </span>
                                        <span className='order-detail-info-content'>
                                            {
                                                orders.eventEnd && orders.eventStart ? `${orders.eventEnd}-${orders.eventStart}`
                                                    : 'Chưa có thời gian tổ chức'
                                            }
                                        </span>
                                    </div>

                                    <div className="order-detail-row">
                                        <span className='order-detail-info-label'>
                                            Số khách tối đa:
                                        </span>
                                        <span className='order-detail-info-content'>
                                            {orders.maxGuest} người
                                        </span>
                                    </div>
                                </div>

                                <div className="order-detail-deposit">
                                    <div className="order-detail-row">
                                        <span style={{ fontWeight: 'bold', fontSize: '16px', borderBottom: '1px solid grey', width: '100%' }}>Thông tin thanh toán</span>
                                    </div>

                                    <div className="order-detail-row">
                                        <span className='order-detail-info-label'>
                                            Tổng tiền:
                                        </span>
                                        <span className='order-detail-info-content'>
                                            {orders.total}
                                        </span>
                                    </div>

                                    <div className="order-detail-row">
                                        <span className='order-detail-info-label'>
                                            Phương thức:
                                        </span>
                                        <span className='order-detail-info-content'>
                                            <img width="40px" src='https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png' />
                                        </span>
                                    </div>

                                    <div className="order-detail-row">
                                        <span className='order-detail-info-label'>
                                            Trạng thái:
                                        </span>
                                        <span className='order-detail-info-content'>
                                            Đã thanh toán cọc
                                            &nbsp;
                                            <CheckCircleIcon htmlColor='green' />
                                        </span>
                                    </div>

                                    <div className="order-detail-row">
                                        <span className='order-detail-info-label'>
                                            Hoá đơn:
                                        </span>
                                        <span className='order-detail-info-content'>
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

export default OrderDetail
