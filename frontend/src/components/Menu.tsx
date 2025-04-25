"use client"

import { data } from "@/lib/consts"

export const Menu = () => {
  return (
    <header className="z-1 absolute w-screen">
      <form
        className="w-fit mx-auto p-6 rounded-lg bg-zinc-800 flex flex-col"
        onSubmit={(e) => {
          e.preventDefault()

          const inputs = document.getElementsByTagName(`input`)

          const dataToSend = [...inputs].reduce(
            (prev, current) =>
              [`nick`, `color`].includes(current.id)
                ? { ...prev, [current.type]: current.value }
                : prev,
            { ...data.user }
          )

          if (!dataToSend.nick || !dataToSend.color) return

          if (data.socket?.connected) {
            // Start game
            data.socket.emit(`new`, data.user)
          } else {
            alert(`Nie połączono z serwerem!`)
          }
        }}
      >
        <h1>Menu</h1>
        <input
          className="mx-6 my-4 border-1 rounded-lg"
          type="text"
          id="nick"
          defaultValue={data.user.nick}
          required
          autoFocus
        />
        <input
          className="mx-6 my-4 border-1 rounded-lg cursor-pointer"
          type="color"
          id="color"
          defaultValue={data.user.color}
        />
        <input
          className="mx-6 my-4 border-1 rounded-lg cursor-pointer"
          type="submit"
          value="Graj!"
        />
      </form>
    </header>
  )
}
