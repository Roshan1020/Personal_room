import { React, useState, useEffect } from 'react'
import {
  selectIsConnectedToRoom,
  useHMSActions,
  useHMSStore,
} from '@100mslive/react-sdk'

import Room from './Room'
import Link from 'next/link'

function Login({ roomId }) {
  const roomKeys = [
    '62f64a58b1e780e78c3b3fac',
    '63004db6b1e780e78c3bc4ff',
    '6301621ac16640065697ad48',
    '6301c066b1e780e78c3bd6d4',
    '6301c077c16640065697afbe',
    '6301c089c16640065697afbf',
    '6301c09bb1e780e78c3bd6d6',
    '6301c0aeb1e780e78c3bd6d7',
    '6301c0c7c16640065697afc2',
  ]

  const endpoint =
    'https://prod-in2.100ms.live/hmsapi/videodemo.app.100ms.live/'

  const hmsActions = useHMSActions()
  const [inputValues, setInputValues] = useState('')
  const isConnected = useHMSStore(selectIsConnectedToRoom)

  useEffect(() => {
    window.onunload = () => {
      hmsActions.leave()
    }
  }, [hmsActions])

  const handleInputChange = (e) => {
    setInputValues(e.target.value)
  }

  const handleSubmit = async (e) => {
    console.log(roomKeys[roomId - 1])
    e.preventDefault()
    // 1.Fetch the Token Function
    const fetchtoken = async () => {
      const response = await fetch(`${endpoint}api/token`, {
        method: 'POST',
        body: JSON.stringify({
          user_id: '62f6449dc166400656971829',
          role: 'stage',
          type: 'app',
          room_id: roomKeys[roomId - 1],
        }),
      })
      const { token } = await response.json()
      return token
    }

    // 2.Get the token

    const token = await fetchtoken()

    // 3.Connects to the Room with Token
    hmsActions.join({
      userName: inputValues,
      authToken: token,
      settings: {
        isAudioMuted: true,
      },
    })
  }

  return (
    <>
      {!isConnected ? (
        <div className=" h-screen flex justify-center items-center bg-brand-dark">
          <div className=" flex flex-col gap-6 -mt-20">
            <h1 className="text-gray-100 max-w-lg text-2xl font-semibold flex justify-center">Welcome!</h1>
            <p className="text-gray-300 max-w-lg text-2xl flex justify-center">
              Please be aware: At the end of this meeting, a transcript of the
              session will be generated. 
            </p>
            <p className="text-gray-300 max-w-lg text-2xl">All participants will remain anonymous.</p>
            <input
              type="text"
              placeholder="Name"
              value={inputValues}
              onChange={handleInputChange}
              className=" focus:outline-none flex-1 px-2 py-3 rounded-md text-black"
            />
            <button
              className="flex-1 btn-primary"
              onClick={handleSubmit}
            >
              {/* flex-1 text-white bg-blue-600 py-3 px-10 rounded-md */}
              Join Room
            </button>
            <Link href="/">
              <button className="flex-1 btn-secondary">
                Leave
              </button>
              {/* flex-1 text-white  bg-rose-500 py-3 px-10 rounded-md */}
            </Link>
          </div>
        </div>
      ) : (
        <Room roomId={roomId} />
      )}
    </>
  )
}

export default Login
