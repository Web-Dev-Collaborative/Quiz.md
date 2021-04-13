import "./styles.css";
import SocialLogins from "../SocialLogins";
import PortfolioNavigator from "../PortfolioNavigator";
import React from "react";
import LoginForm from "../Forms/SignInForm";
import SignUpForm from "../Forms/SignUpForm";

const LoginPage = ({ setAuthenticated }) => {
	return (
		<>
			<div>

      <img className='background-img' alt='' src='https://images.pexels.com/photos/5088017/pexels-photo-5088017.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'/>
			<div className="login-wrap">
				<div className="login-html">
					<div className="login-title">Quizs.md</div>
					<input
						id="tab-1"
						type="radio"
						name="tab"
						className="sign-in"
						defaultChecked
						/>
					<label htmlFor="tab-1" className="tab__login ">
						Sign In
					</label>
					<input id="tab-2" type="radio" name="tab" className="sign-up" />
					<label htmlFor="tab-2" className="tab__login  ">
						Sign Up
					</label>
					<div className="login-form">
						<div className="sign-in-htm">
							<LoginForm setAuthenticated={setAuthenticated} />
						</div>
						<div className="sign-up-htm">
							<SignUpForm />
							{/* <div className="hr"></div> */}
						</div>
					</div>
							{/* <SocialLogins type="Signup" facebook=" with Facebook" /> */}
							<PortfolioNavigator />
				</div>
			</div>
						</div>
		</>
	);
};

export default LoginPage;
