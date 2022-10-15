import React, { useEffect, useState } from 'react';
import './Home.css';
import axios from 'axios';
import SectionListing from '../../Components/SectionListing/SectionListing';
import NewsArticle from '../../Components/NewsArticle/NewsArticle';
import { AiOutlineFilter } from "react-icons/ai";


const Home = () => {

	const [selectedSection, setSelectedSection] = useState('all'); 
	const [user, setUser] = useState({});
	const [filter, setFilter] = useState(false);

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
				<div className={filter ? "sidebar open" : "sidebar"}>
					<div className='navbar-close-btn' onClick={()=>setFilter(!filter)}>&times;</div>
					<SectionListing selectedSection={selectedSection} setSelectedSection={setSelectedSection} setFilter={setFilter}/>
				</div>
				{!filter && <button className={filter ? "filter filter-close" : "filter"} onClick={()=>setFilter(!filter)}>
					{
						filter ? 
							"Close"
							:
							<><AiOutlineFilter className="icon"/> Filter</>
					}


				</button>}
				<NewsArticle selectedSection={selectedSection} setSelectedSection={setSelectedSection} user={user}/>
			</div>
		);
		}
export default Home;
