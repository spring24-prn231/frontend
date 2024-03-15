import React, { useEffect, useState } from 'react';
import DoneIcon from '@mui/icons-material/Done';
import './MenuEdit.css';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Loading from '../../common/loading/Loading';
import { Link } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import { useParams } from 'react-router-dom';
import { getMenuById } from '../../../apis/menuService';
import Select from 'react-select';


const MenuEdit = () => {
    const [oldData, setOldData] = useState(null);
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { menuId } = useParams();

    useEffect(() => {
        const getData = async () => {
            setIsLoading(true);
            const res = await getMenuById(menuId, true);
            return res;
        };

        getData().then((res) => {
            if (res === undefined) {
                res = {
                    "Code": "",
                    "Capacity": "",
                    "menuType": "",
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
                    <div className='menu-edit-container'>
                        <div className="menu-edit-top-container">
                            <div className="menu-edit-top">
                                <div className="menu-edit-back">
                                    <Link to={`/manager/menu`} style={{ textDecoration: 'none', color: 'black' }}>
                                        <KeyboardBackspaceIcon />
                                    </Link>
                                </div>
                                <div className="feedback-event-name-container">
                                </div>

                                <div className='menu-edit-save-button'>
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

                        <div className="menu-edit-bottom">
                            <div className='menu-edit-bottom-left'>
                                <div className='menu-edit-header'>
                                    <span>Danh sách món ăn:</span>
                                    <div className='menu-edit-add-dish'>
                                        <div className='menu-edit-select-dish'>
                                            <Select
                                                options={[
                                                    {
                                                        label: 'Bún bò',
                                                        value: 1
                                                    }
                                                ]}
                                            />
                                        </div>
                                        <div style={{flex: 2}}></div>
                                        <button className='menu-edit-add-btn'>
                                            Thêm món mới
                                        </button>
                                    </div>
                                </div>
                                <table className='menu-edit-dish-table'>
                                    <tr>
                                        <th>Id</th>
                                        <th></th>
                                        <th>Loại đồ ăn</th>
                                        <th>Tên món</th>
                                        <th>Mô tả</th>
                                        <th>Giá bán</th>
                                        <th></th>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>
                                            <img width='70px' src='https://tiki.vn/blog/wp-content/uploads/2023/07/thumb.jpeg' />
                                        </td>
                                        <td>Món phụ</td>
                                        <td>Bún riêu</td>
                                        <td>Bún riêu cua</td>
                                        <td>20.000 đồng</td>
                                        <td><DeleteSweepIcon /></td>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>
                                            <img width='70px' src='https://tiki.vn/blog/wp-content/uploads/2023/07/thumb.jpeg' />
                                        </td>
                                        <td>Món phụ</td>
                                        <td>Bún riêu</td>
                                        <td>Bún riêu cua</td>
                                        <td>20.000 đồng</td>
                                        <td><DeleteSweepIcon /></td>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>
                                            <img width='70px' src='https://tiki.vn/blog/wp-content/uploads/2023/07/thumb.jpeg' />
                                        </td>
                                        <td>Món phụ</td>
                                        <td>Bún riêu</td>
                                        <td>Bún riêu cua</td>
                                        <td>20.000 đồng</td>
                                        <td><DeleteSweepIcon /></td>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>
                                            <img width='70px' src='https://tiki.vn/blog/wp-content/uploads/2023/07/thumb.jpeg' />
                                        </td>
                                        <td>Món phụ</td>
                                        <td>Bún riêu</td>
                                        <td>Bún riêu cua</td>
                                        <td>20.000 đồng</td>
                                        <td><DeleteSweepIcon /></td>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>
                                            <img width='70px' src='https://tiki.vn/blog/wp-content/uploads/2023/07/thumb.jpeg' />
                                        </td>
                                        <td>Món phụ</td>
                                        <td>Bún riêu</td>
                                        <td>Bún riêu cua</td>
                                        <td>20.000 đồng</td>
                                        <td><DeleteSweepIcon /></td>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>
                                            <img width='70px' src='https://tiki.vn/blog/wp-content/uploads/2023/07/thumb.jpeg' />
                                        </td>
                                        <td>Món phụ</td>
                                        <td>Bún riêu</td>
                                        <td>Bún riêu cua</td>
                                        <td>20.000 đồng</td>
                                        <td><DeleteSweepIcon /></td>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>
                                            <img width='70px' src='https://tiki.vn/blog/wp-content/uploads/2023/07/thumb.jpeg' />
                                        </td>
                                        <td>Món phụ</td>
                                        <td>Bún riêu</td>
                                        <td>Bún riêu cua</td>
                                        <td>20.000 đồng</td>
                                        <td><DeleteSweepIcon /></td>
                                    </tr>
                                </table>
                            </div>

                            <div style={{ flex: '1' }}>
                                <div style={{ width: '100%', padding: '20px' }}>
                                    <div className="menu-edit-row">
                                        <span className='menu-edit-row-label'>
                                            Gói dịch vụ:
                                        </span>
                                        <div className="menu-edit-row-content">
                                            <input type="text" spellCheck={false}
                                                placeholder='Mã phòng'
                                                value={data.ServiceName}
                                                onChange={(e) => setData({ ...data, ServiceName: e.target.value })}
                                                className="menu-edit-row-content-input"
                                            />
                                        </div>
                                    </div>


                                    <div className="menu-edit-row">
                                        <span className='menu-edit-row-label'>
                                            Loại phòng:
                                        </span>
                                        <div className="menu-edit-row-content">
                                            <input type="text" spellCheck={false}
                                                placeholder='Sức chứa'
                                                value={data.RoomType}
                                                onChange={(e) => setData({ ...data, RoomType: e.target.value })}
                                                className="menu-edit-row-content-input"
                                            />
                                        </div>
                                    </div>


                                    <div className="menu-edit-row">
                                        <span className='menu-edit-row-label'>
                                            Mô tả:
                                        </span>
                                        <div className="menu-edit-row-content">
                                            <textarea spellCheck={false}
                                                style={{ height: '200px' }}
                                                placeholder='Mô tả'
                                                value={data.Description}
                                                onChange={(e) => setData({ ...data, Description: e.target.value })}
                                                className="menu-edit-row-content-input"
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

export default MenuEdit;
