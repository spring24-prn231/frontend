import React, { useEffect, useState } from 'react';
import EastIcon from '@mui/icons-material/East';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Link } from 'react-router-dom';
import './PlanNew.css';
import { getAllPlan } from '../../../apis/planService';
import Loading from '../../common/loading/Loading';

const PlanNew = () => {
    const [data, setData] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getData = async () => {
            setIsLoading(true);
            const res = await getAllPlan(true);
            return res;
        };

        getData().then(res => {
            setData(res);
            setSelectedEvent(res[0].Id);
            setIsLoading(false);
        })
    }, []);

    return (
        <div className='plan-add-new-container'>
            <div className="plan-add-new-top-container">
                <div className="plan-add-new-back">
                    <Link to={`/manager/plan`} style={{ textDecoration: 'none', color: 'black' }}>
                        <KeyboardBackspaceIcon />
                    </Link>
                </div>

                <Link to={`/manager/plan/${selectedEvent}`} style={{ textDecoration: 'none', color: 'black' }}>
                    <div className='plan-add-new-next-button'>
                        <EastIcon style={{ marginRight: '4px' }} fontSize='small' />
                        <span>Next</span>
                    </div>
                </Link>
            </div>

            {
                isLoading ? <Loading /> :
                    <div className="plan-add-new-bottom">
                        <span className='plan-add-new-label'>Choose event you want to add plan:</span>
                        <div className="plan-add-new-select-container">
                            <select className='plan-add-new-select' onChange={(e) => setSelectedEvent(e.target.value)}>
                                {
                                    data.map((item, index) =>
                                        <option value={item.Id}>{item.EventName}</option>
                                    )
                                }
                            </select>
                        </div>
                    </div>
            }
        </div>
    )
}

export default PlanNew;
