import React, { useEffect, useState } from 'react';
import DoneIcon from '@mui/icons-material/Done';
import './VoucherEdit.css';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Loading from '../../common/loading/Loading';
import { Link } from 'react-router-dom';
import { getVoucherById } from '../../../apis/voucherService';
import CloseIcon from '@mui/icons-material/Close';
import { useParams } from 'react-router-dom';
import { converDateTime, converFormat, formatDateTimeString, formatDatetimeLocal } from '../../../utils/TimeFormat';

const VoucherEdit = () => {
    const [oldData, setOldData] = useState(null);
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { voucherId } = useParams();

    useEffect(() => {
        const getData = async () => {
            setIsLoading(true);
            const res = await getVoucherById(voucherId, true);
            return res;
        };

        getData().then(res => {
            if (res === undefined) {
                res = {
                    "Code": "",
                    "Discount": "",
                    "MaximumValue": "",
                    "ExpirationDate": ""
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
                    <div className='voucher-edit-container'>
                        <div className="voucher-edit-top-container">
                            <div className="voucher-edit-top">
                                <div className="voucher-edit-back">
                                    <Link to={`/manager/voucher`} style={{ textDecoration: 'none', color: 'black' }}>
                                        <KeyboardBackspaceIcon />
                                    </Link>
                                </div>
                                <div className="voucher-event-name-container">
                                </div>

                                <div className='voucher-save-button'>
                                    <DoneIcon style={{ marginRight: '4px' }} fontSize='small' />
                                    <span>Lưu</span>
                                </div>
                                {
                                    JSON.stringify(data) === JSON.stringify(oldData) ? '' :
                                        <div className='voucher-discard-button' onClick={() => setData(JSON.parse(JSON.stringify(oldData)))}>
                                            <CloseIcon style={{ marginRight: '4px' }} fontSize='small' />
                                            <span>Loại bỏ</span>
                                        </div>
                                }
                            </div>
                        </div>

                        <div className="voucher-edit-bottom">
                            <div style={{ float: 'left' }}>
                                <div style={{ width: '100%' }}>
                                    <div className="voucher-edit-row">
                                        <div className="voucher-edit-row-index">
                                            <span><KeyboardArrowDownIcon fontSize='small' /></span>
                                        </div>
                                        <span className='voucher-edit-row-label'>
                                            Mã: 
                                        </span>
                                        <div className="voucher-edit-row-content">
                                            <input type="text" spellCheck={false}
                                                placeholder='Code'
                                                value={data.Code}
                                                onChange={(e) => setData({ ...data, Code: e.target.value })}
                                                className="voucher-edit-row-content-input"
                                            />
                                        </div>
                                    </div>

                                    <div className="voucher-edit-row-space"></div>

                                    <div className="voucher-edit-row">
                                        <div className="voucher-edit-row-index">
                                            <span><KeyboardArrowDownIcon fontSize='small' /></span>
                                        </div>
                                        <span className='voucher-edit-row-label'>
                                            Giảm giá:
                                        </span>
                                        <div className="voucher-edit-row-content">
                                            <input type="text" spellCheck={false}
                                                placeholder='Discount'
                                                value={data.Discount}
                                                onChange={(e) => setData({ ...data, Discount: e.target.value })}
                                                className="voucher-edit-row-content-input"
                                            />
                                        </div>
                                    </div>

                                    <div className="voucher-edit-row-space"></div>

                                    <div className="voucher-edit-row">
                                        <div className="voucher-edit-row-index">
                                            <span><KeyboardArrowDownIcon fontSize='small' /></span>
                                        </div>
                                        <span className='voucher-edit-row-label'>
                                            Ngày hết hạn:
                                        </span>
                                        <div className="voucher-edit-row-content">
                                            <input type="date" spellCheck={false}
                                                placeholder='Expiration date'
                                                className="voucher-edit-row-content-input"
                                                onChange={(e) => setData({ ...data, ExpirationDate: converFormat(e.target.value) })}
                                                value={converDateTime(data.ExpirationDate)}
                                            />
                                        </div>
                                    </div>

                                    <div className="voucher-edit-row-space"></div>

                                    <div className="voucher-edit-row">
                                        <div className="voucher-edit-row-index">
                                            <span><KeyboardArrowDownIcon fontSize='small' /></span>
                                        </div>
                                        <span className='voucher-edit-row-label'>
                                            Giá trị lớn nhất:
                                        </span>
                                        <div className="voucher-edit-row-content">
                                            <input type="number" spellCheck={false}
                                                placeholder='Maximum value'
                                                value={data.MaximumValue}
                                                onChange={(e) => setData({ ...data, MaximumValue: e.target.value })}
                                                className="voucher-edit-row-content-input"
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

export default VoucherEdit;
