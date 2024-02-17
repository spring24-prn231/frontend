import React, { useEffect, useState } from 'react';
import DoneIcon from '@mui/icons-material/Done';
import './FeedbackEdit.css';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Loading from '../../common/loading/Loading';
import { Link } from 'react-router-dom';
import { getFeedbackById } from '../../../apis/feedbackService';
import CloseIcon from '@mui/icons-material/Close';
import { useParams } from 'react-router-dom';
import { converDateTime, converFormat, formatDateTimeString, formatDatetimeLocal } from '../../../utils/TimeFormat';

const FeedbackEdit = () => {
    const [oldData, setOldData] = useState(null);
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { feedbackId } = useParams();

    useEffect(() => {
        const getData = async () => {
            setIsLoading(true);
            const res = await getFeedbackById(feedbackId, true);
            return res;
        };

        getData().then(res => {
            if (res === undefined) {
                res = {
                    "RatingStar": "",
                    "Comment": "",
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
                    <div className='feedback-edit-container'>
                        <div className="feedback-edit-top-container">
                            <div className="feedback-edit-top">
                                <div className="feedback-edit-back">
                                    <Link to={`/manager/feedback`} style={{ textDecoration: 'none', color: 'black' }}>
                                        <KeyboardBackspaceIcon />
                                    </Link>
                                </div>
                                <div className="feedback-event-name-container">
                                </div>

                                <div className='feedback-save-button'>
                                    <DoneIcon style={{ marginRight: '4px' }} fontSize='small' />
                                    <span>Save</span>
                                </div>
                                {
                                    JSON.stringify(data) === JSON.stringify(oldData) ? '' :
                                        <div className='feedback-discard-button' onClick={() => setData(JSON.parse(JSON.stringify(oldData)))}>
                                            <CloseIcon style={{ marginRight: '4px' }} fontSize='small' />
                                            <span>Discard</span>
                                        </div>
                                }
                            </div>
                        </div>

                        <div className="feedback-edit-bottom">
                            <div style={{ float: 'left' }}>
                                <div style={{ width: '100%' }}>
                                    <div className="feedback-edit-row">
                                        <div className="feedback-edit-row-index">
                                            <span><KeyboardArrowDownIcon fontSize='small' /></span>
                                        </div>
                                        <span className='feedback-edit-row-label'>
                                            RatingStar:
                                        </span>
                                        <div className="feedback-edit-row-content">
                                            <input type="text" spellCheck={false}
                                                placeholder='Rating star'
                                                value={data.RatingStar}
                                                onChange={(e) => setData({ ...data, RatingStar: e.target.value })}
                                                className="feedback-edit-row-content-input"
                                            />
                                        </div>
                                    </div>

                                    <div className="feedback-edit-row-space"></div>

                                    <div className="feedback-edit-row">
                                        <div className="feedback-edit-row-index">
                                            <span><KeyboardArrowDownIcon fontSize='small' /></span>
                                        </div>
                                        <span className='feedback-edit-row-label'>
                                            Comment
                                        </span>
                                        <div className="feedback-edit-row-content">
                                            <input type="text" spellCheck={false}
                                                placeholder='Comment'
                                                value={data.Comment}
                                                onChange={(e) => setData({ ...data, Comment: e.target.value })}
                                                className="feedback-edit-row-content-input"
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

export default FeedbackEdit;
