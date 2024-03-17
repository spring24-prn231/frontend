import React, { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import './Plan.css';
import { getAllOrder } from '../../../apis/orderService';
import Loading from '../../common/loading/Loading';
import {useNavigate} from "react-router-dom";

const Plan = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const getData = async () => {
            setIsLoading(true);
            const res = await getAllOrder();
            return res;
        };

        getData().then(res => {
            setData(res.data);
            setIsLoading(false);
        })
    }, []);

    const cellOnClick = (id) => {
        navigate(`/manager/plan/${id}`);
    }

    return (
        <div className='plan-center-container'>
            <div className='plan-center-top'>
                <div className="plan-search-bar-container">
                    <div className="plan-search-bar">
                        <SearchIcon htmlColor='grey' />
                        <input className='plan-search-bar-input'
                            placeholder='Tìm kiếm theo tên sự kiện'
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                    </div>
                </div>
            </div>
            <div className="plan-center-bottom">
                <table className='plan-center-table'>
                    <thead>
                        <tr className='plan-table-header'>
                            <th>Tên sự kiện</th>
                            <th>Tên đơn hàng</th>
                            <th>Ngày tạo</th>
                            <th>Người tổ chức</th>
                            <th>Số khách tối đa</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            isLoading ? <></> :
                                data.map((item, index) =>
                                    !item.service.name.includes(searchValue) ? '' :
                                        <tr key={index} className="plan-table-row" 
                                            onClick={() => cellOnClick(item.id)}>
                                            <td>{item.service.name}</td>
                                            <td>{item.name}</td>
                                            <td>{item.createDate}</td>
                                            <td>{item.user?item.user.name:'Người dùng ảo'}</td>
                                            <td>{item.maxGuest}</td>
                                        </tr>
                                )
                        }
                    </tbody>
                </table>
                {
                    isLoading ? <Loading /> : ""
                }
            </div>
        </div>
    )
}

export default Plan
