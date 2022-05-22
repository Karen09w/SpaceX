import React from "react";
import { useGlobalContext } from "../../context";

export default function LaunchCard({ name, id, dragStart, dragEnd, isDraggable, params, dragging, getDraggingStyles }) {

    const {handleNavigateStart} = useGlobalContext()
    return (
        <a
            onClick={() => handleNavigateStart(`/launch/${id}`)}
            className={`card launch-card ${dragging ? getDraggingStyles(params) : ""}`}
            draggable={isDraggable}
            onDragStart={(e) => isDraggable && dragStart(e, params)}
            onDragEnd={dragEnd}
        >
            <h5 className="card-title">{name}</h5>
            <p className="card-text">{id}</p>
        </a>
    );
}
