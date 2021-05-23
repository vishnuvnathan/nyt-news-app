import React, { useEffect, useState } from 'react';
import './Home.css';
import axios from 'axios';
import SectionListing from '../../Components/SectionListing/SectionListing';
import NewsArticle from '../../Components/NewsArticle/NewsArticle';



const Home = () => {

	const [selectedSection, setSelectedSection] = useState('all'); 
	const [user, setUser] = useState({});

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
			<div className="home-container">
				<SectionListing selectedSection={selectedSection} setSelectedSection={setSelectedSection} />
				<NewsArticle selectedSection={selectedSection} setSelectedSection={setSelectedSection} user={user}/>
			</div>
		);
		}
export default Home;
