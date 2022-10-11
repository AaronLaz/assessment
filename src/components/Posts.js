import React from "react";
import Post from "./Post";
import { getPosts } from "../api";

class Posts extends React.Component{
     // Constructor 
    constructor(props) {
        super(props);
        this.state = {
            items:[],
            DataisLoaded: false
        };
    }

    componentDidMount(){
       getPosts().then((result) =>{
        this.setState({items : result});
        this.setState({DataisLoaded : true});
       })
    }


    render() {
        const { DataisLoaded, items } = this.state;
        if (!DataisLoaded) return <div>
            <h1> Please wait some time.... </h1> </div> ;
        console.log(items.posts)
        return (
        <div className="Posts">
            
            {items.posts.map(post => (
                <ol key={post.id}>
                    <Post id={post.id} 
                title={post.title}
              publishDate={post.publishDate}
              author={post.author.name}
              summary={post.summary}
              categories={post.categories}
              />
                </ol>
                
            
          ))}
        </div>
      );
    }

}

export default Posts;