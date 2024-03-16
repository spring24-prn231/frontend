import React from 'react'
import '../login/Login.css'

const Register = () => {
    return (
        <div class="login-container">
            <div class="login-form">

                <ul class="login-tab-group">
                    <li class="login-tab"><a className='login-link' href="/login">Đăng nhập</a></li>
                    <li class="login-tab login-active"><a className='login-link' href="/register">Đăng ký</a></li>
                </ul>

                <div>
                    <h1 className='login-header'>Đăng ký miễn phí</h1>

                    <form>
                        <div class="login-top-row">
                            <div class="login-field-wrap">
                                <input className='login-input' type="text" placeholder='Họ*' required autocomplete="off" />
                            </div>

                            <div class="login-field-wrap">
                                <input className='login-input' type="text" placeholder='Tên*' required autocomplete="off" />
                            </div>
                        </div>

                        <div class="login-field-wrap">
                            <input className='login-input' type="text" placeholder='Tên đăng nhập*' required autocomplete="off" />
                        </div>

                        <div class="login-field-wrap">
                            <input className='login-input' type="password" placeholder='Nhập mật khẩu*' required autocomplete="off" />
                        </div>

                        <button type="submit" class="login-button login-button-block" >Bắt đầu</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register
