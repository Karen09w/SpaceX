import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "../../components";
import { useFetch } from "../../hooks/useFetch";
import localData from "../../localData";
import { useGlobalContext } from "../../context";

export default function Launch() {
    const params = useParams();
    const { getSingleLaunch } = useFetch();
    const { spacexBadge } = localData.images;

    const [singleLaunch, setSingleLaunch] = useState({});

    const { handleNavigateStart, handleNavigateEnd } = useGlobalContext();

    useEffect(() => {
        if (Object.entries(singleLaunch).length) handleNavigateEnd();
    }, [singleLaunch]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const tempSingleLaunch = await getSingleLaunch(null, params.launchId);
                setSingleLaunch(tempSingleLaunch);
            } catch (err) {
                console.log(err, "here");
            }
        };

        fetchData();
    }, []);

    return (
        <main className="launch">
            {!singleLaunch || !Object.entries(singleLaunch).length ? (
                "loading..."
            ) : (
                <div className="container">
                    <>
                        <h1 className="launch-title">{singleLaunch.name}</h1>
                        <div className="launch-center">
                            <ul>
                                <li>flight number: {singleLaunch.flight_number}</li>
                                <li>id: {singleLaunch.id}</li>
                                <li>rocket: {singleLaunch.rocket}</li>
                                <li>date: {new Date(singleLaunch.date_utc).toString()}</li>
                                <a onClick={() => handleNavigateStart()}>
                                    <Button className="btn btn-primary btn-lg d-block">return</Button>
                                </a>
                            </ul>
                            <div className="img-wrapper">
                                <img src={spacexBadge} alt="" />
                            </div>
                        </div>
                    </>
                    <div className="launch-bottom">© copyright 2022. all rights reserved. powered by React</div>
                </div>
            )}
        </main>
    );
}
