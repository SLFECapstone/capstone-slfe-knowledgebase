import React, { Component } from 'react'
import Navbar from '../PageComponents/Navbar'
import RegisterForm from '../PageComponents/RegisterForm'
import Footer from '../PageComponents/Footer'

class register extends Component {
  componentDidMount() {
    document.title = "Register";
  }

  render() {
    return (
      <div >
      	<Navbar />
      	<RegisterForm />
      	<Footer />
      </div>
    )
  }
}

export default register;
