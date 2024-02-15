import React from 'react';
import './PopupConfirm.css';

const PopupConfirm = ({ isDisplay, confirmContent, okCallback, cancelCallback }) => {
    return (
        !isDisplay ? '' :
            <div className='popup-confirm-container'>
                <div className='popup-confirm-background'>
                </div>
                <div className='popup-confirm-container'>
                    <div className="popup-confirm">
                        <div className="popup-confirm-content-wrapper">
                            <div className="popup-confirm-content">
                                {confirmContent}
                            </div>
                        </div>
                        <div className="popup-confirm-buttons">
                            <div className="popup-confirm-ok" onClick={okCallback}>
                                OK
                            </div>
                            <div className="popup-confirm-cancel" onClick={cancelCallback}>
                                Cancel
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default PopupConfirm;
