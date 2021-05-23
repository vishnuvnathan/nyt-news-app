import React,{useState,useEffect} from 'react';
import './SectionListing.css';
import axios from 'axios';
import { API_KEY } from '../../Utils/Apikeys';


const SectionListing = ({selectedSection,setSelectedSection}) => {

    const [sections, setSections] = useState([{section: "all", display_name: "All"}]);

    useEffect(() => {
        axios.get(`https://api.nytimes.com/svc/news/v3/content/section-list.json?api-key=${API_KEY}`).then(res =>{
            console.log(res.data);

            setSections([...sections,...res.data.results]);
        })
    }, [])

    return (
        <ul className="section-listing-container">
            {
                sections.map(section=>{
                    return(
                        <li key={section.section} 
                        className={selectedSection === section.section ? "section-link active" : "section-link" }
                        onClick={()=>setSelectedSection(section.section)
                        
                        }
                        >
                            {section.display_name}
                        </li>
                    )
                })
            }
        </ul>
    )
}

export default SectionListing;
