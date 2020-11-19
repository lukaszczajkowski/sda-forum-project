import React, { useState } from 'react';

function CommentUpdateForm({oldCommentData, onUpdateClick}){

    const[commentData, setCommentData] = useState(oldCommentData.commentData);
    const[id, setId] = useState(oldCommentData.id);
    const[post, setPost] = useState(oldCommentData.post);
    const[user, setUser] = useState(oldCommentData.user);

    return(
        <div className = "card">
            <div className = "card-body">
                <input
                type = "text"
                placeholder = {commentData}
                className = "form-control"
                value = {commentData}
                onChange = {e => setCommentData(e.target.value)}
                />
                <br/>
                <button className="btn btn-info" onClick = {() => onUpdateClick({ id,commentData,post,user})}>
                    Update
                </button>
        </div>
    </div>
    );
}

export default CommentUpdateForm;