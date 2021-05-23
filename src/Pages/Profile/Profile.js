import React from 'react';
import { useEffect,useState } from 'react';
import './Profile.css';
import { FaUserCircle } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { BiUserCircle } from "react-icons/bi";
import CustomModal from '../../Components/CustomModal/CustomModal';

const Profile = () => {

    const [user, setUser] = useState(null);

    const [open, setOpen] = React.useState(false);

    const [showModal, setShowModal] = useState(false);

	useEffect(() => {
        let getUser = localStorage.getItem('loggedInUser');
        if(getUser){
			getUser = JSON.parse(getUser);
			setUser({
				email:getUser.email,
				id : getUser.id,
				name : getUser.name,
                password : getUser.password
			})
		}
    }, []);


    if(user)
        return (
            <div className="profile-container">
                <FaUserCircle className="icon"/>
                <span><HiOutlineMail className="icon"/> <b>{user.email}</b></span>
                <span><BiUserCircle className="icon"/> <b>{user.name}</b></span>
                <span>
                    <button onClick={()=>setShowModal(true)}>
                        Change Name Or PassWord
                    </button>
                </span>
                <span>
                    <button>
                        Read saved news
                    </button>
                </span>

                <CustomModal showModal={showModal} setShowModal={setShowModal} user={user} setUser={setUser}/>

            </div>
        )
    else
        return null
}

export default Profile
