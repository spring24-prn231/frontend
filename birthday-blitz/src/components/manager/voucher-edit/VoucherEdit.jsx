import React, { useEffect, useState } from 'react';
import DoneIcon from '@mui/icons-material/Done';
import './VoucherEdit.css';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Loading from '../../common/loading/Loading';
import { Link } from 'react-router-dom';
import { getVoucherById, updateVoucher } from '../../../apis/voucherService';
import CloseIcon from '@mui/icons-material/Close';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const VoucherEdit = () => {
    const [oldData, setOldData] = useState(null);
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isReload, setIsReload] = useState(false);
    const { voucherId } = useParams();

    useEffect(() => {
        const getData = async () => {
            setIsLoading(true);
            const res = await getVoucherById(voucherId).catch(err => {

            });
            return res;
        };

        getData().then(res => {
            console.log(res);
            if (res === undefined) {
                res = {
                    "data": [
                        {
                            "code": "",
                            "discount": "",
                            "maximumValue": "",
                            "expirationDate": ""
                        }
                    ]
                };
            }
            setData(JSON.parse(JSON.stringify(res.data[0])));
            setOldData(JSON.parse(JSON.stringify(res.data[0])));
            setIsLoading(false);
        })
    }, [isReload]);

    const onUpdateVoucher = () => {
        const res = updateVoucher(data).then(res => {
            setIsReload(!isReload);
            toast.success("Cập nhật thành công !!!", {
                position: "bottom-right"
            });
        }).catch(err => {
            toast.error("Cập nhật thất bại, hãy thử lại !!!", {
                position: "bottom-right"
            });
        });
    };

    return (
        <>
            <ToastContainer />
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

                                <div className='voucher-save-button' onClick={onUpdateVoucher}>
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
                                                value={data.code}
                                                onChange={(e) => setData({ ...data, code: e.target.value })}
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
                                                value={data.discount}
                                                onChange={(e) => setData({ ...data, discount: e.target.value })}
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
                                                onChange={(e) => setData({ ...data, expirationDate: e.target.value })}
                                                value={data.expirationDate.split('T')[0]}
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
                                                value={data.maximumValue}
                                                onChange={(e) => setData({ ...data, maximumValue: e.target.value })}
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
