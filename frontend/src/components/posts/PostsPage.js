import React, { useEffect, useState } from "react";
import PostsApi from '../../api/PostsApi';
import PostCard from './PostCard';
import PostForm from "./PostForm";

function PostsPage() {
    const [posts, setPosts] = useState([]);

    const createPost = async (postData) => {
        PostsApi.createPost(postData).then(response => setPosts([...posts, response.data]));   
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect( async () => {
        PostsApi.getAllPosts()
            .then(response => {
                const data = response.data;
                setPosts(data);
            })
            .catch(err => console.log(err));
    }, []);
    
    const cards = posts.map((item) => {
        return <PostCard key = {item.id} data = {item}/>
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