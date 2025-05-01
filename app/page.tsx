"use client"

import { useEffect, useState } from "react"

import { socket } from "./lib/socket"
import { Menu } from "./components/Menu"
import { Game } from "./components/Game"

export default function Home() {
  const [isConnected, setIsConnected] = useState(false)
  const [transport, setTransport] = useState(`N/A`)

  useEffect(() => {
    const onConnect = () => {
      setIsConnected(true)
      setTransport(socket.io.engine.transport.name)

      socket.io.engine.on(`upgrade`, (transport) => {
        setTransport(transport.name)
      })
    }

    const onDisconnect = () => {
      setIsConnected(false)
      setTransport(`N/A`)
    }

    if (socket.connected) {
      onConnect()
    }

    socket.on(`connect`, onConnect)
    socket.on(`disconnect`, onDisconnect)

    return () => {
      socket.off(`connect`, onConnect)
      socket.off(`disconnect`, onDisconnect)
    }
  }, [])

  return (
    <>
      <header className="absolute z-1 w-screen">
        <div>
          <p>Status: {isConnected ? `connected` : `disconnected`}</p>
          <p>Transport: {transport}</p>
        </div>
        <Menu />
      </header>
      <main>
        <Game />
      </main>
    </>
  )
}
