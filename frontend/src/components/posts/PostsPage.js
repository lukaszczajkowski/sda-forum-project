import React, { useEffect, useState } from "react";
import PostsApi from '../../api/PostsApi';
import Card from '../cards/Card';
import PostForm from "./PostForm";

function PostsPage() {
    const [posts, setPosts] = useState([]);

    const createPost = (postData) => {
        PostsApi.createPost(postData);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect( async () => {
        const source = PostsApi.getAllPosts()
            .then(response => {
                const data = response.data;
                setPosts(data);
            })
            .catch(err => console.log(err));
    }, []);
    
    const cards = posts.map((item) => {
        return <Card key = {item.id} data = {item}/>
    });

    return (
        <div className = "posts-page">
            <div>
                <PostForm onSubmit={createPost}/>
            </div>
            {cards}
        </div>
    );
}

export default PostsPage;