import React from "react";
import Image from 'next/image';
import "../../styles/auth.css";
import AuthSvg from '../../assets/Auth_svg.svg';
import Facebook from '../../assets/facebook.svg';
import Linkedin from '../../assets/linkedin.svg';
import Google from '../../assets/google.svg'


interface LoginFormProps { }

interface LoginFormState {
    isLoginMode: boolean;
}

class LoginForm extends React.Component<LoginFormProps, LoginFormState> {

    constructor(props: LoginFormProps) {
        super(props);
        this.state = {
            isLoginMode: true, 
        };
    }

    handleSignup = () => {
        this.setState({ isLoginMode: false });
    };

    handleLogin = () => {
        this.setState({ isLoginMode: true });
    };

    handleSignupClick = () => {
        this.handleSignup();
        const loginForm = document.querySelector("form.login") as HTMLFormElement | null;
        const loginText = document.querySelector(".title-text .login") as HTMLDivElement | null;
        if (loginForm && loginText) {
            loginForm.style.marginLeft = "-50%";
            loginText.style.marginLeft = "-50%";
        }
    };

    handleLoginClick = () => {
        this.handleLogin();
        const loginForm = document.querySelector("form.login") as HTMLFormElement | null;
        const loginText = document.querySelector(".title-text .login") as HTMLDivElement | null;
        if (loginForm && loginText) {
            loginForm.style.marginLeft = "0%";
            loginText.style.marginLeft = "0%";
        }
    };

    handleSignupLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const signupBtn = document.querySelector("label.signup") as HTMLLabelElement | null;
        if (signupBtn) {
            signupBtn.click();
        }
    };

    render() {
        return (
            <div className="wrapper">
                <div className="signupPageSvg"><Image src={AuthSvg} height={427} alt="Not found" /></div>
                <div className="signupPageForm">
                    <div className="title-text">
                        <div className="title login">Login Form</div>
                        <div className="title signup">Signup Form</div>
                    </div>
                    <div className="social-container">
                        <a href="#" className="social"><Image src={Facebook} height={30} alt="Not found" /></a>
                        <a href="#" className="social"><Image src={Google} height={30} alt="Not found" /></a>
                        <a href="#" className="social"><Image src={Linkedin} height={30} alt="Not found" /></a>
                    </div>
                    <div className="guide">{this.state.isLoginMode ? "or use your account" : "or use your email for registartion"}</div>
                    <div className="form-container">
                        <div className="slide-controls">
                            <input type="radio" name="slide" id="login" defaultChecked />
                            <input type="radio" name="slide" id="signup" />
                            <label htmlFor="login" className="slide login" onClick={this.handleLoginClick}>
                                Login
                            </label>
                            <label htmlFor="signup" className="slide signup" onClick={this.handleSignupClick}>
                                Signup
                            </label>
                            <div className="slider-tab"></div>
                        </div>
                        <div className="form-inner">
                            <form action="#" className="login">
                                <div className="field">
                                    <input type="text" placeholder="Email Address" required />
                                </div>
                                <div className="field">
                                    <input type="password" placeholder="Password" required />
                                </div>
                                <div className="pass-link">
                                    <a href="#">Forgot password?</a>
                                </div>
                                <div className="field btn">
                                    <div className="btn-layer"></div>
                                    <input type="submit" value="Login" />
                                </div>
                                <div className="signup-link">
                                    Not a member?{" "}
                                    <a href="" onClick={this.handleSignupLinkClick}>
                                        Signup now
                                    </a>
                                </div>
                            </form>
                            <form action="#" className="signup">
                                <div className="field">
                                    <input type="text" placeholder="Email Address" required />
                                </div>
                                <div className="field">
                                    <input type="password" placeholder="Password" required />
                                </div>
                                <div className="field">
                                    <input type="password" placeholder="Confirm password" required />
                                </div>
                                <div className="field btn">
                                    <div className="btn-layer"></div>
                                    <input type="submit" value="Signup" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginForm;
