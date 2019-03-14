import React, { Component } from 'react';
//import { Container, Table, Button } from 'reactstrap';
//import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getEnterprises } from '../../actions/enterpriseActions';
import propTypes from 'prop-types';
import DataTable2 from '../PageComponents/DataTable2';

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
      //console.log("filteredData before loop is:", filteredData);

      for(var i = 0; i < criteria.length; i++){
        //console.log("criteria[",i,"]:", criteria[i]);
        filteredData = this.filterSingle(filteredData, criteria[i]);
       // console.log("filteredData after loop:",i,"is:", filteredData);
      }
      //console.log("filteredData after loop is:", filteredData);
      return filteredData;
    }
    else{
      return this.filterSingle(dataArray, criteria);
    }
  }

  changeClicked(arr, filterOpt){
    console.log("incoming array:", arr);
    console.log("filterOpt is:", filterOpt);
    let x = this.filterOp(arr, filterOpt);
    console.log("filtered data result is: ", x);
    // this.setState({
    //   array:  x,
    //   reload: !this.state.reload,
    //   function(){
    //     console.log("state is: ",this.state.reload);
    //   }
    // });
    
  }

  render(){
    const { enterprises } = this.props.enterprise;

    if(!enterprises.length){
      console.log("data is loading")
      return(<div><h1 style= {{position: 'absolute', top: '50%', left: '50%'}}>Data is loading</h1></div>)
    }
    else{
      //console.log("data done loading!\nEnterprise holds:", enterprises)
      this.dataHolder = enterprises;
      console.log("dataHolder holds:\n",this.dataHolder); 
    }
      
    let filtArr = [];
    var filt1 = '{"Solution_Type": "food forest"}';
    var filt2 = '{"Primary_Domain": "Services"}';
    
    var x = JSON.parse(filt1);
    var y = JSON.parse(filt2);

    filtArr.push(x);
    filtArr.push(y);

    console.log("filter array has: ", filtArr);

    return(
      <div>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous"/>
        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>

        {/* <CheckboxFilters/> */}
        <DataTable2 array = {this.dataHolder}/>
        <button onClick={() => this.changeClicked(this.dataHolder,filtArr)}>Change the data</button>
      </div>
    )
  }

}

DataTest.propTypes = {
  getEnterprises: propTypes.func.isRequired,
  enterprise: propTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  enterprise: state.enterprise,
});

export default connect(
  mapStateToProps,
  {getEnterprises}
) (DataTest);


/*
Have to filter by an array

category type
solution type



*/
