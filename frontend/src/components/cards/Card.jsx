import React from 'react';

export default function Card ({data}) {
    const {
        id,
        title,
        content,
        user, 
        date
    } = data;
    
    return (
        <div className = "post-card">
            <p>Post by: {user.name} written on {date}</p>
            <p>{title}</p>
            <p>{content}</p>
        </div>
    )
}