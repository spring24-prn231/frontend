import React, { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import './Plan.css';
import { Link } from 'react-router-dom';
import { deletePlan, getAllPlan } from '../../../apis/planService';
import Loading from '../../common/loading/Loading';
import PopupConfirm from '../../common/popup-confirm/PopupConfirm';

const Plan = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isDisplayConfirm, setIsDisplayConfirm] = useState(false);
    const [selectedEditRow, setSelectedEditRow] = useState('');
    const [selectedRows, setSelectedRows] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        const getData = async () => {
            setIsLoading(true);
            const res = await getAllPlan(true);
            return res;
        };

        getData().then(res => {
            setData(res);
            setIsLoading(false);
        })

        window.addEventListener('click', function (e) {
            var element = this.document.getElementsByClassName('plan-popup')[0];
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
        let planPopup = document.getElementsByClassName('plan-popup');
        planPopup[0].style.display = "block";
        planPopup[0].style.top = `${rect.top - 45}px`;
        planPopup[0].style.left = `${rect.left - 140}px`;
        setSelectedEditRow(id);
    }

    const confirmDelete = () => {
        setIsDisplayConfirm(true);
    }

    const deleteSelectedRows = async () => {
        setData(data.filter(x => !selectedRows.includes(x.Id)));
        setSelectedRows([]);
        await deletePlan('123', true);
        setIsDisplayConfirm(false);
    }

    return (
        <div className='plan-center-container'>
            <PopupConfirm isDisplay={isDisplayConfirm}
                confirmContent="Do you want to delete selected items?"
                okCallback={deleteSelectedRows}
                cancelCallback={() => setIsDisplayConfirm(false)}
            />
            <div className='plan-popup'>
                <Link to={`${selectedEditRow}`} style={{ textDecoration: 'none', color: 'black' }}>
                    <div className="plan-popup-option">
                        <EditIcon fontSize='small' style={{ marginRight: "10px" }} />
                        <span>Edit</span>
                    </div>
                </Link>
            </div>

            <div className='plan-center-top'>
                <div className="plan-search-bar-container">
                    <Link to={`${Math.floor(Math.random() * 1000)}`} style={{ textDecoration: 'none', color: 'black' }}>
                        <div className='plan-add-new'>
                            <AddIcon />
                            <span>Add new</span>
                        </div>
                    </Link>
                    <div className="plan-search-bar">
                        <SearchIcon htmlColor='grey' />
                        <input className='plan-search-bar-input'
                            placeholder='Search by name'
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                    </div>
                </div>
                {
                    selectedRows.length > 0 ?
                        <div className='plan-delete'
                            onClick={confirmDelete}
                        >
                            <DeleteIcon htmlColor='white' />
                            <span style={{ color: "white", marginLeft: "5px" }}>Delete {selectedRows.length} item(s)</span>
                        </div> : ""
                }
            </div>
            <div className="plan-center-bottom">
                <table className='plan-center-table'>
                    <thead>
                        <tr className='plan-table-header'>
                            <th style={{ width: "60px" }}>
                                <input className='plan-table-checkbox' type='checkbox'
                                    checked={selectedRows.length !== 0 && selectedRows.length >= data.length}
                                    onChange={selectAll}
                                />
                            </th>
                            <th>Id</th>
                            <th>Event name</th>
                            <th>Plan name</th>
                            <th>Created at</th>
                            <th>Modified at</th>
                            <th>Host</th>
                            <th style={{ width: "20px" }}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            isLoading ? <></> :
                                data.map((item, index) =>
                                    !item.EventName.includes(searchValue) ? '' :
                                        <tr key={index} className={`plan-table-row ${selectedRows.includes(item.Id) ? 'plan-table-row-active' : ''}`} onClick={() => selectCell(item.Id, !(selectedRows.find(x => x === item.Id) !== undefined))}>
                                            <td>
                                                <input type='checkbox' className='plan-table-checkbox'
                                                    onChange={() => { }}
                                                    checked={selectedRows.find(x => x === item.Id) !== undefined}
                                                />
                                            </td>
                                            <td>{item.Id}</td>
                                            <td>{item.EventName}</td>
                                            <td>{item.PlanName}</td>
                                            <td>{item.CreatedAt}</td>
                                            <td>{item.ModifiedAt}</td>
                                            <td>{item.Host}</td>
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

export default Plan
