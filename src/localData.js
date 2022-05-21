import React from 'react'
import ufo from "./assets/images/ufo.png";
import globus from './assets/images/globus.gif'
import spacex from './assets/images/spacex.png'
import spacexBadge from './assets/images/spacex-badge.png'

const localData = {

    images: {
        globus,
        spacex,
        spacexBadge
    },
    svgs: {
    
        closer: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                <path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"/></svg>
        )
    },

    pages: {
        home: {
            title: "home page title",
            description: "home page description",
        },
        about: {
            title: "about page title",
            description: "about page description",
        },
        error: {
            "not-found": {
                message: "nothing exist here",
                cover: ufo,
                status: 404,
            },
            "connection-error": {
                message: "connection error",
                cover: ufo,
                status: 400,
            },
        },
    },
    unsubscribe: {
        telegram: (
            <svg
                className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv"
                focusable="false"
                aria-hidden="true"
                viewBox="0 0 24 24"
                data-testid="SendIcon"
            >
                <path d="M2.01 21 23 12 2.01 3 2 10l15 2-15 2z"></path>
            </svg>
        ),
        trash: (
            <svg
                className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv"
                focusable="false"
                aria-hidden="true"
                viewBox="0 0 24 24"
                data-testid="DeleteIcon"
            >
                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path>
            </svg>
        ),
    },
};

export default localData;
