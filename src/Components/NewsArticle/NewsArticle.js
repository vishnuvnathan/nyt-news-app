import React from 'react';
import './NewsArticle.css';
import axios from 'axios';
import { useEffect } from 'react';
import { API_KEY } from '../../Utils/Apikeys';
import { useState } from 'react';
import {format} from 'date-fns';
import Pagination from '../Pagination/Paginations';
import Loading from '../Loading/Loading';
import { v4 as uuidv4 } from 'uuid';

const NewsArticle = ({selectedSection,user}) => {

    const [newsArticles, setNewsArticles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [loader, setLoader] = useState(true);




    useEffect(() => {
        setLoader(true);
        axios.get(`https://api.nytimes.com/svc/news/v3/content/all/${selectedSection}.json?api-key=${API_KEY}&offset=${(currentPage - 1)*10}&limit=10`).then(res =>{
            console.log(res.data);
            if(res.data.results){   
                if(currentPage === 1)
                    setTotalResults(res.data.num_results);
                setNewsArticles(res.data.results);
                setLoader(false);
            }
        });

    }, [selectedSection,currentPage]);


    useEffect(() => {
        setTotalResults(0);
        setCurrentPage(1);
    }, [selectedSection]);

    useEffect(() => {
        let readLater = localStorage.getItem('readLater');
        if(!readLater)
            localStorage.setItem('readLater',JSON.stringify([]));
    }, [])


    const readLater = (article) =>{
        let readLater = localStorage.getItem('readLater');
        if(readLater){
			readLater = JSON.parse(readLater);
			readLater.push({
                news_id : uuidv4(),
                user_id : user.id,
                title : article.title,
                url : article.url
            });
            localStorage.setItem('readLater',JSON.stringify(readLater));
            alert("Saved to Read later")
		}
    }

        return (
            <div className="news-article-container">
                {
                    newsArticles.map((article,index) =>{
                        return(
                            <div className="article-wrapper" key={article.slug_name}>
                                <a href={article.url} target="_blank">
                                    <article className="acticle" >
                                        <section>
                                            <img src={article.thumbnail_standard} alt="" />
                                        </section>
                                        <section className="article-section">
                                            <h3>
                                                {
                                                    article.title
                                                }
                                            </h3>
                                            
                                            <p>
                                                {
                                                    article.abstract
                                                }
                                            </p>
                                            <div className="action">
                                                <small>
                                                    {
                                                        format(new Date(article.published_date),'dd-MM-yyyy hh:mm')
                                                    }
                                                </small>

                                            </div>
                                            
                                        </section>
                                        
                                    </article>
                                </a>
                                <button onClick={()=>readLater(article)}>
                                    Read Later
                                </button>

                                <hr />
                                <hr />
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
    
}

export default NewsArticle;
