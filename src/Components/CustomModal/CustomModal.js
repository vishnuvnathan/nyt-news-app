import React, { useState,useEffect } from 'react';
import Modal from 'react-modal';
import './CustomModal.css'; 
import { AiOutlineCloseCircle } from "react-icons/ai";
import md5 from'md5';

const CustomModal = (props) => {

    const [userList, setUserList] = useState([]);

    const [name, setName] = useState(props.user.name);

    const [password, setPassword] = useState({
        prePassword : '',
        newPassWord : '',
        confirmPassword : ''
    });

    const handleClose = () => {
        props.setShowModal(false);
    };

    const onPasswordChange = (e) =>{

        console.log(password);

        e.preventDefault();

        let tempUserList = [...userList];

        let objIndex = userList.findIndex((obj => obj.id === props.user.id));

        if(md5(password.prePassword) !== tempUserList[objIndex].password){
            alert("Current password is not correct");
        }
        else if(password.newPassWord !== password.confirmPassword){
            alert("Password mismatch")
        }
        else{
            tempUserList[objIndex].password = md5(password.newPassWord);

            localStorage.setItem('users',JSON.stringify(tempUserList));

            alert(`password changed`);
        }

    }


    const onChange = e => setPassword({ ...password, [e.target.name]: e.target.value });

    const onNameChange = (e) =>{
        e.preventDefault();
        props.setUser({...props.user,name:name});

        let tempUserList = [...userList];

        let objIndex = userList.findIndex((obj => obj.id === props.user.id));

        tempUserList[objIndex].name = name;

        localStorage.setItem('users',JSON.stringify(tempUserList));

        alert(`Name Changed to ${name}`);
    };

    useEffect(() => {
        localStorage.setItem('loggedInUser',JSON.stringify(props.user));
    }, [props.user]);

    useEffect(() => {
        let users = localStorage.getItem('users');
        if(users){
            users = JSON.parse(users);
            setUserList(users);
        }
        
    }, []);

    return (
        <div>
        <Modal 
            isOpen={props.showModal}
            contentLabel="onRequestClose Example"
            onRequestClose={handleClose}
            className="Modal"
            overlayClassName="Overlay"
            >
            <div className="modal-action">
                <AiOutlineCloseCircle onClick={()=>handleClose()} />
            </div>
            <div className="modal-content">
                <form onSubmit={(e)=>onNameChange(e)}>
                    <h3>
                        Change Name
                    </h3>

                    <input type="text" value={name} className="Name" onChange={e=>setName(e.target.value)}/>

                    <input type="submit" value='save' />

                </form>
                <form onSubmit={(e)=>onPasswordChange(e)}>
                    <h3>
                        Change Password
                    </h3>

                    <input onChange={onChange} name='prePassword' type="password" placeholder="Currenet password"/>
                    <input onChange={onChange} name='newPassWord' type="password" placeholder="New password"/>
                    <input onChange={onChange} name="confirmPassword" type="password" placeholder="Confirm password"/>

                    <input type="submit" value='save' />

                </form>
            </div>
            

        </Modal>
        </div>
    )
}

export default CustomModal;
