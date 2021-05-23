import React, { useState, useContext, useEffect } from 'react';
import './Login.css';
import TextField from '@material-ui/core/TextField';
import {Link} from 'react-router-dom'; 
import md5 from'md5';


const Login = (props) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [userList, setUserList] = useState([]);

    useEffect(() => {
        let users = localStorage.getItem('users');
        if(users){
            users = JSON.parse(users);
            setUserList(users);
        }


    }, []);

    const onLogin = (e) =>{
        e.preventDefault();
        let user =  userList.find(o => o.email === email);
            if(user){
                if(user.password === md5(password))
                    {
                        console.log("login");
                        localStorage.setItem('isLoggedIn',JSON.stringify(true));
                        localStorage.setItem('loggedInUser',JSON.stringify(user));
                        window.location.href='/';
                    }
                else
                    alert("Password is not correct")
            }
            else{
                alert("Invalid email")
            }
                
    }


    return (
        <div className="login-container">
            <form className="login-form" onSubmit={(e)=>onLogin(e)}>
                <h2>Login</h2>
                <TextField
                    label="Email"
                    type="email"
                    autoComplete="current-password"
                    variant="outlined"
                    size="small"
                    style={{margin:"5px"}}
                    required
                    onChange = {(e)=>{setEmail(e.target.value)}}
                />
                <TextField
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    variant="outlined"
                    size="small"
                    style={{margin:"5px"}}
                    required
                    onChange = {(e)=>{setPassword(e.target.value)}}
                />
                <input  type="submit" />
            </form>
            <Link to="/register" value="submit"><span>New? Register here</span></Link> 
        </div>
    )
}

export default Login
