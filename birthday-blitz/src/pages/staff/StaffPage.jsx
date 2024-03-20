import React from 'react';
import StaffNavbar from '../../components/staff/navbar/StaffNavbar';
import { Outlet } from "react-router-dom";
import StaffSidebar from '../../components/staff/sidebar/StaffSidebar';
import './StaffPage.css';

const StaffPage = () => {
    return (
        <div >
            <StaffNavbar />
            <div className='staff-page-container'>
                <StaffSidebar />
                <div className="staff-page-center-container">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default StaffPage
