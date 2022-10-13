import React from "react";

// Pagination component to move between pages
const Pagination = (props) => {

    // Create array to hold the number of pages
    const pageNumbers = [...Array(props.nPages + 1).keys()].slice(1);

    // function to pass to the next page
    const nextPage = () => {
        if (props.currentPage !== props.nPages) {
            const next = props.currentPage + 1;
            props.setCurrentPage(next);
            updateIndex();
        }
    }

    // function to pass to the previous page
    const prevPage = () => {
        if (props.currentPage !== 1) {
            const prev = props.currentPage - 1;
            props.setCurrentPage(prev);
            updateIndex();
        }
    }

    // function to update the indexes of the current posts being displayed
    const updateIndex = () => {
        if (props.currentPage !== 1) {
            const last = props.currentPage * props.postsPerPage;
            props.setIndexOfLastPost(last);
            const first = last - props.postsPerPage;
            props.setIndexOfFirstPost(first);
        }
    }

    return (
        <div className="pagination-items">
            <div className="page-item" onClick={() => prevPage()}>
                Previous
            </div>
            {
                pageNumbers.map(pgNumber => (
                    <div
                        key={pgNumber}
                        // Change the class based on the current page, for css purposes
                        className={`page-item ${props.currentPage === pgNumber ? 'active' : ''}`}
                        onClick={() => {
                            // Page selector by page number
                            props.setCurrentPage(pgNumber);
                            updateIndex();
                        }}>
                        {pgNumber}
                    </div>
                ))
            }
            <div className="page-item" onClick={() => nextPage()}>
                Next
            </div>
        </div>
    );
}

export default Pagination;