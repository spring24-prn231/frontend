import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/home/Home';
// import Navbar from './pages/navbar-customer/NavbarCustomer';
import Combo from "./pages/combo/Combo"
import PreviewOrder from "./pages/preview-order/PreviewOrder";
import ServiceCustomer from "./pages/service-customer/ServiceCustomer";
import ContactCustomer from "./pages/contact-customer/ContactCustomer";
import AboutUs from "./pages/about-us-customer/AboutUsCustomer";
import LandingPage from './pages/landing-page/LandingPage';
import Customer from './pages/customer-page/CustomerPage';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Manager from './pages/manager/Manager';
import Dashboard from "./components/manager/dashboard/Dashboard";
import Plan from "./components/manager/plan/Plan";
import PlanEdit from "./components/manager/plan-edit/PlanEdit";
import User from "./components/manager/user/User";
import PlanNew from "./components/manager/plan-new/PlanNew";
import Voucher from "./components/manager/voucher/Voucher";
import VoucherEdit from "./components/manager/voucher-edit/VoucherEdit";
import Feedback from "./components/manager/feedback/Feedback";
import FeedbackEdit from "./components/manager/feedback-edit/FeedbackEdit";
import Room from "./components/manager/room/Room";
import RoomType from "./components/manager/room-type/RoomType";
import RoomEdit from "./components/manager/room-edit/RoomEdit";
import Order from "./components/manager/order/Order";
import OrderDetail from "./components/manager/order-detail/OrderDetail";
import Menu from "./components/manager/menu/Menu";
import MenuEdit from "./components/manager/menu-edit/MenuEdit";
import Staff from "./components/manager/staff/Staff";
import StaffEdit from "./components/manager/staff-edit/StaffEdit";
import Food from "./components/manager/food/Food";
import FoodEdit from "./components/manager/food-edit/FoodEdit";
import { getRole } from "./utils/JwtParser";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import StaffPage from "./pages/staff/StaffPage";
import StaffOrder from "./components/staff/order/StaffOrder";
import StaffOrderDetail from "./components/staff/order-detail/StaffOrderDetail";
import StaffPlan from "./components/staff/plan/StaffPlan";
import StaffPlanEdit from "./components/staff/plan-edit/StaffPlanEdit";
import StaffMenu from "./components/staff/menu/StaffMenu";
import StaffMenuEdit from "./components/staff/menu-edit/StaffMenuEdit";

function App() {
    // useEffect(() => {
    //     setInterval(() => {
    //         getAllNotification('ADMIN').then(res => {
    //             toast.success(item.content, {
    //                 position: "top-right",
    //                 containerId: "noti"
    //             });
    //         })
    //     }, 8000);
    // }, []);

    return (
        <Router basename='/'>
            <ToastContainer containerId="noti" />
            <ToastContainer containerId="warning" />
            <ToastContainer containerId="status" />
            <Routes>
                <Route path='/' element={<Customer />} />
                <Route path='/home' element={<Customer />} />

                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                {/* <Route path='/navbar' element={<Navbar />} />
                <Route path='/landing-page' element={<LandingPage />}/> */}
                <Route path='/customer' element={<Customer />}>
                    <Route path='' element={<LandingPage />} />
                    <Route path='aboutus' element={<AboutUs />} />
                    <Route path='service' element={<ServiceCustomer />} />
                    <Route path='contact' element={<ContactCustomer />} />
        
                    <Route path='previeworder' element={<PreviewOrder />} />
                    <Route path='combo' element={<Combo />} />
                </Route> 
                {
                    getRole() !== 'ADMIN' ? '' :
                        <Route path='/manager' element={<Manager />}>
                            <Route path='' element={<Dashboard />} />
                            <Route path='dashboard' element={<Dashboard />} />
                            <Route path='plan' element={<Plan />} />
                            <Route path='plan/new' element={<PlanNew />} />
                            <Route path="plan/:planId" element={<PlanEdit />} />
                            <Route path="user" element={<User />} />
                            <Route path="voucher" element={<Voucher />} />
                            <Route path="voucher/:voucherId" element={<VoucherEdit />} />
                            <Route path="feedback" element={<Feedback />} />
                            <Route path="feedback/:feedbackId" element={<FeedbackEdit />} />
                            <Route path="room" element={<Room />} />
                            <Route path="room-type" element={<RoomType />} />
                            <Route path="room/:roomId" element={<RoomEdit />} />
                            <Route path="order" element={<Order />} />
                            <Route path="order/:orderId" element={<OrderDetail />} />
                            <Route path="menu" element={<Menu />} />
                            <Route path="menu/:menuId" element={<MenuEdit />} />
                            <Route path="staff" element={<Staff />} />
                            <Route path="staff/:staffId" element={<StaffEdit />} />
                            <Route path="food" element={<Food />} />
                            <Route path="food/:foodId" element={<FoodEdit />} />
                        </Route>
                }
                {
                    getRole() !== 'HOST_STAFF' ? '' :
                        <Route path="/staff" element={<StaffPage />}>
                            <Route path="" element={<StaffOrder />} />
                            <Route path="order" element={<StaffOrder />} />
                            <Route path="order/:orderId" element={<StaffOrderDetail />} />
                            <Route path="plan" element={<StaffPlan />} />
                            <Route path="plan/:planId" element={<StaffPlanEdit />} />
                            <Route path="menu" element={<StaffMenu />} />
                            <Route path="menu/:menuId" element={<StaffMenuEdit />} />
                        </Route>
                }
            </Routes>
        </Router>
    );
}

export default App;
