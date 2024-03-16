import React from 'react';
import './MenuCustomer.css'
import '../common/customer-css/bootstrap.min.css'
import menu_img from '../../assets/menu/menu.jpg'
import { CheckBox } from '@mui/icons-material';
const MenuCustomer = () => {
    return (
        <div className="menu-customer">
            <div className="container-xxl py-6">
                <div className="container">
                    <h1 className="display-6 mb-4 center-title">THỰC ĐƠN</h1>
                    <p className='mb-0 font-menu'>- Khám phá thế giới ẩm thực của chúng tôi là hành trình của sự sáng tạo
                        và sự hòa quyện giữa các hương vị đặc trưng.</p>
                    <br></br>
                    <p className='mb-0 font-menu'>- Không chỉ là nơi để thưởng thức các món ăn ngon, nhà hàng của chúng tôi
                        còn là không gian tận hưởng và chia sẻ niềm đam mê ẩm thực cùng bạn bè và gia đình.</p>
                    <div class="wrapper d-flex align-items-stretch">


                        {/* <!--  Side Navigation  --> */}
                        <nav id="sidebar" className='col-lg-2'>
                            <div class="custom-menu">
                                <h5>Quy trình</h5>
                            </div>
                            <ul class="list-unstyled components">
                                <li><button className='btn btn-primary rounded-pill button-custom'>Nav 1</button></li>
                                <li><button className='btn btn-primary rounded-pill button-custom'>Nav 2</button></li>
                                <li><button className='btn btn-primary rounded-pill button-custom'>Nav 3</button></li>
                                <li><button className='btn btn-primary rounded-pill button-custom'>Nav 4</button></li>
                                <li><button className='btn btn-primary rounded-pill button-custom'>Nav 5</button></li>
                                <li><button className='btn btn-primary rounded-pill button-custom'>Nav 6</button></li>
                                <li><button className='btn btn-primary rounded-pill button-custom'>Nav 7</button></li>
                            </ul>

                        </nav>
                     

                        <div id="content"  className="col-lg-10 scrollable-table-wrapper">

                            <table class="table">
                                <thead>
                                    <tr>
                                        <th scope="col" style={{ backgroundColor: '#EAA636', zIndex: '100'}}><h5>Thực đơn</h5></th>
                                    </tr>
                                </thead>
                                <tbody className='' >
                                    <tr className='row-container'>
                                        <img src="https://genex.com.vn/wp-content/uploads/2023/03/Coc-tru-thuc-an-cho-be-FB0010N-3-200x200.jpg" className='col-lg-3' style={{ width: '200px', height: '200px' }}>

                                        </img>
                                        <div className='col-lg-9 '>
                                            <div className='row-content-header'>
                                                <h5 className='col-lg-9'>Món A A A A A</h5>
                                                <div className='col-lg-3'>
                                                    <h5 className=''>Giá: 5000000 vnđ</h5>
                                                    <h5 className=''>Chọn:<input className='margin-checkbox' type='checkbox'></input> </h5> 
                                                </div>
                                            </div>
                                            <div className='row-content-body'>
                                                <p>Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá G
                                                    iá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá
                                                    Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá
                                                    Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá
                                                    Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá
                                                    Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá
                                                    Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá G
                                                    iá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá
                                                    Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá
                                                    Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá
                                                    Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá
                                                    Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá
                                                    Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá </p>
                                            </div>

                                        </div>

                                    </tr>

                                    <tr className='row-container'>
                                        <img src="https://product.hstatic.net/1000217401/product/beautypro_cat1_1_c1b6e3c712a645efbabc19c802fa8cfa.png" className='col-lg-3' style={{ width: '200px', height: '200px' }}>

                                        </img>
                                        <div className='col-lg-9 '>
                                            <div className='row-content-header'>
                                                <h5 className='col-lg-9'>Món A A A A A</h5>
                                                <div className='col-lg-3'>
                                                    <h5 className=''>Giá: 5000000 vnđ</h5>
                                                    <h5 className=''>Số lượng: 10</h5>
                                                </div>
                                            </div>
                                            <div className='row-content-body'>
                                                <p>Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá G
                                                    iá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá
                                                    Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá
                                                    Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá
                                                    Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá
                                                    Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá
                                                    Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá G
                                                    iá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá
                                                    Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá
                                                    Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá
                                                    Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá
                                                    Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá
                                                    Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá Giá </p>
                                            </div>
                                        </div>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>

                    <img className="center-img" src={menu_img} />
                </div>
            </div>
        </div>
    );

};
export default MenuCustomer;
