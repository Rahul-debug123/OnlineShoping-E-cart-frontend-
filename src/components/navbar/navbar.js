import React,{useState,useeffect} from 'react';
import './navbar.css';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
    Redirect
  } from 'react-router-dom';

function Navbar(props){
    const [active_option,setActive_option]=useState('Home');

    return (
        <div class="topnav">
        {props.options.map(option=>{
            return <Link to={option[1]} 
                    className={(active_option==option[0])?"active":''}
                    onClick={()=>setActive_option(option[0])}>{option[0]}</Link>
        })}
        <div class="login-container">
        {props.status.isAuth? <div>
                                 <div class='button'>Logout</div>
                                <div class='button'>{props.status.first_name}</div>
                            </div>:
                        <div class='button'><Link to="/login">Login/Register</Link></div>
                        }
        </div>
        </div>
    )
}
export default Navbar;