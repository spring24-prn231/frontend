import React, { useEffect, useState } from 'react';
import DoneIcon from '@mui/icons-material/Done';
import EditIcon from '@mui/icons-material/Edit';
import ReplyIcon from '@mui/icons-material/Reply';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import './PlanEdit.css';
import { Link } from 'react-router-dom';

const PlanEdit = () => {
    const [data, setData] = useState([1, 2, 3]);

    useEffect(() => {
    }, []);

    const onAddRow = () => {
        setData([...data, data.length > 0 ? Math.max(...data) + 1 : 1]);
    };

    const onDeleteRow = (value) => {
        setData(data.filter(x => x !== value));
    };

    return (
        <div className='plan-edit-container'>
            <div className="plan-edit-top-container">
                <div className="plan-edit-top">
                    <div className="plan-edit-back">
                        <Link to={`/manager/plan`} style={{ textDecoration: 'none', color: 'black' }}>
                            <ReplyIcon />
                        </Link>
                    </div>
                    <div className="plan-event-name-container">
                        <div className="plan-event-name">
                            <input spellCheck={false} className='plan-event-name-input' value="Sự kiện sinh nhật cho bé Nguyễn Văn A" />
                            <EditIcon />
                        </div>
                    </div>

                    <div className='plan-save-button'>
                        <DoneIcon style={{ marginRight: '4px' }} fontSize='small' />
                        <span>Save</span>
                    </div>
                </div>
            </div>

            <div className="plan-edit-bottom">
                {
                    data.map((x, index) =>
                        <div style={{ float: 'left' }}>
                            <div style={{ width: '100%' }}>
                                <div className="plan-edit-row">
                                    <div className="plan-edit-row-index">
                                        <span>{index + 1}</span>
                                    </div>
                                    <div className="plan-edit-row-time">
                                        <input type="datetime-local" className="plan-edit-row-time-input" />
                                    </div>
                                    <span style={{ fontWeight: 'bold', fontSize: '20px', margin: '0px 30px' }}>:</span>
                                    <div className="plan-edit-row-content">
                                        <input type="text" spellCheck={false} className="plan-edit-row-content-input" />
                                    </div>
                                    <div className="plan-row-delete" onClick={() => onDeleteRow(x)}>
                                        <RemoveCircleOutlineIcon htmlColor='red' />
                                    </div>
                                </div>
                                <div className="plan-edit-row-space">
                                </div>
                            </div>
                        </div>
                    )
                }
                <div style={{ width: '100%', justifyContent: 'left', display: 'flex' }}>
                    <div className="plan-edit-row-index plan-edit-row-add"
                        style={{ cursor: 'pointer' }}
                        onClick={onAddRow}
                    >
                        <span>+</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlanEdit
