import React, { useEffect, useState } from 'react';
import DoneIcon from '@mui/icons-material/Done';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import './PlanEdit.css';
import Select from 'react-select';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Loading from '../../common/loading/Loading';
import { Link, useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import { useParams } from 'react-router-dom';
import { formatDateTimeString, formatDatetimeLocal } from '../../../utils/TimeFormat';
import InfoIcon from '@mui/icons-material/Info';
import makeAnimated from 'react-select/animated';
import { approvePlan, getPlanById, planAssign, savePlans } from '../../../apis/planService';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { getAllStaff } from '../../../apis/staffService';

const animatedComponents = makeAnimated();

const PlanEdit = () => {
    const [oldData, setOldData] = useState(null);
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isReload, setIsReload] = useState(false);
    const [isExpandCell, setisExpandCell] = useState(null);
    const [staffs, setStaffs] = useState([]);
    const [currentStaffs, setCurrentStaffs] = useState([]);
    const { planId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const getData = async () => {
            setIsLoading(true);
            const res = await getPlanById(planId);
            const staffList = await getAllStaff(false, false);
            return { res, staffList };
        };

        getData().then(({ res, staffList }) => {
            setStaffs(staffList.data);
            setData(JSON.parse(JSON.stringify(res.data)));
            setOldData(JSON.parse(JSON.stringify(res.data)));
            setIsLoading(false);
        })
    }, [isReload]);

    const onContentChange = (e, id) => {
        data.partyPlans.forEach(item => {
            if (item.id === id) {
                item.description = e.target.value;
            }
        });
        setData({ ...data });
    }

    const onTimeChange = (e, id) => {
        data.partyPlans.forEach(item => {
            if (item.id === id) {
                item.timeStart = formatDatetimeLocal(e.target.value);
            }
        });
        setData({ ...data });
    }

    const onClickExpand = (id) => {
        if (id === isExpandCell) {
            setisExpandCell(null);
            setCurrentStaffs([]);
        }
        else {
            setisExpandCell(id);
            setCurrentStaffs(data.find(x => x.id === id).staffs.map(y => y.staffId));
        }
    }

    const onFeedbackChange = (e) => {
        const index = data.findIndex(item => item.id === isExpandCell);
        data[index] = { ...data[index], feedback: e.target.value };
        setData([...data]);
    }

    const updatePlans = () => {
        const res = savePlans(data).then(res => {
            setIsReload(!isReload);
            toast.success("Cập nhật thành công !!!", {
                position: "bottom-right",
                containerId: "status"
            });
        }).catch(err => {
            toast.error("Cập nhật thất bại, hãy thử lại !!!", {
                position: "bottom-right",
                containerId: "status"
            });
        });
    }

    const onApprovePlan = (id) => {
        const res = approvePlan(id).then(res => {
            toast.success("Duyệt thành công !!!", {
                position: "bottom-right",
                containerId: "status"
            });
            setIsReload(!isReload);
        }).catch(err => {
            toast.error("Duyệt thất bại, hãy thử lại !!!", {
                position: "bottom-right",
                containerId: "status"
            });
        });
    }

    const onAssign = () => {
        const res = planAssign(isExpandCell, currentStaffs).then(res => {
            setIsReload(!isReload);
            toast.success("Giao quyền thành công !!!", {
                position: "bottom-right",
                containerId: "status"
            });
        }).catch(err => {
            toast.error("Giao quyền thất bại, hãy thử lại !!!", {
                position: "bottom-right",
                containerId: "status"
            });
        });
    }

    const onEmptyPlan = () => {
        toast.error("Đơn hàng này chưa có bản kế hoạch !!!", {
            position: "top-center",
            containerId: "warning"
        });
        setTimeout(() => {
            navigate("/manager/plan");
        }, 1000);
    }

    return (
        <>
            {
                isLoading || data === null ? <Loading /> :
                data !== null && data.length === 0 ? onEmptyPlan() : 
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
                                            value={data.name}
                                            disabled
                                        />
                                    </div>
                                </div>

                                {
                                    data[0].order.executionStatus === 3 ? <div className='plan-approve'>
                                        <BeenhereIcon style={{ marginRight: '4px' }} fontSize='small' />
                                        <span>Đã được duyệt</span>
                                    </div> :
                                        <div className='plan-approve-button' onClick={() => onApprovePlan(planId)}>
                                            <BeenhereIcon style={{ marginRight: '4px' }} fontSize='small' />
                                            <span>Duyệt</span>
                                        </div>
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

                        <div className="plan-edit-bottom">
                            <div className='plan-edit-bottom-left'>
                                {
                                    data.map((item, index) =>
                                        <div style={{ float: 'left' }}>
                                            <div style={{ width: '100%' }}>
                                                <div className="plan-edit-row">
                                                    <div className="plan-edit-row-index">
                                                        <span>{index + 1}</span>
                                                    </div>
                                                    <div className='plan-edit-row-edit'
                                                        style={isExpandCell !== null && isExpandCell === item.id ? { backgroundColor: '#cececf70' } : {}}
                                                    >
                                                        <div className="plan-edit-row-time">
                                                            <input type="datetime-local"
                                                                disabled
                                                                className="plan-edit-row-time-input"
                                                                onChange={(e) => onTimeChange(e, item.id)}
                                                                value={formatDateTimeString(item.timeStart)} />
                                                        </div>
                                                        <span style={{ fontWeight: 'bold', fontSize: '20px', margin: '0px 10px' }}>:</span>
                                                        <div className="plan-edit-row-content">
                                                            <input type="text" spellCheck={false}
                                                                disabled
                                                                style={isExpandCell === null ? { width: '40rem' } : { width: '20rem' }}
                                                                className="plan-edit-row-content-input"
                                                                onChange={(e) => onContentChange(e, item.id)}
                                                                value={item.description} />
                                                        </div>
                                                        <div className="plan-edit-row-extend" onClick={() => onClickExpand(item.id)}>
                                                            <OpenInNewIcon htmlColor='#EAA636' />
                                                        </div>
                                                    </div>
                                                </div>
                                                {
                                                    index === data.length - 1 ? "" :
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
                                                <span>{data.find(x => x.id === isExpandCell).timeStart}</span>
                                            </div>
                                            <div className='plan-edit-bottom-right-content-item'>
                                                <span className='plan-edit-bottom-right-content-label'>Kế hoạch:</span>
                                                <span>{data.find(x => x.id === isExpandCell).description}</span>
                                            </div>
                                            <div className='plan-edit-bottom-right-content-item'>
                                                <span className='plan-edit-bottom-right-content-label'>Ghi chú:</span>
                                                <div style={{ height: '120px', padding: '10px', border: '0.5px solid grey', backgroundColor: '#8080801a' }}>
                                                    <textarea style={{ resize: 'none', width: '230px', height: '100px', border: 'none', backgroundColor: '#ffffff00' }} disabled>
                                                        {data.find(x => x.id === isExpandCell).note}
                                                    </textarea>
                                                </div>
                                            </div>
                                            <div className='plan-edit-bottom-right-content-item'>
                                                <span className='plan-edit-bottom-right-content-label'>Phân công:</span>
                                                <div className='plan-edit-assign'>
                                                    <div style={{ flex: '5', marginRight: '10px' }}>
                                                        <Select
                                                            closeMenuOnSelect={false}
                                                            components={animatedComponents}
                                                            isMulti
                                                            onChange={(e) => setCurrentStaffs(e.map(x => x.value))}
                                                            options={
                                                                staffs.map(item => ({
                                                                    value: item.id,
                                                                    label: item.fullname
                                                                }))
                                                            }
                                                            defaultValue={
                                                                data.find(x => x.id === isExpandCell).staffs.map(x => ({
                                                                    value: x.staffId,
                                                                    label: staffs.find(y => y.id === x.staffId).fullname
                                                                }))
                                                            }
                                                        />
                                                    </div>
                                                    {
                                                        JSON.stringify(currentStaffs) === JSON.stringify(data.find(x => x.id === isExpandCell).staffs.map(x => x.staffId)) ? '' :
                                                            <div>
                                                                <div style={{ flex: '1' }} onClick={onAssign} className='plan-save-button'>Giao</div>
                                                            </div>
                                                    }
                                                </div>
                                            </div>
                                            <div className='plan-edit-bottom-right-content-item'>
                                                <span className='plan-edit-bottom-right-content-label'>Nhận xét:</span>
                                                <div style={{ height: '120px', padding: '10px', border: '0.5px solid grey', backgroundColor: 'white' }}>
                                                    <textarea className='plan-edit-text-area'
                                                        style={{ resize: 'none', width: '230px', height: '100px', border: 'none', backgroundColor: '#ffffff00' }}
                                                        onChange={(e) => onFeedbackChange(e)}
                                                        value={data.find(x => x.id === isExpandCell).feedback === null ? '' :
                                                            data.find(x => x.id === isExpandCell).feedback
                                                        }
                                                    />
                                                </div>
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
