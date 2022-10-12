import React from "react";
import Post from "./Post";

const List = (props) => {
    return(
        <div className="PostDisplay">
            {props.currentPosts.map(post => (
                <div key={post.id}>
                    <Post id={post.id}
                        title={post.title}
                        publishDate={post.publishDate}
                        author={post.author.name}
                        summary={post.summary}
                        categories={post.categories}
                    />
                </div>
            ))}
        </div>
    );
}
    
export default List;