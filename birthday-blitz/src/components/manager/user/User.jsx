import React, { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import BlockIcon from '@mui/icons-material/Block';
import './User.css';
import { Link } from 'react-router-dom';
import Loading from '../../common/loading/Loading';
import PopupConfirm from '../../common/popup-confirm/PopupConfirm';
import { blockUser, deleteUser, getAllUser, unBlockUser } from '../../../apis/userService';
import MoodIcon from '@mui/icons-material/Mood';
import MoodBadIcon from '@mui/icons-material/MoodBad';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const User = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isReload, setIsReload] = useState(false);
    const [isDisplayConfirm, setIsDisplayConfirm] = useState(false);
    const [selectedEditRow, setSelectedEditRow] = useState('');
    const [selectedRows, setSelectedRows] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        const getData = async () => {
            setIsLoading(true);
            const res = await getAllUser();
            return res;
        };

        getData().then(res => {
            setData(res.data);
            setIsLoading(false);
        })

        window.addEventListener('click', function (e) {
            var element = this.document.getElementsByClassName('user-popup')[0];
            if (element !== undefined) {
                if (!element.contains(e.target)) {
                    element.style.display = 'none';
                    setSelectedEditRow('');
                }
            }
        });
    }, [isReload]);

    const selectAll = () => {
        if (selectedRows.length === data.length) {
            setSelectedRows([]);
        }
        else {
            setSelectedRows(data.map(x => x.Id));
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
        let userPopup = document.getElementsByClassName('user-popup');
        userPopup[0].style.display = "block";
        userPopup[0].style.top = `${rect.top - 45}px`;
        userPopup[0].style.left = `${rect.left - 100}px`;
        setSelectedEditRow(id);
    }

    const confirmDelete = () => {
        setIsDisplayConfirm(true);
    }

    const deleteSelectedRows = async () => {
        setData(data.filter(x => !selectedRows.includes(x.Id)));
        setSelectedRows([]);
        await deleteUser('123', true);
        setIsDisplayConfirm(false);
    }

    const onBlockUser = () => {
        blockUser(selectedEditRow).then(res => {
            toast.success("Chặn thành công !!!", {
                position: "bottom-right"
            });
            setIsReload(!isReload);
        }).catch(err => {
            toast.error("Chặn thất bại, hãy thử lại !!!", {
                position: "bottom-right"
            });
        });
    }

    const onUnBlockUser = () => {
        unBlockUser(selectedEditRow).then(res => {
            toast.success("Bỏ chặn thành công !!!", {
                position: "bottom-right"
            });
            setIsReload(!isReload);
        }).catch(err => {
            toast.error("Bỏ chặn thất bại, hãy thử lại !!!", {
                position: "bottom-right"
            });
        });
    }

    return (
        <div className='user-center-container'>
            <ToastContainer />
            <PopupConfirm isDisplay={isDisplayConfirm}
                confirmContent="Bạn có muốn xoá các khách hàng đã chọn?"
                okCallback={deleteSelectedRows}
                cancelCallback={() => setIsDisplayConfirm(false)}
            />
            <div className='user-popup'>
                <div className="user-popup-option" onClick={onBlockUser}>
                    <MoodBadIcon fontSize='small' style={{ marginRight: "10px" }} />
                    <span>Chặn</span>
                </div>
                <div className="user-popup-option" onClick={onUnBlockUser}>
                    <MoodIcon fontSize='small' style={{ marginRight: "10px" }} />
                    <span>Bỏ chặn</span>
                </div>
            </div>

            <div className='user-center-top'>
                <div className="user-search-bar-container">
                    <Link to={`${Math.floor(Math.random() * 1000)}`} style={{ textDecoration: 'none', color: 'black' }}>
                        <div className='user-add-new'>
                            <AddIcon />
                            <span>Thêm mới</span>
                        </div>
                    </Link>
                    <div className="user-search-bar">
                        <SearchIcon htmlColor='grey' />
                        <input className='user-search-bar-input'
                            placeholder='Tìm kiếm theo tên đăng nhập'
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                    </div>
                </div>
                {
                    selectedRows.length > 0 ?
                        <div className='user-delete'
                            onClick={confirmDelete}
                        >
                            <DeleteIcon htmlColor='white' />
                            <span style={{ color: "white", marginLeft: "5px" }}>Delete {selectedRows.length} item(s)</span>
                        </div> : ""
                }
            </div>
            <div className="user-center-bottom">
                <table className='user-center-table'>
                    <thead>
                        <tr className='user-table-header'>
                            <th style={{ width: "60px" }}>
                                <input className='user-table-checkbox' type='checkbox'
                                    checked={selectedRows.length !== 0 && selectedRows.length >= data.length}
                                    onChange={selectAll}
                                />
                            </th>
                            <th>Họ và tên</th>
                            <th>Tên đăng nhập</th>
                            <th>Số điện thoại</th>
                            <th>Email</th>
                            <th>Bị chặn</th>
                            <th style={{ width: "20px" }}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            isLoading ? <></> :
                                data.map((item, index) =>
                                    !item.userName.includes(searchValue) ? '' :
                                        <tr key={index} className={`user-table-row ${selectedRows.includes(item.id) ? 'user-table-row-active' : ''}`} onClick={() => selectCell(item.id, !(selectedRows.find(x => x === item.id) !== undefined))}>
                                            <td>
                                                <input type='checkbox' className='user-table-checkbox'
                                                    onChange={() => { }}
                                                    checked={selectedRows.find(x => x === item.id) !== undefined}
                                                />
                                            </td>
                                            <td>{item.fullname}</td>
                                            <td>{item.userName}</td>
                                            <td>{item.phoneNumber}</td>
                                            <td>{item.email}</td>
                                            <td>{item.status === false ? 'Bị chặn' : 'Hoạt động'}</td>
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

export default User;
