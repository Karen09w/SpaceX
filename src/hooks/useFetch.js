import React, { useState } from "react";
import axios from "axios";

export const useFetch = () => {
    let [loading, setLoading] = useState(false);
    let [error, setError] = useState(false);
    const [baseURL, setBaseURL] = useState("https://api.spacexdata.com/latest/launches");

    const request = async (url, method = "GET", data = {}, headers = {}, cb) => {
        setLoading(true);
        try {
            const response = await axios({
                url: baseURL + url,
                method,
                headers,
                data,
                // withCredentials: true,
            });

            setLoading(false);
            if (typeof cb === "function") {
                cb(null, response.data);
                return;
            }
            return response.data;
        } catch (err) {
            // if (!err.response) return (window.location.pathname = "/connection-error");

            setLoading(false);
            setError(true);

            if (typeof cb === "function") {
                cb(err.response.data, null);
                return;
            }
            throw err.response.data;
        }
    };

    const getPastLaunches = async (cb) => {
        const url = "/past";
        const headers = {};
        return await request(url, "GET", {}, headers, cb);
    };
    const getUpcomingLaunches = async (cb) => {
        const url = "/upcoming";
        const headers = {};
        return await request(url, "GET", {}, headers, cb);
    };
    const getSingleLaunch = async (cb,id) => {
        const url = '/' + id;
        const headers = {};
        return await request(url, "GET", { }, headers, cb);
    };

    const clearError = () => setError(null);

    return { getPastLaunches, getUpcomingLaunches, getSingleLaunch, loading, clearError, error, request };
};
