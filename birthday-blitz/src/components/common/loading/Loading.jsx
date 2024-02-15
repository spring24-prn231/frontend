import React from 'react';
import RefreshIcon from '@mui/icons-material/Refresh';
import './Loading.css';

const Loading = () => {
    return (
        <div className='manager-loading'>
            <div style={{width: 'fit-content', display: 'flex'}}>
                <RefreshIcon className='loading-rotate' fontSize='large' />
            </div>
        </div>
    )
}

export default Loading;
