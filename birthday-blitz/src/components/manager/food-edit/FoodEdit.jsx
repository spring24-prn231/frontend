import React, { useEffect, useState } from 'react';
import DoneIcon from '@mui/icons-material/Done';
import './FoodEdit.css';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Loading from '../../common/loading/Loading';
import { Link } from 'react-router-dom';
import { getFoodById } from '../../../apis/foodService';
import CloseIcon from '@mui/icons-material/Close';
import { useParams } from 'react-router-dom';

const FoodEdit = () => {
    const [oldData, setOldData] = useState(null);
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { foodId } = useParams();
    const [imgSrc, setImgSrc] = useState(null);

    useEffect(() => {
        const getData = async () => {
            setIsLoading(true);
            const res = await getFoodById(foodId);
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
            setData(JSON.parse(JSON.stringify(res.data[0])));
            setOldData(JSON.parse(JSON.stringify(res.data[0])));
            setImgSrc(res.data[0].image);
            setIsLoading(false);
        })
    }, []);

    const onFileChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = function (e) {
                setImgSrc(e.target.result);
            }
            setData({ ...data, image: e.target.result})
            reader.readAsDataURL(file);
        }
    }

    const onDiscard = (e) => {
        setData(JSON.parse(JSON.stringify(oldData)));
        setImgSrc(oldData.image);
    }

    return (
        <>
            {
                isLoading || data == null ? <Loading /> :
                    <div className='food-edit-container'>
                        <div className="food-edit-top-container">
                            <div className="food-edit-top">
                                <div className="food-edit-back">
                                    <Link to={`/manager/food`} style={{ textDecoration: 'none', color: 'black' }}>
                                        <KeyboardBackspaceIcon />
                                    </Link>
                                </div>
                                <div className="food-event-name-container">
                                </div>

                                <div className='food-save-button'>
                                    <DoneIcon style={{ marginRight: '4px' }} fontSize='small' />
                                    <span>Lưu</span>
                                </div>
                                {
                                    JSON.stringify(data) === JSON.stringify(oldData) ? '' :
                                        <div className='food-discard-button' onClick={() => onDiscard()}>
                                            <CloseIcon style={{ marginRight: '4px' }} fontSize='small' />
                                            <span>Loại bỏ</span>
                                        </div>
                                }
                            </div>
                        </div>

                        <div className="food-edit-bottom">
                            <div style={{ float: 'left' }}>
                                <div style={{ width: '100%' }}>
                                    <div className="food-edit-row">
                                        <div className="food-edit-row-index">
                                            <span><KeyboardArrowDownIcon fontSize='small' /></span>
                                        </div>
                                        <span className='food-edit-row-label'>
                                            Tên món:
                                        </span>
                                        <div className="food-edit-row-content">
                                            <input type="text" spellCheck={false}
                                                placeholder='Tên món'
                                                value={data.name}
                                                onChange={(e) => setData({ ...data, name: e.target.value })}
                                                className="food-edit-row-content-input"
                                            />
                                        </div>
                                    </div>

                                    <div className="food-edit-row-space"></div>

                                    <div className="food-edit-row">
                                        <div className="food-edit-row-index">
                                            <span><KeyboardArrowDownIcon fontSize='small' /></span>
                                        </div>
                                        <span className='food-edit-row-label'>
                                            Mô tả:
                                        </span>
                                        <div className="food-edit-row-content">
                                            <textarea type="text" spellCheck={false}
                                                placeholder='Mô tả'
                                                value={data.description}
                                                onChange={(e) => setData({ ...data, description: e.target.value })}
                                                className="food-edit-row-content-input"
                                            >
                                            </textarea>
                                        </div>
                                    </div>

                                    <div className="food-edit-row-space"></div>

                                    <div className="food-edit-row">
                                        <div className="food-edit-row-index">
                                            <span><KeyboardArrowDownIcon fontSize='small' /></span>
                                        </div>
                                        <span className='food-edit-row-label'>
                                            Giá tiền:
                                        </span>
                                        <div className="food-edit-row-content">
                                            <input type="number" spellCheck={false}
                                                placeholder='Giá tiền'
                                                value={parseFloat(data.price)}
                                                onChange={(e) => setData({ ...data, price: e.target.value })}
                                                className="food-edit-row-content-input"
                                            />
                                        </div>
                                    </div>

                                    <div className="food-edit-row-space"></div>

                                    <div className="food-edit-row">
                                        <div className="food-edit-row-index">
                                            <span><KeyboardArrowDownIcon fontSize='small' /></span>
                                        </div>
                                        <span className='food-edit-row-label'>
                                            Upload ảnh:
                                        </span>
                                        <div style={{ display: 'block' }} className="food-edit-row-content">
                                            <input type="file" spellCheck={false}
                                                accept="image/*"
                                                onChange={(e) => onFileChange(e)}
                                                className="food-edit-row-content-input"
                                            />

                                            <div className='food-edit-image'>
                                                <img id='preview-food' width='300px' src={imgSrc} />
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

export default FoodEdit;
