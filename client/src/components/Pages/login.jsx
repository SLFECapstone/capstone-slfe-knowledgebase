import React, { Component } from 'react'
import LoginForm from '../PageComponents/LoginForm'

class login extends Component {
  componentDidMount() {
    document.title = "SLFE - Login";
  }

  render() {
    return (
      <div >
      	<LoginForm />
      </div>
    )
  }
}

export default login;
