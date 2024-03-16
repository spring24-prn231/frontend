import React, { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import './Plan.css';
import { deletePlan, getAllPlan } from '../../../apis/planService';
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
            const res = await getAllPlan(true);
            return res;
        };

        getData().then(res => {
            setData(res);
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
                            <th>Id</th>
                            <th>Tên sự kiện</th>
                            <th>Kế hoạch</th>
                            <th>Ngày tạo</th>
                            <th>Ngày sửa</th>
                            <th>Người tổ chức</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            isLoading ? <></> :
                                data.map((item, index) =>
                                    !item.EventName.includes(searchValue) ? '' :
                                        <tr key={index} className="plan-table-row" 
                                            onClick={() => cellOnClick(item.Id)}>
                                            <td>{item.Id}</td>
                                            <td>{item.EventName}</td>
                                            <td>{item.PlanName}</td>
                                            <td>{item.CreatedAt}</td>
                                            <td>{item.ModifiedAt}</td>
                                            <td>{item.Host}</td>
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
