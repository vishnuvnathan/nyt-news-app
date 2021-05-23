import React,{useEffect} from 'react';
import './Register.css';
import TextField from '@material-ui/core/TextField';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import md5 from'md5';



const Register = () => {

    const [userList, setUserList] = useState([]);
    const [email, setEmail] = useState("");
    const [name, setName] = useState('');
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");


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

    const registerNew =  (e) =>{

        e.preventDefault();
        console.log(checkUserExits(email))

        if(!checkUserExits(email)){
            if(password !== confirmPassword ){
                alert("Password mismatch",password,confirmPassword);
                console.log(password,confirmPassword)
            }
            else{
                let user = {
                    id : uuidv4(),
                    email:email,
                    name:name,
                    password:md5(password)
                }
                let newUserList = [...userList];
                newUserList.push(user);
                localStorage.setItem('users',JSON.stringify(newUserList));
                console.log(newUserList);
                window.location.href="/login";
            }
        }
        else{
            setIsUserExits(true);
        }
    
    }
    
    return (
        <div className="login-container">
            <form className="login-form" onSubmit={(e)=>{registerNew(e)}}>
                <h2>Register</h2>
                <TextField
                    label="Email"
                    type="email"
                    onChange = {(e)=>{setEmail(e.target.value)}}
                    variant="outlined"
                    size="small"
                    style={{margin:"5px"}}
                    required
                />
                {
                    isUserExits ?
                    <div className="error">Email already exits</div>
                    :
                    null
                }
                <TextField
                    label="Name"
                    type="text"
                    onChange = {(e)=>{setName(e.target.value)}}
                    variant="outlined"
                    size="small"
                    style={{margin:"5px"}}
                    required
                    inputProps={{ pattern: "[A-Za-z0-9]+", title:'No special characters are allowed'}}
                />
                <TextField
                    label="Password"
                    type="password"
                    onChange = {(e)=>{setPassword(e.target.value)}}
                    variant="outlined"
                    size="small"
                    style={{margin:"5px"}}
                    required
                    inputProps={{ maxLength: 20,pattern: "[A-Za-z0-9]+",title:'No special characters are allowed'  }}
                />
                <TextField
                    label="Confirm password"
                    type="password"
                    onChange = {(e)=>{setConfirmPassword(e.target.value)}}
                    variant="outlined"
                    size="small"
                    style={{margin:"5px"}}
                    required
                    inputProps={{ maxLength: 20,pattern: "[A-Za-z0-9]+",title:'No special characters are allowed' }}
                    
                />
                <input  type="submit"/>
            </form>
        </div>
    )
}

export default Register;
