import React, { useEffect, useState } from 'react';
import Loading from '../../Components/Loading/Loading';
import Pagination from '../../Components/Pagination/Paginations';
import './SavedNews.css';

const SavedNews = (props) => {


    const [currentPage, setCurrentPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [loader, setLoader] = useState(true);

    const [getSavedNews, setGetSavedNews] = useState([]);

    useEffect(() => {
        console.log("------",props.match.params.id);
        let getUser = localStorage.getItem('loggedInUser');
        if(getUser){
			getUser = JSON.parse(getUser);
            if(getUser.id !== props.match.params.id)
                window.location.href = '/'
            else{
                let readLater = localStorage.getItem('readLater');
                if(readLater){
                    readLater = JSON.parse(readLater);
                    let filteredNews = readLater.filter(function(event){
                        return event.user_id === props.match.params.id
                    });
                    setTotalResults(filteredNews.length);
                    setGetSavedNews(filteredNews);
                    setLoader(false);
                }
            }
        }
        else 
            window.location.href = '/';
    }, []);


    const onDelete = (news_id) =>{

        

        if(window.confirm("Do you really want to delete this news?")){
            console.log(news_id);
            let readLater = localStorage.getItem('readLater');
            if(readLater){
                readLater = JSON.parse(readLater);
                let newsAfterDelete = readLater.filter(function(event){
                    return event.news_id !== news_id
                });
                localStorage.setItem('readLater',JSON.stringify(newsAfterDelete));

                let currentUserNewsAfterDelete = getSavedNews.filter(function(event){
                    return event.news_id !== news_id
                });

                setGetSavedNews(currentUserNewsAfterDelete);
            }
        }
        
    }

    useEffect(() => {
        console.log(getSavedNews);
    }, [getSavedNews])

if(getSavedNews.length > 0)
    return (
        <div className="saved-news-container">
            {
                getSavedNews.slice((currentPage - 1)*10, ((currentPage - 1)*10+10)).map(news =>{
                    return(
                        <div className="news">
                            <a href={news.url} target='_blanck' > 
                            <h3>
                                {
                                    news.title
                                }
                            </h3>
                            </a>
                            <button className="delete" onClick={()=>onDelete(news.news_id)}>Delete</button>
                        </div>
                        
                    )
                })
            }
            {
                        loader?
                            <Loading/>
                        :
                            null
            }
    
            <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalResults={totalResults}/>
        </div>
    )
else
    return(
        <h3 className="no-saved-news">
            No saved news
        </h3>
    )
}

export default SavedNews;
