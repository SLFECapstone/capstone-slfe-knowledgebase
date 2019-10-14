import React, { Component } from 'react'
import RegisterForm from '../PageComponents/RegisterForm'

class register extends Component {
  componentDidMount() {
    document.title = "SLFE - Registration";
  }

  render() {
    return (
      <div >
      	<RegisterForm />
      </div>
    )
  }
}

export default register;
