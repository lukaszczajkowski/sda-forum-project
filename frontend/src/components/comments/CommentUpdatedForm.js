import React, { useState } from 'react';

export default function CommentUpdateForm({oldCommentData, onUpdateClick}){
    const[commentData, setCommentData] = useState(oldCommentData.commentData);

    return(
        <div className="card">
            <div className="card-body">
                <input
                type="text"
                placeholder={commentData}
                className="form-control"
                value = {commentData}
                onChange = {e => setCommentData(e.target.value)}
                />
                <button className="btn btn-warning"
                onClick = {() => {
                    onUpdateClick({...oldCommentData, commentData})
                }}>
                    Update
                </button>
        </div>
    </div>
    );
}