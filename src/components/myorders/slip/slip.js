import React,{useEffect} from 'react';
import './slip.css'

let total_cost=0;
function Slip(props){
    let {Active_order}=props;
    const onReset=()=>{
        total_cost=0;
    }
    return (
        <div class="details">
        <div class="container">
        <div class="heading">
        <h1>
        <span class="shopper"></span> Order Details
        </h1>
        </div>
        <div class="slip">
        <table>
                
               <tr>
                    <td>Name</td>
                    <td>Price</td>
                    <td>Quantity</td>
                    <td>Total Price</td>
               </tr>
               {
                Object.keys(Active_order).map((key)=>{
                   return (<tr>
                       <td>{Active_order[key][0]}</td>
                       <td>{Active_order[key][1]}</td>
                       <td>{Active_order[key][2]}</td>
                       <td>{Active_order[key][2]*Active_order[key][1]}</td>
                   </tr> )
                })}
                {onReset()}
                {Object.keys(Active_order).map(key=>{
                     total_cost+=Active_order[key][1]*Active_order[key][2];
                         })}
                <tr>
                    <td>Net Total:</td>
                    <td></td>
                    <td></td>
                    <td>{total_cost}</td>
                </tr>
        </table>
        </div>
        </div>
        </div>
    )
}

export default Slip;