import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

const Room = () => {
    const { code } = useParams();

    const [data, setData] = useState({
        votes_to_skip: 2,
        guest_can_pause: false,
        is_host: false
    });

    const getData = () => {
        fetch('/api/get-room?code=' + code)
            .then((response) => response.json())
            .then((jsonResponse) => {
                setData({
                    votes_to_skip: jsonResponse.votes_to_skip,
                    guest_can_pause: jsonResponse.guest_can_pause,
                    is_host: jsonResponse.is_host
                })
            })
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <div>
            <h1>Room</h1>
            <h2>{data.votes_to_skip}</h2>
            <h2>{data.is_host.toString()}</h2>
        </div>
    )
}

export default Room