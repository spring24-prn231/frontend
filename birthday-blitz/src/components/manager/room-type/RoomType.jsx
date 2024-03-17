import React, { useEffect, useState } from 'react';
import DoneIcon from '@mui/icons-material/Done';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import './RoomType.css';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Loading from '../../common/loading/Loading';
import { Link } from 'react-router-dom';
import CategoryIcon from '@mui/icons-material/Category';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { getAllRoomType } from '../../../apis/roomTypeService';

const RoomType = () => {
    const [oldData, setOldData] = useState(null);
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getData = async () => {
            setIsLoading(true);
            const res = await getAllRoomType();
            return res;
        };

        getData().then(res => {
            setData(JSON.parse(JSON.stringify(res.data)));
            setOldData(JSON.parse(JSON.stringify(res.data)));
            setIsLoading(false);
        })
    }, []);

    const onAddRow = () => {
        console.log(Math.floor(Math.random * 1000).toString());
        setData([...data, { Id: Math.floor(Math.random * 1000).toString(), Name: '', Description: '' }]);
    };

    const onDeleteRow = (id) => {
        setData(data.filter(x => x.id !== id));
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
            if (item.id === id) {
                item.description = e.target.value;
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
                                <div className="room-type-search-bar-container">
                                    <div className="room-type-search-bar">
                                        <SearchIcon htmlColor='grey' />
                                        <input className='room-type-search-bar-input'
                                            placeholder='Tìm kiếm theo loại phòng'
                                            value={""}
                                            // onChange={(e) => ()}
                                        />
                                    </div>
                                </div>

                                <div className='room-type-save-button'>
                                    <DoneIcon style={{ marginRight: '4px' }} fontSize='small' />
                                    <span>Lưu</span>
                                </div>
                            </div>
                        </div>

                        <div className="room-type-bottom">
                            {
                                data.map((item, index) =>
                                    <div style={{ float: 'left' }}>
                                        <div style={{ width: '100%' }}>
                                            <div className="room-type-row">
                                                <div className="room-type-row-index">
                                                    <span><CategoryIcon /></span>
                                                </div>
                                                <div className="room-type-row-content">
                                                    <input type="text" spellCheck={false}
                                                        className="room-type-row-content-input"
                                                        onChange={(e) => onNameChange(e, item.id)}
                                                        value={item.name} />
                                                </div>
                                                <div className="room-type-row-content">
                                                    <input type="text" spellCheck={false}
                                                        className="room-type-row-content-input"
                                                        onChange={(e) => onDescriptionChange(e, item.id)}
                                                        value={item.description} />
                                                </div>
                                                <div className="room-type-row-delete" onClick={() => onDeleteRow(item.id)}>
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
