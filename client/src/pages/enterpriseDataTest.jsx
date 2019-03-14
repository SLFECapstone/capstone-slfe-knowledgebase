import React, { Component } from 'react';
//import { Container, Table, Button } from 'reactstrap';
//import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getEnterprises} from '../../actions/enterpriseActions';
import propTypes from 'prop-types';
import DataTable from '../PageComponents/DataTable';

class enterpriseDataTest extends Component{

  constructor(){
    super();
    this.state = {
      dataArray: []
    }
  }

  componentWillMount(){
    this.props.getEnterprises();
    this.state.dataArray = this.props.enterprise;
    // while(this.state.dataArray.loading == false){
    //   console.log("Data loading")
    //   if(this.state.dataArray.loading == true){
    //     console.log("data done loading...breaking");
    //     break;
    //   }
    // }
    console.log("datastateArray is: ")
    console.log(this.state.dataArray);
    //while(this.state.dataArray.loading == false || this.state.dataArray.enterprises.length <0)

    // while(this.props.enterprise.loading == false){
    //   console.log("component started")
    //   while(this.props.enterprise.loading == true){
    //     console.log("data is loading");
    //     if(this.props.enterprise.loading == false){
    //       console.log("data done loading");
    //       break;
    //     }
    //   }
    // }
  }

  filter(arr, criteria) {
    return arr.filter(function(obj) {
      return Object.keys(criteria).every(function(c) {
        return obj[c] === criteria[c];
      });
    });
  }
  clickedBox(arr, criteria){
    //this.mapData(this.filter(arr, criteria));
    this.state.dataArray = arr;
  }

  filterData(array, e){
    console.log("inside filterData")
    console.log(array);
    return this.filter(array, JSON.parse(e));
  }
  checkboxClicked(event, arr){
    if(document.getElementById(event.target.id).checked){
      alert("Just checked!");
      var x = this.filterData(arr, "{'Solution_Type': 'food forest'}");
      console.log("after filter")
      console.log({x});
      return x;
    }
    else{
      alert("Just unchecked!")
    }
  }

  mapData(array){
    
  }

  render(){
    const { enterprises } = this.props.enterprise;
    //console.log(enterprises);
    var datatest = enterprises;

    // while(datatest.length == 0){
    //   console.log("data is loading");

    // }
    // if(datatest.length > 0){
    //   console.log("data done loading");
    // }

     var newData = this.props.enterprise;
    // console.log("datastateArray before datatest is: ")
    // console.log(this.state.dataArray);
    // console.log("datatest is:");
    // console.log(datatest)

     //this.state.dataArray = datatest;
    //  console.log("datastateArray after datatest is: ")
    //  console.log(this.state.dataArray);

    // console.log(enterprises)

    // if(this.state.dataArray.loading == false){
    //   console.log("loading is false")
    // }
    // else{
    //   console.log("loading is true")
    // }

    const {newArray} = this.state.dataArray;


    var filt = '{"age": 21}';
    var filt2 = '{"Primary_Domain": "Services"}';
    var x = JSON.parse(filt);
    var y = JSON.parse(filt2);
    var a = [
      { name: 'Steve', age: 18, color: 'red' },
      { name: 'Louis', age: 21, color: 'blue' }, //*
      { name: 'Mike', age: 20, color: 'green' },
      { name: 'Greg', age: 21, color: 'blue' }, //*
      { name: 'Josh', age: 18, color: 'red' }
    ];
    console.log(a);
    console.log(this.filter(a, x));
    console.log(this.filter(datatest, y));
  

    var filteredData;
    // var arrary1 = [1,3,4,5];
    // console.log(arrary1);
    // console.log(datatest);
    // console.log("before filter");
    // console.log(filteredData);
    // //filteredData = this.filter({...datatest}, "{'Solution_Type': 'food forest'}");
    // console.log("after filter");
    // console.log(filteredData);

    //filterData("Primary_Domain: \"Services\"");
    return(
      <div>
          <h2>Enterprises Data</h2>
          
            <form>
              Filters:  <br/>
              Primary Domain = "Services"  <input type="checkbox" id="domain" name="{'Primary_Domain': &quot;Services&quot;}" onChange={() => filteredData=this.clickedBox(datatest, JSON.parse('{"Primary_Domain": "Services"}'))}/><br/>
              Primary Domain = "Production"  <input type="checkbox" name="{PD-production}"/><br/>
              Solution = "food forest" <input type="checkbox" name="Sol-FF" onChange = {() => this.clickedBox({enterprises})}/><br/>

            </form>
            <div>
              {console.log(newData)}
            <DataTable array = {datatest}/>
            </div>
      </div>
    )
  }
}

enterpriseDataTest.propTypes = {
  getEnterprises: propTypes.func.isRequired,
  enterprise: propTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  enterprise: state.enterprise
});


export default connect(
  mapStateToProps,
  {getEnterprises}
) (enterpriseDataTest);


/*************************************************************************

Potential way to be able to go back after filters are unselected:

Have a checkboxHandler

    var filterHolder = [];                holds objects 
    function changeArray(checkboxID){
        searchArray(checkboxID)
        Run the data filter again
        Reload data compont
    }

    function searchArray(checkboxID){
       iterate through array
          If corresponding filter is already in, 
              remove from array
          Else
              Add to array
    }
    
*/
