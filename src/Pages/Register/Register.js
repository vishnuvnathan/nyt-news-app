import React,{useEffect} from 'react';
import './Register.css';
import TextField from '@material-ui/core/TextField';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import md5 from'md5';
import { useForm } from 'react-hook-form';


const Register = (props) => {

    const [userList, setUserList] = useState([]);
    const { register, handleSubmit, formState: { errors }} = useForm({ mode: "onBlur"});

    const [isUserExits, setIsUserExits] = useState(false);


    const checkUserExits = (email) =>{
        console.log(email);

        if(userList.length > 0){
            let user =  userList.find(o => o.email === email);
            if(user)
                return true;
            else
                return false;
        }
        else{
            return false;
        }
    }


    useEffect(() => {
        let users = localStorage.getItem('users');
        if(users){
            users = JSON.parse(users);
            setUserList(users);
        }
        else{
            localStorage.setItem('users',JSON.stringify([]));
            setUserList([]);
        }
        
    }, []);

    const registerNew =  (data, e) =>{

        e.preventDefault();
        console.log(checkUserExits(data.Email))

        if(!checkUserExits(data.Email)){
            if(data.Password !== data.ConfirmPassword ){
                alert("Confirm password should match password.", data.Password, data.ConfirmPassword);
                console.log(data.Password, data.ConfirmPassword)
            }
            else{
                let user = {
                    id : uuidv4(),
                    email:data.Email,
                    name:data.Name,
                    password:md5(data.Password)
                }
                let newUserList = [...userList];
                newUserList.push(user);
                localStorage.setItem('users',JSON.stringify(newUserList));
                console.log(newUserList);
                props.history.push("/login");
            }
        }
        else{
            setIsUserExits(true);
        }
    
    }
    
    return (
      <div className="login-container">
        <form
          className="login-form"
          onSubmit={(e) => {
            registerNew(e);
          }}
        >
          <h2>Register</h2>

          <TextField
            label="Email*"
            type="email"
            variant="outlined"
            size="small"
            style={{ margin: "5px" }}
            {...register("Email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
          />
          {isUserExits ? (
            <div className="error">Email already exists.</div>
          ) : null}
          {errors.Email && <div className="error">{errors.Email?.message}</div>}

          <TextField
            label="Name*"
            type="text"
            variant="outlined"
            size="small"
            style={{ margin: "5px" }}
            {...register("Name", {
              required: "Name is required",
              pattern: {
                value: /^[A-Za-z0-9]+$/i,
                message: "Special characters are not allowed",
              },
            })}
          />
          {errors.Name && <div className="error">{errors.Name?.message}</div>}

          <TextField
            label="Password*"
            type="password"
            variant="outlined"
            size="small"
            style={{ margin: "5px" }}
            inputProps={{ maxLength: 20}}
            {...register("Password", {
              required: "Password is required",
              maxLength: 20,
              pattern: {
                value: /^[A-Za-z0-9]+$/i,
                message: "Special characters are not allowed",
              },
            })}
          />
          {errors.Password && (
            <div className="error">{errors.Password?.message}</div>
          )}

          <TextField
            label="Confirm password*"
            type="password"
            variant="outlined"
            size="small"
            style={{ margin: "5px" }}
            inputProps={{ maxLength: 20}}
            {...register("ConfirmPassword", {
              required: "Confirm Password is required",
              maxLength: 20,
              pattern: {
                value: /^[A-Za-z0-9]+$/i,
                message: "Special characters are not allowed",
              },
            })}
          />
          {errors.ConfirmPassword && <div className="error">{errors.ConfirmPassword?.message}</div>}

          <input type="submit" />
        </form>
      </div>
    );
}

export default Register;
