import React, { useEffect, useState } from 'react';
import CommentApi from "../../api/CommentApi";
import CommentUpdateForm from "./CommentUpdatedForm";


export default function CommentCard({data}) {
    const {
        id,
        commentData,
        dateTime, 
        post,
        user
    } = data;

    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        CommentApi.getCommentById({id});
    },[]);
    
    const updateComment = (updatedComment) => {
        CommentApi.updateComment(updatedComment)
                .then(() => window.location.reload())
                .then(() => alert("Comment updated!"))
                .catch(err => alert("You cannot update the comment"));
    }

    const onFirstClick = () => {
        {
            setIsUpdating(true);
        };
    
    
    }

    
    return (
        isUpdating ? 
        <CommentUpdateForm oldCommentData = {data} 
                        onUpdateClick = {updateComment}
        />
        :
        <div className = "card mt-4">
            <div className = "card-body">
            <h4 className="card-title">{commentData}</h4>
            <p> Comment by {user.name} on {dateTime}</p>
            <p>{commentData}</p>
            <button 
                className="btn btn-danger" 
                onClick={() => {
                    CommentApi.deleteComment(id)
                            .then(() => window.location.reload())
                            .then(() => alert("Comment removed"))
                            .catch((err) => (alert('You cannot delete this comment!')));
                }}>
                Delete comment
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
    

