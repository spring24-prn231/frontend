import "./Sidebar.css";
import { Link, useLocation } from 'react-router-dom';
import DashboardIcon from "@mui/icons-material/Dashboard";
import EventNoteIcon from '@mui/icons-material/EventNote';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import DiscountIcon from '@mui/icons-material/Discount';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import FeedbackIcon from '@mui/icons-material/Feedback';
import ListIcon from '@mui/icons-material/List';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
const Sidebar = () => {
    // const { dispatch } = useContext(DarkModeContext);

    const { hash, pathname, search } = useLocation();
    return (
        <div className="sidebar-container">
            <div className="sidebar-center">
                <ul>
                    <Link to={'dashboard'} style={{ textDecoration: 'none', color: 'black' }}>
                        <li className={`sidebar-item ${pathname.includes('dashboard')
                            || pathname.split('/').length === 2
                            ?'sidebar-item-active': ''}`}>
                            <DashboardIcon className="sidebar-icon" />
                            <span className="sidebar-item-name">Bảng báo cáo</span>
                        </li>
                    </Link>
                    <Link to={'plan'} style={{ textDecoration: 'none', color: 'black' }}>
                        <li className={`sidebar-item ${pathname.includes('plan')?'sidebar-item-active': ''}`}>
                            <EventNoteIcon className="sidebar-icon" />
                            <span className="sidebar-item-name">Kế hoạch</span>
                        </li>
                    </Link>
                    <Link to={'user'} style={{ textDecoration: 'none', color: 'black' }}>
                        <li className={`sidebar-item ${pathname.includes('user')?'sidebar-item-active': ''}`}>
                            <PeopleAltIcon className="sidebar-icon" />
                            <span className="sidebar-item-name">Khách hàng</span>
                        </li>
                    </Link>
                    <Link to={'voucher'} style={{ textDecoration: 'none', color: 'black' }}>
                        <li className={`sidebar-item ${pathname.includes('voucher')?'sidebar-item-active': ''}`}>
                            <DiscountIcon className="sidebar-icon" />
                            <span className="sidebar-item-name">Mã giảm giá</span>
                        </li>
                    </Link>
                    <Link to={'feedback'} style={{ textDecoration: 'none', color: 'black' }}>
                        <li className={`sidebar-item ${pathname.includes('feedback')?'sidebar-item-active': ''}`}>
                            <FeedbackIcon className="sidebar-icon" />
                            <span className="sidebar-item-name">Phản hồi</span>
                        </li>
                    </Link>
                    <Link to={'room'} style={{ textDecoration: 'none', color: 'black' }}>
                        <li className={`sidebar-item ${pathname.includes('room')?'sidebar-item-active': ''}`}>
                            <MeetingRoomIcon className="sidebar-icon" />
                            <span className="sidebar-item-name">Phòng</span>
                        </li>
                    </Link>
                    <Link to={'food'} style={{ textDecoration: 'none', color: 'black' }}>
                        <li className={`sidebar-item ${pathname.includes('food')?'sidebar-item-active': ''}`}>
                            <LocalDiningIcon className="sidebar-icon" />
                            <span className="sidebar-item-name">Món ăn</span>
                        </li>
                    </Link>
                    <Link to={'order'} style={{ textDecoration: 'none', color: 'black' }}>
                        <li className={`sidebar-item ${pathname.includes('order')?'sidebar-item-active': ''}`}>
                            <AttachMoneyIcon className="sidebar-icon" />
                            <span className="sidebar-item-name">Đơn hàng</span>
                        </li>
                    </Link>
                    <Link to={'menu'} style={{ textDecoration: 'none', color: 'black' }}>
                        <li className={`sidebar-item ${pathname.includes('menu')?'sidebar-item-active': ''}`}>
                            <ListIcon className="sidebar-icon" />
                            <span className="sidebar-item-name">Các gói dịch vụ</span>
                        </li>
                    </Link>
                    <Link to={'staff'} style={{ textDecoration: 'none', color: 'black' }}>
                        <li className={`sidebar-item ${pathname.includes('staff')?'sidebar-item-active': ''}`}>
                            <SupervisedUserCircleIcon className="sidebar-icon" />
                            <span className="sidebar-item-name">Nhân viên</span>
                        </li>
                    </Link>
                </ul>
            </div>
            <div style={{ height: '50px',  display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <span className="sidebar-item-name">@loc12345</span>
            </div>
            {/* <div className="bottom">
                <div
                    className="colorOption"
                    onClick={() => dispatch({ type: "LIGHT" })}
                ></div>
                <div
                    className="colorOption"
                    onClick={() => dispatch({ type: "DARK" })}
                ></div>
            </div> */}
        </div>
    );
};

export default Sidebar;