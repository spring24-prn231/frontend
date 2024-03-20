import React, { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import './Feedback.css';
import { Link } from 'react-router-dom';
import Loading from '../../common/loading/Loading';
import PopupConfirm from '../../common/popup-confirm/PopupConfirm';
import { deleteFeedback, getAllFeedback } from '../../../apis/feedbackService';

const Feedback = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isDisplayConfirm, setIsDisplayConfirm] = useState(false);
    const [selectedEditRow, setSelectedEditRow] = useState('');
    const [selectedRows, setSelectedRows] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        const getData = async () => {
            setIsLoading(true);
            const res = await getAllFeedback();
            return res;
        };

        getData().then(res => {
            setData(res.data);
            setIsLoading(false);
        })

        window.addEventListener('click', function (e) {
            var element = this.document.getElementsByClassName('feedback-popup')[0];
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
        let FeedbackPopup = document.getElementsByClassName('feedback-popup');
        FeedbackPopup[0].style.display = "block";
        FeedbackPopup[0].style.top = `${rect.top - 45}px`;
        FeedbackPopup[0].style.left = `${rect.left - 140}px`;
        setSelectedEditRow(id);
    }

    const confirmDelete = () => {
        setIsDisplayConfirm(true);
    }

    const deleteSelectedRows = async () => {
        setData(data.filter(x => !selectedRows.includes(x.id)));
        setSelectedRows([]);
        await deleteFeedback('123', true);
        setIsDisplayConfirm(false);
    }

    return (
        <div className='feedback-center-container'>
            <PopupConfirm isDisplay={isDisplayConfirm}
                confirmContent="Bạn có muốn xoá các phản hồi đã chọn?"
                okCallback={deleteSelectedRows}
                cancelCallback={() => setIsDisplayConfirm(false)}
            />
            <div className='feedback-popup'>
                <Link to={`${selectedEditRow}`} style={{ textDecoration: 'none', color: 'black' }}>
                    <div className="feedback-popup-option">
                        <EditIcon fontSize='small' style={{ marginRight: "10px" }} />
                        <span>Chỉnh sửa</span>
                    </div>
                </Link>
            </div>

            <div className='feedback-center-top'>
                <div className="feedback-search-bar-container">
                    <div className="feedback-search-bar">
                        <SearchIcon htmlColor='grey' />
                        <input className='feedback-search-bar-input'
                            placeholder='Tìm kiếm theo bình luận'
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                    </div>
                </div>
                {
                    selectedRows.length > 0 ?
                        <div className='feedback-delete'
                            onClick={confirmDelete}
                        >
                            <DeleteIcon htmlColor='white' />
                            <span style={{ color: "white", marginLeft: "5px" }}>Xoá {selectedRows.length} hàng</span>
                        </div> : ""
                }
            </div>
            <div className="feedback-center-bottom">
                <table className='feedback-center-table'>
                    <thead>
                        <tr className='feedback-table-header'>
                            <th style={{ width: "60px" }}>
                                <input className='feedback-table-checkbox' type='checkbox'
                                    checked={selectedRows.length !== 0 && selectedRows.length >= data.length}
                                    onChange={selectAll}
                                />
                            </th>
                            <th>Số sao</th>
                            <th>Bình luận</th>
                            <th>Ngày bình luận</th>
                            <th>Khách hàng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            isLoading ? <></> :
                                data.map((item, index) =>
                                    !item.comment.includes(searchValue) ? '' :
                                        <tr key={index} className={`feedback-table-row ${selectedRows.includes(item.id) ? 'feedback-table-row-active' : ''}`} onClick={() => selectCell(item.id, !(selectedRows.find(x => x === item.id) !== undefined))}>
                                            <td>
                                                <input type='checkbox' className='feedback-table-checkbox'
                                                    onChange={() => { }}
                                                    checked={selectedRows.find(x => x === item.id) !== undefined}
                                                />
                                            </td>
                                            <td>
                                            {
                                                [1, 2, 3, 4, 5].map(index => 
                                                    index > parseInt(item.ratingStar) ? <StarBorderIcon htmlColor='#dbdb07'/> : <StarIcon htmlColor='#dbdb07'/>
                                                )
                                            }
                                            </td>
                                            <td>{item.comment}</td>
                                            <td>{item.modifiedDate}</td>
                                            <td>{item.order.userId}</td>
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

export default Feedback;
