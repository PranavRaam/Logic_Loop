import { useSocketContext } from "@/context/socket"
import { useEffect, useState } from "react"

export default function Room({ data: { text, inviteCode } }) {
  const { socket } = useSocketContext()
  const [playerList, setPlayerList] = useState([])

  useEffect(() => {
    socket.on("manager:newPlayer", (player) => {
      setPlayerList([...playerList, player])
    })

    socket.on("manager:removePlayer", (playerId) => {
      setPlayerList(playerList.filter((p) => p.id !== playerId))
    })

    socket.on("manager:playerKicked", (playerId) => {
      setPlayerList(playerList.filter((p) => p.id !== playerId))
    })

    return () => {
      socket.off("manager:newPlayer")
      socket.off("manager:removePlayer")
      socket.off("manager:playerKicked")
    }
  }, [playerList])

  return (
    <section className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-center px-2 text-green-400">
      {/* Invite Code with Green Glow */}
      <div className="mb-10 rotate-3 rounded-md bg-black px-6 py-4 text-6xl font-extrabold text-green-400 border border-green-500 shadow-lg shadow-green-500/50">
        {inviteCode}
      </div>

      {/* Room Title */}
      <h2 className="mb-4 text-4xl font-bold text-green-400 drop-shadow-lg">
        {text}
      </h2>

      {/* Player List */}
      <div className="flex flex-wrap gap-3">
        {playerList.map((player) => (
          <div
            key={player.id}
            className="rounded-md bg-black border border-green-500 px-4 py-3 font-bold text-green-400 shadow-lg shadow-green-500/50 cursor-pointer hover:bg-green-700 hover:text-black transition-all"
            onClick={() => socket.emit("manager:kickPlayer", player.id)}
          >
            <span className="text-xl drop-shadow-md hover:line-through">
              {player.username}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
