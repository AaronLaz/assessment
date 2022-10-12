import React, { useState } from "react";
import dateFormat from 'dateformat';
import "./App.css";

const Post = (props) => {
    const [post, setPost] = useState(props);
    const categories = props.categories.map((category) => category.name);
    const uniqueCategories = categories.filter((x,i) => categories.indexOf(x) === i);
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
            {/* Summary might not be necessary in the list, might add to detail page */}
            {/* <pre>
                  Summary: { post.summary }
                </pre>               */}
        </div>
    );
};

export default Post;