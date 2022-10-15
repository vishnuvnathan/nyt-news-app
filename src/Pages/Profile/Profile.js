import React from "react";
import { useEffect, useState } from "react";
import "./Profile.css";
import { FaUserCircle } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { BiUserCircle } from "react-icons/bi";
import CustomModal from "../../Components/CustomModal/CustomModal";
import { Link } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);

  const [open, setOpen] = React.useState(false);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    let getUser = localStorage.getItem("loggedInUser");
    if (getUser) {
      getUser = JSON.parse(getUser);
      setUser({
        email: getUser.email,
        id: getUser.id,
        name: getUser.name,
        password: getUser.password,
      });
    } else {
      window.location.href = "/";
    }
  }, []);

  const onDeleteAccount = (id) => {
    if (window.confirm("Do you want delete this account")) {
      let users = localStorage.getItem("users");
      if (users) {
        users = JSON.parse(users);
        let newUsersList = users.filter(function (event) {
          return event.id !== id;
        });
        localStorage.setItem("users", JSON.stringify(newUsersList));
      }
      localStorage.removeItem("loggedInUser");
      localStorage.removeItem("isLoggedIn");
      window.location.href = "/";
    }
  };

  const onLogout = () => {
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("isLoggedIn");
    window.location.href = "/";
  };

  if (user)
    return (
      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-cover" />
          <FaUserCircle className="icon" />
          <span>
            <b> {user.name}</b>
          </span>
          <span>{user.email}</span>

          <span>
            <Link
              to={`/saved_news/${user.id}`}
              style={{ textDecoration: "none", width: "100%" }}
            >
              <button>Read saved news</button>
            </Link>
          </span>
          <span>
            <button onClick={() => setShowModal(true)}>
              Change Name <br />
              or <br /> Password
            </button>
          </span>

          <span>
            <button className="delete" onClick={() => onDeleteAccount(user.id)}>
              Delete Account
            </button>
          </span>

          <span>
            <button className="logoutButton" onClick={() => onLogout()}>
              Logout
            </button>
          </span>

          <CustomModal
            showModal={showModal}
            setShowModal={setShowModal}
            user={user}
            setUser={setUser}
          />
        </div>
      </div>
    );
  else return null;
};

export default Profile;
