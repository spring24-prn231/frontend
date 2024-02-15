import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Manager from './pages/manager/Manager';
import Dashboard from "./components/manager/dashboard/Dashboard";
import Plan from "./components/manager/plan/Plan";
import PlanEdit from "./components/manager/plan-edit/PlanEdit";
import User from "./components/manager/user/User";
import UserEdit from "./components/manager/user-edit/UserEdit";
import PlanNew from "./components/manager/plan-new/PlanNew";

function App() {
    return (
        <Router basename='/'>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/home' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/manager' element={<Manager />}>
                    <Route path='' element={<Dashboard />} />
                    <Route path='dashboard' element={<Dashboard />} />
                    <Route path='plan' element={<Plan />} />
                    <Route path='plan/new' element={<PlanNew/>} />
                    <Route path="plan/:planId" element={<PlanEdit />} />
                    <Route path="user" element={<User />} />
                    <Route path="user/:userId" element={<UserEdit />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
