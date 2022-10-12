import React, { useState } from "react";
import dateFormat from 'dateformat';
import "./App.css";

const Post = (props) => {
    const [post, setPost] = useState(props);
    return (
        <div>
            <pre>
                Title: {post.title}
            </pre>
            <pre>
                Author: {post.author}
            </pre>
            <pre>
                {/* Date format to improve readability */}
                Publish date: {dateFormat(post.publishDate, "mmmm dS yyyy")}
            </pre>
            <pre>
                {/* Display categories in a list */}
                Categories: {
                    post.categories.map((category) => (
                        <ul key={category.id} >
                            {category.name}
                        </ul>
                    ))
                }
            </pre>

            {/* Summary might not be necessary in the list, might add to detail page */}
            {/* <pre>
                  Summary: { post.summary }
                </pre>               */}
        </div>
    );
};

export default Post;