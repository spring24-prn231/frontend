import React from 'react';
import Navbar from '../navbar-customer/NavbarCustomer';
import Footer from '../footer-customer/FooterCustomer';
import { Outlet } from "react-router-dom"

const Customer = () => {
    document.body.style.overflow = "auto";
    return (
        <div>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
            <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet" /> 
            <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css" rel="stylesheet" />
            <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css" rel="stylesheet" />
            <link href="lib/animate/animate.min.css" rel="stylesheet" />
            <link href="lib/owlcarousel/assets/owl.carousel.min.css" rel="stylesheet" />
            <link href="css/bootstrap.min.css" rel="stylesheet" />
            <link href="css/style.css" rel="stylesheet"></link>
           
            <Navbar />
          
            <Outlet/>

            <Footer/>
                
        </div>
    )
}

export default Customer
