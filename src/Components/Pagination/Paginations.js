import React, { useEffect, useState } from 'react';
import './Pagination.css';
import {PageItem,PageFirst,PageLast,PageNext,PagePrev} from './PageItems';

const Pagination = ({currentPage,setCurrentPage,totalResults}) => {


    const [lastPage, setLastPage] = useState(0);
    const [pageItems,setPageItems] = useState([]);

    useEffect(() => {
        if(totalResults < 10 && totalResults > 0){
            setLastPage(1);
        }
        else{
            setLastPage(Math.ceil(totalResults/10));
        }
        
    }, [totalResults]);

    useEffect(() => {
        console.log(totalResults,lastPage);
        let tempPageList = [];
        let first = 1;
        let last = 10;
        if(lastPage < 10){
            first =1;
            last = lastPage;
        }
        else if(currentPage + 10 > lastPage ){
            last = lastPage;
            first = lastPage - 10;
        }
        else if(currentPage < 10){
            first = first;
            last = last;
        }
        else {
            first = currentPage - 4;
            last = currentPage + 5;
        }
        for (let page = first; page <= last; page++) {
            tempPageList.push(
            <PageItem key={page} active={page === currentPage}  pageNumber={page} setCurrentPage={setCurrentPage}/>
            );
        }
        setPageItems(tempPageList);
    }, [currentPage,lastPage])

    if(totalResults)
        return (
            <div className="pagination">
                <PageFirst setCurrentPage={setCurrentPage}/>
                <PagePrev pageNumber={currentPage} setCurrentPage={setCurrentPage}/>
                {
                    pageItems.map((item)=>{
                        return(item)
                    })
                }
                <PageNext pageNumber={currentPage} lastPage={lastPage} setCurrentPage={setCurrentPage}/>
                <PageLast lastPage={lastPage} setCurrentPage={setCurrentPage}/>
            </div>
        );
    else
        return null
}

export default Pagination;
