import "./StaffSidebar.css";
import { Link, useLocation } from 'react-router-dom';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import InventoryIcon from '@mui/icons-material/Inventory';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';

const StaffSidebar = () => {
    const { hash, pathname, search } = useLocation();
    return (
        <div className="staff-sidebar-container">
            <div className="staff-sidebar-center">
                <ul>
                    <Link to={'order'} style={{ textDecoration: 'none', color: 'black' }}>
                        <li className={`staff-sidebar-item ${pathname.includes('order')
                            || pathname.split('/').length === 2
                            ?'staff-sidebar-item-active': ''}`}>
                            <LocalMallIcon className="staff-sidebar-icon" />
                            <span className="staff-sidebar-item-name">Đơn hàng của bạn</span>
                        </li>
                    </Link>
                    <Link to={'menu'} style={{ textDecoration: 'none', color: 'black' }}>
                        <li className={`staff-sidebar-item ${pathname.includes('menu')
                            ?'staff-sidebar-item-active': ''}`}>
                            <InventoryIcon className="staff-sidebar-icon" />
                            <span className="staff-sidebar-item-name">Gói dịch vụ</span>
                        </li>
                    </Link>
                    <Link to={'plan'} style={{ textDecoration: 'none', color: 'black' }}>
                        <li className={`staff-sidebar-item ${pathname.includes('plan')
                            ?'staff-sidebar-item-active': ''}`}>
                            <WorkHistoryIcon className="staff-sidebar-icon" />
                            <span className="staff-sidebar-item-name">Kế hoạch</span>
                        </li>
                    </Link>
                </ul>
            </div>
            <div style={{ height: '50px',  display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <span className="staff-sidebar-item-name">@loc12345</span>
            </div>
        </div>
    );
};

export default StaffSidebar;