import React, { useEffect } from "react";
import localData from "../../localData";
import { useGlobalContext } from "../../context";

export default function Modal({ isModalShown, setIsModalShown, dialogClassName, callback = () => {} }) {
    const { closer } = localData.svgs;

    // CONFIG WITHOUT NAVBAR
    useEffect(() => {
        isModalShown && adaptLayouts(true);
    }, [isModalShown]);
    //

    const adaptLayouts = (isModified) => {
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth + "px";
        if (isModified) {
            document.body.style.paddingRight = scrollbarWidth;
            document.body.style.overflow = "hidden";
            return;
        }

        document.body.style.paddingRight = "";
        document.body.style.overflow = "";
    };

    return (
        <div
            className={`modal fade ${isModalShown ? "show" : ""} `}
            id="exampleModal"
            tabIndex="-1"
            style={isModalShown ? { display: "block" } : {}}
            onClick={() => setIsModalShown(false)}
        >
            <div
                className={`modal-dialog ${dialogClassName ? dialogClassName : ""}`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                            spacex launch
                        </h5>
                        <button type="button" className="btn-close" onClick={() => setIsModalShown(false)}>
                            {closer}
                        </button>
                    </div>
                    <div className="modal-body">confirm action</div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-dark me-2" onClick={() => setIsModalShown(false)}>
                            cancel
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => {
                                setIsModalShown(false);
                                callback();
                            }}
                        >
                            confirm
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
