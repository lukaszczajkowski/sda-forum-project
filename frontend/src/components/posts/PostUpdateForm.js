import React, { useState } from 'react';

export default function PostUpdateForm({oldPostData, onUpdateClick}){
    const[title, setTitle] = useState(oldPostData.title);
    const[content, setContent] = useState(oldPostData.content);

    return(
        <div className="card">
            <div className="card-body">
                <input
                type="text"
                placeholder={title}
                className="form-control"
                value = {title}
                onChange = {e => setTitle(e.target.value)}
                />
                <input
                type = "textarea"
                className = "form-control"
                placeholder = {content}
                value = {content}
                onChange = {e => setContent(e.target.value)}
                />
                <button className="btn btn-warning"
                onClick = {() => {
                    onUpdateClick({...oldPostData, title, content})
                }}>
                    Update
                </button>
        </div>
    </div>
    );
}