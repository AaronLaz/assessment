import React, { useState } from "react";
import dateFormat from 'dateformat';
import "./App.css";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

// Component to display a post in the form of a card
const Post = (props) => {
    // Initialise the posts in a state
    const [post, setPost] = useState(props);
    // Filter the categories to remove the duplicates
    const categories = props.categories.map((category) => category.name);
    const uniqueCategories = categories.filter((x, i) => categories.indexOf(x) === i);
    // Router
    const history = useHistory();
    // Navigate to the detail page with the router
    const navDetail = (id) => {
        const url = `/${id}/detail`;
        history.push(url);
    }

    return (
        <div className="card">
            <div>
                <p className="card-title">Title: {post.title}</p>
            </div>
            <div>
                <p className="card-author">Author: {post.author}</p>
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
            <button className="detailButton" onClick={() => navDetail(post.id)}> Detail </button>
        </div>
    );
};

export default Post;