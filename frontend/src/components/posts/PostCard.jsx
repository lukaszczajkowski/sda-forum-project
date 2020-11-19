import React, { useEffect, useState } from 'react';
import PostsApi from '../../api/PostsApi';
import PostUpdateForm from './PostUpdateForm';
import CommentsWindow from "../comments/CommentsWindow";

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

    useEffect(() => {
        PostsApi.getPostById({id});
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
            <p>Posted by  on {date}</p>
            <p>{content}</p>

            <div className = "CommentsPop">
              <CommentsWindow postId = {id} />   
            </div>
            
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
            </div>
        </div>
    )
}