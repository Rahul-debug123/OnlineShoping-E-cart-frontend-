import React, { Component } from "react";
import "./Login.css";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

const Login=(props)=>{
return (
            <div className="login-wrap">
                <div className="login-html">
                    <input id="tab-1" type="radio" name="tab" className="sign-in" defaultChecked/><label for="tab-1" className="tab">Sign In</label>
                    <input id="tab-2" type="radio" name="tab" className="sign-up"/><label for="tab-2" className="tab">Sign Up</label>
                    <div className="login-form">
                        <div className="sign-in-htm">
                            <div className="group">
                                <label for="email" className="label">Registered Email *</label>
                                <input id="email" name="email" type="text" className="input" onChange={props.LoginEmailChange}/>
                            </div>
                            <div className="group">
                                <label for="pass" className="label">Password *</label>
                                <input id="pass" name="password" type="password" className="input" data-type="password" onChange={props.LoginPasswordChange}/>
                            </div>
                            <div className="group">
                                <input id="check" type="checkbox" className="check" checked/>
                                <label for="check"><span className="icon"></span> Keep me Signed in</label>
                            </div>
                            <div className="group">
                                <input type="submit" className="button" value="Sign In" onClick={props.SignIn} disabled={props.Button_disable}/>
                            </div>

                            <div className={props.Signin_error_type}>
                                {props.Signin_error}
                            </div>

                            <div className="hr"></div>
                            <div className="foot-lnk">
                                <a href="#forgot">Forgot Password?</a>
                            </div>
                        </div>
                        <div className="sign-up-htm">
                            <table>
                                <th>
                                    <td>
                                    <div className="group">
                                        <label for="first_name" className="label">First Name *</label>
                                         <input id="fist_name" name="first_name" type="text" className="input" onChange={props.FirstNameChange} />
                                    </div>
                                    </td>
                                    <td>
                                    <div className="group">
                                    <label for="last_name" className="label">Last Name</label>
                                    <input id="last_name" name="last_name" type="text" className="input" onChange={props.LastNameChange}/>
                                     </div>
                                    </td>
                                </th>
                            </table>

                            <table>
                                <th>
                                    <td>
                                    <div className="group">
                                        <label for="pass" className="label">Password *</label>
                                        <input id="pass" name="password" type="password" className="input" data-type="password" onChange={props.PasswordChange}/>
                                    </div>
                                    </td>
                                    <td>
                                    <div className="group">
                                        <label for="pass" className="label">Confirm Password *</label>
                                        <input id="pass" name="repassword" type="password" className="input" data-type="password" onChange={props.RepasswordChange}/>
                                    </div>
                                    </td>
                                </th>
                            </table>
                            <div className="group">
                                <label for="pass" className="label">Email Address *</label>
                                <input id="pass" name="email" type="text" className="input" onChange={props.EmailChange}/>
                            </div>
                            <div className="group">
                                <label className="label">Gender *</label>
                            </div>
                            <div>
                                <label for="Male" className="label">Male</label>
                                <input type="radio" id="Male" value="M" name="gender" onChange={props.GenderChange}/>
                                <label for="Female" className="label">Female</label>
                                <input type="radio" id="Female" value="F" name="gender" onChange={props.GenderChange}/>
                                <label for="Other" className="label">Other</label>
                                <input type="radio" id="Other" value="O" name="gender" onChange={props.GenderChange}/>
                            </div> <br />
                            <div className="group">
                                <label for="contact_number" className="label">Contact Number *</label>
                                <input id="contact_number" name="contact_number" type="text" className="input" onChange={props.ContactNumberChange}/>
                            </div>
                            <div className="group">
                                    <input type="submit" className="button" value="Sign Up" onClick={props.SignUp} disabled={props.Button_disable}/>
                            </div>
                            <div className={props.Signup_error_type}> {props.Signup_error}</div>
                            <div className="hr"></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }


export default Login;