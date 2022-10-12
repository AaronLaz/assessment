import React, { useState } from "react";

const Pagination = (props) =>{

    // Create array to hold the number of pages
    const pageNumbers = [...Array(props.nPages + 1).keys()].slice(1);

    const nextPage = () => {
        if (props.currentPage !== props.nPages){
            console.log(props.currentPage);
            props.setCurrentPage(props.currentPage + 1);
            props.setIndexOfLastPost(props.currentPage * props.postsPerPage);
            props.setIndexOfFirstPost(props.indexOfLastPage - props.postsPerPage);
            console.log(props.currentPage);
        }
    }
    const prevPage = () => {
        if (props.currentPage !== 1){
            props.setCurrentPage(props.currentPage - 1);
            props.setIndexOfLastPost(props.currentPage * props.postsPerPage);
            props.setIndexOfFirstPost(props.indexOfLastPage - props.postsPerPage);
        }
            
    }


    return (

        <nav>
            <ul className="pagination justify-content-center">
                <li className="page-item">
                    <a className="page-link" onClick={prevPage} href='#'>
                        Previous
                    </a>
                </li>
                {
                    pageNumbers.map(pgNumber => (
                        <li key={pgNumber} className={`page-item ${props.currentPage === pgNumber ? 'active' : ''}`}>
                            <a className="page-link" onClick={() => props.setCurrentPage(pgNumber)} href='#'>
                                {pgNumber}
                            </a>
                        </li>
                    ))
                }
                <li className="page-item">
                    <a className="page-link" onClick={nextPage} href='#'>
                        Next
                    </a>
                </li>
            </ul>
        </nav>

    );
}

export default Pagination;