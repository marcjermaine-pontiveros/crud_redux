import React, { Component } from "react";  
import logo from "./logo.svg";  
import "./App.css";  
import PropTypes from 'prop-types';  
import { getEmployee, addEmployee, editEmployee, deleteEmployee, getSharedData, editSharedData } from './Redux/actions';  
import { connect } from 'react-redux';  
  
const mapStateToProps = state => ({  
  employees: state.employees,
  shareddata: state.shareddata,  
});  
  
class App extends Component {  
  constructor(props) {  
    super(props);
    this.state = {
      id: 0, 
      employeeName: "",
      employeeDepartment: "",
    }
  }  
  
  static propTypes = {  
    employees: PropTypes.array.isRequired,  
    getEmployee: PropTypes.func.isRequired,
    addEmployee: PropTypes.func.isRequired,
    editEmployee: PropTypes.func.isRequired,
    deleteEmployee: PropTypes.func.isRequired,
    shareddata: PropTypes.array.isRequired,
    getSharedData: PropTypes.func.isRequired,  
  };  
  
  componentDidMount() {  
    this.props.getEmployee();
    let searchPagePath_obj = this.props.shareddata.find(
      el => el.type === 'componentProps' && el.name === 'searchPagePath'
    )
    console.log(searchPagePath_obj);
    if (searchPagePath_obj.value !== 'some_path'){
      const updatedSharedData = {
        id: searchPagePath_obj.id,
        type: searchPagePath_obj.type,
        name: searchPagePath_obj.name,
        value: 'some_path'
      };
      this.props.editSharedData(updatedSharedData);
    }
    console.log(this.props.shareddata ? this.props.shareddata : "")
  }  

  submitData = () => {
    if(this.state.employeeName && this.state.employeeDepartment && !this.state.id){
      const newEmployee = {
        id: Math.floor(Math.random() * (999 - 100 + 1) + 100),
        employeeName: this.state.employeeName,
        employeeDepartment: this.state.employeeDepartment,
      };
      this.props.addEmployee(newEmployee);
    } else if(this.state.employeeName && this.state.employeeDepartment && this.state.id){
      const updatedDetails = {
        id: this.state.id,  
        employeeName: this.state.employeeName,  
        employeeDepartment: this.state.employeeDepartment,
      };
      this.props.editEmployee(updatedDetails);
    } else {
      alert('Enter employee details!');
    }
    this.clearData();
  }

  clearData = () => {  
    this.setState({  
      id: 0,  
      employeeName: "",  
      employeeDepartment: ""  
    });  
  }  

  editDetails = (data) => {  
    this.setState({  
      id: data.id,  
      employeeName: data.employeeName,  
      employeeDepartment: data.employeeDepartment  
    })  
  }  

  deleteEmployee = (id) => {  
    this.clearData();  
    if (window.confirm("Are you sure?")) {  
      this.props.deleteEmployee(id);  
    }  
  }  

  handleNameChange = (e) => {  
    this.setState({  
      employeeName: e.target.value  
    });  
  }  
  
  handleDepartmentChange = (e) => {  
    this.setState({  
      employeeDepartment: e.target.value  
    });  
  }  


  render() {  
    console.log(this.props);
    return (  
      <div className="App">  
        <header className="App-header">  
          <img src={logo} className="App-logo" alt="logo" />  
          <h1 className="App-title">CRUD opeartions for Employee Module</h1>  
        </header>  
        <p className="App-intro">  
          <div>
            Employee Name: <input onChange={this.handleNameChange} value={this.state.employeeName} type="text" placeholder="Employee Name" /><br />
            Employee Department :  <input onChange={this.handleDepartmentChange} value={this.state.employeeDepartment} type="text" placeholder="Employee Department" /><br />  
            {this.state.id ? <button onClick={this.submitData}>UPDATE</button> : <button onClick={this.submitData}>ADD</button>}   <button onClick={this.clearData}>CLEAR</button>  
          </div>
          <div className="rightsection">  
            <table>  
              <thead>  
                <tr>  
                  <th>ID</th>  
                  <th>Name</th>  
                  <th>Depatment Name</th>  
                  <th>Action(s)</th>  
                </tr>  
              </thead>  
              <tbody>  
                {this.props.employees && this.props.employees.map((data, index) => {  
                  return <tr key={(index + 1)}>  
                    <td>{(index + 1)}</td>  
                    <td>{data.employeeName}</td>  
                    <td>{data.employeeDepartment}</td>  
                    <td><button onClick={() => this.editDetails(data)}>EDIT</button> <button onClick={() => this.deleteEmployee(data.id)}>DELETE</button> </td>  
                  </tr>  
                })}  
              </tbody>  
            </table>  
          </div>  
        </p>  
      </div>  
    );  
  }  
  
}  


export default connect(mapStateToProps, { getEmployee, addEmployee, editEmployee, deleteEmployee, getSharedData, editSharedData})(App); 