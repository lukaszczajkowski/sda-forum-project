import React, { useEffect, useState } from 'react';
import PostsApi from '../../api/PostsApi';
import PostUpdateForm from './PostUpdateForm';
import CommentsWindow from '../comments/CommentsWindow'
import ReactionApi from '../../api/ReactionApi';

export default function PostCard ({data}) {

    const {
        id,
        title,
        content,
        user, 
        date,
    } = data;

    const [isUpdating, setIsUpdating] = useState(false);
    const [numReactions, setNumReactions] = useState(0);

    useEffect(() => {
        const postId = data.id;
        PostsApi.getPostById(postId);
        ReactionApi.countReactionByPostId(postId)
                .then(response => setNumReactions(response.data))
                .catch(er => console.log(er));
    },[numReactions]);

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

    function transformDate(array) {
        const day = JSON.stringify(array[0]);
        const hour = JSON.stringify(array[1]);

        const dayTrimmed = day.substring(3, day.length - 1);
        const hourTrimmed = hour.substring(1, hour.length - 12);

        return dayTrimmed + ' at ' + hourTrimmed;
    }

    function onLikeClicked(){
        const postId = data.id;
        ReactionApi.createReaction(postId);
        ReactionApi.countReactionByPostId(postId)
                .then(response => setNumReactions(response.data))
                .then(window.location.reload());
    }
    

    //Takes the date from the JSON file and splits it to an array
    const dateArray = JSON.stringify(date).split('T');
    const convertedDate = transformDate(dateArray);
  
    
    return (
        isUpdating ? 
        <PostUpdateForm oldPostData = {data} 
                        onUpdateClick = {updatePost}
        />
        :
        <div className = "card mt-4">
            <div className = "card-body">
            <h4 className="card-title">{title}</h4>
            
            <button 
                className="btn btn-danger mr-4"

            <p>Posted by {user.email} on {convertedDate}</p>
            <p className = "card-text">{content}</p>

            <CommentsWindow postId = {id} />   
            <button 
                className="btn btn-danger mr-4" 

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

            <CommentsWindow postId = {id} />   
            <button className="btn btn-info"
                onClick = {() => {
                    onLikeClicked()
                }}>
                Like({numReactions})
            </button>
            </div>
        </div>
    )
}