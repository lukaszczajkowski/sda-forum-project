import React, { useEffect, useState } from 'react';


export default function CommentForm({onSubmit}) {

    const [commentData, setCommentData] = useState("");
    
    const status = true;

    return (
        <div className = "comment-form">
            <label>Write your comment</label>
            <input
                type="text"
                className = "form-control"
                placeholder = "comment"
                value = {commentData}
                onChange = {e => setCommentData(e.target.value)}
            />
            <button
                className = "btn btn-info"
                onClick = {() => onSubmit({commentData})}>
                Comment
            </button>
        </div>
    );
}