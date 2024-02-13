import React, { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import './Plan.css';
import { Link } from 'react-router-dom';

const Plan = () => {
    const [data, setData] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]);
    const [selectedRows, setSelectedRows] = useState([]);

    useEffect(() => {
        window.addEventListener('click', function (e) {
            var element = this.document.getElementsByClassName('plan-popup')[0];
            if (element !== undefined) {
                if (!element.contains(e.target)) {
                    element.style.display = 'none';
                }
            }
        });
    }, []);

    const selectAll = () => {
        if (selectedRows.length === data.length) {
            setSelectedRows([]);
        }
        else {
            setSelectedRows([...Array(data.length).keys()]);
        }
    }

    const selectCell = (index, value) => {
        if (value === false) {
            setSelectedRows(selectedRows.filter(x => x !== index));
        }
        else {
            setSelectedRows([...selectedRows, index]);
        }
    }

    const chooseOption = (event) => {
        event.stopPropagation();
        var element = event.target;
        var rect = element.getBoundingClientRect();
        let planPopup = document.getElementsByClassName('plan-popup');
        planPopup[0].style.display = "block";
        planPopup[0].style.top = `${rect.top - 45}px`;
        planPopup[0].style.left = `${rect.left - 140}px`;
    }

    return (
        <div className='plan-center-container'>
            <div className='plan-popup'>
                <Link to={`${123}`} style={{textDecoration: 'none', color: 'black'}}>
                    <div className="plan-popup-option">
                        <EditIcon fontSize='small' style={{ marginRight: "10px" }} />
                        <span>Edit</span>
                    </div>
                </Link>
            </div>

            <div className='plan-center-top'>
                <div className="plan-search-bar-container">
                    <div className='plan-add-new'>
                        <AddIcon />
                        <span>Add new</span>
                    </div>
                    <div className="plan-search-bar">
                        <SearchIcon htmlColor='grey' />
                        <input className='plan-search-bar-input' placeholder='Search by name' />
                    </div>
                </div>
                {
                    selectedRows.length > 0 ? <div className='plan-delete'>
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
                                    checked={selectedRows.length >= data.length}
                                    onChange={selectAll}
                                />
                            </th>
                            <th>ID</th>
                            <th>Event name</th>
                            <th>Created at</th>
                            <th>Host</th>
                            <th>Host</th>
                            <th>Host</th>
                            <th>Host</th>
                            <th style={{ width: "20px" }}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((x, index) =>
                                <tr key={index} className='plan-table-row' onClick={() => selectCell(index, !(selectedRows.find(x => x === index) !== undefined))}>
                                    <td>
                                        <input type='checkbox' className='plan-table-checkbox'
                                            onChange={() => selectCell(index, !(selectedRows.find(x => x === index) !== undefined))}
                                            checked={selectedRows.find(x => x === index) !== undefined}
                                        />
                                    </td>
                                    <td>{x}</td>
                                    <td>dasx</td>
                                    <td>dasx</td>
                                    <td>dasx</td>
                                    <td>dasx</td>
                                    <td>dasx</td>
                                    <td>dasx</td>
                                    <td><MoreVertIcon className='plan-option' onClick={chooseOption} /></td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Plan
