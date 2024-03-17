import React, { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import './Staff.css';
import { Link } from 'react-router-dom';
import Loading from '../../common/loading/Loading';
import PopupConfirm from '../../common/popup-confirm/PopupConfirm';
import { deleteStaff, getAllStaff } from '../../../apis/staffService';

const Staff = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isDisplayConfirm, setIsDisplayConfirm] = useState(false);
    const [selectedEditRow, setSelectedEditRow] = useState('');
    const [selectedRows, setSelectedRows] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        const getData = async () => {
            setIsLoading(true);
            const res = await getAllStaff();
            return res;
        };

        getData().then(res => {
            setData(res.data);
            setIsLoading(false);
        })

        window.addEventListener('click', function (e) {
            var element = this.document.getElementsByClassName('staff-popup')[0];
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
        let staffPopup = document.getElementsByClassName('staff-popup');
        staffPopup[0].style.display = "block";
        staffPopup[0].style.top = `${rect.top - 45}px`;
        staffPopup[0].style.left = `${rect.left - 140}px`;
        setSelectedEditRow(id);
    }

    const confirmDelete = () => {
        setIsDisplayConfirm(true);
    }

    const deleteSelectedRows = async () => {
        setData(data.filter(x => !selectedRows.includes(x.id)));
        setSelectedRows([]);
        await deleteStaff('123', true);
        setIsDisplayConfirm(false);
    }

    return (
        <div className='staff-center-container'>
            <PopupConfirm isDisplay={isDisplayConfirm}
                confirmContent="Bạn có muốn xoá những nhân viên đã chọn?"
                okCallback={deleteSelectedRows}
                cancelCallback={() => setIsDisplayConfirm(false)}
            />
            <div className='staff-popup'>
                <Link to={`${selectedEditRow}`} style={{ textDecoration: 'none', color: 'black' }}>
                    <div className="staff-popup-option">
                        <EditIcon fontSize='small' style={{ marginRight: "10px" }} />
                        <span>Chỉnh sửa</span>
                    </div>
                </Link>
            </div>

            <div className='staff-center-top'>
                <div className="staff-search-bar-container">
                    <Link to="addnew" style={{ textDecoration: 'none', color: 'black' }}>
                        <div className='staff-add-new'>
                            <AddIcon />
                            <span>Thêm mới</span>
                        </div>
                    </Link>
                    <div className="staff-search-bar">
                        <SearchIcon htmlColor='grey' />
                        <input className='staff-search-bar-input'
                            placeholder='Tìm kiếm theo tên'
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                    </div>
                </div>
                {
                    selectedRows.length > 0 ?
                        <div className='staff-delete'
                            onClick={confirmDelete}
                        >
                            <DeleteIcon htmlColor='white' />
                            <span style={{ color: "white", marginLeft: "5px" }}>Xoá {selectedRows.length} hàng</span>
                        </div> : ""
                }
            </div>
            <div className="staff-center-bottom">
                <table className='staff-center-table'>
                    <thead>
                        <tr className='staff-table-header'>
                            <th style={{ width: "60px" }}>
                                <input className='staff-table-checkbox' type='checkbox'
                                    checked={selectedRows.length !== 0 && selectedRows.length >= data.length}
                                    onChange={selectAll}
                                />
                            </th>
                            <th>Họ và tên</th>
                            <th>Tên đăng nhập</th>
                            <th>Số điện thoại</th>
                            <th>Email</th>
                            <th style={{ width: "20px" }}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            isLoading ? <></> :
                                data.map((item, index) =>
                                    item.fullname === null? '' :  !item.fullname.includes(searchValue) ? '' :
                                        <tr key={index} className={`staff-table-row ${selectedRows.includes(item.id) ? 'staff-table-row-active' : ''}`} onClick={() => selectCell(item.id, !(selectedRows.find(x => x === item.id) !== undefined))}>
                                            <td>
                                                <input type='checkbox' className='staff-table-checkbox'
                                                    onChange={() => { }}
                                                    checked={selectedRows.find(x => x === item.id) !== undefined}
                                                />
                                            </td>
                                            <td>{item.fullname}</td>
                                            <td>{item.userName}</td>
                                            <td>{item.phoneNumber}</td>
                                            <td>{item.email}</td>
                                            <td><MoreVertIcon className='plan-option' onClick={(e) => chooseOption(e, item.id)} /></td>
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

export default Staff;
