import React, { useEffect, useState } from 'react';
import DoneIcon from '@mui/icons-material/Done';
import './StaffEdit.css';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Loading from '../../common/loading/Loading';
import { Link } from 'react-router-dom';
import { createStaff, getStaffById, updateStaff } from '../../../apis/staffService';
import CloseIcon from '@mui/icons-material/Close';
import Select from 'react-select';
import { useParams, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const StaffEdit = () => {
    const [oldData, setOldData] = useState(null);
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isReload, setIsReload] = useState(false);
    const { staffId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const getData = async () => {
            setIsLoading(true);
            if (staffId !== 'addnew') {
                const res = await getStaffById(staffId);
                return res;
            }
            else {
                return {
                    "data": [
                        {
                            "userName": "",
                            "fullname": "",
                            "phoneNumber": "",
                            "role": "HOST_STAFF",
                            "email": "",
                            "password": "Loc@12345"
                        }
                    ]
                };
            }
        };

        getData().then(res => {
            setData(JSON.parse(JSON.stringify(res.data[0])));
            setOldData(JSON.parse(JSON.stringify(res.data[0])));
            setIsLoading(false);
        })
    }, []);

    const onUpdateStaff = () => {
        if (staffId === 'addnew') {
            createStaff(data).then(res => {
                toast.success("Tạo mới thành công !!!", {
                    position: "bottom-right"
                });
                setIsReload(!isReload);
                setTimeout(() => {
                    navigate("/manager/staff")
                }, 1000);
            }).catch(err => {
                toast.error("Tạo mới thất bại, hãy thử lại !!!", {
                    position: "bottom-right"
                });
                setIsReload(!isReload);
            });
        }
        else {
            updateStaff(data).then(res => {
                toast.success("Cập nhật thành công !!!", {
                    position: "bottom-right"
                });
                setIsReload(!isReload);
            }).catch(err => {
                toast.error("Cập nhật thất bại, hãy thử lại !!!", {
                    position: "bottom-right"
                });
                setIsReload(!isReload);
            });
        }
    }

    return (
        <>
            <ToastContainer />
            {
                isLoading || data == null ? <Loading /> :
                    <div className='staff-edit-container'>
                        <div className="staff-edit-top-container">
                            <div className="staff-edit-top">
                                <div className="staff-edit-back">
                                    <Link to={`/manager/staff`} style={{ textDecoration: 'none', color: 'black' }}>
                                        <KeyboardBackspaceIcon />
                                    </Link>
                                </div>
                                <div className="staff-event-name-container">
                                </div>

                                <div className='staff-save-button' onClick={onUpdateStaff}>
                                    <DoneIcon style={{ marginRight: '4px' }} fontSize='small' />
                                    <span>Lưu</span>
                                </div>
                                {
                                    JSON.stringify(data) === JSON.stringify(oldData) ? '' :
                                        <div className='staff-discard-button' onClick={() => setData(JSON.parse(JSON.stringify(oldData)))}>
                                            <CloseIcon style={{ marginRight: '4px' }} fontSize='small' />
                                            <span>Loại bỏ</span>
                                        </div>
                                }
                            </div>
                        </div>

                        <div className="staff-edit-bottom">
                            <div style={{ float: 'left' }}>
                                <div style={{ width: '100%' }}>
                                    <div className="staff-edit-row">
                                        <div className="staff-edit-row-index">
                                            <span><KeyboardArrowDownIcon fontSize='small' /></span>
                                        </div>
                                        <span className='staff-edit-row-label'>
                                            Họ và tên:
                                        </span>
                                        <div className="staff-edit-row-content">
                                            <input type="text" spellCheck={false}
                                                placeholder='Họ và tên'
                                                value={data.fullname}
                                                onChange={(e) => setData({ ...data, fullname: e.target.value })}
                                                className="staff-edit-row-content-input"
                                            />
                                        </div>
                                    </div>

                                    <div className="staff-edit-row-space"></div>

                                    <div className="staff-edit-row">
                                        <div className="staff-edit-row-index">
                                            <span><KeyboardArrowDownIcon fontSize='small' /></span>
                                        </div>
                                        <span className='staff-edit-row-label'>
                                            Số điện thoại:
                                        </span>
                                        <div className="staff-edit-row-content">
                                            <input type="number" spellCheck={false}
                                                placeholder='Số điện thoại'
                                                value={data.phoneNumber}
                                                onChange={(e) => setData({ ...data, phoneNumber: e.target.value })}
                                                className="staff-edit-row-content-input"
                                            />
                                        </div>
                                    </div>

                                    <div className="staff-edit-row-space"></div>

                                    <div className="staff-edit-row">
                                        <div className="staff-edit-row-index">
                                            <span><KeyboardArrowDownIcon fontSize='small' /></span>
                                        </div>
                                        <span className='staff-edit-row-label'>
                                            Email:
                                        </span>
                                        <div className="staff-edit-row-content">
                                            <input type="email" spellCheck={false}
                                                placeholder='Email'
                                                value={data.email}
                                                onChange={(e) => setData({ ...data, email: e.target.value })}
                                                className="staff-edit-row-content-input"
                                            />
                                        </div>
                                    </div>

                                    <div className="staff-edit-row-space"></div>

                                    <div className="staff-edit-row">
                                        <div className="staff-edit-row-index">
                                            <span><KeyboardArrowDownIcon fontSize='small' /></span>
                                        </div>
                                        <span className='staff-edit-row-label'>
                                            Tên đăng nhập:
                                        </span>
                                        <div className="staff-edit-row-content">
                                            <input type="text" spellCheck={false}
                                                placeholder='Tên đăng nhập'
                                                value={data.userName}
                                                disabled={staffId !== 'addnew'}
                                                onChange={(e) => setData({ ...data, userName: e.target.value })}
                                                className="staff-edit-row-content-input"
                                            />
                                        </div>
                                    </div>

                                    <div className="staff-edit-row-space"></div>

                                    <div className="staff-edit-row">
                                        <div className="staff-edit-row-index">
                                            <span><KeyboardArrowDownIcon fontSize='small' /></span>
                                        </div>
                                        <span className='staff-edit-row-label'>
                                            Vai trò:
                                        </span>
                                        <div className='staff-edit-row-content'>
                                            <div>
                                                <Select
                                                    options={[{
                                                        value: 'HOST_STAFF',
                                                        label: 'HOST_STAFF'
                                                    },
                                                    {
                                                        value: 'IMPLEMENT_STAFF',
                                                        label: 'IMPLEMENT_STAFF'
                                                    }
                                                    ]}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </>
    )
}

export default StaffEdit;
