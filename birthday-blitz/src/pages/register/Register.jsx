import React from 'react'
import '../login/Login.css'

const Register = () => {
    return (
        <div class="login-container">
            <div class="login-form">

                <ul class="login-tab-group">
                    <li class="login-tab"><a className='login-link' href="/login">Log In</a></li>
                    <li class="login-tab login-active"><a className='login-link' href="/register">Sign Up</a></li>
                </ul>

                <div>
                    <h1 className='login-header'>Sign Up for Free</h1>

                    <form>
                        <div class="login-top-row">
                            <div class="login-field-wrap">
                                <input className='login-input' type="text" placeholder='First Name*' required autocomplete="off" />
                            </div>

                            <div class="login-field-wrap">
                                <input className='login-input' type="text" placeholder='Last Name*' required autocomplete="off" />
                            </div>
                        </div>

                        <div class="login-field-wrap">
                            <input className='login-input' type="email" placeholder='Email Address*' required autocomplete="off" />
                        </div>

                        <div class="login-field-wrap">
                            <input className='login-input' type="password" placeholder='Set A Password*' required autocomplete="off" />
                        </div>

                        <button type="submit" class="login-button login-button-block" >Get Started</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register
