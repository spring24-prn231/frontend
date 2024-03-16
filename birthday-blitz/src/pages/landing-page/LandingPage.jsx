import React, {useEffect, useState} from 'react'
import panelSection1 from '../../assets/landing-page/panel2.jpg'
import panelSection2 from '../../assets/landing-page/panel3.jpg'
import {getCountOrders, getCountRooms, getCountCapacities} from  '../apis/homeService';

const LandingPage = () => {
    const [countOrders, setCountOrders] = useState(0);
    const [countRooms, setCountRooms] = useState('');
    const [countCapacities, setCountCapacities] = useState('');
    useEffect(() => {
        //count Order
        const callCountOrders = async () => {
            const res = await getCountOrders(false);

            return res;
        };

        callCountOrders().then(res => {
            setCountOrders(res);
        })

        // count Rooms
        const callCountRooms = async () => {
            const res = await getCountRooms(false);
            return res;
        };

        callCountRooms().then(res => {
            setCountRooms(res);
        })

        // count Capacities
        const callCountCapacities = async () => {
            const res = await getCountCapacities(false);
            return res;
        };

        callCountCapacities().then(res => {
            setCountCapacities(res);
        })

    })
    return (
        <div className="main-content">
            <div className="container-xxl py-6">
                <div className="container">
                    <div className="row g-4">
                        <div className="col-lg-4 col-md-6 wow fadeIn" data-wow-delay="0.1s">
                            <div className="fact-item bg-light rounded text-center h-100 p-5">
                                <i className="fa fa-certificate fa-4x text-primary mb-4"></i>
                                <p className="mb-2">Đã tổ chức</p>
                                <h1 className="display-5 mb-0" data-toggle="counter-up">{countOrders} tiệc</h1>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 wow fadeIn" data-wow-delay="0.3s">
                            <div className="fact-item bg-light rounded text-center h-100 p-5">
                                <i className="fa fa-users fa-4x text-primary mb-4"></i>
                                <p className="mb-2">Số lượng phòng</p>
                                <h1 className="display-5 mb-0" data-toggle="counter-up">{countRooms} phòng</h1>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 wow fadeIn" data-wow-delay="0.7s">
                            <div className="fact-item bg-light rounded text-center h-100 p-5">
                                <i className="fa fa-cart-plus fa-4x text-primary mb-4"></i>
                                <p className="mb-2">Sức chứa</p>
                                <h1 className="display-5 mb-0" data-toggle="counter-up"> Trên {countCapacities}&nbsp;người</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-xxl py-6">
                <div className="container">
                    <div className="row g-5">
                        <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
                            <div className="row img-twice position-relative h-100">
                                <div className="col-6">
                                    <img className="img-fluid rounded" src={panelSection1} alt="" />
                                </div>
                                <div className="col-6 align-self-end">
                                    <img className="img-fluid rounded" src={panelSection2} alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.5s">
                            <div className="h-100">
                                <p className="text-primary text-uppercase mb-2">Về Chúng Tôi</p>
                                <h1 className="display-6 mb-4">Sáng Tạo Hạnh Phúc - Nơi Hội Tụ Niềm Vui và Bữa Tiệc Sinh Nhật Độc Đáo</h1>
                                <p>Chúng tôi là đội ngũ chuyên nghiệp và sáng tạo tại [Tên Công Ty], chuyên tổ chức những bữa tiệc sinh nhật tuyệt vời. Với tầm nhìn đầy ý tưởng mới lạ và tâm huyết không ngừng, chúng tôi cam kết mang đến cho khách hàng trải nghiệm tiệc sinh nhật độc đáo, ấn tượng và đáng nhớ. Hãy để chúng tôi biến mọi ý tưởng của bạn thành hiện thực và tạo nên những khoảnh khắc đặc biệt trong cuộc sống của bạn.</p>
                                <div className="row g-2 mb-4">
                                    <div className="col-sm-6">
                                        <i className="fa fa-check text-primary me-2"></i>Âm Thanh
                                    </div>
                                    <div className="col-sm-6">
                                        <i className="fa fa-check text-primary me-2"></i>Sân khấu
                                    </div>
                                    <div className="col-sm-6">
                                        <i className="fa fa-check text-primary me-2"></i>Đặt lịch trực tuyến
                                    </div>
                                    <div className="col-sm-6">
                                        <i className="fa fa-check text-primary me-2"></i>Đội ngũ tổ chức
                                    </div>
                                </div>
                                <a className="btn btn-primary rounded-pill py-3 px-5" href="">Xem thêm</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default LandingPage;