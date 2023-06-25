import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';

const Room = () => {
    const { code } = useParams();
    const navigate = useNavigate();

    const [data, setData] = useState({
        votes_to_skip: 2,
        guest_can_pause: false,
        is_host: false
    });

    const handleLeaveRoom = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        }

        fetch('/api/leave-room', requestOptions)
        .then((_response) => {
            navigate('/');
        })
    };

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
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl">Code: {code}</h1>
            <p className="text-2xl">Votes: {data.votes_to_skip}</p>
            <p className="text-2xl">Guest Can Pause: {data.guest_can_pause ? 'Yes' : 'No'}</p>
            <p className="text-2xl">Host: {data.is_host ? 'Yes' : 'No'}</p>
            <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mt-4 rounded"
                onClick={handleLeaveRoom}
            >
                Leave Room
            </button>
        </div>
    )
}

export default Room