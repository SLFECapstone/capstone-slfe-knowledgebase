import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getEnterprises, getDomains, getSolutions } from '../../../actions/enterpriseActions';
import propTypes from 'prop-types';
import DataTable2 from './DataTable2';

class CheckBox extends Component{
  constructor(){
    super();
    this.state = {
      array: [],
      reload: false
    }
  }

  componentWillMount(){
    this.props.getEnterprises();
    this.props.getDomains();
    this.props.getSolutions();
  }

  render(){
    const { enterprises } = this.props.enterpriseData;
    const { domains } = this.props.enterpriseData;
    const { solutions } = this.props.enterpriseData;

    if(!domains.length || !solutions.length || !enterprises.length){
      console.log("data loading\n");
      <span>Loading wells...</span>
      // return(<div><h1 style= {{position: 'absolute', top: '50%', left: '50%'}}>Data is loading</h1></div>)
    }
    else{
      console.log("done loading!")
      console.log("domains has: ", domains);
      console.log("solutions has: ", solutions);
    }
    

    return(
      <div>
        <div>
          <h1>Primary Domains</h1>
          {domains.map((value, index) =>
            <label key={index}>
              {value}
              <input type="checkbox" />
              <br/>
            </label>
            )}
          <h1>Solution Types</h1>
          {solutions.map((value, index) =>
            <label key={index}>
              {value}
              <input type="checkbox" />
              <br/>
            </label>
            )}

            <img src="https://s3-us-west-1.amazonaws.com/slfe-image-storage/img.png"/>
        </div>
        <DataTable2 array = {enterprises}/>
      </div>
    )
  }

}

CheckBox.propTypes = {
  getEnterprises: propTypes.func.isRequired,
  getDomains: propTypes.func.isRequired,
  getSolutions: propTypes.func.isRequired,
  enterpriseData: propTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  enterpriseData: state.enterpriseData,
});

export default connect(
  mapStateToProps,
  {getEnterprises, getDomains, getSolutions}
) (CheckBox);
