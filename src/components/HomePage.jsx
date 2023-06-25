import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CreateRoom from './CreateRoom'
import JoinRoom from './JoinRoom'
import Room from './Room'

const HomePage = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/create" element={<CreateRoom />} />
          <Route path="/join" element={<JoinRoom />} />
          <Route path="/room/:code" element={<Room />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default HomePage