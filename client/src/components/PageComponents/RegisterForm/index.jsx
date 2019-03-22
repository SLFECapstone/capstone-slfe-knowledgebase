import React, {Component} from 'react'

class RegisterForm extends Component
{
	render() {
		return(
			<div id="register_container" className="form_input">
				<form>
					<label htmlFor="firstname">First Name:</label>
					<input type="text" id="first_name" name="first_name"/>

					<label htmlFor="lastname">Last Name:</label>
					<input type="text" id="last_name" name="last_name"/>

					<label htmlFor="email">Email Address:</label>
					<input type="text" id="email" name="email"/>

					<label htmlFor="user">User:</label>
					<input type="text" id="user" name="user"/>

					<label htmlFor="password">Password:</label>
					<input type="password" id="password" name="password"/>

					<div id="register_bottom">
						<input type="submit" value="register"/>
					</div>
				</form>
			</div>
			
		);
	}
}

export default RegisterForm
