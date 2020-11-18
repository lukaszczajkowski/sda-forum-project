import React, { useEffect, useState } from "react";
import CommentApi from '../../api/CommentApi';
import CommentForm from "./CommentForm";
import CommentCard from "./CommentCard"

function CommentsPage() {

    const [comments, setComments] = useState([]);

    const createComment = async (commentData) => {
        CommentApi.createComment(commentData).then(response => setComments([...comments, response.data]));   
    };

    
    useEffect( async () => {
        const source = CommentApi.getAllComments()
            .then(response => {
                const data = response.data;
                setComments(data);
            })
            .catch(err => console.log(err));
    }, []);
    
    const commentsCards = comments.map((item) => {
        return <CommentCard key = {item.id} data = {item}/>
    });
    console.log("comments card" );
    console.log(commentsCards );

    return (
        <div className = "posts-page">
            <div>
                <CommentForm onSubmit={createComment}/>
            </div>
            <p>view comments</p>
            {commentsCards}
        </div>
    );
}

export default CommentsPage;