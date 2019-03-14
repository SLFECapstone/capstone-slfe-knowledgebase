import React, { Component } from 'react'
import Navbar from '../PageComponents/Navbar'
import LoginForm from '../PageComponents/LoginForm'
import Footer from '../PageComponents/Footer'

class login extends Component {
  componentDidMount() {
    document.title = "Login";
  }

  render() {
    return (
      <div >
      	<Navbar />
      	<LoginForm />
      	<Footer />
      </div>
    )
  }
}

export default login;
