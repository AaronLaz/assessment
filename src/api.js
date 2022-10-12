import axios from 'axios';

// retrieve all the posts
export async function getPosts() {
    return new Promise((resolve, reject) => {
        try {
            const url = "https://localhost:3000/api/posts";
            const config = {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json'
                },
            };
            axios.get(url, config).then((posts) => {
                resolve(posts.data);
            });
        } catch (err) {
            reject(err);
        }
    });
}

// retrieve all the categories that are unique
export async function getCategories() {
    return new Promise((resolve, reject) => {
        try {
            const url = "https://localhost:3000/api/categories";
            const config = {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json'
                },
            };
            axios.get(url, config).then((categories) => {
                resolve(categories.data);
            });
        } catch (err) {
            reject(err);
        }
    });
}

// get a specific post based on the id given
export async function getPost(id) {
    return new Promise((resolve, reject) => {
        try {
            const url = `https://localhost:3000/api/post/${id}`;
            const config = {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json'
                },
            };
            axios.get(url, config).then((post) => {
                resolve(post.data);
            });
        } catch (err) {
            reject(err);
        }
    });
}