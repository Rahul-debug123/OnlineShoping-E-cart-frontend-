import React, { useState } from 'react';
import './basket.css';
import order_placed from '../../../images/animation/tenor.gif'


const order_url="http://localhost:9000/order"

const request={userid:'',details:'',time:'',date:'',delivary_address:''};
let total_cost=0;
function Basket(props){
    const[step,Setstep]=useState(0);
    const [address,Setaddress]=useState('');
    const [final_state,Setfinal_state]=useState(true);
    const {CartItems}=props
    const onAddressChange=(event)=>{
        Setaddress(event.target.value);
    }
    const onReset=()=>{
        total_cost=0;
    }
    return (
        <div class="container">
        <div class="heading">
            <h1>
            <span class="shopper"></span> Shopping Cart
            </h1>
        </div>
        {(Object.keys(CartItems).length)?
        (
        <div className="table" >
        <div style={{overflowY:'scroll',height:'400px',marginRight:"10px"}}>
        <table className="styled-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total Price</th>
                </tr>
            </thead>
            <tbody >
             {Object.keys(CartItems).map(key=>{
                return (
                    <tr>
                    <td>{CartItems[key][0]}</td>
                    <td>{CartItems[key][1]}</td>
                    <td>
                     <input class="change" type="button" value='+' onClick={()=>props.QuantityIncrease(key)}/>   
                     {CartItems[key][2]}
                     <input class="change"type="button" value='-' onClick={()=>props.QuantityDecrease(key)}/>
                    </td>
                    <td>{CartItems[key][1]*CartItems[key][2]}</td>
                    </tr>
             )
            })}
            <tr>
                <td>Total:</td>
                <td></td>
                <td></td>
                <td>
                    
                    {onReset()}
                    {
                    Object.keys(CartItems).map(key=>{
                        total_cost+=CartItems[key][1]*CartItems[key][2];
                    })
                    }
                    {parseInt(total_cost,10)}
                </td>
            </tr>
            </tbody>
        </table>
        </div>
        <div className="tc mr3">
        {
            (step==0)? <input type="button" className="square_btn" value="Place your order" onClick={()=>Setstep(1)}/>:
            (step==1)?
                <div>
                <input type="text" placeholder="Delivery address" className="address" onChange={onAddressChange}/>
                <input type="submit" className="square_btn" value="Confirm and place your order" onClick={()=>{
                    if(address){
                        request['userid']=props.UserId;
                        request['date']=new Date().toISOString().slice(0, 10)
                        request['time']=new Date().toLocaleTimeString();
                        request['delivery_address']=address;
                        let ordered_product={};
                        Object.keys(CartItems).map(key=>{
                            ordered_product[key]=[CartItems[key][0],CartItems[key][1],CartItems[key][2]]
                        })
                        request['details']=JSON.stringify(ordered_product);

                        const requestMetadata = {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(request)
                            };
                      
                            fetch(order_url, requestMetadata)
                            .then(res => res.json())
                            .then(res =>{
                              if(res.error){
                                Setfinal_state(false)
                              }
                              else {
                                Setfinal_state(true)
                              }
                            });
                        Setstep(2)
                    }
                    else {
                        alert('Address is required!')
                    }
                   }}/>
                </div>:
            <div>
            {final_state?<div>
                <img src={order_placed}/><br/>
                "Order placed!"</div>:"Oops...Unable to place the order!"}
            <p hidden>
            {setTimeout(()=>{
                Setstep(0)
            },5000)}
            </p>
            </div>
        }
        </div>
        
        </div>):
         <div className="tc mt4 mb3">
          No object in cart</div>
    }
    </div>)
   
}

export default Basket;