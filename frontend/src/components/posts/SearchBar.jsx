import React, { useState } from 'react';
import Popup from './Popup';

export default function SearchBar({usersList, showOnly}) {

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [found, setFound] = useState("");
    const [keyword, setKeyword] = useState("");

    function onInput(e) {
        setKeyword(e.target.value);
        if(keyword !== ""){
            showPopup();
        } else {
            hidePopup();
        }
    }

    function onInputChange(e) {
        searchUser(keyword);
        setKeyword(e.target.value);
    }

    function showPopup(){
        setIsPopupOpen(true);
    }

    function hidePopup() {
        setIsPopupOpen(false);
    }

    RegExp.escape = function(s) {
        return s.replace(/[\/\\^$*+`.()|[\]{}]/g, "\\$&")
    }

    function searchUser(keyword) {
        keyword = RegExp.escape(keyword.toLowerCase());
        const pattern = `[A-Zaz.\s]*${keyword}[A-Za-z.\s]*`;
        const matchRegex = new RegExp(pattern);
        const foundUsers= 
                        usersList
                        .filter(user => matchRegex.test(user.name.toLowerCase()));
        const unique = Array.from(new Set(foundUsers.map(a => a.id)))
                        .map(id => {
                          return foundUsers.find(user => user.id === id)
                        });
        setFound(unique);
    }

   function onClick (item) {
       hidePopup();
       setKeyword("");
       showOnly(item);
    }

    return(
            <div className = "form-group">
                
                <div className = "content">
                <label>Search posts by user</label>
                    <input type="text"
                        className = "form-control" 
                        placeholder="Search posts by user"
                        value = {keyword}
                        onInput = {onInput}
                        onChange = {onInputChange}
                    />
                    <Popup
                        isOpen = {isPopupOpen}
                        items= {found}
                        onClick = {onClick}
                    />
                </div>
            </div>
    )
}