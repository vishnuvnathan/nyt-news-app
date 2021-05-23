import React from 'react';
import { AiOutlineDoubleLeft,AiOutlineDoubleRight,AiOutlineLeft,AiOutlineRight } from "react-icons/ai";

export function PageItem({pageNumber,active,setCurrentPage}) {
    return (
        <>
        {
            active ?
            <div className="page-item active" onClick={()=>{setCurrentPage(pageNumber)}}>
                {pageNumber}
            </div>
            :
            <div className="page-item" onClick={()=>{setCurrentPage(pageNumber)}}>
                {pageNumber}
            </div>
        }
        </>
    )
}
export function PageFirst({setCurrentPage}) {
    return (
        <div className="page-item" onClick={()=>{
            setCurrentPage(1)
        }}>
            <AiOutlineDoubleLeft/>
        </div>
    )
}
export function PageLast({lastPage,setCurrentPage}) {
    return (
        <div className="page-item" onClick={()=>{
            setCurrentPage(lastPage);
        }}>
            <AiOutlineDoubleRight/>
        </div>
    )
}
export function PageNext({pageNumber,lastPage,setCurrentPage}) {
    return (
        <div className="page-item" onClick={()=>{
            if(pageNumber < lastPage+1)
                setCurrentPage(pageNumber + 1)
        }}>
            <AiOutlineRight/>
        </div>
    )
}
export function PagePrev({pageNumber,setCurrentPage}) {
    return (
        <div className="page-item" onClick={
            ()=>{if(pageNumber > 1)
                    setCurrentPage(pageNumber - 1)} }
            >
            <AiOutlineLeft/>
        </div>
    )
}

