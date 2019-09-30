import React, { Component } from "react";
import { connect } from "react-redux";
import { loginFunc } from "../../../actions/userActions";
import { withRouter } from 'react-router-dom'

class LoginForm extends Component
{
	constructor(props) {
		super(props);
		this.onChangeUserName = this.onChangeUserName.bind(this);
		this.onChangePassword = this.onChangePassword.bind(this);
		this.onSubmit = this.onSubmit.bind(this);

		this.state = {
			username: '',
			password: ''
		}
	}

	onChangeUserName(e) {
		this.setState({
			username: e.target.value
		});
	}

	onChangePassword(e) {
		this.setState({
			password: e.target.value
		});
	}

	onSubmit(e) {
		e.preventDefault();
		
		const apiCall = this.props.loginFunc({ username: this.state.username, password: this.state.password });
		apiCall.then(data => {
			this.props.history.push('/');
		});
	}

  render() {
    return (
      <div id="login_form" className="form_input">
        <div className="signup-form">
					<form onSubmit={this.onSubmit}>
						<h2>Login to Your Account</h2>
						<div className="form-group">
							<div className="input-group">
								<span className="input-group-addon">
									<i className="fa fa-user"/>
								</span>
								<input
									type="text"
									className="form-control"
									name="username"
									placeholder="Username"
									required="required"
                  onChange={this.onChangeUserName}
								/>
							</div>
						</div>
						<div className="form-group">
							<div className="input-group">
								<span className="input-group-addon">
									<i className="fa fa-lock"/>
								</span>
								<input
									type="password"
									className="form-control"
									name="password"
									placeholder="Password"
									required="required"
                  onChange={this.onChangePassword}
								/>
							</div>
						</div>
						<div className="form-group">
							<button
								type="submit"
								className="btn btn-primary btn-block btn-lg">
									Login
							</button>
						</div>
					</form>
					<div className="text-center">
						Don't have an account? <a href="/register">Register now</a>.
					</div>
				</div>
			</div>
    );
  }
}

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated,
	user: state.user
});

export default withRouter(connect(
	mapStateToProps,
	{ loginFunc }
  )(LoginForm));
