import React, { useRef, useState } from 'react'
import '../login/Login.css'
import { register } from '../../apis/loginService';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
    const [user, setUser] = useState({
        userName: '',
        email: '',
        fullname: '',
        phoneNumber: '',
        password: ''
    });

    const navigate = useNavigate();

    const form = useRef();

    const validate = (password) => {
        const regrex = /^(?=.*[^a-zA-Z0-9])(?=.*\d)(?=.*[A-Z]).+$/;
        if (regrex.test(password)) {
            return true;
        }
        else {
            toast.error(`Mật khẩu phải có ít nhất một ký tự không phải là chữ hoặc số.
                        Mật khẩu phải có ít nhất một chữ số ('0'-'9').
                        Mật khẩu phải có ít nhất một chữ hoa ('A'-'Z').`, {
                position: "top-center"
            });
        }
    }

    const onRegister = (e) => {
        e.preventDefault();
        if (form.current.reportValidity() && validate(user.password)) {
            register(user).then(res => {
                toast.success("Đăng kí thành công !!!", {
                    position: "top-center"
                });
                setTimeout(() => {
                    navigate('/login');
                }, 1000);
            }).catch(err => {
                console.log(err);
                toast.error("Đăng kí thất bại !!!", {
                    position: "top-center"
                });
            });
        }
    }

    return (
        <div class="login-container">
            <div class="login-form">
                <ToastContainer />
                <ul class="login-tab-group">
                    <li className="login-tab"><Link to="/login" className='login-link'>Đăng nhập</Link></li>
                    <li className="login-tab login-active"><Link to="/register" className='login-link'>Đăng ký</Link></li>
                </ul>

                <div>
                    <h1 className='login-header'>Đăng ký miễn phí</h1>

                    <form ref={form}>
                        <div class="login-field-wrap">
                            <input className='login-input' type="text"
                                value={user.userName}
                                onChange={(e) => setUser({ ...user, userName: e.target.value })}
                                placeholder='Tên đăng nhập*' required autocomplete="off" />
                        </div>

                        <div class="login-field-wrap">
                            <input className='login-input' type="password"
                                value={user.password}
                                onChange={(e) => setUser({ ...user, password: e.target.value })}
                                placeholder='Nhập mật khẩu*' required autocomplete="off" />
                        </div>

                        <div class="login-field-wrap">
                            <input className='login-input' type="text"
                                value={user.fullname}
                                onChange={(e) => setUser({ ...user, fullname: e.target.value })}
                                placeholder='Họ và tên*' required autocomplete="off" />
                        </div>
                        <div class="login-field-wrap">
                            <input className='login-input' type="email"
                                value={user.email}
                                onChange={(e) => setUser({ ...user, email: e.target.value })}
                                placeholder='Email*' required autocomplete="off" />
                        </div>
                        <div class="login-field-wrap">
                            <input className='login-input' type="number"
                                value={user.phoneNumber}
                                onChange={(e) => setUser({ ...user, phoneNumber: e.target.value })}
                                placeholder='Số điện thoại*' required autocomplete="off" />
                        </div>
                        <button type="submit" class="login-button login-button-block" onClick={(e) => onRegister(e)}>Bắt đầu</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register
