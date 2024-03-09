import React, {useEffect, useRef } from 'react'
import '../common/customer-css/style.css'
import '../common/customer-css/bootstrap.min.css'
import carousel1 from '../../assets/landing-page/panel1.jpg'
import { Link } from 'react-router-dom'
const NavbarCustomer = () => {
    const initialized = useRef(false)
    useEffect(() => {
        if (!initialized.current) {
            initialized.current = true
            var listPage = ["aboutus", "service", "cook-table"]
            var page = window.location.pathname.split("/").pop();
            if (page == "") {
                document.getElementById("main").classList.add("active")
            }
            listPage.forEach(function(item){
                if (item == page) {
                     document.getElementById(page).classList.add("active")
                }

            });
            
          }


    }, []);

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark fixed-top py-lg-0 px-lg-5 wow fadeIn" data-wow-delay="0.1s">
                <Link to="index.html" className="navbar-brand ms-4 ms-lg-0">
                    <h1 className="text-primary m-0">TIỆC SINH NHẬT</h1>
                </Link>
                <button type="button" className="navbar-toggler me-4" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <div className="navbar-nav mx-auto p-4 p-lg-0">
                        <Link id="main" to="index.html" className="nav-item nav-link">Trang chủ</Link>
                        <Link id="aboutus" to="/manager/feedback" className="nav-item nav-link">Về chúng tôi</Link>
                        <Link id="service" to="service.html" className="nav-item nav-link">Dịch vụ</Link>
                        <Link id="cook-table" to="product.html" className="nav-item nav-link">Thực đơn</Link>
                        {/* <div className="nav-item dropdown">
                        <Link to="https://mail.google.com/mail/u/0/" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Pages</Link>
                        <div className="dropdown-menu m-0">
                            <Link to="team.html" className="dropdown-item">Đội ngũ</Link>
                            <Link to="testimonial.html" className="dropdown-item">Vãi chưởng</Link>
                            <Link to="404.html" className="dropdown-item">404 Page</Link>
                        </div>
                    </div> */}
                        <Link to="contact.html" className="nav-item nav-link">Liên hệ</Link>
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
                                        <h1 className="display-1 text-light mb-4 animated slideInDown">TỔ CHỨC SINH NHẬT</h1>
                                        <p className="text-light fs-5 mb-4 pb-3">Chúng tôi tự hào là đối tác đáng tin cậy trong việc tổ chức tiệc sinh nhật, tạo nên những khoảnh khắc đặc biệt và ngọt ngào, để bữa tiệc trở thành kỷ niệm không thể quên.</p>
                                        <a href="" className="btn btn-primary rounded-pill py-3 px-5">TÌM HIỂU THÊM</a>
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
