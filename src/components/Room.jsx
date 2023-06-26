import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import CreateRoom from './CreateRoom';
import MusicPlayer from './MusicPlayer';

const Room = () => {
    const { code } = useParams();
    const navigate = useNavigate();
    const [showSettings, setShowSettings] = useState(false);
    const [spotifyAuthenticated, setSpotifyAuthenticated] = useState(false);
    const [song, setSong] = useState({});

    const [data, setData] = useState({
        votes_to_skip: 2,
        guest_can_pause: false,
        is_host: false
    });

    const handleLeaveRoom = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', credentials: 'include', }
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
                if (jsonResponse.is_host) {
                    authenticateSpotify();
                }
            })
    }

    const authenticateSpotify = () => {
        fetch('/spotify/is-authenticated')
            .then((response) => response.json())
            .then((jsonResponse) => {
                setSpotifyAuthenticated(jsonResponse.status);
                if (!jsonResponse.status) {
                    fetch('/spotify/get-auth-url')
                        .then((response) => response.json())
                        .then((jsonResponse) => {
                            window.location.replace(jsonResponse.url);
                        })
                }
            })
    }

    const renderSettingsButton = () => {
        return (
            <>
                <button className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => { setShowSettings(true) }}
                >
                    Settings
                </button>
            </>
        )
    }

    const renderSettings = () => {
        return (
            <>
                <CreateRoom
                    update={true}
                    votesToSkip={data.votes_to_skip}
                    guestCanPause={data.guest_can_pause}
                    roomCode={code}
                    updateCallback={getData}
                />
                <div className="flex justify-center my-4">
                    <button className="flex items-center justify-center bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => { setShowSettings(false) }}
                    >
                        <span className="mr-1 text-xl">&times;</span>
                        Close
                    </button>
                </div>
            </>
        )
    }

    const getCurrentSong = () => {
        fetch('/spotify/current-song')
            .then((response) => {
                if (!response.ok) {
                    return {};
                }
                else {
                    return response.json();
                }
            })
            .then(jsonData => {
                console.log(jsonData);
                setSong(jsonData);
            })
    }

    useEffect(() => {   
        getData();
        const interval = setInterval(getCurrentSong, 1000);
    }, []);

    if (showSettings) {
        return renderSettings();
    }
    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-4xl">Code: {code}</h1>
            <p className="text-2xl">Votes: {data.votes_to_skip}</p>
            <p className="text-2xl">Guest Can Pause: {data.guest_can_pause ? 'Yes' : 'No'}</p>
            <p className="text-2xl">Host: {data.is_host ? 'Yes' : 'No'}</p>
            <MusicPlayer{...song} />
            {data.is_host ? renderSettingsButton() : null}
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