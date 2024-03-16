import React, { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import './Food.css';
import { Link } from 'react-router-dom';
import Loading from '../../common/loading/Loading';
import PopupConfirm from '../../common/popup-confirm/PopupConfirm';
import { deleteFood, getAllFood } from '../../../apis/foodService';

const Food = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isDisplayConfirm, setIsDisplayConfirm] = useState(false);
    const [selectedEditRow, setSelectedEditRow] = useState('');
    const [selectedRows, setSelectedRows] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        const getData = async () => {
            setIsLoading(true);
            const res = await getAllFood(true);
            return res;
        };

        getData().then(res => {
            setData(res);
            setIsLoading(false);
        })

        window.addEventListener('click', function (e) {
            var element = this.document.getElementsByClassName('food-popup')[0];
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
        let foodPopup = document.getElementsByClassName('food-popup');
        foodPopup[0].style.display = "block";
        foodPopup[0].style.top = `${rect.top - 45}px`;
        foodPopup[0].style.left = `${rect.left - 140}px`;
        setSelectedEditRow(id);
    }

    const confirmDelete = () => {
        setIsDisplayConfirm(true);
    }

    const deleteSelectedRows = async () => {
        setData(data.filter(x => !selectedRows.includes(x.Id)));
        setSelectedRows([]);
        await deleteFood('123', true);
        setIsDisplayConfirm(false);
    }

    return (
        <div className='food-center-container'>
            <PopupConfirm isDisplay={isDisplayConfirm}
                confirmContent="Bạn có muốn xoá những món ăn đã chọn?"
                okCallback={deleteSelectedRows}
                cancelCallback={() => setIsDisplayConfirm(false)}
            />
            <div className='food-popup'>
                <Link to={`${selectedEditRow}`} style={{ textDecoration: 'none', color: 'black' }}>
                    <div className="food-popup-option">
                        <EditIcon fontSize='small' style={{ marginRight: "10px" }} />
                        <span>Chỉnh sửa</span>
                    </div>
                </Link>
            </div>

            <div className='food-center-top'>
                <div className="food-search-bar-container">
                    <Link to={`${Math.floor(Math.random() * 1000)}`} style={{ textDecoration: 'none', color: 'black' }}>
                        <div className='food-add-new'>
                            <AddIcon />
                            <span>Thêm mới</span>
                        </div>
                    </Link>
                    <div className="food-search-bar">
                        <SearchIcon htmlColor='grey' />
                        <input className='food-search-bar-input'
                            placeholder='Tìm kiếm theo tên'
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                    </div>
                </div>
                {
                    selectedRows.length > 0 ?
                        <div className='food-delete'
                            onClick={confirmDelete}
                        >
                            <DeleteIcon htmlColor='white' />
                            <span style={{ color: "white", marginLeft: "5px" }}>Delete {selectedRows.length} item(s)</span>
                        </div> : ""
                }
            </div>
            <div className="food-center-bottom">
                <table className='food-center-table'>
                    <thead>
                        <tr className='food-table-header'>
                            <th style={{ width: "60px" }}>
                                <input className='food-table-checkbox' type='checkbox'
                                    checked={selectedRows.length !== 0 && selectedRows.length >= data.length}
                                    onChange={selectAll}
                                />
                            </th>
                            <th>Id</th>
                            <th></th>
                            <th>Tên món ăn</th>
                            <th>Loại đồ ăn</th>
                            <th>Giá</th>
                            <th>Mô tả</th>
                            <th style={{ width: "20px" }}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            isLoading ? <></> :
                                data.map((item, index) =>
                                    !item.Name.includes(searchValue) ? '' :
                                        <tr key={index} className={`food-table-row ${selectedRows.includes(item.Id) ? 'food-table-row-active' : ''}`} onClick={() => selectCell(item.Id, !(selectedRows.find(x => x === item.Id) !== undefined))}>
                                            <td>
                                                <input type='checkbox' className='food-table-checkbox'
                                                    onChange={() => { }}
                                                    checked={selectedRows.find(x => x === item.Id) !== undefined}
                                                />
                                            </td>
                                            <td>{item.Id}</td>
                                            <td>
                                                <img width='100px' src='https://cdn.eva.vn/upload/3-2023/images/2023-07-13/cach-nau-pho-bo-ha-noi-thom-ngon-chuan-vi-tai-nha-cuc-don-gian-14-1689214964-384-width700height482.jpg' />
                                            </td>
                                            <td>{item.Name}</td>
                                            <td>{item.DishType}</td>
                                            <td>{item.Price}</td>
                                            <td>{item.Description}</td>
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

export default Food;
