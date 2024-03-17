import React from 'react'
import '../common/customer-css/style.css'
import '../common/customer-css/bootstrap.min.css'
import { Link } from 'react-router-dom'


const FooterCustomer = () => {
    return (
        <div className="container-fluid bg-dark text-light footer mb-0 py-5 wow fadeIn" data-wow-delay="0.1s">
        <div className="container py-5">
            <div className="row g-5">
                <div className="col-lg-6 col-md-6">
                    <h4 className="text-light mb-4">Địa Chỉ</h4>
                    <p className="mb-2"><i className="fa fa-map-marker-alt me-3"></i>10/76/59 Hoàng Hoa Thám, phường 7, quận Bình Thạnh</p>
                    <p className="mb-2"><i className="fa fa-phone-alt me-3"></i>+012 345 67890</p>
                    <p className="mb-2"><i className="fa fa-envelope me-3"></i>locttse160275@fpt.edu.vn</p>
                    <div className="d-flex pt-2">
                        <a className="btn btn-square btn-outline-light rounded-circle me-1" href=""><i className="fab fa-twitter"></i></a>
                        <a className="btn btn-square btn-outline-light rounded-circle me-1" href=""><i className="fab fa-facebook-f"></i></a>
                        <a className="btn btn-square btn-outline-light rounded-circle me-1" href=""><i className="fab fa-youtube"></i></a>
                        <a className="btn btn-square btn-outline-light rounded-circle me-0" href=""><i className="fab fa-linkedin-in"></i></a>
                    </div>
                </div>
                
                <div className="col-lg-3 col-md-6">
                    <h4 className="text-light mb-4">Tham khảo</h4>
                    <Link className="btn btn-link" to="aboutus">Về chúng tôi</Link>
                    <Link className="btn btn-link" to="service">Dịch vụ</Link>
                    <Link className="btn btn-link" to="aa">Liên hệ</Link>
                </div>
                
            </div>
        </div>
    </div>
    );
}
export default FooterCustomer;