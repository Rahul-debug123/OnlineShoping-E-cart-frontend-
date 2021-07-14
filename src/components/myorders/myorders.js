import React,{useState,useEffect} from 'react';
import './myorders.css';
import Scroll from '../scroll/scroll';
import Slip from './slip/slip';

const myorders_url="http://localhost:9000/myorders";
function MyOrders(props){
    const [order_details,Setorder_details]=useState([]);
    const [active_order,Setactive_order]=useState({});
    const onDemand=(key)=>{
        console.log(order_details[key]['details']);
        Setactive_order(order_details[key]['details']);
    }
    useEffect(()=>{
        const requestMetadata = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({"userid":props.UserId})
            };
      
            fetch(myorders_url, requestMetadata)
            .then(res => res.json())
            .then(res =>{
                if(!res.error){
                    Setorder_details(res.result);
                }
            });
    },[])
    return (
        <div>
        <h1 className="tc">My Orders</h1>
        <div className="orders">
        <Scroll>
        <table>
        <tr>
            <th>Time</th>
            <th>Date</th>
            <th>Delivery Address</th>
            <th>Click to see the details</th>
        </tr>
        {
            Object.keys(order_details).map((key)=>{
                return(
                    <tr>
                    <td>{order_details[key]['time']}</td>
                    <td>{order_details[key]['date']}</td>
                    <td>{order_details[key]['delivery_address']}</td>
                    <td><a className="link " onClick={()=>onDemand(key)} >Details</a></td>
                </tr>)
            })
        }
        </table>
        </Scroll>
        </div>
        {(Object.keys(active_order).length!=0)? <Slip Active_order={JSON.parse(active_order)}/>:<div></div>}
        
        </div>
    )
}
export default MyOrders;