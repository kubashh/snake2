"use client"

import { values } from "@/lib/consts"

const inputsClass = `mx-6 my-3`

export const Login = () => (
  <header className="z-1 w-screen h-screen">
    <form
      className="w-fit mx-auto mt-[20vh] p-8 flex flex-col bg-zinc-800"
      onSubmit={async (e) => {
        e.preventDefault()

        const inputs = document.getElementsByTagName(`input`)

        const data = [...inputs].reduce(
          (prev, current) =>
            [`nick`, `color`].includes(current.id)
              ? { ...prev, [current.type]: current.value }
              : prev,
          {}
        )
        console.log(data)

        const response = await fetch(`api/new`, {
          method: `POST`,
          headers: { "content-type": `application/json` },
          body: JSON.stringify({}),
        })

        if (!response.ok) return

        const serverData = await response.json()

        console.log(serverData)

        if (!serverData.succes) return

        values.inGame = true
      }}
    >
      <h1 className={inputsClass}>Join Game!</h1>
      <input
        className={`${inputsClass} border-1 px-2`}
        type="text"
        id="nick"
        placeholder="Nick"
      />
      <div className={inputsClass}>
        <div className="inline">color</div>
        <input
          className="w-16 float-right cursor-pointer"
          type="color"
          id="color"
        />
      </div>
      <input
        className={`${inputsClass} border-1 cursor-pointer`}
        type="submit"
        value="Graj!"
      />
    </form>
  </header>
)
