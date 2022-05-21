import React, {  useEffect, useState } from "react";
import { useGlobalContext } from "../../context";
import { useParams, useNavigate } from "react-router-dom";
import { Spinner } from "../../components";

export default function Error() {
    const [data, setData] = useState({});

    const { error } = useGlobalContext().localData.pages;

    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const { message, cover } = error[params?.["*"]] || error["not-found"];
        setData({ message, cover });
    }, []);

    if (!data || !Object.entries(data).length) return <Spinner />;
    return (
        <div className="error">
            <a onClick={() => navigate(-1)} className="btn btn-primary">
                return
            </a>
            <img src={data.cover} alt={[data.cover]} />
            <p>{data.message}</p>
        </div>
    );
}
