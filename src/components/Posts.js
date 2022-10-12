import React, { useEffect, useState } from "react";
import Post from "./Post";
import { getPosts, getCategories } from "../api";
import Pagination from "./Pagination";

function Posts() {
    // Init
    const [items, setItems] = useState([]);
    const [DataisLoaded, setDataisLoaded] = useState(false)

    // Category filter
    const [selected, setSelected] = useState("");
    const [categories, setCategories] = useState([]);

    // Pagination
    // Current page of user, default is 1
    const [currentPage, setCurrentPage] = useState(1);
    // Number of posts to display on each page, default is 10 
    const postsPerPage = 10;

    const [indexOfLastPost, setIndexOfLastPost] = useState(9);//currentPage * postsPerPage;
    const [indexOfFirstPost, setIndexOfFirstPost] = useState(0);//indexOfLastPost - postsPerPage;

    // Posts to be displayed on the current page
    const [currentPosts, setCurrentPosts] = useState([]);//indexOfFirstPost, indexOfLastPost);

    // ceil function to fit the remainder of the posts on a new page if the total number is not evenly divisible
    const [nPages,setNpages] = useState(1);

    useEffect(() => {
        getPosts().then((result) => {
            setItems(result);
            setCurrentPosts(result.posts.slice(indexOfFirstPost, indexOfLastPost));
            setNpages(Math.ceil(result.posts.length / postsPerPage));
            setDataisLoaded(true);
        })
        if (categories.length === 0) {
            getCategories().then((result) => {
                setCategories(result);
            })
        }
    }, []); // not an optimal solution

    // attempt to use map() function directly but stopped working, tried making another api route
    // function getCategories(){
    //     if(items){
    //     // flatmap to put all the categories into a flat array
    //     var allCategories = items.posts.map(post => post.categories).flatMap(post => post);
    //     // extract only the names, as the ids are unique even with the same category
    //     allCategories = allCategories.map(category => category.name);
    //     // filter the duplicate category names
    //     setCategories(allCategories.filter(function(value, index){ return allCategories.indexOf(value) == index }));
    //     console.log(categories); 
    // } else{
    //     console.log("Items not available");
    // }     
    // }

    function handleClick(category) {
        if (selected === category) {
            setSelected(""); //reset
        }
        else {
            setSelected(category);
        }
    }
/*
    // Pagination
    // Current page of user, default is 1
    const [currentPage, setCurrentPage] = useState(1);
    // Number of posts to display on each page, default is 10 
    const [postsPerPage] = useState(10);

    if(items && items.posts) {
        // Index of first and last post to display per page
        const indexOfLastPost = 9;//currentPage * postsPerPage;
        const indexOfFirstPost = 0;//indexOfLastPost - postsPerPage;

        // Posts to be displayed on the current page
        const currentPosts = items.posts.slice(indexOfFirstPost, indexOfLastPost);

        // ceil function to fit the remainder of the posts on a new page if the total number is not evenly divisible
        const nPages = Math.ceil(items.posts.length / postsPerPage)
    }
    */

    if (!DataisLoaded) return <div>
        <h1> Please wait some time.... </h1> </div>;
    return (
        <div className="Posts">
            <div className="CategoryFilter">
                <h2> Filter by category </h2>
                {categories.map(category => <ol key={category}> <div onClick={() => { handleClick(category) }} className={category === selected ? "selected" : "category"}>{category}</div> </ol>)}
            </div>
            <div className="PostDisplay">
                {currentPosts.map(post => (
                    <ol key={post.id}>
                        {selected !== "" && !post.categories.map(category => category.name).includes(selected) ?
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
            <Pagination
                nPages={nPages}
                postsPerPage={postsPerPage}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                setIndexOfLastPost={setIndexOfLastPost}
                setIndexOfFirstPost={setIndexOfFirstPost}
            />
        </div>
    );
}

export default Posts;