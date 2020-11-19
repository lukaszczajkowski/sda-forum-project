import React,  { useEffect, useState } from "react";
import CommentsApi from "../../api/CommentsAPI";
import CommentCard from "./CommentCard";
import CommentForm from "./CommentForm";

function CommentsPage( {postId, handleClose} ) {

    const [comments, setComments] = useState([]);
     
    useEffect(  () => {
        async function fetchdata() {
            await CommentsApi.getCommentsByPostId(postId)
                             .then(response => {const data = response.data;
                                    setComments(data);
                                })
                             .catch(err => console.log(err));
        }
        fetchdata();
    }, [postId]);

    const createComment = (commentData) => {
        CommentsApi.writeComment(commentData)
                   .then(() => window.location.reload())
                   .then(() => alert("Comment Created"))
                   .catch((err) => (alert('Failed to add Comment. Please try again!')));
    }

    const commentCards = comments.map((item) => {
        return <CommentCard key = {item.id} data = {item}/>
    });

    return (     
        <div className = "popup-box">
            <div className = "box">
                <span className = "close-icon" onClick={handleClose} > x </span>
                <div className = "card">
                    <div className = "card-body">
                        <div className = "form-group">
                            <CommentForm onSubmit = {createComment} postId = {postId}/>
                            <hr/>
                            {commentCards}
                        </div>            
                    </div>
                </div>
            </div>
       </div>
        
    );
    
}

export default CommentsPage;