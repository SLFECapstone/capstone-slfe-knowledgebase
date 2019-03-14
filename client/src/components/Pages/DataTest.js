import React, { Component } from 'react';
//import { Container, Table, Button } from 'reactstrap';
//import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getEnterprises} from '../../actions/enterpriseActions';
import propTypes from 'prop-types';
import CheckBox from '../PageComponents/TestData/CheckBox';
import Header from '../PageComponents/Header'

class DataTest extends Component{
  constructor(){
    super();
    this.state = {
      array: [],
      reload: false
    }
  }

  componentWillMount(){
    this.props.getEnterprises();
  }


  filterSingle(dataArray, criteria){
    return dataArray.filter(function(obj) {
      return Object.keys(criteria).every(function(i) {
        return obj[i] === criteria[i];
    });
   });
  }

  filterOp(dataArray, criteria) {
    
    if(criteria.constructor === Array){
      let filteredData = dataArray;

      for(var i = 0; i < criteria.length; i++){
        filteredData = this.filterSingle(filteredData, criteria[i]);
      }
      return filteredData;
    }
    else{
      return this.filterSingle(dataArray, criteria);
    }
  }

  changeClicked(arr, filterOpt){
    let x = this.filterOp(arr, filterOpt);
    console.log("filtered data result is: ", x);  
  }

  render(){
    
    const { field } = this.props.enterpriseData;
    if(field.length){  
      
    }



    
    let filtArr = [];
    var filt1 = '{"Solution_Type": "food forest"}';
    var filt2 = '{"Primary_Domain": "Services"}';
    
    var x = JSON.parse(filt1);
    var y = JSON.parse(filt2);

    filtArr.push(x);
    filtArr.push(y);

    const backg = {
      width:'100%',
      height: '100%',
      backgroundColor: "#72ada6"
    }

    return(
      <div style={backg}>
        <Header/>
        <CheckBox/>
      </div>
    )
  }

}

DataTest.propTypes = {
  getEnterprises: propTypes.func.isRequired,
  enterpriseData: propTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  enterpriseData: state.enterpriseData,
});

export default connect(
  mapStateToProps,
  {getEnterprises}
) (DataTest);
