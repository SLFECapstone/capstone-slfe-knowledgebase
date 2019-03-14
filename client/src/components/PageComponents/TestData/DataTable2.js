import React, { Component } from 'react';

class DataTable2 extends Component{
  constructor(props){
    super(props)
    this.state = {
      array: this.props.array,
      update: true
    }
  }

  componentDidMount(){
    this.setState = {
      array: this.props.array,
      update: false
    }
  }

  render(){

    const table = {
      border: "1px solid black", 
    }
    const td = {
      border: "1px solid black", 
      padding: '10px'
    }
    const th = {
      border: "1px solid black", 
      padding: '10px',
    }

    return(
      <div>
        <table style={table}>
                <thead>
                  <tr>
                    <th style={th}><strong>Name</strong></th>
                    <th style={th}><strong>Organization</strong></th>
                    <th style={th}><strong>Basic Description</strong></th>
                    <th style={th}><strong>Primary Domain</strong></th>
                    <th style={th}><strong>Solution Type</strong></th>
                  </tr>
                </thead>
                <tbody >
                  
                {this.props.array.map(({_id, Name, Organization, Basic_Description_, Primary_Domain, Solution_Type}) => (
                  <tr key={_id}>
                    <td style={td}>{Name}</td>
                    <td style={td}>{Organization}</td>
                    <td style={td}>{Basic_Description_}</td>
                    <td style={td}>{Primary_Domain}</td>
                    <td style={td}>{Solution_Type}</td>
                  </tr>
                ))}
                  
                </tbody>
        </table>
      </div>
    )
  }
};

export default DataTable2;