import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const JoinRoom = () => {
  const [roomCode, setRoomCode] = useState('');
  const [roomNotFoundError, setRoomNotFoundError] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setRoomNotFoundError("")
    setRoomCode(event.target.value);
  };

  const handleJoinRoom = (e) => {
    e.preventDefault();

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "code": roomCode
      }),
    }

    fetch('/api/join-room', requestOptions)
      .then((response) => {
        if (response.ok) {
          navigate(`/room/${roomCode}`)
        } else {
          setRoomNotFoundError("Couldn't find room")
        }
      })
  };

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Join Room</h1>
      <div className="mb-4">
        <label htmlFor="roomCode" className="block font-semibold mb-2">
          Room Code:
        </label>
        <input
          id="roomCode"
          type="test"
          className="px-4 py-2 border border-gray-300 rounded w-48"
          value={roomCode}
          onChange={handleInputChange}
        />
        {roomNotFoundError && (
          <p style={{ color: 'red' }}>Room not found. Please try again.</p>
        )}
      </div>
      <div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          onClick={handleJoinRoom}
        >
          Join Room
        </button>
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded"
          onClick={handleGoBack}
        >
          Go Back
        </button>
      </div>
    </div>
  )
}

export default JoinRoom