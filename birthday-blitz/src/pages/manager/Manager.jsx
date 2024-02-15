import React from 'react';
import Navbar from '../../components/manager/navbar/Navbar';
import Sidebar from '../../components/manager/sidebar/Sidebar';
import './Manager.css';
import { Outlet } from "react-router-dom"


const Manager = () => {
    return (
        <div >
            <Navbar />
            <div className='manager-container'>
                <Sidebar />
                <div className="manager-center-container">
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}

export default Manager
