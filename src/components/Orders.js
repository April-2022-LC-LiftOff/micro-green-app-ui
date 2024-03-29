import React, { Component} from "react";
import {Card, Form, Button, Col} from 'react-bootstrap'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUndo, faSave } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";

import axios from "axios";

function withParams(Component) {
  return props => <Component {...props} params={useParams()} />;
}

class Orders extends Component{

  constructor(props){
    super(props);
    console.log(props);
    //state object stores property values that belong to the component
    this.state = this.initialState;
    this.orderChange = this.orderChange.bind(this);
    this.submitOrder = this.submitOrder.bind(this);
  }

  initialState = {
    order:{
    orderId: "",
    orderDate: '',
    deliveryDate: '',
    orderDetails: [ 
      {
      qty: "",
    seed: {
      seedName: ""
    },
    tray:{
      size:""
    }
      }
    ],
    customer:{
      customerName:''
    }
    }
    };
  
    componentDidMount(){
        const {orderId} = this.props.params;
        if(orderId){
          this.fetchData(orderId)
        }
      
    }

    fetchData = orderId =>{
      
      axios.get(`http://localhost:8080/orders/${orderId}`)
      .then(response =>{
        if (response.data!=null){
            console.log(response.data)
          this.setState({
            orderId: response.data.orderId,
            customerName: response.data.customer.customerName,
            orderDate: response.data.orderDate,
            deliveryDate: response.data.deliveryDate,
            qty: response.data.orderDetails[0].qty,
            seedName: response.data.orderDetails[0].seed.seedName,
            size:response.data.orderDetails[0].tray.size
          });
        }
      }).catch((error)=>{
        console.log("Error:" +error);
      });
    }
    

  resetOrder = ()=>{
    this.setState(()=>this.initialState);
  };

  updateOrder = event => {
    event.preventDefault();

    const {orderId} = this.props.params;
    const order = {
      orderId:this.state.orderId,
      orderDate: this.state.orderDate,
      deliveryDate: this.state.deliveryDate,
      customer:{
      customerName: this.state.customerName
      },
      orderDetails:[
        {
            qty: this.state.qty,
            seed:{
                seedName: this.state.seedName
            },
            tray:{
                size:this.state.size
            }
        }
      ]
          }         

    axios.put(`http://localhost:8080/orders/update/${orderId}`, order)
    .then(response => {
      if(response.data != null){
        alert("Order updated successfully");
        window.location.replace("http://localhost:3000/orders");
      }
  })
}


  submitOrder = event => {
    event.preventDefault();

    const order = {
      orderDate: this.state.orderDate,
      deliveryDate: this.state.deliveryDate,
      customer:{
      customerName: this.state.customerName
      },
      orderDetails:[
        {
          qty: this.state.qty,
          seed:
          {
            seedName: this.state.seedName
          },
          tray:
          {
            size:this.state.size
          }
        }      
        ]
    };

    axios.post("http://localhost:8080/orders/add", order)
    .then(response => {
      if(response.data != null){
        this.setState(this.initialState);
        alert("Order saved successfully");
      }
    });
  }


  orderChange = event => {
    this.setState({
      [event.target.name]:event.target.value
    });
  }

  //add new order form
  render(){
    const {customerName, seedName, size, qty, orderDate, deliveryDate} = this.state;

    return (
      <Card className="border border-dark formcard">
        <Card.Header>{this.state.orderId ? "Update Order" : "Add New Order"}</Card.Header>
        <Form onReset ={this.resetOrder} onSubmit={this.state.orderId ? this.updateOrder :this.submitOrder} id = "orderFormId">
          <Card.Body>
    <Form.Group as = {Col}>
    <Form.Label>Customer Name</Form.Label>
    <Form.Control required autoComplete="off"
    type = "text" name ="customerName"
    placeholder="Enter Customer Name"
    value = {customerName}
    onChange={this.orderChange}/>
  </Form.Group>  
  <Form.Group as = {Col}>
    <Form.Label>Seed Name</Form.Label>
    <Form.Control required autoComplete="off"
     type = "text" name = "seedName"
    placeholder="Enter Seed Name"
    value = {seedName}
    onChange={this.orderChange}/>
  </Form.Group>
  <Form.Group as = {Col}>
    <Form.Label>Tray Size</Form.Label>
    <Form.Control required autoComplete="off"
     type = "text" name = "size"
    placeholder="Enter Tray size"
    value = {size}
    onChange={this.orderChange}/>
  </Form.Group>
  <Form.Group as = {Col}>
    <Form.Label>Order Quantity</Form.Label>
    <Form.Control required autoComplete="off"
     type = "number" name = "qty"
    placeholder="Enter Order Quantity"
    value = {qty}
    onChange={this.orderChange}/>
  </Form.Group>
  <Form.Group as = {Col}>
    <Form.Label>Order Date</Form.Label>
    <Form.Control required autoComplete="off"
    type = "date" name = "orderDate"
    placeholder="YYYY-MM-DD"
    value = {orderDate}
    onChange={this.orderChange}/>
  </Form.Group>
  <Form.Group as = {Col}>
    <Form.Label>Delivery Date</Form.Label>
    <Form.Control required autoComplete="off"
    type = "date" name = "deliveryDate"
    placeholder="YYYY-MM-DD"
    value = {deliveryDate}
    onChange={this.orderChange}/>
  </Form.Group>
  </Card.Body>
<Card.Footer>
  <Button  variant = "success" type="submit">
    <FontAwesomeIcon icon = {faSave}/>
   {this.state.orderId ? "Update" : "Save"}
  </Button>{' '}
  <Button  variant = "info" type="reset">
    <FontAwesomeIcon icon = {faUndo}/>
    Reset
  </Button>
  </Card.Footer>
  </Form>
  </Card>
         ) 
}
}


export default withParams(Orders);

