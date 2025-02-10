import Image from "next/image"
import Button from "@/components/Button"
import background from "@/assets/background.webp"
import { usePlayerContext } from "@/context/player"
import { useSocketContext } from "@/context/socket"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"

export default function GameWrapper({ children, textNext, onNext, manager }) {
  const { socket } = useSocketContext()
  const { player, dispatch } = usePlayerContext()
  const router = useRouter()

  const [questionState, setQuestionState] = useState()

  useEffect(() => {
    socket.on("game:kick", () => {
      dispatch({
        type: "LOGOUT",
      })

      router.replace("/")
    })

    socket.on("game:updateQuestion", ({ current, total }) => {
      setQuestionState({
        current,
        total,
      })
    })

    return () => {
      socket.off("game:kick")
      socket.off("game:updateQuestion")
    }
  }, [])

  return (
    <section className="relative flex min-h-screen w-full flex-col justify-between bg-black text-green-400">
      {/* Background with green overlay */}
      <div className="fixed left-0 top-0 -z-10 h-full w-full bg-black opacity-80">
        <Image
          className="pointer-events-none h-full w-full object-cover opacity-50 mix-blend-screen"
          src={background}
          alt="background"
        />
      </div>

      <div className="flex w-full justify-between p-4">
        {questionState && (
          <div className="shadow-lg flex items-center rounded-md bg-black p-2 px-4 text-lg font-bold text-green-400 border border-green-500">
            {`${questionState.current} / ${questionState.total}`}
          </div>
        )}

        {manager && (
          <Button
            className="self-end bg-green-600 px-4 text-black hover:bg-green-500 transition-all"
            onClick={() => onNext()}
          >
            {textNext}
          </Button>
        )}
      </div>

      {children}

      {!manager && (
        <div className="z-50 flex items-center justify-between bg-black px-4 py-2 text-lg font-bold text-green-400 border-t border-green-500">
          <p className="text-green-300">{!!player && player.username}</p>
          <div className="rounded-sm bg-green-700 px-3 py-1 text-lg text-black font-bold">
            {!!player && player.points}
          </div>
        </div>
      )}
    </section>
  )
}
