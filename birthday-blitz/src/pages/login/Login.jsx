import React from 'react';
import './Login.css'; // Import custom CSS for LoginForm

const Login = () => {

    return (
        <div className='login-container'>
            <div class="login-form">
                <ul class="login-tab-group">
                    <li class="login-tab login-active"><a className='login-link' href="/login">Log In</a></li>
                    <li class="login-tab"><a className='login-link' href="/register">Sign Up</a></li>
                </ul>
                <div>
                    <h1 className='login-header'>Welcome Back!</h1>
                    <form>
                        <div class="login-field-wrap">
                            <input className='login-input' type="email" placeholder='Email Address*' required autocomplete="off" />
                        </div>
                        <div class="login-field-wrap">
                            <input className='login-input' type="password" placeholder='Password*' required autocomplete="off" />
                        </div>
                        <p class="login-forgot"><a className='login-link' href="#">Forgot Password?</a></p>
                        <button class="login-button login-button-block" >Log In</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
