import React, { useEffect, useState } from "react";
import List from "./List";
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
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 10;

    const [indexOfLastPost, setIndexOfLastPost] = useState(9);
    const [indexOfFirstPost, setIndexOfFirstPost] = useState(0);

    const [currentPosts, setCurrentPosts] = useState([]);

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
    }, []); 

    useEffect(() => {
        if (indexOfLastPost) {
            getPosts().then((result) => {
                setItems(result);
                setCurrentPosts(result.posts.slice(indexOfFirstPost, indexOfLastPost));
                setDataisLoaded(true);
            })
        } 
        if (selected) {
            getPosts().then((result) => {
                setItems(result);
                const selectedItems = result.posts.filter(post => post.categories.map(category => category.name).includes(selected)).slice(indexOfFirstPost, indexOfLastPost);
                setCurrentPosts(selectedItems);
                setNpages(Math.ceil(selectedItems.length / postsPerPage));
                setDataisLoaded(true);
            })
        }
    }, [indexOfFirstPost, indexOfLastPost, selected])

    useEffect(() => {
        if (currentPosts) {
            console.log("a")
        }
    }, [setCurrentPosts])

    function handleClick(category) {
        if (selected === category) {
            setSelected(""); //reset
            setNpages(Math.ceil(items.posts.length / postsPerPage));
        }
        else {
            setSelected(category);
        }
    }

    if (!DataisLoaded) return <div>
        <h1> Please wait some time.... </h1> </div>;
    return (
        <div className="Posts">
            <div className="CategoryFilter">
                <h2> Filter by category </h2>
                {categories.map(category => <ol key={category}> <div onClick={() => { handleClick(category) }} className={category === selected ? "selected" : "category"}>{category}</div> </ol>)}
            </div>
            <List 
                currentPosts={currentPosts}
                selected={selected}
            />
            <Pagination
                nPages={nPages}
                postsPerPage={postsPerPage}
                currentPage={currentPage}
                setCurrentPage={(index) => setCurrentPage(index)}
                setIndexOfLastPost={(index) => setIndexOfLastPost(index)}
                setIndexOfFirstPost={(index) => setIndexOfFirstPost(index)}
            />
        </div>
    );
}

export default Posts;