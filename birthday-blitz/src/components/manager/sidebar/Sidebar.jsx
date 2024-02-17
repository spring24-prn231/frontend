import "./Sidebar.css";
import { Link, useLocation } from 'react-router-dom';
import DashboardIcon from "@mui/icons-material/Dashboard";
import EventNoteIcon from '@mui/icons-material/EventNote';
import RoomServiceIcon from '@mui/icons-material/RoomService';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import DiscountIcon from '@mui/icons-material/Discount';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import FeedbackIcon from '@mui/icons-material/Feedback';
import ListIcon from '@mui/icons-material/List';
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
                            <span className="sidebar-item-name">Dashboard</span>
                        </li>
                    </Link>
                    <Link to={'plan'} style={{ textDecoration: 'none', color: 'black' }}>
                        <li className={`sidebar-item ${pathname.includes('plan')?'sidebar-item-active': ''}`}>
                            <EventNoteIcon className="sidebar-icon" />
                            <span className="sidebar-item-name">Plan</span>
                        </li>
                    </Link>
                    <Link to={'user'} style={{ textDecoration: 'none', color: 'black' }}>
                        <li className={`sidebar-item ${pathname.includes('user')?'sidebar-item-active': ''}`}>
                            <PeopleAltIcon className="sidebar-icon" />
                            <span className="sidebar-item-name">User</span>
                        </li>
                    </Link>
                    <Link to={'voucher'} style={{ textDecoration: 'none', color: 'black' }}>
                        <li className={`sidebar-item ${pathname.includes('voucher')?'sidebar-item-active': ''}`}>
                            <DiscountIcon className="sidebar-icon" />
                            <span className="sidebar-item-name">Voucher</span>
                        </li>
                    </Link>
                    <Link to={'feedback'} style={{ textDecoration: 'none', color: 'black' }}>
                        <li className={`sidebar-item ${pathname.includes('feedback')?'sidebar-item-active': ''}`}>
                            <FeedbackIcon className="sidebar-icon" />
                            <span className="sidebar-item-name">Feedback</span>
                        </li>
                    </Link>
                    <Link to={'service'} style={{ textDecoration: 'none', color: 'black' }}>
                        <li className={`sidebar-item ${pathname.includes('service')?'sidebar-item-active': ''}`}>
                            <RoomServiceIcon className="sidebar-icon" />
                            <span className="sidebar-item-name">Service</span>
                        </li>
                    </Link>
                    <Link to={'money'} style={{ textDecoration: 'none', color: 'black' }}>
                        <li className={`sidebar-item ${pathname.includes('money')?'sidebar-item-active': ''}`}>
                            <AttachMoneyIcon className="sidebar-icon" />
                            <span className="sidebar-item-name">Money</span>
                        </li>
                    </Link>
                    <Link to={'room'} style={{ textDecoration: 'none', color: 'black' }}>
                        <li className={`sidebar-item ${pathname.includes('room')?'sidebar-item-active': ''}`}>
                            <MeetingRoomIcon className="sidebar-icon" />
                            <span className="sidebar-item-name">Room</span>
                        </li>
                    </Link>
                    <Link to={'menu'} style={{ textDecoration: 'none', color: 'black' }}>
                        <li className={`sidebar-item ${pathname.includes('menu')?'sidebar-item-active': ''}`}>
                            <ListIcon className="sidebar-icon" />
                            <span className="sidebar-item-name">Menu</span>
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