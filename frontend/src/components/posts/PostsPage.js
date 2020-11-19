import React, { useEffect, useState } from "react";
import PostsApi from '../../api/PostsApi';
import ReactionApi from "../../api/ReactionApi";
import PostCard from './PostCard';
import PostForm from "./PostForm";

function PostsPage() {
    const [posts, setPosts] = useState([]);
    const [reactions, setReactions] = useState([]);

    const createPost = async (postData) => {
        PostsApi.createPost(postData).then(response => setPosts([...posts, response.data]));   
    };

    const createReaction = async(reactionData) => {
        ReactionApi.createReaction(reactionData)
    }

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