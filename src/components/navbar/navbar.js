import React,{useState,useeffect} from 'react';
import Cookies from 'universal-cookie';
import User from '../user/User';
import About from  '../about/about';
import Cart_nav from '../buy/cart_nav/cart_nav'
import './navbar.css';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
    Redirect
  } from 'react-router-dom';
const cookies=new Cookies();
function Navbar(props){
    const [active_option,setActive_option]=useState('Home');
    const {isAuth,first_name}=props.status;

    const onTokenChange=()=>{
        props.TokenChange();
    }
    const onLogout=()=>{
        cookies.remove('user_token')
        props.TokenChange();
    }
    // TokenChange={this.onTokenChange;

    return (
        <div>
        <div class="topnav">
            {props.options.map(option=>{
            return <Link to={option[1]} 
                    className={(active_option==option[0])?"active":''}
                    onClick={()=>setActive_option(option[0])}>{option[0]}</Link>
            })}
        
        <div class="login-container">
                    {isAuth? <div>
                                <div class='button' onClick={onLogout}>Logout</div>
                                <div class='button'>{first_name}</div>
                            </div>:
                        <Link to="/login" class='button'>Login/Register</Link>
                        }
        </div>
        </div>
        <Switch>
            <Route exact path="/login" component={()=>{
                return isAuth? <Redirect push to="/">{setActive_option('Home')}</Redirect> :
                                <User TokenChange={onTokenChange}>{setActive_option('')}</User>
            }}/>
            <Route exact path="/" component={()=>{
                return 0;
            }}/>
            <Route exact path="/about" component={()=>{
                return <About>{setActive_option("About")}</About>;
            }}/>
            <Route exact path="/contact" component={()=>{
                return <About>{setActive_option("Contact")}</About>;
            }}/>
            <Route exact path="/cart" component={()=>{
                return <Cart_nav />
            }}/>
        </Switch>
        </div>
    )
}
export default Navbar;