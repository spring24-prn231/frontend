import React, { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import './StaffOrder.css';
import { Link, useLocation } from 'react-router-dom';
import Loading from '../../common/loading/Loading';
import PopupConfirm from '../../common/popup-confirm/PopupConfirm';
import { deleteOrder, getAllOrder } from '../../../apis/orderService';
import Select from 'react-select';

const StaffOrder = () => {
    const [data, setData] = useState([]);
    const { hash, pathname, search } = useLocation();
    const [isLoading, setIsLoading] = useState(false);
    const [isDisplayConfirm, setIsDisplayConfirm] = useState(false);
    const [selectedEditRow, setSelectedEditRow] = useState('');
    const [selectedRows, setSelectedRows] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        const getData = async () => {
            setIsLoading(true);
            const res = await getAllOrder();
            return res;
        };

        getData().then(res => {
            setData(res.data);
            setIsLoading(false);
        })

        window.addEventListener('click', function (e) {
            var element = this.document.getElementsByClassName('staff-order-popup')[0];
            if (element !== undefined) {
                if (!element.contains(e.target)) {
                    element.style.display = 'none';
                    setSelectedEditRow('');
                }
            }
        });
    }, []);

    const selectAll = () => {
        if (selectedRows.length === data.length) {
            setSelectedRows([]);
        }
        else {
            setSelectedRows(data.map(x => x.id));
        }
    }

    const selectCell = (id, value) => {
        if (value === false) {
            setSelectedRows(selectedRows.filter(x => x !== id));
        }
        else {
            setSelectedRows([...selectedRows, id]);
        }
    }

    const chooseOption = (event, id) => {
        event.stopPropagation();
        var element = event.target;
        var rect = element.getBoundingClientRect();
        let orderPopup = document.getElementsByClassName('staff-order-popup');
        orderPopup[0].style.display = "block";
        orderPopup[0].style.top = `${rect.top - 45}px`;
        orderPopup[0].style.left = `${rect.left - 110}px`;
        setSelectedEditRow(id);
    }

    const confirmDelete = () => {
        setIsDisplayConfirm(true);
    }

    const deleteSelectedRows = async () => {
        setData(data.filter(x => !selectedRows.includes(x.id)));
        setSelectedRows([]);
        await deleteOrder('123', true);
        setIsDisplayConfirm(false);
    }

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
    }

    return (
        <div className='staff-order-center-container'>
            <PopupConfirm isDisplay={isDisplayConfirm}
                confirmContent="Bạn có muốn xoá các đơn hàng đã chọn?"
                okCallback={deleteSelectedRows}
                cancelCallback={() => setIsDisplayConfirm(false)}
            />
            <div className='staff-order-popup'>
                <Link to={`${pathname.includes('order')?'':'order/'}${selectedEditRow}`} style={{ textDecoration: 'none', color: 'black' }}>
                    <div className="staff-order-popup-option">
                        <EditIcon fontSize='small' style={{ marginRight: "10px" }} />
                        <span>Chi tiết</span>
                    </div>
                </Link>
            </div>

            <div className='staff-order-center-top'>
                <div className="staff-order-search-bar-container">
                    <div className="staff-order-search-bar">
                        <SearchIcon htmlColor='grey' />
                        <input className='staff-order-search-bar-input'
                            placeholder='Tìm kiếm theo tên dịch vụ'
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                    </div>
                </div>
                {
                    selectedRows.length > 0 ?
                        <div className='staff-order-delete'
                            onClick={confirmDelete}
                        >
                            <DeleteIcon htmlColor='white' />
                            <span style={{ color: "white", marginLeft: "5px" }}>Xoá {selectedRows.length} hàng</span>
                        </div> :
                        ""
                }
                <Select
                    isSearchable={false}
                    options={
                        [
                            { value: 'new', label: 'Mới tạo' },
                            { value: 'progress', label: 'Đang tiến hành' },
                            { value: 'finish', label: 'Kết thúc' }
                        ]
                    }
                />
            </div>
            <div className="staff-order-center-bottom">
                <table className='staff-order-center-table'>
                    <thead>
                        <tr className='staff-order-table-header'>
                            <th style={{ width: "60px" }}>
                                <input className='staff-order-table-checkbox' type='checkbox'
                                    checked={selectedRows.length !== 0 && selectedRows.length >= data.length}
                                    onChange={selectAll}
                                />
                            </th>
                            <th>Tên dịch vụ</th>
                            <th>Khách hàng</th>
                            <th>Nhân viên</th>
                            <th>Ngày tạo</th>
                            <th>Tổng tiền</th>
                            <th>Trạng thái</th>
                            <th>Ngày bắt đầu</th>
                            <th>Ngày kết thúc</th>
                            <th style={{ width: "20px" }}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            isLoading ? <></> :
                                data.map((item, index) =>
                                    !item.service.name.includes(searchValue) ? '' :
                                        <tr key={index} className={`staff-order-table-row ${selectedRows.includes(item.id) ? 'staff-order-table-row-active' : ''}`} onClick={() => selectCell(item.id, !(selectedRows.find(x => x === item.id) !== undefined))}>
                                            <td>
                                                <input type='checkbox' className='staff-order-table-checkbox'
                                                    onChange={() => { }}
                                                    checked={selectedRows.find(x => x === item.id) !== undefined}
                                                />
                                            </td>
                                            <td>{item.service.name}</td>
                                            <td>{item.user?item.user.fullname : 'Khách hàng ảo'}</td>
                                            <td>{item.staff?item.staff.name : 'Chưa được giao'}</td>
                                            <td>{item.createDate}</td>
                                            <td style={{width: '100px'}}>{item.total}</td>
                                            <td style={{width: '140px'}}>
                                                {
                                                    convertStatus(item.executionStatus)
                                                }
                                            </td>
                                            <td>{item.eventEnd}</td>
                                            <td>{item.eventStart}</td>
                                            <td><MoreVertIcon className='staff-order-option' onClick={(e) => chooseOption(e, item.id)} /></td>
                                        </tr>
                                )
                        }
                    </tbody>
                </table>
                {
                    isLoading ? <Loading /> : ""
                }
            </div>
        </div>
    )
}

export default StaffOrder;
