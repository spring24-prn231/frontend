import React, { useState } from 'react';
import './Login.css'; // Import custom CSS for LoginForm
import { login } from '../../apis/loginService';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { getRole } from '../../utils/JwtParser';
import {Link, useNavigate} from "react-router-dom";

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const onClickLogin = async () => {
        const data = await login(username, password).then(res => {
            toast.success("Login success !!!", {
                position: "top-center"
            });
            localStorage.setItem("AccessToken", res.data.data.accessToken);
            localStorage.setItem("RefreshToken", res.data.data.refreshToken);
            const role = getRole();
            let route = '/';
            if (role === 'ADMIN') {
                route = 'manager';
            }
            else {
                route = 'customer';
            }
            window.location.replace("/manager");
            return res.data;
        }).catch(error => {
            console.log(error);
            toast.error("Wrong username or password!!!", {
                position: "top-center"
            });
        });

    }

    return (
        <div className='login-container'>
            <ToastContainer />
            <div className="login-form">
                <ul className="login-tab-group">
                    <li className="login-tab login-active"><Link to="/login" className='login-link'>Đăng nhập</Link></li>
                    <li className="login-tab"><Link to="/register" className='login-link'>Đăng ký</Link></li>
                </ul>
                <div>
                    <h1 className='login-header'>Chào mừng bạn quay lại!</h1>
                    <div>
                        <div className="login-field-wrap">
                            <input className='login-input' type="text" placeholder='Tên đăng nhập*'
                                onChange={(e) => setUsername(e.target.value)}
                                required autoComplete="off" />
                        </div>
                        <div className="login-field-wrap">
                            <input className='login-input' type="password"
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder='Mật khẩu*' required autoComplete="off" />
                        </div>
                        <p className="login-forgot"><a className='login-link' href="#">Quên mật khẩu?</a></p>
                        <button className="login-button login-button-block" onClick={onClickLogin}>Đăng nhập</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
