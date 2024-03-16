import React, { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import './Voucher.css';
import { Link } from 'react-router-dom';
import Loading from '../../common/loading/Loading';
import PopupConfirm from '../../common/popup-confirm/PopupConfirm';
import { deleteVoucher, getAllVoucher } from '../../../apis/voucherService';

const Voucher = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isDisplayConfirm, setIsDisplayConfirm] = useState(false);
    const [selectedEditRow, setSelectedEditRow] = useState('');
    const [selectedRows, setSelectedRows] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        const getData = async () => {
            setIsLoading(true);
            const res = await getAllVoucher(true);
            return res;
        };

        getData().then(res => {
            setData(res);
            setIsLoading(false);
        })

        window.addEventListener('click', function (e) {
            var element = this.document.getElementsByClassName('voucher-popup')[0];
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
        let VoucherPopup = document.getElementsByClassName('voucher-popup');
        VoucherPopup[0].style.display = "block";
        VoucherPopup[0].style.top = `${rect.top - 45}px`;
        VoucherPopup[0].style.left = `${rect.left - 140}px`;
        setSelectedEditRow(id);
    }

    const confirmDelete = () => {
        setIsDisplayConfirm(true);
    }

    const deleteSelectedRows = async () => {
        setData(data.filter(x => !selectedRows.includes(x.Id)));
        setSelectedRows([]);
        await deleteVoucher('123', true);
        setIsDisplayConfirm(false);
    }

    return (
        <div className='voucher-center-container'>
            <PopupConfirm isDisplay={isDisplayConfirm}
                confirmContent="Bạn có muốn xoá những mã đã chọn?"
                okCallback={deleteSelectedRows}
                cancelCallback={() => setIsDisplayConfirm(false)}
            />
            <div className='voucher-popup'>
                <Link to={`${selectedEditRow}`} style={{ textDecoration: 'none', color: 'black' }}>
                    <div className="voucher-popup-option">
                        <EditIcon fontSize='small' style={{ marginRight: "10px" }} />
                        <span>Chỉnh sửa</span>
                    </div>
                </Link>
            </div>

            <div className='voucher-center-top'>
                <div className="voucher-search-bar-container">
                    <Link to={`${Math.floor(Math.random() * 1000)}`} style={{ textDecoration: 'none', color: 'black' }}>
                        <div className='voucher-add-new'>
                            <AddIcon />
                            <span>Thêm mới</span>
                        </div>
                    </Link>
                    <div className="voucher-search-bar">
                        <SearchIcon htmlColor='grey' />
                        <input className='voucher-search-bar-input'
                            placeholder='Tìm kiếm theo mã'
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                    </div>
                </div>
                {
                    selectedRows.length > 0 ?
                        <div className='voucher-delete'
                            onClick={confirmDelete}
                        >
                            <DeleteIcon htmlColor='white' />
                            <span style={{ color: "white", marginLeft: "5px" }}>Delete {selectedRows.length} item(s)</span>
                        </div> : ""
                }
            </div>
            <div className="voucher-center-bottom">
                <table className='voucher-center-table'>
                    <thead>
                        <tr className='voucher-tablee-header'>
                            <th style={{ width: "60px" }}>
                                <input className='voucher-table-checkbox' type='checkbox'
                                    checked={selectedRows.length !== 0 && selectedRows.length >= data.length}
                                    onChange={selectAll}
                                />
                            </th>
                            <th>Mã</th>
                            <th>Giảm giá</th>
                            <th>Giá trị lớn nhất</th>
                            <th>Ngày hết hạn</th>
                            <th style={{ width: "20px" }}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            isLoading ? <></> :
                                data.map((item, index) =>
                                    !item.Code.includes(searchValue) ? '' :
                                        <tr key={index} className={`voucher-table-row ${selectedRows.includes(item.Id) ? 'voucher-table-row-active' : ''}`} onClick={() => selectCell(item.Id, !(selectedRows.find(x => x === item.Id) !== undefined))}>
                                            <td>
                                                <input type='checkbox' className='voucher-table-checkbox'
                                                    onChange={() => { }}
                                                    checked={selectedRows.find(x => x === item.Id) !== undefined}
                                                />
                                            </td>
                                            <td>{item.Code}</td>
                                            <td>{item.Discount}</td>
                                            <td>{item.MaximumValue}</td>
                                            <td>{item.ExpirationDate}</td>
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

export default Voucher;
