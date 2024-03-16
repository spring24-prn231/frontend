import React, { useEffect, useState } from 'react';
import DoneIcon from '@mui/icons-material/Done';
import './StaffEdit.css';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Loading from '../../common/loading/Loading';
import { Link } from 'react-router-dom';
import { getStaffById } from '../../../apis/staffService';
import CloseIcon from '@mui/icons-material/Close';
import { useParams } from 'react-router-dom';
import { converDateTime, converFormat, formatDateTimeString, formatDatetimeLocal } from '../../../utils/TimeFormat';

const StaffEdit = () => {
    const [oldData, setOldData] = useState(null);
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { staffId } = useParams();

    useEffect(() => {
        const getData = async () => {
            setIsLoading(true);
            const res = await getStaffById(staffId, true);
            return res;
        };

        getData().then(res => {
            if (res === undefined) {
                res = {
                    "FullName": "",
                    "PhoneNumber": "",
                    "Birthday": "",
                    "Email": ""
                };
            }
            setData(JSON.parse(JSON.stringify(res)));
            setOldData(JSON.parse(JSON.stringify(res)));
            setIsLoading(false);
        })
    }, []);

    return (
        <>
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

                                <div className='staff-save-button'>
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
                                                placeholder='Full name'
                                                value={data.FullName}
                                                onChange={(e) => setData({ ...data, FullName: e.target.value })}
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
                                            <input type="text" spellCheck={false}
                                                placeholder='Phone number'
                                                value={data.PhoneNumber}
                                                onChange={(e) => setData({ ...data, PhoneNumber: e.target.value })}
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
                                                value={data.Email}
                                                onChange={(e) => setData({ ...data, Email: e.target.value })}
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
                                            Ngày sinh:
                                        </span>
                                        <div className="staff-edit-row-content">
                                            <input type="date" spellCheck={false}
                                                placeholder='Birthday'
                                                className="staff-edit-row-content-input"
                                                onChange={(e) => setData({ ...data, Birthday: converFormat(e.target.value) })}
                                                value={converDateTime(data.Birthday)}
                                            />
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
