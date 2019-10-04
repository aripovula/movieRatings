import React, { Component } from "react";
import { Query, Mutation } from "react-apollo";
import { withRouter } from 'react-router-dom';

import { SIGNUP_USER, SIGNIN_USER } from "../queries/index";

export class SignForm extends Component {
	state = {
		email: "aa",
		password: "",
		password2: ""
	};

	handleChange = event => {
		const { name, value } = event.target;
		console.log(name, value);

		this.setState({ [name]: value });
	};

	handleSubmit = (event, signupUser) => {
		event.preventDefault();
        signupUser().then(data => {
            console.log(data);
            this.saveTokenToLocalSrorage(data.data.signupUser.token);
            this.clearState();
            this.props.history.push('/');
        });
	};

	handleSubmit2 = (event, signinUser) => {
		event.preventDefault();
        signinUser().then(data => {
            console.log(data);
            this.saveTokenToLocalSrorage(data.data.signinUser.token);
            this.clearState();
            this.props.history.push('/');
        });
    };
    
    saveTokenToLocalSrorage = (token) => {
        localStorage.setItem("token", token)
    }

	clearState = () => {
		this.setState({ email: "", password: "", password2: "" });
	};

	validateForm = () => {
		const { email, password, password2 } = this.state;
		return !email || !password || password.length < 4 || password != password2;
	};

	validateForm2 = () => {
		const { email, password } = this.state;
		return !email || !password || password.length < 4;
	};

	render() {
		const { email, password, password2 } = this.state;
		return (
			<div className="">
				<Mutation mutation={SIGNUP_USER} variables={{ email, password }}>
					{(signupUser, { data, loading, error }) => {
						return (
							<form onSubmit={event => this.handleSubmit(event, signupUser)}>
								SignUp
								<input
									type="text"
									name="email"
									placeholder="email"
									value={email}
									onChange={this.handleChange}
								/>
								<input
									type="text"
									name="password"
									placeholder="password"
									value={password}
									onChange={this.handleChange}
								/>
								<input
									type="text"
									name="password2"
									placeholder="confirm password"
									value={password2}
									onChange={this.handleChange}
								/>
								<button
									type="submit"
									className="button button1"
									disabled={loading || this.validateForm()}
								>
									Signup
								</button>
								{error && <p>{error.message}</p>}
							</form>
						);
					}}
				</Mutation>
				<br />
				<hr />
				<Mutation mutation={SIGNIN_USER} variables={{ email, password }}>
					{(signinUser, { data, loading, error }) => {
						return (
							<form onSubmit={event => this.handleSubmit2(event, signinUser)}>
								Login
								<input
									type="text"
									name="email"
									placeholder="email"
									value={email}
									onChange={this.handleChange}
								/>
								<input
									type="text"
									name="password"
									placeholder="password"
									value={password}
									onChange={this.handleChange}
								/>
								<button
									type="submit"
									className="button button1"
									disabled={loading || this.validateForm2()}
								>
									Login
								</button>
								{error && <p>{error.message}</p>}
							</form>
						);
					}}
				</Mutation>

				<p>
					{email}:{password}
				</p>
			</div>
		);
	}
}

export default withRouter(SignForm);
