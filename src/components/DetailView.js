import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import dateFormat from 'dateformat';
import "./App.css";
import { getPost } from "../api";
import { Loading } from "./loading";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

// Same as the posts component, with the summary being displayed in addition
function DetailView() {

    // initializing states
    const [post, setPost] = useState();
    const [uniqueCategories, setUniqueCategories] = useState([]);
    // loading component state
    const [loading, setLoading] = useState(false);
    // Retrieve the id of the post that will be used by the api
    const { id } = useParams();


    // Router
    const history = useHistory();

    useEffect(() => {
        //  Retrieve the post based on the id, then filter out the duplicate categories if they exist
        getPost(id).then((result) => {
            setPost(result);
            let temp_categories = result.categories.map((category) => category.name);
            let temp_unique = temp_categories.filter((x, i) => temp_categories.indexOf(x) === i);
            setUniqueCategories(temp_unique);
            setTimeout(() => setLoading(true), 2000);
        })
    }, []);
    // loading component
    if (!loading) return <Loading />;
    // main component
    return (
        <div>
            <h2> Post Detail </h2>
            {/* Router to return to the home page */}
            <button className="homeButton" onClick={() => history.push('/')}>Back home</button>
            <div className="cardDetail">
                <div>
                    <p className="card-title">Title: {post.title}</p>
                </div>
                <div>
                    <p className="card-author">Author: {post.author.name}</p>
                </div>
                <div>
                    <p>Publish date: {dateFormat(post.publishDate, "mmmm dS yyyy")}</p>
                </div>
                <div>
                    <div>Categories:</div>
                    <div className="categories-list">
                        {uniqueCategories.map((category) => (
                            <div className="category-tag" key={category}>
                                {category}
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <p>Summary: {post.summary}</p>
                </div>
            </div>
        </div>

    );
};

export default DetailView;