import React from "react";

const Pagination = (props) => {

    // Create array to hold the number of pages
    const pageNumbers = [...Array(props.nPages + 1).keys()].slice(1);

    const nextPage = () => {
        if (props.currentPage !== props.nPages){
            const test = props.currentPage + 1;
            props.setCurrentPage(test);
            const test2 = test * props.postsPerPage;
            props.setIndexOfLastPost(test2);
            const test3 = test2 - props.postsPerPage;
            props.setIndexOfFirstPost(test3);
        }
    }

    const prevPage = () => {
        if (props.currentPage !== 1){
            const test = props.currentPage - 1;
            props.setCurrentPage(test);
            const test2 = test * props.postsPerPage;
            props.setIndexOfLastPost(test2);
            console.log("last : ",test2);
            const test3 = test2 - props.postsPerPage;
            props.setIndexOfFirstPost(test3);
            console.log("first : ",test3);
        }      
    }

    return (
        <nav>
            <ul className="pagination justify-content-center">
                <li className="page-item">
                    <a className="page-link" onClick={() => prevPage()} href='#'>
                        Previous
                    </a>
                </li>
                {
                    pageNumbers.map(pgNumber => (
                        <li key={pgNumber} className={`page-item ${props.currentPage === pgNumber ? 'active' : ''}`}>
                            <a hidden={props.currentPage === pgNumber} className="page-link" onClick={() => {
                                props.setCurrentPage(pgNumber);
                                const test2 = pgNumber * props.postsPerPage;
                                props.setIndexOfLastPost(test2);
                                const test3 = test2 - props.postsPerPage;
                                props.setIndexOfFirstPost(test3);
                            }} href='#'>
                                {pgNumber}
                            </a>
                        </li>
                    ))
                }
                <li className="page-item">
                    <a className="page-link" onClick={() => nextPage()} href='#'>
                        Next
                    </a>
                </li>
            </ul>
        </nav>
    );
}

export default Pagination;