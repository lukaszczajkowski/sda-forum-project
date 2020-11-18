import React, { useState } from 'react';
import PostsApi from '../../api/PostsApi';
import PostForm from '../posts/PostForm';

export default function Card ({data}) {
    const {
        id,
        title,
        content,
        user, 
        date
    } = data;

    // const remove = new Promise(() => {
    //     PostsApi.deletePost(id);
    // });
    
    return (
        <div className = "card">
            <div className = "card-body">
            <h4 className="card-title">{title}</h4>
            <p>Posted by {user.name} on {date}</p>
            <p>{content}</p>
            <button 
                className="btn btn-info" 
                onClick={() => {
                    PostsApi.deletePost(id)
                            .then(() => window.location.reload())
                            .then(() => alert("Post removed"))
                            .catch((err) => (alert('You cannot delete this post!')));
                }}>
                Delete post
            </button>
            </div>
        </div>
    )
}