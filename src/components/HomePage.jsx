import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import CreateRoom from './CreateRoom'
import JoinRoom from './JoinRoom'
import Room from './Room'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react'


const Home = () => {
  const navigate = useNavigate();

  const handleJoinRoom = () => {
    navigate('/join');
  };

  const handleCreateRoom = () => {
    navigate('/create');
  };

  const isUserInRoom = () => {
    fetch("/api/user-in-room")
      .then((response) => response.json())
      .then((data) => {
        data.code && navigate(`room/${data.code}`)
      });
  }

  useEffect(() => {
    isUserInRoom();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-6">House Party</h1>
      <div className="flex">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-4"
          onClick={handleJoinRoom}
        >
          Join Room
        </button>
        <button
          className="bg-red-200 hover:bg-red-300 text-red-800 font-bold py-2 px-4 rounded"
          onClick={handleCreateRoom}
        >
          Create a Room
        </button>
      </div>
    </div>
  )
};

const HomePage = () => {
  const navigate = useNavigate();
  // const [roomCode, setRoomCode] = useState(null);

  const isUserInRoom = () => {
    fetch("/api/user-in-room")
      .then((response) => response.json())
      .then((data) => {
        data.code && navigate(`room/${data.code}`)
        // setRoomCode(data.code)
      });
  }

  useEffect(() => {
    isUserInRoom();
  }, []);

  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/create" element={<CreateRoom />} />
        <Route path="/join" element={<JoinRoom />} />
        <Route path="/room/:code" element={<Room />} />
      </Routes>
    </div>
  )
}

export default HomePage