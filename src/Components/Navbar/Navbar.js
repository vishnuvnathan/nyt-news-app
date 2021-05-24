import React, { useEffect, useContext, useState } from 'react';
import './Navbar.css';
import { FaUserCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [user, setUser] = useState(null);
	useEffect(() => {
        let getUser = localStorage.getItem('loggedInUser');
        if(getUser){
			getUser = JSON.parse(getUser);
			setUser({
				email:getUser.email,
				id : getUser.id,
				name : getUser.name
			})
		}
    }, [])

    return (
            <nav>
                <div className="logo-container">
                    <Link to='/'>
                        <img src="/logo.png" className="logo" alt="logo" />
                    </Link>
                </div>
                <Link to='/profile' style={{textDecoration:'none'}}>
                    <div className="profile">
                        <FaUserCircle className="icon"/>
                        {user && user.email}
                    </div>
                </Link>
                
            </nav>
    )
}

export default Navbar
