import React,  { useState } from "react";
import CommentsApi from "../../api/CommentsAPI";
import CommentUpdateForm from "./CommentUpdateForm";

function CommentCard({data}) {
    const {
        id,
        commentData,
        dateTime,
        user
    } = data;
    const commentTime = new Date(dateTime); 
    const [isCommentUpdate, setIsCommentUpdate] = useState(false);
    const deleteComment = () => {
        CommentsApi.deleteComment(id)
                    .then(() => window.location.reload())
                    .then(() => alert("Comment Removed"))
                    .catch(err => alert('You cannot delete the post!'));
    }
    const updateComment = (updatedComment) => {
        CommentsApi.updateComment(updatedComment)
                    .then(() => window.location.reload())
                    .then(() => alert("Post updated!"))
                    .catch(err => alert('You cannot update the post!'));
    }

    function onFirstClick ()  {
        CommentsApi.validateUser(data)
                .then(() => setIsCommentUpdate(true))
                .catch(err => alert('You cannot update the post!'));
        
    }

    return (
        isCommentUpdate ? <CommentUpdateForm  onUpdateClick = {updateComment} oldCommentData = {data}/>  : 
           <div className = "commentcard">
               <p className = "commentUser">Comment by: {user.email} At {commentTime.toLocaleString()} </p> 
               <p> {commentData} </p> 
               <div className = "commentactions">
                    <div className = "commentaction">
                         <button className = "btn btn-info mb-4" onClick = {() => { onFirstClick() }}> Update </button>
                         </div>
                    <div className="commentaction">
                         <button className =  "btn btn-info mb-4" onClick = {deleteComment}> Delete </button>
                         </div>
               </div>
               <hr/>
            </div>
    );
}    

export default CommentCard;