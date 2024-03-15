import React, { useEffect, useState } from 'react';
import DoneIcon from '@mui/icons-material/Done';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import './PlanEdit.css';
import Select from 'react-select';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Loading from '../../common/loading/Loading';
import { Link } from 'react-router-dom';
import { getPlanById } from '../../../apis/planService';
import CloseIcon from '@mui/icons-material/Close';
import { useParams } from 'react-router-dom';
import { formatDateTimeString, formatDatetimeLocal } from '../../../utils/TimeFormat';
import InfoIcon from '@mui/icons-material/Info';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

const PlanEdit = () => {
    const [oldData, setOldData] = useState(null);
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isExpandCell, setisExpandCell] = useState(null);
    const { planId } = useParams();

    useEffect(() => {
        const getData = async () => {
            setIsLoading(true);
            const res = await getPlanById(planId, true);
            return res;
        };

        getData().then((res) => {
            if (res === undefined) {
                res = {
                    "Id": planId,
                    "EventName": "",
                    "PlanName": `#Kế hoạch ${planId} cho sự kiện`,
                    "Host": "",
                    "Plan": [
                        {
                            "Time": '',
                            "Content": '',
                        },
                        {
                            "Time": '',
                            "Content": '',
                        },
                        {
                            "Time": '',
                            "Content": '',
                        }
                    ]
                };
            }
            setData(JSON.parse(JSON.stringify(res)));
            setOldData(JSON.parse(JSON.stringify(res)));
            setIsLoading(false);
        })
    }, []);

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

    const onClickExpand = (id) => {
        setisExpandCell(id === isExpandCell ? null : id);
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
                                            value={data.PlanName}
                                            disabled
                                            onChange={(e) => setData({ ...data, PlanName: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className='plan-approve-button'>
                                    <BeenhereIcon style={{ marginRight: '4px' }} fontSize='small' />
                                    <span>Duyệt</span>
                                </div>

                                <div className='plan-save-button'>
                                    <DoneIcon style={{ marginRight: '4px' }} fontSize='small' />
                                    <span>Lưu</span>
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
                            <div className='plan-edit-bottom-left'>
                                {
                                    data.Plan.map((item, index) =>
                                        <div style={{ float: 'left' }}>
                                            <div style={{ width: '100%' }}>
                                                <div className="plan-edit-row">
                                                    <div className="plan-edit-row-index">
                                                        <span>{index + 1}</span>
                                                    </div>
                                                    <div className='plan-edit-row-edit'
                                                        style={isExpandCell !== null && isExpandCell === item.Id ? { backgroundColor: '#cececf70' } : {}}
                                                    >
                                                        <div className="plan-edit-row-time">
                                                            <input type="datetime-local"
                                                                disabled
                                                                className="plan-edit-row-time-input"
                                                                onChange={(e) => onTimeChange(e, item.Id)}
                                                                value={formatDateTimeString(item.Time)} />
                                                        </div>
                                                        <span style={{ fontWeight: 'bold', fontSize: '20px', margin: '0px 10px' }}>:</span>
                                                        <div className="plan-edit-row-content">
                                                            <input type="text" spellCheck={false}
                                                                disabled
                                                                style={isExpandCell === null ? { width: '40rem' } : { width: '20rem' }}
                                                                className="plan-edit-row-content-input"
                                                                onChange={(e) => onContentChange(e, item.Id)}
                                                                value={item.Content} />
                                                        </div>
                                                        <div className="plan-edit-row-extend" onClick={() => onClickExpand(item.Id)}>
                                                            <OpenInNewIcon htmlColor='#EAA636' />
                                                        </div>
                                                    </div>
                                                </div>
                                                {
                                                    index === data.Plan.length - 1 ? "" :
                                                        <div className="plan-edit-row-space">
                                                        </div>
                                                }
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                            {
                                isExpandCell === null ? "" :
                                    <div className="plan-edit-bottom-right">
                                        <div className='plan-edit-bottom-right-close'>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <InfoIcon style={{ marginRight: '10px' }} />
                                                <p style={{ marginBottom: '0px' }}> Chi tiết kế hoạch </p>
                                            </div>
                                            <CloseIcon style={{ cursor: 'pointer' }} onClick={() => onClickExpand(null)} />
                                        </div>
                                        <div className="plan-edit-bottom-right-content">
                                            <div className='plan-edit-bottom-right-content-item'>
                                                <span className='plan-edit-bottom-right-content-label'>Thời gian:</span>
                                                <span>{data.Plan.find(x => x.Id === isExpandCell).Time}</span>
                                            </div>
                                            <div className='plan-edit-bottom-right-content-item'>
                                                <span className='plan-edit-bottom-right-content-label'>Kế hoạch:</span>
                                                <span>{data.Plan.find(x => x.Id === isExpandCell).Content}</span>
                                            </div>
                                            <div className='plan-edit-bottom-right-content-item'>
                                                <span className='plan-edit-bottom-right-content-label'>Ghi chú:</span>
                                                <div style={{ height: '120px', padding: '10px', border: '0.5px solid grey', backgroundColor: '#8080801a' }}>
                                                    <textarea style={{ resize: 'none', width: '230px', height: '100px', border: 'none', backgroundColor: '#ffffff00' }} disabled>
                                                        {data.Plan.find(x => x.Id === isExpandCell).Note}
                                                    </textarea>
                                                </div>
                                            </div>
                                            <div className='plan-edit-bottom-right-content-item'>
                                                <span className='plan-edit-bottom-right-content-label'>Phân công:</span>
                                                <div style={{ width: '250px', zIndex: '9999' }}>
                                                    <Select
                                                        closeMenuOnSelect={false}
                                                        components={animatedComponents}
                                                        isMulti
                                                        options={[
                                                            { value: '1', label: 'Đạt' },
                                                            { value: '2', label: 'Duy' },
                                                            { value: '3', label: 'Khanh' },
                                                            { value: '4', label: 'Tân' },
                                                        ]}
                                                    />
                                                </div>
                                            </div>
                                            <div className='plan-edit-bottom-right-content-item'>
                                                <span className='plan-edit-bottom-right-content-label'>Nhận xét:</span>
                                                <div style={{ height: '120px', padding: '10px', border: '0.5px solid grey', backgroundColor: 'white' }}>
                                                    <textarea className='plan-edit-text-area' style={{ resize: 'none', width: '230px', height: '100px', border: 'none', backgroundColor: '#ffffff00' }}>
                                                        {data.Plan.find(x => x.Id === isExpandCell).Feedback}
                                                    </textarea>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                            }
                        </div>
                    </div>
            }
        </>
    )
}

export default PlanEdit
