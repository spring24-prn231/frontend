import React, { useEffect, useState } from 'react';
import DoneIcon from '@mui/icons-material/Done';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import './StaffPlanEdit.css';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Loading from '../../common/loading/Loading';
import { Link, useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import { useParams } from 'react-router-dom';
import InfoIcon from '@mui/icons-material/Info';
import makeAnimated from 'react-select/animated';
import Select from 'react-select';
import { approvePlan, getPlanById, planAssign, savePlans } from '../../../apis/planService';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import EastIcon from '@mui/icons-material/East';

const animatedComponents = makeAnimated();

const PlanEdit = () => {
    const [oldData, setOldData] = useState(null);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isReload, setIsReload] = useState(false);
    const [isExpandCell, setisExpandCell] = useState(null);
    const [currentPlan, setCurrentPlan] = useState(null);
    const { planId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const getData = async () => {
            setIsLoading(true);
            return await getPlanById(planId).catch(err => {
                var now = new Date();
                now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
                return {
                    'data': [
                        getNewPlan()
                    ]
                };
            })
        };

        getData().then(res => {
            setData(JSON.parse(JSON.stringify(res.data)));
            setOldData(JSON.parse(JSON.stringify(res.data)));
            setIsLoading(false);
        })
    }, [isReload]);

    const getNewPlan = () => {
        var now = new Date();
        now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
        return {
            "orderId": planId,
            "timeStart": now.toISOString().slice(0, 16),
            "timeEnd": now.toISOString().slice(0, 16),
            "description": "",
            "note": "",
            "feedback": "",
            "staffs": [],
            "id": 'newid' + Date.now().toString()
        };
    }


    const onAddNewPlan = () => {
        setData([...data, getNewPlan()]);
    }

    const onContentChange = (e, id) => {
        data.forEach(item => {
            if (item.id === id) {
                item.description = e.target.value;
            }
        });
        setData([...data]);
    }

    const onTimeStartChange = (e, id) => {
        data.forEach(item => {
            if (item.id === id) {
                item.timeStart = e.target.value;
            }
        });
        setData([...data]);
    }

    const onDeletePlan = () => {
        setData(data.filter(x => x.id !== isExpandCell));
    }

    const onTimeEndChange = (e, id) => {
        data.forEach(item => {
            if (item.id === id) {
                item.timeEnd = e.target.value;
            }
        });
        setData([...data]);
    }

    const onClickExpand = (id) => {
        if (id === isExpandCell) {
            setisExpandCell(null);
            setCurrentPlan(null);
        }
        else {
            setisExpandCell(id);
            setCurrentPlan(data.find(x => x.id === id));
        }
    }

    const onNoteChange = (e) => {
        const index = data.findIndex(item => item.id === isExpandCell);
        data[index] = { ...data[index], note: e.target.value };
        setData([...data]);
    }

    const updatePlans = () => {
        const res = savePlans(data, planId).then(res => {
            setIsReload(!isReload);
            toast.success("Cập nhật thành công !!!", {
                position: "bottom-right",
                containerId: "status"
            });
        }).catch(err => {
            toast.error("Cập nhật thất bại, hãy kiểm tra lại các khoảng thời gian !!!", {
                position: "bottom-right",
                containerId: "status"
            });
        });
    }

    return (
        <>
            {
                isLoading ? <Loading /> :
                    <div className='staff-plan-edit-container'>
                        <div className="staff-plan-edit-top-container">
                            <div className="staff-plan-edit-top">
                                <div className="staff-plan-edit-back">
                                    <Link to={`/staff/plan`} style={{ textDecoration: 'none', color: 'black' }}>
                                        <KeyboardBackspaceIcon />
                                    </Link>
                                </div>
                                <div className="plan-event-name-container">
                                    <div className="plan-event-name">
                                        <input spellCheck={false} className='plan-event-name-input'
                                            value={data.name}
                                            disabled
                                        />
                                    </div>
                                </div>

                                {
                                    data.length > 0 && data[0].order !== undefined && data[0].order.executionStatus === 3 ? <div className='plan-approve'>
                                        <BeenhereIcon style={{ marginRight: '4px' }} fontSize='small' />
                                        <span>Đã được duyệt</span>
                                    </div> : ''
                                }

                                <div className='plan-save-button' onClick={updatePlans}>
                                    <DoneIcon style={{ marginRight: '4px' }} fontSize='small' />
                                    <span>Lưu</span>
                                </div>
                                {
                                    JSON.stringify(data) === JSON.stringify(oldData) ? '' :
                                        <div className='plan-discard-button' onClick={() => setData(JSON.parse(JSON.stringify(oldData)))}>
                                            <CloseIcon style={{ marginRight: '4px' }} fontSize='small' />
                                            <span>Loại bỏ</span>
                                        </div>
                                }
                            </div>
                        </div>

                        <div className="staff-plan-edit-bottom">
                            <div className='staff-plan-edit-bottom-left'>
                                {
                                    data.map((item, index) =>
                                        <div style={{ display: 'block' }}>
                                            <div style={{ width: '100%' }}>
                                                <div className="staff-plan-edit-row">
                                                    <div className="staff-plan-edit-row-index">
                                                        <span>{index + 1}</span>
                                                    </div>
                                                    <div className='staff-plan-edit-row-edit'
                                                        style={isExpandCell !== null && isExpandCell === item.id ? { backgroundColor: '#cececf70' } : {}}
                                                    >
                                                        <div className="staff-plan-edit-row-time">
                                                            <input type="datetime-local"
                                                                disabled
                                                                className="staff-plan-edit-row-time-input"
                                                                value={item.timeStart} />
                                                        </div>
                                                        <span style={{ fontWeight: 'bold', fontSize: '15px', marginRight: '30px' }}>
                                                            <EastIcon />
                                                        </span>
                                                        <div className="staff-plan-edit-row-time">
                                                            <input type="datetime-local"
                                                                disabled
                                                                className="staff-plan-edit-row-time-input"
                                                                value={item.timeEnd} />
                                                        </div>
                                                        <span style={{ fontWeight: 'bold', fontSize: '20px', margin: '0px 10px' }}>:</span>
                                                        <div className="staff-plan-edit-row-content">
                                                            <input type="text" spellCheck={false}
                                                                disabled
                                                                style={isExpandCell === null ? { width: '40rem' } : { width: '20rem' }}
                                                                className="staff-plan-edit-row-content-input"
                                                                value={item.description} />
                                                        </div>
                                                        <div className="staff-plan-edit-row-extend" onClick={() => onClickExpand(item.id)}>
                                                            <OpenInNewIcon htmlColor='#EAA636' />
                                                        </div>
                                                    </div>
                                                </div>
                                                {
                                                    index === data.length - 1 ? "" :
                                                        <div className="staff-plan-edit-row-space">
                                                        </div>
                                                }
                                            </div>
                                        </div>
                                    )
                                }
                                < div style={{ float: 'left', marginTop: '50px' }}>
                                    <div style={{ width: '100%' }}>
                                        <div className="staff-plan-edit-row">
                                            <div className="staff-plan-edit-row-index" style={{ cursor: 'pointer' }}
                                                onClick={onAddNewPlan}>
                                                <span>+</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {
                                isExpandCell === null || data.find(x => x.id === isExpandCell) === undefined ? "" :
                                    <div className="staff-plan-edit-bottom-right">
                                        <div className='staff-plan-edit-bottom-right-close'>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <InfoIcon style={{ marginRight: '10px' }} />
                                                <p style={{ marginBottom: '0px' }}> Chi tiết kế hoạch (
                                                    <a href='#' onClick={onDeletePlan}>Xoá</a>
                                                    ) </p>
                                            </div>
                                            <CloseIcon style={{ cursor: 'pointer' }} onClick={() => onClickExpand(null)} />
                                        </div>
                                        <div className="staff-plan-edit-bottom-right-content">
                                            <div className='staff-plan-edit-bottom-right-content-item'>
                                                <span className='staff-plan-edit-bottom-right-content-label'>Thời gian:</span>
                                                <span>
                                                    <input type='datetime-local'
                                                        value={data.find(x => x.id === isExpandCell).timeStart}
                                                        onChange={(e) => onTimeStartChange(e, isExpandCell)}
                                                    />
                                                    <span style={{ padding: '0px 10px', fontWeight: 'bold', fontSize: '20px' }} > - </span>
                                                    <input type='datetime-local'
                                                        value={data.find(x => x.id === isExpandCell).timeEnd}
                                                        onChange={(e) => onTimeEndChange(e, isExpandCell)}
                                                    />
                                                </span>
                                            </div>
                                            <div className='staff-plan-edit-bottom-right-content-item'>
                                                <span className='staff-plan-edit-bottom-right-content-label'>Kế hoạch:</span>
                                                <div style={{ height: '120px', padding: '10px', border: '0.5px solid grey', backgroundColor: 'white' }}>
                                                    <textarea className='staff-plan-edit-text-area'
                                                        style={{ resize: 'none', width: '230px', height: '100px', border: 'none', backgroundColor: '#ffffff00' }}
                                                        onChange={(e) => onContentChange(e, isExpandCell)}
                                                        value={data.find(x => x.id === isExpandCell).description === null ? '' :
                                                            data.find(x => x.id === isExpandCell).description
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <div className='staff-plan-edit-bottom-right-content-item'>
                                                <span className='staff-plan-edit-bottom-right-content-label'>Ghi chú:</span>
                                                <div style={{ height: '120px', padding: '10px', border: '0.5px solid grey', backgroundColor: 'white' }}>
                                                    <textarea className='staff-plan-edit-text-area'
                                                        style={{ resize: 'none', width: '230px', height: '100px', border: 'none', backgroundColor: '#ffffff00' }}
                                                        onChange={(e) => onNoteChange(e)}
                                                        value={data.find(x => x.id === isExpandCell).note === null ? '' :
                                                            data.find(x => x.id === isExpandCell).note
                                                        }
                                                    />
                                                </div>
                                            </div>

                                            <div className='staff-plan-edit-bottom-right-content-item'>
                                                <span className='staff-plan-edit-bottom-right-content-label'>Nhận xét:</span>
                                                <div style={{ height: '120px', padding: '10px', border: '0.5px solid grey', backgroundColor: '#8080801a' }}>
                                                    <textarea style={{ resize: 'none', width: '230px', height: '100px', border: 'none', backgroundColor: '#ffffff00' }} disabled
                                                        value={data.find(x => x.id === isExpandCell).feedback}
                                                    />
                                                </div>
                                            </div>
                                            <div className='staff-plan-edit-bottom-right-content-item'>
                                                <span className='staff-plan-edit-bottom-right-content-label'>Nhân viên thực hiện</span>
                                                <Select
                                                    closeMenuOnSelect={false}
                                                    components={animatedComponents}
                                                    isDisabled={true}
                                                    isMulti
                                                    defaultValue={
                                                        data.find(x => x.id === isExpandCell).staffs.map(x => ({
                                                            value: x.staffId,
                                                            label: x.staffId
                                                        }))
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                            }
                        </div>
                    </div >
            }
        </>
    )
}

export default PlanEdit
