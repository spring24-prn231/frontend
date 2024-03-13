import React from 'react';
import './OrderDetail.css';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SearchIcon from '@mui/icons-material/Search';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

const OrderDetail = () => {
    return (
        <div className='order-detail-container'>
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
                    #Đơn hàng mới tạo
                </div>
            </div>
            <div className="order-detail-content">
                <div className='order-detail-items'>
                    <div className="order-detail-order-name">
                        Đơn hàng #0001
                    </div>
                    <div className="order-detail-items-container">
                        <div className="order-detail-assign">
                            <div style={{ fontWeight: 'bold', marginBottom: '10px' }}>
                                Nhân viên chịu trách nhiệm:
                            </div>
                            <div className="">
                                <Select
                                    closeMenuOnSelect={false}
                                    components={animatedComponents}
                                    isMulti
                                    options={[
                                        { value: '1', label: 'Đạt' },
                                        { value: '2', label: 'Duy' },
                                        { value: '3', label: 'Khanh' },
                                        { value: '4', label: 'Tân' },
                                    ]}
                                />
                            </div>
                        </div>

                        <table className='order-detail-items-table'>
                            <tr>
                                <th>Id</th>
                                <th>Loại</th>
                                <th>Giá vốn</th>
                                <th>Giá bán</th>
                                <th>Số lượng</th>
                                <th>Ghi chú</th>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>Sân khấu</td>
                                <td>20.000 đồng</td>
                                <td>20.000 đồng</td>
                                <td>1</td>
                                <td>Sân khấu có đèn</td>
                            </tr><tr>
                                <td>1</td>
                                <td>Sân khấu</td>
                                <td>20.000 đồng</td>
                                <td>20.000 đồng</td>
                                <td>1</td>
                                <td>Sân khấu có đèn</td>
                            </tr><tr>
                                <td>1</td>
                                <td>Sân khấu</td>
                                <td>20.000 đồng</td>
                                <td>20.000 đồng</td>
                                <td>1</td>
                                <td>Sân khấu có đèn</td>
                            </tr><tr>
                                <td>1</td>
                                <td>Sân khấu</td>
                                <td>20.000 đồng</td>
                                <td>20.000 đồng</td>
                                <td>1</td>
                                <td>Sân khấu có đèn</td>
                            </tr><tr>
                                <td>1</td>
                                <td>Sân khấu</td>
                                <td>20.000 đồng</td>
                                <td>20.000 đồng</td>
                                <td>1</td>
                                <td>Sân khấu có đèn</td>
                            </tr><tr>
                                <td>1</td>
                                <td>Sân khấu</td>
                                <td>20.000 đồng</td>
                                <td>20.000 đồng</td>
                                <td>1</td>
                                <td>Sân khấu có đèn</td>
                            </tr>
                        </table>
                        <div className="order-detail-end">
                            <div className="order-detail-end-header">
                                Tổng đơn hàng
                            </div>
                            <div className="order-detail-total">
                                <span>Tổng tiền đơn hàng:</span>
                                <span>200.000 đồng</span>
                            </div>
                            <div className="order-detail-voucher">
                                <span>Mã giảm giá:</span>
                                <table className='order-detail-voucher-table'>
                                    <tr>
                                        <th>Mã:</th>
                                        <th>Số tiền giảm:</th>
                                    </tr>
                                    <tr>
                                        <td>VCH001</td>
                                        <td>-10.000 đồng</td>
                                    </tr>
                                    <tr>
                                        <td>VCH001</td>
                                        <td>-10.000 đồng</td>
                                    </tr>
                                </table>
                            </div>
                            <div className="order-detail-all">
                                <span>Thành tiền:</span>
                                <span>180.000 đồng</span>
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
                                Gói tiệc sinh nhật
                            </span>
                        </div>
                        <div className="order-detail-row">
                            <span className='order-detail-info-label'>
                                Khách hàng:
                            </span>
                            <span className='order-detail-info-content'>
                                Trần Văn A
                            </span>
                        </div>

                        <div className="order-detail-row">
                            <span className='order-detail-info-label'>
                                Ngày tạo:
                            </span>
                            <span className='order-detail-info-content'>
                                2024-03-10
                            </span>
                        </div>

                        <div className="order-detail-row">
                            <span className='order-detail-info-label'>
                                Thời gian tổ chức:
                            </span>
                            <span className='order-detail-info-content'>
                                2024/03/01 - 2024/03/31
                            </span>
                        </div>

                        <div className="order-detail-row">
                            <span className='order-detail-info-label'>
                                Dịch vụ:
                            </span>
                            <span className='order-detail-info-content'>
                                Gói tiệc sinh nhật
                            </span>
                        </div>

                        <div className="order-detail-row">
                            <span className='order-detail-info-label'>
                                Số khách tối đa:
                            </span>
                            <span className='order-detail-info-content'>
                                20 người
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
                                180.000 đồng
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
                                Đã thanh toán
                                &nbsp;
                                <CheckCircleIcon htmlColor='green' />
                            </span>
                        </div>

                        <div className="order-detail-row">
                            <span className='order-detail-info-label'>
                                Hoá đơn:
                            </span>
                            <span className='order-detail-info-content'>
                                <a href='#'>Nhấn để tải về</a>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderDetail
