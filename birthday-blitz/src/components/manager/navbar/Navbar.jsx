import TableRowsIcon from '@mui/icons-material/TableRows';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import React, { useState } from 'react';
import './Navbar.css';

const Navbar = () => {

    const [isCollapse, setIsCollapse] = useState(false);

    const sidebarCollapse = () => {
        if (isCollapse == false) {
            let sidebarItemNames = document.getElementsByClassName('sidebar-item-name');
            for (let i = 0; i < sidebarItemNames.length; ++i) {
                sidebarItemNames[i].style.display = "none";
            }

            let sidebarItems = document.getElementsByClassName('sidebar-item');
            for (let i = 0; i < sidebarItems.length; ++i) {
                sidebarItems[i].style.width = "40px";
            }

            let sidebarContainer = document.getElementsByClassName('sidebar-container');
            sidebarContainer[0].style.width = "60px";

            let planCenterContainer = document.getElementsByClassName('manager-center-container');
            planCenterContainer[0].style.width = "calc(100vw - 60px)";
            planCenterContainer[0].style.marginLeft = "60px";
        }
        else {
            let sidebarItemNames = document.getElementsByClassName('sidebar-item-name');
            for (let i = 0; i < sidebarItemNames.length; ++i) {
                sidebarItemNames[i].style.display = "block";
            }

            let sidebarItems = document.getElementsByClassName('sidebar-item');
            for (let i = 0; i < sidebarItems.length; ++i) {
                sidebarItems[i].style.width = "230px";
            }

            let sidebarContainer = document.getElementsByClassName('sidebar-container');
            sidebarContainer[0].style.width = "250px";

            let planCenterContainer = document.getElementsByClassName('manager-center-container');
            planCenterContainer[0].style.width = "calc(100vw - 250px)";
            planCenterContainer[0].style.marginLeft = "250px";
        }
        setIsCollapse(!isCollapse);
    }

    return (
        <div className='navbar-container'>
            <div className='navbar-logo'>
                <TableRowsIcon style={{ marginRight: "20px", cursor: "pointer" }} fontSize='large' onClick={sidebarCollapse} />
                <h1 className='navbar-logo-title'>
                    Birthday Blitz
                </h1>
            </div>
            <div className='navbar-center'>

            </div>
            <div className='navbar-helper'>
                <NotificationsIcon style={{ flex: 3 }} fontSize='medium' />
                <AccountCircleIcon style={{ flex: 1 }} fontSize='large' />
            </div>
        </div>
    )
}

export default Navbar
