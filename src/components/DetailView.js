import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import dateFormat from 'dateformat';
import "./App.css";
import { getPost } from "../api";
import { Loading } from "./loading";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function DetailView() {
    const { id } = useParams();
    const [post, setPost] = useState();
    const [loading, setLoading] = useState(false);
    const [uniqueCategories, setUniqueCategories] = useState([]);

    const history = useHistory();

    useEffect(() => {
        getPost(id).then((result) => {
            setPost(result);
            let temp_categories = result.categories.map((category) => category.name);
            let temp_unique = temp_categories.filter((x, i) => temp_categories.indexOf(x) === i);
            setUniqueCategories(temp_unique);
            setTimeout(() => setLoading(true), 2000);
        })
    }, []);

    if (!loading) return <Loading />;
    return (
        <div>
            <h2> Post Detail </h2>
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