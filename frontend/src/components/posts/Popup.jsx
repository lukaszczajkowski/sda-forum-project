import React, { useState } from 'react';

export default function Popup ({isOpen, items, onClick}){
    
    return (
        isOpen === false ?
        null
        :
        <div className="popup">
            <div className="container">
                <div className="content">
                    {items &&
                        items.map((item, idx) => {
                            return(
                                <div className = "item" key = {idx}>
                                    <button
                                        className = "btn btn-link btn-lg btn-block"
                                        onClick = {() => onClick(item.id)}
                                    >{item.name}</button>
                                </div>
                            );
                        })}
                    {items.length === 0 && <div className = "warning">No matches found</div>}
                </div>
                <div className="footer mt-4">Search posts by user</div>
            </div>
        </div>
    )
}