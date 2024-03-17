import React, { useEffect, useState } from 'react';
import DoneIcon from '@mui/icons-material/Done';
import './RoomEdit.css';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Loading from '../../common/loading/Loading';
import { Link } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import { useParams, useNavigate } from 'react-router-dom';
import { createRoom, getRoomById, updateRoom } from '../../../apis/roomService';
import { getAllRoomType } from '../../../apis/roomTypeService';
import Select from 'react-select';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const RoomEdit = () => {
    const [oldData, setOldData] = useState(null);
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [roomType, setRoomType] = useState([]);
    const { roomId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const getData = async () => {
            setIsLoading(true);
            const res = await getRoomById(roomId, false).catch(err => {
                return {
                    "data": [
                        {
                            "id": roomId,
                            "code": "",
                            "capacity": "",
                            "roomType": "",
                        }
                    ]
                };

            });
            const roomTypes = await getAllRoomType(false);
            return { res, roomTypes };
        };

        getData().then(({ res, roomTypes }) => {
            setData(JSON.parse(JSON.stringify(res.data[0])));
            setOldData(JSON.parse(JSON.stringify(res.data[0])));
            setRoomType(JSON.parse(JSON.stringify(roomTypes.data)));
            setIsLoading(false);
        })
    }, []);

    const onSaveRoom = () => {
        if (data.id === 'addnew') {
            const res = createRoom(data).then(res => {
                toast.success("Thêm mới thành công !!!", {
                    position: "bottom-right"
                });
                setTimeout(() => {
                    navigate('/manager/room');
                }, 1000);
            }).catch(err => {
                toast.error("Thêm mới thất bại, hãy thử lại !!!", {
                    position: "bottom-right"
                });
            });
        }
        else {
            const res = updateRoom(data).then(res => {
                toast.success("Cập nhật thành công !!!", {
                    position: "bottom-right"
                });
            }).catch(err => {
                toast.error("Cập nhật thất bại, hãy thử lại !!!", {
                    position: "bottom-right"
                });
            });
        }
    }

    return (
        <>
            <ToastContainer />
            {
                isLoading || data == null ? <Loading /> :
                    <div className='room-edit-container'>
                        <div className="room-edit-top-container">
                            <div className="room-edit-top">
                                <div className="room-edit-back">
                                    <Link to={`/manager/room`} style={{ textDecoration: 'none', color: 'black' }}>
                                        <KeyboardBackspaceIcon />
                                    </Link>
                                </div>
                                <div className="feedback-event-name-container">
                                </div>

                                <div className='room-edit-save-button' onClick={onSaveRoom}>
                                    <DoneIcon style={{ marginRight: '4px' }} fontSize='small' />
                                    <span>Lưu</span>
                                </div>
                                {
                                    JSON.stringify(data) === JSON.stringify(oldData) ? '' :
                                        <div className='feedback-discard-button' onClick={() => setData(JSON.parse(JSON.stringify(oldData)))}>
                                            <CloseIcon style={{ marginRight: '4px' }} fontSize='small' />
                                            <span>Loại bỏ</span>
                                        </div>
                                }
                            </div>
                        </div>

                        <div className="room-edit-bottom">
                            <div style={{ float: 'left' }}>
                                <div style={{ width: '100%' }}>
                                    <div className="room-edit-row">
                                        <div className="room-edit-row-index">
                                            <span><KeyboardArrowDownIcon fontSize='small' /></span>
                                        </div>
                                        <span className='room-edit-row-label'>
                                            Mã phòng:
                                        </span>
                                        <div className="room-edit-row-content">
                                            <input type="number" spellCheck={false}
                                                placeholder='Mã phòng'
                                                value={data.roomNo}
                                                onChange={(e) => setData({ ...data, roomNo: e.target.value })}
                                                className="room-edit-row-content-input"
                                            />
                                        </div>
                                    </div>

                                    <div className="room-edit-row-space"></div>

                                    <div className="room-edit-row">
                                        <div className="room-edit-row-index">
                                            <span><KeyboardArrowDownIcon fontSize='small' /></span>
                                        </div>
                                        <span className='room-edit-row-label'>
                                            Sức chứa:
                                        </span>
                                        <div className="room-edit-row-content">
                                            <input type="number" spellCheck={false}
                                                placeholder='Sức chứa'
                                                value={data.capacity}
                                                onChange={(e) => setData({ ...data, capacity: e.target.value })}
                                                className="room-edit-row-content-input"
                                            />
                                        </div>
                                    </div>

                                    <div className="room-edit-row-space"></div>

                                    <div className="room-edit-row">
                                        <div className="room-edit-row-index">
                                            <span><KeyboardArrowDownIcon fontSize='small' /></span>
                                        </div>
                                        <span className='room-edit-row-label'>
                                            Loại phòng
                                        </span>
                                        <div className="room-edit-row-content">
                                            <div className='room-edit-row-content-input'>
                                                <Select
                                                    onChange={(e) => setData({ ...data, roomTypeId: e.value })}
                                                    options={
                                                        roomType.map(item => {
                                                            return { value: item.id, label: item.name }
                                                        }
                                                        ).concat([{ value: null, label: '...', isDisabled: true }])
                                                    }
                                                    defaultValue={[{ value: data.roomType.id, label: data.roomType.name }]}
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

export default RoomEdit;
