import React, { useEffect, useState } from 'react';
// import './ContactCustomer.css'
import '../common/customer-css/bootstrap.min.css'
import './ContactCustomer.css'
import menu_img from '../../assets/menu/menu.jpg'
import { CheckBox } from '@mui/icons-material';
import { element } from 'prop-types';
const ContactCustomer = () => {



    return (
        <div className="menu-customer">


            <div className="container-xxl py-6">
                <div className="container">
                    <h1 className="display-6 mb-4 center-title">LIÊN HỆ VỚI CHÚNG TÔI</h1>
                    <p className='mb-0 font-menu '>
                        <i className='fa fa-map-marker-alt margin-icon'></i>
                        Địa chỉ: 10/76/59 Hoàng Hoa Thám, phường 7, quận Bình Thạnh </p>
                    <br></br>

                    <p className='mb-0 font-menu'>
                        <i className='fa fa-phone-alt margin-icon'></i>
                        Số điện thoại: +012 345 6789 </p>
                    <br></br>

                    <p className='mb-0 font-menu '>
                        <i className='fa fa-envelope margin-icon'></i>
                        Email: locttse160275@fpt.edu.vn</p>
                    <br></br>
                </div>


            </div>
        </div>
    );

}
export default ContactCustomer;
