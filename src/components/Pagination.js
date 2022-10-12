import React from "react";

const Pagination = (props) => {

    // Create array to hold the number of pages
    const pageNumbers = [...Array(props.nPages + 1).keys()].slice(1);

    const nextPage = () => {
        if (props.currentPage !== props.nPages) {
            const test = props.currentPage + 1;
            props.setCurrentPage(test);
            const test2 = test * props.postsPerPage;
            props.setIndexOfLastPost(test2);
            const test3 = test2 - props.postsPerPage;
            props.setIndexOfFirstPost(test3);
        }
    }

    const prevPage = () => {
        if (props.currentPage !== 1) {
            const test = props.currentPage - 1;
            props.setCurrentPage(test);
            const test2 = test * props.postsPerPage;
            props.setIndexOfLastPost(test2);
            const test3 = test2 - props.postsPerPage;
            props.setIndexOfFirstPost(test3);
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
                        className={`page-item ${props.currentPage === pgNumber ? 'active' : ''}`}
                        onClick={() => {
                            props.setCurrentPage(pgNumber);
                            const test2 = pgNumber * props.postsPerPage;
                            props.setIndexOfLastPost(test2);
                            const test3 = test2 - props.postsPerPage;
                            props.setIndexOfFirstPost(test3);
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