import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CreateRoom from './CreateRoom'
import JoinRoom from './JoinRoom'

const HomePage = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/create" element={<CreateRoom />} />
          <Route path="/join" element={<JoinRoom />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default HomePage