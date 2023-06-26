import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateRoom = (props) => {
    const navigate = useNavigate();
    const { update, votesToSkip, guestCanPause, roomCode, updateCallback } = props;


    const [formData, setFormData] = useState({
        votes_to_skip: votesToSkip,
        guest_can_pause: guestCanPause,
    });

    const handleChange = (e, fieldName) => {
        const { value, type, checked } = e.target;
        const inputValue = type === 'checkbox' ? checked : parseInt(value);
        setFormData({ ...formData, [fieldName]: inputValue });
    };

    const handleCreateRoom = (e) => {
        e.preventDefault();

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', credentials: 'include', },
            body: JSON.stringify(formData),
        }

        fetch('/api/create-room', requestOptions)
            .then((response) => response.json())
            .then((data) => {
                navigate('/room/' + data.code)
            })
    };

    const handleUpdateRoom = (e) => {
        e.preventDefault();

        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json', credentials: 'include', },
            body: JSON.stringify({ ...formData, 'code': roomCode }),
        }

        fetch('/api/update-room', requestOptions)
            .then((response) => {
                if (response.status === 200) {
                    alert('Room updated successfully');
                }
                else {
                    alert('Error updating room');
                }
                updateCallback();
            })

    };

    const handleBack = (e) => {
        navigate('/');
    };

    const renderCreateButtons = () => {
        return (
            <>
                <div className="space-x-4">
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        onClick={handleCreateRoom}
                    >
                        Create Room
                    </button>
                    <button
                        className="bg-gray-500 text-white px-4 py-2 rounded"
                        onClick={handleBack}
                    >
                        Back
                    </button>
                </div>
            </>
        )
    }

    const renderUpdateButtons = () => {
        return (
            <>
                <div className="space-x-4">
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        onClick={handleUpdateRoom}
                    >
                        Update Room
                    </button>
                </div>
            </>
        )
    }

    return (
        <>
            <div className="flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">{update ? "Update Room" : "Create Room"}</h1>
                    <h2 className="text-xl font-semibold mb-4">Guest Controls</h2>
                    <div className="mb-4 flex justify-center">
                        <label>
                            <input
                                className='mx-2'
                                type="checkbox"
                                name="guest_can_pause"
                                checked={formData.guest_can_pause}
                                onChange={(e) => { handleChange(e, 'guest_can_pause') }}
                            />
                            Play/Pause
                        </label>
                    </div>
                    <div className="mb-4">
                        <label className="block">
                            Votes required to skip the song:
                            <input
                                type="number"
                                className="ml-2 w-48 sm:w-32 md:w-24 lg:w-20 xl:w-16 border-0 border-b border-gray-500 focus:outline-none focus:border-blue-500"
                                value={formData.votes_to_skip}
                                onChange={(e) => handleChange(e, 'votes_to_skip')}
                            />
                        </label>
                    </div>
                    {update ? renderUpdateButtons() : renderCreateButtons()}
                </div>
            </div>
        </>
    )
}

CreateRoom.defaultProps = {
    update: false,
    roomCode: null,
    votesToSkip: 2,
    guestCanPause: false,
    updateCallback: () => { },
}

export default CreateRoom