import { Component } from 'react';
import {Table, Button, ButtonGroup} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/free-regular-svg-icons';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

export default class CustomerList extends Component{

    constructor(props){
        super(props);
        this.state = {
            customer: []
        };
    }

    componentDidMount(){
        this.getAllCustomers();
    };
    

    getAllCustomers(){
        axios.get("http://localhost:8080/customers")
        .then(response => response.data)
        .then((data) => {
            this.setState({customer:data});
            console.log(data)
        });
}

    render(){
        return (
        <div className = "container">
          <h2 className='"text-center'>List Customers</h2>
            <Link to = {"/customers/add"}><Button variant="dark" class="item" id="addCustomerBtn"><FontAwesomeIcon icon = {faPlusSquare}/>ADD CUSTOMER</Button></Link>
            
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Customer Id</th>
              <th>Customer Name</th>
              <th>Active</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.customer.length === 0 ? 
            <tr align = "center">
              <td colSpan="4"> Customers</td>
            </tr>:
            this.state.customer.map((customer) => (
              <tr key ={customer.id}>
                <td>{customer.customerId}</td>
                <td>{customer.customerName}</td>
                <td>{customer.activeCustomer}</td>

                <td>
                  <ButtonGroup>
                    {/* <Link to = {`/customers/${customer.customerId}`}>  */}
                      <button size = "sm" variant = "outline-primary"><FontAwesomeIcon icon = {faEdit}/></button>
                    {/* </Link> */}
                    {/* <Link to = {`/customers/delete/${customer.customerId}`}>  */}
                      <button size = "sm" variant = "outline-primary" style = {{marginLeft:"10px"}}> <FontAwesomeIcon icon = {faTrash}/></button>
                    {/* </Link> */}
                  </ButtonGroup>
                </td>
              </tr>
            ))
          }
          </tbody>
             </Table>   
               </div>
                  )
    }
}