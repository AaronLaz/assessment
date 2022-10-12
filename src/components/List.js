import React from "react";
import Post from "./Post";

const List = (props) => {
    return(
        <div className="PostDisplay">
            {props.currentPosts.map(post => (
                <ol key={post.id}>
                    {props.selected !== "" && !post.categories.map(category => category.name).includes(props.selected) ?
                        <></>
                        :
                        <Post id={post.id}
                            title={post.title}
                            publishDate={post.publishDate}
                            author={post.author.name}
                            summary={post.summary}
                            categories={post.categories}
                        />}
                </ol>
            ))}
        </div>
    );
}
    
export default List;