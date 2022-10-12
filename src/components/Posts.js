import React, { useEffect, useState } from "react";
import List from "./List";
import { getPosts, getCategories } from "../api";
import Pagination from "./Pagination";
import './App.css';
import { Loading } from "./loading";

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

    const [indexOfLastPost, setIndexOfLastPost] = useState(9);
    const [indexOfFirstPost, setIndexOfFirstPost] = useState(0);

    const [currentPosts, setCurrentPosts] = useState([]);

    const [nPages, setNpages] = useState(1);

    useEffect(() => {
        getPosts().then((result) => {
            setItems(result);
            setCurrentPosts(result.posts.slice(indexOfFirstPost, indexOfLastPost));
            setNpages(Math.ceil(result.posts.length / postsPerPage));
            setLoading(true);
        })
        if (categories.length === 0) {
            getCategories().then((result) => {
                setCategories(result);
            })
        }
    }, []);

    useEffect(() => {
        if (indexOfLastPost) {
            setLoading(false);
            getPosts().then((result) => {
                setItems(result);
                setCurrentPosts(result.posts.slice(indexOfFirstPost, indexOfLastPost));
                setLoading(true);
            })
        }
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

    function handleClick(category) {
        if (category === "") {
            setSelected(""); //reset
            setNpages(Math.ceil(items.posts.length / postsPerPage));
        }
        else {
            setSelected(category);
        }
    }

    if (!loading) return <Loading />;
    return (
        <div className="posts">
            <div className="CategoryFilter">
                <h2> Filter by category </h2>
                <select value={selected} onChange={(event) => handleClick(event.target.value)}>
                    <option value="">
                        All
                    </option>
                    {categories.map(category =>
                        <option key={category} value={category}>
                            {category}
                        </option>
                    )}
                </select>

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