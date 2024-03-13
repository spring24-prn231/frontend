import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/home/Home';
// import Navbar from './pages/navbar-customer/NavbarCustomer';
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
import UserEdit from "./components/manager/user-edit/UserEdit";
import PlanNew from "./components/manager/plan-new/PlanNew";
import Serivce from "./components/manager/service/Serivce";
import Voucher from "./components/manager/voucher/Voucher";
import VoucherEdit from "./components/manager/voucher-edit/VoucherEdit";
import Feedback from "./components/manager/feedback/Feedback";
import FeedbackEdit from "./components/manager/feedback-edit/FeedbackEdit";
import Room from "./components/manager/room/Room";
import RoomType from "./components/manager/room-type/RoomType";
import RoomEdit from "./components/manager/room-edit/RoomEdit";
import Order from "./components/manager/order/Order";
import OrderDetail from "./components/manager/order-detail/OrderDetail";

function App() {
    return (
        <Router basename='/'>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/home' element={<Home />} />


                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                {/* <Route path='/navbar' element={<Navbar />} />
                <Route path='/landing-page' element={<LandingPage />}/> */}
                <Route path='/customer' element={<Customer />}>
                    <Route path='' element={<LandingPage />} />
                    <Route path='aboutus' element={<AboutUs />} />
                </Route> 
                <Route path='/manager' element={<Manager />}>
                    <Route path='' element={<Dashboard />} />
                    <Route path='dashboard' element={<Dashboard />} />
                    <Route path='plan' element={<Plan />} />
                    <Route path='plan/new' element={<PlanNew/>} />
                    <Route path="plan/:planId" element={<PlanEdit />} />
                    <Route path="user" element={<User />} />
                    <Route path="voucher" element={<Voucher/>} />
                    <Route path="voucher/:voucherId" element={<VoucherEdit/>} />
                    <Route path="feedback" element={<Feedback/>} />
                    <Route path="feedback/:feedbackId" element={<FeedbackEdit/>} />
                    <Route path="room" element={<Room/>} />
                    <Route path="room-type" element={<RoomType/>} />
                    <Route path="room/:roomId" element={<RoomEdit/>} />
                    <Route path="order" element={<Order/>}/>
                    <Route path="order/:orderId" element={<OrderDetail/>} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
