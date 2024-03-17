import React, { useEffect, useRef, useState } from 'react'
import '../common/customer-css/style.css'
import '../common/customer-css/bootstrap.min.css'
import carousel1 from '../../assets/landing-page/panel1.jpg'
import { Link, useLocation } from 'react-router-dom'
const NavbarCustomer = () => {
    const location = useLocation();

    useEffect(() => {

        var page = location.pathname.split("/").pop();

        var listPage = ["aboutus", "service", "contact"]
        // alert(page);
        document.getElementById("main")?.classList.remove("active")
        if (page == "" || page == "customer") {
            document.getElementById("main").classList.add("active")
        }
        listPage.forEach(function (item) {
            document.getElementById(item)?.classList.remove("active")
            if (item == page) {
                document.getElementById(page).classList.add("active")
            }

        });

    }, [location]);
 
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark fixed-top py-lg-0 px-lg-5 wow fadeIn" data-wow-delay="0.1s">
                <Link to="/customer/" className="navbar-brand ms-4 ms-lg-0">
                    <h1 className="text-primary m-0">BIRTHDAY BLITZ</h1>
                </Link>
                <button type="button" className="navbar-toggler me-4" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <div className="navbar-nav mx-auto p-4 p-lg-0">
                        <Link id="main" to="/customer/" className="nav-item nav-link">Trang chủ</Link>
                        <Link id="aboutus" to="aboutus" className="nav-item nav-link">Về chúng tôi</Link>
                        <Link id="service" to="service" className="nav-item nav-link">Dịch vụ</Link>
                        <Link id="contact" to="contact" className="nav-item nav-link">Liên hệ</Link>
                    </div>
                    <div className=" d-none d-lg-flex">
                        <div className="flex-shrink-0 btn-lg-square border border-light rounded-circle">
                            <i className="fa fa-phone text-primary"></i>
                        </div>
                        <div className="ps-3">
                            <small className="text-primary mb-0">Liên hệ với chúng tôi</small>
                            <p className="text-light fs-5 mb-0">+012 345 6789</p>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="container-fluid p-0 wow fadeIn" data-wow-delay="0.1s">
                <div className="owl-carousel header-carousel position-relative">
                    <div className="owl-carousel-item position-relative">
                        <img className="img-fluid" src={carousel1} alt="" />
                        <div className="owl-carousel-inner">
                            <div className="container">
                                <div className="row justify-content-start">
                                    <div className="col-lg-8">
                                        <p className="text-primary text-uppercase fw-bold mb-2">// Team LOC12345</p>
                                        <h1 className="display-1 text-light mb-4 animated slideInDown">BIRTHDAY BLITZ</h1>
                                        <p className="text-light fs-5 mb-4 pb-3">Chúng tôi tự hào là đối tác đáng tin cậy trong việc tổ chức tiệc sinh nhật, tạo nên những khoảnh khắc đặc biệt và ngọt ngào, để bữa tiệc trở thành kỷ niệm không thể quên.</p>
                                        <a href="aboutus" className="btn btn-primary rounded-pill py-3 px-5">TÌM HIỂU THÊM</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NavbarCustomer;
