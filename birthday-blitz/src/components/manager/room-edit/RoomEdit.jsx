import React, { useEffect, useState } from 'react';
import DoneIcon from '@mui/icons-material/Done';
import './RoomEdit.css';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Loading from '../../common/loading/Loading';
import { Link } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import { useParams } from 'react-router-dom';
import { getRoomById } from '../../../apis/roomService';
import Multiselect from 'multiselect-react-dropdown';
import { getAllRoomType } from '../../../apis/roomTypeService';


const RoomEdit = () => {
    const [oldData, setOldData] = useState(null);
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [roomType, setRoomType] = useState([]);
    const { roomId } = useParams();

    useEffect(() => {
        const getData = async () => {
            setIsLoading(true);
            const res = await getRoomById(roomId, true);
            const roomTypes = await getAllRoomType(true);
            return {res, roomTypes};
        };

        getData().then(({res, roomTypes}) => {
            if (res === undefined) {
                res = {
                    "Code": "",
                    "Capacity": "",
                    "RoomType": "",
                };
            }
            setData(JSON.parse(JSON.stringify(res)));
            setOldData(JSON.parse(JSON.stringify(res)));
            setRoomType(JSON.parse(JSON.stringify(roomTypes)));
            setIsLoading(false);
        })
    }, []);

    return (
        <>
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

                                <div className='feedback-save-button'>
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
                                            <input type="text" spellCheck={false}
                                                placeholder='Mã phòng'
                                                value={data.RoomNo}
                                                onChange={(e) => setData({ ...data, RoomNo: e.target.value })}
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
                                            <input type="text" spellCheck={false}
                                                placeholder='Sức chứa'
                                                value={data.Capacity}
                                                onChange={(e) => setData({ ...data, Capacity: e.target.value })}
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
                                        <Multiselect
                                            isObject={false}
                                            onKeyPressFn={function noRefCheck() { }}
                                            onRemove={function noRefCheck() { }}
                                            onSearch={function noRefCheck() { }}
                                            onSelect={function noRefCheck() { }}
                                            placeholder="Chọn loại phòng"
                                            showArrow
                                            singleSelect
                                            selectedValues = {[data.RoomType]}
                                            options={
                                                roomType.map(item => item.Name)
                                            }
                                        />
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
