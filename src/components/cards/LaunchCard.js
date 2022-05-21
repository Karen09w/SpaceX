import React from "react";
import { Link } from "react-router-dom";

export default function LaunchCard({ name, id, dragStart,dragEnd,isDraggable, params, dragging, getDraggingStyles }) {

    return (
        <Link
        to={`launch/${id}`}
            className={`card launch-card ${dragging ? getDraggingStyles(params) : ""}`}
            draggable={isDraggable}
            onDragStart={(e) => isDraggable && dragStart(e, params)}
            onDragEnd={dragEnd}
            // onDragEnter={dragging && isDraggable ? (e)=>dragEnter(e,params):null}
        >
            <h5 className="card-title">{name}</h5>
            <p className="card-text">{id}</p>
        </Link>
    );
}
