import React, { useEffect, useState } from 'react';
import DoneIcon from '@mui/icons-material/Done';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import './RoomType.css';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Loading from '../../common/loading/Loading';
import { Link } from 'react-router-dom';
import CategoryIcon from '@mui/icons-material/Category';
import CloseIcon from '@mui/icons-material/Close';
import { getAllRoomType } from '../../../apis/roomTypeService';

const RoomType = () => {
    const [oldData, setOldData] = useState(null);
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getData = async () => {
            setIsLoading(true);
            const res = await getAllRoomType(true);
            return res;
        };

        getData().then(res => {
            setData(JSON.parse(JSON.stringify(res)));
            setOldData(JSON.parse(JSON.stringify(res)));
            setIsLoading(false);
        })
    }, []);

    const onAddRow = () => {
        setData([...data, {Id: Math.floor(Math.random * 1000).toString(), Name: '', Description: '' }]);
    };

    const onDeleteRow = (id) => {
        setData(data.filter(x => x.Id !== id));
    };

    const onNameChange = (e, id) => {
        data.forEach(item => {
            if (item.Id === id) {
                item.Name = e.target.value;
            }
        });
        setData([...data]);
    }

    const onDescriptionChange = (e, id) => {
        data.forEach(item => {
            if (item.Id === id) {
                item.Description = e.target.value;
            }
        });
        setData([...data]);
    }

    return (
        <>
            {
                isLoading || data == null ? <Loading /> :
                    <div className='room-type-container'>
                        <div className="room-type-top-container">
                            <div className="room-type-top">
                                <div className="room-type-back">
                                    <Link to={`/manager/room`} style={{ textDecoration: 'none', color: 'black' }}>
                                        <KeyboardBackspaceIcon />
                                    </Link>
                                </div>
                                <div className="plan-event-name-container">
                                </div>

                                <div className='plan-save-button'>
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

                        <div className="room-type-bottom">
                            {
                                data.map((item, index) =>
                                    <div style={{ float: 'left' }}>
                                        <div style={{ width: '100%' }}>
                                            <div className="room-type-row">
                                                <div className="room-type-row-index">
                                                    <span><CategoryIcon/></span>
                                                </div>
                                                <div className="room-type-row-content">
                                                    <input type="text" spellCheck={false}
                                                        className="room-type-row-content-input"
                                                        onChange={(e) => onNameChange(e, item.Id)}
                                                        value={item.Name} />
                                                </div>
                                                <div className="room-type-row-content">
                                                    <input type="text" spellCheck={false}
                                                        className="room-type-row-content-input"
                                                        onChange={(e) => onDescriptionChange(e, item.Id)}
                                                        value={item.Description} />
                                                </div>
                                                <div className="plan-row-delete" onClick={() => onDeleteRow(item.Id)}>
                                                    <RemoveCircleOutlineIcon htmlColor='red' />
                                                </div>
                                            </div>
                                            <div className="room-type-row-space">
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                            <div style={{ width: '100%', justifyContent: 'left', display: 'flex' }}>
                                <div className="room-type-row-index room-type-row-add"
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

export default RoomType
