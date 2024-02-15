import React, { useEffect, useState } from 'react';
import DoneIcon from '@mui/icons-material/Done';
import EditIcon from '@mui/icons-material/Edit';
import ReplyIcon from '@mui/icons-material/Reply';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import './PlanEdit.css';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Loading from '../../common/loading/Loading';
import { Link } from 'react-router-dom';
import { getPlanById } from '../../../apis/planService';
import CloseIcon from '@mui/icons-material/Close';
import { useParams } from 'react-router-dom';
import { formatDateTimeString, formatDatetimeLocal } from '../../../utils/TimeFormat';

const PlanEdit = () => {
    const [oldData, setOldData] = useState(null);
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { planId } = useParams();

    useEffect(() => {
        const getData = async () => {
            setIsLoading(true);
            const res = await getPlanById(planId, true);
            return res;
        };

        getData().then(res => {
            if (res === undefined) {
                res = {
                    "Id": planId,
                    "EventName": "",
                    "PlanName": "",
                    "Host": "",
                    "Plan": []
                };
            }
            setData(JSON.parse(JSON.stringify(res)));
            setOldData(JSON.parse(JSON.stringify(res)));
            setIsLoading(false);
        })
    }, []);

    const onAddRow = () => {
        setData({ ...data, Plan: [...data.Plan, { Time: '', Content: '' }] });
    };

    const onDeleteRow = (id) => {
        setData({ ...data, Plan: data.Plan.filter(x => x.Id !== id) });
    };

    const onContentChange = (e, id) => {
        data.Plan.forEach(item => {
            if (item.Id === id) {
                item.Content = e.target.value;
            }
        });
        setData({ ...data });
    }

    const onTimeChange = (e, id) => {
        data.Plan.forEach(item => {
            if (item.Id === id) {
                item.Time = formatDatetimeLocal(e.target.value);
            }
        });
        setData({ ...data });
    }

    return (
        <>
            {
                isLoading || data == null ? <Loading /> :
                    <div className='plan-edit-container'>
                        <div className="plan-edit-top-container">
                            <div className="plan-edit-top">
                                <div className="plan-edit-back">
                                    <Link to={`/manager/plan`} style={{ textDecoration: 'none', color: 'black' }}>
                                        <KeyboardBackspaceIcon />
                                    </Link>
                                </div>
                                <div className="plan-event-name-container">
                                    <div className="plan-event-name">
                                        <input spellCheck={false} className='plan-event-name-input'
                                            value={data.EventName}
                                            onChange={(e) => setData({ ...data, EventName: e.target.value })}
                                        />
                                        <EditIcon />
                                    </div>
                                </div>

                                <div className='plan-save-button'>
                                    <DoneIcon style={{ marginRight: '4px' }} fontSize='small' />
                                    <span>Save</span>
                                </div>
                                {
                                    JSON.stringify(data) === JSON.stringify(oldData) ? '' :
                                        <div className='plan-discard-button' onClick={() => setData(JSON.parse(JSON.stringify(oldData)))}>
                                            <CloseIcon style={{ marginRight: '4px' }} fontSize='small' />
                                            <span>Discard</span>
                                        </div>
                                }
                            </div>
                        </div>

                        <div className="plan-edit-bottom">
                            {
                                data.Plan.map((item, index) =>
                                    <div style={{ float: 'left' }}>
                                        <div style={{ width: '100%' }}>
                                            <div className="plan-edit-row">
                                                <div className="plan-edit-row-index">
                                                    <span>{index + 1}</span>
                                                </div>
                                                <div className="plan-edit-row-time">
                                                    <input type="datetime-local"
                                                        className="plan-edit-row-time-input"
                                                        onChange={(e) => onTimeChange(e, item.Id)}
                                                        value={formatDateTimeString(item.Time)} />
                                                </div>
                                                <span style={{ fontWeight: 'bold', fontSize: '20px', margin: '0px 30px' }}>:</span>
                                                <div className="plan-edit-row-content">
                                                    <input type="text" spellCheck={false}
                                                        className="plan-edit-row-content-input"
                                                        onChange={(e) => onContentChange(e, item.Id)}
                                                        value={item.Content} />
                                                </div>
                                                <div className="plan-row-delete" onClick={() => onDeleteRow(item.Id)}>
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
            }
        </>
    )
}

export default PlanEdit
