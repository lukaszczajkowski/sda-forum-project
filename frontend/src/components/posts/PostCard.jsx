import React, { useEffect, useState } from 'react';
import PostsApi from '../../api/PostsApi';
import ReactionApi from '../../api/ReactionApi';
import PostUpdateForm from './PostUpdateForm';

//TODO: rename it to PostCard and place it in the posts folder
export default function PostCard ({data}) {
    const {
        id,
        title,
        content,
        user, 
        date
    } = data;

    const [isUpdating, setIsUpdating] = useState(false);
    const [numReactions, setNumReactions] = useState(0);

    useEffect(() => {
        PostsApi.getPostById({id});
        ReactionApi.countReactionByPostId({id})
        .then(dt=>setNumReactions(dt))
        .catch(er=>console.log(er));
    },[]);


    const updatePost = (updatedPost) => {
        PostsApi.updatePost(updatedPost)
                .then(() => window.location.reload())
                .then(() => alert("Post updated!"))
                .catch(err => alert("You cannot update the post"));
    }

    const onFirstClick = () => {
        PostsApi.validateUser(data)
                .then(() => setIsUpdating(true))
                .catch((err) => alert("You cannot update this post."))
    }
  
    const onLikeClicked =()=>{

    }
    //TODO: place the remove function in the parent class
    
    return (
        isUpdating ? 
        <PostUpdateForm oldPostData = {data} 
                        onUpdateClick = {updatePost}
        />
        :
        <div className = "card mt-4">
            <div className = "card-body">
            <h4 className="card-title">{title}</h4>
            <p>Posted by {user.name} on {date}</p>
            <p>{content}</p>
            <button 
                className="btn btn-danger" 
                onClick={() => {
                    PostsApi.deletePost(id)
                            .then(() => window.location.reload())
                            .then(() => alert("Post removed"))
                            .catch((err) => (alert('You cannot delete this post!')));
                }}>
                Delete post
            </button>
            <button className="btn btn-warning"
                onClick = {() => {
                    onFirstClick()
                }}>
                Update
            </button>
            <button className="btn btn-info"
                onClick = {() => {
                    onLikeClicked()
                }}>
                Like({numReactions})
            </button>
            </div>
        </div>
    )
}