import axios from 'axios';
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
        } catch(err) {
            reject(err);
        }
    });
}