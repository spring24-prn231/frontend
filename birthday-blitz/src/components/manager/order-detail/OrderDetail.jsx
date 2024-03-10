import React from 'react';
import './OrderDetail.css';
import SearchIcon from '@mui/icons-material/Search';

const OrderDetail = () => {
    return (
        <div className='order-detail-container'>
            <div className="order-detail-top">
                <div className="order-detail-search-bar-container">
                    <div className="order-detail-search-bar">
                        <SearchIcon htmlColor='grey' />
                        <input className='order-detail-search-bar-input'
                            placeholder='Tìm kiếm theo tên dịch vụ'
                            value={''}
                        // onChange={(e) => setSearchValue(e.target.value)}
                        />
                    </div>
                </div>
                <div className="order-detail-progress">
                    Đơn hàng mới tạo
                </div>
            </div>
            <div className="order-detail-content">
                <div className='order-detail-items'>
                    <div className="order-detail-order-name">
                        Đơn hàng #0001
                    </div>

                    <table className='order-detail-items-table'>
                        <tr>
                            <th>Company</th>
                            <th>Contact</th>
                            <th>Country</th>
                        </tr>
                        <tr>
                            <td>Alfreds Futterkiste</td>
                            <td>Maria Anders</td>
                            <td>Germany</td>
                        </tr>
                        <tr>
                            <td>Berglunds snabbköp</td>
                            <td>Christina Berglund</td>
                            <td>Sweden</td>
                        </tr>
                        <tr>
                            <td>Berglunds snabbköp</td>
                            <td>Christina Berglund</td>
                            <td>Sweden</td>
                        </tr>
                        <tr>
                            <td>Berglunds snabbköp</td>
                            <td>Christina Berglund</td>
                            <td>Sweden</td>
                        </tr>
                        <tr>
                            <td>Berglunds snabbköp</td>
                            <td>Christina Berglund</td>
                            <td>Sweden</td>
                        </tr>
                        <tr>
                            <td>Berglunds snabbköp</td>
                            <td>Christina Berglund</td>
                            <td>Sweden</td>
                        </tr>
                        <tr>
                            <td>Berglunds snabbköp</td>
                            <td>Christina Berglund</td>
                            <td>Sweden</td>
                        </tr>
                        <tr>
                            <td>Berglunds snabbköp</td>
                            <td>Christina Berglund</td>
                            <td>Sweden</td>
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
                <div className="order-detail-summary">
                    <div className="order-detail-info">

                    </div>
                    <div className="order-detail-deposit">

                    </div>
                    <div className="order-detail-bill">

                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderDetail
