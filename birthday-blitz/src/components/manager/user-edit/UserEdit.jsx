import React, { useEffect, useState } from 'react';
import DoneIcon from '@mui/icons-material/Done';
import EditIcon from '@mui/icons-material/Edit';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import './UserEdit.css';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Loading from '../../common/loading/Loading';
import { Link } from 'react-router-dom';
import { getUserById } from '../../../apis/userService';
import CloseIcon from '@mui/icons-material/Close';
import { useParams } from 'react-router-dom';
import { converDateTime, converFormat, formatDateTimeString, formatDatetimeLocal } from '../../../utils/TimeFormat';

const UserEdit = () => {
    const [oldData, setOldData] = useState(null);
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { userId } = useParams();

    useEffect(() => {
        const getData = async () => {
            setIsLoading(true);
            const res = await getUserById(userId, true);
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
                    <div className='user-edit-container'>
                        <div className="user-edit-top-container">
                            <div className="user-edit-top">
                                <div className="user-edit-back">
                                    <Link to={`/manager/user`} style={{ textDecoration: 'none', color: 'black' }}>
                                        <KeyboardBackspaceIcon />
                                    </Link>
                                </div>
                                <div className="user-event-name-container">
                                </div>

                                <div className='user-save-button'>
                                    <DoneIcon style={{ marginRight: '4px' }} fontSize='small' />
                                    <span>Save</span>
                                </div>
                                {
                                    JSON.stringify(data) === JSON.stringify(oldData) ? '' :
                                        <div className='user-discard-button' onClick={() => setData(JSON.parse(JSON.stringify(oldData)))}>
                                            <CloseIcon style={{ marginRight: '4px' }} fontSize='small' />
                                            <span>Discard</span>
                                        </div>
                                }
                            </div>
                        </div>

                        <div className="user-edit-bottom">
                            <div style={{ float: 'left' }}>
                                <div style={{ width: '100%' }}>
                                    <div className="user-edit-row">
                                        <div className="user-edit-row-index">
                                            <span><KeyboardArrowDownIcon fontSize='small' /></span>
                                        </div>
                                        <span className='user-edit-row-label'>
                                            Full name:
                                        </span>
                                        <div className="user-edit-row-content">
                                            <input type="text" spellCheck={false}
                                                placeholder='Full name'
                                                value={data.FullName}
                                                onChange={(e) => setData({ ...data, FullName: e.target.value })}
                                                className="user-edit-row-content-input"
                                            />
                                        </div>
                                    </div>

                                    <div className="user-edit-row-space"></div>

                                    <div className="user-edit-row">
                                        <div className="user-edit-row-index">
                                            <span><KeyboardArrowDownIcon fontSize='small' /></span>
                                        </div>
                                        <span className='user-edit-row-label'>
                                            Phone number:
                                        </span>
                                        <div className="user-edit-row-content">
                                            <input type="text" spellCheck={false}
                                                placeholder='Phone number'
                                                value={data.PhoneNumber}
                                                onChange={(e) => setData({ ...data, PhoneNumber: e.target.value })}
                                                className="user-edit-row-content-input"
                                            />
                                        </div>
                                    </div>

                                    <div className="user-edit-row-space"></div>

                                    <div className="user-edit-row">
                                        <div className="user-edit-row-index">
                                            <span><KeyboardArrowDownIcon fontSize='small' /></span>
                                        </div>
                                        <span className='user-edit-row-label'>
                                            Email:
                                        </span>
                                        <div className="user-edit-row-content">
                                            <input type="email" spellCheck={false}
                                                placeholder='Email'
                                                value={data.Email}
                                                onChange={(e) => setData({ ...data, Email: e.target.value })}
                                                className="user-edit-row-content-input"
                                            />
                                        </div>
                                    </div>

                                    <div className="user-edit-row-space"></div>

                                    <div className="user-edit-row">
                                        <div className="user-edit-row-index">
                                            <span><KeyboardArrowDownIcon fontSize='small' /></span>
                                        </div>
                                        <span className='user-edit-row-label'>
                                            Birthday:
                                        </span>
                                        <div className="user-edit-row-content">
                                            <input type="date" spellCheck={false}
                                                placeholder='Birthday'
                                                className="user-edit-row-content-input"
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

export default UserEdit;
