import React from 'react'
import panelSection1 from '../../assets/landing-page/panel2.jpg'
import panelSection2 from '../../assets/landing-page/panel3.jpg'
import aboutus2 from '../../assets/aboutus/aboutus_3.jpg'
import aboutus1 from '../../assets/aboutus/aboutus_2.png'
const AboutUsCustomer = () => {
    return (
        <div id="about-us-content">

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
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-xxl py-6">
                <div className="container">
                    <div className="row g-5">
                        <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
                            <p className="text-primary text-uppercase mb-2">VỀ CHÚNG TÔI</p>
                            <h1 className="display-6 mb-4">Tầm Nhìn và Sứ Mệnh</h1>
                            <p className="mb-5">
                            Sứ mệnh của chúng tôi là tạo ra những bữa tiệc sinh nhật đặc sắc, biến mỗi dịp kỷ niệm thành kí ức không thể quên. 
                            Không chỉ tổ chức tiệc sinh nhật mà còn là những người đồng hành, 
                            đồng sáng tạo cùng khách hàng với tinh thần tận tâm và chuyên nghiệp, 
                            hướng đến việc tạo nên những bữa tiệc độc đáo.
                            </p>
                            <div className="row gy-5 gx-4">
                               
                                <div className="col-sm-6 wow fadeIn" data-wow-delay="0.2s">
                                    <div className="d-flex align-items-center mb-3">
                                        <div className="flex-shrink-0 btn-square bg-primary rounded-circle me-3">
                                            <i className="fa fa-music text-white"></i>
                                        </div>
                                        <h5 className="mb-0">Âm thanh</h5>
                                    </div>
                                    <span>Âm thanh tinh tế và chuyên nghiệp của đội ngũ chúng tôi là chìa khóa để tạo nên không gian âm nhạc hoàn hảo cho mọi dự án và sự kiện.</span>
                                </div>
                                <div className="col-sm-6 wow fadeIn" data-wow-delay="0.2s">
                                    <div className="d-flex align-items-center mb-3">
                                        <div className="flex-shrink-0 btn-square bg-primary rounded-circle me-3">
                                            <i className="fa fa-landmark text-white"></i>
                                        </div>
                                        <h5 className="mb-0">Sân khấu</h5>
                                    </div>
                                    <span>Với đội ngũ sân khấu chuyên nghiệp, chúng tôi tự hào mang đến không gian sự kiện hoàn hảo, kết hợp sự sáng tạo và chất lượng để làm nổi bật mọi trải nghiệm.</span>
                                </div>
                                <div className="col-sm-6 wow fadeIn" data-wow-delay="0.3s">
                                    <div className="d-flex align-items-center mb-3">
                                        <div className="flex-shrink-0 btn-square bg-primary rounded-circle me-3">
                                            <i className="fa fa-calendar-week text-white"></i>
                                        </div>
                                        <h5 className="mb-0">Đặt lịch trực tuyến</h5>
                                    </div>
                                    <span>Quá trình đặt lịch trực tuyến được thiết kế để đơn giản hóa và tiết kiệm thời gian, giúp bạn dễ dàng lựa chọn và xác nhận dịch vụ một cách nhanh chóng và thuận tiện.</span>
                                </div>
                                <div className="col-sm-6 wow fadeIn" data-wow-delay="0.4s">
                                    <div className="d-flex align-items-center mb-3">
                                        <div className="flex-shrink-0 btn-square bg-primary rounded-circle me-3">
                                            <i className="fa fa-user-tie text-white"></i>
                                        </div>
                                        <h5 className="mb-0">Đội ngũ tổ chức</h5>
                                    </div>
                                    <span>Chúng tôi tự hào có đội ngũ tổ chức chuyên nghiệp, luôn cam kết mang đến sự kiện hoàn hảo với sự chăm sóc và chi tiết tận tâm.</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.5s">
                            <div className="row img-twice position-relative h-100">
                                <div className="col-6">
                                    <img className="img-fluid rounded" src={aboutus1} alt="" />
                                </div>
                                <div className="col-6 align-self-end">
                                    <img className="img-fluid rounded" src={aboutus2} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )


}
export default AboutUsCustomer;
