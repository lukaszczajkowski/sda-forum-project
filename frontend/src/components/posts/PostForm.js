import React, { useState } from 'react';
import PostsApi from '../../api/PostsApi';

export default function PostForm({onSubmit}) {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const status = true;
    return (
        <div className = "post-form">
            <label>Write your post here: </label>
            <input
                type="text"
                className = "form-control"
                placeholder = "Title"
                value = {title}
                onChange = {e => setTitle(e.target.value)}
            />
            <input
                type = "textarea"
                className = "form-control"
                placeholder = "My thoughts are..."
                value = {content}
                onChange = {e => setContent(e.target.value)}
            />
            <button
                className = "btn btn-info"
                onClick = {() => {
                    onSubmit({title, content});
                }}>
                post
            </button>
        </div>
    );
}