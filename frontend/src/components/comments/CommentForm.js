import React,  { useState } from "react";


function CommentForm( {onSubmit, postId}) {

     const [commentData, setCommentData] = useState("");
     const [post, setPost] = useState({ "id":postId});

     return (
        <div className = "post-form">
            <label> Write your comment here: </label>
            <input
                type = "text"
                className = "form-control"
                placeholder = "Comment"
                value = {commentData}
                onChange = {e => setCommentData(e.target.value)}
            />
            <br/>
            <button
                className = "btn btn-info"
                onClick = {() => onSubmit({commentData, post})}>
                Comment
            </button>
        </div>
     );
}


export default CommentForm;