import React, { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import './Room.css';
import { Link } from 'react-router-dom';
import SettingsIcon from '@mui/icons-material/Settings';
import Loading from '../../common/loading/Loading';
import PopupConfirm from '../../common/popup-confirm/PopupConfirm';
import { deleteRoom, getAllRoom } from '../../../apis/roomService';

const Room = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isDisplayConfirm, setIsDisplayConfirm] = useState(false);
    const [selectedEditRow, setSelectedEditRow] = useState('');
    const [selectedRows, setSelectedRows] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        const getData = async () => {
            setIsLoading(true);
            const res = await getAllRoom(true);
            return res;
        };

        getData().then(res => {
            setData(res);
            setIsLoading(false);
        })

        window.addEventListener('click', function (e) {
            var element = this.document.getElementsByClassName('room-popup')[0];
            if (element !== undefined) {
                if (!element.contains(e.target)) {
                    element.style.display = 'none';
                    setSelectedEditRow('');
                }
            }
            var element1 = this.document.getElementsByClassName('room-setting-popup')[0];
            if (element1 !== undefined) {
                if (!element1.contains(e.target)) {
                    element1.style.display = 'none';
                }
            }
        });
    }, []);

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
        let RoomPopup = document.getElementsByClassName('room-popup');
        RoomPopup[0].style.display = "block";
        RoomPopup[0].style.top = `${rect.top - 45}px`;
        RoomPopup[0].style.left = `${rect.left - 140}px`;
        setSelectedEditRow(id);
    }

    const chooseSetting = (event, id) => {
        event.stopPropagation();
        var element = event.target;
        var rect = element.getBoundingClientRect();
        let SettingPopup = document.getElementsByClassName('room-setting-popup');
        SettingPopup[0].style.display = "block";
        SettingPopup[0].style.top = `${rect.top - 30}px`;
        SettingPopup[0].style.left = `${rect.left - 160}px`;
    }

    const confirmDelete = () => {
        setIsDisplayConfirm(true);
    }

    const deleteSelectedRows = async () => {
        setData(data.filter(x => !selectedRows.includes(x.Id)));
        setSelectedRows([]);
        await deleteRoom('123', true);
        setIsDisplayConfirm(false);
    }

    return (
        <div className='room-center-container'>
            <PopupConfirm isDisplay={isDisplayConfirm}
                confirmContent="Bạn có muốn xoá các phòng đã chọn không?"
                okCallback={deleteSelectedRows}
                cancelCallback={() => setIsDisplayConfirm(false)}
            />
            <div className='room-setting-popup'>
                <Link to="/manager/room-type" style={{ textDecoration: 'none', color: 'black' }}>
                    <div className="room-setting-popup-option">
                        <EditIcon fontSize='small' style={{ marginRight: "10px" }} />
                        <span>Loại phòng</span>
                    </div>
                </Link>
            </div>

            <div className='room-popup'>
                <Link to={`${selectedEditRow}`} style={{ textDecoration: 'none', color: 'black' }}>
                    <div className="room-popup-option">
                        <EditIcon fontSize='small' style={{ marginRight: "10px" }} />
                        <span>Chỉnh sửa</span>
                    </div>
                </Link>
            </div>

            <div className='room-center-top'>
                <div className="room-search-bar-container">
                    <Link to={`${Math.floor(Math.random() * 1000)}`} style={{ textDecoration: 'none', color: 'black' }}>
                        <div className='room-add-new'>
                            <AddIcon />
                            <span>Thêm mới</span>
                        </div>
                    </Link>
                    <div className="room-search-bar">
                        <SearchIcon htmlColor='grey' />
                        <input className='room-search-bar-input'
                            placeholder='Tìm kiếm số phòng'
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                    </div>
                </div>
                {
                    selectedRows.length > 0 ?
                        <div className='room-delete'
                            onClick={confirmDelete}
                        >
                            <DeleteIcon htmlColor='white' />
                            <span style={{ color: "white", marginLeft: "5px" }}>Delete {selectedRows.length} item(s)</span>
                        </div> : ""
                }
                <div className='room-top-setting' onClick={chooseSetting}
                >
                    <SettingsIcon fontSize='large' htmlColor='grey' />
                </div>
            </div>
            <div className="room-center-bottom">
                <table className='room-center-table'>
                    <thead>
                        <tr className='room-table-header'>
                            <th style={{ width: "60px" }}>
                                <input className='room-table-checkbox' type='checkbox'
                                    checked={selectedRows.length !== 0 && selectedRows.length >= data.length}
                                    onChange={selectAll}
                                />
                            </th>
                            <th>Số phòng</th>
                            <th>Sức chứa</th>
                            <th>Loại phòng</th>
                            <th style={{ width: "20px" }}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            isLoading ? <></> :
                                data.map((item, index) =>
                                    !item.RoomNo.includes(searchValue) ? '' :
                                        <tr key={index} className={`room-table-row ${selectedRows.includes(item.Id) ? 'room-table-row-active' : ''}`} onClick={() => selectCell(item.Id, !(selectedRows.find(x => x === item.Id) !== undefined))}>
                                            <td>
                                                <input type='checkbox' className='room-table-checkbox'
                                                    onChange={() => { }}
                                                    checked={selectedRows.find(x => x === item.Id) !== undefined}
                                                />
                                            </td>
                                            <td>{item.RoomNo}</td>
                                            <td>{item.Capacity}</td>
                                            <td>{item.RoomType}</td>
                                            <td><MoreVertIcon className='plan-option' onClick={(e) => chooseOption(e, item.Id)} /></td>
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

export default Room;
