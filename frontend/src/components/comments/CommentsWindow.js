import React, {  useState } from 'react';
import CommentsPage from "../comments/CommentsPage";


function CommentWindow ({postId}) {
   
    //variable to hide/show popup on view comments button click
    const [isOpen, setIsOpen] = useState(false); 
    const togglePopup = () => {
      setIsOpen(!isOpen);
      localStorage.clear();
    }
    const showPopup = () => {   
      setIsOpen(!isOpen);
      //Local storage to find if the user is in comment popup before refresh
      localStorage.setItem("commentspopup",true)
      localStorage.setItem("postid",postId)
    }   

    return (          

        <div className = "CommentsPop">
            <input type = "button" value = "View Comments" onClick = {showPopup}/> 
            { (isOpen || localStorage.getItem("commentspopup"))  && localStorage.getItem("postid") === postId.toString() &&
              localStorage.getItem("commentspopup") !==  null ? <CommentsPage postId = {postId}  handleClose={togglePopup} /> : null 
            }  
        </div>         
    )
}

export default CommentWindow;