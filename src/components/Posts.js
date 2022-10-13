import React, { useEffect, useState } from "react";
import List from "./List";
import { getPosts, getCategories } from "../api";
import Pagination from "./Pagination";
import './App.css';
import { Loading } from "./loading";

// Main component, could have been App
function Posts() {
    // Init
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);

    // Category filter
    const [selected, setSelected] = useState("");
    const [categories, setCategories] = useState([]);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 9;
    // States used for the posts that are being displayed on the page
    const [indexOfLastPost, setIndexOfLastPost] = useState(9);
    const [indexOfFirstPost, setIndexOfFirstPost] = useState(0);
    const [currentPosts, setCurrentPosts] = useState([]);
    // The number of pages for the pagination
    const [nPages, setNpages] = useState(1);

    useEffect(() => {
        // Call the api function to retrieve all the posts and determine which ones to display
        // The loading component will be displayed while the data is loaded and the states are being set
        getPosts().then((result) => {
            setItems(result);
            setCurrentPosts(result.posts.slice(indexOfFirstPost, indexOfLastPost));
            setNpages(Math.ceil(result.posts.length / postsPerPage));
            setLoading(true);
        })
        // if the unique categories haven't been retrieved yet, call the api function and set the state
        if (categories.length === 0) {
            getCategories().then((result) => {
                setCategories(result);
            })
        }
    }, []);

    useEffect(() => {
        // If there is a modification in the index due to a change in state by the pagination component, recalculate the current posts being displayed
        if (indexOfLastPost) {
            setLoading(false);
            getPosts().then((result) => {
                setItems(result);
                setCurrentPosts(result.posts.slice(indexOfFirstPost, indexOfLastPost));
                setLoading(true);
            })
        }
        // If the category filter is changed, retrieve and filter the posts by the selected category and recalculate the number of pages for the pagination
        if (selected) {
            setLoading(false);
            getPosts().then((result) => {
                setItems(result);
                const selectedItems = result.posts.filter(post => post.categories.map(category => category.name).includes(selected)).slice(indexOfFirstPost, indexOfLastPost);
                setCurrentPosts(selectedItems);
                setNpages(Math.ceil(selectedItems.length / postsPerPage));
                setLoading(true);
            })
        }
    }, [indexOfFirstPost, indexOfLastPost, selected])

    // Selecting a category to filter the posts, set the state of the current selected category and resets if the "ALL" option is selected
    function handleClick(category) {
        if (category === "All") {
            setSelected(""); //reset
            setNpages(Math.ceil(items.posts.length / postsPerPage));
        }
        else {
            setSelected(category);
        }
    }

    // loading component
    if (!loading) return <Loading />;

    // main component
    return (
        <div className="posts">
            <div className="CategoryFilter">
                <h2> Filter by category </h2>
                <select value={selected} onChange={(event) => handleClick(event.target.value)}>
                    <option value="All">
                        All
                    </option>
                    {categories.map(category =>
                        <option key={category} value={category}>
                            {category}
                        </option>
                    )}
                </select>

            </div>
            {/* List component to map the posts */}
            <List
                currentPosts={currentPosts}
                selected={selected}
            />
            {/* Pagination component with the page selector */}
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