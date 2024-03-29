import TableRowsIcon from '@mui/icons-material/TableRows';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import React, { useEffect, useState } from 'react';
import './StaffNavbar.css';
import { Link } from 'react-router-dom';
import { logout } from '../../../apis/loginService';
import {useNavigate} from "react-router-dom";

const StaffNavbar = () => {
    const [isCollapse, setIsCollapse] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        window.addEventListener('click', function (e) {
            var element = this.document.getElementsByClassName('staff-navbar-popup')[0];
            if (element !== undefined) {
                if (!element.contains(e.target)) {
                    element.style.display = 'none';
                }
            }
        });
    }, []);

    const sidebarCollapse = () => {
        if (isCollapse == false) {
            let sidebarItemNames = document.getElementsByClassName('staff-sidebar-item-name');
            for (let i = 0; i < sidebarItemNames.length; ++i) {
                sidebarItemNames[i].style.display = "none";
            }

            let sidebarItems = document.getElementsByClassName('staff-sidebar-item');
            for (let i = 0; i < sidebarItems.length; ++i) {
                sidebarItems[i].style.width = "40px";
            }

            let sidebarContainer = document.getElementsByClassName('staff-sidebar-container');
            sidebarContainer[0].style.width = "60px";

            let planCenterContainer = document.getElementsByClassName('staff-page-center-container');
            planCenterContainer[0].style.width = "calc(100vw - 60px)";
            planCenterContainer[0].style.marginLeft = "60px";
        }
        else {
            let sidebarItemNames = document.getElementsByClassName('staff-sidebar-item-name');
            for (let i = 0; i < sidebarItemNames.length; ++i) {
                sidebarItemNames[i].style.display = "block";
            }

            let sidebarItems = document.getElementsByClassName('staff-sidebar-item');
            for (let i = 0; i < sidebarItems.length; ++i) {
                sidebarItems[i].style.width = "230px";
            }

            let sidebarContainer = document.getElementsByClassName('staff-sidebar-container');
            sidebarContainer[0].style.width = "250px";

            let planCenterContainer = document.getElementsByClassName('staff-page-center-container');
            planCenterContainer[0].style.width = "calc(100vw - 250px)";
            planCenterContainer[0].style.marginLeft = "250px";
        }
        setIsCollapse(!isCollapse);
    }

    const onPressUserIcon = (e) => {
        e.stopPropagation();
        var element = e.target;
        var rect = element.getBoundingClientRect();
        let navbarPopup = document.getElementsByClassName('staff-navbar-popup')[0];
        navbarPopup.style.display = "block";
        navbarPopup.style.top = `${rect.top + 30}px`;
        navbarPopup.style.left = `${rect.left - 100}px`;
    }

    const onLogoutClick = () => {
        logout();
        navigate('/logout');
    }

    return (
        <div className='staff-navbar-container'>

            <div className='staff-navbar-popup'>
                <Link to="/login" style={{ textDecoration: 'none', color: 'black' }}>
                    <div className="staff-navbar-popup-option" onClick={onLogoutClick}>
                        <ExitToAppIcon fontSize='small' style={{ marginRight: "5px" }} />
                        <span>Đăng xuất</span>
                    </div>
                </Link>
            </div>

            <div className='staff-navbar-logo'>
                <TableRowsIcon style={{ marginRight: "20px", cursor: "pointer" }} fontSize='large' onClick={sidebarCollapse} />
                <h1 className='staff-navbar-logo-title'>
                    Birthday Blitz
                </h1>
            </div>
            <div className='staff-navbar-center'>

            </div>
            <div className='staff-navbar-helper'>
                <NotificationsIcon style={{ flex: 3, cursor: 'pointer' }} fontSize='medium' />
                <AccountCircleIcon style={{ flex: 1, cursor: 'pointer' }} fontSize='large' onClick={onPressUserIcon} />
            </div>
        </div>
    )
}

export default StaffNavbar
