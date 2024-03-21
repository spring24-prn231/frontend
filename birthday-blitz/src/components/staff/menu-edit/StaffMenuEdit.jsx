import React, { useEffect, useState } from 'react';
import DoneIcon from '@mui/icons-material/Done';
import './StaffMenuEdit.css';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Loading from '../../common/loading/Loading';
import { Link } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import { useParams } from 'react-router-dom';
import { getMenuById } from '../../../apis/menuService';
import Select from 'react-select';
import { getAllServiceElements, getServiceById, updateService } from '../../../apis/serviceService';
import { getAllFood } from '../../../apis/foodService';
import { getAllRoomType } from '../../../apis/roomTypeService';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


const StaffMenuEdit = () => {
    const [oldData, setOldData] = useState(null);
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [dishes, setDishes] = useState([]);
    const { menuId } = useParams();
    const [selectedDish, setSelectedDish] = useState(null);
    const [roomTypes, setRoomTypes] = useState([]);
    const [isMenu, setIsMenu] = useState(true);
    const [serviceElements, setServiceElements] = useState([]);
    const [selectedElement, setSelectedElement] = useState(null);

    useEffect(() => {
        const getData = async () => {
            setIsLoading(true);
            let res = await getServiceById(menuId);
            return res;
        };

        const getDishes = async () => {
            setIsLoading(true);
            const res = await getAllFood();
            return res;
        }

        const getRoomTypes = async () => {
            setIsLoading(true);
            const res = await getAllRoomType();
            return res;
        }

        const getServiceElements = async () => {
            setIsLoading(true);
            const res = await getAllServiceElements();
            return res;
        }

        getServiceElements().then(res => {
            setServiceElements(res.data);
            setIsLoading(false);
        })

        getRoomTypes().then(res => {
            setRoomTypes(res.data);
            setIsLoading(false);
        });

        getDishes().then(res => {
            setDishes(res.data);
            setIsLoading(false);
        });

        getData().then((res) => {
            if (res === undefined) {
                res = {
                    "Code": "",
                    "Capacity": "",
                    "menuType": "",
                };
            }
            setData(JSON.parse(JSON.stringify(res.data[0])));
            setOldData(JSON.parse(JSON.stringify(res.data[0])));
            setIsLoading(false);
        })
    }, []);

    const onAddElement = () => {
        const newData = { ...data, serviceElementDetails: [...data.serviceElementDetails, { 'serviceElementId': selectedElement }] };
        setData(newData);
        setSelectedElement(null);
    }

    const onDeleteElement = (id) => {
        console.log(data.serviceElementDetails.filter(x => x.elementId !== id));
        const newData = { ...data, serviceElementDetails: data.serviceElementDetails.filter(x => x.serviceElementId !== id) };
        setData(newData);
    }

    const onAddNewDish = () => {
        const newData = { ...data, menus: [...data.menus, { 'dishId': selectedDish }] };
        setData(newData);
        setSelectedDish(null);
    }

    const onDeleteDish = (id) => {
        const newData = { ...data, menus: data.menus.filter(x => x.dishId !== id) };
        setData(newData);
    }

    const onUpdateService = () => {
        updateService(data).then(res => {
            toast.success("Lưu thành công !!!", {
                position: "bottom-right",
                containerId: "status"
            });
        }).catch(err => {
            toast.error("Lưu thất bại !!!", {
                position: "bottom-right",
                containerId: "status"
            });
        });
    }

    return (
        <>
            {
                isLoading || data == null ? <Loading /> :
                    <div className='staff-menu-edit-container'>
                        <div className="staff-menu-edit-top-container">
                            <div className="staff-menu-edit-top">
                                <div className="staff-menu-edit-back">
                                    <Link to={`/staff/menu`} style={{ textDecoration: 'none', color: 'black' }}>
                                        <KeyboardBackspaceIcon />
                                    </Link>
                                </div>
                                <div className="feedback-event-name-container">
                                </div>

                                <div className='staff-menu-edit-save-button' onClick={onUpdateService}>
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

                        <div className=''>
                            <button
                                style={{
                                    outline: 'none',
                                    border: 'none',
                                    borderBottom: '1px grey solid',
                                    borderRight: '1px grey solid',
                                    backgroundColor: !isMenu ? 'grey' : ''
                                }}
                                onClick={() => setIsMenu(true)}
                            >Quản lý menu</button>
                            <button
                                style={{
                                    outline: 'none',
                                    border: 'none',
                                    borderBottom: '1px grey solid',
                                    borderLeft: '1px grey solid',
                                    backgroundColor: isMenu ? 'grey' : ''
                                }}
                                onClick={() => setIsMenu(false)}
                            >Quản lý thành phần</button>
                        </div>
                        <div className="staff-menu-edit-bottom">

                            {
                                !isMenu ?
                                    <div className='staff-menu-edit-bottom-left'>
                                        <div className='staff-menu-edit-header'>
                                            <span>Danh sách thành phần:</span>
                                            <div className='staff-menu-edit-add-dish'>
                                                <div className='staff-menu-edit-select-dish'>
                                                    <Select
                                                        options={
                                                            serviceElements.map(x => ({
                                                                label: x.name,
                                                                value: x.id
                                                            }))
                                                        }
                                                        onChange={(e) => setSelectedElement(e.value)}
                                                        value={
                                                            selectedElement === null ? '' :
                                                                {
                                                                    value: selectedElement,
                                                                    label: serviceElements.find(x => x.id === selectedElement).name
                                                                }
                                                        }
                                                    />
                                                </div>
                                                <div style={{ flex: 2 }}></div>
                                                {
                                                    selectedElement === null ? '' :
                                                        <button className='staff-menu-edit-add-btn' onClick={onAddElement}>
                                                            Thêm thành phần mới
                                                        </button>
                                                }
                                            </div>
                                        </div>
                                        <table className='staff-menu-edit-dish-table'>
                                            <tr>
                                                <th></th>
                                                <th>Loại dịch vu</th>
                                                <th>Tên dịch vụ</th>
                                                <th>Mô tả</th>
                                                <th>Giá bán</th>
                                                <th></th>
                                            </tr>
                                            {
                                                data.serviceElementDetails.map((p) => {
                                                    const item = serviceElements.find(x => x.id === p.serviceElementId);
                                                    return item === undefined ? '' : <tr>
                                                        <td>
                                                            <img width='70px' src={item.image} />
                                                        </td>
                                                        <td>{item.elementType.name}</td>
                                                        <td>{item.name}</td>
                                                        <td>{item.description}</td>
                                                        <td>{item.price} đồng</td>
                                                        <td><DeleteSweepIcon
                                                            style={{ cursor: 'pointer' }}
                                                            onClick={() => onDeleteElement(item.id)} /></td>
                                                    </tr>
                                                })
                                            }
                                        </table>
                                    </div>
                                    :
                                    <div className='staff-menu-edit-bottom-left'>
                                        <div className='staff-menu-edit-header'>
                                            <span>Danh sách món ăn:</span>
                                            <div className='staff-menu-edit-add-dish'>
                                                <div className='staff-menu-edit-select-dish'>
                                                    <Select
                                                        options={
                                                            dishes.map(x => ({
                                                                label: x.name,
                                                                value: x.id
                                                            }))
                                                        }
                                                        onChange={(e) => setSelectedDish(e.value)}
                                                        value={
                                                            selectedDish === null ? '' :
                                                                {
                                                                    value: selectedDish,
                                                                    label: dishes.find(x => x.id === selectedDish).name
                                                                }
                                                        }
                                                    />
                                                </div>
                                                <div style={{ flex: 2 }}></div>
                                                {
                                                    selectedDish === null ? '' :
                                                        <button className='staff-menu-edit-add-btn' onClick={onAddNewDish}>
                                                            Thêm món mới
                                                        </button>
                                                }
                                            </div>
                                        </div>
                                        <table className='staff-menu-edit-dish-table'>
                                            <tr>
                                                <th></th>
                                                <th>Loại đồ ăn</th>
                                                <th>Tên món</th>
                                                <th>Mô tả</th>
                                                <th>Giá bán</th>
                                                <th></th>
                                            </tr>
                                            {
                                                data.menus.map((p) => {
                                                    const item = dishes.find(x => x.id === p.dishId);
                                                    return item === undefined ? '' : <tr>
                                                        <td>
                                                            <img width='70px' src={item.image} />
                                                        </td>
                                                        <td>{item.dishType.name}</td>
                                                        <td>{item.name}</td>
                                                        <td>{item.description}</td>
                                                        <td>{item.price} đồng</td>
                                                        <td><DeleteSweepIcon
                                                            style={{ cursor: 'pointer' }}
                                                            onClick={() => onDeleteDish(item.id)} /></td>
                                                    </tr>
                                                })
                                            }
                                        </table>
                                    </div>
                            }
                            <div style={{ flex: '1' }}>
                                <div style={{ width: '100%', padding: '20px' }}>
                                    <div className="staff-menu-edit-row">
                                        <span className='staff-menu-edit-row-label'>
                                            Gói dịch vụ:
                                        </span>
                                        <div className="staff-menu-edit-row-content">
                                            <input type="text" spellCheck={false}
                                                value={data.name}
                                                onChange={(e) => setData({ ...data, name: e.target.value })}
                                                className="staff-menu-edit-row-content-input"
                                            />
                                        </div>
                                    </div>


                                    <div className="staff-menu-edit-row">
                                        <span className='staff-menu-edit-row-label'>
                                            Loại phòng:
                                        </span>
                                        <div className="staff-menu-edit-row-content">
                                            <div style={{ width: '100%' }}>
                                                <Select
                                                    options={
                                                        roomTypes.map(x => ({
                                                            label: x.name,
                                                            value: x.id
                                                        }))
                                                    }
                                                // onChange={(e) => setSelectedDish(e.value)}
                                                // value={
                                                //     selectedDish === null ? '' :
                                                //         {
                                                //             value: selectedDish,
                                                //             label: dishes.find(x => x.id === selectedDish).name
                                                //         }
                                                // }
                                                />
                                            </div>
                                        </div>
                                    </div>


                                    <div className="staff-menu-edit-row">
                                        <span className='staff-menu-edit-row-label'>
                                            Mô tả:
                                        </span>
                                        <div className="staff-menu-edit-row-content">
                                            <textarea spellCheck={false}
                                                style={{ height: '200px' }}
                                                placeholder='Mô tả'
                                                value={data.description}
                                                onChange={(e) => setData({ ...data, description: e.target.value })}
                                                className="staff-menu-edit-row-content-input"
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

export default StaffMenuEdit;
