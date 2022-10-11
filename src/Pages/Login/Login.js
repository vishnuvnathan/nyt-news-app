import React, { useState, useContext, useEffect } from 'react';
import './Login.css';
import TextField from '@material-ui/core/TextField';
import {Link} from 'react-router-dom'; 
import md5 from'md5';
import { useForm } from 'react-hook-form';

const Login = (props) => {

    const { register, handleSubmit, formState: { errors }} = useForm({ mode: "onBlur"});

    const [userList, setUserList] = useState([]);

    useEffect(() => {
        let users = localStorage.getItem('users');
        if(users){
            users = JSON.parse(users);
            setUserList(users);
        }


    }, []);

    

    const onLogin = (data, e) =>{
        e.preventDefault();
        let user =  userList.find(o => o.email === data.Email);
            if(user){
                if(user.password === md5(data.Password))
                    {
                        console.log("login");
                        localStorage.setItem('isLoggedIn',JSON.stringify(true));
                        localStorage.setItem('loggedInUser',JSON.stringify(user));
                        props.history.push('/');
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
            <form className="login-form" onSubmit={handleSubmit(onLogin)}>
                <h2>Login</h2>
                <TextField
                    label="Email"
                    autoComplete="current-password"
                    variant="outlined"
                    size="small"
                    style={{margin:"5px"}}
                    {...register("Email", { required: "Email is required", 
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address"
                        } })} 
                />
                 {errors.Email && <div className="error">{errors.Email?.message}</div>}
                <TextField
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    variant="outlined"
                    size="small"
                    style={{margin:"5px"}}
                    {...register("Password", { required: "Password is required" })}
                />
                 {errors.Password && <div className="error">{errors.Password?.message}</div>}
                <input  type="submit" />
            </form>
            <Link to="/register" value="submit"><span>New? Register here</span></Link> 
        </div>
    )
}

export default Login
