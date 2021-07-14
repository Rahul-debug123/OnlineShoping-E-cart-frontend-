import React,{useState,useeffect} from 'react';
import Cookies from 'universal-cookie';
import User from '../user/User';
import Home from  '../home/home';
import Cart_nav from '../buy/cart_nav/cart_nav';
import MyOrders from '../myorders/myorders';
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
                return <Home/>
            }}/>
            <Route exact path="/available" component={()=>{
                return <Cart_nav Bye={false}>{setActive_option("Available products")}</Cart_nav>;
            }}/>
            <Route exact path="/cart" component={()=>{
                return isAuth?<Cart_nav  Bye={true} UserId={props.UserId}>{setActive_option("Cart")}</Cart_nav>:
                            <Redirect puch to="/login">{alert("Login Required to See this content")} {setActive_option("")}</Redirect>
            }}/>
            <Route exact path="/myorders" component={()=>{
                return isAuth?<MyOrders UserId={props.UserId}>{setActive_option("Myorders")}</MyOrders>:
                        <Redirect puch to="/login">{alert("Login Required to See this content")} {setActive_option("")}</Redirect>

            }}/>
        </Switch>
        </div>
    )
}
export default Navbar;