import React, { useEffect, useState } from "react";
import Api from "../../api/Api";
import PostsApi from '../../api/PostsApi';
import PostCard from './PostCard';
import PostForm from "./PostForm";
import SearchBar from "./SearchBar";

function PostsPage() {
    const [posts, setPosts] = useState([]);
    const [sorting, setSorting] = useState("date");
    const [usersPost, setUsersPost] = useState(null);

    const createPost = async (postData) => {
        PostsApi.createPost(postData).then(response => setPosts([...posts, response.data]));   
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect( async () => {
        if(sorting == "name") {
            PostsApi.getPostsSortedByUserName()
                .then(response => {
                    const list = response.data;
                    setPosts(list);
                    setUsersPost(null);
                })
                .catch(err => console.log(err));
        } else {
            PostsApi.getAllPosts()
                .then(response => {
                    const list = response.data;
                    setPosts(list);
                    setUsersPost(null);
                })
                .catch(err => console.log(err));
        }
    }, []);
    
    const cards =  sorting == "author" ?
    posts.filter(post => post.user.id === usersPost)
            .map(post => {
                return <PostCard key = {post.id} data = {post}/>
            })
    :
    posts.map((post) => {
        return <PostCard key = {post.id} data = {post}/>
    })

    const users = posts.map((item) => item.user);

    function showPostByUser(item) {
        if(item !== null){
            setSorting("author");
            setUsersPost(item);
        }
    }
    

    return (
        <div className = "posts-page">
            <div className = "container">
                <button className = "btn btn-warning mr-4 mb-4"
                    onClick = {() => setSorting("date")}>
                    Sort by date
                </button>
                <button className = "btn btn-warning mr-4 mb-4"
                    onClick= {() => setSorting("name")}
                >
                    Sort by title
                </button>
            </div>
            
            <div>
            <SearchBar 
            usersList = {users}
            showOnly={showPostByUser}/>
                <PostForm 
                onSubmit={createPost}
                />
            </div>
            {cards}
        </div>
    );
}

export default PostsPage;