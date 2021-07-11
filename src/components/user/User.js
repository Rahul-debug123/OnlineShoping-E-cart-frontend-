import React, {Component, useCallback} from 'react';
import { BrowserRouter as Router, Route, Link, Switch,Redirect } from 'react-router-dom';
import Login from "../login/Login";
import Cookies from 'universal-cookie';
const cookies=new Cookies();
const signin_url="http://localhost:9000/login";
const signup_url="http://localhost:9000/signup";

class User extends Component {
    constructor(){
        super()
        this.state={
            first_name:'',
            last_name:'',
            password:'',
            login_password:'',
            repassword:'',
            email:'',
            login_email:'',
            gender:'',
            contact_number:'',
            button_disable:false,
            signin_error:'',
            signup_error:'',
            signin_error_type:'',
            signup_error_type:''
        }
    }
    onFirstNameChange=(event)=>{
        this.setState({first_name:event.target.value});
    }
    onLastNameChange=(event)=>{
        this.setState({last_name:event.target.value});
    }
    onPasswordChange=(event)=>{
        this.setState({password:event.target.value});
    }
    onLoginPasswordChange=(event)=>{
        this.setState({login_password:event.target.value});
    }
    onRepasswordChange=(event)=>{
        this.setState({repassword:event.target.value});
    }
    onEmailChange=(event)=>{
        this.setState({email:event.target.value});
    }
    onLoginEmailChange=(event)=>{
        this.setState({login_email:event.target.value});
    }
    onGenderChange=(event)=>{
        this.setState({gender:event.target.value});
    }
    onContactNumberChange=(event)=>{
        this.setState({contact_number:event.target.value});
    }
    onSignIn=(event)=>{
        const {login_email,login_password}=this.state;
        if(!login_email || !login_password ){
            this.setState({signin_error:"* is the required field",
                            signin_error_type:"error"});
        }
        else {
            const requestMetadata = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({'email':login_email,
                                        'password':login_password})
            };
            this.setState({button_disable:true});
            this.setState({signin_error:"connecting to server.......",
                            signin_error_type:"info"});
            fetch(signin_url, requestMetadata)
            .then(res => res.json())
            .then(res =>{
                    if(res.error){
                        this.setState({signin_error:JSON.stringify(res.error),
                                            signin_error_type:"error"});
                    }
                    else {
                        this.setState({signin_error:"successful",
                                        signin_error_type:"success"});
                        cookies.set('user_token', res.user, { path: '/' });
                        this.props.TokenChange();
                        
                    }
                    this.setState({button_disable:false});
            });
        }
    }
    onSignUp=(event)=>{
            const {first_name,last_name,password,repassword,email,gender,contact_number}=this.state;
            if(!first_name || !password || !email || !gender || !contact_number ){
                this.setState({signup_error:"* is the required field",
                                signup_error_type:"error"});
            }
            else if(password!=repassword){
                this.setState({signup_error:"Password and confirm password do not match",
                                signup_error_type:"error"});
            }
            else {
                const requestMetadata = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({"first_name":first_name,
                                            "last_name":last_name,
                                            "password":password,
                                            "email":email,
                                            "Gender":gender,
                                            "contact_number":contact_number})
                };
                this.setState({button_disable:true});
                this.setState({signup_error:"connecting to server.......",
                                signup_error_type:"info"});
                fetch(signup_url,requestMetadata)
                .then(res=>res.json())
                .then(res=>{
                    if(res.error){
                        this.setState({signup_error:res.error,
                                        signup_error_type:"error"});
                    }
                    else {
                        this.setState({signup_error:"Successfully registered!",
                                        signup_error_type:"success"})
                    }
                    this.setState({button_disable:false});
                })
            }
            
    }
    render(){
        return (
            <div>
                <Login 
                            FirstNameChange={this.onFirstNameChange}
                            LastNameChange={this.onLastNameChange}
                            PasswordChange={this.onPasswordChange}
                            LoginPasswordChange={this.onLoginPasswordChange}
                            RepasswordChange={this.onRepasswordChange}
                            EmailChange={this.onEmailChange}
                            LoginEmailChange={this.onLoginEmailChange}
                            GenderChange={this.onGenderChange}
                            ContactNumberChange={this.onContactNumberChange}
                            SignIn={this.onSignIn}
                            SignUp={this.onSignUp}
                            Signin_error={this.state.signin_error}
                            Signup_error={this.state.signup_error}
                            Signin_error_type={this.state.signin_error_type}
                            Signup_error_type={this.state.signup_error_type}
                            Button_disable={this.state.button_disable}/>
            </div>
                    
        )
    }
}
export default User;