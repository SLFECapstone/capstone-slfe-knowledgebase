import React, { Component } from 'react';
import Linkify from 'react-linkify';

class DataTable2 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      array: [],
      update: true,
    }
  }

  componentDidMount() {
    this.setState = {
      array: this.props.array,
      update: false,
    }
  }

  render() {

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

    return (

      <Linkify>
        <table style={table}>
          <thead>
            <tr>
              <th style={th}><strong>ID</strong></th>
              <th style={th}><strong>Name</strong></th>
              <th style={th}><strong>Organization</strong></th>
              <th style={th}><strong>Basic Description</strong></th>
              <th style={th}><strong>Primary Domain</strong></th>
              <th style={th}><strong>Solution Type</strong></th>
              <th style={th}><strong>References</strong></th>

            </tr>
          </thead>
          <tbody >
            {this.props.array.map((solution) =>
              <tr key={solution._id}>
                <td style={td}>{solution.ID}</td>
                <td style={td}>{solution.Name}</td>
                <td style={td}>{solution["Responsible Organization"]}</td>
                <td style={td}>{solution["General Description"]}</td>
                <td style={td}>{solution["Primary Domain"]}</td>
                <td style={td}>{solution["Solution Type"]}</td>
                <td style={td}>{solution.References}</td>
              </tr>
            )}
          </tbody>
        </table>
      </Linkify>

    )
  }
};

export default DataTable2;