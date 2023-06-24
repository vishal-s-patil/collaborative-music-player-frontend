import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateRoom = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        votes_to_skip: 2,
        guest_can_pause: false,
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
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        }

        fetch('/api/create-room', requestOptions)
            .then((response) => response.json())
            .then((data) => console.log(data))
    };

    const handleBack = (e) => {
        navigate('/join');
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">Create a Room</h1>
                <h2 className="text-xl font-semibold mb-4">Guest Controls</h2>
                <div className="mb-4 flex justify-center">
                    <label>
                        <input
                            type="checkbox"
                            name="guest_can_pause"
                            checked={formData.guest_can_pause}
                            onChange={(e) => { handleChange(e, 'guest_can_pause') }}
                        />
                        Subscribe to Newsletter
                    </label>
                </div>
                <div className="mb-4">
                    <label className="block">
                        Votes required to skip the song:
                        <input
                            type="number"
                            className="ml-2 border border-gray-300 px-2 py-1 rounded"
                            value={formData.votes_to_skip}
                            onChange={(e) => handleChange(e, 'votes_to_skip')}
                        />
                    </label>
                </div>
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
            </div>
        </div>
    )
}

export default CreateRoom