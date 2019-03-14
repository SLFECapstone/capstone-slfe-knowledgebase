import React, { Component } from 'react'
import Navbar from '../PageComponents/Navbar'
import Tabs from "../PageComponents/SolutionTab";
import Footer from '../PageComponents/Footer'

class addSolution extends Component {
  componentDidMount() {
    document.title = "Add Solution";
  }

  render() {
    return (
      <div >
        <Navbar />
        <h1>Add New Solution</h1> 
        <br />
        <Tabs showCancelBtn={true} showSaveBtn={true}>
          <div label="Tab 1">
            <h2>Form 1</h2>
            <label for="txtName">Name</label> <br />
            <input type="text"></input>
          </div>
          <div label="Tab 2">
            <h2>Form 2</h2>
          </div>
          <div label="Tab 3">
            <h2>Form 3</h2>
          </div>            
        </Tabs>
        <br />
        <center>
          {/* <button type="button">Cancel</button>
          <button type="submit">Save</button> */}
        </center>
        
        <br /> <br /> <br /> <br />
      <Footer />
      </div>
    )
  }
}

export default addSolution;
